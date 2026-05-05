import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function SitePage({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden bg-[#120f0c] text-white", className)}>
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.14),transparent_28%),radial-gradient(circle_at_80%_15%,rgba(196,109,70,0.12),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(212,168,83,0.06),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.05] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
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
        "overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl sm:rounded-[2.2rem] sm:p-8 lg:p-12",
        align === "center" && "text-center"
      )}
    >
      <div className="pointer-events-none absolute" />
      <div className={cn("max-w-4xl", align === "center" && "mx-auto")}>
        <p className="text-sm uppercase tracking-[0.35em] text-[#d4a853]">{eyebrow}</p>
        <h1 className="mt-5 font-display text-[2.45rem] leading-[0.98] text-white sm:text-[3.35rem] lg:text-[5rem]">{title}</h1>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/64 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg">{description}</p>
        {(ctaHref && ctaLabel) || secondary ? (
          <div className={cn("mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4", align === "center" && "justify-center")}>
            {ctaHref && ctaLabel ? (
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d4a853] px-6 py-3.5 text-sm font-semibold text-[#17120d] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e5bc68] sm:w-auto"
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
      <p className="text-sm uppercase tracking-[0.32em] text-[#d4a853]">{eyebrow}</p>
      <h2 className="mt-4 font-display text-3xl leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-white/62 sm:text-base sm:leading-8">{description}</p> : null}
    </div>
  );
}

export function SectionBlock({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("mt-8 sm:mt-10 lg:mt-14", className)}>{children}</section>;
}
