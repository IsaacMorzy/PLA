# PeaceLeague Africa - Frontend UI Prompt

## Project Context

Build a Solana crowdfunding dApp frontend for **PeaceLeague Africa** - a transparent, peer-to-peer charitable donation platform for African causes.

## Architecture

- **Backend (On-chain)**: Anchor 0.32 Solana program (already compiled)
- **Data (Off-chain)**: Cosmic CMS for campaign content, images, stories
- **UI**: Next.js 16 + Tailwind v4 + TailGrids + shadcn/ui hybrid

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS v4
- TailGrids components (https://tailgrids.com)
- Cosmic CMS SDK
- @solana/kit (wallet + transactions)
- shadcn/ui (some components)

## Template Reference

Use **Fincash** template structure from TailGrids:
- Homepage hero with CTA
- Features section
- How it works (workflow)
- Trust/testimonials
- Contact/FAQ
- Footer

Map to dApp:
- Hero → "Start a Campaign" / "Donate Now"
- Features → "Transparent", "Fast", "Secure"
- Workflow → "Create → Share → Receive"
- Testimonials → Impact stories from CMS

## UI Requirements

### Design Tokens (from globals.css)
Keep existing design system:
- Brand: `#14f195` (builderz green)
- Accent: `#00ffd5` (cyan)
- Glassmorphism, glow effects, animations

### Pages

1. **Homepage** (`app/page.tsx`)
   - Hero: Headline + dual CTAs
   - Stats bar (from program)
   - Featured campaigns (from Cosmic)
   - How it works
   - Impact stories
   - CTA section
   - Footer

2. **Campaigns** (`app/campaigns/page.tsx`)
   - Grid of campaign cards
   - Filter by category
   - Search

3. **Campaign Detail** (`app/campaign/[slug]/page.tsx`)
   - Campaign hero image (CMS)
   - Progress bar (on-chain data)
   - Donate button → opens connect wallet if needed
   - Story/content from CMS
   - Updates from CMS
   - Donor list (on-chain)

4. **Create Campaign** (`app/create/page.tsx`)
   - Multi-step form
   - Connect wallet at start
   - Form fields → save to Cosmic
   - Then invoke on-chain create_campaign

5. **Dashboard** (`app/dashboard/page.tsx`)
   - User's created campaigns
   - Donation history
   - Withdraw button (campaign owners)

### Components (TailGrids + shadcn)

Use TailGrids for:
- Buttons, Cards, Badges
- Forms, Inputs
- Dialogs, Modals
- Accordions (FAQ)
- Testimonial slides

Use shadcn/ui for:
- Sheet (mobile nav)
- Dialog (donate modal)
- Dropdown menu

## Prompts for Cosmic CMS

```
Bucket: peaceleague-africa

Content Types:
1. Campaign
   - title (text)
   - slug (text)
   - story (richtext)
   - image (media)
   - category (select)
   - beneficiary (text)
   - location (text)
   - updates (array of richtext)
   - published (boolean)

2. Story (impact stories)
   - title (text)
   - slug (text)
   - content (richtext)
   - image (media)
   - author (text)

3. Update (campaign updates)
   - title (text)
   - content (richtext)
   - campaign (reference)
   - date (date)
```

## Solana Integration

Use @solana/kit (not older wallet-adapter):
```typescript
import { useWallet, useConnection } from '@solana/kit';

// Program ID: CVPzfvBudPvhXcJwKXKCc56VgAFttgZdTKyXrrgErDnb

// Instructions:
// - initialize()
// - createCampaign(title, description, image_url, goal)
// - donate(id, amount)  -- amount in lamports
// - withdraw(id, amount)
// - deleteCampaign(id)
```

## Code Standards

- Use exact file paths from glob output
- Follow existing component patterns in `components/ui/`
- TypeScript strict mode
- Dark mode support (existing)
- Mobile-first responsive

## Deliverables

1. Homepage with Fincash-inspired hero
2. Campaigns listing page
3. Campaign detail template
4. Create campaign flow
5. Dashboard template

## Constraints

- Don't break existing wallet connection
- Keep glassmorphism design system
- Use existing globals.css tokens
- Mobile responsive required