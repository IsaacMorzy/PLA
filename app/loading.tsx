"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#1a1815] flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo placeholder */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#d4a853] to-[#c46d46] animate-pulse" />
          <div className="h-8 w-32 rounded-lg bg-white/[0.06] animate-pulse" />
        </div>
        
        {/* Content skeleton */}
        <div className="flex flex-col items-center gap-3 w-64">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
    </div>
  );
}