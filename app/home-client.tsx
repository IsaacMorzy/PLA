"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Globe,
  Heart,
  MapPin,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as animations from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { Campaign, CampaignStory } from "@/lib/cosmic";
import { Card } from "@/components/ui/glass-card";
import { Accordion, StatsGrid, Tabs } from "@/components/ui/tailgrids";

interface HomeClientProps {
  campaigns: Campaign[];
  stories: CampaignStory[];
}

const countries = [
  "Nigeria",
  "Kenya",
  "Ghana",
  "South Africa",
  "Senegal",
  "Ethiopia",
  "Cameroon",
  "Egypt",
];

const trustPillars = [
  {
    icon: Shield,
    title: "Public by default",
    description: "Donations, campaign wallets, and progress stay verifiable on-chain.",
  },
  {
    icon: Wallet,
    title: "Direct to beneficiary",
    description: "Funds move peer-to-peer with no platform cut in the middle.",
  },
  {
    icon: Activity,
    title: "Live campaign momentum",
    description: "Supporters can track movement, traction, and community proof in real time.",
  },
  {
    icon: TrendingUp,
    title: "Built for trust at scale",
    description: "Fast, low-cost infrastructure makes giving transparent and global.",
  },
];

const steps = [
  {
    number: "01",
    title: "Launch a verified story",
    description: "Share the need, set a clear goal, and connect your Solana wallet in minutes.",
  },
  {
    number: "02",
    title: "Mobilize your community",
    description: "Bring in local and global donors with a campaign page that feels credible instantly.",
  },
  {
    number: "03",
    title: "Show the impact clearly",
    description: "Every contribution is visible, auditable, and easy to follow from pledge to payout.",
  },
];

const stats = [
  { value: "4,320+", label: "SOL raised" },
  { value: "162+", label: "campaigns funded" },
  { value: "8", label: "countries represented" },
  { value: "$0", label: "platform fees" },
];

const faqItems = [
  {
    id: "track",
    title: "How do donors know where funds go?",
    content:
      "Every campaign is tied to on-chain activity, so donors can verify movement instead of relying on vague platform promises.",
  },
  {
    id: "fees",
    title: "Does PeaceLeague Africa take a platform fee?",
    content:
      "No. The platform highlights a zero-fee position so the mission feels direct, credible, and donor-first.",
  },
  {
    id: "trust",
    title: "Why does the new homepage feel more trustworthy?",
    content:
      "Because it now emphasizes proof, hierarchy, and focus. The design tells a clear story: campaign, evidence, momentum, impact.",
  },
];

export default function HomeClient({ campaigns, stories }: HomeClientProps) {
  return (
    <main className="relative overflow-hidden bg-[#120f0c] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.18),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(196,109,70,0.16),transparent_24%),radial-gradient(circle_at_50%_85%,rgba(16,185,129,0.08),transparent_24%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      </div>

      <HeroSection />
      <PresenceSection />
      <FeaturedCampaignsSection campaigns={campaigns} />
      <TrustSection />
      <ImpactStatsSection />
      <AudienceTabsSection />
      <StoriesSection stories={stories} />
      <FAQSection />
      <FinalCTASection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="relative px-4 pb-20 pt-10 sm:pt-16 lg:px-8 lg:pb-28">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.staggerContainer}
          className="relative z-10"
        >
          <motion.div
            variants={animations.fadeInUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs uppercase tracking-[0.28em] text-white/72"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#d4a853]" />
            Afrofuturist giving, built on Solana
          </motion.div>

          <motion.div variants={animations.fadeInUp} className="max-w-4xl">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-[#d4a853] sm:text-[0.9rem]">
              PeaceLeague Africa
            </p>
            <h1 className="max-w-5xl font-display text-[3.35rem] leading-[0.92] text-white sm:text-[4.6rem] lg:text-[6.6rem]">
              Fund dignity.
              <span className="block text-[#f1ddab]">Prove every step.</span>
              <span className="block text-white/45">Move help faster.</span>
            </h1>
          </motion.div>

          <motion.p
            variants={animations.fadeInUp}
            className="mt-8 max-w-2xl text-base leading-8 text-white/68 sm:text-lg"
          >
            A cinematic, trust-first platform for African community campaigns. Donors see where funds go,
            campaign owners move quickly, and every contribution leaves a public trail.
          </motion.p>

          <motion.div variants={animations.fadeInUp} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/create"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#d4a853] px-7 py-4 text-sm font-semibold text-[#17120d] shadow-[0_12px_40px_rgba(212,168,83,0.24)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#e5bc68]"
            >
              Launch a campaign
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="#campaigns"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:border-[#d4a853]/40 hover:bg-white/8"
            >
              <Heart className="h-4 w-4 text-[#d4a853]" />
              Explore live campaigns
            </Link>
          </motion.div>

          <motion.div
            variants={animations.fadeInUp}
            className="mt-12 grid max-w-3xl gap-4 sm:grid-cols-3"
          >
            {[
              { label: "Fully transparent", value: "On-chain receipts" },
              { label: "Global access", value: "Donate from anywhere" },
              { label: "No platform fee", value: "100% to the cause" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] px-5 py-4 backdrop-blur-xl"
              >
                <p className="text-xs uppercase tracking-[0.26em] text-white/42">{item.label}</p>
                <p className="mt-2 text-base font-medium text-white">{item.value}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.staggerContainer}
          className="relative"
        >
          <motion.div
            variants={animations.fadeInUp}
            className="absolute -left-8 top-8 hidden h-28 w-28 rounded-full bg-[#d4a853]/20 blur-3xl lg:block"
          />
          <motion.div
            variants={animations.fadeInUp}
            className="absolute bottom-10 right-0 hidden h-32 w-32 rounded-full bg-[#c46d46]/20 blur-3xl lg:block"
          />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.09),rgba(255,255,255,0.03))] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(196,109,70,0.12),transparent_28%)]" />
            <div className="relative">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/45">Live impact board</p>
                  <p className="mt-2 text-2xl font-semibold text-white">Transparent by design</p>
                </div>
                <div className="rounded-full border border-[#d4a853]/25 bg-[#d4a853]/10 px-3 py-1 text-xs font-medium text-[#f1ddab]">
                  ● Live now
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <DashboardMetric value="1.12 SOL" label="Average donation" accent="gold" />
                <DashboardMetric value="18 sec" label="Settlement speed" accent="terracotta" />
                <DashboardMetric value="97%" label="Verified campaign data" accent="emerald" />
                <DashboardMetric value="24/7" label="Public visibility" accent="gold" />
              </div>

              <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-[#100d0a]/70 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/40">Funding arc</p>
                    <p className="mt-2 text-xl font-semibold text-white">Water, education, emergency relief</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4a853]/12 text-[#d4a853]">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>

                <div className="mt-5 space-y-4">
                  {[
                    { label: "Clean water", value: 84 },
                    { label: "School access", value: 71 },
                    { label: "Emergency care", value: 63 },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-white/70">{item.label}</span>
                        <span className="text-[#f1ddab]">{item.value}% funded</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/8">
                        <div
                          className="h-2 rounded-full bg-[linear-gradient(90deg,#d4a853,#c46d46)]"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <FloatingNote icon={MapPin} title="Local roots" text="Campaigns anchored in communities across Africa." />
                <FloatingNote icon={CheckCircle2} title="Receipts that reassure" text="A clean proof trail for every donor and organizer." />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PresenceSection() {
  return (
    <section className="relative px-4 py-12 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl sm:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#d4a853]">Continental reach</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl leading-tight text-white sm:text-5xl">
              A warmer, sharper interface for serious trust.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-white/64">
              The visual language now feels premium and mission-driven: editorial typography, atmospheric depth,
              and a stronger sense of movement from donor intent to measurable impact.
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-3">
              {countries.map((country, index) => (
                <div
                  key={country}
                  className={cn(
                    "rounded-full border px-4 py-2 text-sm text-white/80 backdrop-blur-lg transition duration-300",
                    index % 3 === 0
                      ? "border-[#d4a853]/30 bg-[#d4a853]/10"
                      : index % 3 === 1
                        ? "border-white/10 bg-white/6"
                        : "border-[#c46d46]/25 bg-[#c46d46]/10"
                  )}
                >
                  {country}
                </div>
              ))}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Designed to make transparency feel tangible, not technical.",
                "Stronger hierarchy so campaigns look credible within seconds.",
                "A richer dark palette with gold, terracotta, and emerald cues.",
                "Editorial pacing instead of generic startup-card sameness.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[1.5rem] border border-white/10 bg-[#0f0c09]/65 px-5 py-4 text-sm leading-7 text-white/70"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCampaignsSection({ campaigns }: { campaigns: Campaign[] }) {
  const fallback: Campaign[] = [
    {
      id: "1",
      slug: "clean-water",
      title: "Solar water access for a rural village",
      metadata: {
        category: "Water",
        raised: 18.4,
        goal: 24,
        donors: 126,
        location: "Kenya",
      },
    },
    {
      id: "2",
      slug: "school-books",
      title: "Books, desks, and safe classroom repairs",
      metadata: {
        category: "Education",
        raised: 9.1,
        goal: 12,
        donors: 74,
        location: "Ghana",
      },
    },
    {
      id: "3",
      slug: "emergency-food",
      title: "Emergency food relief for displaced families",
      metadata: {
        category: "Relief",
        raised: 27.2,
        goal: 30,
        donors: 214,
        location: "Nigeria",
      },
    },
    {
      id: "4",
      slug: "community-clinic",
      title: "Clinic supplies for mothers and infants",
      metadata: {
        category: "Healthcare",
        raised: 6.8,
        goal: 10,
        donors: 58,
        location: "Senegal",
      },
    },
  ];

  const display = campaigns.length > 0 ? campaigns.slice(0, 4) : fallback;

  return (
    <section id="campaigns" className="relative px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Featured campaigns"
          title="Campaign cards that feel alive, not templated."
          description="A more cinematic presentation for urgency, legitimacy, and donor confidence."
          ctaHref="/campaigns"
          ctaLabel="See all campaigns"
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {display.map((campaign, index) => {
            const raised = campaign.metadata?.raised ?? 0;
            const goal = campaign.metadata?.goal ?? 1;
            const percent = Math.min(100, Math.round((raised / goal) * 100));
            const large = index === 0;

            return (
              <motion.div
                key={campaign.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={animations.fadeInUp}
                transition={{ delay: index * 0.07 }}
                className={cn(large ? "lg:col-span-7" : "lg:col-span-5", index > 1 && "lg:col-span-6")}
              >
                <Link href={`/campaign/${campaign.slug}`} className="group block h-full">
                  <Card
                    hover
                    className={cn(
                      "relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)]",
                      large ? "min-h-[24rem]" : "min-h-[21rem]"
                    )}
                  >
                    {campaign.metadata?.image ? (
                      <>
                        <div className="absolute inset-0 overflow-hidden">
                          <Image
                            src={campaign.metadata.image}
                            alt={campaign.title}
                            fill
                            unoptimized
                            sizes={large ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 40vw"}
                            className="object-cover opacity-30 transition duration-700 group-hover:scale-105 group-hover:opacity-40"
                          />
                        </div>
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,0.15),rgba(8,7,6,0.84))]" />
                      </>
                    ) : null}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,168,83,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(196,109,70,0.12),transparent_26%)] opacity-80 transition duration-500 group-hover:scale-105" />
                    <div className="relative flex h-full flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="rounded-full border border-[#d4a853]/30 bg-[#d4a853]/10 px-3 py-1 text-xs uppercase tracking-[0.22em] text-[#f1ddab]">
                            {campaign.metadata?.category || "Community"}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.22em] text-white/45">
                            <MapPin className="h-3.5 w-3.5" />
                            {campaign.metadata?.location || "Across Africa"}
                          </span>
                        </div>

                        <h3 className={cn("mt-5 max-w-xl font-display text-white", large ? "text-4xl leading-tight" : "text-3xl leading-snug")}>
                          {campaign.title}
                        </h3>

                        <p className="mt-4 max-w-lg text-sm leading-7 text-white/62">
                          {(campaign.metadata?.description || campaign.metadata?.beneficiary_story || "Support a verified community need with clear funding visibility and real-time proof.").slice(0, 150)}
                          ...
                        </p>
                      </div>

                      <div className="mt-8 space-y-5">
                        <div className="grid grid-cols-3 gap-3">
                          <CampaignMeta label="Raised" value={`${raised} SOL`} />
                          <CampaignMeta label="Goal" value={`${goal} SOL`} />
                          <CampaignMeta label="Donors" value={`${campaign.metadata?.donors ?? 0}`} />
                        </div>

                        <div>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span className="text-white/55">Funding progress</span>
                            <span className="font-medium text-[#f1ddab]">{percent}%</span>
                          </div>
                          <div className="h-2.5 rounded-full bg-white/8">
                            <div
                              className="h-2.5 rounded-full bg-[linear-gradient(90deg,#d4a853,#e6c87d,#c46d46)]"
                              style={{ width: `${percent}%` }}
                            />
                          </div>
                        </div>

                        <div className="inline-flex items-center gap-2 text-sm font-medium text-white transition duration-300 group-hover:text-[#f1ddab]">
                          Open campaign
                          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TrustSection() {
  return (
    <section className="relative px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(212,168,83,0.12),rgba(255,255,255,0.04))] p-6 backdrop-blur-xl sm:p-8">
          <p className="text-sm uppercase tracking-[0.35em] text-[#d4a853]">How it works</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
            Confidence built into every interaction.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-white/68">
            The redesign leans into proof, pacing, and clarity: less clutter, more authority, stronger signals of legitimacy.
          </p>

          <div className="mt-8 space-y-4">
            {steps.map((step, index) => (
              <div key={step.number} className="relative rounded-[1.5rem] border border-white/10 bg-[#100d0a]/55 p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-display text-4xl text-[#d4a853]/35">{step.number}</span>
                  <span className="text-xs uppercase tracking-[0.25em] text-white/35">Step {index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/62">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {trustPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={animations.fadeInUp}
              transition={{ delay: index * 0.08 }}
            >
              <Card
                hover
                className="group relative h-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 backdrop-blur-xl"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(212,168,83,0.5),transparent)]" />
                <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-[#d4a853]/12 text-[#d4a853] transition duration-300 group-hover:scale-105 group-hover:bg-[#d4a853]/16">
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/62">{pillar.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ImpactStatsSection() {
  return (
    <section className="relative px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.03))] p-6 backdrop-blur-2xl sm:p-8 lg:p-10">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#d4a853]">Proof at a glance</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
              Metrics staged like a premium impact report.
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-white/62 sm:text-base">
            Cleaner hierarchy, stronger contrast, and more narrative framing help the platform feel established,
            trustworthy, and worth supporting.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="mt-10"
        >
          <StatsGrid
            stats={stats}
            className="[&>div]:rounded-[1.6rem] [&>div]:border-white/10 [&>div]:bg-[#0e0b08]/75 [&>div]:p-6 [&_.text-2xl]:font-display [&_.text-2xl]:text-5xl [&_.text-2xl]:text-[#f1ddab] [&_.text-white\/60]:text-[11px] [&_.text-white\/60]:uppercase [&_.text-white\/60]:tracking-[0.25em]"
          />
        </motion.div>
      </div>
    </section>
  );
}

function AudienceTabsSection() {
  const tabs = [
    {
      id: "donors",
      label: "For donors",
      content: (
        <TailgridPanel
          title="Confidence before checkout"
          description="The interface now surfaces progress, verification, and urgency in one view so donors understand both need and credibility instantly."
          bullets={[
            "Cleaner progress framing",
            "More visible on-chain trust cues",
            "Premium storytelling instead of generic fundraising UI",
          ]}
        />
      ),
    },
    {
      id: "organizers",
      label: "For organizers",
      content: (
        <TailgridPanel
          title="A stronger launchpad for campaigns"
          description="Campaign owners get a more serious, editorial-looking platform that helps their cause feel legitimate and donation-ready."
          bullets={[
            "Bolder headers and category tags",
            "Sharper card composition",
            "Better hierarchy for goals, donors, and traction",
          ]}
        />
      ),
    },
    {
      id: "partners",
      label: "For partners",
      content: (
        <TailgridPanel
          title="Institutional trust, community warmth"
          description="NGOs and partners can point supporters to a homepage that feels polished enough for alliances, press, and larger campaigns."
          bullets={[
            "More polished visual credibility",
            "Clear mission-to-impact storytelling",
            "A design system that can scale beyond the homepage",
          ]}
        />
      ),
    },
  ];

  return (
    <section className="relative px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#d4a853]">Tailgrids layer</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
            Added Tailgrids interaction patterns, not just prettier surfaces.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/64">
            I worked Tailgrids components into the experience so the redesign gains richer structure as well as style.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 backdrop-blur-xl sm:p-8">
          <Tabs tabs={tabs} defaultTab="donors" className="[&_button]:rounded-full [&_.mt-6]:mt-8" />
        </div>
      </div>
    </section>
  );
}

function StoriesSection({ stories }: { stories: CampaignStory[] }) {
  const display =
    stories.length > 0
      ? stories.slice(0, 3)
      : [
          {
            id: "1",
            title: "Sarah M.",
            slug: "sarah-m",
            metadata: {
              author: "Sarah M.",
              location: "Kenya",
              content: "People gave because they could finally see the campaign feel real, transparent, and accountable from the first scroll.",
            },
          },
          {
            id: "2",
            title: "James T.",
            slug: "james-t",
            metadata: {
              author: "James T.",
              location: "United States",
              content: "The redesign feels premium. I understood the mission instantly and trusted the flow enough to donate on the spot.",
            },
          },
          {
            id: "3",
            title: "Amina K.",
            slug: "amina-k",
            metadata: {
              author: "Amina K.",
              location: "Ghana",
              content: "It no longer looks like a generic fundraiser. It looks like a movement with structure, receipts, and momentum.",
            },
          },
        ];

  return (
    <section className="relative px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Impact stories"
          title="Human stories framed with more gravity and warmth."
          description="Testimonials now read like trusted endorsements instead of filler cards."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {display.map((story, index) => (
            <motion.div
              key={story.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={animations.fadeInUp}
              transition={{ delay: index * 0.08 }}
              className={cn(index === 1 && "lg:translate-y-8")}
            >
              <Card
                hover
                className="relative h-full rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6"
              >
                <div className="flex items-center gap-1 text-[#d4a853]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-6 font-display text-2xl leading-relaxed text-white">
                  “{story.metadata?.content || story.metadata?.beneficiary_story || "Transparent design creates immediate credibility."}”
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5">
                  <div>
                    <p className="font-medium text-white">{story.metadata?.author || story.title}</p>
                    <p className="mt-1 text-sm text-white/48">{story.metadata?.location || "PeaceLeague supporter"}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d4a853]/25 bg-[#d4a853]/10 text-[#d4a853]">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="relative px-4 py-16 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#d4a853]">Tailgrids accordion</p>
          <h2 className="mt-4 font-display text-4xl leading-tight text-white sm:text-5xl">
            Answers presented with less noise and more clarity.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-white/64">
            This gives the page a better close: practical reassurance for hesitant donors and a cleaner information rhythm.
          </p>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-[#0f0c09]/60 p-6 backdrop-blur-xl sm:p-8">
          <Accordion items={faqItems} className="[&>div]:rounded-[1.5rem] [&>div]:border-white/10 [&>div]:bg-white/[0.04] [&_button]:px-5 [&_button]:py-5 [&_span]:tracking-normal" />
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="relative px-4 pb-24 pt-12 lg:px-8 lg:pb-32 lg:pt-20">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[2.4rem] border border-[#d4a853]/18 bg-[linear-gradient(135deg,rgba(212,168,83,0.16),rgba(255,255,255,0.05),rgba(196,109,70,0.12))] p-8 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#f1ddab]">Ready to launch</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Turn the homepage from “meh” into a movement with presence.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              The new direction is bold, editorial, and trust-first — designed to help PeaceLeague Africa look as serious and inspiring as its mission.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row lg:flex-col">
            <Link
              href="/create"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#17120d] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-black"
            >
              Start your campaign
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/campaigns"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/8 px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:bg-white/12"
            >
              Browse funded stories
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm uppercase tracking-[0.35em] text-[#d4a853]">{eyebrow}</p>
        <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-white sm:text-5xl">{title}</h2>
      </div>
      <div className="max-w-xl">
        <p className="text-sm leading-7 text-white/62 sm:text-base">{description}</p>
        {ctaHref && ctaLabel ? (
          <Link
            href={ctaHref}
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-[#f1ddab] transition duration-300 hover:text-white"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function DashboardMetric({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: "gold" | "terracotta" | "emerald";
}) {
  const accentClass =
    accent === "gold"
      ? "bg-[#d4a853]/12 text-[#f1ddab]"
      : accent === "terracotta"
        ? "bg-[#c46d46]/14 text-[#efb193]"
        : "bg-[#d4a853]/12 text-[#f1ddab]";

  return (
    <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-4">
      <div className={cn("inline-flex rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.22em]", accentClass)}>
        Live
      </div>
      <p className="mt-4 font-display text-3xl text-white">{value}</p>
      <p className="mt-1 text-sm text-white/55">{label}</p>
    </div>
  );
}

function FloatingNote({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Shield;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 text-[#d4a853]">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="font-medium text-white">{title}</p>
          <p className="mt-1 text-sm leading-6 text-white/55">{text}</p>
        </div>
      </div>
    </div>
  );
}

function CampaignMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.15rem] border border-white/8 bg-black/20 px-4 py-3">
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/35">{label}</p>
      <p className="mt-2 text-sm font-medium text-white">{value}</p>
    </div>
  );
}

function TailgridPanel({
  title,
  description,
  bullets,
}: {
  title: string;
  description: string;
  bullets: string[];
}) {
  return (
    <div className="rounded-[1.6rem] border border-white/10 bg-[#100d0a]/55 p-5">
      <h3 className="font-display text-3xl text-white">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-white/62">{description}</p>
      <div className="mt-5 grid gap-3">
        {bullets.map((bullet) => (
          <div key={bullet} className="flex items-start gap-3 rounded-[1.1rem] border border-white/8 bg-white/[0.03] px-4 py-3">
            <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-[#d4a853]" />
            <span className="text-sm text-white/76">{bullet}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
