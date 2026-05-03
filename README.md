# PeaceLeague Africa - Solana Smart Contract

A Solana Anchor program for the PeaceLeague Africa crowdfunding platform.

## Overview

**PeaceLeague Africa** is a decentralized crowdfunding program built on Solana that enables transparent, peer-to-peer charitable donations across Africa.

### Program Features

- **Create Campaigns** - Campaign owners can create fundraising campaigns with title, description, image, and funding goal
- **Donate** - Anyone can donate SOL to any campaign
- **Withdraw** - Campaign owners can withdraw raised funds
- **Delete** - Campaign owners can soft-delete their campaigns

## Technical Stack

- **Anchor 0.32** - Solana smart contract framework
- **Solana 3.1.x** - Blockchain runtime
- **Rust 1.85** - Program language

## Program ID

```
65VieGUg5tJEQDAHEgTLXqxVaKJWdQEnzAXyrdLuRt2K
```

## Account Structure

### ProgramState
- `campaign_count: u64` - Total campaigns created
- `authority: Pubkey` - Program admin
- `bump: u8` - PDA bump seed

### Campaign
- `author: Pubkey` - Campaign owner
- `title: String` - Campaign title (max 64 chars)
- `description: String` - Campaign description (max 512 chars)
- `image_url: String` - Campaign image URL (max 128 chars)
- `goal: u64` - Funding goal in lamports
- `raised: u64` - Amount raised in lamports
- `donated_count: u32` - Number of donations
- `created_at: u64` - Unix timestamp
- `is_deleted: bool` - Soft delete flag
- `bump: u8` - PDA bump seed
- `campaign_id: u64` - Unique campaign ID

## Instructions

| Instruction | Accounts | Args | Description |
|--------------|-----------|------|-------------|
| `initialize` | state, authority, system_program | - | Initialize program state |
| `create_campaign` | campaign, state, authority, system_program | title, description, image_url, goal | Create new campaign |
| `donate` | campaign, donor, system_program | id, amount | Donate to campaign |
| `withdraw` | campaign, authority, system_program | id, amount | Withdraw funds |
| `delete_campaign` | campaign, authority | id | Soft delete campaign |

## Building

### Prerequisites

- Solana CLI 3.1+
- Rust 1.85+
- Anchor 0.32+

### Build

```bash
cd anchor
cargo build-sbf
```

## Frontend + Unified Campaign Flow

### Environment

Copy `.env.example` and set:

- `NEXT_PUBLIC_SOLANA_CLUSTER`
- `NEXT_PUBLIC_SOLANA_RPC`
- `NEXT_PUBLIC_PROGRAM_ID`
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

### Checks

```bash
pnpm -s exec tsc --noEmit
pnpm test:unit
```

### Backfill old Cosmic campaigns

```bash
pnpm backfill:campaign-links
# review output
node scripts/backfill-campaign-links.js --apply
```

### Smoke test

See:
- `docs/development/onchain-smoke-test.md`
- `docs/development/devnet-runbook.md`
- `docs/development/localnet-setup.md`
- `docs/development/release-checklist.md`

### Deploy

```bash
anchor deploy
```

## Program Seeds

- **ProgramState**: `["state"]`
- **Campaign**: `["campaign", campaign_id]`

## Errors

| Code | Message |
|------|---------|
| 0 | Campaign has been deleted |
| 1 | Insufficient funds for withdrawal |
| 2 | Unauthorized access |

## Project Structure

```
peaceleagueafrica-anchor/
├── anchor/
│   ├── Anchor.toml          # Anchor config
│   ├── Cargo.toml           # Rust workspace
│   └── programs/
│       └── peaceleague/
│           ├── Cargo.toml  # Program dependencies
│           └── src/
│               └── lib.rs   # Main program
└── README.md
```

## Development Notes

### Anchor 0.32 Breaking Changes

- String fields require `#[max_len(N)]` attribute
- `#[error]` → `#[error_code]`
- Account access uses `&mut` instead of `.as_mut()`
- Use `require!()` macro for error handling
- Space calculation: `8 + Type::INIT_SPACE`

### Build Output

Compiled BPF program location:
```
anchor/target/release/peaceleague.so
```

## License

MIT