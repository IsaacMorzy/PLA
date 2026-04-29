"use client";

import { WalletButton } from "@/components/wallet/wallet-button";
import {
  LayoutDashboard,
  Heart,
  DollarSign,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Settings,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

// Mock data - replace with Anchor queries
const mockStats = {
  totalRaised: 12.5,
  totalDonations: 47,
  activeCampaigns: 3,
  totalDonors: 234,
};

const mockCampaigns = [
  {
    id: "1",
    title: "Clean Water for Rural Village",
    raised: 5.2,
    goal: 10,
    donors: 23,
    status: "active",
  },
  {
    id: "2",
    title: "School Books Fund",
    raised: 2.8,
    goal: 5,
    donors: 12,
    status: "active",
  },
  {
    id: "3",
    title: "Medical Supplies",
    raised: 4.5,
    goal: 4.5,
    donors: 12,
    status: "funded",
  },
];

const mockDonations = [
  { id: "1", donor: "7x8...3k2", amount: 0.5, time: "2h ago", campaign: "Clean Water" },
  { id: "2", donor: "9a2...b1c", amount: 0.25, time: "5h ago", campaign: "School Books" },
  { id: "3", donor: "3m4...n5p", amount: 1.0, time: "1d ago", campaign: "Clean Water" },
  { id: "4", donor: "8q7...r6s", amount: 0.1, time: "2d ago", campaign: "Medical Supplies" },
];

const mockActivity = [
  { type: "donation", message: "New donation to Clean Water", time: "2h ago" },
  { type: "milestone", message: "School Books Fund 50% funded", time: "1d ago" },
  { type: "withdrawal", message: "Withdrew 2.5 SOL from Medical Supplies", time: "3d ago" },
];

export default function DashboardPage() {
  const { publicKey } = useWallet();
  const isConnected = !!publicKey;

  if (!isConnected) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center">
              <LayoutDashboard className="h-16 w-16 text-primary" />
              <h2 className="card-title text-2xl mt-4">Your Dashboard</h2>
              <p className="text-muted-foreground">
                Connect your wallet to view your campaigns and donations.
              </p>
              <div className="card-actions mt-4">
                <WalletButton />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Manage your campaigns</p>
          </div>
          <div className="flex gap-2">
            <Link href="/create" className="btn btn-primary gap-2">
              <Plus className="h-4 w-4" />
              <span>New Campaign</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: DollarSign,
              label: "Total Raised",
              value: `${mockStats.totalRaised} SOL`,
              change: "+12%",
              up: true,
            },
            {
              icon: Heart,
              label: "Donations Received",
              value: mockStats.totalDonations.toString(),
              change: "+8",
              up: true,
            },
            {
              icon: TrendingUp,
              label: "Active Campaigns",
              value: mockStats.activeCampaigns.toString(),
              change: "0",
              up: true,
            },
            {
              icon: Users,
              label: "Total Donors",
              value: mockStats.totalDonors.toString(),
              change: "+15",
              up: true,
            },
          ].map(({ icon: Icon, label, value, change, up }) => (
            <div key={label} className="card bg-base-100 shadow">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <div
                    className={`badge badge-sm ${
                      up ? "badge-success" : "badge-error"
                    } badge-outline`}
                  >
                    {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {change}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mt-2">{value}</h2>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Campaigns */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="card-title flex items-center justify-between">
                  <span>Your Campaigns</span>
                  <Link href="/dashboard/campaigns" className="btn btn-ghost btn-sm gap-1">
                    <span>View All</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Campaign</th>
                        <th>Raised</th>
                        <th>Goal</th>
                        <th>Donors</th>
                        <th>Status</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockCampaigns.map((campaign) => (
                        <tr key={campaign.id} className="hover">
                          <td>
                            <Link
                              href={`/campaign/${campaign.id}`}
                              className="font-medium hover:underline"
                            >
                              {campaign.title}
                            </Link>
                          </td>
                          <td>{campaign.raised} SOL</td>
                          <td>{campaign.goal} SOL</td>
                          <td>{campaign.donors}</td>
                          <td>
                            <span
                              className={`badge ${
                                campaign.status === "funded"
                                  ? "badge-success"
                                  : "badge-warning"
                              } badge-sm`}
                            >
                              {campaign.status}
                            </span>
                          </td>
                          <td>
                            <Link
                              href={`/campaign/${campaign.id}`}
                              className="btn btn-ghost btn-xs"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Activity Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-base">Recent Activity</h3>
                <div className="space-y-3">
                  {mockActivity.map((activity, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className={`h-2 w-2 rounded-full mt-2 ${
                          activity.type === "donation"
                            ? "bg-success"
                            : activity.type === "withdrawal"
                            ? "bg-warning"
                            : "bg-info"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Donors */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-base">Recent Donations</h3>
                <div className="space-y-2">
                  {mockDonations.slice(0, 4).map((donation) => (
                    <div
                      key={donation.id}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-8">
                            <span className="text-xs">
                              {donation.donor.slice(0, 2).toUpperCase()}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono text-xs">{donation.donor}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">{donation.amount} SOL</span>
                        <p className="text-xs text-muted-foreground">{donation.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}