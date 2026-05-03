"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getExplorerUrl } from "@/lib/solana-config";

interface AddressDisplayProps {
  address: string;
  truncate?: boolean;
  showCopy?: boolean;
  showExplorer?: boolean;
  explorerUrl?: string;
  explorerHref?: string;
  className?: string;
}

export function AddressDisplay({
  address,
  truncate = true,
  showCopy = true,
  showExplorer = true,
  explorerUrl,
  explorerHref,
  className,
}: AddressDisplayProps) {
  const [copied, setCopied] = useState(false);

  const displayAddress = truncate
    ? `${address.slice(0, 4)}...${address.slice(-4)}`
    : address;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <code className="rounded bg-white/10 px-2 py-1 font-mono text-sm text-white/80" title={address}>
        {displayAddress}
      </code>

      {showCopy && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/60 hover:text-white"
          onClick={handleCopy}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          <span className="sr-only">Copy address</span>
        </Button>
      )}

      {showExplorer && (
        <Button variant="ghost" size="icon" className="h-8 w-8 text-white/60 hover:text-white" asChild>
          <a
            href={explorerHref ?? (explorerUrl ? `${explorerUrl}/${address}` : getExplorerUrl("address", address))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">View on explorer</span>
          </a>
        </Button>
      )}
    </div>
  );
}