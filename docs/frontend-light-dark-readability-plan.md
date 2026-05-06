# Frontend Design & Readability Improvement Plan (Dark/Light Across All Pages)

## Objective
Ensure every available page is readable and visually coherent in both light and dark modes, with a consistent design system and verified behavior via Playwright.

## Current Constraints
- We detected a running dev server at: `http://localhost:3001`.
- `frontend-design` skill requires explicit design context from product owner before major visual redesign:
  - Target audience
  - Primary use cases/jobs-to-be-done
  - Brand personality/tone

## Scope (pages to cover)
Static routes identified in `app/**/page.tsx`:
- `/`
- `/about`
- `/blog`
- `/campaigns`
- `/campaigns/create`
- `/careers`
- `/contact`
- `/create`
- `/dashboard`
- `/donation`
- `/donor-list`
- `/events`
- `/faq`
- `/how-it-works`
- `/image-gallery`
- `/privacy-policy`
- `/support-ticket`
- `/team`
- `/terms-conditions`
- `/testimonials`

Dynamic routes (validated separately with discovered links/data):
- `/blog/[slug]`
- `/campaign/[slug]`
- `/campaigns/[id]`

## Design/System Plan

### Phase 1 — Theme Foundation Hardening
1. Standardize all semantic tokens in `styles/globals.css` (`--background`, `--foreground`, `--muted`, `--border`, etc.) for light + dark.
2. Remove or reduce global “rescue” overrides over time; replace with explicit component-level `dark:` classes and token usage.
3. Ensure `ThemeProvider` behavior is deterministic (system + explicit toggle + persisted preference).

### Phase 2 — Component-Level Accessibility Pass
1. Audit all shared UI/layout components:
   - Header, mobile nav, footer, cards, buttons, forms, wallet dropdown, page shell.
2. Replace hardcoded color literals where possible with token-backed utility classes.
3. Enforce visible states in both themes:
   - Default, hover, focus-visible, disabled, active.
4. Ensure ring-offset colors are theme-correct and never blend into background.

### Phase 3 — Page-Level Content Readability Pass
1. For each page, validate:
   - Heading/body contrast
   - Link/button contrast
   - Card-on-surface contrast
   - Form fields + placeholders
   - Borders/dividers visibility
2. Fix page-specific copy blocks that still use legacy dark-only classes (`text-white/...`, `bg-white/...`) without light equivalents.

### Phase 4 — Responsive + Interaction Quality
1. Validate readability and layout at:
   - Mobile (375x812)
   - Tablet (768x1024)
   - Desktop (1440x900)
2. Ensure no horizontal overflow and no clipped text in either theme.
3. Validate keyboard focus visibility on primary controls.

### Phase 5 — Playwright Verification Gate (Required)
1. Automated checks for each route in both themes:
   - Page renders without crash
   - Theme is actually applied
   - No horizontal overflow
   - Key text nodes meet contrast thresholds
2. Save screenshots per route/theme for visual review.
3. Produce a failure report and fix loop until pass.

## Acceptance Criteria
- All scoped static routes are readable in both dark and light mode.
- Dynamic routes are validated where real data/links exist.
- No unreadable text/background combinations in primary content blocks.
- Focus states are visible in both themes.
- Playwright report returns zero critical readability failures.

## Execution Loop
1. Run Playwright audit.
2. Triage failures by component/page.
3. Patch styles.
4. Re-run Playwright audit.
5. Repeat until clean.

## Deliverables
- Updated components/pages with dark+light parity.
- Route-by-route screenshots (light/dark).
- Playwright audit script (in `/tmp` during execution).
- Final summary of fixed issues + any remaining edge cases.
