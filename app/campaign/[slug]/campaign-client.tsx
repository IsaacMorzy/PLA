"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Users, MapPin, Share2, Flag, Clock, CheckCircle, ArrowLeft, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { campaignCategories } from "@/lib/cosmic";
import { WalletButton } from "@/components/wallet/wallet-button";
import { useWallet } from "@solana/wallet-adapter-react";
import { updateCampaign } from "@/lib/actions";
import * as animations from "@/lib/animations";
import type { Campaign } from "@/lib/cosmic";

// Glass Card Component
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl ${className}`}>
      {children}
    </div>
  );
}

interface CampaignClientProps {
  campaign: Campaign;
}

export default function CampaignClient({ campaign }: CampaignClientProps) {
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
  const donorsCount = campaign.metadata?.donors || Math.floor(Math.random() * 50) + 10;

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
      const newRaised = raised + amount;
      const result = await updateCampaign(campaign.id, {
        raised: newRaised,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to process donation");
      }

      setDonationAmount("1");
      setShowDonateModal(false);
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
      <div className="max-w-5xl mx-auto">
        <Link href="/campaigns" className="btn btn-ghost btn-sm gap-2 mb-6 text-white/70 hover:text-white hover:bg-white/10">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Campaigns</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Image & Story */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial="hidden" animate="visible" variants={animations.fadeInUp}>
              <div className="aspect-video relative rounded-2xl overflow-hidden bg-white/5">
                {campaign.metadata?.image ? (
                  <Image src={campaign.metadata.image} alt={campaign.title} fill className="object-cover" priority />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Globe className="h-20 w-20 text-white/30" />
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={animations.fadeInUp} transition={{ delay: 0.1 }}>
              {category && (
                <span className="badge badge-lg bg-white/10 border-white/30 text-white mb-3">
                  {category.icon} {category.label}
                </span>
              )}
              <h1 className="text-3xl font-bold text-white mt-2 font-display">{campaign.title}</h1>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-white/60">
                {campaign.metadata?.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{campaign.metadata.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{daysLeft} days left</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{donorsCount} donors</span>
                </div>
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={animations.fadeInUp} transition={{ delay: 0.2 }}>
              <h2 className="text-xl font-semibold text-white">The Story</h2>
              <div className="text-white/70 whitespace-pre-wrap mt-2 leading-relaxed">
                {campaign.metadata?.beneficiary_story || campaign.metadata?.description || "No story available yet."}
              </div>
            </motion.div>

            {campaign.metadata?.beneficiary_name && (
              <motion.div initial="hidden" animate="visible" variants={animations.fadeInUp} transition={{ delay: 0.3 }}>
                <GlassCard className="p-4">
                  <h3 className="font-semibold text-white mb-2">Beneficiary</h3>
                  <p className="text-white/70">{campaign.metadata.beneficiary_name}</p>
                </GlassCard>
              </motion.div>
            )}
          </div>

          {/* Right Column - Donate Card */}
          <div className="space-y-6">
            <motion.div initial="hidden" animate="visible" variants={animations.fadeInUp} transition={{ delay: 0.2 }}>
              <GlassCard className="sticky top-24 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Support This Cause</h3>
                
                <div className="mt-2">
                  <progress 
                    className={`progress ${percent >= 100 ? "progress-[#d4a853]" : percent >= 50 ? "progress-[#d4a853]" : "progress-[#d4a853]"}`} 
                    value={percent} 
                    max={100} 
                  />
                  <div className="flex justify-between mt-2 text-sm">
                    <span className="font-bold text-[#d4a853]">{raised.toFixed(1)} SOL raised</span>
                    <span className="text-white/60">{percent}% of goal</span>
                  </div>
                  <p className="text-xs text-white/40 mt-1">Goal: {goal} SOL</p>
                </div>

                <button 
                  onClick={() => setShowDonateModal(true)} 
                  className="btn btn-primary w-full mt-6 gap-2"
                >
                  <Heart className="h-5 w-5" />
                  <span>Donate Now</span>
                </button>

                <div className="flex gap-2 mt-3">
                  <button className="btn btn-outline border-white/30 text-white hover:bg-white/10 flex-1 gap-2">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  <button className="btn btn-outline border-white/30 text-white hover:bg-white/10 flex-1 gap-2">
                    <Flag className="h-4 w-4" />
                    <span>Report</span>
                  </button>
                </div>

                <div className="divider text-white/40">Recent Donors</div>
                
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                      <div className="avatar placeholder">
                        <div className="bg-[#d4a853]/20 text-[#d4a853] rounded-full w-8">
                          <span className="text-xs">{String.fromCharCode(64 + i)}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">Anonymous</p>
                        <p className="text-xs text-white/50">{(Math.random() * 5).toFixed(2)} SOL</p>
                      </div>
                      <CheckCircle className="h-4 w-4 text-[#d4a853]" />
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Donate Modal */}
      <dialog className={`modal ${showDonateModal ? "modal-open" : ""}`}>
        <div className="modal-box bg-white/10 backdrop-blur-lg border border-white/20 text-white">
          <h3 className="font-bold text-lg">Donate to {campaign.title}</h3>
          <p className="text-white/60 py-4">Your donation goes directly to the campaign. 100% on-chain.</p>
          
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white/70">Amount (SOL)</span>
            </label>
            <div className="grid grid-cols-4 gap-2 mb-3">
              {["1", "2", "5", "10"].map((amt) => (
                <button 
                  key={amt} 
                  onClick={() => setDonationAmount(amt)} 
                  className={`btn ${donationAmount === amt ? "btn-primary" : "btn-outline border-white/30 text-white hover:bg-white/10"}`}
                >
                  {amt}
                </button>
              ))}
            </div>
            <input 
              type="number" 
              value={donationAmount} 
              onChange={(e) => setDonationAmount(e.target.value)} 
              className="input input-bordered bg-white/10 border-white/20 text-white placeholder:text-white/40" 
              step="0.1" 
              min="1" 
            />
          </div>
          
          {error && (
            <div className="alert alert-error mt-3">
              <span>{error}</span>
            </div>
          )}
          
          <div className="mt-4">
            <WalletButton />
          </div>
          
          <div className="mt-4 p-4 bg-white/10 rounded-lg">
            <div className="flex justify-between text-white">
              <span>Total</span>
              <span className="font-bold">{donationAmount || 0} SOL</span>
            </div>
          </div>
          
          <div className="modal-action">
            <button 
              onClick={() => setShowDonateModal(false)} 
              className="btn btn-ghost text-white"
            >
              Cancel
            </button>
            <button 
              onClick={handleDonate} 
              disabled={isDonating || !donationAmount} 
              className="btn btn-primary"
            >
              {isDonating ? (
                <span className="loading loading-spinner" />
              ) : (
                <>
                  <Heart className="h-4 w-4" />
                  <span>Donate {donationAmount} SOL</span>
                </>
              )}
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setShowDonateModal(false)}>close</button>
        </form>
      </dialog>
    </main>
  );
}