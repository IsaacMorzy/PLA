/**
 * Peace League Africa - Campaign Types
 */

import { PublicKey } from "@solana/web3.js";

/**
 * Campaign account data from the blockchain
 */
export interface Campaign {
  /** Unique campaign ID (sequential) */
  cid: number;
  /** Campaign creator's wallet address */
  creator: PublicKey;
  /** Campaign title */
  title: string;
  /** Campaign description */
  description: string;
  /** Image URL for campaign thumbnail */
  imageUrl: string;
  /** Fundraising goal in lamports */
  goal: number;
  /** Total amount raised in lamports */
  amountRaised: number;
  /** Unix timestamp when campaign was created */
  timestamp: number;
  /** Number of donors */
  donors: number;
  /** Current balance in lamports */
  balance: number;
  /** Whether campaign is active */
  isActive: boolean;
}

/**
 * ProgramState account data
 */
export interface ProgramState {
  /** Program admin (can update config) */
  admin: PublicKey;
  /** Total campaigns created */
  campaignCount: number;
  /** Total SOL raised (lamports) */
  totalRaised: number;
  /** Platform fee in percent */
  platformFee: number;
  /** Bump seed for PDA */
  bump: number;
}

/**
 * Input for creating a campaign
 */
export interface CreateCampaignInput {
  title: string;
  description: string;
  imageUrl: string;
  goal: number; // in lamports
}

/**
 * Campaign with formatted display data
 */
export interface CampaignDisplay extends Campaign {
  /** Goal formatted as SOL */
  goalFormatted: string;
  /** Amount raised formatted as SOL */
  amountRaisedFormatted: string;
  /** Progress percentage (0-100) */
  progressPercent: number;
  /** Formatted donor count */
  donorCountFormatted: string;
  /** Created date string */
  createdDate: string;
  /** Days since creation */
  daysActive: number;
  /** Is goal reached */
  isFunded: boolean;
}

/**
 * Donation input
 */
export interface DonationInput {
  campaignAddress: PublicKey;
  amount: number; // in lamports
}

/**
 * Withdrawal input
 */
export interface WithdrawalInput {
  campaignAddress: PublicKey;
  amount: number; // in lamports
}

/**
 * Campaign creation result
 */
export interface CreateCampaignResult {
  campaignAddress: PublicKey;
  cid: number;
  signature: string;
}

/**
 * Donation result
 */
export interface DonateResult {
  signature: string;
  amount: number;
}

/**
 * Withdrawal result
 */
export interface WithdrawResult {
  signature: string;
  destination: PublicKey;
  amount: number;
}

/**
 * Program error codes
 */
export enum CampaignErrorCode {
  InvalidGoal = 6000,
  EmptyTitle = 6001,
  EmptyDescription = 6002,
  InactiveCampaign = 6003,
  NotCreator = 6004,
  InsufficientBalance = 6005,
}

/**
 * Error messages mapped to codes
 */
export const CampaignErrorMessages: Record<CampaignErrorCode, string> = {
  [CampaignErrorCode.InvalidGoal]: "Goal must be at least 1 SOL",
  [CampaignErrorCode.EmptyTitle]: "Title cannot be empty",
  [CampaignErrorCode.EmptyDescription]: "Description cannot be empty",
  [CampaignErrorCode.InactiveCampaign]: "Campaign is not active",
  [CampaignErrorCode.NotCreator]: "Only the campaign creator can withdraw",
  [CampaignErrorCode.InsufficientBalance]: "Amount exceeds campaign balance",
};