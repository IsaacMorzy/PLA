"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Users, TrendingUp } from "lucide-react";
import { TokenBalance } from "@/components/ui/token-balance";
import { cn } from "@/lib/utils";

const fallbackImage =
  "https://images.unsplash.com/photo-1488521787991-ed7bbaa77390?w=800&h=600&fit=crop";

export interface Campaign {
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
}

export function CampaignCard({ campaign, index = 0 }: CampaignCardProps) {
  const [imageError, setImageError] = useState(false);

  const goalLamports = campaign.metadata?.goal || 1;
  const raisedLamports = campaign.metadata?.raised || 0;
  const percentage = Math.min(Math.round((raisedLamports / goalLamports) * 100), 100);

  const category = campaign.metadata?.category || "community";
  const location = campaign.metadata?.location || "Africa";
  const status = campaign.metadata?.status || "active";
  const donorCount = campaign.metadata?.donors || 0;

  const imageSrc = imageError
    ? fallbackImage
    : campaign.metadata?.image || fallbackImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link href={`/campaign/${campaign.slug}`}>
        <article
          className={cn(
            "group relative overflow-hidden",
            "bg-white/[0.05] backdrop-blur-xl",
            "border border-white/[0.1] rounded-2xl",
            "shadow-xl shadow-black/5",
            "transition-all duration-300",
            "hover:border-brand-gold/30 hover:shadow-[0_0_40px_-10px_rgba(212,168,83,0.15)] hover:-translate-y-1"
          )}
        >
          <div className="relative aspect-video w-full overflow-hidden bg-white/[0.02]">
            <Image
              src={imageSrc}
              alt={campaign.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-md text-white border border-white/20 capitalize">
                {category}
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span
                className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md",
                  status === "active"
                    ? "bg-green-500/80 text-white border border-green-400/30"
                    : "bg-white/20 text-white border border-white/20"
                )}
              >
                {status === "active" ? "Active" : "Completed"}
              </span>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-lg text-white line-clamp-1 group-hover:text-brand-gold transition-colors duration-200">
              {campaign.title}
            </h3>

            <p className="text-sm text-white/60 line-clamp-2">
              {campaign.metadata?.beneficiary_story ||
                campaign.metadata?.description ||
                "Help support this campaign to make a difference."}
            </p>

            <div className="space-y-2 pt-2">
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/[0.1]">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-gold to-brand-gold-light"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  style={{ transformOrigin: "left", width: `${percentage}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-brand-gold" />
                  <span className="font-medium text-brand-gold">
                    <TokenBalance
                      amount={raisedLamports}
                      decimals={9}
                      symbol="SOL"
                      size="sm"
                    />
                  </span>
                </div>
                <span className="text-white/50">
                  {percentage}% of{" "}
                  <TokenBalance
                    amount={goalLamports}
                    decimals={9}
                    symbol="SOL"
                    size="sm"
                  />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
              <div className="flex items-center text-xs text-white/50">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {location}
              </div>

              {donorCount > 0 && (
                <div className="flex items-center text-xs text-white/50">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  {donorCount} donor{donorCount !== 1 ? "s" : ""}
                </div>
              )}
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}