"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import { ArrowRight, Filter, Inbox, MapPin, Plus, Sparkles, Wallet } from "lucide-react";
import * as animations from "@/lib/animations";
import { cn } from "@/lib/utils";
import { lamportsToSol } from "@/lib/solana-rpc";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { WalletButton } from "@/components/wallet/wallet-button";
import { CampaignGridSkeleton, Skeleton } from "@/components/ui/skeleton";
import { StatsGrid } from "@/components/ui/tailgrids";

interface Campaign {
  id: string;
  title: string;
  slug: string;
  metadata: {
    description?: string;
    image?: string;
    goal: number;
    raised: number;
    donors?: number;
    category?: string;
    location?: string;
    status?: string;
  };
}

interface CampaignsClientProps {
  initialCampaigns: Campaign[];
}

type SortOption = "featured" | "newest" | "near-goal";

function normalizeSol(amount: number) {
  return amount > 1_000_000 ? lamportsToSol(amount) : amount;
}

export function CampaignsClient({ initialCampaigns }: CampaignsClientProps) {
  const { connected, publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(initialCampaigns.map((campaign) => campaign.metadata?.category).filter(Boolean))
    ) as string[];
    return ["all", ...unique.slice(0, 7)];
  }, [initialCampaigns]);

  const totals = useMemo(() => {
    const totalRaised = initialCampaigns.reduce((sum, campaign) => sum + normalizeSol(campaign.metadata?.raised || 0), 0);
    const totalDonors = initialCampaigns.reduce((sum, campaign) => sum + (campaign.metadata?.donors || 0), 0);

    return {
      totalRaised,
      totalDonors,
      totalCampaigns: initialCampaigns.length,
      activeCountries: new Set(initialCampaigns.map((campaign) => campaign.metadata?.location).filter(Boolean)).size,
    };
  }, [initialCampaigns]);

  const campaigns = useMemo(() => {
    const filtered =
      activeCategory === "all"
        ? initialCampaigns
        : initialCampaigns.filter((campaign) => campaign.metadata?.category === activeCategory);

    const ranked = [...filtered].sort((a, b) => {
      const ratioA = (a.metadata?.raised || 0) / Math.max(a.metadata?.goal || 1, 1);
      const ratioB = (b.metadata?.raised || 0) / Math.max(b.metadata?.goal || 1, 1);

      switch (sortBy) {
        case "near-goal":
          return ratioB - ratioA;
        case "newest":
          return (b.metadata?.donors || 0) - (a.metadata?.donors || 0);
        case "featured":
        default:
          return (b.metadata?.raised || 0) - (a.metadata?.raised || 0);
      }
    });

    return ranked;
  }, [activeCategory, initialCampaigns, sortBy]);

  if (!mounted) {
    return (
      <main className="min-h-screen px-4 pb-16 pt-28 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-4 text-center">
            <Skeleton className="mx-auto h-10 w-52 rounded-full" />
            <Skeleton className="mx-auto h-6 w-80 rounded-full" />
          </div>
          <CampaignGridSkeleton count={6} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#120f0c] px-4 pb-20 pt-28 text-white lg:px-8">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.18),transparent_30%),radial-gradient(circle_at_80%_15%,rgba(196,109,70,0.16),transparent_24%)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={animations.staggerContainer}
          className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end"
        >
          <div>
            <motion.div
              variants={animations.fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-white/64"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#d4a853]" />
              Live campaign directory
            </motion.div>

            <motion.h1
              variants={animations.fadeInUp}
              className="mt-6 max-w-4xl font-display text-[3.2rem] leading-[0.94] text-white sm:text-[4.6rem]"
            >
              Discover campaigns with stronger stories,
              <span className="block text-[#f1ddab]">clearer proof, and richer presence.</span>
            </motion.h1>

            <motion.p
              variants={animations.fadeInUp}
              className="mt-6 max-w-2xl text-base leading-8 text-white/66 sm:text-lg"
            >
              We redesigned the listing experience to feel more editorial and trustworthy — helping urgent causes stand out while making donor decisions easier.
            </motion.p>

            <motion.div variants={animations.fadeInUp} className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/campaigns/create"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d4a853] px-6 py-3.5 text-sm font-semibold text-[#17120d] shadow-[0_12px_40px_rgba(212,168,83,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e5bc68]"
              >
                <Plus className="h-4 w-4" />
                Create a campaign
              </Link>
              <a
                href="#campaign-grid"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:border-[#d4a853]/30 hover:bg-white/[0.07]"
              >
                Browse active stories
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <motion.div variants={animations.fadeInUp} className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 backdrop-blur-2xl sm:p-8">
            <div className="flex items-center justify-between gap-4 border-b border-white/8 pb-5">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/42">Wallet status</p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {connected && publicKey ? "Ready to donate or launch" : "Connect to participate"}
                </p>
              </div>
              <div className={cn(
                "rounded-full px-3 py-1 text-xs font-medium",
                connected
                  ? "border border-[#d4a853]/25 bg-[#d4a853]/10 text-[#f1ddab]"
                  : "border border-white/12 bg-white/[0.05] text-white/62"
              )}>
                {connected ? "● Connected" : "● Ready to connect"}
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">Access</p>
                <p className="mt-3 text-sm leading-7 text-white/72">
                  {connected && publicKey
                    ? `${publicKey.toString().slice(0, 6)}...${publicKey.toString().slice(-4)} connected and ready.`
                    : "Connect your wallet to support campaigns or start one of your own."}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-white/38">Coverage</p>
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/72">
                  <MapPin className="h-4 w-4 text-[#d4a853]" />
                  {Math.max(totals.activeCountries, 1)} regions represented in the current listing.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <WalletButton />
              {!connected ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/50">
                  <Wallet className="h-3.5 w-3.5 text-[#d4a853]" />
                  Donations unlock after connection
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={animations.fadeInUp}
          className="mt-8 rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8"
        >
          <StatsGrid
            stats={[
              { value: `${totals.totalCampaigns}`, label: "live campaigns" },
              { value: `${totals.totalRaised.toFixed(1)} SOL`, label: "visible funding" },
              { value: `${totals.totalDonors}+`, label: "donor actions" },
              { value: `${Math.max(totals.activeCountries, 1)}`, label: "active locations" },
            ]}
            className="[&>div]:rounded-[1.5rem] [&>div]:border-white/10 [&>div]:bg-[#0e0b08]/75 [&>div]:p-5 [&_.text-2xl]:font-display [&_.text-2xl]:text-4xl [&_.text-2xl]:text-[#f1ddab] [&_.text-white\/60]:text-[11px] [&_.text-white\/60]:uppercase [&_.text-white\/60]:tracking-[0.22em]"
          />
        </motion.section>

        <section id="campaign-grid" className="mt-10">
          <div className="flex flex-col gap-5 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#d4a853]">Refine the view</p>
                <h2 className="mt-3 font-display text-4xl text-white">Filter by cause, sort by momentum.</h2>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/55">
                  <Filter className="h-3.5 w-3.5 text-[#d4a853]" />
                  Sort
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as SortOption)}
                    className="bg-transparent text-sm font-medium normal-case tracking-normal text-white outline-none"
                  >
                    <option value="featured" className="bg-[#120f0c]">Most funded</option>
                    <option value="near-goal" className="bg-[#120f0c]">Near goal</option>
                    <option value="newest" className="bg-[#120f0c]">Most supported</option>
                  </select>
                </label>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const active = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "rounded-full border px-4 py-2 text-sm font-medium capitalize transition-all duration-300",
                      active
                        ? "border-[#d4a853]/30 bg-[#d4a853]/12 text-[#f1ddab]"
                        : "border-white/10 bg-white/[0.04] text-white/62 hover:bg-white/[0.08] hover:text-white"
                    )}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {campaigns.length > 0 ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={animations.staggerContainer}
                className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
              >
                {campaigns.map((campaign, index) => (
                  <div
                    key={campaign.id}
                    className={cn(index === 0 && "xl:col-span-2")}
                  >
                    <CampaignCard campaign={campaign} index={index} featured={index === 0} />
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={animations.fadeInUp}
                className="flex flex-col items-center justify-center rounded-[1.8rem] border border-dashed border-white/12 bg-black/15 px-6 py-16 text-center"
              >
                <div className="mb-4 rounded-full border border-white/10 bg-white/[0.05] p-4">
                  <Inbox className="h-8 w-8 text-white/28" />
                </div>
                <h3 className="text-2xl font-semibold text-white">No campaigns match this view</h3>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/56">
                  Try another category or change the sort to surface a different slice of the current campaigns.
                </p>
              </motion.div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
