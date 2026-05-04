"use client";

import { useState, useRef, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Wallet, Copy, ExternalLink, LogOut, Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function truncateAddress(address: string): string {
  return `${address.slice(0, 4)}...${address.slice(-4)}`;
}

export function WalletButton() {
  const { connected, publicKey, disconnect, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleCopyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toBase58());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setMenuOpen(false);
  };

  // Not connected - show connect button
  if (!connected || !publicKey) {
    return (
      <button
        onClick={() => setVisible(true)}
        disabled={connecting}
        className={cn(
          "inline-flex items-center justify-center gap-2",
          "h-10 px-5 py-2 text-sm font-semibold",
          "bg-brand-gold text-[#1a1815] rounded-full",
          "shadow-lg shadow-brand-gold/20",
          "hover:bg-brand-gold-light hover:shadow-brand-gold/30",
          "hover:scale-[1.02] active:scale-[0.98]",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          connecting && "cursor-wait"
        )}
        aria-busy={connecting}
        aria-label={connecting ? "Connecting wallet" : "Connect wallet"}
      >
        {connecting ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </>
        )}
      </button>
    );
  }

  // Connected - show address with dropdown
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className={cn(
          "inline-flex items-center justify-between gap-2",
          "h-10 px-4 py-2 min-w-[140px]",
          "bg-white/5 backdrop-blur-md border border-white/10",
          "text-white rounded-full",
          "hover:bg-white/10 hover:border-brand-gold/30",
          "hover:scale-[1.02] active:scale-[0.98]",
          "transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        )}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        aria-label={`Wallet: ${truncateAddress(publicKey.toBase58())}`}
      >
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#d4a853] animate-pulse" />
          <span className="font-mono text-sm">
            {truncateAddress(publicKey.toBase58())}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            menuOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown menu */}
      {menuOpen && (
        <div
          role="menu"
          className={cn(
            "absolute right-0 top-full mt-2 w-56",
            "bg-[#120f0c]/95 backdrop-blur-xl",
            "border border-white/10 rounded-[1.4rem]",
            "shadow-2xl shadow-black/10 dark:shadow-black/30",
            "overflow-hidden animate-fade-in-up",
            "z-50"
          )}
        >
          {/* Wallet info */}
          <div className="border-b border-white/8 bg-white/[0.04] px-4 py-3">
            <p className="text-xs text-white/40">Connected Wallet</p>
            <p className="font-mono text-sm font-medium truncate">
              {publicKey.toBase58()}
            </p>
          </div>

          {/* Menu items */}
          <div className="py-2">
            <button
              onClick={handleCopyAddress}
              role="menuitem"
              className={cn(
                "flex items-center gap-3 w-full px-4 py-2.5",
                "text-sm text-left",
                "hover:bg-accent/60 transition-all duration-200",
                "focus-visible:outline-none focus-visible:bg-accent/60"
              )}
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
              <span>{copied ? "Copied!" : "Copy Address"}</span>
            </button>

            <a
              href={`https://solscan.io/account/${publicKey.toBase58()}`}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className={cn(
                "flex items-center gap-3 w-full px-4 py-2.5",
                "text-sm",
                "hover:bg-accent/60 transition-all duration-200",
                "focus-visible:outline-none focus-visible:bg-accent/60"
              )}
            >
              <ExternalLink className="h-4 w-4" />
              <span>View on Solscan</span>
            </a>

            <a
              href={`https://solana.fm/address/${publicKey.toBase58()}`}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              className={cn(
                "flex items-center gap-3 w-full px-4 py-2.5",
                "text-sm",
                "hover:bg-accent/60 transition-all duration-200",
                "focus-visible:outline-none focus-visible:bg-accent/60"
              )}
            >
              <ExternalLink className="h-4 w-4" />
              <span>View on Solana FM</span>
            </a>
          </div>

          {/* Divider */}
          <div className="border-t border-border/50" />

          {/* Disconnect */}
          <div className="py-2">
            <button
              onClick={handleDisconnect}
              role="menuitem"
              className={cn(
                "flex items-center gap-3 w-full px-4 py-2.5",
                "text-sm text-left text-red-500",
                "hover:bg-red-500/10 transition-all duration-200",
                "focus-visible:outline-none focus-visible:bg-red-500/10"
              )}
            >
              <LogOut className="h-4 w-4" />
              <span>Disconnect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
