# Analytics Events (Frontend + API)

## What is implemented

### Client tracking
- `lib/analytics.ts`
  - `trackEvent(event, payload)`
  - Pushes to `dataLayer` (if GTM/gtag exists)
  - Queues events in `localStorage`
  - Retries sending to `/api/analytics`
  - Uses `sendBeacon` on `visibilitychange/pagehide`

### Server persistence
- `POST /api/analytics`
  - Accepts single event or `{ events: [...] }`
  - Persists NDJSON to `var/analytics/events.ndjson`

### Summary endpoint
- `GET /api/analytics/summary?days=7`
  - Aggregates recent event counts and top pages

## Core event names in current UI
- `home_cta_click`
- `campaigns_cta_click`
- `campaigns_sort_changed`
- `campaigns_filter_changed`
- `campaign_card_click`
- `donate_click`
- `donation_validation_error`
- `quick_amount_selected`
- `campaign_share_click`
- `donation_success`

## Local verification
1. Open app and click tracked CTAs
2. Check browser console in dev for `[analytics] ...`
3. Confirm file growth:
   - `var/analytics/events.ndjson`
4. Check summary:
   - `GET /api/analytics/summary?days=7`

## Notes
- Event payload sanitization is applied server-side.
- Current persistence is file-based for reliability and simplicity.
- You can later swap persistence in `app/api/analytics/route.ts` to DB (Postgres/Neon) without changing frontend calls.
