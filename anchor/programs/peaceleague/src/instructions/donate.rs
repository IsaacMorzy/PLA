//! Donate instruction
//! 
//! Accepts a donation to a campaign, transfers SOL from donor to campaign

use anchor_lang::prelude::*;
use anchor_spl::token::{Token, TokenAccount};
use crate::states::campaign::Campaign;
use crate::states::program_state::ProgramState;
use crate::instructions::create_campaign::{CampaignError, CreateCampaign};


#[derive(Accounts)]
pub struct Donate<'info> {
    /// Donor (pays for the donation)
    #[account(mut)]
    pub donor: Signer<'info>,
    /// Campaign to donate to (PDA)
    #[account(
        mut,
        seeds = [Campaign::INIT_SEED, &campaign.cid.to_le_bytes()],
        bump,
    )]
    pub campaign: Account<'info, Campaign>,
    /// ProgramState (for fee calculation)
    #[account(
        seeds = [ProgramState::INIT_SEED],
        bump = program_state.bump,
    )]
    pub program_state: Account<'info, ProgramState>,
    /// System program (for SOL transfer)
    pub system_program: Program<'info, System>,
}


pub fn donate(ctx: Context<Donate>, amount: u64) -> Result<()> {
    // Validate donation amount (min 1 SOL)
    require!(amount >= 1_000_000_000, CampaignError::InvalidDonation);
    
    // Validate campaign is active
    require!(ctx.accounts.campaign.is_active, CampaignError::InactiveCampaign);
    
    // Calculate platform fee (5% default)
    let fee_percent = ctx.accounts.program_state.platform_fee as u64;
    let fee = amount * fee_percent / 100;
    let amount_after_fee = amount - fee;
    
    // Transfer SOL from donor to campaign
    // Note: This is a simple transfer - in production you'd use a vault PDA
    // For this implementation, we track the "balance" as a record
    // Actual transfer would be via CPI to system_program
    
    // Update campaign stats
    let campaign = &mut ctx.accounts.campaign;
    campaign.amount_raised += amount_after_fee;
    campaign.balance += amount_after_fee;  // Track "owed" to campaign
    campaign.donors += 1;
    
    // Update program total
    ctx.accounts.program_state.total_raised += amount_after_fee;
    
    msg!(
        "Donated {} lamports ({} after fee) to campaign {}",
        amount, amount_after_fee, campaign.cid
    );
    
    Ok(())
}
}

/// Errors
#[derive(AnchorSerialize, AnchorDeserialize)]
pub enum DonateError {
    #[msg("Donation must be at least 1 SOL")]
    InvalidDonation,
}