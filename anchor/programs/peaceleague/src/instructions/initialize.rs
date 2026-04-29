//! Initialize instruction - sets up the program state
//! 
//! Creates the singleton ProgramState account, only callable once

use anchor_lang::prelude::*;
use crate::states::program_state::{ProgramState, PROGRAM_STATE_SPACE};



#[derive(Accounts)]
pub struct Initialize<'info> {
    /// The payer / initializer (becomes admin)
    #[account(mut)]
    pub payer: Signer<'info>,
    /// ProgramState account (PDA)
    #[account(
        init,
        seeds = [ProgramState::INIT_SEED],
        bump,
        payer = payer,
        space = PROGRAM_STATE_SPACE,
    )]
    pub program_state: Account<'info, ProgramState>,
    /// System program
    pub system_program: Program<'info, System>,
}


pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
    let program_state = &mut ctx.accounts.program_state;
    
    program_state.admin = ctx.accounts.payer.key();
    program_state.campaign_count = 0;
    program_state.total_raised = 0;
    program_state.platform_fee = ProgramState::DEFAULT_FEE;
    
    // Get bump from context
    let bump = ctx.bumps.get("program_state").copied().unwrap_or(1);
    program_state.bump = bump;
    
    msg!("Peace League Africa initialized by {}", program_state.admin);
    
    Ok(())
}