# Graph Report - dapp  (2026-05-01)

## Corpus Check
- 81 files · ~192,617 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 270 nodes · 220 edges · 27 communities detected
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 42|Community 42]]
- [[_COMMUNITY_Community 73|Community 73]]
- [[_COMMUNITY_Community 74|Community 74]]
- [[_COMMUNITY_Community 75|Community 75]]
- [[_COMMUNITY_Community 76|Community 76]]
- [[_COMMUNITY_Community 77|Community 77]]
- [[_COMMUNITY_Community 78|Community 78]]
- [[_COMMUNITY_Community 79|Community 79]]
- [[_COMMUNITY_Community 80|Community 80]]
- [[_COMMUNITY_Community 81|Community 81]]
- [[_COMMUNITY_Community 82|Community 82]]
- [[_COMMUNITY_Community 83|Community 83]]
- [[_COMMUNITY_Community 84|Community 84]]
- [[_COMMUNITY_Community 85|Community 85]]

## God Nodes (most connected - your core abstractions)
1. `GET()` - 7 edges
2. `Fundus Program` - 7 edges
3. `getProgramState()` - 6 edges
4. `getCampaign()` - 6 edges
5. `Withdraw` - 6 edges
6. `parseCampaignAccount()` - 5 edges
7. `getCampaigns()` - 5 edges
8. `Donate` - 5 edges
9. `Campaign` - 4 edges
10. `getConnection()` - 4 edges

## Surprising Connections (you probably didn't know these)
- `create_campaign()` --calls--> `GET()`  [INFERRED]
  anchor/programs/peaceleague/src/instructions/create_campaign.rs → app/api/cosmic/route.ts
- `create_campaign()` --calls--> `GET()`  [INFERRED]
  anchor/programs/peaceleague/src/lib.rs → app/api/cosmic/route.ts
- `create_campaign()` --calls--> `GET()`  [INFERRED]
  anchor/programs/peaceleague/src/instructions/mod.rs → app/api/cosmic/route.ts
- `loadCampaign()` --calls--> `getCampaign()`  [INFERRED]
  app/campaigns/[id]/page.tsx → lib/peaceleague-client.ts
- `onSubmit()` --calls--> `createCampaignTx()`  [INFERRED]
  app/campaigns/create/page.tsx → lib/peaceleague-client.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (20): DELETE(), GET(), PATCH(), POST(), createCampaign(), deleteCampaign(), getCampaigns(), listCampaigns() (+12 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (7): CampaignsPage(), fetchCampaigns(), getBlogPostBySlug(), getCampaignBySlug(), getCampaigns(), CampaignPage(), generateMetadata()

### Community 2 - "Community 2"
Cohesion: 0.11
Nodes (20): Campaign Account, Campaign PDA, Campaign State, Create Campaign Flow, Create Campaign, Creator-Only Withdrawal, Donate, Donor Transaction PDA (+12 more)

### Community 3 - "Community 3"
Cohesion: 0.16
Nodes (9): onSubmit(), handleDonateClick(), handleTxSuccess(), loadCampaign(), validateAmount(), getCurrentSlot(), getRecentBlockhash(), getSolanaRpc() (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.3
Nodes (12): createCampaignTx(), donateToCampaignTx(), getCampaign(), getCampaignAddress(), getCampaigns(), getCampaignsByAuthor(), getConnection(), getProgramState() (+4 more)

### Community 5 - "Community 5"
Cohesion: 0.18
Nodes (6): CreateCampaignCtx, DeleteCampaignCtx, DonateCtx, ErrorCode, InitializeCtx, WithdrawCtx

### Community 7 - "Community 7"
Cohesion: 0.22
Nodes (2): handleSubmit(), createCampaignAction()

### Community 9 - "Community 9"
Cohesion: 0.4
Nodes (1): Campaign

### Community 10 - "Community 10"
Cohesion: 0.4
Nodes (4): CampaignError, create_campaign(), CreateCampaign, CreateCampaignArgs

### Community 13 - "Community 13"
Cohesion: 0.4
Nodes (5): AnchorProvider, Connect Wallet Flow, IDL.json, Phantom Wallet Connection, Program Interface

### Community 14 - "Community 14"
Cohesion: 0.67
Nodes (2): Donate, DonateError

### Community 19 - "Community 19"
Cohesion: 1.0
Nodes (1): ProgramState

### Community 20 - "Community 20"
Cohesion: 1.0
Nodes (1): Withdraw

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (2): Anchor Deploy, Solana Devnet Setup

### Community 73 - "Community 73"
Cohesion: 1.0
Nodes (1): Readme

### Community 74 - "Community 74"
Cohesion: 1.0
Nodes (1): Solana Frontend Agent

### Community 75 - "Community 75"
Cohesion: 1.0
Nodes (1): Solana Expert Agent

### Community 76 - "Community 76"
Cohesion: 1.0
Nodes (1): License

### Community 77 - "Community 77"
Cohesion: 1.0
Nodes (1): Claude

### Community 78 - "Community 78"
Cohesion: 1.0
Nodes (1): Initialize

### Community 79 - "Community 79"
Cohesion: 1.0
Nodes (1): Update Campaign

### Community 80 - "Community 80"
Cohesion: 1.0
Nodes (1): Delete Campaign

### Community 81 - "Community 81"
Cohesion: 1.0
Nodes (1): Campaign Listing

### Community 82 - "Community 82"
Cohesion: 1.0
Nodes (1): Create Campaign Form

### Community 83 - "Community 83"
Cohesion: 1.0
Nodes (1): Donation Flow

### Community 84 - "Community 84"
Cohesion: 1.0
Nodes (1): Withdrawal Flow

### Community 85 - "Community 85"
Cohesion: 1.0
Nodes (1): Min Goal Validation

## Knowledge Gaps
- **42 isolated node(s):** `CampaignError`, `ProgramState`, `Campaign`, `Initialize`, `CreateCampaign` (+37 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 7`** (9 nodes): `page.tsx`, `canProceed()`, `GlassCard()`, `handleSubmit()`, `nextStep()`, `prevStep()`, `updateForm()`, `createCampaignAction()`, `actions-client.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 9`** (5 nodes): `campaign.rs`, `Campaign`, `.can_donate()`, `.is_funded()`, `.seeds()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (3 nodes): `donate.rs`, `Donate`, `DonateError`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 19`** (2 nodes): `program_state.rs`, `ProgramState`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 20`** (2 nodes): `withdraw.rs`, `Withdraw`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (2 nodes): `Anchor Deploy`, `Solana Devnet Setup`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 73`** (1 nodes): `Readme`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 74`** (1 nodes): `Solana Frontend Agent`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 75`** (1 nodes): `Solana Expert Agent`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 76`** (1 nodes): `License`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 77`** (1 nodes): `Claude`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 78`** (1 nodes): `Initialize`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 79`** (1 nodes): `Update Campaign`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 80`** (1 nodes): `Delete Campaign`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 81`** (1 nodes): `Campaign Listing`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 82`** (1 nodes): `Create Campaign Form`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 83`** (1 nodes): `Donation Flow`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 84`** (1 nodes): `Withdrawal Flow`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 85`** (1 nodes): `Min Goal Validation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GET()` connect `Community 0` to `Community 1`, `Community 10`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._
- **Why does `getCampaignBySlug()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Are the 5 inferred relationships involving `GET()` (e.g. with `create_campaign()` and `create_campaign()`) actually correct?**
  _`GET()` has 5 INFERRED edges - model-reasoned connections that need verification._
- **What connects `CampaignError`, `ProgramState`, `Campaign` to the rest of the system?**
  _42 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._