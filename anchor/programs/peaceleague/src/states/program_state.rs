//! Program-wide state for Peace League Africa
//! 
//! Singleton account storing program-wide configuration and counters

use anchor_lang::prelude::*;


#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct ProgramState {
    /// Program admin (can update config)
    pub admin: Pubkey,
    /// Total campaigns created
    pub campaign_count: u64,
    /// Total SOL raised (lamports)
    pub total_raised: u64,
    /// Platform fee in percent (5 = 5%)
    pub platform_fee: u8,
    /// Bump seed for PDA
    pub bump: u8,
}

impl ProgramState {
    pub const INIT_SEED: &'static [u8] = b"program_state";
    
    /// Default platform fee is 5%
    pub const DEFAULT_FEE: u8 = 5;
}

/// Space required: 8 (discriminator) + 32 + 8 + 8 + 1 + 1 = 58
pub const PROGRAM_STATE_SPACE: usize = 8 + 32 + 8 + 8 + 1 + 1;