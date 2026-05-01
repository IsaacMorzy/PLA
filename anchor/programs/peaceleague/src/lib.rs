//! PeaceLeague Africa - Solana Crowdfunding Program
//! Anchor 0.32 compatible - SIMPLIFIED

#![allow(unexpected_cfgs)]

use anchor_lang::prelude::*;
use anchor_lang::system_program::{Transfer, transfer as system_transfer};

// ===== Program ID =====
declare_id!("65VieGUg5tJEQDAHEgTLXqxVaKJWdQEnzAXyrdLuRt2K");

// ===== Constants =====
const STATE_SEED: &[u8] = b"state";
const CAMPAIGN_SEED: &[u8] = b"campaign";

// ===== Error Codes =====
#[error_code]
pub enum CampaignError {
    #[msg("Goal must be at least 1 SOL")]
    InvalidGoal,
    #[msg("Title cannot be empty")]
    EmptyTitle,
    #[msg("Description cannot be empty")]
    EmptyDescription,
    #[msg("Campaign has been deleted")]
    CampaignDeleted,
    #[msg("Insufficient funds for withdrawal")]
    InsufficientFunds,
    #[msg("Unauthorized - not campaign author")]
    Unauthorized,
}

// ===== Program State Account =====
#[account]
#[derive(InitSpace)]
pub struct ProgramState {
    pub campaign_count: u64,
    pub authority: Pubkey,
    pub bump: u8,
}

// ===== Campaign Account =====
#[account]
#[derive(InitSpace)]
pub struct Campaign {
    pub author: Pubkey,
    #[max_len(64)]
    pub title: String,
    #[max_len(512)]
    pub description: String,
    #[max_len(128)]
    pub image_url: String,
    pub goal: u64,
    pub raised: u64,
    pub donated_count: u32,
    pub created_at: i64,
    pub is_deleted: bool,
    pub bump: u8,
    pub campaign_id: u64,
}

// ===== Initialize Instruction =====
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + ProgramState::INIT_SPACE,
        seeds = [STATE_SEED],
        bump,
    )]
    pub state: Account<'info, ProgramState>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// ===== Helper: Get campaign PDA =====
pub fn get_campaign_pda(campaign_id: u64) -> (Pubkey, u8) {
    Pubkey::find_program_address(
        &[CAMPAIGN_SEED, &campaign_id.to_le_bytes()],
        &ID,
    )
}

// ===== Create Campaign Instruction =====
#[derive(Accounts)]
#[instruction(campaign_id: u64)]
pub struct CreateCampaign<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + Campaign::INIT_SPACE,
        seeds = [CAMPAIGN_SEED, &campaign_id.to_le_bytes()],
        bump,
    )]
    pub campaign: Account<'info, Campaign>,
    #[account(
        mut,
        seeds = [STATE_SEED],
        bump,
    )]
    pub state: Account<'info, ProgramState>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// ===== Donate Instruction =====
#[derive(Accounts)]
#[instruction(campaign_id: u64)]
pub struct Donate<'info> {
    #[account(mut)]
    pub donor: Signer<'info>,
    #[account(
        mut,
        seeds = [CAMPAIGN_SEED, &campaign_id.to_le_bytes()],
        bump,
    )]
    pub campaign: Account<'info, Campaign>,
    pub system_program: Program<'info, System>,
}

// ===== Withdraw Instruction =====
#[derive(Accounts)]
#[instruction(campaign_id: u64)]
pub struct Withdraw<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [CAMPAIGN_SEED, &campaign_id.to_le_bytes()],
        bump,
    )]
    pub campaign: Account<'info, Campaign>,
    pub system_program: Program<'info, System>,
}

// ===== Delete Campaign Instruction =====
#[derive(Accounts)]
#[instruction(campaign_id: u64)]
pub struct DeleteCampaign<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,
    #[account(
        mut,
        seeds = [CAMPAIGN_SEED, &campaign_id.to_le_bytes()],
        bump,
    )]
    pub campaign: Account<'info, Campaign>,
}

// ===== Program Module =====
#[program]
pub mod peaceleague {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.campaign_count = 0;
        state.authority = ctx.accounts.authority.key();
        state.bump = ctx.bumps.state;
        Ok(())
    }

    pub fn create_campaign(
        ctx: Context<CreateCampaign>,
        campaign_id: u64,
        title: String,
        description: String,
        image_url: String,
        goal: u64,
    ) -> Result<()> {
        // Validate inputs
        require!(goal >= 1_000_000_000, CampaignError::InvalidGoal);
        require!(!title.is_empty(), CampaignError::EmptyTitle);
        require!(!description.is_empty(), CampaignError::EmptyDescription);

        let state = &mut ctx.accounts.state;
        let campaign = &mut ctx.accounts.campaign;

        campaign.author = ctx.accounts.creator.key();
        campaign.title = title;
        campaign.description = description;
        campaign.image_url = image_url;
        campaign.goal = goal;
        campaign.raised = 0;
        campaign.donated_count = 0;
        campaign.created_at = Clock::get()?.unix_timestamp;
        campaign.is_deleted = false;
        campaign.bump = ctx.bumps.campaign;
        campaign.campaign_id = campaign_id;

        state.campaign_count = state.campaign_count
            .checked_add(1)
            .ok_or(ProgramError::ArithmeticOverflow)?;

        Ok(())
    }

    pub fn donate(ctx: Context<Donate>, _campaign_id: u64, amount: u64) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;

        require!(!campaign.is_deleted, CampaignError::CampaignDeleted);
        require!(amount > 0, CampaignError::InsufficientFunds);

        // Update campaign state with safe arithmetic
        campaign.raised = campaign.raised
            .checked_add(amount)
            .ok_or(ProgramError::ArithmeticOverflow)?;
        campaign.donated_count = campaign.donated_count
            .checked_add(1)
            .ok_or(ProgramError::ArithmeticOverflow)?;

        // CPI transfer using anchor_lang::system_program::transfer
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.donor.to_account_info(),
                to: ctx.accounts.campaign.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(cpi_context, amount)?;
        
        Ok(())
    }

    pub fn withdraw(ctx: Context<Withdraw>, campaign_id: u64) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;

        require!(campaign.author == ctx.accounts.authority.key(), CampaignError::Unauthorized);
        require!(!campaign.is_deleted, CampaignError::CampaignDeleted);
        require!(campaign.raised > 0, CampaignError::InsufficientFunds);

        let amount = campaign.raised;
        let bump = campaign.bump;
        campaign.raised = 0;

        // Use Anchor's system_program::transfer with signer seeds
        // Build seeds inline to minimize stack usage
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.campaign.to_account_info(),
                to: ctx.accounts.authority.to_account_info(),
            },
        );
        
        // Transfer with signer seeds - using with_signer with inline seeds
        system_transfer(
            cpi_context.with_signer(&[&[CAMPAIGN_SEED, &campaign_id.to_le_bytes(), &[bump]][..]]),
            amount,
        )?;

        Ok(())
    }

    pub fn delete_campaign(ctx: Context<DeleteCampaign>, _campaign_id: u64) -> Result<()> {
        let campaign = &mut ctx.accounts.campaign;

        require!(campaign.author == ctx.accounts.authority.key(), CampaignError::Unauthorized);

        campaign.is_deleted = true;
        Ok(())
    }
}