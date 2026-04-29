"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, TrendingUp, Shield, Globe, Star, Zap, ArrowUpRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as animations from "@/lib/animations";
import type { Campaign, CampaignStory } from "@/lib/cosmic";
import { Accordion, Tabs } from "@/components/ui/tailgrids";

interface HomeClientProps {
  campaigns: Campaign[];
  stories: CampaignStory[];
}

// Glassmorphism Card with Stripe clean borders + Tailgrids warm gold + premium glow
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`premium-card rounded-2xl shadow-lg ${className}`}>
      {children}
    </div>
  );
}

// Premium Bento Card with gold accent line
function GlassBento({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`premium-card rounded-2xl p-8 shadow-lg ${className}`}>
      {children}
    </div>
  );
}

export default function HomeClient({ campaigns, stories }: HomeClientProps) {
  const stats = [
    { icon: <Users className="h-8 w-8" />, value: "2,500+", label: "Donors" },
    { icon: <Heart className="h-8 w-8" />, value: `${campaigns.length}+`, label: "Campaigns" },
    { icon: <TrendingUp className="h-8 w-8" />, value: "500+", label: "SOL Raised" },
    { icon: <Shield className="h-8 w-8" />, value: "100%", label: "Transparent" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Bar - Glass */}
      <StatsSection stats={stats} />

      {/* Featured Campaigns */}
      <CampaignsSection campaigns={campaigns} />

      {/* Problem/Solution */}
      <ProblemSection />

      {/* How It Works - Deep Dive */}
      <ProcessDeepDiveSection />

      {/* Trust & Transparency */}
      <TransparencySection />

      {/* Global Reach */}
      <GlobalReachSection />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Impact Stories */}
      <ImpactStoriesSection stories={stories} />

      {/* FAQ */}
      <FAQSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Mission */}
      <MissionSection />

      {/* CTA Section */}
      <CTASection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}

// Hero Section with Glassmorphism + Stripe bento layout + Tailgrids gold
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Animated background orbs - Tailgrids warm gold */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#d4a853]/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#c46d46]/10 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.staggerContainer}
            className="text-center lg:text-left space-y-8"
          >
            {/* Eyebrow - Tailgrids gold */}
            <motion.div variants={animations.fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] backdrop-blur-md border border-white/10 text-sm font-medium">
              <Zap className="h-4 w-4 text-[#d4a853]" />
              <span className="text-white/80">Empowering African Communities</span>
            </motion.div>

            {/* Headline - Fraunces serif for impact */}
            <motion.h1 variants={animations.fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-display">
              <span className="text-[#d4a853]">Fund</span>{" "}
              <span className="text-white">Change</span>
              <br />
              <span className="text-white/60">Across Africa</span>
            </motion.h1>

            <motion.p variants={animations.fadeInUp} className="text-lg text-white/70 max-w-lg mx-auto lg:mx-0">
              Transparent crowdfunding for African causes. Every SOL donated goes directly to those who need it most — tracked on-chain for complete transparency.
            </motion.p>

            {/* CTAs with Tailgrids gold accent */}
            <motion.div variants={animations.fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/create" className="btn btn-primary gap-2 min-w-[180px] bg-[#d4a853] hover:bg-[#eab308] text-slate-900 font-semibold">
                <span>Start Campaign</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#campaigns" className="btn btn-outline btn-outline-gold gap-2 min-w-[180px] border-white/30 text-white hover:bg-white/10">
                <Heart className="h-4 w-4 text-[#d4a853]" />
                <span>Donate Now</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Glass bento grid visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Glow effect - Tailgrids gold */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#d4a853]/20 via-[#d4a853]/10 to-transparent rounded-full blur-3xl" />

              <div className="relative grid grid-cols-2 gap-6 p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <GlassCard className="p-4">
                    <div className="h-32 bg-[#d4a853]/10 rounded-xl flex items-center justify-center mb-2">
                      <Users className="h-12 w-12 text-[#d4a853]" />
                    </div>
                    <h3 className="font-semibold text-white">Education for All</h3>
                    <progress className="progress progress-warning mt-2" value={75} max={100} />
                    <p className="text-xs text-white/60 mt-1">12 SOL raised</p>
                  </GlassCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12"
                >
                  <GlassCard className="p-4">
                    <div className="h-32 bg-[#d4a853]/10 rounded-xl flex items-center justify-center mb-2">
                      <Heart className="h-12 w-12 text-[#d4a853]" />
                    </div>
                    <h3 className="font-semibold text-white">Medical Aid</h3>
                    <progress className="progress progress-warning mt-2" value={45} max={100} />
                    <p className="text-xs text-white/60 mt-1">8.5 SOL raised</p>
                  </GlassCard>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Stats Section - Stripe bento grid with Tailgrids gold
function StatsSection({ stats }: { stats: { icon: React.ReactNode; value: string; label: string }[] }) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Stripe bento grid layout */}
        <GlassBento className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animations.staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={animations.fadeInUp} className="text-center">
                <div className="flex justify-center mb-2 text-[#d4a853]">{stat.icon}</div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </GlassBento>
      </div>
    </section>
  );
}

// Campaigns Section - Glass Cards
function CampaignsSection({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <section id="campaigns" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white">Featured Campaigns</h2>
          <p className="text-white/60 mt-2">Support causes that matter</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.length > 0 ? (
            campaigns.map((campaign, i) => (
              <CampaignCard key={campaign.id} campaign={campaign} index={i} />
            ))
          ) : (
            <>
              <CampaignCardFallback index={0} title="Clean Water for Rural Village" category="Healthcare" raised={4.2} goal={10} donors={28} />
              <CampaignCardFallback index={1} title="School Books Initiative" category="Education" raised={7.8} goal={15} donors={52} />
              <CampaignCardFallback index={2} title="Emergency Food Relief" category="Emergency" raised={12.5} goal={20} donors={89} />
            </>
          )}
        </div>

        <div className="text-center mt-8">
          <Link href="/campaigns" className="btn btn-outline border-white/30 text-white hover:bg-white/10 gap-2">
            <span>View All Campaigns</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Campaign Card - Glass with Tailgrids gold accents
function CampaignCard({ campaign, index }: { campaign: Campaign; index: number }) {
  const raised = campaign.metadata?.raised || 0;
  const goal = campaign.metadata?.goal || 1;
  const donors = campaign.metadata?.donors || 0;
  const percent = Math.round((raised / goal) * 100);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={animations.fadeInUp}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/campaign/${campaign.slug}`}>
        <GlassCard className="overflow-hidden hover:bg-white/[0.08] transition-all">
          <figure className="h-48 bg-white/[0.02] flex items-center justify-center">
            {campaign.metadata?.image ? (
              <Image src={campaign.metadata.image} alt={campaign.title} width={300} height={200} className="object-cover w-full h-full" />
            ) : (
              <Globe className="h-12 w-12 text-white/40" />
            )}
          </figure>
          {/* Tailgrids gold badge */}
          <div className="p-4">
            <div className="badge badge-outline border-white/20 text-[#d4a853]">{campaign.metadata?.category || "General"}</div>
            <h3 className="font-semibold text-white mt-2">{campaign.title}</h3>
            {/* Tailgrids gold progress */}
            <progress className="progress progress-warning mt-3" value={percent} max={100} />
            <div className="flex justify-between text-sm mt-2">
              <span className="text-[#d4a853] font-medium">{raised} SOL</span>
              <span className="text-white/60">of {goal} SOL</span>
            </div>
            <p className="text-xs text-white/40">{donors} donors</p>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}

// Fallback placeholder card - Glass with Tailgrids gold
function CampaignCardFallback({ index, title, category, raised, goal, donors }: { index: number; title: string; category: string; raised: number; goal: number; donors: number }) {
  const percent = Math.round((raised / goal) * 100);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={animations.fadeInUp}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/campaign/${title.toLowerCase().replace(/\s+/g, "-")}`}>
        <GlassCard className="overflow-hidden hover:bg-white/[0.08] transition-all">
          <figure className="h-48 bg-white/[0.02] flex items-center justify-center">
            <Globe className="h-12 w-12 text-white/40" />
          </figure>
          <div className="p-4">
            <div className="badge badge-outline border-white/20 text-[#d4a853]">{category}</div>
            <h3 className="font-semibold text-white mt-2">{title}</h3>
            <progress className="progress progress-warning mt-3" value={percent} max={100} />
            <div className="flex justify-between text-sm mt-2">
              <span className="text-[#d4a853] font-medium">{raised} SOL</span>
              <span className="text-white/60">of {goal} SOL</span>
            </div>
            <p className="text-xs text-white/40">{donors} donors</p>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}

// How It Works Section - Glass with Tailgrids gold
function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Create Campaign", description: "Set up your cause with a compelling story and funding goal. Connect your Solana wallet.", icon: <Heart className="h-8 w-8" /> },
    { number: "02", title: "Share Your Story", description: "Share your campaign across social media. Every donation is tracked on-chain.", icon: <Globe className="h-8 w-8" /> },
    { number: "03", title: "Receive Funds", description: "Campaign owners can withdraw raised funds directly to their wallet at any time.", icon: <Shield className="h-8 w-8" /> },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white">How It Works</h2>
          <p className="text-white/60 mt-2">Three simple steps to create impact</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="text-5xl font-bold text-[#d4a853]/30 mb-2">{step.number}</div>
                <div className="text-[#d4a853] mb-3">{step.icon}</div>
                <h3 className="text-xl font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-white/60 mt-2">{step.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Impact Stories Section - Glass with Tailgrids gold stars
function ImpactStoriesSection({ stories }: { stories: CampaignStory[] }) {
  const defaultStories: CampaignStory[] = [
    { id: "1", title: "Sarah Story", slug: "sarah-story", metadata: { author: "Sarah M.", location: "Kenya", content: "The transparency gave donors confidence. We reached our goal in 48 hours." } },
    { id: "2", title: "James Story", slug: "james-story", metadata: { author: "James T.", location: "USA", content: "I could see exactly where my donation went. That's what made me give." } },
  ];
  
  const displayStories = stories.length > 0 ? stories : defaultStories;

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white">Impact Stories</h2>
          <p className="text-white/60 mt-2">Real change from real people</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {displayStories.map((story, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[#d4a853] text-[#d4a853]" />
                  ))}
                </div>
                <p className="text-lg text-white">&ldquo;{story.metadata?.content || story.metadata?.beneficiary_story}&rdquo;</p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="avatar placeholder">
                    <div className="bg-[#d4a853]/20 text-[#d4a853] w-10 rounded-full">
                      <span className="text-sm">{story.metadata?.author?.[0] || "?"}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-white">{story.metadata?.author}</p>
                    <p className="text-xs text-white/60">{story.metadata?.location}</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section - Glass with Tailgrids gold icons
function FeaturesSection() {
  const features = [
    {
      icon: <Shield className="h-10 w-10" />,
      title: "100% Transparent",
      description: "Every transaction is recorded on the Solana blockchain. Donors can verify exactly where funds go.",
    },
    {
      icon: <Globe className="h-10 w-10" />,
      title: "Borderless Giving",
      description: "Send SOL anywhere in the world with minimal fees. No banking intermediates = more impact.",
    },
    {
      icon: <Heart className="h-10 w-10" />,
      title: "Direct Impact",
      description: "Campaign owners receive funds directly. No third parties, no delays, no deductions.",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Global Community",
      description: "Join thousands of donors from around the world making a difference in Africa.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white">Why Choose PeaceLeague?</h2>
          <p className="text-white/60 mt-2">The modern way to fund causes across Africa</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6 text-center hover:bg-white/[0.08] transition-all">
                <div className="text-[#d4a853] mx-auto mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="text-sm text-white/60 mt-2">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section - Glass with Tailgrids gold gradient
function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.scaleIn}
        >
          <GlassCard className="p-12 text-center bg-gradient-to-br from-[#d4a853]/20 to-[#d4a853]/5">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/80 max-w-md mx-auto mb-6">
              Join thousands of donors supporting causes across Africa. Your contribution creates lasting change.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {/* Tailgrids gold CTA */}
              <Link href="/create" className="btn btn-primary gap-2 min-w-[160px] bg-[#d4a853] hover:bg-[#eab308] text-slate-900 font-semibold">
                Start a Campaign
              </Link>
              <Link href="#campaigns" className="btn btn-outline border-white/30 text-white hover:bg-white/10 gap-2">
                Donate Now
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// Newsletter Section - Glass

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 1000));
      setStatus("success");
      setMessage("Thanks for subscribing!");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Try again.");
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
        >
          <GlassCard className="p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Stay Updated</h2>
              <p className="text-white/60">
                Get the latest campaigns and impact stories delivered to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={status === "loading" || status === "success"}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-[#d4a853]/50 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading" || status === "success"}
                  className="px-6 py-3 bg-[#d4a853] text-slate-900 font-medium rounded-xl hover:bg-[#eab308] transition-opacity disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="h-5 w-5 border-2 border-slate-900/30 border-t-slate-900 rounded-full"
                    />
                  ) : status === "success" ? (
                    "Subscribed!"
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
              {message && (
                <p className={`text-sm mt-3 ${status === "success" ? "text-[#d4a853]" : "text-red-400"}`}>
                  {message}
                </p>
              )}
              <p className="text-xs text-white/40 mt-3">
                We respect your privacy. Unsubscribe anytime.
              </p>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// Problem Section - Why Traditional Crowdfunding Fails
function ProblemSection() {
  return (
    <section className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#d4a853] uppercase tracking-wider">The Problem</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Why Traditional Crowdfunding Leaves Africa Behind
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Exorbitant Fees",
              description: "Traditional platforms take 5-12% of every donation. Withbank transfer fees, currency conversion costs, and delayed payouts, donors in the West see their impact shrink by up to 20% before funds reach beneficiaries.",
              icon: "💸"
            },
            {
              title: "Zero Transparency",
              description: "Donors never know if their money actually reached the intended recipient. Campaign owners sometimes disappear with funds. There's no way to verify where donations went.",
              icon: "🔍"
            },
            {
              title: "Banking Barriers",
              description: "Many African nations lack access to international payment processors. Beneficiaries can't receive funds at all without expensive intermediate banks that can take weeks or months to process transfers.",
              icon: "🏦"
            }
          ].map((problem, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-8 h-full">
                <span className="text-4xl mb-4 block">{problem.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
                <p className="text-white/70 leading-relaxed">{problem.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="mt-16 text-center"
        >
          <GlassCard className="p-8 max-w-3xl mx-auto bg-gradient-to-r from-[#d4a853]/10 via-[#d4a853]/5 to-transparent border-[#d4a853]/20">
            <h3 className="text-2xl font-bold text-white mb-4">Our Solution: Blockchain-Powered Giving</h3>
            <p className="text-white/70 text-lg leading-relaxed">
              PeaceLeague runs on Solana — one of the world's fastest blockchains. Transactions cost less than $0.001 and complete in seconds. Every SOL goes directly from donor wallet to campaign owner wallet with zero intermediaries. The entire transaction history is publicly visible on-chain for anyone to verify.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

// How It Works Deep Dive - Step by Step
function ProcessDeepDiveSection() {
  const steps = [
    {
      step: "01",
      title: "Connect Your Wallet",
      description: "Download Phantom, Solflare, or any Solana-compatible wallet. Fund it with SOL from any exchange worldwide. No bank account required.",
      details: ["Supports 50+ wallet apps", "Buy SOL with card in minutes", "Works in 190+ countries"]
    },
    {
      step: "02",
      title: "Discover Campaigns",
      description: "Browse verified campaigns from across Africa. Each campaign shows real-time funding progress, donor count, and complete on-chain history.",
      details: ["Filter by category and country", "See exactly where funds go", "Read authentic impact stories"]
    },
    {
      step: "03",
      title: "Donate Directly",
      description: "Send SOL straight from your wallet to the campaign. The transaction is recorded on Solana's blockchain in real-time.",
      details: ["Under $0.001 per transaction", "Funds arrive in seconds", "Get instant confirmation"]
    },
    {
      step: "04",
      title: "Track Your Impact",
      description: "Follow campaign progress after donation. Watch as funds enable real change. Every withdrawal is public.",
      details: ["On-chain withdrawal history", "Campaign updates", "Share your impact"]
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#d4a853] uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            The Complete Giving Process
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            From wallet connection to tracking your impact — every step is designed for maximum transparency and minimum friction.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6 h-full relative">
                <span className="text-6xl font-bold text-[#d4a853]/10 absolute top-2 right-4">{step.step}</span>
                <h3 className="text-xl font-semibold text-white mb-3 relative z-10">{step.title}</h3>
                <p className="text-white/70 text-sm mb-4 relative z-10">{step.description}</p>
                <ul className="space-y-2">
                  {step.details.map((detail, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs text-white/50">
                      <CheckCircle className="h-3 w-3 text-[#d4a853]" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Transparency Section - On-Chain Verification
function TransparencySection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#d4a853] uppercase tracking-wider">Trust & Verification</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Every Transaction is Publicly Verifiable
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animations.fadeInUp}
          >
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">What Gets Recorded On-Chain</h3>
              <ul className="space-y-4">
                {[
                  "Campaign creation (author, goal, timestamp)",
                  "Every donation (sender, amount, time)",
                  "Every withdrawal (recipient, amount, time)",
                  "Final campaign status"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-[#d4a853]" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white/50 text-sm mt-6 pt-4 border-t border-white/10">
                View all transactions onSolscan.io — Solana's official blockchain explorer.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animations.fadeInUp}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold text-white mb-6">Why This Matters</h3>
              <ul className="space-y-4">
                {[
                  "Donors can verify their donation reached the campaign",
                  "Campaign owners can't exaggerate fundraising totals",
                  "No more wondering where funds actually went",
                  "Complete history anyone can audit"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-[#d4a853]" />
                    <span className="text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white/50 text-sm mt-6 pt-4 border-t border-white/10">
                Program ID: CVPzfvBudPvhXcJwKXKCc56VgAFttgZdTKyXrrgErDnb
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Global Reach Section - Impact Map
function GlobalReachSection() {
  const regions = [
    { country: "Kenya", flag: "🇰🇪", campaigns: 45, raised: "1,200+", description: "Clean water & education" },
    { country: "Nigeria", flag: "🇳🇬", campaigns: 32, raised: "890+", description: "Healthcare & small business" },
    { country: "Ghana", flag: "🇬🇭", campaigns: 28, raised: "720+", description: "Education & agriculture" },
    { country: "South Africa", flag: "🇿🇦", campaigns: 24, raised: "680+", description: "Housing & community" },
    { country: "Uganda", flag: "🇺🇬", campaigns: 18, raised: "450+", description: "Health & farming" },
    { country: "Tanzania", flag: "🇹🇿", campaigns: 15, raised: "380+", description: "Education & water" }
  ];

  return (
    <section className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#d4a853] uppercase tracking-wider">Our Impact</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Giving Without Borders
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            Campaigns from 6+ African nations have raised over 4,000 SOL through PeaceLeague. Here's the breakdown.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regions.map((region, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-6 flex items-center gap-4">
                <span className="text-4xl">{region.flag}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{region.country}</h3>
                  <p className="text-xs text-white/50">{region.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-[#d4a853] font-bold">{region.raised} SOL</p>
                  <p className="text-xs text-white/50">{region.campaigns} campaigns</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="mt-12 text-center"
        >
          <p className="text-white/60">
            Want to start a campaign in another African nation?{" "}
            <Link href="/create" className="text-[#d4a853] hover:underline">
             Get in touch
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// FAQ Section - Using Tailgrids Accordion
function FAQSection() {
  const faqs = [
    {
      id: "faq-1",
      title: "What is PeaceLeague?",
      content: "PeaceLeague is a decentralized crowdfunding platform built on the Solana blockchain. It enables transparent, peer-to-peer charitable donations across Africa with minimal fees and complete on-chain verification."
    },
    {
      id: "faq-2",  
      title: "How are donations verified?",
      content: "Every transaction is recorded on Solana's public blockchain. You can view complete donation and withdrawal history for any campaign on Solscan.io — no centralized database required."
    },
    {
      id: "faq-3",
      title: "What fees does PeaceLeague charge?",
      content: "PeaceLeague collects no platform fees. Solana network fees are less than $0.001 per transaction. Compare this to traditional platforms that charge 5-12% plus currency conversion fees."
    },
    {
      id: "faq-4",
      title: "Is my wallet secure?",
      content: "PeaceLeague never has access to your private keys. All transactions are signed locally in your wallet (Phantom, Backpack, Solflare). We cannot access or control your funds."
    },
    {
      id: "faq-5",
      title: "Can I withdraw anytime?",
      content: "Campaign owners can withdraw raised funds at any time. All withdrawals are recorded on-chain and visible to donors. Complete transparency, zero intermediaries."
    },
    {
      id: "faq-6",
      title: "How do I start a campaign?",
      content: "Connect your wallet, click 'Start Campaign', fill in your details, set a goal, and launch. Takes under 2 minutes. No approval needed — pure peer-to-peer."
    }
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#d4a853] uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Frequently Asked Questions
          </h2>
          <p className="text-white/60 mt-4">
            Got questions? We've got answers.
          </p>
        </motion.div>

{/* Using Tailgrids Accordion for premium FAQ */}
        <Accordion items={faqs} allowMultiple />

        {/* CTA to full FAQ page */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="mt-12 text-center"
        >
          <p className="text-white/60">
            Still have questions?{" "}
            <Link href="/faq" className="text-[#d4a853] hover:underline">
              View all FAQ
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Team / Mission Section
function MissionSection() {
  return (
    <section className="py-24 px-4 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#d4a853] uppercase tracking-wider">Our Mission</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Building the Future of African Giving
          </h2>
          <p className="text-white/60 mt-4 max-w-2xl mx-auto">
            We believe technology should make giving easier, not harder. Our mission is to enable anyone, anywhere to support African causes with complete confidence their donation creates real impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Transparency First",
              description: "Every transaction is recorded on-chain. Donors can verify their impact. No exceptions, no exceptions."
            },
            {
              title: "Zero Fees",
              description: "We don't take a cut. 100% of your donation goes to the cause. Network fees are negligible."
            },
            {
              title: "Direct Connection",
              description: "No intermediaries between donors and beneficiaries. Give directly, track directly, make impact directly."
            }
          ].map((value, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className="p-8 text-center h-full">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4a853]/20 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-[#d4a853]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-white/70">{value.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}