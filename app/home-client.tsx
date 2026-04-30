"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Globe, Star, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import * as animations from "@/lib/animations";
import type { Campaign, CampaignStory } from "@/lib/cosmic";
import { Card, FeatureCard, StatsCard, ProfileCard } from "@/components/ui/glass-card";

interface HomeClientProps {
  campaigns: Campaign[];
  stories: CampaignStory[];
}

export default function HomeClient({ campaigns, stories }: HomeClientProps) {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedCampaignsSection campaigns={campaigns} />
      <ImpactStatsSection />
      <HowItWorksSection />
      <SolutionsSection />
      <TestimonialsSection stories={stories} />
      <FinalCTASection />
    </main>
  );
}

// ─── Section 1: Hero ────────────────────────────────────────────────────────────
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4a853]/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#d4a853]/5 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={animations.staggerContainer}
          className="space-y-8"
        >
          {/* Eyebrow */}
          <motion.div variants={animations.fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <Heart className="h-4 w-4 text-[#d4a853]" />
            <span className="text-sm text-white/70">Empowering African Communities</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 variants={animations.fadeInUp} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight font-display">
            <span className="text-[#d4a853]">Fund</span>{" "}
            <span className="text-white">Change</span>
            <br />
            <span className="text-white/50">Across Africa</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p variants={animations.fadeInUp} className="text-lg text-white/60 max-w-xl mx-auto">
            Transparent crowdfunding for African causes. Every SOL donated goes directly to those who need it most — tracked on-chain.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={animations.fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Link href="/create" className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a853] text-slate-900 font-semibold rounded-xl hover:bg-[#eab308] transition-colors">
              <span>Start Campaign</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="#campaigns" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-colors">
              <Heart className="h-4 w-4 text-[#d4a853]" />
              <span>Donate Now</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section 2: Featured Campaigns (Bento Grid) ────────────────────────────────
function FeaturedCampaignsSection({ campaigns }: { campaigns: Campaign[] }) {
  const fallback = [
    { id: "1", slug: "clean-water", title: "Clean Water for Rural Village", metadata: { category: "Healthcare", raised: 4.2, goal: 10, donors: 28, image: "" } },
    { id: "2", slug: "school-books", title: "School Books Initiative", metadata: { category: "Education", raised: 7.8, goal: 15, donors: 52, image: "" } },
    { id: "3", slug: "emergency-food", title: "Emergency Food Relief", metadata: { category: "Emergency", raised: 12.5, goal: 20, donors: 89, image: "" } },
    { id: "4", slug: "scholarship-fund", title: "Scholarship Fund", metadata: { category: "Education", raised: 3.1, goal: 8, donors: 41, image: "" } },
  ];

  const display = campaigns.length > 0 ? campaigns : fallback;

  return (
    <section id="campaigns" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white">Featured Campaigns</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {display.map((c, i) => {
            const raised = c.metadata?.raised || 0;
            const goal = c.metadata?.goal || 1;
            const percent = Math.round((raised / goal) * 100);
            return (
              <motion.div
                key={c.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={animations.fadeInUp}
                transition={{ delay: i * 0.08 }}
              >
                <Link href={`/campaign/${c.slug}`} className="group block h-full">
                  <Card hover className="h-full p-5">
                    <div className="h-32 bg-white/5 rounded-xl flex items-center justify-center mb-4">
                      <Globe className="h-8 w-8 text-white/30" />
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#d4a853]/10 text-[#d4a853] border border-[#d4a853]/20">
                      {c.metadata?.category || "General"}
                    </span>
                    <h3 className="font-semibold text-white mt-2">{c.title}</h3>
                    <div className="mt-3">
                      <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#d4a853] rounded-full" style={{ width: `${percent}%` }} />
                      </div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="text-[#d4a853] font-medium">{raised} SOL</span>
                      <span className="text-white/40">{c.metadata?.donors || 0} donors</span>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link href="/campaigns" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors">
            <span>View all campaigns</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Section 3: Impact Stats ─────────────────────────────────────────────────────────────
function ImpactStatsSection() {
  const stats = [
    { value: "4,320+", label: "SOL Raised" },
    { value: "6", label: "African Nations" },
    { value: "162+", label: "Campaigns" },
    { value: "$0", label: "Platform Fees" },
  ];

  return (
    <section className="py-16 px-4 border-y border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.fadeInUp}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <p className="text-3xl md:text-4xl font-bold text-[#d4a853] font-display">{s.value}</p>
              <p className="text-sm text-white/50 mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 4: How It Works (3 Horizontal Steps) ───────────────────────────────
function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Create Campaign", description: "Set up your cause with a compelling story and funding goal. Connect your Solana wallet.", icon: Heart },
    { number: "02", title: "Share Your Story", description: "Share your campaign across social media. Every donation is tracked on-chain.", icon: Globe },
    { number: "03", title: "Receive Funds", description: "Campaign owners can withdraw raised funds directly to their wallet at any time.", icon: CheckCircle2 },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-white">How It Works</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.fadeInUp}
              transition={{ delay: i * 0.1 }}
              className="relative text-center"
            >
              <div className="text-6xl font-bold text-[#d4a853]/20 font-display mb-2">{step.number}</div>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d4a853]/10 text-[#d4a853] mb-4">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-sm text-white/50 max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 5: Solutions (Who It's For Grid) ─────────────────────────────
function SolutionsSection() {
  const audiences = [
    { title: "Individual Causes", description: "Medical bills, education costs, community projects. Start a campaign in 2 minutes." },
    { title: "NGOs & Non-Profits", description: "Fund verified programs directly. Full on-chain transparency for donors." },
    { title: "Global Donors", description: "Send SOL anywhere in the world for less than a penny. See exactly where it goes." },
    { title: "Communities", description: "Collective funding for local needs. Water, electricity, schools, clinics — on-chain verified." },
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
          <h2 className="text-3xl font-bold text-white">Who It's For</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.fadeInUp}
              transition={{ delay: i * 0.08 }}
            >
              <Card variant="gold" hover className="p-6 h-full">
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 6: Testimonials (Impact Stories) ────────────────────────────────
function TestimonialsSection({ stories }: { stories: CampaignStory[] }) {
  const defaultStories: CampaignStory[] = [
    { id: "1", title: "Sarah M.", slug: "sarah", metadata: { author: "Sarah M.", location: "Kenya", content: "The transparency gave donors confidence. We reached our goal in 48 hours." } },
    { id: "2", title: "James T.", slug: "james", metadata: { author: "James T.", location: "USA", content: "I could see exactly where my donation went. That is what made me give." } },
  ];

  const display = stories.length > 0 ? stories : defaultStories;

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white">Impact Stories</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {display.map((story, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={animations.fadeInUp}
              transition={{ delay: i * 0.1 }}
            >
              <ProfileCard
                name={story.metadata?.author || "Anonymous"}
                role={story.metadata?.location}
                content={story.metadata?.content || ""}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section 7: Final CTA ────────────────────────────────────────────────────────
function FinalCTASection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
        >
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Make a Difference?</h2>
          <p className="text-white/60 mb-8">
            Join thousands of donors supporting causes across Africa. Your contribution creates lasting change.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/create" className="inline-flex items-center gap-2 px-6 py-3 bg-[#d4a853] text-slate-900 font-semibold rounded-xl hover:bg-[#eab308] transition-colors">
              Start a Campaign
            </Link>
            <Link href="#campaigns" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white/5 transition-colors">
              Donate Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}