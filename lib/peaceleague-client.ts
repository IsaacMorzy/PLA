// PeaceLeague Africa - Program Client
//
// Canonical frontend client for the Anchor program.
// Uses Anchor IDL coders for instruction encoding and account decoding.

import * as anchor from "@coral-xyz/anchor";
import type { BN as BNType } from "@coral-xyz/anchor";
import {
  ComputeBudgetProgram,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { peaceleagueIdl } from "./peaceleague-idl.ts";
import { PROGRAM_ID, SOLANA_RPC_URL } from "./solana-config.ts";

export { PROGRAM_ID };

export const PROGRAM_STATE_SEED = "state";
export const CAMPAIGN_SEED = "campaign";

const { BN, BorshAccountsCoder, BorshInstructionCoder } = anchor;

const instructionCoder = new BorshInstructionCoder(peaceleagueIdl);
const accountCoder = new BorshAccountsCoder(peaceleagueIdl);

let connection: Connection | null = null;

function toU64Bn(value: number | bigint | BNType): BNType {
  if (BN.isBN(value)) return value;
  return new BN(value.toString());
}

function toBigInt(value: BNType | bigint | number): bigint {
  if (typeof value === "bigint") return value;
  if (BN.isBN(value)) return BigInt(value.toString());
  return BigInt(value);
}

function campaignIdSeed(campaignId: number | bigint | BNType): Buffer {
  const id = toBigInt(campaignId);
  const buffer = Buffer.alloc(8);
  buffer.writeBigUInt64LE(id);
  return buffer;
}

export function getConnection(): Connection {
  if (!connection) {
    connection = new Connection(SOLANA_RPC_URL, "confirmed");
  }
  return connection;
}

export { getConnection as getSolanaRpc };

export function getStateAddress(): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(PROGRAM_STATE_SEED)],
    PROGRAM_ID
  )[0];
}

export function getCampaignAddress(campaignId: number | bigint | BNType): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(CAMPAIGN_SEED), campaignIdSeed(campaignId)],
    PROGRAM_ID
  )[0];
}

export interface CampaignAccount {
  author: PublicKey;
  title: string;
  description: string;
  imageUrl: string;
  goal: bigint;
  raised: bigint;
  donatedCount: number;
  createdAt: bigint;
  isDeleted: boolean;
  bump: number;
  campaignId: bigint;
}

export interface ProgramStateAccount {
  campaignCount: bigint;
  authority: PublicKey;
  bump: number;
}

function normalizeCampaignAccount(decoded: any): CampaignAccount {
  return {
    author: decoded.author,
    title: decoded.title,
    description: decoded.description,
    imageUrl: decoded.imageUrl,
    goal: toBigInt(decoded.goal),
    raised: toBigInt(decoded.raised),
    donatedCount: decoded.donatedCount,
    createdAt: toBigInt(decoded.createdAt),
    isDeleted: decoded.isDeleted,
    bump: decoded.bump,
    campaignId: toBigInt(decoded.campaignId),
  };
}

function normalizeProgramStateAccount(decoded: any): ProgramStateAccount {
  return {
    campaignCount: toBigInt(decoded.campaignCount),
    authority: decoded.authority,
    bump: decoded.bump,
  };
}

export function parseCampaignAccount(data: Buffer): CampaignAccount {
  return normalizeCampaignAccount(accountCoder.decode("campaign", data));
}

export async function getProgramState(): Promise<ProgramStateAccount | null> {
  try {
    const accountInfo = await getConnection().getAccountInfo(getStateAddress());
    if (!accountInfo) return null;
    return normalizeProgramStateAccount(
      accountCoder.decode("programState", Buffer.from(accountInfo.data))
    );
  } catch (error) {
    console.error("Failed to fetch program state:", error);
    return null;
  }
}

export async function getCampaigns(limit = 20): Promise<CampaignAccount[]> {
  const state = await getProgramState();
  if (!state) return [];

  const campaigns: CampaignAccount[] = [];
  const count = Number(state.campaignCount);
  const conn = getConnection();

  for (let i = 0; i < Math.min(count, limit); i++) {
    try {
      const accountInfo = await conn.getAccountInfo(getCampaignAddress(i));
      if (!accountInfo?.data?.length) continue;

      const campaign = parseCampaignAccount(Buffer.from(accountInfo.data));
      if (!campaign.isDeleted) {
        campaigns.push(campaign);
      }
    } catch {
      // Skip missing or malformed accounts for now.
    }
  }

  return campaigns;
}

export async function getCampaign(campaignId: number): Promise<CampaignAccount | null> {
  try {
    const accountInfo = await getConnection().getAccountInfo(getCampaignAddress(campaignId));
    if (!accountInfo?.data?.length) return null;
    return parseCampaignAccount(Buffer.from(accountInfo.data));
  } catch (error) {
    console.error("Failed to fetch campaign:", error);
    return null;
  }
}

export async function getCampaignsByAuthor(
  author: PublicKey,
  limit = 20
): Promise<CampaignAccount[]> {
  const campaigns = await getCampaigns(limit);
  return campaigns.filter((campaign) => campaign.author.equals(author));
}

export async function getNextCampaignId(connectionOverride?: Connection): Promise<number> {
  const stateAddress = getStateAddress();
  const conn = connectionOverride ?? getConnection();
  const stateInfo = await conn.getAccountInfo(stateAddress);

  if (!stateInfo?.data?.length) {
    throw new Error("Program state is not initialized on the configured cluster.");
  }

  const state = normalizeProgramStateAccount(
    accountCoder.decode("programState", Buffer.from(stateInfo.data))
  );

  return Number(state.campaignCount);
}

export function solToLamports(sol: number): number {
  return Math.floor(sol * LAMPORTS_PER_SOL);
}

export function lamportsToSol(lamports: number | bigint): number {
  return Number(lamports) / LAMPORTS_PER_SOL;
}

export async function createCampaignTx(
  connection: Connection,
  payer: PublicKey,
  title: string,
  description: string,
  imageUrl: string,
  goalLamports: number | bigint
): Promise<{ tx: Transaction; campaignAddress: PublicKey; campaignId: number }> {
  const campaignId = await getNextCampaignId(connection);
  const campaignAddress = getCampaignAddress(campaignId);

  const data = instructionCoder.encode("createCampaign", {
    campaignId: toU64Bn(campaignId),
    title,
    description,
    imageUrl,
    goal: toU64Bn(goalLamports),
  });

  const tx = new Transaction();
  tx.add(
    ComputeBudgetProgram.setComputeUnitLimit({ units: 200_000 }),
    ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 10_000 }),
    new TransactionInstruction({
      programId: PROGRAM_ID,
      keys: [
        { pubkey: campaignAddress, isWritable: true, isSigner: false },
        { pubkey: getStateAddress(), isWritable: true, isSigner: false },
        { pubkey: payer, isWritable: true, isSigner: true },
        { pubkey: SystemProgram.programId, isWritable: false, isSigner: false },
      ],
      data,
    })
  );

  return { tx, campaignAddress, campaignId };
}

export async function donateToCampaignTx(
  _connection: Connection,
  payer: PublicKey,
  campaignId: number,
  amountLamports: number | bigint
): Promise<{ tx: Transaction; campaignAddress: PublicKey }> {
  const campaignAddress = getCampaignAddress(campaignId);
  const data = instructionCoder.encode("donate", {
    campaignId: toU64Bn(campaignId),
    amount: toU64Bn(amountLamports),
  });

  const tx = new Transaction();
  tx.add(
    ComputeBudgetProgram.setComputeUnitLimit({ units: 100_000 }),
    ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 10_000 }),
    new TransactionInstruction({
      programId: PROGRAM_ID,
      keys: [
        { pubkey: payer, isWritable: true, isSigner: true },
        { pubkey: campaignAddress, isWritable: true, isSigner: false },
        { pubkey: SystemProgram.programId, isWritable: false, isSigner: false },
      ],
      data,
    })
  );

  return { tx, campaignAddress };
}

export async function withdrawFromCampaignTx(
  payer: PublicKey,
  campaignId: number
): Promise<{ tx: Transaction; campaignAddress: PublicKey }> {
  const campaignAddress = getCampaignAddress(campaignId);
  const data = instructionCoder.encode("withdraw", {
    campaignId: toU64Bn(campaignId),
  });

  const tx = new Transaction().add(
    new TransactionInstruction({
      programId: PROGRAM_ID,
      keys: [
        { pubkey: payer, isWritable: true, isSigner: true },
        { pubkey: campaignAddress, isWritable: true, isSigner: false },
        { pubkey: SystemProgram.programId, isWritable: false, isSigner: false },
      ],
      data,
    })
  );

  return { tx, campaignAddress };
}

export async function deleteCampaignTx(
  payer: PublicKey,
  campaignId: number
): Promise<{ tx: Transaction; campaignAddress: PublicKey }> {
  const campaignAddress = getCampaignAddress(campaignId);
  const data = instructionCoder.encode("deleteCampaign", {
    campaignId: toU64Bn(campaignId),
  });

  const tx = new Transaction().add(
    new TransactionInstruction({
      programId: PROGRAM_ID,
      keys: [
        { pubkey: payer, isWritable: true, isSigner: true },
        { pubkey: campaignAddress, isWritable: true, isSigner: false },
      ],
      data,
    })
  );

  return { tx, campaignAddress };
}
