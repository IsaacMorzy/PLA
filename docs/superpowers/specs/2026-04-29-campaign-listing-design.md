---
date: 2026-04-29
topic: "Campaign Listing Page with Cosmic CMS"
status: draft
---

# Campaign Listing Page Design

## Problem Statement

Display live campaigns from Cosmic CMS on `/campaigns` page with filtering, sorting, and progress visualization.

## Constraints

- Server-side fetch with ISR revalidation (60s)
- No client-side API calls - pre-rendered
- Responsive grid: mobile (1 col), tablet (2 cols), desktop (3 cols)
- 6 categories for filtering

## Approach

Hybrid approach: Server fetches campaign data at build/request time with ISR cache. Client-side uses React state for instant filter/sort without reload.

## Architecture

### Data Flow
```
Cosmic CMS API
    ↓ GET /api/cosmic?action=list&limit=20
Server Component (app/campaigns/page.tsx)
    ↓ passes campaigns as prop
CampaignGrid (client component)
    ↓ filter/sort state
Rendered HTML
```

### Components Required

| Component | File | Type | Description |
|-----------|------|------|-------------|
| `CampaignCard` | `campaign-card.tsx` | Client | Single campaign with progress bar |
| `CampaignFilters` | `campaign-filters.tsx` | Client | Category dropdown + sort |
| `CampaignGrid` | `campaign-grid.tsx` | Client | Responsive grid wrapper |
| `useCampaigns` | `actions.ts` | Server | Fetch campaigns from Cosmic |

### API Route

- **Endpoint**: `GET /api/cosmic?action=list&limit=20`
- **Response**: `{ objects: Campaign[] }`
- **Caching**: ISR 60s

## Components Design

### CampaignCard

**Props:**
```typescript
interface CampaignCardProps {
  campaign: Campaign;
}
```

**UI Layout:**
```
┌─────────────────────────────┐
│  ┌───────────────────────┐   │
│  │                       │   │
│  │      Campaign Image   │   │
│  │      (16:9 ratio)    │   │
│  │                       │   │
│  └───────────────────────┘   │
│  Category Badge    Status     │
│  Title                    │
│  Description (2 lines)...  │
│  ┌─────────────────────┐    │
│  │ ████████░░░░ 75%   │    │
│  │ 7.5 / 10 SOL       │    │
│  └─────────────────────┘    │
│  📍 Location                 │
└─────────────────────────────┘
```

**Styling:**
- Card: rounded-lg, shadow-sm, overflow-hidden
- Image: object-cover, 16:9
- Progress bar: gradient from green-500 to emerald-400
- Typography: title (h3), description (muted), percentage (bold)

### CampaignFilters

**UI:**
```
┌──────────────────┐  ┌──────────────────┐
│ Category: [All ▼]│  │ Sort: [Most Fund.]│
└──────────────────┘  └──────────────────┘
```

**Categories:**
- All, Healthcare, Education, Emergency, Environment, Community, Technology

**Sort Options:**
- Most Funded (default) — highest raised first
- Newest — most recent first
- Near Goal — closest to goal first

### CampaignGrid

**Responsive Breakpoints:**
| Breakpoint | Columns | Min-width |
|------------|---------|----------|
| Mobile | 1 | 0 |
| Tablet | 2 | 640px |
| Desktop | 3 | 1024px |

**Gap:** 16px (1rem)

## Data Interface

```typescript
interface Campaign {
  id: string;
  title: string;
  slug: string;
  metadata: {
    description: string;
    image: string;
    goal: number;      // in SOL
    raised: number;  // in SOL
    category: string;
    location: string;
    status: "active" | "completed";
  };
}
```

## Campaign Page Flow

```
1. /campaigns loads
2. Server fetches: GET /api/cosmic?action=list&limit=20
3. Pass campaigns to <CampaignGrid />
4. <CampaignGrid /> renders <CampaignCard />s
5. User clicks filter → React state updates → instant filter
6. User clicks sort → React state updates → instant sort
7. Page navigates to /campaign/[slug] on click
```

## Error Handling

- **Cosmic API fails**: Show cached data if available, else skeleton
- **Empty campaigns**: Show "No campaigns yet" empty state
- **Image fails**: Fallback image placeholder

## Testing Strategy

1. Server fetch returns campaigns
2. Filters work correctly
3. Sort orders are correct
4. Progress calculates correctly
5. Responsive at all breakpoints

## Open Questions

- None - all details resolved

---

**Validated:** 2026-04-29