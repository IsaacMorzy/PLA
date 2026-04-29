use crate::states::{Campaign, ProgramState};
use anchor_lang::prelude::*;

#[derive(Accounts)]
pub struct InitializeCtx<'info> {
    #[account(
        init,
        seeds = [ProgramState::SEED],
        bump,
        payer = authority,
        space = 8 + ProgramState::INIT_SPACE
    )]
    pub state: Account<'info, ProgramState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn initialize(ctx: Context<InitializeCtx>) -> Result<()> {
    let state = &mut ctx.accounts.state;
    state.campaign_count = 0;
    state.authority = ctx.accounts.authority.key();
    state.bump = ctx.bumps.state;
    Ok(())
}

#[derive(Accounts)]
pub struct CreateCampaignCtx<'info> {
    #[account(
        init,
        seeds = [Campaign::SEED_PREFIX, &(ctx.accounts.state.campaign_count + 1).to_le_bytes()],
        bump,
        payer = authority,
        space = 8 + Campaign::INIT_SPACE
    )]
    pub campaign: Account<'info, Campaign>,
    #[account(
        mut,
        seeds = [ProgramState::SEED],
        bump = state.bump,
    )]
    pub state: Account<'info, ProgramState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn create_campaign(
    ctx: Context<CreateCampaignCtx>,
    title: String,
    description: String,
    image_url: String,
    goal: u64,
) -> Result<()> {
    let state = &mut ctx.accounts.state;
    let campaign = &mut ctx.accounts.campaign;
    let campaign_id = state.campaign_count + 1;

    campaign.author = ctx.accounts.authority.key();
    campaign.title = title;
    campaign.description = description;
    campaign.image_url = image_url;
    campaign.goal = goal;
    campaign.raised = 0;
    campaign.donated_count = 0;
    campaign.created_at = Clock::get().unwrap().unix_timestamp as u64;
    campaign.is_deleted = false;
    campaign.bump = ctx.bumps.campaign;
    campaign.campaign_id = campaign_id;

    state.campaign_count = campaign_id;
    Ok(())
}

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct DonateCtx<'info> {
    #[account(
        mut,
        seeds = [Campaign::SEED_PREFIX, &id.to_le_bytes()],
        bump = campaign.bump,
    )]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub donor: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn donate(ctx: Context<DonateCtx>, _id: u64, amount: u64) -> Result<()> {
    let campaign = &mut ctx.accounts.campaign;
    require!(!campaign.is_deleted, ErrorCode::CampaignDeleted);
    campaign.raised = campaign.raised.saturating_add(amount);
    campaign.donated_count = campaign.donated_count.saturating_add(1);
    Ok(())
}

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct WithdrawCtx<'info> {
    #[account(
        mut,
        seeds = [Campaign::SEED_PREFIX, &id.to_le_bytes()],
        bump = campaign.bump,
        constraint = campaign.author == authority.key()
    )]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

pub fn withdraw(ctx: Context<WithdrawCtx>, _id: u64, amount: u64) -> Result<()> {
    let campaign = &mut ctx.accounts.campaign;
    require!(!campaign.is_deleted, ErrorCode::CampaignDeleted);
    require!(amount <= campaign.raised, ErrorCode::InsufficientFunds);
    require!(ctx.accounts.authority.key() == campaign.author, ErrorCode::Unauthorized);
    campaign.raised = campaign.raised.saturating_sub(amount);
    Ok(())
}

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct DeleteCampaignCtx<'info> {
    #[account(
        mut,
        seeds = [Campaign::SEED_PREFIX, &id.to_le_bytes()],
        bump = campaign.bump,
        constraint = campaign.author == authority.key()
    )]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub authority: Signer<'info>,
}

pub fn delete_campaign(ctx: Context<DeleteCampaignCtx>, _id: u64) -> Result<()> {
    let campaign = &mut ctx.accounts.campaign;
    require!(ctx.accounts.authority.key() == campaign.author, ErrorCode::Unauthorized);
    campaign.is_deleted = true;
    Ok(())
}

#[error_code]
pub enum ErrorCode {
    #[msg("Campaign has been deleted")]
    CampaignDeleted,
    #[msg("Insufficient funds for withdrawal")]
    InsufficientFunds,
    #[msg("Unauthorized access")]
    Unauthorized,
}