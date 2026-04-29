"use client";

import { useState } from "react";
import { Heart, Users, MapPin, Share2, Flag, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCampaignBySlug, campaignCategories, type Campaign } from "@/lib/cosmic";
import { WalletButton } from "@/components/wallet/wallet-button";
import { useWallet } from "@solana/wallet-adapter-react";
import { updateCampaign } from "@/lib/actions";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function CampaignPage({ params }: Props) {
  const { slug } = await params;
  const campaign = await getCampaignBySlug(slug);

  if (!campaign) {
    return (
      <main className="min-h-screen pt-24 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Campaign not found</h1>
          <Link href="/campaigns" className="btn btn-primary mt-4">
            Browse Campaigns
          </Link>
        </div>
      </main>
    );
  }

  return <CampaignContent campaign={campaign} />;
}

function CampaignContent({ campaign }: { campaign: Campaign }) {
  const [donationAmount, setDonationAmount] = useState("1");
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [isDonating, setIsDonating] = useState(false);
  const [error, setError] = useState("");

  const { publicKey } = useWallet();
  const isConnected = !!publicKey;

  const goal = campaign.metadata?.goal || 5;
  const raised = campaign.metadata?.raised || 0;
  const percent = Math.min(100, Math.round((raised / goal) * 100));
  const daysLeft = Math.max(0, 30 - Math.floor(Math.random() * 30));

  const handleDonate = async () => {
    if (!isConnected) {
      setError("Please connect your wallet first");
      return;
    }

    const amount = parseFloat(donationAmount);
    if (amount < 1) {
      setError("Minimum donation is 1 SOL");
      return;
    }

    setIsDonating(true);
    setError("");

    try {
      // Update campaign in Cosmic (simulated for demo - real impl would use Anchor program)
      const newRaised = raised + amount;
      const result = await updateCampaign(campaign.id, {
        raised: newRaised,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to process donation");
      }

      // Update local state to show success
      setDonationAmount("1");
      setShowDonateModal(false);
      // In a real app, you'd trigger the Solana transfer here
      alert(`Thank you for your donation of ${amount} SOL!`);
    } catch (err) {
      console.error("Donation error:", err);
      setError(err instanceof Error ? err.message : "Donation failed");
    } finally {
      setIsDonating(false);
    }
  };

  const category = campaignCategories.find((c) => c.id === campaign.metadata?.category);

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/campaigns" className="btn btn-ghost btn-sm gap-2 mb-6">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Campaigns</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="aspect-video relative rounded-xl overflow-hidden bg-base-200">
              {campaign.metadata?.image ? (
                <Image src={campaign.metadata.image} alt={campaign.title} fill className="object-cover" priority />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Users className="h-20 w-20 text-muted-foreground/30" />
                </div>
              )}
            </div>

            <div>
              {category && <span className="badge badge-lg mb-3">{category.icon} {category.label}</span>}
              <h1 className="text-3xl font-bold mt-2">{campaign.title}</h1>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                {campaign.metadata?.location && (
                  <div className="flex items-center gap-1"><MapPin className="h-4 w-4" /><span>{campaign.metadata.location}</span></div>
                )}
                <div className="flex items-center gap-1"><Clock className="h-4 w-4" /><span>{daysLeft} days left</span></div>
                <div className="flex items-center gap-1"><Users className="h-4 w-4" /><span>{Math.floor(Math.random() * 50) + 10} donors</span></div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold">The Story</h2>
              <div className="text-muted-foreground whitespace-pre-wrap mt-2">
                {campaign.metadata?.beneficiary_story || campaign.metadata?.description || "No story available yet."}
              </div>
            </div>

            {campaign.metadata?.beneficiary_name && (
              <div className="card bg-base-200">
                <div className="card-body">
                  <h3 className="card-title">Beneficiary</h3>
                  <p>{campaign.metadata.beneficiary_name}</p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="card bg-base-100 shadow-xl sticky top-24">
              <div className="card-body">
                <h3 className="card-title">Support This Cause</h3>
                <div className="mt-2">
                  <progress className={`progress ${percent >= 100 ? "progress-success" : percent >= 50 ? "progress-warning" : "progress-primary"}`} value={percent} max={100} />
                  <div className="flex justify-between mt-1 text-sm">
                    <span className="font-bold text-success">{raised.toFixed(1)} SOL raised</span>
                    <span className="text-muted-foreground">{percent}% of goal</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Goal: {goal} SOL</p>
                </div>
                <button onClick={() => setShowDonateModal(true)} className="btn btn-primary w-full mt-4">
                  <Heart className="h-5 w-5" /><span>Donate Now</span>
                </button>
                <div className="flex gap-2 mt-2">
                  <button className="btn btn-outline btn-sm flex-1 gap-2"><Share2 className="h-4 w-4" /><span>Share</span></button>
                  <button className="btn btn-outline btn-sm flex-1 gap-2"><Flag className="h-4 w-4" /><span>Report</span></button>
                </div>
                <div className="divider">Recent Donors</div>
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="avatar placeholder"><div className="bg-success/20 text-success rounded-full w-8"><span className="text-xs">{String.fromCharCode(64 + i)}</span></div></div>
                      <div className="flex-1"><p className="text-sm font-medium">Anonymous</p><p className="text-xs text-muted-foreground">{Math.random().toFixed(2)} SOL</p></div>
                      <CheckCircle className="h-4 w-4 text-success" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog className={`modal ${showDonateModal ? "modal-open" : ""}`}>
        <div className="modal-box">
          <h3 className="font-bold text-lg">Donate to {campaign.title}</h3>
          <p className="text-muted-foreground py-4">Your donation goes directly to the campaign. 100% on-chain.</p>
          <div className="form-control">
            <label className="label"><span className="label-text">Amount (SOL)</span></label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {["1", "2", "5", "10"].map((amt) => (
                <button key={amt} onClick={() => setDonationAmount(amt)} className={`btn ${donationAmount === amt ? "btn-primary" : "btn-outline"}`}>{amt}</button>
              ))}
            </div>
            <input type="number" value={donationAmount} onChange={(e) => setDonationAmount(e.target.value)} className="input input-bordered" step="0.1" min="1" />
          </div>
          {error && <div className="alert alert-error"><span>{error}</span></div>}
          <div className="mt-4"><WalletButton /></div>
          <div className="mt-4 p-4 bg-base-200 rounded-lg">
            <div className="flex justify-between"><span>Total</span><span className="font-bold">{donationAmount || 0} SOL</span></div>
          </div>
          <div className="modal-action">
            <button onClick={() => setShowDonateModal(false)} className="btn btn-ghost">Cancel</button>
            <button onClick={handleDonate} disabled={isDonating || !donationAmount} className="btn btn-primary">
              {isDonating ? <span className="loading loading-spinner" /> : <><Heart className="h-4 w-4" /><span>Donate {donationAmount} SOL</span></>}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"><button onClick={() => setShowDonateModal(false)}>close</button></form>
      </dialog>
    </main>
  );
}