import test from "node:test";
import assert from "node:assert/strict";
import { PublicKey } from "@solana/web3.js";
import * as peaceleagueClient from "../../lib/peaceleague-client.ts";

test("getStateAddress derives the singleton state PDA", () => {
  const expected = PublicKey.findProgramAddressSync(
    [Buffer.from("state")],
    peaceleagueClient.PROGRAM_ID
  )[0];

  assert.equal(peaceleagueClient.getStateAddress().toBase58(), expected.toBase58());
});

test("getCampaignAddress derives campaign PDAs with 8-byte little-endian ids", () => {
  const campaignId = 256;
  const idBuffer = Buffer.alloc(8);
  idBuffer.writeBigUInt64LE(BigInt(campaignId));

  const expected = PublicKey.findProgramAddressSync(
    [Buffer.from("campaign"), idBuffer],
    peaceleagueClient.PROGRAM_ID
  )[0];

  assert.equal(peaceleagueClient.getCampaignAddress(campaignId).toBase58(), expected.toBase58());
});

test("getCampaignAddress changes when the high bytes of the u64 id change", () => {
  const idOne = peaceleagueClient.getCampaignAddress(1).toBase58();
  const id256 = peaceleagueClient.getCampaignAddress(256).toBase58();

  assert.notEqual(idOne, id256);
});
