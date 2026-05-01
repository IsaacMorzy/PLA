# Graph Report - peaceleagueafrica  (2026-05-01)

## Corpus Check
- 81 files · ~215,309 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 267 nodes · 225 edges · 25 communities detected
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 68|Community 68]]
- [[_COMMUNITY_Community 69|Community 69]]
- [[_COMMUNITY_Community 70|Community 70]]
- [[_COMMUNITY_Community 71|Community 71]]
- [[_COMMUNITY_Community 72|Community 72]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]

## God Nodes (most connected - your core abstractions)
1. `GET()` - 8 edges
2. `getProgramState()` - 6 edges
3. `getCampaign()` - 6 edges
4. `parseCampaignAccount()` - 5 edges
5. `getCampaigns()` - 5 edges
6. `Campaign` - 4 edges
7. `getConnection()` - 4 edges
8. `getCampaignAddress()` - 4 edges
9. `readBigInt64LE()` - 4 edges
10. `createCampaignTx()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `Initialize` --calls--> `GET()`  [INFERRED]
  anchor/programs/peaceleague/src/instructions/initialize.rs → app/api/cosmic/route.ts
- `create_campaign()` --calls--> `GET()`  [INFERRED]
  anchor/programs/peaceleague/src/instructions/mod.rs → app/api/cosmic/route.ts
- `getCampaign()` --calls--> `loadCampaign()`  [INFERRED]
  lib/peaceleague-client.ts → app/campaigns/[id]/page.tsx
- `createCampaignTx()` --calls--> `onSubmit()`  [INFERRED]
  lib/peaceleague-client.ts → app/campaigns/create/page.tsx
- `donateToCampaignTx()` --calls--> `handleDonateClick()`  [INFERRED]
  lib/peaceleague-client.ts → app/campaigns/[id]/page.tsx

## Communities

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (18): Donate, DonateError, Campaign, CampaignError, CreateCampaign, DeleteCampaign, Donate, Initialize (+10 more)

### Community 1 - "Community 1"
Cohesion: 0.12
Nodes (16): createCampaign(), deleteCampaign(), getCampaigns(), listCampaigns(), updateCampaign(), handleDonate(), CampaignError, create_campaign() (+8 more)

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (20): Campaign Account, Campaign PDA, Campaign State, Create Campaign Flow, Create Campaign, Creator-Only Withdrawal, Donate, Donor Transaction PDA (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (4): getBlogPostBySlug(), getCampaignBySlug(), CampaignPage(), generateMetadata()

### Community 4 - "Community 4"
Cohesion: 0.16
Nodes (9): handleDonateClick(), handleTxSuccess(), loadCampaign(), onSubmit(), validateAmount(), getCurrentSlot(), getRecentBlockhash(), getSolanaRpc() (+1 more)

### Community 5 - "Community 5"
Cohesion: 0.3
Nodes (12): createCampaignTx(), donateToCampaignTx(), getCampaign(), getCampaignAddress(), getCampaigns(), getCampaignsByAuthor(), getConnection(), getProgramState() (+4 more)

### Community 6 - "Community 6"
Cohesion: 0.14
Nodes (6): createCampaignAction(), getCampaigns(), CampaignsPage(), fetchCampaigns(), GlassCard(), handleSubmit()

### Community 11 - "Community 11"
Cohesion: 0.4
Nodes (1): Campaign

### Community 12 - "Community 12"
Cohesion: 0.4
Nodes (5): AnchorProvider, Connect Wallet Flow, IDL.json, Phantom Wallet Connection, Program Interface

### Community 13 - "Community 13"
Cohesion: 0.67
Nodes (1): CampaignCard()

### Community 23 - "Community 23"
Cohesion: 1.0
Nodes (1): ProgramState

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (2): Anchor Deploy, Solana Devnet Setup

### Community 68 - "Community 68"
Cohesion: 1.0
Nodes (1): Readme

### Community 69 - "Community 69"
Cohesion: 1.0
Nodes (1): Solana Frontend Agent

### Community 70 - "Community 70"
Cohesion: 1.0
Nodes (1): Solana Expert Agent

### Community 71 - "Community 71"
Cohesion: 1.0
Nodes (1): License

### Community 72 - "Community 72"
Cohesion: 1.0
Nodes (1): Claude

### Community 73 - "Community 73"
Cohesion: 1.0
Nodes (1): Initialize

### Community 74 - "Community 74"
Cohesion: 1.0
Nodes (1): Update Campaign

### Community 75 - "Community 75"
Cohesion: 1.0
Nodes (1): Delete Campaign

### Community 76 - "Community 76"
Cohesion: 1.0
Nodes (1): Campaign Listing

### Community 77 - "Community 77"
Cohesion: 1.0
Nodes (1): Create Campaign Form

### Community 78 - "Community 78"
Cohesion: 1.0
Nodes (1): Donation Flow

### Community 79 - "Community 79"
Cohesion: 1.0
Nodes (1): Withdrawal Flow

### Community 80 - "Community 80"
Cohesion: 1.0
Nodes (1): Min Goal Validation

## Knowledge Gaps
- **21 isolated node(s):** `CampaignError`, `ProgramState`, `Campaign`, `CreateCampaign`, `DeleteCampaign` (+16 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 11`** (5 nodes): `campaign.rs`, `Campaign`, `.can_donate()`, `.is_funded()`, `.seeds()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (3 nodes): `campaign-card.tsx`, `CampaignCard()`, `campaign-card.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 23`** (2 nodes): `program_state.rs`, `ProgramState`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (2 nodes): `Anchor Deploy`, `Solana Devnet Setup`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (1 nodes): `Readme`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 69`** (1 nodes): `Solana Frontend Agent`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 70`** (1 nodes): `Solana Expert Agent`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 71`** (1 nodes): `License`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 72`** (1 nodes): `Claude`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 73`** (1 nodes): `Initialize`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (1 nodes): `Update Campaign`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 75`** (1 nodes): `Delete Campaign`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (1 nodes): `Campaign Listing`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (1 nodes): `Create Campaign Form`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (1 nodes): `Donation Flow`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (1 nodes): `Withdrawal Flow`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (1 nodes): `Min Goal Validation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GET()` connect `Community 1` to `Community 2`, `Community 3`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **Why does `Initialize` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.045) - this node is a cross-community bridge._
- **Why does `getCampaignBySlug()` connect `Community 3` to `Community 1`?**
  _High betweenness centrality (0.043) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `GET()` (e.g. with `create_campaign()` and `Initialize`) actually correct?**
  _`GET()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CampaignError`, `ProgramState`, `Campaign` to the rest of the system?**
  _21 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._