"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

// PeaceLeague Africa - Locked to dark mode for premium aesthetic
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
    // Force dark mode on init
    setTheme("dark");
  }, [setTheme]);

  // Dark mode is locked - show info badge
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
        <span className="sr-only">Dark mode locked</span>
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      // Hidden but accessible - dark mode is locked
      className="h-9 w-9 rounded-full opacity-30 hover:opacity-50 transition-all"
      title="Dark mode locked for premium experience"
    >
      <Lock className="h-[16px] w-[16px] text-[#d4a853]" />
    </Button>
  );
}
