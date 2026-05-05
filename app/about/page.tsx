import { Metadata } from "next";
import { Activity, Globe, HeartHandshake, Shield, Sparkles, Users } from "lucide-react";
import { Card } from "@/components/ui/glass-card";
import { FeatureGrid } from "@/components/ui/feature";
import { StatsGrid } from "@/components/ui/tailgrids";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "About Us - PeaceLeague Africa",
  description: "Learn about our mission to empower communities through transparent crowdfunding.",
};

const values = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Proof over promises",
    description: "We design for visible accountability so trust is earned through transparent fundraising signals.",
  },
  {
    icon: <HeartHandshake className="h-6 w-6" />,
    title: "Community-led impact",
    description: "Campaigns are rooted in real local needs and shaped around people closest to the problem.",
  },
  {
    icon: <Activity className="h-6 w-6" />,
    title: "Action with momentum",
    description: "We prioritize speed, clarity, and direct support so donors and organizers can move decisively.",
  },
];

const trustReasons = [
  "Every donation can be verified through on-chain activity.",
  "Campaign pages are designed to communicate legitimacy faster.",
  "The platform is built for direct, low-friction giving across borders.",
  "Organizers can show progress in a way donors can actually trust.",
];

export default function AboutPage() {
  return (
    <SitePage>
      <PageShell>
        <PageHero
          eyebrow="About PeaceLeague Africa"
          title={
            <>
              A trust-first platform for
              <span className="block text-[#f1ddab]">community fundraising across Africa.</span>
            </>
          }
          description="PeaceLeague Africa combines the warmth of grassroots giving with the clarity of modern on-chain infrastructure. The goal is simple: help more causes look credible, feel urgent, and receive support faster."
          ctaHref="/campaigns"
          ctaLabel="Explore campaigns"
        />

        <SectionBlock>
          <StatsGrid
            stats={[
              { value: "4,320+", label: "SOL raised" },
              { value: "162+", label: "campaigns funded" },
              { value: "8", label: "countries represented" },
              { value: "$0", label: "platform fee" },
            ]}
            className="[&>div]:rounded-[1.6rem] [&>div]:border-white/10 [&>div]:bg-[#0e0b08]/75 [&>div]:p-6 [&_.text-2xl]:font-display [&_.text-2xl]:text-5xl [&_.text-2xl]:text-[#f1ddab] [&_.text-white\/60]:text-[11px] [&_.text-white\/60]:uppercase [&_.text-white\/60]:tracking-[0.25em]"
          />
        </SectionBlock>

        <SectionBlock>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(212,168,83,0.12),rgba(255,255,255,0.03))] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[#d4a853]">Our mission</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-white">Make transparent giving feel immediate, dignified, and credible.</h2>
              <p className="mt-5 text-base leading-8 text-white/64">
                We help campaign owners tell urgent stories with more structure and help donors understand impact without friction. The platform exists to reduce doubt and strengthen action.
              </p>
            </Card>
            <Card className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(196,109,70,0.12),rgba(255,255,255,0.03))] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[#d4a853]">Our vision</p>
              <h2 className="mt-4 font-display text-4xl leading-tight text-white">A continent-scale network of campaigns donors can trust at first glance.</h2>
              <p className="mt-5 text-base leading-8 text-white/64">
                We want fundraising pages for African communities to feel as polished and convincing as the best product platforms on the internet — while staying human and mission-led.
              </p>
            </Card>
          </div>
        </SectionBlock>

        <SectionBlock>
          <SectionIntro
            eyebrow="Values"
            title="The principles shaping every campaign, donation, and product decision."
            description="The redesign is not just aesthetic. It reflects how the platform should behave: clear, accountable, and community-centered."
          />
          <FeatureGrid features={values} columns={3} className="[&>div]:rounded-[1.7rem] [&>div]:border-white/10 [&>div]:bg-white/[0.04] [&>div]:p-7" />
        </SectionBlock>

        <SectionBlock>
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <SectionIntro
                eyebrow="Why on-chain"
                title="Technology is here to reinforce trust, not distract from the mission."
                description="Solana gives PeaceLeague Africa a way to make fundraising activity legible, fast, and verifiable — especially for global donors who need confidence before they contribute."
                className="mb-0"
              />
            </div>
            <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {trustReasons.map((reason, index) => (
                  <div key={reason} className="rounded-[1.4rem] border border-white/8 bg-black/20 p-5">
                    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#d4a853]/10 text-[#d4a853]">
                      {index % 2 === 0 ? <Globe className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                    </div>
                    <p className="text-sm leading-7 text-white/68">{reason}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </SectionBlock>

        <SectionBlock>
          <Card className="rounded-[2.1rem] border border-[#d4a853]/16 bg-[linear-gradient(135deg,rgba(212,168,83,0.16),rgba(255,255,255,0.04),rgba(196,109,70,0.1))] p-8 sm:p-10">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-[#f1ddab]">What we are building</p>
                <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-white sm:text-5xl">
                  A platform where generosity feels modern, transparent, and impossible to ignore.
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/20 px-4 py-2 text-sm text-white/70">
                <Sparkles className="h-4 w-4 text-[#d4a853]" />
                PeaceLeague Africa, reimagined with precision
              </div>
            </div>
          </Card>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
