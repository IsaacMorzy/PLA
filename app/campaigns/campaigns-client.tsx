"use client";

import { motion } from "framer-motion";
import * as animations from "@/lib/animations";

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
          <h1 className="text-4xl font-bold text-white">Campaigns</h1>
          <p className="text-white/60 mt-2">
            Support causes that matter across Africa
          </p>
        </motion.div>
        
        {initialCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {initialCampaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                initial="hidden"
                animate="visible"
                variants={animations.fadeInUp}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-xl hover:bg-white/20 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 w-full">
                  <img
                    src={campaign.metadata?.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaa77390?w=800&h=600&fit=crop"}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full">
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
                        of ${(campaign.metadata?.goal || 5).toLocaleString()} goal
                      </span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: Math.min(((campaign.metadata?.raised || 0) / (campaign.metadata?.goal || 1)) * 100, 100) + "%" }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                  
                  {/* Location & Donate */}
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                    <span className="text-white/60 text-sm">
                      📍 {campaign.metadata?.location || "Africa"}
                    </span>
                    <a
                      href={`/campaign/${campaign.slug}`}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Donate
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white">No campaigns found</h3>
            <p className="text-white/60 mt-2">
              Check back soon for new campaigns
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}