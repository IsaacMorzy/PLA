import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SitePage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden text-foreground", className)}>
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.18),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(196,109,70,0.14),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(212,168,83,0.08),transparent_24%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.14),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(196,109,70,0.12),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(212,168,83,0.06),transparent_24%)]" />
        <div className="absolute inset-0 hidden opacity-[0.04] md:block [background-image:linear-gradient(rgba(30,18,9,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(30,18,9,0.08)_1px,transparent_1px)] [background-size:72px_72px] dark:[background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)]" />
      </div>
      <main className="relative z-10 px-4 pb-14 pt-24 sm:px-5 sm:pb-16 sm:pt-28 lg:px-8 lg:pb-24">{children}</main>
    </div>
  );
}

export function PageShell({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-7xl", className)}>{children}</div>;
}

export function PageHero({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
  secondary,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
  secondary?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden rounded-[1.9rem] border border-black/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,255,255,0.68))] p-6 shadow-[0_20px_60px_rgba(55,31,12,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] dark:shadow-[0_24px_90px_rgba(0,0,0,0.28)] sm:rounded-[2.2rem] sm:p-8 lg:p-12",
        align === "center" && "text-center"
      )}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1 bg-[linear-gradient(180deg,rgba(212,168,83,0.65),rgba(196,109,70,0.15))] lg:block" />
      <div className={cn("max-w-[66ch]", align === "center" && "mx-auto")}>
        <p className="text-sm uppercase tracking-[0.35em] text-[#9a6f2a] dark:text-[#d4a853]">{eyebrow}</p>
        <h1 className="mt-5 text-balance font-display text-[clamp(2.35rem,5.2vw,5.25rem)] leading-[0.94] tracking-[-0.02em] text-[#1f140b] dark:text-white">{title}</h1>
        <p className="mt-6 max-w-[62ch] text-pretty text-[0.98rem] leading-[1.9] text-[#4c3a2b] dark:text-white/74 sm:text-[1.05rem]">{description}</p>
        {(ctaHref && ctaLabel) || secondary ? (
          <div className={cn("mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4", align === "center" && "justify-center")}>
            {ctaHref && ctaLabel ? (
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d4a853] px-6 py-3.5 text-sm font-semibold text-[#17120d] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e5bc68] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f6f1e8] dark:focus-visible:ring-offset-[#120f0c] sm:w-auto"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            ) : null}
            {secondary}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-8 max-w-3xl", className)}>
      <p className="text-sm uppercase tracking-[0.32em] text-[#9a6f2a] dark:text-[#d4a853]">{eyebrow}</p>
      <h2 className="mt-4 max-w-[24ch] text-balance font-display text-[clamp(2rem,4.2vw,3.7rem)] leading-[0.98] tracking-[-0.015em] text-[#1f140b] dark:text-white">{title}</h2>
      {description ? <p className="mt-4 max-w-[60ch] text-pretty text-[0.98rem] leading-[1.85] text-[#4c3a2b] dark:text-white/72 sm:text-base">{description}</p> : null}
    </div>
  );
}

export function SectionBlock({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("mt-8 sm:mt-10 lg:mt-14", className)}>{children}</section>;
}
