"use client";

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { cn } from "@/lib/utils";

interface TokenBalanceProps {
  amount: number | bigint;
  decimals?: number;
  symbol?: string;
  showSymbol?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function TokenBalance({
  amount,
  decimals = 9,
  symbol = "SOL",
  showSymbol = true,
  className,
  size = "md",
}: TokenBalanceProps) {
  const formatBalance = (amt: number | bigint, dec: number): string => {
    const value = Number(amt) / Math.pow(10, dec);

    if (value === 0) return "0";
    if (value < 0.0001) return "<0.0001";
    if (value < 1) return value.toFixed(4);
    if (value < 1000) return value.toFixed(2);
    if (value < 1_000_000) return `${(value / 1000).toFixed(1)}K`;
    return `${(value / 1_000_000).toFixed(2)}M`;
  };

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl font-semibold",
  };

  return (
    <span className={cn("tabular-nums tracking-tight", sizeClasses[size], className)}>
      {formatBalance(amount, decimals)}
      {showSymbol && (
        <span className="ml-1 text-muted-foreground/70">{symbol}</span>
      )}
    </span>
  );
}

export function LamportsDisplay({
  lamports,
  showInSOL = true,
  className,
}: {
  lamports: number | bigint;
  showInSOL?: boolean;
  className?: string;
}) {
  if (showInSOL) {
    return <TokenBalance amount={lamports} decimals={9} symbol="SOL" className={className} />;
  }

  const value = Number(lamports);
  if (value === 0) return <span className={className}>0</span>;

  return (
    <span className={cn("tabular-nums font-mono", className)}>
      {value.toLocaleString()}
    </span>
  );
}