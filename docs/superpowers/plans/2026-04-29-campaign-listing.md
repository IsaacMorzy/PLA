# Campaign Listing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Display live campaigns from Cosmic CMS on `/campaigns` with filtering, sorting, and progress visualization.

**Architecture:** Server-side fetch with ISR 60s cache + client-side React state for instant filter/sort. CampaignCard displays progress bar + percentage, CampaignFilters provides category dropdown + sort.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Cosmic CMS REST API

---

## File Structure

| File | Action | Responsibility |
|------|--------|----------------|
| `app/campaigns/page.tsx` | Modify | Server component, fetches data |
| `app/campaigns/loading.tsx` | Create | Suspense skeleton |
| `app/campaigns/_components/campaign-card.tsx` | Create | Single campaign with progress |
| `app/campaigns/_components/campaign-filters.tsx` | Create | Category + sort dropdowns |
| `app/campaigns/_components/campaign-grid.tsx` | Create | Responsive grid wrapper |
| `lib/actions.ts` | Modify | Use server action for Cosmic fetch |

---

### Task 1: Update lib/actions.ts with getCampaigns Server Action

**Files:**
- Modify: `lib/actions.ts`
- Add: `getCampaigns()` function

- [ ] **Step 1: Add getCampaigns server action to lib/actions.ts**

```typescript
"use server";

import { cosmic, campaignsObjectType } from "./cosmic";

export async function getCampaigns(limit = 20) {
  try {
    const response = await cosmic.objects.find({ type: campaignsObjectType, limit });
    return { success: true, campaigns: response.objects };
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return { success: false, campaigns: [], error: String(error) };
  }
}
```

- [ ] **Step 2: Run test to verify exports work**

```bash
pnpm build
```

Expected: Build passes

- [ ] **Step 3: Commit**

```bash
git add lib/actions.ts
git commit -m "feat: add getCampaigns server action"
```

---

### Task 2: Create CampaignCard Component

**Files:**
- Create: `app/campaigns/_components/campaign-card.tsx`

- [ ] **Step 1: Write CampaignCard component**

```tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Campaign {
  id: string;
  title: string;
  slug: string;
  metadata: {
    description?: string;
    image?: string;
    goal: number;
    raised: number;
    category?: string;
    location?: string;
    status?: string;
  };
}

interface CampaignCardProps {
  campaign: Campaign;
}

const fallbackImage = "/images/campaign-placeholder.jpg";

export function CampaignCard({ campaign }: CampaignCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const goal = campaign.metadata?.goal || 1;
  const raised = campaign.metadata?.raised || 0;
  const percentage = Math.min(Math.round((raised / goal) * 100), 100);
  
  const category = campaign.metadata?.category || "community";
  const location = campaign.metadata?.location || "Africa";
  const status = campaign.metadata?.status || "active";

  const imageSrc = imageError ? fallbackImage : (campaign.metadata?.image || fallbackImage);

  return (
    <Link 
      href={`/campaign/${campaign.slug}`}
      className="group block bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
    >
      {/* Image */}
      <div className="relative aspect-video w-full bg-muted">
        <Image
          src={imageSrc}
          alt={campaign.title}
          fill
          className="object-cover"
          onError={() => setImageError(true)}
        />
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Badges */}
        <div className="flex items-center justify-between text-xs">
          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
            {category}
          </span>
          <span className={`px-2 py-1 rounded-full ${
            status === "active" 
              ? "bg-green-500/10 text-green-600" 
              : "bg-muted text-muted-foreground"
          }`}>
            {status === "active" ? "Active" : "Completed"}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
          {campaign.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {campaign.metadata?.description || "No description available"}
        </p>
        
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="font-medium">{percentage}%</span>
            <span className="text-muted-foreground">
              {raised} / {goal} SOL
            </span>
          </div>
        </div>
        
        {/* Location */}
        <div className="flex items-center text-xs text-muted-foreground">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {location}
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```

Expected: Build passes

- [ ] **Step 3: Commit**

```bash
git add app/campaigns/_components/campaign-card.tsx
git commit -m "feat: add CampaignCard component with progress bar"
```

---

### Task 3: Create CampaignFilters Component

**Files:**
- Create: `app/campaigns/_components/campaign-filters.tsx`

- [ ] **Step 1: Write CampaignFilters component**

```tsx
"use client";

import { useState, useCallback } from "react";

export type SortOption = "funded" | "newest" | "near-goal";

interface CampaignFiltersProps {
  onFilterChange: (category: string) => void;
  onSortChange: (sort: SortOption) => void;
  selectedCategory: string;
  selectedSort: SortOption;
}

const categories = [
  { value: "all", label: "All Categories" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "emergency", label: "Emergency" },
  { value: "environment", label: "Environment" },
  { value: "community", label: "Community" },
  { value: "technology", label: "Technology" },
];

const sortOptions = [
  { value: "funded", label: "Most Funded" },
  { value: "newest", label: "Newest" },
  { value: "near-goal", label: "Near Goal" },
];

export function CampaignFilters({
  onFilterChange,
  onSortChange,
  selectedCategory,
  selectedSort,
}: CampaignFiltersProps) {
  const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  }, [onFilterChange]);

  const handleSortChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortOption);
  }, [onSortChange]);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Category Filter */}
      <div className="flex-1">
        <label htmlFor="category-filter" className="sr-only">Filter by category</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>
      
      {/* Sort Dropdown */}
      <div className="flex-1">
        <label htmlFor="sort-filter" className="sr-only">Sort campaigns</label>
        <select
          id="sort-filter"
          value={selectedSort}
          onChange={handleSortChange}
          className="w-full sm:w-auto px-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```

Expected: Build passes

- [ ] **Step 3: Commit**

```bash
git add app/campaigns/_components/campaign-filters.tsx
git commit -m "feat: add CampaignFilters with category and sort"
```

---

### Task 4: Create CampaignGrid Component

**Files:**
- Create: `app/campaigns/_components/campaign-grid.tsx`

- [ ] **Step 1: Write CampaignGrid component**

```tsx
"use client";

import { useState, useMemo, useCallback } from "react";
import { CampaignCard } from "./campaign-card";
import { CampaignFilters, type SortOption } from "./campaign-filters";

interface Campaign {
  id: string;
  title: string;
  slug: string;
  metadata: {
    description?: string;
    image?: string;
    goal: number;
    raised: number;
    category?: string;
    location?: string;
    status?: string;
    created_at?: string;
  };
}

interface CampaignGridProps {
  campaigns: Campaign[];
}

export function CampaignGrid({ campaigns: initialCampaigns }: CampaignGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState<SortOption>("funded");

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleSortChange = useCallback((sort: SortOption) => {
    setSelectedSort(sort);
  }, []);

  const filteredCampaigns = useMemo(() => {
    // Filter by category
    let filtered = selectedCategory === "all"
      ? initialCampaigns
      : initialCampaigns.filter(
          (c) => c.metadata?.category === selectedCategory
        );

    // Sort
    return [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case "funded":
          return (b.metadata?.raised || 0) - (a.metadata?.raised || 0);
        case "newest":
          const dateA = new Date(a.metadata?.created_at || 0).getTime();
          const dateB = new Date(b.metadata?.created_at || 0).getTime();
          return dateB - dateA;
        case "near-goal":
          const ratioA = (a.metadata?.raised || 0) / (a.metadata?.goal || 1);
          const ratioB = (b.metadata?.raised || 0) / (b.metadata?.goal || 1);
          return ratioA - ratioB;
        default:
          return 0;
      }
    });
  }, [initialCampaigns, selectedCategory, selectedSort]);

  if (filteredCampaigns.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No campaigns found</p>
        <p className="text-sm text-muted-foreground mt-1">
          Try adjusting your filters
        </p>
      </div>
    );
  }

  return (
    <>
      <CampaignFilters
        onFilterChange={handleCategoryChange}
        onSortChange={handleSortChange}
        selectedCategory={selectedCategory}
        selectedSort={selectedSort}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
pnpm build
```

Expected: Build passes

- [ ] **Step 3: Commit**

```bash
git add app/campaigns/_components/campaign-grid.tsx
git commit -m "feat: add CampaignGrid with filter/sort logic"
```

---

### Task 5: Update campaigns Page

**Files:**
- Modify: `app/campaigns/page.tsx`
- Create: `app/campaigns/loading.tsx`

- [ ] **Step 1: Update app/campaigns/page.tsx**

```tsx
import { draftMode } from "next/headers";
import { getCampaigns } from "@/lib/actions";
import { CampaignGrid } from "./_components/campaign-grid";

// ISR: revalidate every 60 seconds
export const revalidate = 60;

export default async function CampaignsPage() {
  const { isEnabled } = draftMode();
  
  // Fetch campaigns (server-side)
  const result = await getCampaigns(20);
  
  const campaigns = result.success ? result.campaigns : [];

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Campaigns</h1>
        <p className="text-muted-foreground mt-2">
          Support causes across Africa
        </p>
      </div>
      
      {campaigns.length > 0 ? (
        <CampaignGrid campaigns={campaigns as any[]} />
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No campaigns yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Check back soon for new campaigns
          </p>
        </div>
      )}
    </main>
  );
}
```

- [ ] **Step 2: Create loading.tsx**

```tsx
export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-9 w-32 bg-muted rounded animate-pulse" />
        <div className="h-5 w-48 bg-muted rounded animate-pulse mt-2" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-card rounded-lg overflow-hidden">
            <div className="aspect-video bg-muted animate-pulse" />
            <div className="p-4 space-y-3">
              <div className="flex justify-between">
                <div className="h-5 w-16 bg-muted rounded animate-pulse" />
                <div className="h-5 w-14 bg-muted rounded animate-pulse" />
              </div>
              <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-2 w-full bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
pnpm build
```

Expected: Build passes with all routes

- [ ] **Step 4: Commit**

```bash
git add app/campaigns/page.tsx app/campaigns/loading.tsx
git commit -m "feat: add campaigns page with server-side Cosmic fetch"
```

---

## Execution Choice

**Plan complete and saved to `docs/superpowers/plans/2026-04-29-campaign-listing.md`. Two execution options:**

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**