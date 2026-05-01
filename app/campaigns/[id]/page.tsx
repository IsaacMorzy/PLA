"use client";

import { useState, useEffect, use } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Transaction } from "@solana/web3.js";
import { motion } from "framer-motion";
import * as animations from "@/lib/animations";
import { 
  getCampaign, 
  solToLamports, 
  donateToCampaignTx,
  CampaignAccount 
} from "@/lib/peaceleague-client";
import Link from "next/link";
import { ArrowLeft, Heart, Users, Clock } from "lucide-react";
import { TokenBalance } from "@/components/ui/token-balance";
import { TokenInput } from "@/components/ui/token-input";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { TransactionDialog } from "@/components/ui/transaction-dialog";
import { AddressDisplay } from "@/components/ui/address-display";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CampaignDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const campaignId = parseInt(id, 10);
  
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [campaign, setCampaign] = useState<CampaignAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [donateAmount, setDonateAmount] = useState("0.5");
  const [amountError, setAmountError] = useState<string | null>(null);
  
  const [txDialogOpen, setTxDialogOpen] = useState(false);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [successSignature, setSuccessSignature] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    loadCampaign();
  }, [campaignId]);

  const loadCampaign = async () => {
    try {
      const campaignData = await getCampaign(campaignId);
      setCampaign(campaignData);
    } catch (err) {
      console.error("Error loading campaign:", err);
    } finally {
      setLoading(false);
    }
  };

  const validateAmount = (value: string): string | null => {
    const amount = parseFloat(value);
    if (isNaN(amount) || amount <= 0) {
      return "Please enter a valid amount";
    }
    if (amount < 0.001) {
      return "Minimum donation is 0.001 SOL";
    }
    return null;
  };

  const handleDonateClick = async () => {
    const error = validateAmount(donateAmount);
    if (error) {
      setAmountError(error);
      return;
    }

    if (!connected || !publicKey || !connection) {
      setAmountError("Please connect your wallet to donate");
      return;
    }

    setAmountError(null);

    try {
      const amountLamports = solToLamports(parseFloat(donateAmount));
      
      const { tx } = await donateToCampaignTx(
        connection,
        publicKey,
        campaignId,
        amountLamports
      );

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      setTransaction(tx);
      setTxDialogOpen(true);
    } catch (err) {
      console.error("Error preparing transaction:", err);
      setAmountError(err instanceof Error ? err.message : "Failed to prepare transaction");
    }
  };

  const handleTxSuccess = async (signature: string) => {
    setSuccessSignature(signature);
    await loadCampaign();
  };

  const resetDonation = () => {
    setTransaction(null);
    setSuccessSignature(null);
    setDonateAmount("0.5");
    setAmountError(null);
  };

  if (!mounted) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back link skeleton */}
          <Skeleton className="h-6 w-24 rounded" />
          
          <GlassCard className="p-8 space-y-6">
            {/* Image skeleton */}
            <Skeleton variant="card" className="h-80 w-full" />
            
            {/* Title & meta */}
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4 rounded-lg" />
              <div className="flex gap-4">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-5 w-24 rounded" />
              </div>
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>
          </GlassCard>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-6 w-24 rounded" />
          
          <GlassCard className="p-8 space-y-6">
            <Skeleton variant="card" className="h-80 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-10 w-3/4 rounded-lg" />
              <div className="flex gap-4">
                <Skeleton className="h-5 w-32 rounded" />
                <Skeleton className="h-5 w-24 rounded" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-2/3 rounded" />
            </div>
          </GlassCard>
        </div>
      </main>
    );
  }

  if (!campaign) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
          >
            <Link
              href="/campaigns"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Campaigns
            </Link>
          </motion.div>
          <GlassCard className="text-center py-12">
            <h2 className="text-2xl font-bold text-white mb-2">Campaign Not Found</h2>
            <p className="text-white/60">This campaign may not exist or has been removed.</p>
          </GlassCard>
        </div>
      </main>
    );
  }

  const progress = Number(campaign.goal) > 0 
    ? (Number(campaign.raised) / Number(campaign.goal)) * 100 
    : 0;

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.fadeInUp}
          className="mb-6"
        >
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Campaigns
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.fadeInUp}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
            {campaign.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-white/60">
            <span className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {campaign.donatedCount} donors
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Created {new Date(Number(campaign.createdAt) * 1000).toLocaleDateString()}
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={animations.staggerContainer}
            >
              <GlassCard variant="gradient" className="overflow-hidden">
                <div className="relative h-72 w-full bg-gradient-to-br from-white/[0.05] to-white/[0.02]">
                  {campaign.imageUrl ? (
                    <img
                      src={campaign.imageUrl}
                      alt={campaign.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Heart className="w-16 h-16 text-white/20" />
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <h2 className="text-xl font-semibold text-white mb-4">About this campaign</h2>
                  <p className="text-white/70 whitespace-pre-wrap leading-relaxed">
                    {campaign.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={animations.fadeInUp}
              className="sticky top-24"
            >
              <GlassCard variant="gold" className="p-6">
                <div className="mb-6">
                  <div className="flex justify-between items-baseline mb-3">
                    <div>
                      <span className="text-white/60 text-sm">Raised</span>
                      <div className="text-2xl font-bold text-white">
                        <TokenBalance amount={campaign.raised} decimals={9} symbol="SOL" size="lg" />
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-white/60 text-sm">Goal</span>
                      <div className="text-lg text-white/80">
                        <TokenBalance amount={campaign.goal} decimals={9} symbol="SOL" />
                      </div>
                    </div>
                  </div>
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#d4a853] to-[#c46d46] rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, progress)}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                  <p className="text-white/50 text-sm mt-2">
                    {progress.toFixed(1)}% funded
                  </p>
                </div>

                {!connected ? (
                  <div className="text-center py-6 space-y-4">
                    <p className="text-white/60">Connect your wallet to donate</p>
                    <WalletMultiButton className="!bg-gradient-to-r !from-[#d4a853] !to-[#c46d46] !text-black !w-full !h-12 !font-medium" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <TokenInput
                      value={donateAmount}
                      onChange={(value) => {
                        setDonateAmount(value);
                        setAmountError(null);
                      }}
                      decimals={9}
                      symbol="SOL"
                      label="Donation Amount"
                      error={amountError || undefined}
                    />

                    {successSignature && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl"
                      >
                        <p className="text-green-400 font-medium mb-2">Thank you for your donation!</p>
                        <AddressDisplay
                          address={successSignature}
                          truncate
                          showExplorer
                          explorerUrl="https://explorer.solana.com/tx"
                        />
                      </motion.div>
                    )}

                    <Button
                      onClick={handleDonateClick}
                      disabled={!connected}
                      className="w-full h-12 text-base font-medium"
                      variant="glow"
                    >
                      <Heart className="h-5 w-5" />
                      Donate SOL
                    </Button>
                  </div>
                )}

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/60">Campaign ID</span>
                    <span className="text-white/80 font-mono">#{campaign.campaignId.toString()}</span>
                  </div>
                  <div className="flex justify-between text-sm items-center">
                    <span className="text-white/60">Organizer</span>
                    <AddressDisplay
                      address={campaign.author.toString()}
                      truncate
                      className="text-white/80"
                    />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>

        <TransactionDialog
          open={txDialogOpen}
          onOpenChange={(open) => {
            setTxDialogOpen(open);
            if (!open) {
              resetDonation();
            }
          }}
          transaction={transaction}
          onSuccess={handleTxSuccess}
          title="Confirm Donation"
          description={`Donate ${donateAmount} SOL to support this campaign`}
        />
      </div>
    </main>
  );
}