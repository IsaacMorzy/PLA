# Release Checklist

Use this before shipping the unified PeaceLeague Africa campaign flow.

## 1. Environment

- [ ] Copy `.env.example` to your local env file
- [ ] Set `NEXT_PUBLIC_SOLANA_CLUSTER`
- [ ] Set `NEXT_PUBLIC_SOLANA_RPC`
- [ ] Set `NEXT_PUBLIC_PROGRAM_ID`
- [ ] Set `COSMIC_BUCKET_SLUG`
- [ ] Set `COSMIC_READ_KEY`
- [ ] Set `COSMIC_WRITE_KEY`
- [ ] Confirm frontend and wallet are pointed at the same cluster

## 2. Static validation

```bash
pnpm -s exec tsc --noEmit
pnpm test:unit
```

Expected:
- TypeScript passes
- all unit tests pass

## 3. Solana / Anchor validation

In an environment with Anchor CLI, Rust, and `solana-test-validator` installed:

```bash
cd anchor
npm test
```

Expected:
- initialize/create/donate/withdraw/delete integration suite passes

## 4. Manual smoke test

Follow:
- `docs/development/onchain-smoke-test.md`

Must verify:
- [ ] `/create` works
- [ ] `/campaigns/create` redirects to `/create`
- [ ] `/campaigns` shows merged chain-backed progress
- [ ] `/campaign/[slug]` renders merged detail
- [ ] donation succeeds on-chain
- [ ] `/campaigns/[id]` redirects to slug route

## 5. Data migration / backfill

Dry run:

```bash
pnpm backfill:campaign-links
```

Apply after review:

```bash
node scripts/backfill-campaign-links.js --apply
```

Verify:
- [ ] legacy Cosmic campaigns receive `onchain_campaign_id`
- [ ] `campaign_pda` populated
- [ ] `author_wallet` populated
- [ ] `cluster` populated

## 6. Production readiness

- [ ] Confirm the deployed Solana program ID matches `NEXT_PUBLIC_PROGRAM_ID`
- [ ] Confirm the target cluster has initialized program state
- [ ] Confirm Cosmic write key is available where create flow runs
- [ ] Confirm explorer links open the correct cluster
- [ ] Confirm wallet adapters connect successfully in target browsers

## 7. Rollback plan

Before release, record:
- current frontend deployment ID
- current program ID
- current Cosmic schema / fields

Rollback options:
- revert frontend deployment
- temporarily disable create flow
- revert CMS linkage usage to previously deployed version

## 8. Post-release checks

- [ ] Create one real campaign
- [ ] Donate to it
- [ ] Verify list/detail values update correctly
- [ ] Verify Cosmic record linkage fields were written
- [ ] Verify no duplicate campaign detail routes are being shared externally
