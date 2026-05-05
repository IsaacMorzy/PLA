"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#120f0c] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.14),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(196,109,70,0.12),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-8 text-center shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <div className="mx-auto flex w-fit items-center gap-3">
            <div className="h-11 w-11 animate-pulse rounded-2xl bg-gradient-to-br from-[#d4a853] to-[#c46d46]" />
            <div className="h-8 w-36 rounded-full bg-white/[0.06] animate-pulse" />
          </div>
          <div className="mt-8 flex flex-col items-center gap-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  );
}
