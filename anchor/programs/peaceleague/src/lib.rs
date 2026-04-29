write the //! Peace League Africa - Solana Crowdfunding Program
//! 
//! A crowdfunding platform for African causes built on Solana

use anchor_lang::prelude::*;

// ===== Modules =====

mod states;
mod instructions;

// ===== Re-exports =====

pub use states::{campaign::Campaign, program_state::ProgramState};
pub use instructions::{
    initialize::initialize,
    create_campaign::{create_campaign, CreateCampaign, CreateCampaignArgs, CampaignError},
    donate::donate,
    withdraw::withdraw,
};

// ===== Program =====

declare_id!("Fk7iWdM7fUTDgvmTgwx1T3KMqWn3F61bUnBczVrjsBME");


#[program]
pub mod peaceleague {
    use super::*;

    pub fn initialize(ctx: Context<instructions::initialize::Initialize>) -> Result<()> {
        instructions::initialize::initialize(ctx)
    }

    pub fn create_campaign(
        ctx: Context<instructions::create_campaign::CreateCampaign>,
        args: instructions::create_campaign::CreateCampaignArgs,
    ) -> Result<()> {
        instructions::create_campaign::create_campaign(ctx, args)
    }

    pub fn donate(ctx: Context<instructions::donate::Donate>, amount: u64) -> Result<()> {
        instructions::donate::donate(ctx, amount)
    }

    pub fn withdraw(ctx: Context<instructions::withdraw::Withdraw>, amount: u64) -> Result<()> {
        instructions::withdraw::withdraw(ctx, amount)
    }
}