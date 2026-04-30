"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "./theme-toggle";
import { MobileNav } from "./mobile-nav";
import { WalletButton } from "@/components/wallet/wallet-button";
import {
  HeartHandshake,
  BookOpen,
  Users,
  Calendar,
  Award,
  Image,
  Heart,
  HelpCircle,
  Briefcase,
  ChevronDown,
  Sparkles,
  Globe,
  ArrowRight,
  FileText,
} from "lucide-react";

// Navigation hierarchy
const NAV_STRUCTURE = {
  Explore: [
    { href: "/campaigns", label: "Campaigns", icon: HeartHandshake, description: "Support causes you care about" },
    { href: "/about", label: "About Us", icon: BookOpen, description: "Our mission and story" },
    { href: "/how-it-works", label: "How It Works", icon: Users, description: "See the impact" },
    { href: "/events", label: "Events", icon: Calendar, description: "Upcoming activities" },
  ],
  Community: [
    { href: "/team", label: "Team", icon: Users, description: "Meet the builders" },
    { href: "/testimonials", label: "Stories", icon: Award, description: "Impact testimonials" },
    { href: "/image-gallery", label: "Gallery", icon: Image, description: "Visual stories" },
    { href: "/donor-list", label: "Donors", icon: Heart, description: "Our supporters" },
  ],
  Resources: [
    { href: "/blog", label: "Blog", icon: FileText, description: "Latest updates" },
    { href: "/faq", label: "FAQ", icon: HelpCircle, description: "Common questions" },
    { href: "/careers", label: "Careers", icon: Briefcase, description: "Join us" },
  ],
};

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      ref={dropdownRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-6xl transition-all duration-500 ${
        scrolled ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <nav
        className={`
          flex items-center justify-between px-5 py-3 
          glass-strong rounded-2xl shadow-lg transition-all duration-300
          ${scrolled ? "translate-y-[-20px]" : ""}
        `}
      >
        {/* Left: Mobile nav + Logo */}
        <div className="flex items-center gap-3">
          <MobileNav />
          <Logo />
        </div>

        {/* Center: Dropdown navigation (desktop) */}
        <div className="hidden lg:flex items-center gap-1">
          {Object.entries(NAV_STRUCTURE).map(([category, items]) => (
            <div key={category} className="relative">
              <button
                onMouseEnter={() => setActiveDropdown(category)}
                onClick={() => setActiveDropdown(activeDropdown === category ? null : category)}
                className={`
                  flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium 
                  transition-all duration-200 group
                  ${
                    activeDropdown === category
                      ? "text-[#d4a853]"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                {category}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === category ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown panel */}
              {activeDropdown === category && (
                <div
                  className="absolute top-full left-0 pt-2"
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="w-72 bg-background/95 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl shadow-black/10 dark:shadow-black/30 overflow-hidden animate-fade-in-up">
                    {/* Category header */}
                    <div className="px-4 py-3 border-b border-border/50 bg-accent/20">
                      <p className="text-xs font-semibold text-[#d4a853] uppercase tracking-wider">
                        {category}
                      </p>
                    </div>

                    {/* Nav items */}
                    <div className="py-2">
                      {items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-start gap-3 px-4 py-3 hover:bg-accent/60 transition-all duration-200 group"
                        >
                          <div className="p-2 rounded-xl bg-accent/50 group-hover:bg-[#d4a853]/10 transition-colors">
                            <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-[#d4a853] transition-colors" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm group-hover:text-[#d4a853] transition-colors">
                              {item.label}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#d4a853]" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
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