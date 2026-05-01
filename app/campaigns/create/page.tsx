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
import { createCampaignTx, solToLamports, getConnection as getRpcConnection, PROGRAM_ID } from "@/lib/peaceleague-client";
import Link from "next/link";
import { ArrowLeft, Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TokenInput } from "@/components/ui/token-input";
import { TransactionDialog } from "@/components/ui/transaction-dialog";
import { cn } from "@/lib/utils";

const campaignSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(64, "Title must be 64 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(512, "Description must be 512 characters or less"),
  imageUrl: z
    .string()
    .url("Invalid URL")
    .optional()
    .or(z.literal("")),
  goalSol: z
    .string()
    .min(1, "Goal is required")
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0.1;
    }, "Goal must be at least 0.1 SOL"),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

export default function CreateCampaignOnChainPage() {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const [mounted, setMounted] = useState(false);
  const [txSignature, setTxSignature] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pendingTransaction, setPendingTransaction] = useState<Transaction | null>(null);
  const [createdTitle, setCreatedTitle] = useState("");

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

      const { tx, campaignAddress } = await createCampaignTx(
        connection,
        publicKey,
        values.title,
        values.description,
        values.imageUrl || "https://images.unsplash.com/photo-1488521787991-ed7bbaa77390?w=800&h=600&fit=crop",
        goalLamports
      );

      const { blockhash } = await connection.getLatestBlockhash();
      tx.recentBlockhash = blockhash;
      tx.feePayer = publicKey;

      setPendingTransaction(tx);
      setCreatedTitle(values.title);
      setDialogOpen(true);
    } catch (err) {
      console.error("Error creating campaign:", err);
      form.setError("root", {
        message: err instanceof Error ? err.message : "Failed to create campaign",
      });
    }
  };

  const handleTransactionSuccess = (signature: string) => {
    setTxSignature(signature);
    setDialogOpen(false);
    form.reset();
  };

  if (!mounted) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="loading loading-spinner loading-lg"></div>
        </div>
      </main>
    );
  }

  if (txSignature) {
    return (
      <main className="min-h-screen pt-24 pb-12 px-4">
        <div className="max-w-xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 text-center"
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
              Your campaign "{createdTitle}" has been created on-chain.
            </p>
            <a
              href={`https://explorer.solana.com/tx/${txSignature}?cluster=custom&rpcUrl=http://127.0.0.1:8899`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d4a853] hover:underline text-sm mb-6 block"
            >
              View Transaction: {txSignature.slice(0, 32)}...
            </a>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/campaigns"
                className="px-6 py-3 bg-gradient-to-r from-[#d4a853] to-[#c46d46] text-white font-medium rounded-xl hover:opacity-90 transition-opacity"
              >
                View Campaigns
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-2xl mx-auto">
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
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-white font-display">Create Campaign</h1>
          <p className="text-white/60 mt-2">Launch your campaign on the Solana blockchain</p>
        </motion.div>

        {!connected && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.fadeInUp}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 text-center mb-6"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Connect Your Wallet</h3>
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
            className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6 sm:p-8"
          >
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
                      "w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#d4a853]/50 transition-colors resize-none",
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
                    <p className="text-xs text-red-400">
                      {form.formState.errors.imageUrl.message}
                    </p>
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
                    className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400"
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <span className="text-sm">{form.formState.errors.root.message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                variants={animations.fadeInUp}
                className="pt-2"
              >
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
                      <span>Create Campaign on Chain</span>
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-white/40 text-xs text-center">
                Program: {PROGRAM_ID.toString().slice(0, 16)}...
              </p>
            </form>
          </motion.div>
        )}
      </div>

      <TransactionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        transaction={pendingTransaction}
        onSuccess={handleTransactionSuccess}
        title="Create Campaign"
        description="Approve this transaction to create your campaign on Solana."
      />
    </main>
  );
}