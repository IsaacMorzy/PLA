"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  FileText,
  Globe,
  Heart,
  HeartHandshake,
  HelpCircle,
  Home,
  Image,
  Menu,
  Sparkles,
  Twitter,
  Users,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/wallet/wallet-button";
import { cn } from "@/lib/utils";
import { CTA_COPY } from "@/lib/copy";

const SECTIONS = [
  {
    title: "Main",
    items: [
      { href: "/", label: "Home", icon: Home, description: "Overview and platform story" },
      { href: "/campaigns", label: "Campaigns", icon: HeartHandshake, description: "Browse live causes" },
      { href: "/how-it-works", label: "How It Works", icon: Sparkles, description: "How giving stays transparent" },
      { href: "/about", label: "About", icon: BookOpen, description: "Mission, people, and context" },
    ],
  },
  {
    title: "Explore",
    items: [
      { href: "/team", label: "Team", icon: Users, description: "People behind PeaceLeague" },
      { href: "/image-gallery", label: "Gallery", icon: Image, description: "Visual stories and field moments" },
      { href: "/faq", label: "FAQ", icon: HelpCircle, description: "Answers for donors and organizers" },
      { href: "/blog", label: "Blog", icon: FileText, description: "Updates, insights, and launches" },
      { href: "/careers", label: "Careers", icon: Briefcase, description: "Join the mission" },
      { href: "/donor-list", label: "Donors", icon: Heart, description: "Community backing the cause" },
    ],
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full border border-black/12 bg-black/[0.04] text-[#2f2114] hover:bg-black/[0.08] dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08] lg:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation</span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[92vw] max-w-[420px] overflow-y-auto border-r border-black/10 bg-[#f6f1e8]/96 p-0 text-[#26190f] backdrop-blur-lg dark:border-white/10 dark:bg-[#120f0c]/96 dark:text-white sm:backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.2),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(196,109,70,0.18),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(196,109,70,0.18),transparent_24%)]" />

        <div className="relative flex min-h-full flex-col">
          <SheetHeader className="border-b border-black/10 px-6 pb-6 pt-8 text-left dark:border-white/8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-[#8c621f] dark:text-[#f1ddab]">
              <Sparkles className="h-3.5 w-3.5" />
              Navigation
            </div>
            <SheetTitle className="mt-4 text-left text-3xl font-semibold tracking-tight text-[#25180f] dark:text-white">
              Explore PeaceLeague Africa
            </SheetTitle>
            <p className="text-sm leading-7 text-[#5a4531] dark:text-white/72">
              A cleaner, grouped menu inspired by modern infrastructure sites — fast to scan, easy to use.
            </p>
          </SheetHeader>

          <div className="px-6 py-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/campaigns"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d4a853] px-4 py-3 text-sm font-semibold text-[#1a1815] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8] dark:focus-visible:ring-offset-[#120f0c]"
              >
                {CTA_COPY.browseCampaigns}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/create"
                onClick={() => setOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-black/12 bg-black/[0.05] px-4 py-3 text-sm font-semibold text-[#2a1d12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8] dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:focus-visible:ring-offset-[#120f0c]"
              >
                {CTA_COPY.launchCampaign}
              </Link>
            </div>
          </div>

          <div className="flex-1 space-y-8 px-6 pb-6">
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#6a5340] dark:text-white/55">{section.title}</p>
                <div className="grid gap-3">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group rounded-[1.4rem] border p-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8] dark:focus-visible:ring-offset-[#120f0c]",
                          isActive
                            ? "border-[#d4a853]/25 bg-[#d4a853]/10"
                            : "border-black/10 bg-white/70 hover:border-black/16 hover:bg-white dark:border-white/8 dark:bg-white/[0.035] dark:hover:border-white/14 dark:hover:bg-white/[0.06]"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "flex h-11 w-11 items-center justify-center rounded-2xl border",
                              isActive
                                ? "border-[#d4a853]/20 bg-[#d4a853]/10 text-[#8e641f] dark:text-[#f1ddab]"
                                : "border-black/10 bg-black/[0.04] text-[#5f4934] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/72"
                            )}
                          >
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-sm font-semibold text-[#2a1d12] dark:text-white">{item.label}</span>
                              <ArrowRight className="h-4 w-4 text-[#6b5642] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#8e641f] dark:text-white/55 dark:group-hover:text-[#f1ddab]" />
                            </div>
                            <p className="mt-1 text-sm leading-6 text-[#5f4a38] dark:text-white/70">{item.description}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="rounded-[1.6rem] border border-black/12 bg-white/75 p-5 dark:border-white/10 dark:bg-white/[0.04]">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#6a5340] dark:text-white/55">Wallet</p>
              <p className="mt-3 text-sm leading-7 text-[#5c4732] dark:text-white/72">
                Connect to donate, launch campaigns, and manage on-chain giving.
              </p>
              <div className="mt-4">
                <WalletButton />
              </div>
            </div>
          </div>

          <div className="border-t border-black/10 px-6 py-5 dark:border-white/8">
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#6a5340] dark:text-white/55">Follow</p>
            <div className="grid grid-cols-3 gap-3">
              <SocialButton href="https://peaceleague.africa" icon={<Globe className="h-4 w-4" />} label="Site" />
              <SocialButton href="https://github.com/peaceleagueafrica" icon={<BookOpen className="h-4 w-4" />} label="GitHub" />
              <SocialButton href="https://x.com/peaceleagueafrica" icon={<Twitter className="h-4 w-4" />} label="X" />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full border border-black/12 bg-black/[0.04] px-3 py-2.5 text-sm text-[#5c4732] transition-all duration-300 hover:border-[#d4a853]/20 hover:bg-[#d4a853]/10 hover:text-[#8e641f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/68 dark:hover:text-[#f1ddab] dark:focus-visible:ring-offset-[#120f0c]"
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}
