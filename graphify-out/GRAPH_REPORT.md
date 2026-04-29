# Graph Report - peaceleagueafrica-anchor  (2026-04-29)

## Corpus Check
- 30 files · ~172,165 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 129 nodes · 94 edges · 23 communities detected
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 31|Community 31]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]
- [[_COMMUNITY_Community 35|Community 35]]
- [[_COMMUNITY_Community 36|Community 36]]
- [[_COMMUNITY_Community 37|Community 37]]
- [[_COMMUNITY_Community 38|Community 38]]
- [[_COMMUNITY_Community 39|Community 39]]
- [[_COMMUNITY_Community 40|Community 40]]
- [[_COMMUNITY_Community 41|Community 41]]
- [[_COMMUNITY_Community 42|Community 42]]

## God Nodes (most connected - your core abstractions)
1. `GET()` - 4 edges
2. `getSolanaRpc()` - 3 edges
3. `create_campaign()` - 2 edges
4. `create_campaign()` - 2 edges
5. `getCurrentSlot()` - 2 edges
6. `getRecentBlockhash()` - 2 edges
7. `createCampaign()` - 2 edges
8. `listCampaigns()` - 2 edges
9. `getCampaigns()` - 2 edges
10. `getCampaignBySlug()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `create_campaign()` --calls--> `GET()`  [INFERRED]
  anchor/programs/peaceleague/src/lib.rs → app/api/cosmic/route.ts
- `create_campaign()` --calls--> `GET()`  [INFERRED]
  anchor/programs/peaceleague/src/instructions/mod.rs → app/api/cosmic/route.ts
- `POST()` --calls--> `createCampaign()`  [INFERRED]
  app/api/cosmic/route.ts → lib/actions.ts
- `GET()` --calls--> `listCampaigns()`  [INFERRED]
  app/api/cosmic/route.ts → lib/actions.ts
- `loadCampaigns()` --calls--> `getCampaigns()`  [INFERRED]
  app/campaigns/page.tsx → lib/cosmic.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (19): Campaign Account, Campaign PDA, Campaign State, Create Campaign Flow, Create Campaign, Creator-Only Withdrawal, Donate, Donor Transaction PDA (+11 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (8): Campaign, CreateCampaignCtx, DeleteCampaignCtx, DonateCtx, ErrorCode, InitializeCtx, ProgramState, WithdrawCtx

### Community 2 - "Community 2"
Cohesion: 0.17
Nodes (4): getCampaignBySlug(), getCampaigns(), CampaignPage(), loadCampaigns()

### Community 3 - "Community 3"
Cohesion: 0.18
Nodes (6): CreateCampaignCtx, DeleteCampaignCtx, DonateCtx, ErrorCode, InitializeCtx, WithdrawCtx

### Community 4 - "Community 4"
Cohesion: 0.25
Nodes (6): createCampaign(), listCampaigns(), create_campaign(), create_campaign(), GET(), POST()

### Community 5 - "Community 5"
Cohesion: 0.38
Nodes (3): getCurrentSlot(), getRecentBlockhash(), getSolanaRpc()

### Community 7 - "Community 7"
Cohesion: 0.4
Nodes (5): AnchorProvider, Connect Wallet Flow, IDL.json, Phantom Wallet Connection, Program Interface

### Community 8 - "Community 8"
Cohesion: 0.67
Nodes (2): Campaign, ProgramState

### Community 13 - "Community 13"
Cohesion: 1.0
Nodes (1): ProgramState

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (2): Anchor Deploy, Solana Devnet Setup

### Community 30 - "Community 30"
Cohesion: 1.0
Nodes (1): Readme

### Community 31 - "Community 31"
Cohesion: 1.0
Nodes (1): Solana Frontend Agent

### Community 32 - "Community 32"
Cohesion: 1.0
Nodes (1): Solana Expert Agent

### Community 33 - "Community 33"
Cohesion: 1.0
Nodes (1): License

### Community 34 - "Community 34"
Cohesion: 1.0
Nodes (1): Claude

### Community 35 - "Community 35"
Cohesion: 1.0
Nodes (1): Initialize

### Community 36 - "Community 36"
Cohesion: 1.0
Nodes (1): Update Campaign

### Community 37 - "Community 37"
Cohesion: 1.0
Nodes (1): Delete Campaign

### Community 38 - "Community 38"
Cohesion: 1.0
Nodes (1): Campaign Listing

### Community 39 - "Community 39"
Cohesion: 1.0
Nodes (1): Create Campaign Form

### Community 40 - "Community 40"
Cohesion: 1.0
Nodes (1): Donation Flow

### Community 41 - "Community 41"
Cohesion: 1.0
Nodes (1): Withdrawal Flow

### Community 42 - "Community 42"
Cohesion: 1.0
Nodes (1): Min Goal Validation

## Knowledge Gaps
- **22 isolated node(s):** `Campaign`, `ProgramState`, `InitializeCtx`, `CreateCampaignCtx`, `DonateCtx` (+17 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 8`** (3 nodes): `campaign.rs`, `Campaign`, `ProgramState`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 13`** (2 nodes): `program_state.rs`, `ProgramState`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `Anchor Deploy`, `Solana Devnet Setup`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 30`** (1 nodes): `Readme`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 31`** (1 nodes): `Solana Frontend Agent`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 32`** (1 nodes): `Solana Expert Agent`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 33`** (1 nodes): `License`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 34`** (1 nodes): `Claude`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 35`** (1 nodes): `Initialize`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 36`** (1 nodes): `Update Campaign`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 37`** (1 nodes): `Delete Campaign`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 38`** (1 nodes): `Campaign Listing`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 39`** (1 nodes): `Create Campaign Form`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 40`** (1 nodes): `Donation Flow`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 41`** (1 nodes): `Withdrawal Flow`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 42`** (1 nodes): `Min Goal Validation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `create_campaign()` connect `Community 4` to `Community 1`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `create_campaign()` connect `Community 4` to `Community 3`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `GET()` (e.g. with `create_campaign()` and `create_campaign()`) actually correct?**
  _`GET()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Campaign`, `ProgramState`, `InitializeCtx` to the rest of the system?**
  _22 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._