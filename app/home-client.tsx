"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, TrendingUp, Shield, Globe, Star, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as animations from "@/lib/animations";
import type { Campaign, CampaignStory } from "@/lib/cosmic";

interface HomeClientProps {
  campaigns: Campaign[];
  stories: CampaignStory[];
}

// Glassmorphism Card Component
function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl ${className}`}>
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

      {/* How It Works */}
      <HowItWorksSection />

      {/* Impact Stories */}
      <ImpactStoriesSection stories={stories} />

      {/* Features Section */}
      <FeaturesSection />

      {/* CTA Section */}
      <CTASection />

      {/* Newsletter Section */}
      <NewsletterSection />
    </main>
  );
}

// Hero Section with Glassmorphism
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-success/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-warning/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.staggerContainer}
            className="text-center lg:text-left space-y-8"
          >
            <motion.div variants={animations.fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium">
              <Zap className="h-4 w-4 text-warning" />
              <span>Empowering African Communities</span>
            </motion.div>

            <motion.h1 variants={animations.fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-success to-warning">Fund</span>{" "}
              <span className="text-white">Change</span>
              <br />
              <span className="text-white/60">Across Africa</span>
            </motion.h1>

            <motion.p variants={animations.fadeInUp} className="text-lg text-white/70 max-w-lg mx-auto lg:mx-0">
              Transparent crowdfunding for African causes. Every SOL donated goes directly to those who need it most — tracked on-chain for complete transparency.
            </motion.p>

            <motion.div variants={animations.fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/create" className="btn btn-primary gap-2 min-w-[180px]">
                <span>Start Campaign</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#campaigns" className="btn btn-outline btn-outline-primary gap-2 min-w-[180px] border-white/30 text-white hover:bg-white/10">
                <Heart className="h-4 w-4" />
                <span>Donate Now</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Glass cards visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-success/30 via-warning/20 to-transparent rounded-full blur-3xl" />

              <div className="relative grid grid-cols-2 gap-6 p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <GlassCard className="p-4">
                    <div className="h-32 bg-success/20 rounded-xl flex items-center justify-center mb-2">
                      <Users className="h-12 w-12 text-success" />
                    </div>
                    <h3 className="font-semibold text-white">Education for All</h3>
                    <progress className="progress progress-success mt-2" value={75} max={100} />
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
                    <div className="h-32 bg-warning/20 rounded-xl flex items-center justify-center mb-2">
                      <Heart className="h-12 w-12 text-warning" />
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

// Stats Section - Glass
function StatsSection({ stats }: { stats: { icon: React.ReactNode; value: string; label: string }[] }) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <GlassCard className="p-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={animations.staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, i) => (
              <motion.div key={i} variants={animations.fadeInUp} className="text-center">
                <div className="flex justify-center mb-2 text-success">{stat.icon}</div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </GlassCard>
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

// Campaign Card - Glass
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
        <GlassCard className="overflow-hidden hover:bg-white/20 transition-all">
          <figure className="h-48 bg-white/5 flex items-center justify-center">
            {campaign.metadata?.image ? (
              <Image src={campaign.metadata.image} alt={campaign.title} width={300} height={200} className="object-cover w-full h-full" />
            ) : (
              <Globe className="h-12 w-12 text-white/40" />
            )}
          </figure>
          <div className="p-4">
            <div className="badge badge-outline border-white/30 text-white">{campaign.metadata?.category || "General"}</div>
            <h3 className="font-semibold text-white mt-2">{campaign.title}</h3>
            <progress className="progress progress-success mt-3" value={percent} max={100} />
            <div className="flex justify-between text-sm mt-2">
              <span className="text-success font-medium">{raised} SOL</span>
              <span className="text-white/60">of {goal} SOL</span>
            </div>
            <p className="text-xs text-white/40">{donors} donors</p>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}

// Fallback placeholder card - Glass
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
        <GlassCard className="overflow-hidden hover:bg-white/20 transition-all">
          <figure className="h-48 bg-white/5 flex items-center justify-center">
            <Globe className="h-12 w-12 text-white/40" />
          </figure>
          <div className="p-4">
            <div className="badge badge-outline border-white/30 text-white">{category}</div>
            <h3 className="font-semibold text-white mt-2">{title}</h3>
            <progress className="progress progress-success mt-3" value={percent} max={100} />
            <div className="flex justify-between text-sm mt-2">
              <span className="text-success font-medium">{raised} SOL</span>
              <span className="text-white/60">of {goal} SOL</span>
            </div>
            <p className="text-xs text-white/40">{donors} donors</p>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}

// How It Works Section - Glass
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
                <div className="text-5xl font-bold text-white/20 mb-2">{step.number}</div>
                <div className="text-success mb-3">{step.icon}</div>
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

// Impact Stories Section - Glass
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
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-lg text-white">&ldquo;{story.metadata?.content || story.metadata?.beneficiary_story}&rdquo;</p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="avatar placeholder">
                    <div className="bg-success/20 text-success w-10 rounded-full">
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

// Features Section - Glass
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
              <GlassCard className="p-6 text-center hover:bg-white/20 transition-all">
                <div className="text-success mx-auto mb-3">{feature.icon}</div>
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

// CTA Section - Glass
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
          <GlassCard className="p-12 text-center bg-gradient-to-br from-success/30 to-warning/30">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Make a Difference?
            </h2>
            <p className="text-white/80 max-w-md mx-auto mb-6">
              Join thousands of donors supporting causes across Africa. Your contribution creates lasting change.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/create" className="btn btn-primary">
                Start a Campaign
              </Link>
              <Link href="#campaigns" className="btn btn-outline border-white/50 text-white hover:bg-white/10">
                Donate Now
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
              <div className="flex flex-col sm:flex-row gap-3 mt-6 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/40"
                />
                <button className="btn btn-primary">Subscribe</button>
              </div>
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