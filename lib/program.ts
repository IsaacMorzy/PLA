/**
 * Peace League Africa - Program Client
 * 
 * Provides typed interaction with the PeaceLeague Anchor program
 */

import { 
  Connection, 
  PublicKey, 
  Transaction, 
  TransactionInstruction 
} from "@solana/web3.js";
import { 
  AnchorProvider, 
  Program, 
  Idl, 
  BN 
} from "@coral-xyz/anchor";
import idl from "./idl.json";

// Program ID - matches Anchor deployment
export const PROGRAM_ID = new PublicKey(
  "CcmjoYupPASLWApnqmud3QJXqw7c3cC3ZSow2LmHW675"
);

// PDA Seeds
export const PROGRAM_STATE_SEED = "program_state";
export const CAMPAIGN_SEED = "campaign";

// Constants (in lamports)
export const SOL_LAMPORTS = 1_000_000_000;
export const MIN_CAMPAIGN_GOAL = 1 * SOL_LAMPORTS;  // 1 SOL
export const MIN_DONATION = 1 * SOL_LAMPORTS;       // 1 SOL
export const PLATFORM_FEE_PERCENT = 5;

/**
 * Initialize the Anchor program client
 */
export function getProgram(connection: Connection, wallet: any): Program {
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );
  
  return new Program(idl as unknown as Idl, provider);
}

/**
 * Get ProgramState PDA address
 */
export function getProgramStateAddress(): PublicKey {
  const [address] = PublicKey.findProgramAddressSync(
    [Buffer.from(PROGRAM_STATE_SEED)],
    PROGRAM_ID
  );
  return address;
}

/**
 * Get Campaign PDA address by campaign ID
 */
export function getCampaignAddress(cid: number | BN): PublicKey {
  const seed = typeof cid === 'number' ? new BN(cid) : cid;
  const [address] = PublicKey.findProgramAddressSync(
    [Buffer.from(CAMPAIGN_SEED), seed.toArrayLike(Buffer, "le", 8)],
    PROGRAM_ID
  );
  return address;
}

/**
 * Get all Campaign addresses (for given count)
 */
export function getAllCampaignAddresses(count: number): PublicKey[] {
  return Array.from({ length: count }, (_, i) => getCampaignAddress(i));
}

/**
 * Parse campaign data from account
 */
export function parseCampaign(accountData: Buffer | any) {
  if (!accountData) return null;
  
  // If already parsed by Anchor
  if (accountData.cid !== undefined) {
    return {
      cid: Number(accountData.cid),
      creator: accountData.creator,
      title: accountData.title,
      description: accountData.description,
      imageUrl: accountData.imageUrl,
      goal: Number(accountData.goal),
      amountRaised: Number(accountData.amountRaised),
      timestamp: Number(accountData.timestamp),
      donors: Number(accountData.donors),
      balance: Number(accountData.balance),
      isActive: accountData.isActive,
    };
  }
  
  return null;
}

/**
 * Format lamports to SOL
 */
export function lamportsToSol(lamports: number | BN): number {
  const num = (lamports as any).toNumber ? (lamports as BN).toNumber() : lamports;
  return num / SOL_LAMPORTS;
}

/**
 * Format SOL to lamports
 */
export function solToLamports(sol: number): number {
  return sol * SOL_LAMPORTS;
}

/**
 * Format percentage
 */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Calculate platform fee
 */
export function calculateFee(amount: number): number {
  return (amount * PLATFORM_FEE_PERCENT) / 100;
}

/**
 * Calculate amount after fee
 */
export function amountAfterFee(amount: number): number {
  return amount - calculateFee(amount);
}