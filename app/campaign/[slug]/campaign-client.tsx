"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  Clock,
  Globe,
  Heart,
  MapPin,
  Share2,
  Shield,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Transaction } from "@solana/web3.js";
import { campaignCategories } from "@/lib/cosmic";
import type { UnifiedCampaign } from "@/lib/campaigns";
import {
  donateToCampaignTx,
  getCampaign as getOnchainCampaign,
  solToLamports,
  type CampaignAccount,
} from "@/lib/peaceleague-client";
import { getExplorerUrl } from "@/lib/solana-config";
import * as animations from "@/lib/animations";
import { AddressDisplay } from "@/components/ui/address-display";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/glass-card";
import { TokenBalance } from "@/components/ui/token-balance";
import { TokenInput } from "@/components/ui/token-input";
import { TransactionDialog } from "@/components/ui/transaction-dialog";
import { PageShell, SectionBlock, SitePage } from "@/components/site/page-shell";

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
  const category = campaignCategories.find((item) => item.id === campaign.category);

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
    } catch (error) {
      console.error("Donation error:", error);
      setAmountError(error instanceof Error ? error.message : "Failed to prepare donation transaction");
    }
  };

  const handleTransactionSuccess = async (signature: string) => {
    setSuccessSignature(signature);
    await refreshOnchainCampaign();
  };

  return (
    <SitePage>
      <PageShell>
        <div className="mb-6">
          <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm text-white/62 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to campaigns
          </Link>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-start">
          <div className="space-y-8">
            <motion.section initial="hidden" animate="visible" variants={animations.fadeInUp}>
              <div className="relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] shadow-[0_28px_90px_rgba(0,0,0,0.32)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0f0c09]">
                  {campaign.image ? (
                    <Image
                      src={campaign.image}
                      alt={campaign.title}
                      fill
                      unoptimized
                      priority
                      sizes="(max-width: 1280px) 100vw, 60vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.26),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(196,109,70,0.18),transparent_28%),linear-gradient(160deg,#16110d,#0f0b08)]">
                      <Globe className="h-20 w-20 text-white/25" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,6,0.08),rgba(10,8,6,0.68))]" />
                </div>

                <div className="relative p-6 sm:p-8 lg:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    {category ? (
                      <span className="rounded-full border border-[#d4a853]/25 bg-[#d4a853]/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[#f1ddab]">
                        {category.icon} {category.label}
                      </span>
                    ) : null}
                    {campaign.location ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.22em] text-white/55">
                        <MapPin className="h-3.5 w-3.5 text-[#d4a853]" />
                        {campaign.location}
                      </span>
                    ) : null}
                  </div>

                  <h1 className="mt-6 max-w-4xl font-display text-[2.7rem] leading-[0.96] text-white sm:text-[3.5rem] lg:text-[4.5rem]">
                    {campaign.title}
                  </h1>

                  <p className="mt-6 max-w-3xl text-base leading-8 text-white/66 sm:text-lg">
                    {campaign.description || campaign.beneficiaryStory || "A verified campaign working toward meaningful community impact across Africa."}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    <MetaPill label="Donors" value={`${donorCount}`} icon={<Users className="h-4 w-4 text-[#d4a853]" />} />
                    <MetaPill
                      label="Created"
                      value={createdAt ? new Date(Number(createdAt) * 1000).toLocaleDateString() : "Recently"}
                      icon={<Clock className="h-4 w-4 text-[#d4a853]" />}
                    />
                    <MetaPill label="Status" value={isDeleted ? "Closed" : "Active"} icon={<Shield className="h-4 w-4 text-[#d4a853]" />} />
                  </div>
                </div>
              </div>
            </motion.section>

            <SectionBlock className="mt-0 grid gap-6 lg:grid-cols-[1fr_0.78fr]">
              <motion.div initial="hidden" animate="visible" variants={animations.fadeInUp} transition={{ delay: 0.08 }}>
                <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 sm:p-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#d4a853]">The story</p>
                  <div className="mt-6 whitespace-pre-wrap text-base leading-8 text-white/70">
                    {campaign.beneficiaryStory || campaign.description || "No story available yet."}
                  </div>
                </Card>
              </motion.div>

              <motion.div initial="hidden" animate="visible" variants={animations.fadeInUp} transition={{ delay: 0.14 }}>
                <Card className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(212,168,83,0.12),rgba(255,255,255,0.03))] p-7 sm:p-8">
                  <p className="text-sm uppercase tracking-[0.3em] text-[#d4a853]">Campaign profile</p>
                  <div className="mt-6 space-y-5 text-sm text-white/68">
                    {campaign.beneficiaryName ? (
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">Beneficiary</p>
                        <p className="mt-2 text-base text-white">{campaign.beneficiaryName}</p>
                      </div>
                    ) : null}
                    {activeCampaignId !== undefined ? (
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">Campaign ID</p>
                        <p className="mt-2 font-mono text-white">#{activeCampaignId}</p>
                      </div>
                    ) : null}
                    {campaign.authorWallet ? (
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">Organizer wallet</p>
                        <div className="mt-2 text-white">
                          <AddressDisplay address={campaign.authorWallet} truncate className="text-white/82" />
                        </div>
                      </div>
                    ) : null}
                    <div className="rounded-[1.4rem] border border-white/10 bg-black/20 p-4">
                      <p className="text-sm leading-7 text-white/64">
                        This page is designed to give donors a clearer read on urgency, legitimacy, and progress before they decide to contribute.
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </SectionBlock>
          </div>

          <motion.aside initial="hidden" animate="visible" variants={animations.fadeInUp} transition={{ delay: 0.12 }}>
            <Card className="sticky top-28 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 shadow-[0_24px_80px_rgba(0,0,0,0.24)]">
              <p className="text-sm uppercase tracking-[0.3em] text-[#d4a853]">Support this cause</p>
              <h2 className="mt-4 text-3xl font-semibold text-white">Make the impact visible.</h2>

              <div className="mt-7 space-y-4">
                <div className="h-3 rounded-full bg-white/8">
                  <div
                    className="h-3 rounded-full bg-[linear-gradient(90deg,#d4a853,#e6c87d,#c46d46)] transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <MetricBox
                    label="Raised"
                    value={<TokenBalance amount={raisedLamports} decimals={9} symbol="SOL" />}
                    highlight
                  />
                  <MetricBox label="Goal" value={<TokenBalance amount={goalLamports} decimals={9} symbol="SOL" />} />
                </div>
                <p className="text-xs uppercase tracking-[0.22em] text-white/36">{progress.toFixed(2)}% funded</p>
              </div>

              {isDeleted ? (
                <div className="mt-5 rounded-[1.25rem] border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
                  This campaign has been closed and is no longer accepting donations.
                </div>
              ) : null}

              {activeCampaignId === undefined ? (
                <div className="mt-5 rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/66">
                  This page exists in Cosmic, but it is not linked to an on-chain fundraiser yet.
                </div>
              ) : null}

              {!connected ? (
                <div className="mt-7 space-y-4 text-center">
                  <p className="text-sm text-white/60">Connect your wallet to donate</p>
                  <WalletMultiButton className="!h-12 !w-full !rounded-full !border-none !bg-gradient-to-r !from-[#d4a853] !to-[#c46d46] !text-black !font-medium" />
                </div>
              ) : (
                <div className="mt-7 space-y-4">
                  <TokenInput
                    value={donationAmount}
                    onChange={(value) => {
                      setDonationAmount(value);
                      setAmountError(null);
                    }}
                    decimals={9}
                    symbol="SOL"
                    label="Donation amount"
                    error={amountError || undefined}
                  />

                  {successSignature ? (
                    <div className="rounded-[1.25rem] border border-green-500/20 bg-green-500/10 px-4 py-3">
                      <p className="font-medium text-green-400">Thank you for your donation</p>
                      <div className="mt-2">
                        <AddressDisplay
                          address={successSignature}
                          truncate
                          showExplorer
                          explorerHref={getExplorerUrl("tx", successSignature)}
                        />
                      </div>
                    </div>
                  ) : null}

                  <Button onClick={handleDonateClick} disabled={isDeleted || activeCampaignId === undefined} className="h-12 w-full text-base font-medium" variant="glow">
                    <Heart className="h-5 w-5" />
                    Donate SOL
                  </Button>
                </div>
              )}

              <div className="mt-5 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 flex-1 border-white/15 text-white hover:bg-white/10"
                  onClick={async () => {
                    await navigator.clipboard.writeText(window.location.href);
                  }}
                >
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
              </div>

              {amountError && activeCampaignId === undefined ? (
                <div className="mt-4 flex items-start gap-2 rounded-[1.25rem] border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{amountError}</span>
                </div>
              ) : null}
            </Card>
          </motion.aside>
        </div>
      </PageShell>

      <TransactionDialog
        open={transactionOpen}
        onOpenChange={setTransactionOpen}
        transaction={transaction}
        onSuccess={handleTransactionSuccess}
        title="Confirm Donation"
        description={`Donate ${donationAmount} SOL to support this campaign`}
      />
    </SitePage>
  );
}

function MetaPill({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-black/20 px-4 py-3">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/38">
        {icon}
        {label}
      </div>
      <p className="mt-3 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function MetricBox({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-[1.3rem] border border-white/10 bg-black/20 px-4 py-4">
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/36">{label}</p>
      <div className={`mt-3 text-sm font-medium ${highlight ? "text-[#f1ddab]" : "text-white"}`}>{value}</div>
    </div>
  );
}
