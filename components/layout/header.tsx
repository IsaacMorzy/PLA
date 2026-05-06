"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";
import { MobileNav } from "./mobile-nav";
import { WalletButton } from "@/components/wallet/wallet-button";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { CTA_COPY, TRUST_COPY } from "@/lib/copy";

const NAV_LINKS = [
  { href: "/campaigns", label: "Donate" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Stories" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#d4a853] focus:px-4 focus:py-2 focus:font-semibold focus:text-[#1a1815]"
      >
        Skip to main content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4">
        <div className="mx-auto max-w-7xl">
          <div
            className={cn(
              "pointer-events-auto rounded-full border transition-all duration-300",
              scrolled
                ? "surface-glass-2 border-black/10 bg-[#f6f1e8]/86 shadow-[0_20px_60px_rgba(40,20,8,0.12)] dark:border-white/10 dark:bg-[#120f0c]/82 dark:shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                : "surface-glass-1 border-black/10 bg-[#f6f1e8]/70 dark:border-white/8 dark:bg-[#120f0c]/55"
            )}
          >
            <nav aria-label="Global" className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4 lg:px-5">
              <div className="flex items-center gap-3">
                <MobileNav />
                <Logo className="shrink-0" />
              </div>

              <div className="hidden items-center rounded-full border border-black/10 bg-black/[0.03] p-1 dark:border-white/8 dark:bg-white/[0.03] md:flex">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8] dark:focus-visible:ring-offset-[#120f0c]",
                        isActive
                          ? "bg-black/[0.08] text-[#1f140b] dark:bg-white/[0.08] dark:text-white"
                          : "text-[#3f3022] hover:text-[#1f140b] dark:text-white/75 dark:hover:text-white"
                      )}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="hidden items-center gap-2 rounded-full border border-[#d4a853]/16 bg-[#d4a853]/10 px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-[#73511f] dark:border-[#d4a853]/12 dark:bg-[#d4a853]/[0.06] dark:text-[#f1ddab]/80 xl:flex">
                <Sparkles className="h-3.5 w-3.5 text-[#d4a853]" />
                {TRUST_COPY.navTagline}
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden lg:block">
                  <Link
                    href="/campaigns"
                    className="inline-flex items-center gap-2 rounded-full border border-black/12 bg-black/[0.04] px-4 py-2.5 text-sm font-medium text-[#2d1f12] transition-all duration-300 hover:bg-black/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8] dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:focus-visible:ring-offset-[#120f0c]"
                  >
                    {CTA_COPY.donateNow}
                  </Link>
                </div>
                <div className="hidden lg:block">
                  <Link
                    href="/create"
                    className="inline-flex items-center gap-2 rounded-full border border-[#d4a853]/30 bg-[#d4a853]/14 px-4 py-2.5 text-sm font-medium text-[#5b3f14] transition-all duration-300 hover:bg-[#d4a853]/22 hover:text-[#2b1906] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8] dark:border-[#d4a853]/20 dark:bg-[#d4a853]/10 dark:text-[#f1ddab] dark:hover:bg-[#d4a853]/16 dark:hover:text-white dark:focus-visible:ring-offset-[#120f0c]"
                  >
                    {CTA_COPY.launchCampaign}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <ThemeToggle />
                <div className="hidden sm:block">
                  <WalletButton />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
