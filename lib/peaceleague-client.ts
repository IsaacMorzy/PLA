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
export const PROGRAM_ID = new PublicKey("65VieGUg5tJEQDAHEgTLXqxVaKJWdQEnzAXyrdLuRt2K");

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
  // Skip 8-byte Anchor account discriminator
  let offset = 8;
  
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
    // Skip 8-byte Anchor account discriminator
    let offset = 8;
    
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

// Anchor instruction discriminators (sha256("global:<name>")[0..8])
const INITIALIZE_DISCRIMINATOR = Buffer.from([175, 175, 109, 31, 13, 152, 155, 237]);
const CREATE_CAMPAIGN_DISCRIMINATOR = Buffer.from([111, 131, 187, 98, 160, 193, 114, 244]);
const DONATE_DISCRIMINATOR = Buffer.from([121, 186, 218, 211, 73, 70, 196, 180]);
const WITHDRAW_DISCRIMINATOR = Buffer.from([183, 18, 70, 156, 148, 109, 161, 34]);
const DELETE_DISCRIMINATOR = Buffer.from([223, 105, 48, 131, 88, 27, 249, 227]);

/**
 * Create campaign transaction
 */
export async function createCampaignTx(
  connection: Connection,
  payer: PublicKey,
  title: string,
  description: string,
  imageUrl: string,
  goalLamports: number
): Promise<{ tx: any; campaignAddress: PublicKey }> {
  const { Transaction, TransactionInstruction, SystemProgram, ComputeBudgetProgram } = await import("@solana/web3.js");
  
  const stateAddress = getStateAddress();
  const stateInfo = await connection.getAccountInfo(stateAddress);
  
  let campaignId = 0;
  if (stateInfo) {
    // Skip 8-byte Anchor discriminator
    const campaignCount = readBigInt64LE(Buffer.from(stateInfo.data), 8);
    campaignId = Number(campaignCount);
  }
  
  const [campaignAddress] = PublicKey.findProgramAddressSync(
    [Buffer.from(CAMPAIGN_SEED), Buffer.from([campaignId])],
    PROGRAM_ID
  );

  // Calculate campaign account size
  // author (32) + title (4 + 64) + description (4 + 512) + image_url (4 + 128) + goal (8) + raised (8) + donated_count (4) + created_at (8) + is_deleted (1) + bump (1) + campaign_id (8)
  const accountSpace = 8 + 32 + 4 + 64 + 4 + 512 + 4 + 128 + 8 + 8 + 4 + 8 + 1 + 1 + 8;
  const rentExempt = await connection.getMinimumBalanceForRentExemption(accountSpace);

  const tx = new Transaction();
  
  // Add compute budget
  tx.add(
    ComputeBudgetProgram.setComputeUnitLimit({ units: 200000 }),
    ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 10000 })
  );

  // Create campaign account
  tx.add(
    SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: campaignAddress,
      lamports: rentExempt,
      space: accountSpace,
      programId: PROGRAM_ID,
    })
  );

  // Create campaign instruction
  const data = Buffer.concat([
    CREATE_CAMPAIGN_DISCRIMINATOR,
    Buffer.from([64]), // title len prefix
    Buffer.from(title.slice(0, 64), "utf8"),
    Buffer.from([512]), // description len prefix
    Buffer.from(description.slice(0, 512), "utf8"),
    Buffer.from([128]), // image_url len prefix
    Buffer.from(imageUrl.slice(0, 128), "utf8"),
    Buffer.from(new Uint8Array(8)),
  ]);
  
  // Encode goal as le bytes
  const goalBytes = new ArrayBuffer(8);
  new DataView(goalBytes).setBigUint64(0, BigInt(goalLamports), true);
  data.set(new Uint8Array(goalBytes), data.length - 8);

  tx.add(
    new TransactionInstruction({
      keys: [
        { pubkey: campaignAddress, isWritable: true, isSigner: false },
        { pubkey: stateAddress, isWritable: true, isSigner: false },
        { pubkey: payer, isWritable: true, isSigner: true },
        { pubkey: SystemProgram.programId, isWritable: false, isSigner: false },
      ],
      programId: PROGRAM_ID,
      data,
    })
  );

  return { tx, campaignAddress };
}

/**
 * Donate to campaign transaction
 */
export async function donateToCampaignTx(
  connection: Connection,
  payer: PublicKey,
  campaignId: number,
  amountLamports: number
): Promise<{ tx: any; campaignAddress: PublicKey }> {
  const { Transaction, TransactionInstruction, SystemProgram, ComputeBudgetProgram } = await import("@solana/web3.js");
  
  const campaignAddress = getCampaignAddress(campaignId);

  const tx = new Transaction();
  
  // Add compute budget
  tx.add(
    ComputeBudgetProgram.setComputeUnitLimit({ units: 100000 }),
    ComputeBudgetProgram.setComputeUnitPrice({ microLamports: 10000 })
  );

  // Donate instruction
  const data = Buffer.concat([
    DONATE_DISCRIMINATOR,
    Buffer.from(new Uint8Array(8)),
  ]);
  
  // Encode campaign id and amount
  const idBytes = new ArrayBuffer(8);
  new DataView(idBytes).setBigUint64(0, BigInt(campaignId), true);
  data.set(new Uint8Array(idBytes), data.length - 8);
  
  const amountBytes = new ArrayBuffer(8);
  new DataView(amountBytes).setBigUint64(0, BigInt(amountLamports), true);
  data.set(new Uint8Array(amountBytes), data.length - 8);

  tx.add(
    new TransactionInstruction({
      keys: [
        { pubkey: campaignAddress, isWritable: true, isSigner: false },
        { pubkey: payer, isWritable: true, isSigner: true },
        { pubkey: SystemProgram.programId, isWritable: false, isSigner: false },
      ],
      programId: PROGRAM_ID,
      data,
    })
  );

  // Add transfer instruction
  tx.add(
    SystemProgram.transfer({
      fromPubkey: payer,
      toPubkey: campaignAddress,
      lamports: amountLamports,
    })
  );

  return { tx, campaignAddress };
}