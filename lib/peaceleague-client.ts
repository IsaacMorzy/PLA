// PeaceLeague Africa - Program Client
// 
// Direct program interaction using @solana/web3.js Connection
// Works with legacy API while keeping compatibility

import {
  Connection,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const RPC_URL = process.env.NEXT_PUBLIC_HELIUS_URL || "https://api.devnet.solana.com";

// Singleton Connection
let connection: Connection | null = null;

export function getConnection(): Connection {
  if (!connection) {
    connection = new Connection(RPC_URL, "confirmed");
  }
  return connection;
}

// Re-export for convenience
export { getConnection as getSolanaRpc };

// Program ID
export const PROGRAM_ID = new PublicKey("CVPzfvBudPvhXcJwKXKCc56VgAFttgZdTKyXrrgErDnb");

// PDA Seeds
const STATE_SEED = "state";
const CAMPAIGN_SEED = "campaign";

/**
 * Derive ProgramState PDA (singleton)
 */
export function getStateAddress(): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(STATE_SEED)],
    PROGRAM_ID
  )[0];
}

/**
 * Derive Campaign PDA by ID
 */
export function getCampaignAddress(campaignId: number): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from(CAMPAIGN_SEED), Buffer.from([campaignId])],
    PROGRAM_ID
  )[0];
}

/**
 * Helper: read BigInt64LE
 */
function readBigInt64LE(buffer: Buffer, offset: number): bigint {
  const view = new DataView(buffer.buffer, buffer.byteOffset);
  return view.getBigInt64(offset, true);
}

/**
 * Helper: read Uint32LE
 */
function readUint32LE(buffer: Buffer, offset: number): number {
  const view = new DataView(buffer.buffer, buffer.byteOffset);
  return view.getUint32(offset, true);
}

/**
 * Campaign account
 */
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

/**
 * Parse campaign account
 */
export function parseCampaignAccount(data: Buffer): CampaignAccount {
  let offset = 0;
  
  // author (32)
  const author = new PublicKey(data.subarray(offset, offset + 32));
  offset += 32;
  
  // title
  const titleLen = data.readUInt32LE(offset);
  offset += 4;
  const title = data.subarray(offset, offset + titleLen).toString("utf8");
  offset += titleLen;
  
  // description
  const descLen = data.readUInt32LE(offset);
  offset += 4;
  const description = data.subarray(offset, offset + descLen).toString("utf8");
  offset += descLen;
  
  // image_url
  const imgLen = data.readUInt32LE(offset);
  offset += 4;
  const imageUrl = data.subarray(offset, offset + imgLen).toString("utf8");
  offset += imgLen;
  
  // goal, raised, donated_count, created_at
  const goal = readBigInt64LE(data, offset);
  offset += 8;
  const raised = readBigInt64LE(data, offset);
  offset += 8;
  const donatedCount = readUint32LE(data, offset);
  offset += 4;
  const createdAt = readBigInt64LE(data, offset);
  offset += 8;
  
  // is_deleted, bump, campaign_id
  const isDeleted = data[offset] === 1;
  offset += 1;
  const bump = data[offset];
  offset += 1;
  const campaignId = readBigInt64LE(data, offset);
  
  return {
    author, title, description, imageUrl,
    goal, raised, donatedCount, createdAt,
    isDeleted, bump, campaignId,
  };
}

/**
 * Program state
 */
export interface ProgramStateAccount {
  campaignCount: bigint;
  authority: PublicKey;
  bump: number;
}

/**
 * Fetch program state
 */
export async function getProgramState(): Promise<ProgramStateAccount | null> {
  try {
    const conn = getConnection();
    const accountInfo = await conn.getAccountInfo(getStateAddress());
    if (!accountInfo) return null;
    
    const data = Buffer.from(accountInfo.data);
    let offset = 0;
    
    const campaignCount = readBigInt64LE(data, offset);
    offset += 8;
    const authority = new PublicKey(data.subarray(offset, offset + 32));
    offset += 32;
    const bump = data[offset];
    
    return { campaignCount, authority, bump };
  } catch (e) {
    console.error("Failed to fetch program state:", e);
    return null;
  }
}

/**
 * Fetch all campaigns
 */
export async function getCampaigns(limit = 20): Promise<CampaignAccount[]> {
  const state = await getProgramState();
  if (!state) return [];
  
  const conn = getConnection();
  const campaigns: CampaignAccount[] = [];
  const count = Number(state.campaignCount);
  
  for (let i = 0; i < Math.min(count, limit); i++) {
    try {
      const accountInfo = await conn.getAccountInfo(getCampaignAddress(i));
      if (accountInfo && accountInfo.data.length > 0) {
        try {
          const campaign = parseCampaignAccount(Buffer.from(accountInfo.data));
          if (!campaign.isDeleted) campaigns.push(campaign);
        } catch (e) { /* skip */ }
      }
    } catch (e) { /* skip */ }
  }
  
  return campaigns;
}

/**
 * Fetch campaign by ID
 */
export async function getCampaign(campaignId: number): Promise<CampaignAccount | null> {
  try {
    const conn = getConnection();
    const accountInfo = await conn.getAccountInfo(getCampaignAddress(campaignId));
    if (!accountInfo || accountInfo.data.length === 0) return null;
    return parseCampaignAccount(Buffer.from(accountInfo.data));
  } catch (e) {
    console.error("Failed to fetch campaign:", e);
    return null;
  }
}

/**
 * Campaigns by author
 */
export async function getCampaignsByAuthor(
  author: PublicKey,
  limit = 20
): Promise<CampaignAccount[]> {
  const state = await getProgramState();
  if (!state) return [];
  
  const campaigns: CampaignAccount[] = [];
  const count = Number(state.campaignCount);
  
  for (let i = 0; i < Math.min(count, limit); i++) {
    try {
      const campaign = await getCampaign(i);
      if (campaign && campaign.author.equals(author) && !campaign.isDeleted) {
        campaigns.push(campaign);
      }
    } catch (e) { /* skip */ }
  }
  
  return campaigns;
}

// Helpers
export function solToLamports(sol: number): number {
  return Math.floor(sol * LAMPORTS_PER_SOL);
}

export function lamportsToSol(lamports: number | bigint): number {
  return Number(lamports) / LAMPORTS_PER_SOL;
}