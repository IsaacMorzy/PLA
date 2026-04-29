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