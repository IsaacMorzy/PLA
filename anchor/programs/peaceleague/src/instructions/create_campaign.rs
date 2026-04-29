//! Create Campaign instruction
//! 
//! Creates a new crowdfunding campaign

use anchor_lang::prelude::*;
use crate::states::campaign::{Campaign, CAMPAIGN_SPACE};
use crate::states::program_state::ProgramState;


#[derive(Accounts)]
#[instruction_args]
pub struct CreateCampaign<'info> {
    /// Campaign creator
    #[account(mut)]
    pub creator: Signer<'info>,
    /// ProgramState (to increment campaign_count)
    #[account(
        mut,
        seeds = [ProgramState::INIT_SEED],
        bump = program_state.bump,
    )]
    pub program_state: Account<'info, ProgramState>,
    /// New Campaign account (PDA)
    #[account(
        init,
        seeds = [Campaign::INIT_SEED, &program_state.campaign_count.to_le_bytes()],
        bump,
        payer = creator,
        space = CAMPAIGN_SPACE,
    )]
    pub campaign: Account<'info, Campaign>,
    /// System program
    pub system_program: Program<'info, System>,
    /// Rent sysvar
    pub rent: Sysvar<'info, Rent>,
}


/// Input for create_campaign
#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct CreateCampaignArgs {
    pub title: String,
    pub description: String,
    pub image_url: String,
    pub goal: u64,
}


pub fn create_campaign(ctx: Context<CreateCampaign>, args: CreateCampaignArgs) -> Result<()> {
    // Validate goal (min 1 SOL = 1_000_000_000 lamports)
    require!(args.goal >= 1_000_000_000, CampaignError::InvalidGoal);
    
    // Validate strings aren't empty
    require!(!args.title.is_empty(), CampaignError::EmptyTitle);
    require!(!args.description.is_empty(), CampaignError::EmptyDescription);
    
    // Get campaign count before incrementing
    let cid = ctx.accounts.program_state.campaign_count;
    
    // Initialize campaign
    let campaign = &mut ctx.accounts.campaign;
    campaign.cid = cid;
    campaign.creator = ctx.accounts.creator.key();
    campaign.title = args.title;
    campaign.description = args.description;
    campaign.image_url = args.image_url;
    campaign.goal = args.goal;
    campaign.amount_raised = 0;
    campaign.timestamp = Clock::get()?.unixTimestamp;
    campaign.donors = 0;
    campaign.balance = 0;
    campaign.is_active = true;
    
    // Increment campaign count
    ctx.accounts.program_state.campaign_count = cid + 1;
    
    msg!("Campaign {} created: {}", cid, campaign.title);
    
    Ok(())
}


/// Custom error codes
#[error_code]
pub enum CampaignError {
    #[msg("Goal must be at least 1 SOL")]
    InvalidGoal,
    
    #[msg("Title cannot be empty")]
    EmptyTitle,
    
    #[msg("Description cannot be empty")]
    EmptyDescription,
    
    #[msg("Campaign is not active")]
    InactiveCampaign,
    
    #[msg("Only creator can withdraw")]
    NotCreator,
    
    #[msg("Amount exceeds balance")]
    InsufficientBalance,
}