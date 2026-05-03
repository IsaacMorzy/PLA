"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Globe,
  Heart,
  MapPin,
  Clock,
  Users,
  Share2,
  AlertCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Transaction } from "@solana/web3.js";
import { campaignCategories } from "@/lib/cosmic";
import type { UnifiedCampaign } from "@/lib/campaigns";
import {
  getCampaign as getOnchainCampaign,
  donateToCampaignTx,
  solToLamports,
  type CampaignAccount,
} from "@/lib/peaceleague-client";
import { getExplorerUrl } from "@/lib/solana-config";
import * as animations from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { TokenBalance } from "@/components/ui/token-balance";
import { TokenInput } from "@/components/ui/token-input";
import { TransactionDialog } from "@/components/ui/transaction-dialog";
import { AddressDisplay } from "@/components/ui/address-display";

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl ${className}`}>
      {children}
    </div>
  );
}

interface CampaignClientProps {
  campaign: UnifiedCampaign;
}

const cmsSolToLamports = (amount?: number) => BigInt(Math.floor((amount ?? 0) * 1_000_000_000));

export default function CampaignClient({ campaign }: CampaignClientProps) {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();

  const [onchainCampaign, setOnchainCampaign] = useState<CampaignAccount | null>(campaign.onchain);
  const [donationAmount, setDonationAmount] = useState("1");
  const [amountError, setAmountError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [transactionOpen, setTransactionOpen] = useState(false);
  const [successSignature, setSuccessSignature] = useState<string | null>(null);

  const activeCampaignId = campaign.onchainCampaignId;
  const category = campaignCategories.find((c) => c.id === campaign.category);

  const goalLamports = useMemo(
    () => onchainCampaign?.goal ?? campaign.goalLamports ?? cmsSolToLamports(campaign.cosmic.metadata?.goal),
    [campaign.cosmic.metadata?.goal, campaign.goalLamports, onchainCampaign?.goal]
  );

  const raisedLamports = useMemo(
    () => onchainCampaign?.raised ?? campaign.raisedLamports ?? cmsSolToLamports(campaign.cosmic.metadata?.raised),
    [campaign.cosmic.metadata?.raised, campaign.raisedLamports, onchainCampaign?.raised]
  );

  const donorCount = onchainCampaign?.donatedCount ?? campaign.donorCount ?? campaign.cosmic.metadata?.donors ?? 0;
  const createdAt = onchainCampaign?.createdAt ?? campaign.createdAt;
  const isDeleted = onchainCampaign?.isDeleted ?? campaign.isDeleted ?? false;
  const progress = goalLamports > 0n ? Math.min(100, Number((raisedLamports * 10000n) / goalLamports) / 100) : 0;

  const refreshOnchainCampaign = async () => {
    if (activeCampaignId === undefined) return;
    const latest = await getOnchainCampaign(activeCampaignId);
    setOnchainCampaign(latest);
  };

  const validateAmount = (value: string): string | null => {
    const amount = Number.parseFloat(value);
    if (Number.isNaN(amount) || amount <= 0) return "Please enter a valid amount";
    if (amount < 0.001) return "Minimum donation is 0.001 SOL";
    return null;
  };

  const handleDonateClick = async () => {
    const error = validateAmount(donationAmount);
    if (error) {
      setAmountError(error);
      return;
    }

    if (activeCampaignId === undefined) {
      setAmountError("This campaign is not linked to an on-chain fundraiser yet.");
      return;
    }

    if (!connected || !publicKey) {
      setAmountError("Please connect your wallet first");
      return;
    }

    try {
      setAmountError(null);
      const { tx } = await donateToCampaignTx(
        connection,
        publicKey,
        activeCampaignId,
        solToLamports(Number.parseFloat(donationAmount))
      );

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      setTransaction(tx);
      setTransactionOpen(true);
    } catch (err) {
      console.error("Donation error:", err);
      setAmountError(err instanceof Error ? err.message : "Failed to prepare donation transaction");
    }
  };

  const handleTransactionSuccess = async (signature: string) => {
    setSuccessSignature(signature);
    await refreshOnchainCampaign();
  };

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Campaigns</span>
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial="hidden" animate="visible" variants={animations.fadeInUp}>
              <div className="aspect-video relative rounded-2xl overflow-hidden bg-white/5">
                {campaign.image ? (
                  <Image src={campaign.image} alt={campaign.title} fill className="object-cover" priority />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Globe className="h-20 w-20 text-white/30" />
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={animations.fadeInUp}
              transition={{ delay: 0.1 }}
            >
              {category && (
                <span className="badge badge-lg bg-white/10 border-white/30 text-white mb-3">
                  {category.icon} {category.label}
                </span>
              )}
              <h1 className="text-3xl font-bold text-white mt-2 font-display">{campaign.title}</h1>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-white/60">
                {campaign.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{campaign.location}</span>
                  </div>
                )}
                {createdAt && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Created {new Date(Number(createdAt) * 1000).toLocaleDateString()}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{donorCount} donors</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={animations.fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-white">The Story</h2>
              <div className="text-white/70 whitespace-pre-wrap mt-2 leading-relaxed">
                {campaign.beneficiaryStory || campaign.description || "No story available yet."}
              </div>
            </motion.div>

            {campaign.beneficiaryName && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={animations.fadeInUp}
                transition={{ delay: 0.3 }}
              >
                <GlassCard className="p-4">
                  <h3 className="font-semibold text-white mb-2">Beneficiary</h3>
                  <p className="text-white/70">{campaign.beneficiaryName}</p>
                </GlassCard>
              </motion.div>
            )}
          </div>

          <div className="space-y-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={animations.fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <GlassCard className="sticky top-24 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Support This Cause</h3>

                <div className="space-y-3">
                  <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#d4a853] to-[#c46d46] rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Raised</p>
                      <div className="font-bold text-[#d4a853]">
                        <TokenBalance amount={raisedLamports} decimals={9} symbol="SOL" />
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-sm">Goal</p>
                      <div className="text-white/80">
                        <TokenBalance amount={goalLamports} decimals={9} symbol="SOL" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-white/40">{progress.toFixed(2)}% funded</p>
                </div>

                {isDeleted && (
                  <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                    This campaign has been closed and no longer accepts donations.
                  </div>
                )}

                {activeCampaignId === undefined && (
                  <div className="mt-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
                    This page is live in Cosmic, but it is not linked to an on-chain campaign yet.
                  </div>
                )}

                {!connected ? (
                  <div className="text-center py-6 space-y-4 mt-4">
                    <p className="text-white/60">Connect your wallet to donate</p>
                    <WalletMultiButton className="!bg-gradient-to-r !from-[#d4a853] !to-[#c46d46] !text-black !w-full !h-12 !font-medium" />
                  </div>
                ) : (
                  <div className="space-y-4 mt-6">
                    <TokenInput
                      value={donationAmount}
                      onChange={(value) => {
                        setDonationAmount(value);
                        setAmountError(null);
                      }}
                      decimals={9}
                      symbol="SOL"
                      label="Donation Amount"
                      error={amountError || undefined}
                    />

                    {successSignature && (
                      <div className="px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <p className="text-green-400 font-medium mb-2">Thank you for your donation!</p>
                        <AddressDisplay
                          address={successSignature}
                          truncate
                          showExplorer
                          explorerHref={getExplorerUrl("tx", successSignature)}
                        />
                      </div>
                    )}

                    <Button
                      onClick={handleDonateClick}
                      disabled={isDeleted || activeCampaignId === undefined}
                      className="w-full h-12 text-base font-medium"
                      variant="glow"
                    >
                      <Heart className="h-5 w-5" />
                      Donate SOL
                    </Button>
                  </div>
                )}

                <div className="flex gap-2 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-white/20 text-white hover:bg-white/10"
                    onClick={async () => {
                      await navigator.clipboard.writeText(window.location.href);
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm">
                  {activeCampaignId !== undefined && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Campaign ID</span>
                      <span className="text-white/80 font-mono">#{activeCampaignId}</span>
                    </div>
                  )}
                  {campaign.authorWallet && (
                    <div className="flex justify-between items-center gap-3">
                      <span className="text-white/60">Organizer</span>
                      <AddressDisplay address={campaign.authorWallet} truncate className="text-white/80" />
                    </div>
                  )}
                </div>

                {amountError && activeCampaignId === undefined && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                    <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>{amountError}</span>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>

      <TransactionDialog
        open={transactionOpen}
        onOpenChange={setTransactionOpen}
        transaction={transaction}
        onSuccess={handleTransactionSuccess}
        title="Confirm Donation"
        description={`Donate ${donationAmount} SOL to support this campaign`}
      />
    </main>
  );
}
