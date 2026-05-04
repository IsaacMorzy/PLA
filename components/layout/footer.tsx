"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Globe, Heart, Sparkles, Twitter } from "lucide-react";
import { NewsletterForm } from "@/components/ui/newsletter-form";

const FOOTER_LINKS = {
  Explore: [
    { href: "/campaigns", label: "Campaigns" },
    { href: "/about", label: "About Us" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/events", label: "Events" },
  ],
  Community: [
    { href: "/team", label: "Team" },
    { href: "/testimonials", label: "Success Stories" },
    { href: "/image-gallery", label: "Gallery" },
    { href: "/donor-list", label: "Donors" },
  ],
  Resources: [
    { href: "/faq", label: "FAQ" },
    { href: "/careers", label: "Careers" },
    { href: "/privacy-policy", label: "Privacy" },
    { href: "/terms-conditions", label: "Terms" },
  ],
};

const REGIONS = ["West Africa", "East Africa", "Southern Africa", "North Africa"];

export function Footer() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc =
    mounted && resolvedTheme === "light"
      ? "/images/Main-Logo-Steel-Black.png"
      : "/images/Main-Logo-White.png";

  const year = new Date().getFullYear();

  return (
    <footer className="relative z-30 overflow-hidden border-t border-white/8 bg-[#0c0a08] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(196,109,70,0.12),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:80px_80px]" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-7 backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-[#d4a853]">
              <Sparkles className="h-3.5 w-3.5" />
              PeaceLeague Africa
            </div>

            <Link href="/" className="mt-5 inline-block">
              <Image src={logoSrc} alt="PeaceLeague Africa" width={190} height={48} className="h-auto w-40 sm:w-48" />
            </Link>

            <h2 className="mt-6 max-w-2xl font-display text-4xl leading-tight text-white sm:text-5xl">
              Transparent giving should feel human, immediate, and unforgettable.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/66">
              PeaceLeague Africa connects global donors with community-led impact across the continent — with on-chain clarity, faster support, and zero platform fees.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { value: "4,320+", label: "SOL raised" },
                { value: "162+", label: "campaigns funded" },
                { value: "0%", label: "platform fee" },
              ].map((item) => (
                <div key={item.label} className="rounded-[1.4rem] border border-white/10 bg-black/20 px-4 py-4">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">{item.label}</p>
                  <p className="mt-3 font-display text-4xl text-[#f1ddab]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7 backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#d4a853]">Newsletter</p>
                  <h3 className="mt-3 font-display text-3xl text-white">Stay close to the mission</h3>
                </div>
                <div className="hidden h-12 w-12 items-center justify-center rounded-2xl border border-[#d4a853]/20 bg-[#d4a853]/10 text-[#d4a853] sm:flex">
                  <Heart className="h-5 w-5" />
                </div>
              </div>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/62">
                Get campaign highlights, launch updates, and stories of verified impact delivered without the noise.
              </p>
              <div className="mt-6">
                <NewsletterForm />
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl sm:p-8">
              <div className="grid gap-8 md:grid-cols-[0.75fr_1.25fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-[#d4a853]">Across Africa</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {REGIONS.map((region, index) => (
                      <span
                        key={region}
                        className={index % 2 === 0
                          ? "rounded-full border border-[#d4a853]/25 bg-[#d4a853]/10 px-3 py-1.5 text-xs text-[#f1ddab]"
                          : "rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs text-white/68"}
                      >
                        {region}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center gap-2">
                    <SocialLink href="https://peaceleague.africa" icon={<Globe className="h-4 w-4" />} label="Website" />
                    <SocialLink href="https://github.com/peaceleagueafrica" icon={<Github className="h-4 w-4" />} label="GitHub" />
                    <SocialLink href="https://x.com/peaceleagueafrica" icon={<Twitter className="h-4 w-4" />} label="Twitter" />
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-3">
                  {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                    <div key={title}>
                      <h4 className="text-sm font-semibold uppercase tracking-[0.26em] text-white/42">{title}</h4>
                      <ul className="mt-4 space-y-3">
                        {links.map((link) => (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              className="text-sm text-white/68 transition-colors duration-300 hover:text-[#f1ddab]"
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-white/8 pt-6 text-sm text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} PeaceLeague Africa. Built for transparent impact on Solana.</p>
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#f1ddab]">
              v2.0
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/55">
              Solana-native
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
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
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white/72 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#d4a853]/30 hover:bg-[#d4a853]/10 hover:text-[#f1ddab]"
    >
      {icon}
    </a>
  );
}
