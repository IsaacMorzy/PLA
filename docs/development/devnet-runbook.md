# Devnet Runbook

This is the end-to-end checklist for validating and releasing the unified PeaceLeague Africa campaign flow on **Solana devnet**.

## 0. Prerequisites

Install and verify:

- Node 22+
- pnpm
- wallet browser extension (Phantom or Solflare)
- optional for Anchor integration tests:
  - Solana CLI
  - Anchor CLI
  - Rust / cargo
  - `solana-test-validator`

Verify Node/pnpm:

```bash
node -v
pnpm -v
```

## 1. Environment setup

Copy the example env file:

```bash
cp .env.example .env.local
```

Set `.env.local` to devnet values:

```bash
NEXT_PUBLIC_SOLANA_CLUSTER=devnet
NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com
NEXT_PUBLIC_PROGRAM_ID=65VieGUg5tJEQDAHEgTLXqxVaKJWdQEnzAXyrdLuRt2K

COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-cosmic-read-key
COSMIC_WRITE_KEY=your-cosmic-write-key
```

Optional:

```bash
NEXT_PUBLIC_HELIUS_URL=
```

## 2. Install dependencies

From project root:

```bash
pnpm install
cd anchor && npm install && cd ..
```

## 3. Static validation

Run:

```bash
pnpm -s exec tsc --noEmit
pnpm test:unit
```

Expected:
- TypeScript passes
- all unit tests pass

## 4. Ensure the devnet program state exists

The create flow expects the program state PDA to already be initialized.

Use the helper script if needed:

```bash
node scripts/init-state.js
```

Notes:
- this script currently targets devnet
- it expects a funded local Solana keypair at the configured path in the script
- if needed, fund that wallet first with devnet SOL

## 5. Start the frontend

```bash
pnpm dev
```

Open:
- `http://localhost:3000/campaigns`
- `http://localhost:3000/create`

## 6. Wallet setup for devnet

In Phantom/Solflare:
- switch network to **Devnet**
- request devnet SOL from faucet or airdrop source
- confirm the wallet has enough balance for:
  - campaign creation rent + fees
  - donation test

## 7. Manual smoke test

### 7.1 Create campaign

1. Open `/create`
2. Confirm page loads directly
3. Connect wallet
4. Fill in:
   - unique title
   - description
   - valid image URL
   - goal >= 1 SOL
5. Submit
6. Approve wallet transaction

Expected:
- transaction confirms
- success screen appears
- explorer link opens devnet transaction
- "View Campaign" opens `/campaign/[slug]`

### 7.2 Verify Cosmic linkage

In Cosmic, confirm the created campaign has:
- `onchain_campaign_id`
- `campaign_pda`
- `author_wallet`
- `tx_signature`
- `cluster=devnet`

### 7.3 Verify merged detail route

Open `/campaign/[slug]`.

Expected:
- title/story/image from Cosmic
- raised/goal/donor count from chain
- organizer wallet visible
- campaign ID visible

### 7.4 Verify donation flow

1. Enter donation amount
2. Approve wallet transaction

Expected:
- transaction dialog succeeds
- explorer link opens devnet
- raised amount increases after refresh
- donor count increments after refresh

### 7.5 Verify redirects

Open:
- `/campaigns/create`
- `/campaigns/[onchain_campaign_id]`

Expected:
- `/campaigns/create` redirects to `/create`
- `/campaigns/[id]` redirects to `/campaign/[slug]`

### 7.6 Verify listing page

Open `/campaigns`.

Expected:
- created campaign appears
- progress reflects chain-backed raised/goal values
- card links to `/campaign/[slug]`

## 8. Backfill older Cosmic campaigns if needed

Dry run:

```bash
pnpm backfill:campaign-links
```

Review output carefully.

Apply:

```bash
node scripts/backfill-campaign-links.js --apply
```

Verify updated Cosmic records now include:
- `onchain_campaign_id`
- `campaign_pda`
- `author_wallet`
- `cluster`

## 9. Optional Anchor integration suite

If Anchor CLI + toolchain are available:

```bash
cd anchor
npm test
```

Expected:
- initialize/create/donate/withdraw/delete tests pass

## 10. Final pre-release check

Run:

```bash
pnpm -s exec tsc --noEmit
pnpm test:unit
```

Then review:
- `docs/development/onchain-smoke-test.md`
- `docs/development/release-checklist.md`

## 11. Quick command summary

```bash
cp .env.example .env.local
pnpm install
(cd anchor && npm install)
pnpm -s exec tsc --noEmit
pnpm test:unit
node scripts/init-state.js
pnpm dev
pnpm backfill:campaign-links
# if correct:
node scripts/backfill-campaign-links.js --apply
# optional if anchor toolchain exists:
(cd anchor && npm test)
```
