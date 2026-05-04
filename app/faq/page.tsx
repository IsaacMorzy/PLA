"use client";

import Link from "next/link";
import { Accordion } from "@/components/ui/tailgrids";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

const faqItems = [
  {
    id: "1",
    title: "How does PeaceLeague Africa work?",
    content:
      "PeaceLeague Africa helps campaign organizers raise support in SOL for real community needs. Campaigns present their story, donors contribute directly, and fundraising activity is surfaced with stronger transparency cues.",
  },
  {
    id: "2",
    title: "How do donors know where funds go?",
    content:
      "The platform is built around on-chain visibility and clearer fundraising signals. Donors can inspect campaign progress and transaction activity instead of relying only on static claims.",
  },
  {
    id: "3",
    title: "Is there a platform fee?",
    content:
      "PeaceLeague Africa positions itself as a zero-platform-fee experience, helping more of the contribution reach the intended cause rather than being absorbed by intermediary charges.",
  },
  {
    id: "4",
    title: "Do I need a wallet to donate?",
    content:
      "Yes. Donations are made in SOL, so supporters need a compatible Solana wallet to connect and complete the transaction.",
  },
  {
    id: "5",
    title: "Can organizers start a campaign quickly?",
    content:
      "Yes. The goal is to keep launch friction low while making campaign pages feel more credible, structured, and ready to share.",
  },
  {
    id: "6",
    title: "Why build this on Solana?",
    content:
      "Solana provides fast, low-cost infrastructure, which makes it easier to support causes globally while keeping the user experience responsive and transparent.",
  },
];

export default function FAQPage() {
  return (
    <SitePage>
      <PageShell className="max-w-6xl">
        <PageHero
          eyebrow="FAQ"
          title={
            <>
              Clear answers for donors,
              <span className="block text-[#f1ddab]">organizers, and partners.</span>
            </>
          }
          description="This page is designed to reduce hesitation. The tone is direct, the information is structured, and the answers reinforce how PeaceLeague Africa works."
          align="center"
        />

        <SectionBlock>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <SectionIntro
                eyebrow="Need-to-know"
                title="Everything essential, without clutter."
                description="Instead of a generic FAQ list, this layout frames the most important trust and product questions in a cleaner way."
              />
            </div>
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 sm:p-8">
              <Accordion items={faqItems} className="[&>div]:rounded-[1.4rem] [&>div]:border-white/10 [&>div]:bg-black/20 [&_button]:px-5 [&_button]:py-5" />
            </Card>
          </div>
        </SectionBlock>

        <SectionBlock>
          <Card className="rounded-[2rem] border border-[#d4a853]/16 bg-[linear-gradient(135deg,rgba(212,168,83,0.16),rgba(255,255,255,0.04),rgba(196,109,70,0.12))] p-8 text-center sm:p-10">
            <p className="text-sm uppercase tracking-[0.32em] text-[#f1ddab]">Still need help?</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">Let’s make the next step obvious.</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/68">
              If your question is campaign-specific or technical, reach out directly and we can help you navigate the right path.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#d4a853] px-6 py-3.5 text-sm font-semibold text-[#17120d] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e5bc68]"
              >
                Contact us
              </Link>
              <Link
                href="/campaigns"
                className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-6 py-3.5 text-sm font-semibold text-white transition duration-300 hover:bg-white/[0.08]"
              >
                Browse campaigns
              </Link>
            </div>
          </Card>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
