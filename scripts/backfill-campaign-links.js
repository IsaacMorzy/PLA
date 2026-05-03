#!/usr/bin/env node
/*
 * Backfill Cosmic campaign records with on-chain linkage metadata.
 *
 * Matching strategy:
 * 1. exact slug(title) match
 * 2. normalized title match
 *
 * Dry-run by default.
 * Use --apply to persist updates to Cosmic.
 */

const { Connection, PublicKey } = require("@solana/web3.js");

const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || "65VieGUg5tJEQDAHEgTLXqxVaKJWdQEnzAXyrdLuRt2K"
);
const CLUSTER = process.env.NEXT_PUBLIC_SOLANA_CLUSTER || "devnet";
const RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_RPC ||
  process.env.NEXT_PUBLIC_HELIUS_URL ||
  "https://api.devnet.solana.com";
const STATE_SEED = "state";
const CAMPAIGN_SEED = "campaign";

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeTitle(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function campaignIdSeed(campaignId) {
  const buffer = Buffer.alloc(8);
  buffer.writeBigUInt64LE(BigInt(campaignId));
  return buffer;
}

function getStateAddress() {
  return PublicKey.findProgramAddressSync([Buffer.from(STATE_SEED)], PROGRAM_ID)[0];
}

function getCampaignAddress(campaignId) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(CAMPAIGN_SEED), campaignIdSeed(campaignId)],
    PROGRAM_ID
  )[0];
}

function parseProgramState(data) {
  let offset = 8; // discriminator
  const campaignCount = data.readBigUInt64LE(offset);
  offset += 8;
  const authority = new PublicKey(data.subarray(offset, offset + 32)).toBase58();
  offset += 32;
  const bump = data[offset];
  return { campaignCount: Number(campaignCount), authority, bump };
}

function parseCampaign(data) {
  let offset = 8; // discriminator
  const author = new PublicKey(data.subarray(offset, offset + 32)).toBase58();
  offset += 32;

  const titleLen = data.readUInt32LE(offset);
  offset += 4;
  const title = data.subarray(offset, offset + titleLen).toString("utf8");
  offset += titleLen;

  const descriptionLen = data.readUInt32LE(offset);
  offset += 4;
  const description = data.subarray(offset, offset + descriptionLen).toString("utf8");
  offset += descriptionLen;

  const imageLen = data.readUInt32LE(offset);
  offset += 4;
  const imageUrl = data.subarray(offset, offset + imageLen).toString("utf8");
  offset += imageLen;

  const goal = data.readBigUInt64LE(offset);
  offset += 8;
  const raised = data.readBigUInt64LE(offset);
  offset += 8;
  const donatedCount = data.readUInt32LE(offset);
  offset += 4;
  const createdAt = data.readBigInt64LE(offset);
  offset += 8;
  const isDeleted = data[offset] === 1;
  offset += 1;
  const bump = data[offset];
  offset += 1;
  const campaignId = data.readBigUInt64LE(offset);

  return {
    author,
    title,
    description,
    imageUrl,
    goal: goal.toString(),
    raised: raised.toString(),
    donatedCount,
    createdAt: createdAt.toString(),
    isDeleted,
    bump,
    campaignId: Number(campaignId),
    campaignPda: getCampaignAddress(Number(campaignId)).toBase58(),
    slug: slugify(title),
    normalizedTitle: normalizeTitle(title),
  };
}

async function loadOnchainCampaigns() {
  const connection = new Connection(RPC_URL, "confirmed");
  const stateInfo = await connection.getAccountInfo(getStateAddress());
  if (!stateInfo) {
    throw new Error(`Program state not found at ${getStateAddress().toBase58()} on ${RPC_URL}`);
  }

  const state = parseProgramState(Buffer.from(stateInfo.data));
  const campaigns = [];

  for (let i = 0; i < state.campaignCount; i++) {
    const accountInfo = await connection.getAccountInfo(getCampaignAddress(i));
    if (!accountInfo || !accountInfo.data?.length) continue;

    try {
      const campaign = parseCampaign(Buffer.from(accountInfo.data));
      if (!campaign.isDeleted) campaigns.push(campaign);
    } catch (error) {
      console.warn(`Skipping campaign ${i}:`, error.message || error);
    }
  }

  return campaigns;
}

async function main() {
  const apply = process.argv.includes("--apply");
  const { createBucketClient } = await import("@cosmicjs/sdk");

  const cosmic = createBucketClient({
    bucketSlug: process.env.COSMIC_BUCKET_SLUG || "peaceleague-africa",
    readKey: process.env.COSMIC_READ_KEY || "",
    writeKey: process.env.COSMIC_WRITE_KEY || "",
  });

  if (!process.env.COSMIC_BUCKET_SLUG || !process.env.COSMIC_READ_KEY) {
    throw new Error("COSMIC_BUCKET_SLUG and COSMIC_READ_KEY must be set");
  }

  const [onchainCampaigns, cosmicResponse] = await Promise.all([
    loadOnchainCampaigns(),
    cosmic.objects.find({ type: "campaigns", limit: 100 }),
  ]);

  const onchainBySlug = new Map(onchainCampaigns.map((c) => [c.slug, c]));
  const onchainByTitle = new Map(onchainCampaigns.map((c) => [c.normalizedTitle, c]));

  const cosmicCampaigns = cosmicResponse.objects || [];
  const proposals = [];

  for (const campaign of cosmicCampaigns) {
    const metadata = campaign.metadata || {};
    if (metadata.onchain_campaign_id !== undefined && metadata.onchain_campaign_id !== null && metadata.onchain_campaign_id !== "") {
      continue;
    }

    const slugMatch = onchainBySlug.get(campaign.slug);
    const titleMatch = onchainByTitle.get(normalizeTitle(campaign.title));
    const matched = slugMatch || titleMatch;

    if (!matched) continue;

    proposals.push({
      cosmicId: campaign.id,
      title: campaign.title,
      slug: campaign.slug,
      matchedBy: slugMatch ? "slug" : "title",
      update: {
        ...metadata,
        onchain_campaign_id: matched.campaignId,
        campaign_pda: matched.campaignPda,
        author_wallet: metadata.author_wallet || matched.author,
        cluster: metadata.cluster || CLUSTER,
      },
    });
  }

  console.log(`RPC: ${RPC_URL}`);
  console.log(`Cluster: ${CLUSTER}`);
  console.log(`On-chain campaigns: ${onchainCampaigns.length}`);
  console.log(`Cosmic campaigns: ${cosmicCampaigns.length}`);
  console.log(`Backfill proposals: ${proposals.length}`);

  if (proposals.length === 0) {
    console.log("No unlinked Cosmic campaigns matched on-chain campaigns.");
    return;
  }

  for (const proposal of proposals) {
    console.log(
      `- [${proposal.matchedBy}] ${proposal.title} -> onchain #${proposal.update.onchain_campaign_id} (${proposal.update.campaign_pda})`
    );
  }

  if (!apply) {
    console.log("\nDry run only. Re-run with --apply to update Cosmic.");
    return;
  }

  if (!process.env.COSMIC_WRITE_KEY) {
    throw new Error("COSMIC_WRITE_KEY must be set when using --apply");
  }

  for (const proposal of proposals) {
    await cosmic.objects.updateOne(proposal.cosmicId, { metadata: proposal.update });
    console.log(`Updated Cosmic campaign ${proposal.cosmicId} (${proposal.title})`);
  }

  console.log("✅ Backfill complete");
}

main().catch((error) => {
  console.error("Backfill failed:", error);
  process.exit(1);
});
