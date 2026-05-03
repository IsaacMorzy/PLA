# Campaign + On-Chain Unification Plan

> **For agentic workers:** Execute in small, verifiable slices. After each completed task: run `pnpm -s exec tsc --noEmit` and update this checklist.

**Goal:** Unify PeaceLeague Africa's split CMS and on-chain campaign flows into one coherent system: Solana is the fundraising source of truth, Cosmic remains the content layer.

**Architecture target:**
- **Solana / Anchor** owns campaign identity, author, goal, raised, donor count, timestamps, deletion state
- **Cosmic CMS** owns slug, story, media, category, location, editorial metadata
- **Merged app layer** joins both into one `UnifiedCampaign` model for list/detail/create flows

**Tech stack:** Next.js 16, React 19, Anchor 0.32, Solana Wallet Adapter, Cosmic SDK v2

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `docs/superpowers/plans/2026-05-03-campaign-unification.md` | Create | Execution plan + checklist |
| `lib/solana-config.ts` | Create | Shared cluster/RPC/program/explorer config |
| `lib/peaceleague-idl.ts` | Create | Canonical frontend Anchor IDL |
| `lib/peaceleague-client.ts` | Rewrite | Correct PDA derivation, account decoding, tx builders |
| `contexts/ContextProvider.tsx` | Modify | Use shared RPC endpoint |
| `lib/solana-rpc.ts` | Modify | Use shared RPC endpoint |
| `components/ui/address-display.tsx` | Modify | Use shared explorer links |
| `components/ui/transaction-dialog.tsx` | Modify | Use shared explorer links |
| `app/campaigns/create/page.tsx` | Modify | Use corrected on-chain client + explorer links |
| `app/campaigns/[id]/page.tsx` | Modify | Use corrected explorer links |
| `lib/cosmic.ts` | Modify | Add on-chain linkage fields |
| `lib/campaigns.ts` | Create | Merge Cosmic + on-chain data |
| `app/campaigns/page.tsx` | Modify | Use merged campaign list |
| `app/campaign/[slug]/page.tsx` | Modify | Use merged campaign detail |
| `app/create/page.tsx` | Modify | Unified create flow: chain first, CMS second |
| `docs/project/progress-tracker.md` | Modify | Track phase status |

---

## Phase 1 — Correct the Solana client foundation

### Task 1: Centralize Solana config
- [x] Create `lib/solana-config.ts`
- [x] Define shared RPC URL, cluster, program ID, explorer URL helpers
- [x] Switch wallet provider and RPC helpers to the shared config
- [x] Switch explorer links to the shared config

### Task 2: Replace ad-hoc Anchor encoding with canonical IDL-based encoding
- [x] Create `lib/peaceleague-idl.ts`
- [x] Rewrite `lib/peaceleague-client.ts` to use Anchor coders
- [x] Fix PDA derivation to use 8-byte LE campaign IDs
- [x] Remove duplicate `SystemProgram.transfer()` from donate flow
- [x] Stop manually creating PDA accounts in the create flow
- [x] Decode accounts via Anchor coder instead of hand parsing

### Task 3: Verify phase 1
- [x] Run `pnpm -s exec tsc --noEmit`
- [ ] Smoke-test create + donate flows against the configured cluster

---

## Phase 2 — Create a unified campaign model

### Task 4: Add on-chain linkage fields to Cosmic campaign records
- [x] Extend `lib/cosmic.ts` types with:
  - `onchain_campaign_id`
  - `campaign_pda`
  - `author_wallet`
  - `tx_signature`
  - `cluster`

### Task 5: Build merge layer
- [x] Create `lib/campaigns.ts`
- [x] Add `getMergedCampaigns()`
- [x] Add `getMergedCampaignBySlug(slug)`
- [x] Normalize all funding values to lamports in one DTO

---

## Phase 3 — Unify the app routes

### Task 6: Unified listing
- [x] Update `app/campaigns/page.tsx` to use merged campaigns
- [x] Update campaign cards to display chain-backed progress

### Task 7: Unified detail
- [x] Make `app/campaign/[slug]/page.tsx` the canonical detail route
- [x] Pull story/media from Cosmic and fundraising state from Solana
- [x] Redirect or deprecate `app/campaigns/[id]/page.tsx`

### Task 8: Unified create flow
- [x] Convert `app/create/page.tsx` into the single campaign creation route
- [x] Create on-chain first, then write linked metadata to Cosmic
- [x] Redirect `/campaigns/create` to `/create` once ready

---

## Phase 4 — Cleanup + verification

### Task 9: Remove stale/off-chain fundraising logic
- [x] Remove CMS-backed `raised` mutation path from `app/campaign/[slug]/campaign-client.tsx`
- [x] Remove fake/random donor and progress values

### Task 10: Tests + docs
- [x] Add/update unit coverage for PDA derivation and merge logic
- [x] Refresh Anchor tests to match current program signatures/IDs
- [x] Update onboarding/docs once canonical route flow is live

---

## Execution log

- **2026-05-03:** Phase 1 started. Implemented shared Solana config, canonical frontend IDL, and an IDL-based rewrite of `lib/peaceleague-client.ts`.
- **2026-05-03:** Started Phase 2 by adding Cosmic ↔ on-chain linkage fields and a new merged campaign data layer in `lib/campaigns.ts`.
- **2026-05-03:** Unified the slug route so `/campaign/[slug]` now renders Cosmic content with Solana fundraising data and submits real on-chain donation transactions.
- **2026-05-03:** Deprecated `/campaigns/[id]` by redirecting legacy numeric campaign routes to the canonical slug route when a linked CMS campaign exists.
- **2026-05-03:** Updated the on-chain create route so successful transactions now also create linked Cosmic campaign records with `onchain_campaign_id`, PDA, author wallet, tx signature, and cluster metadata.
- **2026-05-03:** Added `scripts/backfill-campaign-links.js` for dry-run/apply Cosmic linkage backfills and documented the manual smoke-test flow in `docs/development/onchain-smoke-test.md`.
- **2026-05-03:** Finalized the create route direction: `/create` is now the canonical on-chain create flow, and `/campaigns/create` redirects to it.
- **2026-05-03:** Added passing unit coverage for PDA derivation, account decoding, merge logic, and transaction builders in `tests/unit/*.test.ts`, powered by a new `pnpm test:unit` script.
- **2026-05-03:** Rewrote `anchor/tests/peaceleague.ts` to match the current program signatures, PDA derivation, creator account names, and the fixed withdraw behavior.
