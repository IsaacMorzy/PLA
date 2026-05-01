"use client";

import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, CheckCircle, XCircle, ExternalLink } from "lucide-react";

type TxState = "idle" | "signing" | "confirming" | "success" | "error";

interface TransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  onSuccess?: (signature: string) => void;
  title?: string;
  description?: string;
}

export function TransactionDialog({
  open,
  onOpenChange,
  transaction,
  onSuccess,
  title = "Confirm Transaction",
  description = "Please approve the transaction in your wallet.",
}: TransactionDialogProps) {
  const { connection } = useConnection();
  const { sendTransaction } = useWallet();
  const [state, setState] = useState<TxState>("idle");
  const [signature, setSignature] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!transaction) return;

    try {
      setState("signing");
      const sig = await sendTransaction(transaction, connection);
      setSignature(sig);

      setState("confirming");
      await connection.confirmTransaction(sig, "confirmed");

      setState("success");
      onSuccess?.(sig);
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Transaction failed");
    }
  };

  const handleClose = () => {
    if (state === "signing" || state === "confirming") return;
    setState("idle");
    setSignature(null);
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-[#1a1815] border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-white/60">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6">
          <AnimatePresence mode="wait">
            {state === "idle" && (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-white/60"
              >
                Review the transaction details before confirming.
              </motion.div>
            )}

            {state === "signing" && (
              <motion.div
                key="signing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-4"
              >
                <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
                <p className="text-sm text-white/60">
                  Waiting for wallet approval...
                </p>
              </motion.div>
            )}

            {state === "confirming" && (
              <motion.div
                key="confirming"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center gap-4"
              >
                <Loader2 className="h-8 w-8 animate-spin text-brand-gold" />
                <p className="text-sm text-white/60">
                  Confirming on Solana...
                </p>
              </motion.div>
            )}

            {state === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <CheckCircle className="h-12 w-12 text-green-500" />
                </motion.div>
                <p className="font-medium text-white">Transaction Confirmed!</p>
                {signature && (
                  <a
                    href={`https://explorer.solana.com/tx/${signature}?cluster=custom&rpcUrl=http://127.0.0.1:8899`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm text-brand-gold hover:underline"
                  >
                    View on Solana Explorer
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </motion.div>
            )}

            {state === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                <XCircle className="h-12 w-12 text-red-500" />
                <p className="font-medium text-white">Transaction Failed</p>
                <p className="text-sm text-white/60 text-center">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter>
          {state === "idle" && (
            <>
              <Button variant="outline" onClick={handleClose} className="border-white/20 text-white hover:bg-white/10">
                Cancel
              </Button>
              <Button onClick={handleConfirm} className="bg-brand-gold text-[#1a1815] hover:bg-brand-gold-light">
                Confirm
              </Button>
            </>
          )}
          {(state === "success" || state === "error") && (
            <Button onClick={handleClose} className="bg-brand-gold text-[#1a1815] hover:bg-brand-gold-light">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}