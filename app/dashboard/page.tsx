"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { DollarSign, ExternalLink, Heart, LayoutDashboard, Plus, TrendingUp, Users } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import * as animations from "@/lib/animations";
import { getCampaigns } from "@/lib/actions";
import { WalletButton } from "@/components/wallet/wallet-button";
import { StatsGrid } from "@/components/ui/tailgrids";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

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

    if (isConnected) fetchCampaigns();
    else setLoading(false);
  }, [isConnected]);

  const stats = campaigns.reduce(
    (acc, campaign) => ({
      totalRaised: acc.totalRaised + (campaign.metadata?.raised || 0),
      totalDonations: acc.totalDonations + (campaign.metadata?.donors || 0),
      activeCampaigns: acc.activeCampaigns + (campaign.metadata?.status === "active" ? 1 : 0),
    }),
    { totalRaised: 0, totalDonations: 0, activeCampaigns: 0 }
  );

  if (!isConnected) {
    return (
      <SitePage>
        <PageShell className="max-w-3xl">
          <Card className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-10 text-center shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
            <LayoutDashboard className="mx-auto h-16 w-16 text-[#d4a853]" />
            <h1 className="mt-6 font-display text-4xl text-white">Your dashboard</h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/62">
              Connect your wallet to see your campaigns, fundraising activity, and the next actions available to you.
            </p>
            <div className="mt-8 flex justify-center">
              <WalletButton />
            </div>
          </Card>
        </PageShell>
      </SitePage>
    );
  }

  return (
    <SitePage>
      <PageShell>
        <PageHero
          eyebrow="Dashboard"
          title={
            <>
              Manage your campaigns with
              <span className="block text-[#f1ddab]">more clarity and control.</span>
            </>
          }
          description="The dashboard now feels closer to the rest of the redesigned site: cleaner, more structured, and easier to scan at a glance."
          secondary={
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-white/[0.08]"
            >
              <Plus className="h-4 w-4" />
              New campaign
            </Link>
          }
        />

        <SectionBlock>
          <StatsGrid
            stats={[
              { value: campaigns.length.toString(), label: "your campaigns" },
              { value: campaigns.reduce((acc, c) => acc + (c.metadata?.raised || 0), 0).toLocaleString(), label: "total raised (SOL)", change: { value: "+12%", positive: true } },
              { value: campaigns.reduce((acc, c) => acc + (c.metadata?.donors || 0), 0).toString(), label: "total donors" },
              { value: `${Math.floor((campaigns.filter((c) => (c.metadata?.raised || 0) >= (c.metadata?.goal || 0) * 0.5).length / Math.max(campaigns.length, 1)) * 100)}%`, label: "funded rate" },
            ]}
            className="[&>div]:rounded-[1.6rem] [&>div]:border-white/10 [&>div]:bg-[#0e0b08]/75 [&>div]:p-6 [&_.text-2xl]:font-display [&_.text-2xl]:text-4xl [&_.text-2xl]:text-[#f1ddab] [&_.text-white\/60]:text-[11px] [&_.text-white\/60]:uppercase [&_.text-white\/60]:tracking-[0.22em]"
          />
        </SectionBlock>

        <SectionBlock>
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div>
              <SectionIntro
                eyebrow="Your campaigns"
                title="A clearer view of the campaigns you manage."
                description="This area should feel operational and polished at the same time — part workspace, part progress report."
              />

              <Card className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045]">
                <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_auto] gap-4 border-b border-white/8 px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-white/38">
                  <div>Campaign</div>
                  <div>Raised</div>
                  <div>Goal</div>
                  <div>Status</div>
                  <div />
                </div>

                {loading ? (
                  <div className="px-6 py-12 text-center text-white/50">Loading dashboard data...</div>
                ) : campaigns.length === 0 ? (
                  <div className="px-6 py-14 text-center">
                    <p className="text-lg text-white/62">No live campaigns yet</p>
                    <p className="mt-2 text-sm text-white/42">Launch your first campaign to start building momentum.</p>
                    <Link
                      href="/create"
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 px-5 py-2.5 text-sm font-medium text-[#f1ddab] transition duration-300 hover:bg-[#d4a853]/16 hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                      Create campaign
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-white/8">
                    {campaigns.slice(0, 6).map((campaign) => (
                      <div key={campaign.id} className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_auto] md:items-center">
                        <div>
                          <Link href={`/campaign/${campaign.slug}`} className="font-medium text-white transition-colors hover:text-[#f1ddab]">
                            {campaign.title}
                          </Link>
                          <p className="mt-1 text-sm text-white/38">{campaign.metadata?.category || "General"}</p>
                        </div>
                        <div className="text-white/72">{campaign.metadata?.raised || 0} SOL</div>
                        <div className="text-white/52">{campaign.metadata?.goal || 0} SOL</div>
                        <div>
                          <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${campaign.metadata?.status === "active" ? "border border-[#d4a853]/20 bg-[#d4a853]/10 text-[#f1ddab]" : "border border-white/10 bg-white/[0.05] text-white/56"}`}>
                            {campaign.metadata?.status || "active"}
                          </span>
                        </div>
                        <div>
                          <Link href={`/campaign/${campaign.slug}`} className="inline-flex items-center gap-1 text-sm text-white/56 transition-colors hover:text-white">
                            View
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(212,168,83,0.12),rgba(255,255,255,0.03))] p-6">
                <h3 className="text-lg font-semibold text-white">At a glance</h3>
                <div className="mt-5 grid gap-4">
                  {[
                    { icon: <DollarSign className="h-5 w-5" />, label: "Total raised", value: `${stats.totalRaised} SOL` },
                    { icon: <Heart className="h-5 w-5" />, label: "Donations", value: `${stats.totalDonations}` },
                    { icon: <TrendingUp className="h-5 w-5" />, label: "Active campaigns", value: `${stats.activeCampaigns}` },
                    { icon: <Users className="h-5 w-5" />, label: "Supporters reached", value: `${stats.totalDonations}` },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4">
                      <div className="flex items-center gap-3 text-white/68">
                        <div className="text-[#d4a853]">{item.icon}</div>
                        <span>{item.label}</span>
                      </div>
                      <span className="font-medium text-white">{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="rounded-[1.8rem] border border-white/10 bg-white/[0.045] p-6">
                <h3 className="text-lg font-semibold text-white">Quick actions</h3>
                <div className="mt-5 space-y-3">
                  <Link href="/create" className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 text-white transition-colors hover:bg-black/30">
                    <Plus className="h-4 w-4 text-[#d4a853]" />
                    <span>Create a campaign</span>
                  </Link>
                  <Link href="/campaigns" className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 text-white transition-colors hover:bg-black/30">
                    <Heart className="h-4 w-4 text-[#d4a853]" />
                    <span>Browse public campaigns</span>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
