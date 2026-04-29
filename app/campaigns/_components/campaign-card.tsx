"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MapPin } from "lucide-react";
import * as animations from "@/lib/animations";

// Glass Card Component
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl ${className}`}>
      {children}
    </div>
  );
}

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
}

const fallbackImage = "https://images.unsplash.com/photo-1488521787991-ed7bbaa77390?w=800&h=600&fit=crop";

export function CampaignCard({ campaign, index = 0 }: CampaignCardProps) {
  const [imageError, setImageError] = useState(false);
  
  const goal = campaign.metadata?.goal || 1;
  const raised = campaign.metadata?.raised || 0;
  const percentage = Math.min(Math.round((raised / goal) * 100), 100);
  
  const category = campaign.metadata?.category || "community";
  const location = campaign.metadata?.location || "Africa";
  const status = campaign.metadata?.status || "active";

  const imageSrc = imageError ? fallbackImage : (campaign.metadata?.image || fallbackImage);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={animations.fadeInUp}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/campaign/${campaign.slug}`}>
        <GlassCard className="overflow-hidden hover:bg-white/20 transition-all group">
          {/* Image */}
          <div className="relative aspect-video w-full bg-white/5">
            <Image
              src={imageSrc}
              alt={campaign.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
            <div className="absolute top-3 left-3">
              <span className="badge bg-white/20 border-white/30 text-white text-xs capitalize">
                {category}
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className={`badge ${status === "active" ? "bg-[#d4a853]/80" : "bg-white/20"} text-white text-xs`}>
                {status === "active" ? "Active" : "Completed"}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-4 space-y-3">
            <h3 className="font-semibold text-lg text-white line-clamp-1 group-hover:text-[#d4a853] transition-colors">
              {campaign.title}
            </h3>
            
            <p className="text-sm text-white/60 line-clamp-2">
              {campaign.metadata?.beneficiary_story || campaign.metadata?.description || "No description available"}
            </p>
            
            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#d4a853] to-[#d4a853] rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-medium text-[#d4a853]">{raised.toFixed(1)} SOL</span>
                <span className="text-white/60">{percentage}% of {goal} SOL</span>
              </div>
            </div>
            
            {/* Location */}
            <div className="flex items-center text-xs text-white/50">
              <MapPin className="h-3 w-3 mr-1" />
              {location}
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}