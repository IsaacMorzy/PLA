"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Twitter, Globe, Mail, MapPin, Heart, ArrowRight, Sparkles } from "lucide-react";

// Footer navigation structure
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
    <footer className="relative z-30 bg-gradient-to-b from-background to-background/95 border-t border-border/50">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          {/* Top section: Logo + Description + CTA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-12">
            {/* Brand column */}
            <div className="lg:col-span-4">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src={logoSrc}
                  alt="PeaceLeague Africa"
                  width={180}
                  height={45}
                  className="h-auto"
                />
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-xs">
                Empowering transparent peer-to-peer charitable giving across 
                Africa. Every donation creates lasting impact.
              </p>
              
              {/* Newsletter signup */}
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#d4a853]">
                  Stay Updated
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2.5 text-sm rounded-xl bg-accent/50 border border-border/50 focus:border-[#d4a853]/50 focus:outline-none focus:ring-1 focus:ring-[#d4a853]/20 transition-all"
                  />
                  <button className="px-4 py-2.5 bg-[#d4a853] text-black rounded-xl font-medium text-sm hover:brightness-110 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Link columns */}
            <div className="lg:col-span-8 grid grid-cols-3 gap-8">
              {Object.entries(FOOTER_LINKS).map(([title, links]) => (
                <div key={title}>
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-[#d4a853] mb-4">
                    {title}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
                        >
                          {link.label}
                          <span className="absolute bottom-0 left-0 w-0 h-px bg-[#d4a853] transition-all duration-300 group-hover:w-full" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          {/* Bottom section: Copyright + Social + Legal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-xs text-muted-foreground">
              &copy; {year} PeaceLeague Africa. Built with{" "}
              <span className="text-red-500">&hearts;</span> on Solana
            </p>

            {/* Social links */}
            <div className="flex items-center gap-2">
              <SocialLink
                href="https://builderz.dev"
                icon={<Globe className="h-4 w-4" />}
                label="Website"
              />
              <SocialLink
                href="https://github.com/builderz-labs"
                icon={<Github className="h-4 w-4" />}
                label="GitHub"
              />
              <SocialLink
                href="https://x.com/builaboratory"
                icon={<Twitter className="h-4 w-4" />}
                label="Twitter"
              />
            </div>

            {/* Version badge */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[#d4a853]/10 text-[#d4a853] border border-[#d4a853]/20">
                v2.0
              </span>
              <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-accent/50 text-muted-foreground border border-border/50">
                Solana
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#d4a853]/5 to-transparent pointer-events-none" />
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
      className="p-2.5 rounded-xl text-muted-foreground hover:text-[#d4a853] hover:bg-accent/50 transition-all duration-200"
    >
      {icon}
    </a>
  );
}