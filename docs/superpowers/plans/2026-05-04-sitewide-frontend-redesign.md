# Sitewide Frontend Redesign Plan

> **Goal:** Redesign PeaceLeague Africa across all user-facing pages so it feels premium, cohesive, and modern — borrowing the structural clarity and polish of Helius-style product marketing, while **preserving PeaceLeague's existing warm gold / terracotta / charcoal brand palette**.

> **Working rule:** Keep the brand colors. Improve composition, hierarchy, motion, navigation, spacing, and information architecture.

---

## Assumptions

Because the brief is directional rather than pixel-specific, this plan assumes:

- **Audience:** donors, campaign creators, partners, and community members
- **Brand voice:** mission-driven, trustworthy, premium, tech-forward, human
- **Technical constraints:** Next.js 16, React 19, Tailwind v4, existing glass-card + Tailgrids utilities
- **Color constraint:** do **not** replace the current PeaceLeague palette with Helius blues/purples; only borrow layout and clarity patterns
- **Design reference use:** emulate Helius' clean navigation, structured content grouping, strong hero pacing, compact CTAs, and tidy menu organization — not its exact branding

---

## Design System Direction

### Visual direction
**Cinematic civic infrastructure** — a premium, trust-first interface that feels like mission-tech, not a generic donation template.

### Differentiator
The site should feel like a serious platform with editorial warmth: part impact report, part product-grade infrastructure UI.

### Typography system
- **Display:** Fraunces
- **Body:** DM Sans
- **Rules:**
  - large editorial headings
  - compact uppercase eyebrow labels
  - stronger contrast between headline, body, metadata, and UI controls

### Color system
Keep current brand palette and deepen its usage through structure:
- **Dominant:** charcoal / near-black background
- **Accent primary:** brand gold `#d4a853`
- **Accent secondary:** terracotta `#c46d46`
- **Neutral:** layered whites / translucent surfaces / muted warm grays

### Layout strategy
- floating rounded navigation
- clearer content bands / sections
- tighter CTA grouping
- asymmetrical grids where useful
- reusable page hero + content shell across all major pages
- consistent max-widths and spacing rhythm

### Motion strategy
- meaningful section reveals only
- hover lift on cards and CTAs
- subtle image zoom / glow / progress motion
- reduced-motion safe defaults

---

## Page Inventory

### Core marketing + discovery
- `/`
- `/about`
- `/how-it-works`
- `/campaigns`
- `/campaign/[slug]`
- `/blog`
- `/blog/[slug]`

### Trust / community / ecosystem
- `/faq`
- `/team`
- `/testimonials`
- `/donor-list`
- `/image-gallery`
- `/events`
- `/careers`

### Conversion / utility
- `/create`
- `/campaigns/create` (redirect alignment already exists; verify UX consistency)
- `/contact`
- `/support-ticket`
- `/donation`
- `/dashboard`

### Legal / low-frequency
- `/privacy-policy`
- `/terms-conditions`

---

## Architecture Strategy

Instead of redesigning every page independently, build a shared sitewide design layer first.

### Shared primitives to create or refine
- `PageHero` — reusable top section with eyebrow, title, description, CTA slot
- `PageShell` — max-width + vertical rhythm wrapper
- `SectionHeader` — consistent section lead-in
- `FeatureGrid` — reusable structured value blocks
- `MetricBand` — statistics / impact strip
- `EditorialCard` — premium content card style
- `CalloutPanel` — highlighted trust or action panel
- `ContentProse` — blog/legal/article content wrapper
- `NavGroup` / `MegaMenuLikeMobileSheet` — cleaner menu arrangement

---

## Phases

## Phase 1 — Shared foundation

### Task 1: Lock the sitewide visual language
**Description:** Normalize header/footer/nav/menu language and codify the Helius-like structural influence without changing brand colors.

**Acceptance criteria:**
- [ ] Header uses a consistent floating-shell pattern across all pages
- [ ] Mobile menu is grouped, scannable, and visually aligned with the desktop nav
- [ ] Footer matches the same premium system and spacing rhythm
- [ ] No cyan/purple Helius palette leaks into production UI

**Files likely touched:**
- `components/layout/header.tsx`
- `components/layout/mobile-nav.tsx`
- `components/layout/footer.tsx`
- `styles/globals.css`

**Verification:**
- `pnpm -s exec tsc --noEmit`

---

### Task 2: Build reusable page-level design primitives
**Description:** Create a reusable set of shells/sections so all remaining pages can be upgraded consistently.

**Acceptance criteria:**
- [ ] Shared page hero component exists
- [ ] Shared content shell exists
- [ ] Shared section header exists
- [ ] Shared metric/callout card styles exist
- [ ] At least 2 existing pages use the primitives successfully

**Files likely touched:**
- `components/ui/*` or `components/site/*` (new)
- `styles/globals.css`
- `app/home-client.tsx`
- `app/campaigns/campaigns-client.tsx`

**Verification:**
- `pnpm -s exec tsc --noEmit`

---

## Phase 2 — High-impact pages first

### Task 3: Homepage polish pass
**Description:** Refine the homepage further so it feels more structurally aligned with the new system and more polished than the first redesign pass.

**Acceptance criteria:**
- [ ] Hero has stronger hierarchy and clearer CTA grouping
- [ ] Section rhythm is more consistent top-to-bottom
- [ ] Proof/trust blocks feel cleaner and less ad hoc
- [ ] Featured campaigns align visually with the campaign listing system

**Files likely touched:**
- `app/home-client.tsx`

**Verification:**
- `pnpm -s exec tsc --noEmit`

---

### Task 4: Campaign listing page redesign
**Description:** Continue refining `/campaigns` into a stronger editorial + product discovery page.

**Acceptance criteria:**
- [ ] Hero, filters, and cards feel part of one design system
- [ ] Featured campaign treatment remains strong and intentional
- [ ] Filtering/sorting controls are visually cleaner
- [ ] Empty states and wallet states feel premium

**Files likely touched:**
- `app/campaigns/campaigns-client.tsx`
- `components/campaign/campaign-card.tsx`

**Verification:**
- `pnpm -s exec tsc --noEmit`

---

### Task 5: Campaign detail page redesign
**Description:** Make `/campaign/[slug]` feel like a flagship trust/conversion page.

**Acceptance criteria:**
- [ ] Hero media and story area feel editorial and premium
- [ ] Donation panel is clearer and more trustworthy
- [ ] Metadata, organizer info, and trust indicators are better organized
- [ ] Related/next actions are visually strong

**Files likely touched:**
- `app/campaign/[slug]/campaign-client.tsx`

**Verification:**
- `pnpm -s exec tsc --noEmit`

---

## Phase 3 — Content and trust pages

### Task 6: About + How It Works redesign
**Description:** Rebuild the narrative/trust pages with the same premium page hero and structured content sections.

**Acceptance criteria:**
- [ ] `/about` uses the new hero/content system
- [ ] `/how-it-works` uses clearer step presentation
- [ ] typography and spacing are consistent with homepage/listing
- [ ] sections no longer feel like isolated experiments

**Files likely touched:**
- `app/about/page.tsx`
- `app/how-it-works/page.tsx`

**Verification:**
- `pnpm -s exec tsc --noEmit`

---

### Task 7: FAQ + Team + Testimonials + Donor List
**Description:** Standardize trust/community pages around shared layouts and card systems.

**Acceptance criteria:**
- [ ] `/faq` feels aligned with the new product-marketing structure
- [ ] `/team` feels premium and editorial rather than generic cards
- [ ] `/testimonials` and `/donor-list` feel like social proof, not filler lists
- [ ] shared section primitives are reused instead of duplicating styling logic

**Files likely touched:**
- `app/faq/page.tsx`
- `app/team/page.tsx`
- `app/testimonials/page.tsx`
- `app/donor-list/page.tsx`

**Verification:**
- `pnpm -s exec tsc --noEmit`

---

### Task 8: Blog index + blog detail
**Description:** Give the editorial content surfaces a cleaner article system.

**Acceptance criteria:**
- [ ] `/blog` feels like a premium editorial archive
- [ ] `/blog/[slug]` uses a polished reading layout
- [ ] cards, category tags, author data, and content rhythm are upgraded
- [ ] article pages feel consistent with the sitewide visual language

**Files likely touched:**
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`

**Verification:**
- `pnpm -s exec tsc --noEmit`

---

## Phase 4 — Remaining marketing/support pages

### Task 9: Events + Gallery + Careers
**Description:** Upgrade showcase/recruitment pages with stronger presentation and reusable gallery/listing structures.

**Acceptance criteria:**
- [ ] pages use the shared hero + section system
- [ ] grids feel deliberate and attractive
- [ ] empty/no-content states still feel polished

**Files likely touched:**
- `app/events/page.tsx`
- `app/image-gallery/page.tsx`
- `app/careers/page.tsx`

**Verification:**
- `pnpm -s exec tsc --noEmit`

---

### Task 10: Contact + Support + Donation utility pages
**Description:** Make conversion and support flows feel intentionally designed, not like secondary pages.

**Acceptance criteria:**
- [ ] forms are more polished and easier to scan
- [ ] action hierarchy is clear
- [ ] pages visually match the rest of the redesign

**Files likely touched:**
- `app/contact/page.tsx`
- `app/support-ticket/page.tsx`
- `app/donation/page.tsx`

**Verification:**
- `pnpm -s exec tsc --noEmit`

---

## Phase 5 — App/product pages

### Task 11: Create + Dashboard experience
**Description:** Bring the product-side screens into the same visual system without hurting usability.

**Acceptance criteria:**
- [ ] `/create` uses the new shell and hierarchy
- [ ] `/dashboard` is cleaner and more premium but remains task-oriented
- [ ] wallet and transactional UI remain accessible and clear

**Files likely touched:**
- `app/create/page.tsx`
- related create components
- `app/dashboard/page.tsx`

**Verification:**
- `pnpm -s exec tsc --noEmit`

---

## Phase 6 — Low-frequency legal pages

### Task 12: Legal content polish
**Description:** Give legal pages a clean, readable content system consistent with the new brand shell.

**Acceptance criteria:**
- [ ] `/privacy-policy` and `/terms-conditions` use shared prose and page hero wrappers
- [ ] readability is improved without overdesigning legal content

**Files likely touched:**
- `app/privacy-policy/page.tsx`
- `app/terms-conditions/page.tsx`

**Verification:**
- `pnpm -s exec tsc --noEmit`

---

## Cross-cutting rules

### Accessibility
- maintain keyboard focus states
- keep sufficient contrast against dark surfaces
- avoid motion overload
- preserve semantic heading order

### Performance
- prefer CSS gradients/patterns over heavy decorative assets
- use `next/image` where possible
- reuse existing primitives instead of introducing bloated one-off components

### Consistency rules
- keep the current brand colors
- keep rounded shell language consistent
- use one navigation logic across desktop and mobile
- reuse section spacing values instead of improvising page by page

---

## Suggested execution order

1. Header + mobile nav color-correct polish
2. Shared page hero / shell primitives
3. Homepage refinement
4. Campaign detail redesign
5. About + How It Works
6. FAQ + Team + Testimonials + Donor List
7. Blog index + detail
8. Events + Gallery + Careers
9. Contact + Support + Donation
10. Create + Dashboard
11. Legal pages
12. Final consistency sweep

---

## Verification checklist

After each task:
- [ ] `pnpm -s exec tsc --noEmit`
- [ ] visually inspect affected route(s)
- [ ] confirm brand palette remains warm gold / terracotta / charcoal
- [ ] confirm nav/footer/menu still look coherent sitewide

Final pass:
- [ ] no page looks like an older design era
- [ ] all major pages share the same design language
- [ ] mobile menu is neat and grouped like a premium product site
- [ ] homepage + campaigns + campaign detail feel like the flagship trio

---

## Immediate next implementation slice

**Start with:**
1. shared page primitives
2. campaign detail page redesign
3. about / how-it-works / faq alignment

That gives the fastest jump in perceived quality while keeping the redesign coherent.

---

## Execution log

- **2026-05-04:** Created shared page foundation in `components/site/page-shell.tsx`.
- **2026-05-04:** Refined header and grouped mobile navigation to keep PeaceLeague colors while improving Helius-like structural clarity.
- **2026-05-04:** Redesigned `/about`, `/how-it-works`, `/faq`, `/team`, `/testimonials`, and `/donor-list` to align with the new sitewide system.
- **2026-05-04:** Redesigned `/campaign/[slug]`, `/blog`, `/blog/[slug]`, `/events`, and `/image-gallery` to match the same premium editorial system.
- **2026-05-04:** Redesigned `/careers`, `/contact`, `/support-ticket`, `/donation`, `/dashboard`, `/privacy-policy`, and `/terms-conditions` to complete the current sitewide alignment pass.
- **2026-05-04:** Ran a consistency sweep across remaining utility surfaces: refreshed `create` flow presentation, upgraded loading/error states, polished dialogs, and added small sitewide editorial utility classes in `styles/globals.css`.
- **2026-05-04:** Performed a final micro-consistency pass: normalized shared button/input shapes, tightened mobile hero spacing, refined wallet/newsletter controls, and improved a few remaining CTA strings.
- **2026-05-04:** Completed a QA-style final sweep: aligned fallback/not-found states, updated legacy campaign subcomponents to the shared card system, normalized residual radius/copy mismatches, and removed a few remaining off-palette highlight treatments.
- **2026-05-04:** Verified current slice with `pnpm -s exec tsc --noEmit`.
