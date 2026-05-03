import test from "node:test";
import assert from "node:assert/strict";
import { PublicKey } from "@solana/web3.js";
import * as campaigns from "../../lib/campaigns.ts";
import * as peaceleagueClient from "../../lib/peaceleague-client.ts";
import * as solanaConfig from "../../lib/solana-config.ts";

const author = new PublicKey("11111111111111111111111111111111");

function makeCosmicCampaign(overrides: Record<string, unknown> = {}) {
  return {
    id: "cosmic-1",
    title: "Clean Water for Village",
    slug: "clean-water-for-village",
    metadata: {
      description: "Cosmic description",
      image: "https://example.com/image.jpg",
      goal: 5,
      raised: 1,
      donors: 2,
      beneficiary_name: "Village Council",
      beneficiary_story: "Detailed story",
      status: "active",
      category: "community",
      location: "Kenya",
      created_at: "2026-05-03T00:00:00.000Z",
      ...overrides,
    },
  };
}

test("mergeCampaignSources prefers on-chain fundraising fields and derives fallback pda", () => {
  const cosmic = makeCosmicCampaign({ onchain_campaign_id: "7" });
  const onchain = {
    author,
    title: "On-chain title",
    description: "On-chain description",
    imageUrl: "https://example.com/onchain.jpg",
    goal: 5_000_000_000n,
    raised: 2_500_000_000n,
    donatedCount: 12,
    createdAt: 1_746_230_400n,
    isDeleted: false,
    bump: 255,
    campaignId: 7n,
  };

  const merged = campaigns.mergeCampaignSources(cosmic as any, onchain as any);

  assert.equal(merged.onchainCampaignId, 7);
  assert.equal(merged.campaignPda, peaceleagueClient.getCampaignAddress(7).toBase58());
  assert.equal(merged.authorWallet, author.toBase58());
  assert.equal(merged.goalLamports, 5_000_000_000n);
  assert.equal(merged.raisedLamports, 2_500_000_000n);
  assert.equal(merged.donorCount, 12);
  assert.equal(merged.cluster, solanaConfig.SOLANA_CLUSTER);
});

test("mergeCampaignSources preserves explicit Cosmic linkage metadata when present", () => {
  const cosmic = makeCosmicCampaign({
    onchain_campaign_id: 9,
    campaign_pda: "custom-pda",
    author_wallet: "custom-author",
    tx_signature: "sig-123",
    cluster: "devnet",
  });

  const merged = campaigns.mergeCampaignSources(cosmic as any, null);

  assert.equal(merged.onchainCampaignId, 9);
  assert.equal(merged.campaignPda, "custom-pda");
  assert.equal(merged.authorWallet, "custom-author");
  assert.equal(merged.txSignature, "sig-123");
  assert.equal(merged.cluster, "devnet");
  assert.equal(merged.onchain, null);
});
