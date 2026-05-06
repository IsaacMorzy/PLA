# Frontend Rebuild Plan (Donor-first, Trust-first)

## Product direction
- **Audience priority:** Donors > Campaign creators > NGO partners
- **Primary jobs:** Donate fast, verify trust, launch campaign
- **Tone:** Institutional trust-first with warm human touch

## Execution plan

### 1) Messaging and narrative system
- [x] Remove internal/dev-facing copy from homepage and key pages
- [x] Rewrite headlines for donor confidence and verification clarity
- [x] Normalize CTA language around donation-first flows
- [x] Keep creator and partner pathways explicit but secondary

### 2) Conversion hierarchy
- [x] Promote donation CTA in global navigation
- [x] Make homepage primary CTA donation-oriented
- [x] Keep launch flow as clear secondary CTA
- [x] Tighten campaign listing value proposition around faster donor decisions

### 3) Trust cues in critical surfaces
- [x] Strengthen FAQ language for legitimacy and fund traceability
- [x] Clarify campaign profile copy to support pre-donation evaluation
- [x] Improve footer copy to reinforce institutional trust + human clarity

### 4) Interaction and readability polish
- [x] Reduce ambiguous or self-referential language
- [x] Replace jargon-heavy statements with practical donor outcomes
- [x] Keep visual system warm, premium, and consistent with existing palette

## Files updated
- `app/home-client.tsx`
- `components/layout/header.tsx`
- `components/layout/footer.tsx`
- `app/campaigns/campaigns-client.tsx`
- `app/create/create-campaign-page.tsx`
- `app/campaign/[slug]/campaign-client.tsx`

## Next implementation pass (executed)
- [x] Consolidated repeated visual treatments in `styles/globals.css` into reusable design tokens (`--surface-*`, `--focus-*`) and shared utility classes (`surface-glass-*`, `focus-ring-brand`)
- [x] Added component-level accessibility improvements: `aria-current` for active nav links, focus-visible states for interactive surfaces, improved newsletter form labeling/status semantics
- [x] Tuned mobile density/performance by reducing high-cost blur usage on mobile navigation and tightening homepage hero spacing/type scale
- [x] Implemented shared copy constants in `lib/copy.ts` and adopted them across header, mobile nav, homepage, and footer

## Route-level QA pass (executed)
- [x] `/campaigns`: aligned CTA wording to shared copy constants for conversion consistency
- [x] `/campaign/[slug]`: improved keyboard focus treatment on back navigation and hardened share-link interaction with error fallback
- [x] `/create`: improved focus-visible states across key links/buttons and aligned launch CTA wording
- [x] `/faq`: added keyboard-visible focus states on CTA controls and reused shared CTA copy
- [x] `/blog`: improved card accessibility focus ring treatment and upgraded featured media rendering to `next/image`

## Phase 3 QA pass (executed)
- [x] Contrast sweep on key reading surfaces (`/blog`, `/blog/[slug]`, `/campaigns`, `/create`) by raising low-opacity secondary text to improve readability
- [x] Interaction-state consistency pass: added and normalized keyboard-visible focus treatments on article/back links and kept CTA focus behavior consistent
- [x] Copy and flow harmonization: reused shared CTA constants and switched remaining launch CTAs to canonical `/create` route

## Phase 4 full-site sweep (executed)
- [x] `/about`, `/how-it-works`, `/events`: raised low-contrast body/meta text and aligned primary CTA wording to shared copy constants
- [x] `/dashboard`: completed focused readability pass, normalized action labels via shared CTA copy, and added consistent keyboard-focus states to interactive controls (links, filters, export buttons)
- [x] `/privacy-policy`, `/terms-conditions`: improved legal metadata readability while preserving restrained legal styling
- [x] Global CTA interaction consistency improved by adding focus-visible behavior to `PageHero` primary action in `components/site/page-shell.tsx`

## Phase 5 micro-audit (executed)
- [x] Animation consistency: normalized Framer easing strategy in `lib/animations.ts` using shared easing curves (`EASE_OUT_EXPO`, `EASE_OUT_QUINT`) for coherent motion tone
- [x] Readability polish on shared UI primitives: raised low-contrast secondary text in `glass-card`, `transaction-dialog`, and `token-input`
- [x] Navigation/support legibility sweep: improved mobile-nav and footer low-contrast labels and descriptions
- [x] Conversion-surface precision polish: improved contrast + focus states on `/contact`, `/careers`, and `/campaign/[slug]` supporting metadata and helper text

## Phase 6 zero-regression pass (executed)
- [x] **No-new-style-rule check**: did not introduce new global CSS rule groups; kept polish at component level to avoid expanding style-surface risk
- [x] **Token/component reuse enforcement**: continued using shared CTA/focus language and existing component primitives instead of introducing one-off styling systems
- [x] **Residual contrast cleanup** across utility/support routes: improved readability on `/donation`, `/support-ticket`, `/team`, `/testimonials`, `/donor-list`, `/global-error`, `/campaign/[slug]` not-found, and campaign-grid empty state
- [x] **Shared component hygiene**: increased low-contrast helper text in `dialog`, `feature`, `tailgrids`, `token-input`, `wallet-button`, and related helper surfaces
- [x] **Motion consistency locked**: retained shared easing approach in `lib/animations.ts` to keep interaction feel coherent
- [x] **Route canonicalization re-check**: confirmed no remaining `"/campaigns/create"` links in `app/` and `components/`

### Phase 6 contrast allowlist
Intentional low-emphasis microcopy may remain in small uppercase metadata labels (`~11px`) where visual hierarchy requires subdued presentation, but primary/supporting task text was normalized upward.

## Execution log
- 2026-05-06: Implemented Sprint 1 design-system polish focused on tokens, accessibility, mobile performance, and copy consistency.
- 2026-05-06: Implemented Sprint 2 route-level QA polish across campaigns, campaign detail, create, FAQ, and blog surfaces.
- 2026-05-06: Implemented Sprint 3 contrast/interaction/copy harmonization pass across flagship conversion and editorial routes.
- 2026-05-06: Implemented Sprint 4 precision full-site sweep across about/how-it-works/events/dashboard/legal plus global hero CTA focus behavior.
- 2026-05-06: Implemented Sprint 5 micro-audit for motion consistency + shared component readability + residual low-contrast/focus hygiene.
- 2026-05-06: Implemented Sprint 6 zero-regression pass for style containment, token reuse enforcement, residual contrast cleanup, and final route canonicalization check.
- 2026-05-06: Verified all passes with `pnpm -s exec tsc --noEmit`.
