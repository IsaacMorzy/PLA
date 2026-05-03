import test from "node:test";
import assert from "node:assert/strict";
import * as anchor from "@coral-xyz/anchor";
import { ComputeBudgetProgram, PublicKey, SystemProgram } from "@solana/web3.js";
import { peaceleagueIdl } from "../../lib/peaceleague-idl.ts";
import {
  PROGRAM_ID,
  createCampaignTx,
  donateToCampaignTx,
  getCampaignAddress,
  getStateAddress,
  parseCampaignAccount,
} from "../../lib/peaceleague-client.ts";

const coder = new anchor.BorshAccountsCoder(peaceleagueIdl);
const payer = new PublicKey("11111111111111111111111111111111");

async function buildProgramStateBuffer(campaignCount: number) {
  return coder.encode("programState", {
    campaignCount: new anchor.BN(campaignCount),
    authority: payer,
    bump: 255,
  });
}

test("parseCampaignAccount decodes Anchor-encoded campaign accounts", async () => {
  const encoded = await coder.encode("campaign", {
    author: payer,
    title: "Encoded campaign",
    description: "Created in a unit test",
    imageUrl: "https://example.com/image.jpg",
    goal: new anchor.BN(2_000_000_000),
    raised: new anchor.BN(500_000_000),
    donatedCount: 3,
    createdAt: new anchor.BN(1_746_230_400),
    isDeleted: false,
    bump: 254,
    campaignId: new anchor.BN(4),
  });

  const parsed = parseCampaignAccount(Buffer.from(encoded));

  assert.equal(parsed.title, "Encoded campaign");
  assert.equal(parsed.description, "Created in a unit test");
  assert.equal(parsed.goal, 2_000_000_000n);
  assert.equal(parsed.raised, 500_000_000n);
  assert.equal(parsed.donatedCount, 3);
  assert.equal(parsed.campaignId, 4n);
});

test("createCampaignTx derives the next campaign id from program state and builds one program instruction", async () => {
  const stateData = await buildProgramStateBuffer(3);
  const fakeConnection = {
    getAccountInfo: async (address: PublicKey) => {
      assert.equal(address.toBase58(), getStateAddress().toBase58());
      return { data: stateData };
    },
  } as any;

  const { tx, campaignAddress, campaignId } = await createCampaignTx(
    fakeConnection,
    payer,
    "Unit Test Campaign",
    "Create transaction builder coverage",
    "https://example.com/create.jpg",
    2_000_000_000
  );

  assert.equal(campaignId, 3);
  assert.equal(campaignAddress.toBase58(), getCampaignAddress(3).toBase58());
  assert.equal(tx.instructions.length, 3);
  assert.equal(tx.instructions[0].programId.toBase58(), ComputeBudgetProgram.programId.toBase58());
  assert.equal(tx.instructions[1].programId.toBase58(), ComputeBudgetProgram.programId.toBase58());
  assert.equal(tx.instructions[2].programId.toBase58(), PROGRAM_ID.toBase58());
  assert.equal(tx.instructions[2].keys[0].pubkey.toBase58(), campaignAddress.toBase58());
  assert.equal(tx.instructions[2].keys[1].pubkey.toBase58(), getStateAddress().toBase58());
  assert.equal(tx.instructions[2].keys[2].pubkey.toBase58(), payer.toBase58());
  assert.equal(tx.instructions[2].keys[3].pubkey.toBase58(), SystemProgram.programId.toBase58());
});

test("donateToCampaignTx does not add a duplicate system transfer instruction", async () => {
  const { tx, campaignAddress } = await donateToCampaignTx({} as any, payer, 9, 100_000_000);

  assert.equal(campaignAddress.toBase58(), getCampaignAddress(9).toBase58());
  assert.equal(tx.instructions.length, 3);
  assert.equal(tx.instructions[2].programId.toBase58(), PROGRAM_ID.toBase58());
  assert.equal(
    tx.instructions.filter((ix) => ix.programId.toBase58() === SystemProgram.programId.toBase58()).length,
    0
  );
});
