"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WalletButton } from "@/components/wallet/wallet-button";
import { Heart, FileText, Target, CheckCircle, ArrowRight, ArrowLeft, Upload, Sparkles } from "lucide-react";
import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as animations from "@/lib/animations";
import { createCampaignAction } from "@/lib/actions-client";

const categories = [
  { id: "water", label: "Clean Water", icon: "💧" },
  { id: "education", label: "Education", icon: "📚" },
  { id: "health", label: "Healthcare", icon: "🏥" },
  { id: "food", label: "Food Security", icon: "🍲" },
  { id: "shelter", label: "Housing", icon: "🏠" },
  { id: "community", label: "Community", icon: "🤝" },
];

type Step = 1 | 2 | 3 | 4;

export default function CreateCampaignPage() {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const isConnected = !!publicKey;

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    description: "",
    beneficiary_name: "",
    beneficiary_story: "",
    image: "",
    goal: "5",
  });

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "title") {
      setFormData((prev) => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      }));
    }
  };

  const nextStep = () => setStep((s) => Math.min(4, s + 1) as Step);
  const prevStep = () => setStep((s) => Math.max(1, s - 1) as Step);

  const canProceed = () => {
    switch (step) {
      case 1: return isConnected;
      case 2: return formData.title && formData.category && formData.description;
      case 3: return formData.goal && parseFloat(formData.goal) > 0;
      case 4: return true;
      default: return false;
    }
  };

  const handleSubmit = async () => {
    if (!isConnected || !publicKey) return;

    setIsSubmitting(true);
    setError("");
    try {
      // Create campaign in Cosmic CMS
      const result = await createCampaignAction({
        title: formData.title,
        slug: formData.slug,
        description: formData.description,
        image: formData.image || "https://images.unsplash.com/photo-1488521787991-ed7bbaa77390?w=800&h=600&fit=crop",
        goal: parseFloat(formData.goal) || 5,
        beneficiary_name: formData.beneficiary_name,
        beneficiary_story: formData.beneficiary_story,
        category: formData.category,
        location: "",
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to create campaign");
      }

      setIsComplete(true);
    } catch (err) {
      console.error("Error creating campaign:", err);
      setError("Failed to create campaign. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Glass morphism card
  const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl ${className}`}>
      {children}
    </div>
  );

  if (isComplete) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
          >
            <GlassCard className="p-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#d4a853] to-[#c46d46] flex items-center justify-center mb-4"
              >
                <CheckCircle className="h-10 w-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Campaign Created!</h2>
              <p className="text-white/60 mb-6">
                Your campaign "{formData.title}" is now live.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href={`/campaign/${formData.slug}`}
                  className="px-6 py-3 bg-gradient-to-r from-[#d4a853] to-[#c46d46] text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
                >
                  View Campaign
                </Link>
                <Link
                  href="/dashboard"
                  className="px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-xl hover:bg-white/20 transition-colors"
                >
                  Go to Dashboard
                </Link>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </main>
    );
  }

return (
      <main className="min-h-screen pt-24 pb-12 px-4 bg-[#1a1815]">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-white font-display">Start a Campaign</h1>
            <p className="text-white/60 mt-2">Create your fundraising campaign in minutes</p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
            className="flex items-center justify-center gap-2 mb-8 flex-wrap"
          >
            {[
              { num: 1, icon: Heart, label: "Connect" },
              { num: 2, icon: FileText, label: "Details" },
              { num: 3, icon: Target, label: "Goal" },
              { num: 4, icon: CheckCircle, label: "Review" },
            ].map(({ num, icon: Icon, label }) => (
              <div key={num} className="flex items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: step === num ? 1 : 0.9 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
                    step === num
                      ? "bg-[#d4a853] text-[#1a1815]"
                      : step > num
                      ? "bg-[#d4a853]/20 text-[#d4a853] border border-[#d4a853]/30"
                      : "bg-white/10 text-white/40 border border-white/10"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm hidden sm:inline">{label}</span>
                </motion.div>
                {num < 4 && <div className="w-6 sm:w-8 h-px bg-white/20" />}
              </div>
            ))}
          </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.fadeInUp}
          className="flex items-center justify-center gap-2 mb-8 flex-wrap"
        >
          {[
            { num: 1, icon: Heart, label: "Connect" },
            { num: 2, icon: FileText, label: "Details" },
            { num: 3, icon: Target, label: "Goal" },
            { num: 4, icon: CheckCircle, label: "Review" },
          ].map(({ num, icon: Icon, label }) => (
            <div key={num} className="flex items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: step === num ? 1 : 0.9 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
                  step === num
                    ? "bg-[#d4a853] text-[#1a1815]"
                    : step > num
                    ? "bg-[#d4a853]/20 text-[#d4a853] border border-[#d4a853]/30"
                    : "bg-white/10 text-white/40 border border-white/10"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm hidden sm:inline">{label}</span>
              </motion.div>
              {num < 4 && <div className="w-6 sm:w-8 h-px bg-white/20" />}
            </div>
          ))}
        </motion.div>

        {/* Form Card */}
        <GlassCard>
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {/* Step 1: Connect Wallet */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center py-8"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">Connect Your Wallet</h3>
                  <p className="text-white/60 mb-8 max-sm:text-sm">
                    Connect your Solana wallet to create a campaign. This is where you'll receive donations.
                  </p>
                  <div className="flex flex-col items-center gap-4">
                    <WalletButton />
                    {isConnected && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 px-4 py-2 bg-[#d4a853]/20 border border-[#d4a853]/30 rounded-lg text-[#d4a853]"
                      >
                        <CheckCircle className="h-5 w-5" />
                        <span>Connected: {publicKey?.toString().slice(0, 8)}...</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Details */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-semibold text-white">Campaign Details</h3>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Campaign Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => updateForm("title", e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#d4a853]/50 transition-colors"
                      placeholder="e.g., Clean Water for Rural Village"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => updateForm("category", e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                    >
                      <option value="" className="bg-gray-900">Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-gray-900">
                          {cat.icon} {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Short Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => updateForm("description", e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                      placeholder="Describe your cause in a few sentences..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Beneficiary Name</label>
                    <input
                      type="text"
                      value={formData.beneficiary_name}
                      onChange={(e) => updateForm("beneficiary_name", e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                      placeholder="Who will receive the funds?"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Beneficiary Story</label>
                    <textarea
                      value={formData.beneficiary_story}
                      onChange={(e) => updateForm("beneficiary_story", e.target.value)}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors resize-none"
                      placeholder="Tell the full story of who needs help..."
                      rows={4}
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Media & Goal */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-semibold text-white">Media & Goal</h3>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Campaign Image</label>
                    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-white/40 transition-colors cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto text-white/40" />
                      <p className="text-white/60 text-sm mt-2">
                        Drag and drop or click to upload
                      </p>
                      <p className="text-white/30 text-xs mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm mb-2">Fundraising Goal (SOL) *</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={formData.goal}
                        onChange={(e) => updateForm("goal", e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-emerald-500/50 transition-colors"
                        placeholder="5"
                        min="0.1"
                        step="0.1"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">SOL</span>
                    </div>
                    <p className="text-white/40 text-sm mt-2">
                      Recommended: 1-100 SOL for new campaigns
                    </p>
                  </div>

                  <div className="flex items-start gap-3 px-4 py-3 bg-[#d4a853]/10 border border-[#d4a853]/20 rounded-xl">
                    <Target className="h-5 w-5 text-[#d4a853] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">
                      You can adjust your goal later, but lowering it may affect donor confidence.
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Step 4: Review */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-5"
                >
                  <h3 className="text-xl font-semibold text-white">Review & Launch</h3>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-5">
                    <h4 className="font-semibold text-white">{formData.title || "Untitled Campaign"}</h4>
                    <p className="text-white/60 text-sm mt-1">
                      {categories.find((c) => c.id === formData.category)?.label || "No category"}
                    </p>
                    <p className="text-white/70 text-sm mt-3">{formData.description || "No description"}</p>
                    <div className="h-px bg-white/10 my-4" />
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Goal</span>
                      <span className="text-xl font-bold text-emerald-400">{formData.goal} SOL</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 px-4 py-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <Sparkles className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="text-amber-200/80 text-sm">
                      Once launched, your campaign cannot be deleted. You can only withdraw raised funds.
                    </span>
                  </div>

                  {error && (
                    <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
              {step > 1 ? (
                <button
                  onClick={prevStep}
                  className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/20 text-white rounded-xl hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              ) : (
                <Link
                  href="/campaigns"
                  className="px-5 py-3 text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </Link>
              )}

              {step < 4 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4a853] to-[#c46d46] text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isConnected}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#d4a853] to-[#c46d46] text-white font-medium rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4" />
                      <span>Launch Campaign</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}