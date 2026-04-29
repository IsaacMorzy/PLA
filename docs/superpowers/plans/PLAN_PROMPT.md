# Peace League Africa - Implementation Planning Prompt

## Context Summary

### Project Overview
- **Name**: Peace League Africa
- **Type**: Solana Crowdfunding dApp (based on Fundus reference)
- **Purpose**: Enable African causes to raise SOL donations with goal-based campaigns, donor tracking, and creator withdrawals

### Current State vs Reference

| Aspect | Our Project | Fundus Reference | Gap |
|--------|-----------|----------------|-----|
| Frontend | Next.js 16 + Tailwind v4 | Next.js 14 + Tailwind v3 | ✅ Ahead |
| Wallet | wallet-adapter | wallet-adapter | ➖ Same |
| Anchor program | ❌ None | ✅ Complete | 🔴 Missing |
| Campaign features | ❌ None | ✅ All | 🔴 Missing |
| shadcn/ui | ✅ Partial | ❌ DaisyUI | 🟡 Migrate |

### Reference Features to Implement

From `docs/FUNDUS_REFERENCE.md` and graphify (67 nodes):

**Phase 1: Anchor Program**
- Campaign state (cid, creator, title, description, image_url, goal, amount_raised, balance, active)
- Program state (campaign_count, platform_fee, platform_address)
- Instructions: create_campaign, update_campaign, delete_campaign, donate, withdraw
- PDAs: campaign seeds=[b"campaign", cid], transaction seeds

**Phase 2-6: Frontend**
- Wallet connection (existing)
- Campaign listing with progress
- Create campaign form
- Donation flow (min 1 SOL)
- Withdrawal flow (creator only, 5% fee)

## Instructions for Planning Agent

### Research Phase (Use graphify first)

1. Query existing patterns:
```
graphify query "campaign listing"
graphify query "create campaign form"
graphify query "donate withdraw"
```

2. Read reference:
```
Read: docs/FUNDUS_REFERENCE.md
Read: docs/ONBOARDING.md
```

3. Review our current architecture:
```
Read: app/page.tsx
Read: contexts/ContextProvider.tsx
Read: components/wallet/wallet-button.tsx
```

### Planning Requirements

Following planning-and-task-breakdown + writing-plans:

1. **Vertical slicing** - Each task delivers working functionality
2. **TDD** - Tests first, then implementation
3. **Acceptance criteria** - Specific, verifiable conditions
4. **Dependencies** - Ordered correctly

### Task Structure Template

```markdown
### Task N: [Component Name]

**Description:** [What this achieves]

**Acceptance criteria:**
- [ ] [Specific testable condition]
- [ ] [Specific testable condition]

**Verification:**
- Tests pass: [command]
- Build succeeds: [command]

**Dependencies:** Task N-X or None

**Files likely touched:**
- `path/to/file.ts`
```

### Phase Structure

```
Phase 1: Anchor Program (Foundation)
├── Task 1: Initialize Anchor project
├── Task 2: Create Campaign state
├── Task 3: Create Program state  
├── Task 4: create_campaign instruction
├── Task 5: donate instruction
├── Task 6: withdraw instruction
└── Checkpoint: Program builds + deploys

Phase 2: Program Client Wiring
├── Task 7: IDL integration
├── Task 8: Wallet → program connection
└── Checkpoint: Can read program state

Phase 3: Campaign Listing
├── Task 9: Program account queries
├── Task 10: Campaign card component
├── Task 11: Campaign list grid
└── Checkpoint: Shows sample data

Phase 4: Create Campaign
├── Task 12: Create campaign form UI
├── Task 13: create_campaign tx
└── Checkpoint: Can create campaign

Phase 5: Donation Flow
├── Task 14: Donation modal
├── Task 15: donate tx
└── Checkpoint: Can donate 1 SOL

Phase 6: Withdrawal Flow
├── Task 16: Withdraw button/auth check
├── Task 17: withdraw tx
└── Checkpoint: Creator can withdraw

Phase 7: Polish
���── Task 18: Progress bars
├── Task 19: Empty states
├── Task 20: Error handling
└── Checkpoint: All flows work
```

## Multica Integration

After plan is approved, create issues:

```
multica issue create --title "[Task N]: [Title]" \
  --description "[Acceptance criteria]" \
  --assignee opencode-agent-id
```

Agent ID: `6d23e81e-3d05-45b8-9636-98db2092bb48`

## Tech Stack Requirements

From CLAUDE.md best practices:
- Anchor 0.32+
- @solana/kit for client (Codama-generated)
- Wallet-standard for connection
- Helius RPC
- shadcn/ui for components

## Output

Save to: `docs/superpowers/plans/YYYY-MM-DD-peaceleague-africa.md`

Then option:
1. **Subagent-driven**: Dispatch fresh subagent per task
2. **Inline**: Execute tasks in session

---

Execute the plan using graphify queries for context and writing-plans skill.