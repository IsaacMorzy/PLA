"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as animations from "@/lib/animations";
import { Tabs } from "@/components/ui/tailgrids";

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
  };
}

interface CampaignsClientProps {
  initialCampaigns: Campaign[];
}

export function CampaignsClient({ initialCampaigns }: CampaignsClientProps) {
  const [filter, setFilter] = useState("all");

  // Filter campaigns by category
  const filteredCampaigns = filter === "all" 
    ? initialCampaigns 
    : initialCampaigns.filter(c => c.metadata?.category === filter);

  // Tab options for filtering
  const tabs = [
    { 
      id: "all", 
      label: "All", 
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )
    },
    { 
      id: "healthcare", 
      label: "Healthcare", 
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )
    },
    { 
      id: "education", 
      label: "Education", 
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )
    },
    { 
      id: "community", 
      label: "Community", 
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      )
    },
  ];

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.fadeInUp}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white font-display">Campaigns</h1>
          <p className="text-white/60 mt-2">
            Support causes that matter across Africa
          </p>
        </motion.div>

        {/* Tailgrids Tabs for filtering */}
        <Tabs tabs={tabs} defaultTab="all" className="mb-8" />
      </div>
    </main>
  );
}

// Campaign Card Component
function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animations.fadeInUp}
      className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden shadow-lg hover:border-[#d4a853]/30 hover:shadow-[0_0_30px_-5px_rgba(212,168,83,0.15)] hover:scale-[1.02] transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 w-full">
        <img
          src={campaign.metadata?.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaa77390?w=800&h=600&fit=crop"}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className="px-3 py-1 bg-[#1a1815]/80 backdrop-blur-sm text-white text-xs rounded-full">
            {campaign.metadata?.category || "community"}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-2">
          {campaign.title}
        </h3>
        <p className="text-white/60 text-sm mb-4 line-clamp-2">
          {campaign.metadata?.description || "Help support this campaign"}
        </p>
        
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/80">
              ${(campaign.metadata?.raised || 0).toLocaleString()} raised
            </span>
            <span className="text-white/60">
              ${(campaign.metadata?.goal || 0).toLocaleString()} goal
            </span>
          </div>
<div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#d4a853] to-[#c46d46] rounded-full"
              style={{ 
                width: Math.min(100, ((campaign.metadata?.raised || 0) / (campaign.metadata?.goal || 1)) * 100) + "%"
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}