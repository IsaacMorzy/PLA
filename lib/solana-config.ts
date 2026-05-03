import { PublicKey } from "@solana/web3.js";

export type SolanaCluster = "localnet" | "devnet" | "testnet" | "mainnet-beta";
export type ExplorerResource = "tx" | "address";

const DEFAULT_LOCALNET_RPC = "http://127.0.0.1:8899";
const DEFAULT_DEVNET_RPC = "https://api.devnet.solana.com";
const DEFAULT_TESTNET_RPC = "https://api.testnet.solana.com";
const DEFAULT_MAINNET_RPC = "https://api.mainnet-beta.solana.com";
const DEFAULT_PROGRAM_ID = "65VieGUg5tJEQDAHEgTLXqxVaKJWdQEnzAXyrdLuRt2K";

function normalizeCluster(value?: string | null): SolanaCluster {
  switch (value) {
    case "localnet":
    case "devnet":
    case "testnet":
    case "mainnet-beta":
      return value;
    case "mainnet":
      return "mainnet-beta";
    default:
      return "devnet";
  }
}

function defaultRpcUrl(cluster: SolanaCluster): string {
  switch (cluster) {
    case "localnet":
      return DEFAULT_LOCALNET_RPC;
    case "testnet":
      return DEFAULT_TESTNET_RPC;
    case "mainnet-beta":
      return DEFAULT_MAINNET_RPC;
    case "devnet":
    default:
      return DEFAULT_DEVNET_RPC;
  }
}

export const SOLANA_CLUSTER = normalizeCluster(process.env.NEXT_PUBLIC_SOLANA_CLUSTER);
export const SOLANA_RPC_URL =
  process.env.NEXT_PUBLIC_SOLANA_RPC ||
  process.env.NEXT_PUBLIC_HELIUS_URL ||
  defaultRpcUrl(SOLANA_CLUSTER);

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || DEFAULT_PROGRAM_ID
);

export function getExplorerUrl(resource: ExplorerResource, value: string): string {
  const path = `https://explorer.solana.com/${resource}/${value}`;

  switch (SOLANA_CLUSTER) {
    case "devnet":
      return `${path}?cluster=devnet`;
    case "testnet":
      return `${path}?cluster=testnet`;
    case "localnet":
      return `${path}?cluster=custom&customUrl=${encodeURIComponent(SOLANA_RPC_URL)}`;
    case "mainnet-beta":
    default:
      return path;
  }
}
