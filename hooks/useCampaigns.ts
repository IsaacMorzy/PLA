/**
 * Peace League Africa - useCampaigns Hook
 * 
 * React hook for interacting with the PeaceLeague program
 */

import { useState, useEffect, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram 
} from "@solana/web3.js";
import { 
  Program, 
  AnchorProvider, 
  BN, 
  web3 
} from "@coral-xyz/anchor";
import idl from "@/lib/idl.json";
import { 
  PROGRAM_ID, 
  getProgramStateAddress, 
  getCampaignAddress,
  getAllCampaignAddresses,
  MIN_CAMPAIGN_GOAL,
  MIN_DONATION,
  PLATFORM_FEE_PERCENT,
  lamportsToSol,
  solToLamports,
} from "@/lib/program";
import type { 
  Campaign, 
  CampaignDisplay, 
  CreateCampaignInput,
  DonationInput,
  WithdrawalInput,
  CreateCampaignResult,
  DonateResult,
  WithdrawResult,
  ProgramState 
} from "@/types/campaign";

const MAX_CAMPAIGNS = 100; // Max campaigns to fetch

/**
 * Hook for campaign operations
 */
export function useCampaigns() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  
  const [program, setProgram] = useState<Program | null>(null);
  const [programState, setProgramState] = useState<ProgramState | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize program
  useEffect(() => {
    if (!connection) return;
    
    // Create Anchor provider for read-only operations
    const provider = new AnchorProvider(
      connection,
      { publicKey: PublicKey.default, signTransaction: async (tx: Transaction) => tx } as any,
      AnchorProvider.defaultOptions()
    );
    
    const prog = new Program(idl as any, provider);
    setProgram(prog);
  }, [connection]);

  /**
   * Fetch program state
   */
  const fetchProgramState = useCallback(async () => {
    if (!program || !connection) return null;
    
    try {
      const stateAddress = getProgramStateAddress();
      const state = await (program as any).account.programState.fetch(stateAddress);
      
      if (state) {
        setProgramState({
          admin: state.admin,
          campaignCount: Number(state.campaignCount),
          totalRaised: Number(state.totalRaised),
          platformFee: state.platformFee,
          bump: state.bump,
        });
        return state;
      }
    } catch (err) {
      // Program may not be initialized yet
      console.log("Program state not found:", err);
    }
    return null;
  }, [program, connection]);

  /**
   * Fetch all campaigns
   */
  const fetchCampaigns = useCallback(async () => {
    if (!program || !connection) return [];
    
    setLoading(true);
    setError(null);
    
    try {
      // First get program state to know campaign count
      const state = await fetchProgramState();
      
      if (!state) {
        setCampaigns([]);
        return [];
      }
      
      const count = Number(state.campaignCount);
      if (count === 0) {
        setCampaigns([]);
        return [];
      }
      
      // Fetch all campaign accounts
      const campaignAddresses = getAllCampaignAddresses(count);
      const fetchedCampaigns: Campaign[] = [];
      
      for (const address of campaignAddresses) {
        try {
const account = await (program as any).account.campaign.fetch(address);
          if (account) {
            fetchedCampaigns.push({
              cid: Number(account.cid),
              creator: account.creator,
              title: account.title,
              description: account.description,
              imageUrl: account.imageUrl,
              goal: Number(account.goal),
              amountRaised: Number(account.amountRaised),
              timestamp: Number(account.timestamp),
              donors: Number(account.donors),
              balance: Number(account.balance),
              isActive: account.isActive,
            });
          }
        } catch {
          // Campaign may not exist
        }
      }
      
      setCampaigns(fetchedCampaigns);
      return fetchedCampaigns;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch campaigns";
      setError(message);
      console.error("Error fetching campaigns:", err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [program, connection, fetchProgramState]);

  /**
   * Create a new campaign
   */
  const createCampaign = useCallback(async (
    input: CreateCampaignInput
  ): Promise<CreateCampaignResult | null> => {
    if (!program || !publicKey || !sendTransaction) {
      setError("Wallet not connected");
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Validation
      if (!input.title.trim()) {
        throw new Error("Title cannot be empty");
      }
      if (!input.description.trim()) {
        throw new Error("Description cannot be empty");
      }
      if (input.goal < MIN_CAMPAIGN_GOAL) {
        throw new Error(`Goal must be at least ${lamportsToSol(MIN_CAMPAIGN_GOAL)} SOL`);
      }
      
      // Get program state to get next campaign ID
      const stateAddress = getProgramStateAddress();
      const state = await (program as any).account.programState.fetch(stateAddress);
      const cid = Number(state.campaignCount);
      const campaignAddress = getCampaignAddress(cid);
      
      // Build transaction
      const tx = await program.methods
        .createCampaign({
          title: input.title,
          description: input.description,
          imageUrl: input.imageUrl,
          goal: new BN(input.goal),
        })
        .accounts({
          creator: publicKey,
          programState: stateAddress,
          campaign: campaignAddress,
          systemProgram: SystemProgram.programId,
        })
        .transaction();
      
      // Send transaction
      const signature = await sendTransaction(tx, connection, {
        maxRetries: 3,
      });
      
      // Refresh campaigns
      await fetchCampaigns();
      
      return {
        campaignAddress,
        cid,
        signature,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to create campaign";
      setError(message);
      console.error("Error creating campaign:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [program, publicKey, sendTransaction, connection, fetchCampaigns]);

  /**
   * Donate to a campaign
   */
  const donate = useCallback(async (
    input: DonationInput
  ): Promise<DonateResult | null> => {
    if (!program || !publicKey || !sendTransaction) {
      setError("Wallet not connected");
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      if (input.amount < MIN_DONATION) {
        throw new Error(`Minimum donation is ${lamportsToSol(MIN_DONATION)} SOL`);
      }
      
      // Build transaction
      const tx = await program.methods
        .donate(new BN(input.amount))
        .accounts({
          donor: publicKey,
          campaign: input.campaignAddress,
          programState: getProgramStateAddress(),
          systemProgram: SystemProgram.programId,
        })
        .transaction();
      
      // Add transfer instruction (donor -> campaign)
      tx.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: input.campaignAddress,
          lamports: input.amount,
        })
      );
      
      // Send transaction
      const signature = await sendTransaction(tx, connection, {
        maxRetries: 3,
      });
      
      // Refresh campaigns
      await fetchCampaigns();
      
      return {
        signature,
        amount: input.amount,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to donate";
      setError(message);
      console.error("Error donating:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [program, publicKey, sendTransaction, connection, fetchCampaigns]);

  /**
   * Withdraw from a campaign
   */
  const withdraw = useCallback(async (
    input: WithdrawalInput
  ): Promise<WithdrawResult | null> => {
    if (!program || !publicKey || !sendTransaction) {
      setError("Wallet not connected");
      return null;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // Build transaction
      const tx = await program.methods
        .withdraw(new BN(input.amount))
        .accounts({
          creator: publicKey,
          campaign: input.campaignAddress,
          destination: publicKey,
          systemProgram: SystemProgram.programId,
        })
        .transaction();
      
      // Send transaction
      const signature = await sendTransaction(tx, connection, {
        maxRetries: 3,
      });
      
      // Refresh campaigns
      await fetchCampaigns();
      
      return {
        signature,
        destination: publicKey,
        amount: input.amount,
      };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to withdraw";
      setError(message);
      console.error("Error withdrawing:", err);
      return null;
    } finally {
      setLoading(false);
    }
  }, [program, publicKey, sendTransaction, connection, fetchCampaigns]);

  /**
   * Format campaign for display
   */
  const formatCampaign = useCallback((campaign: Campaign): CampaignDisplay => {
    const progress = campaign.goal > 0 
      ? (campaign.amountRaised / campaign.goal) * 100 
      : 0;
    
    const now = Math.floor(Date.now() / 1000);
    const daysActive = Math.floor((now - campaign.timestamp) / (24 * 60 * 60));
    
    return {
      ...campaign,
      goalFormatted: `${lamportsToSol(campaign.goal).toFixed(2)} SOL`,
      amountRaisedFormatted: `${lamportsToSol(campaign.amountRaised).toFixed(2)} SOL`,
      progressPercent: Math.min(progress, 100),
      donorCountFormatted: campaign.donors.toString(),
      createdDate: new Date(campaign.timestamp * 1000).toLocaleDateString(),
      daysActive,
      isFunded: campaign.amountRaised >= campaign.goal,
    };
  }, []);

  /**
   * Get campaigns formatted for display
   */
  const displayCampaigns = campaigns.map(formatCampaign);

  /**
   * Get a single campaign by address
   */
  const getCampaign = useCallback(async (address: PublicKey): Promise<Campaign | null> => {
    if (!program) return null;
    
    try {
      const account = await (program as any).account.campaign.fetch(address);
      return {
        cid: Number(account.cid),
        creator: account.creator,
        title: account.title,
        description: account.description,
        imageUrl: account.imageUrl,
        goal: Number(account.goal),
        amountRaised: Number(account.amountRaised),
        timestamp: Number(account.timestamp),
        donors: Number(account.donors),
        balance: Number(account.balance),
        isActive: account.isActive,
      };
    } catch {
      return null;
    }
  }, [program]);

  return {
    // State
    programState,
    campaigns: displayCampaigns,
    loading,
    error,
    isConnected: !!publicKey,
    
    // Methods
    fetchCampaigns,
    fetchProgramState,
    createCampaign,
    donate,
    withdraw,
    getCampaign,
    formatCampaign,
    
    // Constants
    MIN_CAMPAIGN_GOAL,
    MIN_DONATION,
    PLATFORM_FEE_PERCENT,
  };
}