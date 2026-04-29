# Fundus Reference - Solana Crowdfunding dApp

Based on: https://github.com/Daltonic/fundus

## Architecture Overview

### Program Structure (Anchor/Rust)

```
anchor/programs/fundus/src/
├── lib.rs                    # Program Entry + ID
├── states/
│   ├── campaign.rs          # Campaign Account
│   ├── program_state.rs      # Global State
│   └── transaction.rs       # Donor Transaction Record
├── instructions/
│   ├── create_campaign.rs   # Create campaign
│   ├── donate.rs            # Donate SOL to campaign
│   ├── withdraw.rs         # Withdraw raised funds
│   └── ...
└── constants/
└── errors/
```

### Smart Contract Functions

| Instruction | Description |
|-------------|-------------|
| `initialize` | Initialize program state (one-time) |
| `create_campaign` | Create new campaign (title, description, image_url, goal) |
| `update_campaign` | Update existing campaign |
| `delete_campaign` | Delete a campaign |
| `donate` | Donate SOL to campaign |
| `withdraw` | Withdraw funds (creator only, 5% platform fee) |
| `update_platform_settings` | Update platform fee |

### Data Structures

#### Campaign State
```rust
pub struct Campaign {
    pub cid: u64,           // Campaign ID
    pub creator: Pubkey,    // Campaign owner
    pub title: String,     // Max 64 chars
    pub description: String, // Max 512 chars
    pub image_url: String,  // Max 256 chars
    pub goal: u64,         // Target in lamports (min 1 SOL)
    pub amount_raised: u64, // Total raised
    pub timestamp: u64,    // Created timestamp
    pub donors: u64,       // Number of donors
    pub withdrawals: u64, // Number of withdrawals
    pub balance: u64,      // Current balance
    pub active: bool,      // Is active
}
```

#### Program State
```rust
pub struct ProgramState {
    pub initialized: bool,
    pub campaign_count: u64,
    pub platform_fee: u64,     // Percentage (e.g., 5%)
    pub platform_address: Pubkey, // Fee receiver
}
```

### PDA Seeds

| Account | Seeds |
|---------|-------|
| Campaign | `["campaign", cid.to_le_bytes()]` |
| Transaction (donate) | `["donor", donor.key(), cid, donor_count]` |
| Transaction (withdraw) | `["withdraw", creator.key(), cid, withdraw_count]` |
| Program State | `["state"]` |

### Key Validation Rules

1. **Create Campaign**: Min goal = 1 SOL (1_000_000_000 lamports)
2. **Donate**: Min amount = 1 SOL, campaign must be active, goal not met
3. **Withdraw**: Only creator, min 1 SOL, can't exceed balance, pays 5% platform fee

---

## Reference vs Our Stack

| Aspect | Fundus (Old) | Our Stack (Modern) |
|--------|-------------|------------------|
| Frontend | Next.js (older) | Next.js 16 |
| Wallet | @solana/wallet-adapter | @solana/kit + wallet-standard |
| Styling | Tailwind v3 | Tailwind v4 |
| UI | Custom | shadcn/ui |
| Program | Anchor 0.30.x | Anchor 0.32+ |
| IDL Client | Anchor generated | Codama generated (@solana/kit) |
| RPC | Default | Helius |

---

## Modern Substitutions Needed

### 1. Wallet Connection
- **OLD**: `@solana/wallet-adapter-react-ui` components
- **NEW**: `@solana/kit` with wallet-standard auto-discovery

### 2. Program Client
- **OLD**: Manual Anchor IDL + Program class
- **NEW**: Codama-generated type-safe client

### 3. RPC
- **OLD**: Default connection (mainnet-beta fallback)
- **NEW**: Helius RPC with priority fees

### 4. UI Components
- **OLD**: Custom Tailwind components
- **NEW**: shadcn/ui primitives + Tailwind v4

---

## Implementation Order

1. **Phase 1**: Anchor Program (campaign CRUD, donate, withdraw)
2. **Phase 2**: Wallet connection + program client
3. **Phase 3**: Campaign listing + creation UI
4. **Phase 4**: Donation flow
5. **Phase 5**: Withdrawal flow
6. **Phase 6**: Polish + deploy

---

## Environment Variables

```
NEXT_PUBLIC_HELIUS_URL=< RPC endpoint >
NEXT_PUBLIC_PROGRAM_ID=< Anchor program ID >
```

---

## External Links

- Live Demo: https://fundus-78zt.vercel.app/
- Source: https://github.com/Daltonic/fundus