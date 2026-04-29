I'm using the writing-plans skill to create the implementation plan.

---

# PeaceLeague Africa Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Solana crowdfunding dApp for African causes with campaign creation, donation tracking, and creator withdrawal

**Architecture:** 
- Backend: Anchor program (Rust) with Campaign and ProgramState accounts, PDA-based campaign storage
- Data: Cosmic CMS for campaign content, images, stories (off-chain)
- Frontend: Next.js 16 with @solana/kit client, TailGrids + shadcn/ui hybrid UI
- Wallet: wallet-standard via @solana/kit

**Tech Stack:** Anchor 0.32+, Next.js 16, React 19, Tailwind v4, TailGrids, Cosmic SDK, @solana/kit

---

## Phase 1: Anchor Program (Foundation) ✅ COMPLETE

- [x] Task 1: Initialize Anchor Project
- [x] Task 2: Create Campaign State
- [x] Task 3: Create ProgramState
- [x] Task 4: Initialize Instruction
- [x] Task 5: Create Campaign Instruction
- [x] Task 6: Donate Instruction
- [x] Task 7: Withdraw Instruction

---

## Phase 1b: Frontend Setup - TailGrids + shadcn/ui

**UI Library**: TailGrids (https://tailgrids.com) + shadcn/ui hybrid
**Template**: Fincash fintech template structure
**CMS**: Cosmic SDK for off-chain campaign content

### Task 1b: Install TailGrids + DaisyUI

**Files:**
- Modify: `package.json`
- Modify: `styles/globals.css`
- Modify: `.env.example`

- [x] **Step 1: Install DaisyUI**
```bash
pnpm add daisyui@latest
```

- [x] **Step 2: Configure Tailwind (v4 CSS-first)**
Added DaisyUI plugin to `styles/globals.css`:
```css
@plugin "daisyui" {
  themes: light --default, dark --prefersdark;
}
```

Also added custom PeaceLeague theme.

- [x] **Step 3: Add TailGrids components**
Use their copy-paste components for:
- Hero sections
- Feature cards
- Testimonial sliders
- Pricing/CTA sections

---

### Task 2b: Cosmic SDK Setup

**Files:**
- Create: `lib/cosmic.ts`
- Modify: `.env` (with COSMIC keys)
- Modify: `.env.example`

- [x] **Step 1: Install Cosmic**
```bash
pnpm add @cosmicjs/sdk
```

- [x] **Step 2: Configure client**
```typescript
import { Cosmic } from "@cosmicjs/sdk";
// ... client setup with bucket slug and keys
```

- [x] **Step 3: Define content types** (in Cosmic dashboard)
- Campaign: title, slug, story, image, category, beneficiary, location
- Story: title, slug, content, image, author

- [ ] **Step 4: Create fetch hooks**
```typescript
// hooks/useCampaigns.ts
// hooks/useCampaign.ts
// hooks/useStories.ts
```

- [ ] **Step 2: Configure Tailwind**
Add DaisyUI to plugins in `tailwind.config.js`:
```javascript
plugins: [require('daisyui')],
daisyui: {
  themes: ['light', 'dark'],
  darkTheme: 'dark',
}
```

- [ ] **Step 3: Add TailGrids components**
Use their copy-paste components for:
- Hero sections
- Feature cards
- Testimonial sliders
- Pricing/CTA sections

---

### Task 2b: Cosmic SDK Setup

**Files:**
- Create: `lib/cosmic.ts`

- [ ] **Step 1: Install Cosmic**
```bash
pnpm add @cosmic/cosmic-js
```

- [ ] **Step 2: Configure client**
```typescript
import { createClient } from '@cosmic/cosmicjs';

export const cosmic = createClient({
  bucketSlug: process.env.NEXT_PUBLIC_COSMIC_BUCKET_SLUG,
  readKey: process.env.NEXT_PUBLIC_COSMIC_READ_KEY,
  writeKey: process.env.COSMIC_WRITE_KEY,
});
```

- [ ] **Step 3: Define content types** (in Cosmic dashboard)
- Campaign: title, slug, story, image, category, beneficiary, location
- Story: title, slug, content, image, author

- [ ] **Step 4: Create fetch hooks**
```typescript
// hooks/useCampaigns.ts
// hooks/useCampaign.ts
// hooks/useStories.ts
```

---

### Task 3b: Homepage (Fincash-inspired)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Hero Section**
Use TailGrids hero with dual CTAs:
- "Start a Campaign" (connect wallet → create page)
- "Donate Now" (scroll to campaigns)

- [ ] **Step 2: Stats Bar**
Fetch from Anchor program:
- Total raised
- Campaigns count
- Donors count

- [ ] **Step 3: Featured Campaigns**
Fetch from Cosmic, show 3-6 cards
Each card: image, title, progress bar, link

- [ ] **Step 4: How It Works**
3 steps: Create → Share → Receive

- [ ] **Step 5: Impact Stories**
Fetch from Cosmic Stories type
Testimonial slider (use TailGrids)

- [ ] **Step 6: CTA Section**
Use TailGrids CTA component

- [ ] **Step 7: Footer**
Use TailGrids footer

---

### Task 4b: Campaigns Page

**Files:**
- Create: `app/campaigns/page.tsx`

- [ ] **Step 1: Campaign grid**
Fetch from Cosmic, filterable

- [ ] **Step 2: Category filters**
Healthcare, Education, Emergency, etc.

- [ ] **Step 3: Search**
Search by title

- [ ] **Step 4: Load more / pagination**

---

### Task 5b: Campaign Detail

**Files:**
- Create: `app/campaign/[slug]/page.tsx`

- [ ] **Step 1: Campaign hero**
Image from Cosmic, title, location

- [ ] **Step 2: Progress section**
- Goal from Cosmic
- Raised (fetch from Anchor)
- Progress bar
- Donor count

- [ ] **Step 3: Donate button**
- Opens connect wallet if needed
- Then donate modal (shadcn Dialog)

- [ ] **Step 4: Story tab**
Rich text from Cosmic

- [ ] **Step 5: Updates tab**
Fetch Campaign Updates from Cosmic

- [ ] **Step 6: Donors list**
Fetch from Anchor by campaign_id

---

### Task 6b: Create Campaign

**Files:**
- Create: `app/create/page.tsx`

- [ ] **Step 1: Wallet check**
Redirect if not connected

- [ ] **Step 2: Multi-step form**
Step 1: Basic info (title, story, category)
Step 2: Media (image upload to Cosmic)
Step 3: Goal and timeline
Step 4: Review → Submit

- [ ] **Step 3: Save to Cosmic first**
Then invoke Anchor create_campaign

---

### Task 7b: Dashboard

**Files:**
- Create: `app/dashboard/page.tsx`

- [ ] **Step 1: My campaigns**
Created by connected wallet

- [ ] **Step 2: My donations**
Donated by connected wallet

- [ ] **Step 3: Withdraw buttons**
For campaign owners

---

## Checkpoint

- [ ] Homepage loads with hero, campaigns, stories
- [ ] Can view campaign details
- [ ] Can create campaign (multi-step)
- [ ] Wallet connection works
- [ ] Dark mode toggles

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