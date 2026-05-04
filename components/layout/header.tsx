"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { WalletButton } from "@/components/wallet/wallet-button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/campaigns", label: "Campaigns" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
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
                ? "border-white/10 bg-[#120f0c]/82 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
                : "border-white/8 bg-[#120f0c]/55 backdrop-blur-xl"
            )}
          >
            <nav aria-label="Global" className="flex items-center justify-between gap-3 px-3 py-3 sm:px-4 lg:px-5">
              <div className="flex items-center gap-3">
                <MobileNav />
                <Logo className="shrink-0" />
              </div>

              <div className="hidden items-center rounded-full border border-white/8 bg-white/[0.03] p-1 md:flex">
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f0c]",
                        isActive
                          ? "bg-white/[0.08] text-white"
                          : "text-white/60 hover:text-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>

              <div className="hidden items-center gap-2 xl:flex rounded-full border border-[#d4a853]/12 bg-[#d4a853]/[0.06] px-3 py-2 text-[11px] uppercase tracking-[0.24em] text-[#f1ddab]/80">
                <Sparkles className="h-3.5 w-3.5 text-[#d4a853]" />
                Transparent giving infrastructure
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden md:block">
                  <ThemeToggle />
                </div>
                <div className="hidden lg:block">
                  <Link
                    href="/campaigns/create"
                    className="inline-flex items-center gap-2 rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 px-4 py-2.5 text-sm font-medium text-[#f1ddab] transition-all duration-300 hover:bg-[#d4a853]/16 hover:text-white"
                  >
                    Start
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
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
