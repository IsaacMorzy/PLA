import { Metadata } from "next";
import { ArrowRightLeft, Globe, Shield, Wallet, Zap } from "lucide-react";
import { HowItWorks, FeatureGrid } from "@/components/ui/feature";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "How It Works - PeaceLeague Africa",
  description: "Learn how transparent crowdfunding works on PeaceLeague Africa.",
};

const steps = [
  {
    number: "01",
    title: "Create a campaign",
    description: "Tell the story, define the need, connect your wallet, and set a clear funding goal.",
  },
  {
    number: "02",
    title: "Share it with confidence",
    description: "Campaign pages are structured to feel credible and clear when donors arrive.",
  },
  {
    number: "03",
    title: "Receive transparent support",
    description: "Donors contribute in SOL while campaign progress stays visible and publicly verifiable.",
  },
  {
    number: "04",
    title: "Turn funding into impact",
    description: "Organizers can move quickly, share updates, and show the outcome behind every contribution.",
  },
];

const benefits = [
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Zero platform fee",
    description: "PeaceLeague is designed so support goes to the cause instead of being absorbed by the platform.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "On-chain verification",
    description: "Donors can verify movement rather than relying only on interface claims or static updates.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Fast settlement",
    description: "Solana enables quick transactions and a smoother giving experience at global scale.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Global donor reach",
    description: "Anyone with SOL can support causes across Africa without heavyweight payment friction.",
  },
];

export default function HowItWorksPage() {
  return (
    <SitePage>
      <PageShell>
        <PageHero
          eyebrow="How it works"
          title={
            <>
              Four clear steps from
              <span className="block text-[#f1ddab]">story to support to visible impact.</span>
            </>
          }
          description="PeaceLeague Africa is built to remove uncertainty from digital giving. Campaign creators get a stronger launch surface, and donors get a clearer sense of legitimacy before they contribute."
          ctaHref="/create"
          ctaLabel="Start a campaign"
        />

        <SectionBlock>
          <SectionIntro
            eyebrow="Flow"
            title="A simpler fundraising path, presented with more clarity."
            description="The platform should make every phase easy to understand: launch, share, fund, and deliver."
          />
          <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8">
            <HowItWorks steps={steps} className="[&_h3]:text-xl [&_p]:leading-7 [&_p]:text-white/62" />
          </Card>
        </SectionBlock>

        <SectionBlock>
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Card className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(212,168,83,0.12),rgba(255,255,255,0.03))] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[#d4a853]">Why this matters</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-white">Trust is a product experience, not just a promise.</h2>
              <p className="mt-5 text-base leading-8 text-white/64">
                Donors need confidence. Organizers need momentum. This system is designed to improve both by combining transparent infrastructure with stronger storytelling surfaces.
              </p>
              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d4a853]/10 text-[#d4a853]">
                    <ArrowRightLeft className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white">From donor hesitation to donor conviction</p>
                    <p className="mt-2 text-sm leading-7 text-white/60">
                      Better structure, clearer proof, and more confident presentation all increase the likelihood of support.
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <div>
              <SectionIntro
                eyebrow="Platform advantages"
                title="The reasons this flow feels stronger than generic crowdfunding."
                description="These are not add-ons. They are the trust mechanisms that make the experience feel serious."
                className="mb-6"
              />
              <FeatureGrid features={benefits} columns={2} className="[&>div]:rounded-[1.7rem] [&>div]:border-white/10 [&>div]:bg-white/[0.04] [&>div]:p-7" />
            </div>
          </div>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
