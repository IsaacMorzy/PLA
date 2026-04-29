//! Campaign account state for Peace League Africa
//! 
//! Stores all information about a crowdfunding campaign

use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct Campaign {
    /// Unique campaign ID (sequential)
    pub cid: u64,
    /// Campaign creator's wallet address
    pub creator: Pubkey,
    /// Campaign title
    pub title: String,
    /// Campaign description
    pub description: String,
    /// Image URL for campaign thumbnail
    pub image_url: String,
    /// Fundraising goal in lamports (min 1 SOL = 1_000_000_000 lamports)
    pub goal: u64,
    /// Total amount raised in lamports
    pub amount_raised: u64,
    /// Unix timestamp when campaign was created
    pub timestamp: i64,
    /// Number of donors
    pub donors: u64,
    /// Current balance in lamports
    pub balance: u64,
    /// Whether campaign is active
    pub is_active: bool,
}

impl Campaign {
    pub const INIT_SEED: &'static [u8] = b"campaign";

    /// Calculate campaign PDA seeds
    pub fn seeds(&self) -> [&[u8]; 2] {
        [Self::INIT_SEED, &self.cid.to_le_bytes()]
    }

    /// Check if goal has been reached
    pub fn is_funded(&self) -> bool {
        self.amount_raised >= self.goal
    }

    /// Check if campaign can accept donations
    pub fn can_donate(&self) -> bool {
        self.is_active && self.balance < self.goal
    }
}

/// Space required: 8 ( discriminator) + account fields
pub const CAMPAIGN_SPACE: usize = 8 + 32 + 32 + 4 + 200 + 4 + 200 + 4 + 50 + 8 + 8 + 8 + 8 + 8 + 1;