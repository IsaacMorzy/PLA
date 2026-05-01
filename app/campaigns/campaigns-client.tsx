"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { motion } from "framer-motion";
import * as animations from "@/lib/animations";
import Link from "next/link";
import { Plus, Wallet, Inbox } from "lucide-react";
import { CampaignCard } from "@/components/campaign/campaign-card";
import { CampaignGridSkeleton, Skeleton } from "@/components/ui/skeleton";

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
  const { connected, publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header skeleton */}
          <div className="text-center space-y-4">
            <Skeleton className="h-10 w-40 rounded-lg mx-auto" />
            <Skeleton className="h-6 w-64 rounded mx-auto" />
          </div>
          
          {/* Grid skeleton */}
          <CampaignGridSkeleton count={6} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.fadeInUp}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white font-display">Campaigns</h1>
          <p className="text-white/60 mt-2">
            Support causes that matter across Africa
          </p>
        </motion.div>

        {/* Wallet Connection Bar */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-xl"
        >
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${connected ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <span className="text-white/80">
              {connected && publicKey 
                ? `Connected: ${publicKey.toString().slice(0, 8)}...${publicKey.toString().slice(-4)}`
                : 'Wallet not connected'}
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {connected && (
              <Link
                href="/campaigns/create"
                className="flex items-center gap-2 px-4 py-2 bg-brand-gold hover:bg-brand-gold-light text-black font-semibold rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create Campaign
              </Link>
            )}
            <WalletMultiButton className="!bg-brand-gold !text-black hover:!bg-brand-gold-light !border-none" />
          </div>
        </motion.div>

        {/* Not Connected Notice */}
        {!connected && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
            className="mb-8 p-6 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center"
          >
            <Wallet className="w-8 h-8 mx-auto mb-2 text-amber-500" />
            <h3 className="text-lg font-semibold text-white mb-2">Connect Wallet to Get Started</h3>
            <p className="text-white/60">
              Connect your wallet to create campaigns and make donations on the PeaceLeague Africa platform.
            </p>
          </motion.div>
        )}

        {/* Campaigns Grid */}
        {campaigns.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {campaigns.map((campaign, idx) => (
              <CampaignCard key={campaign.id} campaign={campaign} index={idx} />
            ))}
          </motion.div>
        )}

        {/* Empty State */}
        {campaigns.length === 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="mb-4 rounded-full bg-white/[0.05] p-4">
              <Inbox className="h-8 w-8 text-white/30" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No Campaigns Yet</h3>
            <p className="text-white/50 max-w-sm mb-6">
              Be the first to create a campaign and start making a difference in your community.
            </p>
            {connected && (
              <Link
                href="/campaigns/create"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold hover:bg-brand-gold-light text-black font-semibold rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create Campaign
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </main>
  );
}