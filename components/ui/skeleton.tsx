"use client";

import { cn } from "@/lib/utils";

/**
 * Skeleton Component
 * 
 * Replaces spinners with content-based loading states per ui-ux-pro-max guidelines.
 * Uses animated pulse that respects prefers-reduced-motion.
 */
export function Skeleton({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "text" | "circular" | "card" | "chart";
}) {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-white/[0.06] via-white/[0.1] to-white/[0.06] bg-[length:200%_100%]",
        // Variants
        variant === "text" && "h-4 w-full rounded",
        variant === "circular" && "rounded-full",
        variant === "card" && "h-48 w-full rounded-[1rem]",
        variant === "chart" && "h-32 w-full rounded-lg",
        // Default box
        variant === "default" && "h-4 w-full rounded",
        className
      )}
    />
  );
}

/**
 * Campaign Card Skeleton
 * 
 * Displays while campaign data loads.
 */
export function CampaignCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 backdrop-blur-sm">
      {/* Image placeholder */}
      <Skeleton variant="card" className="mb-4 h-40" />
      
      {/* Title */}
      <Skeleton variant="text" className="mb-2 h-6 w-3/4" />
      
      {/* Description lines */}
      <Skeleton variant="text" className="mb-1 w-full" />
      <Skeleton variant="text" className="mb-4 w-2/3" />
      
      {/* Progress bar skeleton */}
      <div className="mb-3 space-y-2">
        <div className="flex justify-between text-xs text-white/50">
          <Skeleton className="w-16" />
          <Skeleton className="w-20" />
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <Skeleton className="h-full w-1/2 rounded-full" />
        </div>
      </div>
      
      {/* Meta info */}
      <div className="flex items-center justify-between">
        <Skeleton variant="circular" className="h-8 w-8" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  );
}

/**
 * Campaign Grid Skeleton
 * 
 * Displays multiple campaign cards in loading state.
 */
export function CampaignGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CampaignCardSkeleton key={i} />
      ))}
    </div>
  );
}

/**
 * Stats Card Skeleton
 * 
 * For dashboard stats loading.
 */
export function StatsCardSkeleton() {
  return (
    <div className="rounded-[1rem] border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Skeleton variant="circular" className="h-12 w-12" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton variant="text" className="h-8 w-32" />
        </div>
      </div>
    </div>
  );
}

/**
 * Team Member Skeleton
 * 
 * For team/leadership page loading.
 */
export function TeamMemberSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-[1rem] border border-white/[0.08] bg-white/[0.02] p-4 backdrop-blur-sm">
      <Skeleton variant="circular" className="h-16 w-16 shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

/**
 * Table Row Skeleton
 * 
 * For donor list or transaction tables.
 */
export function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-white/[0.06] py-4">
      <Skeleton variant="circular" className="h-10 w-10" />
      <div className="flex-1 space-y-1">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-4 w-20" />
    </div>
  );
}

/**
 * Hero Section Skeleton
 * 
 * For landing page hero loading.
 */
export function HeroSkeleton() {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <Skeleton className="mx-auto mb-4 h-12 w-3/4 max-w-md" />
      <Skeleton className="mx-auto mb-6 h-6 w-full max-w-lg" />
      <Skeleton className="mx-auto mb-8 h-6 w-2/3 max-w-md" />
      <div className="flex justify-center gap-4">
        <Skeleton className="h-12 w-36 rounded-full" />
        <Skeleton className="h-12 w-36 rounded-full" />
      </div>
    </div>
  );
}

/**
 * Feature Card Skeleton
 * 
 * For features/benefits section loading.
 */
export function FeatureCardSkeleton() {
  return (
    <div className="rounded-[1rem] border border-white/[0.08] bg-white/[0.02] p-6 backdrop-blur-sm">
      <Skeleton variant="circular" className="mb-4 h-12 w-12" />
      <Skeleton className="mb-2 h-5 w-32" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}
