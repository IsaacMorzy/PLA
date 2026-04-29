I'm using the writing-plans skill to create the implementation plan.

---

# Peace League Africa Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Solana crowdfunding dApp for African causes with campaign creation, donation tracking, and creator withdrawal

**Architecture:** 
- Backend: Anchor program (Rust) with Campaign and ProgramState accounts, PDA-based campaign storage
- Frontend: Next.js 16 with @solana/kit client, shadcn/ui components
- Wallet: wallet-standard via @solana/kit

**Tech Stack:** Anchor 0.32+, Next.js 16, React 19, Tailwind v4, @solana/kit, Codama

---

## Phase 1: Anchor Program (Foundation)

### Task 1: Initialize Anchor Project

**Files:**
- Create: `anchor/Cargo.toml`
- Create: `anchor/programs/peaceleague/src/lib.rs`
- Create: `anchor/Anchor.toml`

- [ ] **Step 1: Initialize with Anchor.toml skeleton**
```toml
[profile.release]
overflow-checks = true

[provider]
cluster = "devnet"
wallet = "~/.config/solana/id.json"
```

- [ ] **Step 2: Create Cargo.toml**
```toml
[package]
name = "peaceleague"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib", "rlib"]

[dependencies]
anchor-lang = "0.32"
anchor-spl = "0.32"
solana-program = "2"

[features]
default = []
anchor-debug = []
```

- [ ] **Step 3: Create lib.rs with declare_id**
```rust
use anchor_lang::prelude::*;

declare_id!("PEACE11111111111111111111111111111");
```

- [ ] **Step 4: Build to verify**

```bash
cd anchor && anchor build
```

- [ ] **Step 5: Generate IDL**

```bash
anchor build --idl/out target/idl.json
```

---

### Task 2: Create Campaign State

**Files:**
- Create: `anchor/programs/peaceleague/src/states/campaign.rs`
- Modify: `anchor/programs/peaceleague/src/lib.rs`

- [ ] **Step 1: Write the failing test**

```rust
#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct Campaign {
    pub cid: u64,
    pub creator: Pubkey,
    pub title: String,
    pub description: String,
    pub image_url: String,
    pub goal: u64,
    pub amount_raised: u64,
    pub timestamp: i64,
    pub donors: u64,
    pub balance: u64,
    pub active: bool,
}
```

- [ ] **Step 2: Run build to verify** (expected: fail - not wired)

- [ ] **Step 3: Wire into lib.rs**

```rust
pub mod states;
pub use states::*;
```

- [ ] **Step 4: Run build to verify**

```bash
cd anchor && anchor build
```

- [ ] **Step 5: Commit**

```bash
git add anchor/ && git commit -m "feat: add Campaign state struct"
```

---

### Task 3: Create ProgramState

**Files:**
- Create: `anchor/programs/peaceleague/src/states/program_state.rs`

- [ ] **Step 1: Write the failing test**

```rust
#[account]
#[derive(InitSpace)]
pub struct ProgramState {
    pub initialized: bool,
    pub campaign_count: u64,
    pub platform_fee: u64,
    pub platform_address: Pubkey,
}
```

- [ ] **Step 2: Run build**

- [ ] **Step 3: Wire into lib.rs**

```rust
pub mod program_state;
```

- [ ] **Step 4: Run build**

- [ ] **Step 5: Commit**

---

### Task 4: Initialize Instruction

**Files:**
- Modify: `anchor/programs/peaceleague/src/lib.rs`
- Create: `anchor/programs/peaceleague/src/instructions/initialize.rs`

- [ ] **Step 1: Write initialize instruction**

```rust
pub fn initialize(ctx: Context<InitializeCtx>) -> Result<()> {
    let state = &mut ctx.accounts.program_state;
    state.initialized = true;
    state.campaign_count = 0;
    state.platform_fee = 5;
    state.platform_address = ctx.accounts.admin.key();
    Ok(())
}

#[derive(Accounts)]
pub struct InitializeCtx<'info> {
    #[account(init, payer = admin, space = ProgramState::INIT_SPACE)]
    pub program_state: Account<'info, ProgramState>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}
```

- [ ] **Step 2: Add to program module**

```rust
pub fn initialize(ctx: Context<InitializeCtx>) -> Result<()> {
    instructions::initialize(ctx)
}
```

- [ ] **Step 3: Build**

- [ ] **Step 4: Commit**

---

### Task 5: Create Campaign Instruction

**Files:**
- Create: `anchor/programs/peaceleague/src/instructions/create_campaign.rs`

- [ ] **Step 1: Write the failing test**

```rust
pub fn create_campaign(
    ctx: Context<CreateCampaignCtx>,
    title: String,
    description: String,
    image_url: String,
    goal: u64,
) -> Result<()> {
    require!(title.len() <= 64, ErrorCode::TitleTooLong);
    require!(goal >= 1_000_000_000, ErrorCode::InvalidGoal);
    
    let state = &mut ctx.accounts.program_state;
    state.campaign_count += 1;
    
    let campaign = &mut ctx.accounts.campaign;
    campaign.cid = state.campaign_count;
    campaign.creator = ctx.accounts.creator.key();
    campaign.title = title;
    campaign.description = description;
    campaign.image_url = image_url;
    campaign.goal = goal;
    campaign.amount_raised = 0;
    campaign.timestamp = Clock::get()?.unix_timestamp;
    campaign.donors = 0;
    campaign.balance = 0;
    campaign.active = true;
    Ok(())
}

#[derive(Accounts)]
pub struct CreateCampaignCtx<'info> {
    #[account(mut)]
    pub program_state: Account<'info, ProgramState>,
    #[account(init, payer = creator, space = Campaign::INIT_SPACE)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub creator: Signer<'info>,
    pub system_program: Program<'info, System>,
}
```

- [ ] **Step 2: Add error codes**

```rust
#[error]
pub enum ErrorCode {
    #[msg("Title too long")]
    TitleTooLong,
    #[msg("Goal must be at least 1 SOL")]
    InvalidGoal,
}
```

- [ ] **Step 3: Build**

- [ ] **Step 4: Commit**

---

### Task 6: Donate Instruction

**Files:**
- Create: `anchor/programs/peaceleague/src/instructions/donate.rs`

- [ ] **Step 1: Write donate logic**

```rust
pub fn donate(ctx: Context<DonateCtx>, cid: u64, amount: u64) -> Result<()> {
    let campaign = &mut ctx.accounts.campaign;
    require!(campaign.cid == cid, ErrorCode::CampaignNotFound);
    require!(campaign.active, ErrorCode::CampaignInactive);
    require!(amount >= 1_000_000_000, ErrorCode::InvalidAmount);
    
    // Transfer SOL
    let ix = system_instruction::transfer(
        &ctx.accounts.donor.key(),
        &campaign.key(),
        amount,
    );
    anchor_lang::solana_program::program::invoke(
        &ix,
        &[ctx.accounts.donor.to_account_info(), campaign.to_account_info()],
    )?;
    
    campaign.amount_raised += amount;
    campaign.balance += amount;
    campaign.donors += 1;
    Ok(())
}

#[derive(Accounts)]
#[instruction(cid: u64)]
pub struct DonateCtx<'info> {
    #[account(mut, seeds = [b"campaign", cid.to_le_bytes().as_ref()], bump)]
    pub campaign: Account<'info, Campaign>,
    #[account(mut)]
    pub donor: Signer<'info>,
    pub system_program: Program<'info, System>,
}
```

- [ ] **Step 2: Build**

- [ ] **Step 3: Commit**

---

### Task 7: Withdraw Instruction

**Files:**
- Create: `anchor/programs/peaceleague/src/instructions/withdraw.rs`

- [ ] **Step 1: Write withdraw logic**

```rust
pub fn withdraw(ctx: Context<WithdrawCtx>, cid: u64, amount: u64) -> Result<()> {
    let campaign = &mut ctx.accounts.campaign;
    require!(campaign.creator == ctx.accounts.creator.key(), ErrorCode::Unauthorized);
    require!(amount >= 1_000_000_000, ErrorCode::InvalidAmount);
    require!(amount <= campaign.balance, ErrorCode::InsufficientBalance);
    
    let platform_fee = amount * ctx.accounts.program_state.platform_fee / 100;
    let creator_amount = amount - platform_fee;
    
    // Transfer to creator
    **campaign.to_account_info().try_borrow_mut_lamports()? -= creator_amount;
    **ctx.accounts.creator.to_account_info().try_borrow_mut_lamports()? += creator_amount;
    
    // Transfer platform fee
    **campaign.to_account_info().try_borrow_mut_lamports()? -= platform_fee;
    **ctx.accounts.platform_address.to_account_info().try_borrow_mut_lamports()? += platform_fee;
    
    campaign.balance -= amount;
    Ok(())
}
```

- [ ] **Step 2: Build**

- [ ] **Step 3: Commit**

---

## Checkpoint: After Tasks 1-7

- [ ] `anchor build` passes
- [ ] Program deploys to devnet
- [ ] IDL generated

---

## Phase 2: Frontend Integration

### Task 8: IDL Client Setup

**Files:**
- Create: `lib/program.ts`
- Modify: `contexts/ContextProvider.tsx`

- [ ] **Step 1: Export IDL**

Copy from `anchor/target/idl/peaceleague.json` to `lib/idl.json`

- [ ] **Step 2: Create program client**

```typescript
import { Program, Idl } from '@coral-xyz/anchor';
import { useMemo } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import idl from '@/lib/idl.json';

const PROGRAM_ID = 'PEACE11111111111111111111111111111';

export function useProgram() {
  const { connection } = useConnection();
  const wallet = useWallet();
  
  return useMemo(() => {
    if (!wallet.publicKey || !connection) return null;
    const provider = new AnchorProvider(connection, wallet as any, {});
    return new Program(idl as Idl, PROGRAM_ID, provider);
  }, [wallet.publicKey, connection]);
}
```

- [ ] **Step 3: Commit**

---

### Task 9: Campaign Types

**Files:**
- Create: `types/campaign.ts`

- [ ] **Step 1: Define TypeScript types**

```typescript
export interface Campaign {
  cid: number;
  creator: string;
  title: string;
  description: string;
  imageUrl: string;
  goal: number;
  amountRaised: number;
  timestamp: number;
  donors: number;
  balance: number;
  active: boolean;
}
```

- [ ] **Step 2: Commit**

---

### Task 10: Fetch Campaigns

**Files:**
- Create: `hooks/useCampaigns.ts`

- [ ] **Step 1: Write the hook**

```typescript
import { useAsync } from 'react-async';
import { useProgram } from '@/lib/program';

export function useCampaigns() {
  const program = useProgram();
  
  return useAsync({
    promiseFn: async () => {
      if (!program) return [];
      const accounts = await program.account.campaign.all();
      return accounts.map(a => ({
        ...a.account,
        pubkey: a.publicKey,
      }));
    },
    dependencies: [program],
  });
}
```

- [ ] **Step 2: Commit**

---

## Checkpoint: After Tasks 8-10

- [ ] Build succeeds
- [ ] Can fetch from program

---

## Phase 3: Campaign UI

### Task 11: Campaign Card

**Files:**
- Create: `components/campaign/campaign-card.tsx`

- [ ] **Step 1: Write the component**

```tsx
import { Campaign } from '@/types/campaign';

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const progress = (campaign.amountRaised / campaign.goal) * 100;
  
  return (
    <div className="bg-card rounded-lg p-4">
      <img src={campaign.imageUrl} alt={campaign.title} className="w-full h-48 object-cover rounded" />
      <h3 className="font-bold mt-2">{campaign.title}</h3>
      <p className="text-sm text-muted">{campaign.description}</p>
      <div className="mt-2">
        <div className="h-2 bg-muted rounded-full">
          <div className="h-2 bg-primary rounded-full" style={{ width: `${progress}%` }} />
        </div>
        <p className="text-sm mt-1">
          {campaign.amountRaised / 1e9} / {campaign.goal / 1e9} SOL
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

---

### Task 12: Campaign Grid

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Build listing page**

```tsx
'use client';

import { useCampaigns } from '@/hooks/useCampaigns';
import { CampaignCard } from '@/components/campaign/campaign-card';
import { ConnectButton } from '@/components/wallet/wallet-button';

export default function Home() {
  const { data: campaigns, isLoading } = useCampaigns();
  
  return (
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Peace League Africa</h1>
        <ConnectButton />
      </div>
      
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {campaigns?.map(c => (
            <CampaignCard key={c.pubkey.toString()} campaign={c} />
          ))}
        </div>
      )}
    </main>
  );
}
```

- [ ] **Step 2: Commit**

---

## Checkpoint: After Tasks 11-12

- [ ] Page renders
- [ ] Campaigns display

---

## Phase 4: Create Campaign

### Task 13: Create Campaign Form

**Files:**
- Create: `components/campaign/create-campaign-form.tsx`

- [ ] **Step 1: Write form**

```tsx
'use client';

import { useState } from 'react';
import { useProgram } from '@/lib/program';

export function CreateCampaignForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const program = useProgram();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program) return;
    
    const goalLamports = parseFloat(goal) * 1e9;
    
    await program.methods
      .createCampaign(title, description, '', goalLamports)
      .accounts({
        creator: program.provider.wallet.publicKey,
      })
      .rpc();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Campaign title"
        className="w-full p-2 border rounded"
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        value={goal}
        onChange={e => setGoal(e.target.value)}
        placeholder="Goal in SOL"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="btn-primary">
        Create Campaign
      </button>
    </form>
  );
}
```

- [ ] **Step 2: Commit**

---

## Phase 5: Donation Flow

### Task 14: Donate Modal

**Files:**
- Create: `components/campaign/donate-modal.tsx`

- [ ] **Step 1: Write modal**

```tsx
'use client';

import { useState } from 'react';
import { useProgram } from '@/lib/program';

interface DonateModalProps {
  campaignPubkey: string;
  onClose: () => void;
}

export function DonateModal({ campaignPubkey, onClose }: DonateModalProps) {
  const [amount, setAmount] = useState('');
  const program = useProgram();
  
  const handleDonate = async () => {
    if (!program) return;
    const lamports = parseFloat(amount) * 1e9;
    
    await program.methods
      .donate(lamports)
      .accounts({
        donor: program.provider.wallet.publicKey,
      })
      .rpc();
    
    onClose();
  };
  
  return (
    <dialog open className="modal">
      <h3>Donate</h3>
      <input
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount in SOL"
      />
      <button onClick={handleDonate}>Donate</button>
      <button onClick={onClose}>Close</button>
    </dialog>
  );
}
```

- [ ] **Step 2: Commit**

---

## Phase 6: Withdrawal

### Task 15: Withdraw Button

**Files:**
- Modify: `components/campaign/campaign-card.tsx`

- [ ] **Step 1: Add withdraw**

```tsx
import { useWallet } from '@solana/wallet-adapter-react';

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const { publicKey } = useWallet();
  const isCreator = publicKey?.toString() === campaign.creator;
  
  return (
    <div className="card">
      {/* existing content */}
      {isCreator && (
        <button onClick={() => handleWithdraw(campaign)}>
          Withdraw
        </button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

---

## Checkpoint: Complete

- [ ] All tasks implemented
- [ ] Build passes
- [ ] Can create, donate, withdraw

---

## Multica Issues to Create

```bash
# After plan approval, create issues:
multica issue create --title "Task 1-7: Anchor Program" --description "Create Campaign state, ProgramState, instructions" --assignee opencode
multica issue create --title "Task 8-10: Program Client" --description "Wire IDL client to frontend" --assignee opencode
multica issue create --title "Task 11-12: Campaign Listing UI" --description "List campaigns with progress bars" --assignee opencode
multica issue create --title "Task 13: Create Campaign Form" --description "Allow users to create campaigns" --assignee opencode
multica issue create --title "Task 14-15: Donate + Withdraw" --description "Full donation and withdrawal flows" --assignee opencode
```