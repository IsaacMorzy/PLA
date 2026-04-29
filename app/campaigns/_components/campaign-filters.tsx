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