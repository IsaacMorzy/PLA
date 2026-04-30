# Graph Report - peaceleagueafrica  (2026-04-30)

## Corpus Check
- 64 files · ~197,086 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 202 nodes · 151 edges · 24 communities detected
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 20 edges (avg confidence: 0.8)
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
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 56|Community 56]]
- [[_COMMUNITY_Community 57|Community 57]]
- [[_COMMUNITY_Community 58|Community 58]]
- [[_COMMUNITY_Community 59|Community 59]]
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]
- [[_COMMUNITY_Community 67|Community 67]]
- [[_COMMUNITY_Community 68|Community 68]]

## God Nodes (most connected - your core abstractions)
1. `GET()` - 8 edges
2. `Campaign` - 4 edges
3. `create_campaign()` - 3 edges
4. `create_campaign()` - 3 edges
5. `getSolanaRpc()` - 3 edges
6. `createCampaignAction()` - 3 edges
7. `createCampaign()` - 3 edges
8. `listCampaigns()` - 3 edges
9. `updateCampaign()` - 3 edges
10. `getCampaigns()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Initialize` --calls--> `GET()`  [INFERRED]
  anchor/programs/peaceleague/src/instructions/initialize.rs → app/api/cosmic/route.ts
- `create_campaign()` --calls--> `GET()`  [INFERRED]
  anchor/programs/peaceleague/src/instructions/mod.rs → app/api/cosmic/route.ts
- `createCampaign()` --calls--> `POST()`  [INFERRED]
  lib/actions.ts → app/api/cosmic/route.ts
- `getCampaignBySlug()` --calls--> `GET()`  [INFERRED]
  lib/cosmic.ts → app/api/cosmic/route.ts
- `create_campaign()` --calls--> `GET()`  [INFERRED]
  anchor/programs/peaceleague/src/lib.rs → app/api/cosmic/route.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.11
Nodes (20): Campaign Account, Campaign PDA, Campaign State, Create Campaign Flow, Create Campaign, Creator-Only Withdrawal, Donate, Donor Transaction PDA (+12 more)

### Community 1 - "Community 1"
Cohesion: 0.13
Nodes (15): deleteCampaign(), getCampaigns(), listCampaigns(), updateCampaign(), handleDonate(), CampaignError, create_campaign(), CreateCampaign (+7 more)

### Community 2 - "Community 2"
Cohesion: 0.12
Nodes (4): getBlogPostBySlug(), getCampaignBySlug(), CampaignPage(), generateMetadata()

### Community 3 - "Community 3"
Cohesion: 0.13
Nodes (7): createCampaignAction(), createCampaign(), getCampaigns(), CampaignsPage(), fetchCampaigns(), GlassCard(), handleSubmit()

### Community 4 - "Community 4"
Cohesion: 0.2
Nodes (7): Donate, DonateError, donate(), initialize(), withdraw(), initialize(), Withdraw

### Community 5 - "Community 5"
Cohesion: 0.2
Nodes (6): CreateCampaignCtx, DeleteCampaignCtx, DonateCtx, ErrorCode, InitializeCtx, WithdrawCtx

### Community 7 - "Community 7"
Cohesion: 0.38
Nodes (3): getCurrentSlot(), getRecentBlockhash(), getSolanaRpc()

### Community 9 - "Community 9"
Cohesion: 0.4
Nodes (1): Campaign

### Community 10 - "Community 10"
Cohesion: 0.4
Nodes (5): AnchorProvider, Connect Wallet Flow, IDL.json, Phantom Wallet Connection, Program Interface

### Community 18 - "Community 18"
Cohesion: 1.0
Nodes (1): ProgramState

### Community 29 - "Community 29"
Cohesion: 1.0
Nodes (2): Anchor Deploy, Solana Devnet Setup

### Community 56 - "Community 56"
Cohesion: 1.0
Nodes (1): Readme

### Community 57 - "Community 57"
Cohesion: 1.0
Nodes (1): Solana Frontend Agent

### Community 58 - "Community 58"
Cohesion: 1.0
Nodes (1): Solana Expert Agent

### Community 59 - "Community 59"
Cohesion: 1.0
Nodes (1): License

### Community 60 - "Community 60"
Cohesion: 1.0
Nodes (1): Claude

### Community 61 - "Community 61"
Cohesion: 1.0
Nodes (1): Initialize

### Community 62 - "Community 62"
Cohesion: 1.0
Nodes (1): Update Campaign

### Community 63 - "Community 63"
Cohesion: 1.0
Nodes (1): Delete Campaign

### Community 64 - "Community 64"
Cohesion: 1.0
Nodes (1): Campaign Listing

### Community 65 - "Community 65"
Cohesion: 1.0
Nodes (1): Create Campaign Form

### Community 66 - "Community 66"
Cohesion: 1.0
Nodes (1): Donation Flow

### Community 67 - "Community 67"
Cohesion: 1.0
Nodes (1): Withdrawal Flow

### Community 68 - "Community 68"
Cohesion: 1.0
Nodes (1): Min Goal Validation

## Knowledge Gaps
- **16 isolated node(s):** `ProgramState`, `InitializeCtx`, `CreateCampaignCtx`, `DonateCtx`, `WithdrawCtx` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 9`** (5 nodes): `campaign.rs`, `Campaign`, `.can_donate()`, `.is_funded()`, `.seeds()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 18`** (2 nodes): `program_state.rs`, `ProgramState`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 29`** (2 nodes): `Anchor Deploy`, `Solana Devnet Setup`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 56`** (1 nodes): `Readme`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 57`** (1 nodes): `Solana Frontend Agent`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 58`** (1 nodes): `Solana Expert Agent`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 59`** (1 nodes): `License`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 60`** (1 nodes): `Claude`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 61`** (1 nodes): `Initialize`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 62`** (1 nodes): `Update Campaign`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 63`** (1 nodes): `Delete Campaign`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 64`** (1 nodes): `Campaign Listing`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 65`** (1 nodes): `Create Campaign Form`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 66`** (1 nodes): `Donation Flow`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 67`** (1 nodes): `Withdrawal Flow`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 68`** (1 nodes): `Min Goal Validation`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `GET()` connect `Community 1` to `Community 0`, `Community 2`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **Why does `Initialize` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Why does `getCampaignBySlug()` connect `Community 2` to `Community 1`?**
  _High betweenness centrality (0.068) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `GET()` (e.g. with `Initialize` and `create_campaign()`) actually correct?**
  _`GET()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **What connects `ProgramState`, `InitializeCtx`, `CreateCampaignCtx` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.11 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._