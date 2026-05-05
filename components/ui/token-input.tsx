"use client";

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TokenInputProps {
  value: string;
  onChange: (value: string) => void;
  balance?: number;
  decimals?: number;
  symbol?: string;
  disabled?: boolean;
  error?: string;
  label?: string;
}

export function TokenInput({
  value,
  onChange,
  balance,
  decimals = 9,
  symbol = "SOL",
  disabled = false,
  error,
  label,
}: TokenInputProps) {
  const [focused, setFocused] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;

      if (input === "") {
        onChange("");
        return;
      }

      const regex = new RegExp(`^\\d*\\.?\\d{0,${decimals}}$`);
      if (regex.test(input)) {
        onChange(input);
      }
    },
    [onChange, decimals]
  );

  const handleMax = useCallback(() => {
    if (balance !== undefined) {
      onChange(balance.toString());
    }
  }, [balance, onChange]);

  const handleHalf = useCallback(() => {
    if (balance !== undefined) {
      onChange((balance / 2).toString());
    }
  }, [balance, onChange]);

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <Label htmlFor="token-input">{label}</Label>
          {balance !== undefined && (
            <span className="text-sm text-white/40">
              Balance: {balance.toFixed(4)} {symbol}
            </span>
          )}
        </div>
      )}

      <div
        className={cn(
          "flex items-center gap-2 rounded-[1rem] border bg-white/5 px-4 py-3 transition-all",
          focused && "ring-2 ring-brand-gold/50",
          error ? "border-red-500/50" : "border-white/20"
        )}
      >
        <Input
          id="token-input"
          type="text"
          inputMode="decimal"
          placeholder="0.00"
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          className="border-0 bg-transparent p-0 text-2xl font-medium text-white placeholder-white/30 focus-visible:ring-0"
          aria-invalid={!!error}
          aria-describedby={error ? "token-input-error" : undefined}
        />

        <div className="flex items-center gap-2">
          {balance !== undefined && (
            <>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleHalf}
                disabled={disabled || balance === 0}
                className="text-xs text-white/60 hover:text-white"
              >
                Half
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleMax}
                disabled={disabled || balance === 0}
                className="text-xs text-white/60 hover:text-white"
              >
                Max
              </Button>
            </>
          )}
          <span className="font-medium text-white/60">{symbol}</span>
        </div>
      </div>

      {error && (
        <p id="token-input-error" className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
