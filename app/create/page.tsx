"use client";

import { useState } from "react";
import { WalletButton } from "@/components/wallet/wallet-button";
import { Heart, FileText, Target, ImageIcon, CheckCircle, ArrowRight, ArrowLeft, Upload, X } from "lucide-react";
import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { campaignCategories } from "@/lib/cosmic";

type Step = 1 | 2 | 3 | 4;

export default function CreateCampaignPage() {
  const [step, setStep] = useState<Step>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Wallet connection
  const { connection } = useConnection();
  const { publicKey, sendTransaction, signTransaction } = useWallet();
  const isConnected = !!publicKey;

  // Form data
  const [formData, setFormData] = useState({
    // Step 1: Wallet (handled by connection)
    // Step 2: Details
    title: "",
    slug: "",
    category: "",
    description: "",
    beneficiary_name: "",
    beneficiary_story: "",
    // Step 3: Media & Goal
    image: "",
    goal: "5",
  });

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Auto-generate slug from title
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
      case 1:
        return isConnected;
      case 2:
        return formData.title && formData.category && formData.description;
      case 3:
        return formData.goal && parseFloat(formData.goal) > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    if (!isConnected || !publicKey) return;

    setIsSubmitting(true);
    try {
      // TODO: Create campaign on Anchor program + Cosmic
      // For now, simulate submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsComplete(true);
    } catch (error) {
      console.error("Error creating campaign:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isComplete) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body items-center">
              <CheckCircle className="h-20 w-20 text-success" />
              <h2 className="card-title text-2xl mt-4">Campaign Created!</h2>
              <p className="text-muted-foreground">
                Your campaign "{formData.title}" is now live.
              </p>
              <div className="card-actions mt-4">
                <Link href={`/campaign/${formData.slug}`} className="btn btn-primary">
                  View Campaign
                </Link>
                <Link href="/dashboard" className="btn btn-outline">
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Start a Campaign</h1>
          <p className="text-muted-foreground mt-2">Create your fundraising campaign in minutes</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[
            { num: 1, icon: Heart, label: "Connect" },
            { num: 2, icon: FileText, label: "Details" },
            { num: 3, icon: Target, label: "Goal" },
            { num: 4, icon: CheckCircle, label: "Review" },
          ].map(({ num, icon: Icon, label }) => (
            <div key={num} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  step === num
                    ? "bg-success text-success-content"
                    : step > num
                    ? "bg-success/20 text-success"
                    : "bg-base-200 text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm hidden sm:inline">{label}</span>
              </div>
              {num < 4 && <div className="w-8 h-0.5 bg-base-200" />}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Step 1: Connect Wallet */}
            {step === 1 && (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold mb-4">Connect Your Wallet</h3>
                <p className="text-muted-foreground mb-8">
                  Connect your Solana wallet to create a campaign. This is where you'll receive donations.
                </p>
                <div className="flex flex-col items-center gap-4">
                  <WalletButton />
                  {isConnected && (
                    <div className="alert alert-success">
                      <CheckCircle className="h-5 w-5" />
                      <span>{`Wallet connected! ${publicKey.toString().slice(0, 8)}...`}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Campaign Details */}
            {step === 2 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Campaign Details</h3>

                <div className="form-control">
                  <label className="label"><span className="label-text">Campaign Title *</span></label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => updateForm("title", e.target.value)}
                    className="input input-bordered"
                    placeholder="e.g., Clean Water for Rural Village"
                  />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text">Category *</span></label>
                  <select
                    value={formData.category}
                    onChange={(e) => updateForm("category", e.target.value)}
                    className="select select-bordered"
                  >
                    <option value="">Select a category</option>
                    {campaignCategories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text">Short Description *</span></label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateForm("description", e.target.value)}
                    className="textarea textarea-bordered"
                    placeholder="Describe your cause in a few sentences..."
                    rows={3}
                  />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text">Beneficiary Name</span></label>
                  <input
                    type="text"
                    value={formData.beneficiary_name}
                    onChange={(e) => updateForm("beneficiary_name", e.target.value)}
                    className="input input-bordered"
                    placeholder="Who will receive the funds?"
                  />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text">Beneficiary Story</span></label>
                  <textarea
                    value={formData.beneficiary_story}
                    onChange={(e) => updateForm("beneficiary_story", e.target.value)}
                    className="textarea textarea-bordered"
                    placeholder="Tell the full story of who needs help..."
                    rows={5}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Media & Goal */}
            {step === 3 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Media & Goal</h3>

                <div className="form-control">
                  <label className="label"><span className="label-text">Campaign Image</span></label>
                  <div className="border-2 border-dashed border-base-300 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">
                      Drag and drop or click to upload
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 5MB
                    </p>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text">Fundraising Goal (SOL) *</span></label>
                  <input
                    type="number"
                    value={formData.goal}
                    onChange={(e) => updateForm("goal", e.target.value)}
                    className="input input-bordered"
                    placeholder="5"
                    min="0.1"
                    step="0.1"
                  />
                  <label className="label">
                    <span className="label-text-alt">Recommended: 1-100 SOL for new campaigns</span>
                  </label>
                </div>

                <div className="alert alert-info">
                  <Target className="h-5 w-5" />
                  <span>You can adjust your goal later, but lowering it may affect donor confidence.</span>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {step === 4 && (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Review & Launch</h3>

                <div className="card bg-base-200">
                  <div className="card-body">
                    <h4 className="font-semibold">{formData.title || "Untitled Campaign"}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {campaignCategories.find((c) => c.id === formData.category)?.label || "No category"}
                    </p>
                    <p className="text-sm mt-2">{formData.description || "No description"}</p>
                    <div className="divider" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goal</span>
                      <span className="font-bold">{formData.goal} SOL</span>
                    </div>
                  </div>
                </div>

                <div className="alert alert-warning">
                  <Target className="h-5 w-5" />
                  <span>Once launched, your campaign cannot be deleted. You can only cancel it.</span>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button onClick={prevStep} className="btn btn-outline gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>
              ) : (
                <Link href="/campaigns" className="btn btn-ghost">
                  Cancel
                </Link>
              )}

              {step < 4 ? (
                <button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="btn btn-primary gap-2"
                >
                  <span>Continue</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !isConnected}
                  className="btn btn-success gap-2"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner" />
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
        </div>
      </div>
    </main>
  );
}