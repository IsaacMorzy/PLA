"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WalletButton } from "@/components/wallet/wallet-button";
import { StatsGrid } from "@/components/ui/tailgrids";
import {
  LayoutDashboard,
  Heart,
  DollarSign,
  Users,
  TrendingUp,
  Plus,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import * as animations from "@/lib/animations";
import { getCampaigns } from "@/lib/actions";

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

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const isConnected = !!publicKey;
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCampaigns() {
      const result = await getCampaigns(20);
      if (result.success) {
        setCampaigns(result.campaigns as Campaign[]);
      }
      setLoading(false);
    }
    if (isConnected) {
      fetchCampaigns();
    } else {
      setLoading(false);
    }
  }, [isConnected]);

  // Calculate stats
  const stats = campaigns.reduce(
    (acc, c) => ({
      totalRaised: acc.totalRaised + (c.metadata?.raised || 0),
      totalDonations: acc.totalDonations + (c.metadata?.donors || 0),
      activeCampaigns: acc.activeCampaigns + (c.metadata?.status === "active" ? 1 : 0),
    }),
    { totalRaised: 0, totalDonations: 0, activeCampaigns: 0 }
  );

  // Glass card
  const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl ${className}`}>
      {children}
    </div>
  );

  if (!isConnected) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4 bg-[#1a1815]">
        <div className="max-w-md mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
          >
            <GlassCard className="p-8">
              <LayoutDashboard className="h-16 w-16 mx-auto text-[#d4a853] mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2 font-display">Your Dashboard</h2>
              <p className="text-white/60 mb-6">
                Connect your wallet to view your campaigns and donations.
              </p>
              <WalletButton />
            </GlassCard>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4 bg-[#1a1815]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.fadeInUp}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white font-display">Dashboard</h1>
            <p className="text-white/60">Manage your campaigns</p>
          </div>
          <Link
            href="/create"
            className="flex items-center gap-2 px-5 py-3 bg-[#d4a853] text-[#1a1815] font-medium rounded-xl hover:bg-[#e8c87a] transition-colors"
          >
            <Plus className="w-5 h-5" />
            New Campaign
          </Link>
        </motion.div>

        {/* Platform Stats - Trust Signal */}
        <StatsGrid 
          stats={[
            { value: campaigns.length.toString(), label: "Your Campaigns" },
            { value: campaigns.reduce((acc, c) => acc + (c.metadata?.raised || 0), 0).toLocaleString(), label: "Total Raised (SOL)", change: { value: "+12%", positive: true } },
            { value: campaigns.reduce((acc, c) => acc + (c.metadata?.donors || 0), 0).toString(), label: "Total Donors" },
            { value: Math.floor(campaigns.filter(c => (c.metadata?.raised || 0) >= (c.metadata?.goal || 0) * 0.5).length / Math.max(campaigns.length, 1) * 100) + "%", label: "Funded Rate" },
          ]}
          className="mb-8"
        />

        {/* Campaigns Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.fadeInUp}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {[
            {
              icon: DollarSign,
              label: "Total Raised",
              value: `${stats.totalRaised} SOL`,
              color: "text-[#d4a853]",
            },
            {
              icon: Heart,
              label: "Donations",
              value: stats.totalDonations.toString(),
              color: "text-[#d4a853]",
            },
            {
              icon: TrendingUp,
              label: "Active",
              value: stats.activeCampaigns.toString(),
              color: "text-[#d4a853]",
            },
            {
              icon: Users,
              label: "Total Donors",
              value: stats.totalDonations.toString(),
              color: "text-[#d4a853]",
            },
          ].map(({ icon: Icon, label, value, color }) => (
            <GlassCard key={label} className="p-5">
              <div className="flex items-center justify-between">
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <h2 className="text-2xl font-bold text-white mt-2">{value}</h2>
              <p className="text-white/60 text-sm">{label}</p>
            </GlassCard>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Campaigns */}
          <div className="lg:col-span-2">
            <GlassCard>
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Your Campaigns</h3>
                  <Link href="/campaigns" className="text-white/60 hover:text-white text-sm flex items-center gap-1">
                    <span>View All</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                {loading ? (
                  <div className="text-center py-8">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="h-8 w-8 border-2 border-white/20 border-t-emerald-400 rounded-full mx-auto"
                    />
                  </div>
                ) : campaigns.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-white/60 mb-4">No campaigns yet</p>
                    <Link
                      href="/create"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Create your first campaign</span>
                    </Link>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left text-white/60 pb-3 pr-4">Campaign</th>
                          <th className="text-left text-white/60 pb-3 pr-4">Raised</th>
                          <th className="text-left text-white/60 pb-3 pr-4">Goal</th>
                          <th className="text-left text-white/60 pb-3 pr-4">Status</th>
                          <th className="text-right text-white/60 pb-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaigns.slice(0, 5).map((campaign) => (
                          <tr
                            key={campaign.id}
                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                          >
                            <td className="py-3 pr-4">
                              <Link
                                href={`/campaign/${campaign.slug}`}
                                className="text-white hover:text-emerald-400 font-medium"
                              >
                                {campaign.title}
                              </Link>
                            </td>
                            <td className="py-3 pr-4 text-white/80">
                              {campaign.metadata?.raised || 0} SOL
                            </td>
                            <td className="py-3 pr-4 text-white/60">
                              {campaign.metadata?.goal || 5} SOL
                            </td>
                            <td className="py-3 pr-4">
                              <span
                                className={`px-2 py-1 text-xs rounded-full ${
                                  campaign.metadata?.status === "active"
                                    ? "bg-[#d4a853]/20 text-[#d4a853] border border-[#d4a853]/30"
                                    : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                                }`}
                              >
                                {campaign.metadata?.status || "active"}
                              </span>
                            </td>
                            <td className="py-3 text-right">
                              <Link
                                href={`/campaign/${campaign.slug}`}
                                className="text-white/60 hover:text-white text-sm"
                              >
                                View
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Activity Sidebar */}
          <div className="space-y-6">
            <GlassCard className="p-5">
              <h3 className="text-base font-semibold text-white mb-4">Getting Started</h3>
              <div className="space-y-3">
                <Link
                  href="/create"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#d4a853] to-[#c46d46] flex items-center justify-center">
                    <Plus className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Create Campaign</p>
                    <p className="text-white/60 text-xs">Start fundraising</p>
                  </div>
                </Link>
                <Link
                  href="/campaigns"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#d4a853] to-[#c46d46] flex items-center justify-center">
                    <Heart className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Browse Campaigns</p>
                    <p className="text-white/60 text-xs">Support causes</p>
                  </div>
                </Link>
              </div>
            </GlassCard>

            {/* Tips */}
            <GlassCard className="p-5">
              <h3 className="text-base font-semibold text-white mb-4">Tips</h3>
              <div className="space-y-2 text-sm text-white/60">
                <p>• Add a compelling story to your campaign</p>
                <p>• Share on social media</p>
                <p>• Update donors regularly</p>
                <p>• Set a realistic goal</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </main>
  );
}