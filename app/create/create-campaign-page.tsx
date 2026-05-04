"use client";

import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Transaction } from "@solana/web3.js";
import { motion, AnimatePresence } from "framer-motion";
import * as animations from "@/lib/animations";
import { createCampaignTx, solToLamports, PROGRAM_ID } from "@/lib/peaceleague-client";
import { getExplorerUrl, SOLANA_CLUSTER } from "@/lib/solana-config";
import { createCampaignAction } from "@/lib/actions-client";
import Link from "next/link";
import { ArrowLeft, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenInput } from "@/components/ui/token-input";
import { TransactionDialog } from "@/components/ui/transaction-dialog";
import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { PageHero, PageShell, SectionBlock, SitePage } from "@/components/site/page-shell";

const campaignSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(64, "Title must be 64 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(512, "Description must be 512 characters or less"),
  imageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
  goalSol: z
    .string()
    .min(1, "Goal is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 1;
    }, "Goal must be at least 1 SOL"),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

interface PendingCampaignRecord {
  title: string;
  slug: string;
  description: string;
  image: string;
  goal: number;
  onchainCampaignId: number;
  campaignPda: string;
  authorWallet: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CreateCampaignPage() {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<Transaction | null>(null);
  const [createdTitle, setCreatedTitle] = useState("");
  const [createdSlug, setCreatedSlug] = useState<string | null>(null);
  const [pendingCampaignRecord, setPendingCampaignRecord] = useState<PendingCampaignRecord | null>(null);

  const form = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
      goalSol: "5",
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (values: CampaignFormValues) => {
    if (!connected || !publicKey || !connection) {
      form.setError("root", { message: "Please connect your wallet first" });
      return;
    }

    try {
      const goalLamports = solToLamports(parseFloat(values.goalSol) || 5);
      const image =
        values.imageUrl ||
        "https://images.unsplash.com/photo-1488521787991-ed7bbaa77390?w=800&h=600&fit=crop";
      const slug = slugify(values.title);

      const { tx, campaignAddress, campaignId } = await createCampaignTx(
        connection,
        publicKey,
        values.title,
        values.description,
        image,
        goalLamports
      );

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      setPendingTransaction(tx);
      setCreatedTitle(values.title);
      setPendingCampaignRecord({
        title: values.title,
        slug,
        description: values.description,
        image,
        goal: Number.parseFloat(values.goalSol) || 5,
        onchainCampaignId: campaignId,
        campaignPda: campaignAddress.toBase58(),
        authorWallet: publicKey.toBase58(),
      });
      setDialogOpen(true);
    } catch (err) {
      console.error("Error creating campaign:", err);
      form.setError("root", {
        message: err instanceof Error ? err.message : "Failed to create campaign",
      });
    }
  };

  const handleTransactionSuccess = async (signature: string) => {
    try {
      if (!pendingCampaignRecord) {
        throw new Error("Missing campaign metadata for Cosmic sync");
      }

      const result = await createCampaignAction({
        title: pendingCampaignRecord.title,
        slug: pendingCampaignRecord.slug,
        description: pendingCampaignRecord.description,
        image: pendingCampaignRecord.image,
        goal: pendingCampaignRecord.goal,
        category: "community",
        location: "",
        onchain_campaign_id: pendingCampaignRecord.onchainCampaignId,
        campaign_pda: pendingCampaignRecord.campaignPda,
        author_wallet: pendingCampaignRecord.authorWallet,
        tx_signature: signature,
        cluster: SOLANA_CLUSTER,
      });

      if (!result.success) {
        throw new Error(result.error || "Failed to save campaign metadata");
      }

      setCreatedSlug(pendingCampaignRecord.slug);
      setTxSignature(signature);
      setDialogOpen(false);
      setPendingCampaignRecord(null);
      form.reset();
    } catch (err) {
      console.error("Error syncing campaign metadata:", err);
      form.setError("root", {
        message: err instanceof Error ? err.message : "Campaign created on-chain but CMS sync failed",
      });
      setDialogOpen(false);
    }
  };

  if (!mounted) {
    return (
      <SitePage>
        <PageShell className="max-w-3xl space-y-6">
          <Skeleton className="h-6 w-20 rounded" />
          <GlassCard className="space-y-6 rounded-[2rem] border border-white/10 bg-white/[0.045] p-8">
            <Skeleton className="h-9 w-48 rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-5 w-24 rounded" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-5 w-32 rounded" />
              <Skeleton className="h-24 w-full rounded-lg" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
            <Skeleton className="h-12 w-full rounded-full" />
          </GlassCard>
        </PageShell>
      </SitePage>
    );
  }

  if (txSignature) {
    return (
      <SitePage>
        <PageShell className="max-w-3xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
            className="rounded-[2.2rem] border border-white/[0.08] bg-white/[0.03] p-8 text-center backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#d4a853] to-[#c46d46] flex items-center justify-center mb-4"
            >
              <Send className="h-10 w-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Campaign Created!</h2>
            <p className="text-white/60 mb-6">
              Your campaign "{createdTitle}" is now live on-chain and synced to the public campaign directory.
            </p>
            <a
              href={getExplorerUrl("tx", txSignature)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4a853] hover:underline text-sm mb-6 block"
            >
              View Transaction: {txSignature.slice(0, 32)}...
            </a>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={createdSlug ? `/campaign/${createdSlug}` : "/campaigns"}
                className="rounded-full bg-gradient-to-r from-[#d4a853] to-[#c46d46] px-6 py-3 text-white font-medium transition-opacity hover:opacity-90"
              >
                View live campaign
              </Link>
              <Link
                href="/campaigns"
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white font-medium transition-colors hover:bg-white/20"
              >
                Browse all campaigns
              </Link>
            </div>
          </motion.div>
        </PageShell>
      </SitePage>
    );
  }

  return (
    <SitePage>
      <PageShell className="max-w-3xl">
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

        <PageHero
          eyebrow="Create campaign"
          title={
            <>
              Launch a cause with
              <span className="block text-[#f1ddab]">clear structure and instant credibility.</span>
            </>
          }
          description="This creation flow now sits inside the same premium system as the rest of the site — focused, calm, and built to help organizers move from idea to launch with less friction."
          align="left"
        />

        {!connected && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
            className="mt-8 rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-8 text-center backdrop-blur-xl"
          >
            <h3 className="mb-4 text-xl font-semibold text-white">Connect wallet to continue</h3>
            <p className="text-white/60 mb-6">
              Connect your Solana wallet to create a campaign on-chain.
            </p>
            <WalletMultiButton className="!bg-[#d4a853] !text-black hover:!bg-[#c46d46] !border-none !mx-auto" />
          </motion.div>
        )}

        {connected && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
            className="mt-8 rounded-[2rem] border border-white/[0.08] bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8"
          >
            <SectionBlock className="mt-0">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <motion.div
                variants={animations.staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={animations.fadeInUp} className="space-y-2">
                  <Label htmlFor="title">Campaign Title *</Label>
                  <Input
                    id="title"
                    placeholder="Clean Water for Rural Village"
                    {...form.register("title")}
                    className={cn(
                      form.formState.errors.title && "border-red-500/50 focus:ring-red-500/50"
                    )}
                  />
                  <div className="flex justify-between text-xs text-white/40">
                    <span className={form.formState.errors.title ? "text-red-400" : ""}>
                      {form.formState.errors.title?.message}
                    </span>
                    <span>{form.watch("title").length}/64</span>
                  </div>
                </motion.div>

                <motion.div variants={animations.fadeInUp} className="space-y-2 mt-4">
                  <Label htmlFor="description">Description *</Label>
                  <textarea
                    id="description"
                    placeholder="Describe your cause and how the funds will be used..."
                    {...form.register("description")}
                    rows={4}
                    className={cn(
                      "w-full rounded-[1rem] border border-white/20 bg-white/5 px-4 py-3 text-white placeholder-white/30 transition-colors resize-none focus:outline-none focus:border-[#d4a853]/50",
                      form.formState.errors.description && "border-red-500/50 focus:ring-red-500/50"
                    )}
                  />
                  <div className="flex justify-between text-xs text-white/40">
                    <span className={form.formState.errors.description ? "text-red-400" : ""}>
                      {form.formState.errors.description?.message}
                    </span>
                    <span>{form.watch("description").length}/512</span>
                  </div>
                </motion.div>

                <motion.div variants={animations.fadeInUp} className="space-y-2 mt-4">
                  <Label htmlFor="imageUrl">Image URL (optional)</Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    {...form.register("imageUrl")}
                    className={cn(
                      form.formState.errors.imageUrl && "border-red-500/50 focus:ring-red-500/50"
                    )}
                  />
                  {form.formState.errors.imageUrl && (
                    <p className="text-xs text-red-400">{form.formState.errors.imageUrl.message}</p>
                  )}
                </motion.div>

                <motion.div variants={animations.fadeInUp} className="mt-4">
                  <TokenInput
                    label="Fundraising Goal (SOL) *"
                    value={form.watch("goalSol")}
                    onChange={(value) => form.setValue("goalSol", value)}
                    error={form.formState.errors.goalSol?.message}
                    symbol="SOL"
                    decimals={9}
                  />
                </motion.div>
              </motion.div>

              <AnimatePresence mode="wait">
                {form.formState.errors.root && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 rounded-[1rem] border border-red-500/20 bg-red-500/10 px-4 py-3 text-red-400"
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{form.formState.errors.root.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div variants={animations.fadeInUp} className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-12 text-base"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Creating Campaign...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Launch campaign on-chain</span>
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-white/40 text-xs text-center">
                Program: {PROGRAM_ID.toString().slice(0, 16)}...
              </p>
            </form>
            </SectionBlock>
          </motion.div>
        )}
      </PageShell>

      <TransactionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        transaction={pendingTransaction}
        onSuccess={handleTransactionSuccess}
        title="Launch Campaign"
        description="Approve this transaction to create your campaign on Solana."
      />
    </SitePage>
  );
}
