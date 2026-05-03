import { createSolanaRpc } from "@solana/kit";
import { SOLANA_RPC_URL } from "@/lib/solana-config";

// RPC client singleton
let rpc: ReturnType<typeof createSolanaRpc> | null = null;

export function getSolanaRpc() {
  if (!rpc) {
    rpc = createSolanaRpc(SOLANA_RPC_URL);
  }
  return rpc;
}

// Helper: Convert lamports to SOL
export function lamportsToSol(lamports: number | bigint): number {
  return Number(lamports) / 1_000_000_000;
}

// Helper: Convert SOL to lamports
export function solToLamports(sol: number): bigint {
  return BigInt(Math.floor(sol * 1_000_000_000));
}

// Helper: Format SOL with 2 decimal places
export function formatSol(sol: number): string {
  return sol.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

// Helper: Get current slot
export async function getCurrentSlot() {
  const rpc = getSolanaRpc();
  const slot = await rpc.getSlot().send();
  return slot;
}

// Helper: Get recent blockhash
export async function getRecentBlockhash() {
  const rpc = getSolanaRpc();
  const blockhash = await rpc.getLatestBlockhash().send();
  return blockhash.value;
}