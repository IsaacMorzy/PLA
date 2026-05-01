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
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-500 ${
        scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <nav
        className={`
          flex items-center justify-between gap-3 px-4 py-2 
          glass-strong rounded-2xl shadow-lg transition-all duration-300
          ${scrolled ? "translate-y-[-20px]" : ""}
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
  );
}