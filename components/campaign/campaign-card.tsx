"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Heart, MapPin, Users } from "lucide-react";
import * as animations from "@/lib/animations";
import { cn } from "@/lib/utils";
import { lamportsToSol } from "@/lib/solana-rpc";

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
    beneficiary_name?: string;
    beneficiary_story?: string;
  };
}

interface CampaignCardProps {
  campaign: Campaign;
  index?: number;
  featured?: boolean;
}

function normalizeSol(amount: number) {
  return amount > 1_000_000 ? lamportsToSol(amount) : amount;
}

export function CampaignCard({ campaign, index = 0, featured = false }: CampaignCardProps) {
  const [imageError, setImageError] = useState(false);

  const goal = normalizeSol(campaign.metadata?.goal || 1);
  const raised = normalizeSol(campaign.metadata?.raised || 0);
  const percentage = Math.min(Math.round((raised / Math.max(goal, 0.0001)) * 100), 100);
  const category = campaign.metadata?.category || "community";
  const location = campaign.metadata?.location || "Across Africa";
  const status = campaign.metadata?.status || "active";
  const summary =
    campaign.metadata?.beneficiary_story ||
    campaign.metadata?.description ||
    "Support a verified community initiative with clear on-chain visibility and a sharper sense of impact.";
  const imageSrc = !imageError && campaign.metadata?.image ? campaign.metadata.image : null;

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={animations.fadeInUp}
      transition={{ delay: index * 0.06 }}
      className="h-full"
    >
      <Link href={`/campaign/${campaign.slug}`} className="group block h-full">
        <div
          className={cn(
            "relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_24px_80px_rgba(0,0,0,0.28)] transition-all duration-500 hover:-translate-y-1 hover:border-[#d4a853]/20",
            featured ? "min-h-[31rem]" : "min-h-[27rem]"
          )}
        >
          <div className={cn("relative overflow-hidden", featured ? "aspect-[16/9]" : "aspect-[16/10]") }>
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={campaign.title}
                fill
                unoptimized
                sizes={featured ? "(max-width: 1280px) 100vw, 66vw" : "(max-width: 1280px) 100vw, 33vw"}
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.26),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(196,109,70,0.18),transparent_28%),linear-gradient(160deg,#16110d,#0f0b08)]" />
            )}

            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02)_0%,rgba(10,8,6,0.15)_40%,rgba(10,8,6,0.92)_100%)]" />
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.18),transparent_28%)]" />

            <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3">
              <span className="rounded-full border border-white/12 bg-black/35 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/88 backdrop-blur-md">
                {category}
              </span>
              <span
                className={cn(
                  "rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] backdrop-blur-md",
                  status === "active"
                    ? "border border-[#d4a853]/25 bg-[#d4a853]/10 text-[#f1ddab]"
                    : "border border-white/12 bg-black/35 text-white/70"
                )}
              >
                {status}
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/55">
                <MapPin className="h-3.5 w-3.5 text-[#d4a853]" />
                {location}
              </div>
              <h3 className={cn("mt-3 font-display text-white transition-colors duration-300 group-hover:text-[#f4dfab]", featured ? "max-w-2xl text-4xl leading-tight" : "text-3xl leading-snug")}>
                {campaign.title}
              </h3>
            </div>
          </div>

          <div className="flex flex-1 flex-col p-6">
            <p className="line-clamp-3 text-sm leading-7 text-white/62">{summary}</p>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <MetaStat label="Raised" value={`${raised.toFixed(1)} SOL`} highlight />
              <MetaStat label="Goal" value={`${goal.toFixed(1)} SOL`} />
              <MetaStat label="Donors" value={`${campaign.metadata?.donors || 0}`} />
            </div>

            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-white/52">Funding progress</span>
                <span className="font-medium text-[#f4dfab]">{percentage}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-white/8">
                <div
                  className="h-2.5 rounded-full bg-[linear-gradient(90deg,#d4a853,#e2c278,#c46d46)] transition-all duration-700"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-5">
              <div className="inline-flex items-center gap-2 text-sm text-white/52">
                <Users className="h-4 w-4 text-[#d4a853]" />
                Backed by {campaign.metadata?.donors || 0} supporters
              </div>
              <div className="inline-flex items-center gap-2 text-sm font-medium text-white transition-colors duration-300 group-hover:text-[#f4dfab]">
                View story
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute right-5 top-[calc(50%-1rem)] hidden h-14 w-14 items-center justify-center rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 text-[#d4a853] shadow-[0_0_30px_rgba(212,168,83,0.12)] xl:flex">
            <Heart className="h-5 w-5" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function MetaStat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-[1.15rem] border border-white/8 bg-black/20 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.2em] text-white/35">{label}</p>
      <p className={cn("mt-2 text-sm font-medium", highlight ? "text-[#f1ddab]" : "text-white")}>{value}</p>
    </div>
  );
}
