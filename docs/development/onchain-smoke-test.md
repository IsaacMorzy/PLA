# On-Chain Campaign Smoke Test

Use this after major frontend or Anchor-client changes.

## Prerequisites

Set env vars consistently:

```bash
export NEXT_PUBLIC_SOLANA_CLUSTER=devnet
export NEXT_PUBLIC_SOLANA_RPC=https://api.devnet.solana.com
export NEXT_PUBLIC_PROGRAM_ID=65VieGUg5tJEQDAHEgTLXqxVaKJWdQEnzAXyrdLuRt2K
export COSMIC_BUCKET_SLUG=...
export COSMIC_READ_KEY=...
export COSMIC_WRITE_KEY=...
```

Ensure program state is initialized on the target cluster.

## 1. Compile + unit test check

```bash
pnpm -s exec tsc --noEmit
pnpm test:unit
```

Expected: no errors and all unit tests pass.

## 2. Campaign creation flow

1. Open `/create`.
2. Confirm it redirects to `/campaigns/create`.
3. Connect wallet.
4. Create a campaign with:
   - unique title
   - valid image URL
   - goal >= 1 SOL
5. Approve wallet transaction.

Expected:
- transaction confirms
- success screen appears
- "View Campaign" opens `/campaign/[slug]`
- campaign exists in Cosmic with:
  - `onchain_campaign_id`
  - `campaign_pda`
  - `author_wallet`
  - `tx_signature`
  - `cluster`

## 3. Slug detail route

Open the new campaign's `/campaign/[slug]` page.

Expected:
- title/story/image render from Cosmic
- raised/goal/donors render from chain
- organizer shows wallet address
- campaign ID is visible

## 4. Donation flow

1. On `/campaign/[slug]`, enter a donation amount.
2. Approve wallet transaction.

Expected:
- transaction dialog succeeds
- explorer link opens the configured cluster
- raised amount increases after refresh
- donor count increments after refresh

## 5. Legacy route redirect

Open `/campaigns/[onchain_campaign_id]`.

Expected:
- route redirects to `/campaign/[slug]`

## 6. Listing page

Open `/campaigns`.

Expected:
- card exists for new campaign
- progress reflects chain-backed raised/goal values
- card links to `/campaign/[slug]`

## 7. Anchor integration suite

When Anchor CLI and `solana-test-validator` are available:

```bash
cd anchor
npm test
```

Expected:
- initialize/create/donate/withdraw/delete integration coverage runs against local validator
- withdraw succeeds with the direct lamport transfer fix

## 8. Backfill helper for old records

Dry run:

```bash
node scripts/backfill-campaign-links.js
```

Apply updates:

```bash
node scripts/backfill-campaign-links.js --apply
```

Expected:
- script prints proposed slug/title matches
- `--apply` updates unmatched old Cosmic records with on-chain linkage fields
