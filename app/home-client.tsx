"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, TrendingUp, Shield, Globe, Star, Zap, ArrowUpRight, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as animations from "@/lib/animations";
import type { Campaign, CampaignStory } from "@/lib/cosmic";
import { Accordion, Tabs } from "@/components/ui/tailgrids";

// African countries we serve (flag emoji + name)
const AFRICAN_FLAGS = [
  { flag: "🇳🇬", code: "NG", name: "Nigeria" },
  { flag: "🇰🇪", code: "KE", name: "Kenya" },
  { flag: "🇬🇭", code: "GH", name: "Ghana" },
  { flag: "🇿🇦", code: "ZA", name: "South Africa" },
  { flag: "🇪🇬", code: "EG", name: "Egypt" },
  { flag: "🇸🇳", code: "SN", name: "Senegal" },
  { flag: "🇨🇲", code: "CM", name: "Cameroon" },
  { flag: "🇪🇹", code: "ET", name: "Ethiopia" },
];

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
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Countries We Serve - Flags */}
      <CountriesSection />

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

// Countries We Serve - African Flags
function CountriesSection() {
  return (
    <section className="py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-8"
        >
          <p className="text-white/60 text-sm uppercase tracking-widest font-medium">
            Active Across Africa
          </p>
        </motion.div>

        <GlassBento className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          {AFRICAN_FLAGS.map((country, i) => (
            <motion.div
              key={country.code}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-1 p-3 rounded-xl hover:bg-white/5 transition-all cursor-default"
            >
              <span className="text-3xl md:text-4xl">{country.flag}</span>
              <span className="text-xs text-white/60 hidden md:block">{country.name}</span>
            </motion.div>
          ))}
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

// Impact Stories Section - Overlap style
function ImpactStoriesSection({ stories }: { stories: CampaignStory[] }) {
  const defaultStories: CampaignStory[] = [
    { id: "1", title: "Sarah M.", slug: "sarah", metadata: { author: "Sarah M.", location: "Kenya", content: "The transparency gave donors confidence. We reached our goal in 48 hours." } },
    { id: "2", title: "James T.", slug: "james", metadata: { author: "James T.", location: "USA", content: "I could see exactly where my donation went. That's what made me give." } },
  ];
  
  const displayStories = stories.length > 0 ? stories : defaultStories;

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display">
            Impact Stories
          </h2>
          <p className="text-white/60 mt-3">Real change from real people</p>
        </motion.div>

        {/* Overlap cards */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-12">
          {displayStories.map((story, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.staggerCard}
              transition={{ delay: i * 0.15 }}
              // Stagger for overlap
              className={`relative ${i === 1 ? "md:translate-y-8" : ""}`}
            >
              <div className="group glass rounded-2xl p-8 hover:bg-accent/40 transition-all duration-500">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-[#d4a853] text-[#d4a853]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-lg text-white/90 leading-relaxed mb-6">
                  &ldquo;{story.metadata?.content || story.metadata?.beneficiary_story}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#d4a853]/20 flex items-center justify-center">
                    <span className="text-lg font-semibold text-[#d4a853]">
                      {story.metadata?.author?.[0] || "?"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-white">{story.metadata?.author}</p>
                    <p className="text-xs text-white/50">{story.metadata?.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Features Section - Tailgrids-style overlap design
function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "100% Transparent",
      description: "Every transaction on Solana. Verify where every SOL goes.",
      accent: "from-emerald-500 to-teal-500",
    },
    {
      icon: Globe,
      title: "Borderless Giving",
      description: "Send SOL anywhere. Near-zero fees. More impact.",
      accent: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      title: "Direct Impact",
      description: "Campaign owners receive directly. No middlemen.",
      accent: "from-rose-500 to-pink-500",
    },
    {
      icon: Users,
      title: "Global Community",
      description: "Join thousands making real change in Africa.",
      accent: "from-violet-500 to-purple-500",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display">
            Why PeaceLeague?
          </h2>
          <p className="text-white/60 mt-3">The modern way to fund causes across Africa</p>
        </motion.div>

        {/* Overlap grid - Tailgrids style */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.staggerCard}
              transition={{ delay: i * 0.1 }}
              // Staggered overlap: even rows extend beyond grid
              className={`relative ${i % 2 === 1 ? "md:translate-y-8" : ""}`}
            >
              {/* Glass card with overlap */}
              <div className="group relative glass rounded-2xl p-8 hover:bg-accent/40 transition-all duration-500">
                {/* Gradient accent bar */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${feature.accent} rounded-t-2xl`} />

                {/* Icon container */}
                <div className="relative mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.accent} flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform duration-500`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 font-display">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative arrow on hover */}
                <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                  <ArrowUpRight className="w-5 h-5 text-white/60" />
                </div>
              </div>
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

// Global Reach Section - Giving Without Borders (Africa Map)
function GlobalReachSection() {
  // Ordered by SOL raised (highest first)
  const countries = [
    { name: "Kenya", flag: "🇰🇪", raised: "1,200+", focus: "Clean Water & Education" },
    { name: "Nigeria", flag: "🇳🇬", raised: "890+", focus: "Healthcare & Business" },
    { name: "Ghana", flag: "🇬🇭", raised: "720+", focus: "Education & Agriculture" },
    { name: "South Africa", flag: "🇿🇦", raised: "680+", focus: "Housing & Community" },
    { name: "Uganda", flag: "🇺🇬", raised: "450+", focus: "Health & Farming" },
    { name: "Tanzania", flag: "🇹🇿", raised: "380+", focus: "Education & Water" },
  ];

  const totalRaised = "4,322+";
  const totalNations = "6";
  const totalCampaigns = "162+";

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-[#d4a853] uppercase tracking-wider">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 font-display">
            Giving Without Borders
          </h2>
        </motion.div>

        {/* Stats summary - clean inline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          <StatItem value={totalNations} label="African Nations" />
          <StatItem value={totalRaised} label="SOL Raised" />
          <StatItem value={totalCampaigns} label="Campaigns" />
        </motion.div>

        {/* Country grid - clean cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.staggerContainer}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {countries.map((c, i) => (
            <motion.div
              key={c.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.staggerCard}
              transition={{ delay: i * 0.05 }}
              className="group"
            >
              <div className="glass hover:bg-accent/60 rounded-xl p-5 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{c.flag}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white truncate">{c.name}</h3>
                    <p className="text-xs text-white/50 truncate">{c.focus}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[#d4a853] font-bold">{c.raised}</p>
                    <p className="text-[10px] text-white/40 uppercase tracking-wider">SOL</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="mt-10 text-center text-sm text-white/60"
        >
          Don't see your nation?{" "}
          <Link href="/create" className="text-[#d4a853] underline-offset-4 hover:underline">
            Start a campaign
          </Link>{" "}
          and be the first.
        </motion.p>
      </div>
    </section>
  );
}

// Stat display component
function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-2xl font-bold text-white font-display">{value}</p>
      <p className="text-xs text-white/50 uppercase tracking-wider">{label}</p>
    </div>
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

// Mission Section - Tailgrids overlap style
function MissionSection() {
  const values = [
    {
      title: "Transparency First",
      icon: Shield,
      accent: "from-emerald-500 to-teal-500",
      description: "Every transaction on-chain. Verify your impact. No exceptions.",
    },
    {
      title: "Zero Fees",
      icon: Heart,
      accent: "from-rose-500 to-pink-500",
      description: "100% of your donation goes to the cause. We don't take a cut.",
    },
    {
      title: "Direct Connection",
      icon: Globe,
      accent: "from-blue-500 to-cyan-500",
      description: "No middlemen. Give directly, track directly, impact directly.",
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#d4a853] uppercase tracking-wider">
            Our Mission
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 font-display">
            Building the Future of African Giving
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Technology that makes giving easier. Anyone, anywhere, complete confidence.
          </p>
        </motion.div>

        {/* Overlap grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.staggerCard}
              transition={{ delay: i * 0.1 }}
              // Stagger the cards for overlap effect
              className={`relative ${i === 1 ? "md:translate-y-6" : ""}`}
            >
              <div className="group relative glass rounded-2xl p-8 h-full hover:bg-accent/40 transition-all duration-500">
                {/* Gradient accent */}
                <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${value.accent} rounded-t-2xl`} />

                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.accent} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3 font-display">
                  {value.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {value.description}
</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
}