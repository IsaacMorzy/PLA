/**
 * Peace League Africa - Generated TypeScript Types
 * 
 * Auto-generated from IDL for type-safe program interactions.
 * Run: pnpm generate-types to regenerate
 */

import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';

// Re-export common types
export { PublicKey, BN };

// ============================================================
// Accounts
// ============================================================

/** Program state account */
export interface ProgramState {
  admin: PublicKey;
  campaignCount: BN;
  totalRaised: BN;
  platformFee: number;
  bump: number;
}

/** Campaign account */
export interface Campaign {
  cid: BN;
  creator: PublicKey;
  title: string;
  description: string;
  imageUrl: string;
  goal: BN;
  raised: BN;
  active: boolean;
  bump: number;
}

// ============================================================
// Instructions
// ============================================================

/** Initialize instruction */
export interface InitializeArgs {
  admin: PublicKey;
}

/** CreateCampaign instruction */
export interface CreateCampaignArgs {
  title: string;
  description: string;
  imageUrl: string;
  goal: BN;
}

/** Donate instruction */
export interface DonateArgs {
  amount: BN;
}

/** Withdraw instruction */
export interface WithdrawArgs {
  amount: BN;
}

// ============================================================
// Program IDs
// ============================================================

export const PROGRAM_ID = new PublicKey('CcmjoYupPASLWApnqmud3QJXqw7c3cC3ZSow2LmHW675');
export const PROGRAM_STATE_SEED = 'program_state';
export const CAMPAIGN_SEED = 'campaign';

// ============================================================
// Constants
// ============================================================

export const SOL_LAMPORTS = 1_000_000_000;
export const MIN_CAMPAIGN_GOAL = 1 * SOL_LAMPORTS;  // 1 SOL
export const MIN_DONATION = 1 * SOL_LAMPORTS;       // 1 SOL
export const PLATFORM_FEE_PERCENT = 5;

/** Convert lamports to SOL */
export function lamportsToSol(lamports: BN | number): number {
  return new BN(lamports).div(new BN(SOL_LAMPORTS)).toNumber();
}

/** Convert SOL to lamports */
export function solToLamports(sol: number): BN {
  return new BN(sol).mul(new BN(SOL_LAMPORTS));
}