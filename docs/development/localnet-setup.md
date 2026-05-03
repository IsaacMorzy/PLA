# Localnet Setup Guide

Use this when you want to run the unified campaign flow against a **local Solana validator** instead of devnet.

## 0. Prerequisites

You need all of these installed locally:

- Node 22+
- pnpm
- Solana CLI
- Anchor CLI
- Rust / cargo
- wallet browser extension (Phantom or Solflare)

Verify:

```bash
solana --version
anchor --version
cargo --version
node -v
pnpm -v
```

## 1. Configure localnet env

Copy env file:

```bash
cp .env.example .env.local
```

Set `.env.local`:

```bash
NEXT_PUBLIC_SOLANA_CLUSTER=localnet
NEXT_PUBLIC_SOLANA_RPC=http://127.0.0.1:8899
NEXT_PUBLIC_PROGRAM_ID=65VieGUg5tJEQDAHEgTLXqxVaKJWdQEnzAXyrdLuRt2K

COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-cosmic-read-key
COSMIC_WRITE_KEY=your-cosmic-write-key
```

## 2. Install dependencies

```bash
pnpm install
cd anchor && npm install && cd ..
```

## 3. Start local validator

In one terminal:

```bash
solana-test-validator --reset
```

Keep it running.

## 4. Point Solana CLI to localnet

In another terminal:

```bash
solana config set --url http://127.0.0.1:8899
solana config get
```

## 5. Build and deploy the program to localnet

From the `anchor` directory:

```bash
cd anchor
anchor build
anchor deploy
cd ..
```

Important:
- after deploy, confirm the deployed program ID matches `NEXT_PUBLIC_PROGRAM_ID`
- if Anchor deploy outputs a different program ID, update `.env.local` and any related config to match

## 6. Initialize program state on localnet

The existing helper script targets devnet, so for localnet either:
- temporarily adapt `scripts/init-state.js`, or
- run an initialize transaction using Anchor test flow, or
- initialize through a small one-off script pointed at localnet

The key requirement is:
- the `state` PDA must exist before create flow is used

## 7. Fund local wallet(s)

If using the default local validator keypair:

```bash
solana address
solana balance
solana airdrop 100
```

If testing with another wallet pubkey:

```bash
solana airdrop 100 <PUBKEY>
```

## 8. Configure browser wallet for localnet

In Phantom/Solflare:
- enable localhost / localnet support if needed
- connect to `http://127.0.0.1:8899`
- ensure wallet has localnet SOL

## 9. Start frontend

```bash
pnpm dev
```

Open:
- `http://localhost:3000/create`
- `http://localhost:3000/campaigns`

## 10. Static checks

```bash
pnpm -s exec tsc --noEmit
pnpm test:unit
```

## 11. Run Anchor integration suite

With validator running:

```bash
cd anchor
npm test
cd ..
```

Expected:
- program initialize passes
- create/donate/withdraw/delete flow passes

## 12. Manual localnet smoke test

### Create
1. Open `/create`
2. Connect wallet
3. Create campaign
4. Approve transaction

Expected:
- success screen appears
- explorer links use custom localnet URL
- `/campaign/[slug]` loads

### Donate
1. Donate from wallet
2. Approve transaction

Expected:
- raised amount updates
- donor count updates

### Routing
Expected:
- `/campaigns/create` redirects to `/create`
- `/campaigns/[id]` redirects to `/campaign/[slug]`

### Listing
Expected:
- `/campaigns` shows chain-backed progress

## 13. Cosmic linkage note

Even on localnet, the app can still write to your live Cosmic bucket.

Be careful:
- use a test/staging Cosmic bucket if possible
- localnet-created campaigns are not devnet/mainnet campaigns
- make sure `cluster=localnet` is visible in the linked records

## 14. Backfill command

If you intentionally want to match localnet campaigns to Cosmic records:

```bash
pnpm backfill:campaign-links
node scripts/backfill-campaign-links.js --apply
```

Only do this against a test Cosmic bucket unless you are sure.

## 15. Quick command summary

Terminal 1:

```bash
solana-test-validator --reset
```

Terminal 2:

```bash
solana config set --url http://127.0.0.1:8899
pnpm install
(cd anchor && npm install)
(cd anchor && anchor build && anchor deploy)
pnpm -s exec tsc --noEmit
pnpm test:unit
pnpm dev
```

Terminal 3 optional:

```bash
cd anchor
npm test
```
