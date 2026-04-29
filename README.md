# Peace League Africa 🌍

> A decentralized crowdfunding platform for African causes, built on Solana.

![Solana](https://img.shields.io/badge/Solana-000000?style=for-the-badge&logo=solana&logoColor=14f195)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## About

**Peace League Africa** is a decentralized crowdfunding platform empowering creators and donors across the African continent. Built on Solana for speed, security, and minimal fees, it enables:

- ✨ **Campaign Creation** — Launch fundraising campaigns with clear goals (minimum 1 SOL)
- 💝 **Donations** — Contribute to causes you believe in with instant transactions
- 📊 **Transparent Tracking** — Every SOL raised is tracked on-chain
- 💰 **Creator Withdrawals** — Fund creators can withdraw funds (5% platform fee)

### Why Solana?

| Feature | Benefit |
|---------|---------|
| **Fast** | Sub-second transaction finality |
| **Cheap** | Fractions of a cent per transaction |
| **Secure** | Battle-tested by millions |
| **Global** | Anyone, anywhere can participate |

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Blockchain** | Solana (Anchor 0.32+) |
| **Frontend** | Next.js 16, React 19 |
| **Styling** | Tailwind CSS v4, shadcn/ui |
| **Wallet** | @solana/wallet-adapter |
| **State** | React Hooks |

---

## Getting Started

### Prerequisites

- Node.js 24+ 
- pnpm (recommended)
- Rust toolchain (for Anchor)

### Installation

```bash
# Clone the repository
git clone https://github.com/IsaacMorzy/PLA.git
cd PLA

# Install dependencies
pnpm install

# Set up environment
echo "NEXT_PUBLIC_HELIUS_URL=https://api.mainnet-beta.solana.com" > .env.local

# Start development server
pnpm dev
```

Visit **http://localhost:3000**

---

## Project Structure

```
peaceleagueafrica/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── providers.tsx        # Theme & Wallet providers
├── anchor/                  # Solana program (Rust)
│   ├── Anchor.toml
│   └── programs/peaceleague/
│       └── src/
│           ├── lib.rs             # Program entry
│           ├── states/            # Account structs
│           │   ├── campaign.rs
│           │   └── program_state.rs
│           └── instructions/       # Program instructions
│               ├── initialize.rs
│               ├── create_campaign.rs
│               ├── donate.rs
│               └── withdraw.rs
├── components/               # React components
│   ├── ui/                  # shadcn/ui
│   ├── layout/              # Header, footer
│   └── wallet/             # Wallet integration
├── contexts/                # React contexts
│   └── ContextProvider.tsx
├── hooks/                   # Custom hooks
│   └── useCampaigns.ts      # Campaign operations
├── lib/                     # Utilities
│   ├── idl.json             # Anchor IDL
│   ├── program.ts           # Program client
│   └── utils.ts
└── types/                   # TypeScript types
    └── campaign.ts
```

---

## Smart Contract Features

| Instruction | Description |
|-------------|-------------|
| `initialize` | Set up program state (one-time) |
| `createCampaign` | Create new campaign (min 1 SOL goal) |
| `donate` | Donate SOL to campaign |
| `withdraw` | Creator withdrawals |

### Validation Rules

- ✅ Minimum campaign goal: **1 SOL**
- ✅ Minimum donation: **1 SOL**  
- ✅ Platform fee: **5%**
- ✅ Only campaign creator can withdraw
- ✅ Campaigns must be active to receive donations

---

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

---

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## Resources

- [Solana Documentation](https://docs.solana.com)
- [Anchor Framework](https://www.anchor-lang.com)
- [Next.js 16](https://nextjs.org)
- [Tailwind CSS v4](https://tailwindcss.com)

---

## License

MIT License — see [LICENSE.md](./LICENSE.md)

Built for the African continent 🌍