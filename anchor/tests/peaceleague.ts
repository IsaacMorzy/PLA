import * as anchor from "@coral-xyz/anchor";
import { assert } from "chai";
import { Keypair, PublicKey, SystemProgram } from "@solana/web3.js";

const PROGRAM_ID = new PublicKey("65VieGUg5tJEQDAHEgTLXqxVaKJWdQEnzAXyrdLuRt2K");
const STATE_SEED = "state";
const CAMPAIGN_SEED = "campaign";
const ONE_SOL = 1_000_000_000;

function campaignPda(id: number) {
  const idBuffer = Buffer.alloc(8);
  idBuffer.writeBigUInt64LE(BigInt(id));
  return PublicKey.findProgramAddressSync(
    [Buffer.from(CAMPAIGN_SEED), idBuffer],
    PROGRAM_ID
  )[0];
}

describe("peaceleague", () => {
  const provider = anchor.AnchorProvider.local("http://127.0.0.1:8899", {
    commitment: "confirmed",
    preflightCommitment: "confirmed",
  });

  anchor.setProvider(provider);

  const program = anchor.workspace.Peaceleague as anchor.Program<any>;
  const [statePda] = PublicKey.findProgramAddressSync([Buffer.from(STATE_SEED)], PROGRAM_ID);

  const donor = Keypair.generate();
  const attacker = Keypair.generate();

  let baseCampaignId = 0;
  let primaryCampaignId = 0;
  let deleteCampaignId = 0;
  let primaryCampaignPda: PublicKey;
  let deleteCampaignPda: PublicKey;

  async function airdrop(pubkey: PublicKey, lamports = 5 * ONE_SOL) {
    const sig = await provider.connection.requestAirdrop(pubkey, lamports);
    await provider.connection.confirmTransaction(sig, "confirmed");
  }

  async function getState() {
    return program.account.programState.fetch(statePda);
  }

  async function getCampaign(id: number) {
    return program.account.campaign.fetch(campaignPda(id));
  }

  before(async () => {
    await Promise.all([
      airdrop(provider.wallet.publicKey, 10 * ONE_SOL),
      airdrop(donor.publicKey, 10 * ONE_SOL),
      airdrop(attacker.publicKey, 2 * ONE_SOL),
    ]);

    try {
      await getState();
    } catch {
      await program.methods.initialize().accounts({
        state: statePda,
        authority: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      }).rpc();
    }

    const state = await getState();
    baseCampaignId = Number(state.campaignCount.toString());
    primaryCampaignId = baseCampaignId;
    deleteCampaignId = baseCampaignId + 1;
    primaryCampaignPda = campaignPda(primaryCampaignId);
    deleteCampaignPda = campaignPda(deleteCampaignId);
  });

  it("initializes program state", async () => {
    const state = await getState();

    assert.equal(state.authority.toBase58(), provider.wallet.publicKey.toBase58());
    assert.isAtLeast(Number(state.campaignCount.toString()), baseCampaignId);
  });

  it("rejects invalid campaign goals below 1 SOL", async () => {
    const invalidCampaignId = deleteCampaignId + 1000;
    const invalidCampaignPda = campaignPda(invalidCampaignId);

    try {
      await program.methods
        .createCampaign(
          new anchor.BN(invalidCampaignId),
          "Invalid Goal",
          "Should fail",
          "https://example.com/invalid.jpg",
          new anchor.BN(ONE_SOL - 1)
        )
        .accounts({
          campaign: invalidCampaignPda,
          state: statePda,
          creator: provider.wallet.publicKey,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      assert.fail("expected invalid goal campaign creation to fail");
    } catch (error: any) {
      assert.include(String(error), "Goal must be at least 1 SOL");
    }
  });

  it("creates a campaign and increments campaign count", async () => {
    const stateBefore = await getState();

    await program.methods
      .createCampaign(
        new anchor.BN(primaryCampaignId),
        "Integration Test Campaign",
        "Campaign created from the refreshed Anchor test suite.",
        "https://example.com/campaign.jpg",
        new anchor.BN(2 * ONE_SOL)
      )
      .accounts({
        campaign: primaryCampaignPda,
        state: statePda,
        creator: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    const stateAfter = await getState();
    const campaign = await getCampaign(primaryCampaignId);

    assert.equal(campaign.title, "Integration Test Campaign");
    assert.equal(campaign.author.toBase58(), provider.wallet.publicKey.toBase58());
    assert.equal(Number(campaign.goal.toString()), 2 * ONE_SOL);
    assert.equal(Number(campaign.raised.toString()), 0);
    assert.equal(Number(campaign.donatedCount), 0);
    assert.equal(Number(stateAfter.campaignCount.toString()), Number(stateBefore.campaignCount.toString()) + 1);
  });

  it("accepts donations and updates raised amount and donor count", async () => {
    await program.methods
      .donate(new anchor.BN(primaryCampaignId), new anchor.BN(ONE_SOL / 2))
      .accounts({
        donor: donor.publicKey,
        campaign: primaryCampaignPda,
        systemProgram: SystemProgram.programId,
      })
      .signers([donor])
      .rpc();

    const campaign = await getCampaign(primaryCampaignId);

    assert.equal(Number(campaign.raised.toString()), ONE_SOL / 2);
    assert.equal(Number(campaign.donatedCount), 1);
  });

  it("rejects zero-value donations", async () => {
    try {
      await program.methods
        .donate(new anchor.BN(primaryCampaignId), new anchor.BN(0))
        .accounts({
          donor: donor.publicKey,
          campaign: primaryCampaignPda,
          systemProgram: SystemProgram.programId,
        })
        .signers([donor])
        .rpc();

      assert.fail("expected zero donation to fail");
    } catch (error: any) {
      assert.include(String(error), "Insufficient funds for withdrawal");
    }
  });

  it("rejects unauthorized withdrawals", async () => {
    try {
      await program.methods
        .withdraw(new anchor.BN(primaryCampaignId))
        .accounts({
          authority: attacker.publicKey,
          campaign: primaryCampaignPda,
          systemProgram: SystemProgram.programId,
        })
        .signers([attacker])
        .rpc();

      assert.fail("expected unauthorized withdraw to fail");
    } catch (error: any) {
      assert.include(String(error), "Unauthorized - not campaign author");
    }
  });

  it("allows the campaign author to withdraw raised funds", async () => {
    const campaignBalanceBefore = await provider.connection.getBalance(primaryCampaignPda);

    await program.methods
      .withdraw(new anchor.BN(primaryCampaignId))
      .accounts({
        authority: provider.wallet.publicKey,
        campaign: primaryCampaignPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    const campaign = await getCampaign(primaryCampaignId);
    const campaignBalanceAfter = await provider.connection.getBalance(primaryCampaignPda);

    assert.equal(Number(campaign.raised.toString()), 0);
    assert.isBelow(campaignBalanceAfter, campaignBalanceBefore);
  });

  it("deletes a campaign and blocks future donations", async () => {
    await program.methods
      .createCampaign(
        new anchor.BN(deleteCampaignId),
        "Delete Me",
        "Campaign that will be deleted in the test.",
        "https://example.com/delete.jpg",
        new anchor.BN(ONE_SOL)
      )
      .accounts({
        campaign: deleteCampaignPda,
        state: statePda,
        creator: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    await program.methods
      .deleteCampaign(new anchor.BN(deleteCampaignId))
      .accounts({
        authority: provider.wallet.publicKey,
        campaign: deleteCampaignPda,
      })
      .rpc();

    const deletedCampaign = await getCampaign(deleteCampaignId);
    assert.equal(deletedCampaign.isDeleted, true);

    try {
      await program.methods
        .donate(new anchor.BN(deleteCampaignId), new anchor.BN(ONE_SOL))
        .accounts({
          donor: donor.publicKey,
          campaign: deleteCampaignPda,
          systemProgram: SystemProgram.programId,
        })
        .signers([donor])
        .rpc();

      assert.fail("expected donation to deleted campaign to fail");
    } catch (error: any) {
      assert.include(String(error), "Campaign has been deleted");
    }
  });
});
