"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BarChart3, Download, DollarSign, ExternalLink, Heart, LayoutDashboard, Plus, TrendingUp, Users } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";
import { getCampaigns } from "@/lib/actions";
import { WalletButton } from "@/components/wallet/wallet-button";
import { StatsGrid } from "@/components/ui/tailgrids";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";
import { CTA_COPY } from "@/lib/copy";

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

interface AnalyticsSummary {
  ok: boolean;
  days: number;
  total: number;
  events: Array<{ event: string; count: number }>;
  pages: Array<{ page: string; count: number }>;
  trend: Array<{ date: string; total: number; donate_click: number; donation_success: number }>;
}

function MetricTile({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <div className="rounded-[1rem] border border-white/10 bg-black/20 px-3 py-3">
      <p className="text-[11px] uppercase tracking-[0.16em] text-white/55">{label}</p>
      <p className="mt-2 font-display text-2xl text-[#f1ddab]">{value}</p>
      {hint ? <p className="mt-1 text-xs text-white/65">{hint}</p> : null}
    </div>
  );
}

function buildFullAnalyticsCsv(summary: AnalyticsSummary) {
  const lines: string[] = ["section,key,value"];

  lines.push(`meta,days,${summary.days}`);
  lines.push(`meta,total_events,${summary.total}`);

  for (const event of summary.events) {
    lines.push(`event,${event.event},${event.count}`);
  }

  for (const page of summary.pages) {
    lines.push(`page,${page.page.replaceAll(",", " ")},${page.count}`);
  }

  for (const day of summary.trend) {
    lines.push(`trend_${day.date},donate_click,${day.donate_click}`);
    lines.push(`trend_${day.date},donation_success,${day.donation_success}`);
    lines.push(`trend_${day.date},total,${day.total}`);
  }

  return lines.join("\n");
}

function buildTrendCsv(summary: AnalyticsSummary) {
  const lines: string[] = ["date,donate_click,donation_success,total"];
  for (const day of summary.trend) {
    lines.push(`${day.date},${day.donate_click},${day.donation_success},${day.total}`);
  }
  return lines.join("\n");
}

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const isConnected = !!publicKey;

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyticsSummary, setAnalyticsSummary] = useState<AnalyticsSummary | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(true);
  const [analyticsDays, setAnalyticsDays] = useState<7 | 14 | 30>(7);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      setAnalyticsLoading(true);

      const [campaignResult, analyticsResult] = await Promise.allSettled([
        getCampaigns(20),
        fetch(`/api/analytics/summary?days=${analyticsDays}`).then((res) => res.json() as Promise<AnalyticsSummary>),
      ]);

      if (campaignResult.status === "fulfilled" && campaignResult.value.success) {
        setCampaigns(campaignResult.value.campaigns as Campaign[]);
      }

      if (analyticsResult.status === "fulfilled" && analyticsResult.value.ok) {
        setAnalyticsSummary(analyticsResult.value);
      } else {
        setAnalyticsSummary(null);
      }

      setLoading(false);
      setAnalyticsLoading(false);
    }

    if (isConnected) {
      void loadDashboardData();
    } else {
      setLoading(false);
      setAnalyticsLoading(false);
    }
  }, [isConnected, analyticsDays]);

  const stats = campaigns.reduce(
    (acc, campaign) => ({
      totalRaised: acc.totalRaised + (campaign.metadata?.raised || 0),
      totalDonations: acc.totalDonations + (campaign.metadata?.donors || 0),
      activeCampaigns: acc.activeCampaigns + (campaign.metadata?.status === "active" ? 1 : 0),
    }),
    { totalRaised: 0, totalDonations: 0, activeCampaigns: 0 }
  );

  const getEventCount = (eventName: string) =>
    analyticsSummary?.events.find((event) => event.event === eventName)?.count || 0;

  const donateClicks = getEventCount("donate_click");
  const donationSuccess = getEventCount("donation_success");
  const shareClicks = getEventCount("campaign_share_click");
  const quickAmount = getEventCount("quick_amount_selected");

  const successRate = donateClicks > 0 ? (donationSuccess / donateClicks) * 100 : 0;
  const shareToDonateRate = donateClicks > 0 ? (shareClicks / donateClicks) * 100 : 0;

  const maxTrend = useMemo(() => {
    if (!analyticsSummary?.trend?.length) return 1;
    return Math.max(...analyticsSummary.trend.map((day) => day.donate_click), 1);
  }, [analyticsSummary]);

  const downloadCsv = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const handleExportFullCsv = () => {
    if (!analyticsSummary) return;
    downloadCsv(
      buildFullAnalyticsCsv(analyticsSummary),
      `analytics-summary-${analyticsSummary.days}d-${new Date().toISOString().slice(0, 10)}.csv`
    );
  };

  const handleExportTrendCsv = () => {
    if (!analyticsSummary) return;
    downloadCsv(
      buildTrendCsv(analyticsSummary),
      `analytics-trend-${analyticsSummary.days}d-${new Date().toISOString().slice(0, 10)}.csv`
    );
  };

  if (!isConnected) {
    return (
      <SitePage>
        <PageShell className="max-w-3xl">
          <Card className="rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-10 text-center shadow-[0_24px_90px_rgba(0,0,0,0.28)]">
            <LayoutDashboard className="mx-auto h-16 w-16 text-[#d4a853]" />
            <h1 className="mt-6 font-display text-4xl text-white">Your dashboard</h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-white/72">
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
          description="Monitor campaign performance, donor behavior, and conversion signals in one operational workspace."
          secondary={
            <Link
              href="/create"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f0c]"
            >
              <Plus className="h-4 w-4" />
              {CTA_COPY.launchCampaign}
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
                title="Your active campaigns and current fundraising status."
                description="Use this table to review raised amounts, goals, status, and quick actions without leaving the dashboard."
              />

              <Card className="overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))]">
                <div className="grid grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_auto] gap-4 border-b border-white/8 px-6 py-4 text-[11px] uppercase tracking-[0.22em] text-white/48">
                  <div>Campaign</div>
                  <div>Raised</div>
                  <div>Goal</div>
                  <div>Status</div>
                  <div />
                </div>

                {loading ? (
                  <div className="px-6 py-12 text-center text-white/62">Loading dashboard data...</div>
                ) : campaigns.length === 0 ? (
                  <div className="px-6 py-14 text-center">
                    <p className="text-lg text-white/72">No live campaigns yet</p>
                    <p className="mt-2 text-sm text-white/58">Launch your first campaign to start building momentum.</p>
                    <Link
                      href="/create"
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 px-5 py-2.5 text-sm font-medium text-[#f1ddab] transition duration-300 hover:bg-[#d4a853]/16 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f0c]"
                    >
                      <Plus className="h-4 w-4" />
                      {CTA_COPY.launchCampaign}
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-white/8">
                    {campaigns.slice(0, 6).map((campaign) => (
                      <div key={campaign.id} className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-[1.5fr_0.8fr_0.8fr_0.8fr_auto] md:items-center">
                        <div>
                          <Link href={`/campaign/${campaign.slug}`} className="font-medium text-white transition-colors hover:text-[#f1ddab] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f0c]">
                            {campaign.title}
                          </Link>
                          <p className="mt-1 text-sm text-white/58">{campaign.metadata?.category || "General"}</p>
                        </div>
                        <div className="text-white/72">{campaign.metadata?.raised || 0} SOL</div>
                        <div className="text-white/65">{campaign.metadata?.goal || 0} SOL</div>
                        <div>
                          <span className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ${campaign.metadata?.status === "active" ? "border border-[#d4a853]/20 bg-[#d4a853]/10 text-[#f1ddab]" : "border border-white/10 bg-white/[0.05] text-white/56"}`}>
                            {campaign.metadata?.status || "active"}
                          </span>
                        </div>
                        <div>
                          <Link href={`/campaign/${campaign.slug}`} className="inline-flex items-center gap-1 text-sm text-white/70 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f0c]">
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

              <Card className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-[#d4a853]">Analytics</p>
                    <h3 className="mt-1 text-lg font-semibold text-white">Conversion signals</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleExportTrendCsv}
                      disabled={!analyticsSummary}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f0c] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Trend CSV
                    </button>
                    <button
                      type="button"
                      onClick={handleExportFullCsv}
                      disabled={!analyticsSummary}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-white/80 transition hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f0c] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Full CSV
                    </button>
                    <BarChart3 className="h-5 w-5 text-[#d4a853]" />
                  </div>
                </div>

                <div className="mt-4 inline-flex rounded-full border border-white/12 bg-black/20 p-1 text-xs">
                  {[7, 14, 30].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setAnalyticsDays(days as 7 | 14 | 30)}
                      className={`rounded-full px-3 py-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f0c] ${analyticsDays === days ? "bg-[#d4a853]/16 text-[#f1ddab]" : "text-white/72 hover:text-white"}`}
                    >
                      {days}d
                    </button>
                  ))}
                </div>

                {analyticsLoading ? (
                  <p className="mt-4 text-sm text-white/70">Loading analytics summary...</p>
                ) : analyticsSummary ? (
                  <>
                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <MetricTile label="Donate clicks" value={donateClicks} />
                      <MetricTile label="Donation success" value={donationSuccess} />
                      <MetricTile label="Quick amount" value={quickAmount} />
                      <MetricTile label="Share clicks" value={shareClicks} />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <MetricTile label="Success rate" value={`${successRate.toFixed(1)}%`} hint="donation_success / donate_click" />
                      <MetricTile label="Share→donate" value={`${shareToDonateRate.toFixed(1)}%`} hint="campaign_share_click / donate_click" />
                    </div>

                    <p className="mt-4 text-xs text-white/65">
                      Tracked events: {analyticsSummary.total.toLocaleString()} • Window: {analyticsSummary.days} days
                    </p>

                    <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/55">Donate click trend</p>
                      <div className="mt-2 flex items-center gap-4 text-[11px] text-white/70">
                        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#d4a853]" /> Donate clicks</span>
                        <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#c46d46]" /> Donation success</span>
                      </div>
                      <div className="mt-3 flex h-20 items-end gap-1.5">
                        {analyticsSummary.trend.map((day) => {
                          const height = Math.max(8, Math.round((day.donate_click / maxTrend) * 100));
                          const successHeight = day.donate_click > 0 ? Math.max(6, Math.round((day.donation_success / day.donate_click) * 100)) : 0;
                          return (
                            <div
                              key={day.date}
                              className="group relative flex-1 overflow-hidden rounded-t bg-[#d4a853]/65 transition hover:bg-[#d4a853]"
                              style={{ height: `${height}%` }}
                              title={`${day.date}: ${day.donate_click} donate clicks, ${day.donation_success} success`}
                            >
                              {successHeight > 0 ? <div className="absolute inset-x-0 bottom-0 bg-[#c46d46]/90" style={{ height: `${successHeight}%` }} /> : null}
                              <span className="pointer-events-none absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded bg-[#120f0c] px-2 py-1 text-[10px] text-white/85 group-hover:block">
                                {day.donate_click}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-5 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4">
                      <p className="text-xs uppercase tracking-[0.2em] text-white/55">Top pages</p>
                      <div className="mt-3 space-y-2">
                        {(analyticsSummary.pages || []).slice(0, 3).map((page) => (
                          <div key={page.page} className="flex items-center justify-between text-sm text-white/72">
                            <span className="truncate pr-3">{page.page}</span>
                            <span className="text-[#f1ddab]">{page.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="mt-4 text-sm text-white/70">No analytics events yet. Interact with donation flows to populate this panel.</p>
                )}
              </Card>

              <Card className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6">
                <h3 className="text-lg font-semibold text-white">Quick actions</h3>
                <div className="mt-5 space-y-3">
                  <Link href="/create" className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 text-white transition-colors hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f0c]">
                    <Plus className="h-4 w-4 text-[#d4a853]" />
                    <span>{CTA_COPY.launchCampaign}</span>
                  </Link>
                  <Link href="/campaigns" className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-black/20 px-4 py-4 text-white transition-colors hover:bg-black/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f0c]">
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
