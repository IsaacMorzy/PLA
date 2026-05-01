"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { WalletButton } from "@/components/wallet/wallet-button";

// Navigation structure - simplified per helius.dev style
const NAV_LINKS = [
  { href: "/campaigns", label: "Campaigns" },
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

return (
    <>
      {/* Skip link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-gold focus:text-[#1a1815] focus:rounded-lg focus:font-semibold"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-500 ${
          scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#222222] shadow-lg" : ""
        }`}
      >
      <nav
        className={`
          flex items-center justify-between gap-3 px-4 py-2 
          rounded-2xl transition-all duration-300
        `}
      >
        {/* Left: Mobile nav + Logo */}
        <div className="flex items-center gap-3">
          <MobileNav />
          <Logo />
        </div>

        {/* Center: Navigation links - visible on md+ screens */}
        <div className="hidden md:flex items-center justify-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  px-3 py-2 rounded-lg text-sm font-medium 
                  transition-all duration-200 whitespace-nowrap
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]
                  ${
                    isActive
                      ? "text-[#d4a853]"
                      : "text-[#a1a1a1] hover:text-white"
                  }
                `}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Right section: CTA */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden sm:block">
            <WalletButton />
          </div>
        </div>
      </nav>
    </header>
    </>
  );
}