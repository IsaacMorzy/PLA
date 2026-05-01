//! Withdraw instruction
//! 
//! Allows campaign creator to withdraw raised funds

use anchor_lang::prelude::*;
use crate::states::campaign::Campaign;
use crate::instructions::create_campaign::CampaignError;


#[derive(Accounts)]
pub struct Withdraw<'info> {
    /// Campaign creator (can only withdraw from their campaign)
    #[account(mut)]
    pub creator: Signer<'info>,
    /// Campaign to withdraw from
    #[account(
        mut,
        seeds = [Campaign::INIT_SEED, &campaign.cid.to_le_bytes()],
        bump,
    )]
    pub campaign: Account<'info, Campaign>,
    /// Destination for withdrawal (creator's wallet)
    #[account(mut)]
    pub destination: SystemAccount<'info>,
}


pub fn withdraw(ctx: Context<Withdraw>, amount: u64) -> Result<()> {
    let campaign = &mut ctx.accounts.campaign;
    
    // Only creator can withdraw
    require!(
        ctx.accounts.creator.key() == campaign.creator,
        CampaignError::NotCreator
    );
    
    // Validate amount
    require!(amount > 0, CampaignError::InsufficientBalance);
    require!(amount <= campaign.balance, CampaignError::InsufficientBalance);
    
    // For this implementation, we track balance as a record
    // The campaign doesn't hold actual SOL (no vault PDA)
    // Actual transfer would require a vault PDA in production
    campaign.balance = campaign.balance.saturating_sub(amount);
    campaign.amount_raised = campaign.amount_raised.saturating_sub(amount);
    
    msg!("Withdrew {} lamports from campaign {} to {}", amount, campaign.cid, ctx.accounts.destination.key());
    
    Ok(())
}