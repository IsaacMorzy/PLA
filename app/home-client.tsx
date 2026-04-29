"use client";

import { motion } from "framer-motion";
import { ArrowRight, Heart, Users, TrendingUp, Shield, Globe, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as animations from "@/lib/animations";
import type { Campaign, CampaignStory } from "@/lib/cosmic";

interface HomeClientProps {
  campaigns: Campaign[];
  stories: CampaignStory[];
}

export default function HomeClient({ campaigns, stories }: HomeClientProps) {
  const stats = [
    { icon: <Users className="h-8 w-8 text-success" />, value: "2,500+", label: "Donors" },
    { icon: <Heart className="h-8 w-8 text-warning" />, value: `${campaigns.length}+`, label: "Campaigns" },
    { icon: <TrendingUp className="h-8 w-8 text-success" />, value: "500+", label: "SOL Raised" },
    { icon: <Shield className="h-8 w-8 text-warning" />, value: "100%", label: "Transparent" },
  ];

  return (
    <main className="min-h-screen bg-mesh">
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Bar */}
      <StatsSection stats={stats} />

      {/* Featured Campaigns */}
      <CampaignsSection campaigns={campaigns} />

      {/* How It Works */}
      <HowItWorksSection />

      {/* Impact Stories */}
      <ImpactStoriesSection stories={stories} />

      {/* CTA Section */}
      <CTASection />
    </main>
  );
}

// Hero Section with motion
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animations.staggerContainer}
            className="text-center lg:text-left space-y-6"
          >
            <motion.div variants={animations.fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium">
              <Globe className="h-4 w-4" />
              <span>Empowering African Communities</span>
            </motion.div>

            <motion.h1 variants={animations.fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-success">Fund</span>{" "}
              <span className="text-foreground">Change</span>
              <br />
              <span className="text-muted-foreground">Across Africa</span>
            </motion.h1>

            <motion.p variants={animations.fadeInUp} className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              Transparent crowdfunding for African causes. Every SOL donated goes directly to those who need it most — tracked on-chain for complete transparency.
            </motion.p>

            <motion.div variants={animations.fadeInUp} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link href="/create" className="btn btn-primary gap-2 min-w-[180px]">
                <span>Start Campaign</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="#campaigns" className="btn btn-outline gap-2 min-w-[180px]">
                <Heart className="h-4 w-4" />
                <span>Donate Now</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-success/20 via-success/10 to-transparent rounded-full blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4 p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="card bg-base-100 shadow-xl"
                >
                  <figure className="h-32 bg-success/10 flex items-center justify-center">
                    <Users className="h-12 w-12 text-success" />
                  </figure>
                  <div className="card-body p-4">
                    <h2 className="card-title text-sm">Education for All</h2>
                    <progress className="progress progress-success" value={75} max={100} />
                    <p className="text-xs text-muted">12 SOL raised</p>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="card bg-base-100 shadow-xl mt-8"
                >
                  <figure className="h-32 bg-warning/10 flex items-center justify-center">
                    <Heart className="h-12 w-12 text-warning" />
                  </figure>
                  <div className="card-body p-4">
                    <h2 className="card-title text-sm">Medical Aid</h2>
                    <progress className="progress progress-warning" value={45} max={100} />
                    <p className="text-xs text-muted">8.5 SOL raised</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Stats Section with animated counters
function StatsSection({ stats }: { stats: { icon: React.ReactNode; value: string; label: string }[] }) {
  return (
    <section className="py-12 px-4 bg-base-200/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, i) => (
            <motion.div key={i} variants={animations.fadeInUp} className="text-center">
              <div className="flex justify-center mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Campaigns Section
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
          <h2 className="text-3xl font-bold">Featured Campaigns</h2>
          <p className="text-muted-foreground mt-2">Support causes that matter</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.length > 0 ? (
            campaigns.map((campaign, i) => (
              <CampaignCard key={campaign.id} campaign={campaign} index={i} />
            ))
          ) : (
            // Fallback placeholder data when no campaigns
            <>
              <CampaignCardFallback index={0} title="Clean Water for Rural Village" category="Healthcare" raised={4.2} goal={10} donors={28} />
              <CampaignCardFallback index={1} title="School Books Initiative" category="Education" raised={7.8} goal={15} donors={52} />
              <CampaignCardFallback index={2} title="Emergency Food Relief" category="Emergency" raised={12.5} goal={20} donors={89} />
            </>
          )}
        </div>

        <div className="text-center mt-8">
          <Link href="/campaigns" className="btn btn-outline gap-2">
            <span>View All Campaigns</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// Campaign Card with real data
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
      <Link href={`/campaign/${campaign.slug}`} className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
        <figure className="h-48 bg-base-200 flex items-center justify-center overflow-hidden">
          {campaign.metadata?.image ? (
            <Image src={campaign.metadata.image} alt={campaign.title} width={300} height={200} className="object-cover w-full h-full" />
          ) : (
            <Globe className="h-12 w-12 text-muted-foreground" />
          )}
        </figure>
        <div className="card-body">
          <div className="badge badge-outline">{campaign.metadata?.category || "General"}</div>
          <h3 className="card-title mt-2">{campaign.title}</h3>
          <progress className="progress progress-success" value={percent} max={100} />
          <div className="flex justify-between text-sm mt-2">
            <span className="text-success font-medium">{raised} SOL</span>
            <span className="text-muted-foreground">of {goal} SOL</span>
          </div>
          <p className="text-xs text-muted-foreground">{donors} donors</p>
        </div>
      </Link>
    </motion.div>
  );
}

// Fallback placeholder card
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
      <Link href={`/campaign/${title.toLowerCase().replace(/\s+/g, "-")}`} className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
        <figure className="h-48 bg-base-200 flex items-center justify-center">
          <Globe className="h-12 w-12 text-muted-foreground" />
        </figure>
        <div className="card-body">
          <div className="badge badge-outline">{category}</div>
          <h3 className="card-title mt-2">{title}</h3>
          <progress className="progress progress-success" value={percent} max={100} />
          <div className="flex justify-between text-sm mt-2">
            <span className="text-success font-medium">{raised} SOL</span>
            <span className="text-muted-foreground">of {goal} SOL</span>
          </div>
          <p className="text-xs text-muted-foreground">{donors} donors</p>
        </div>
      </Link>
    </motion.div>
  );
}

// How It Works Section
function HowItWorksSection() {
  const steps = [
    { number: "01", title: "Create Campaign", description: "Set up your cause with a compelling story and funding goal. Connect your Solana wallet.", icon: <Heart className="h-8 w-8" /> },
    { number: "02", title: "Share Your Story", description: "Share your campaign across social media. Every donation is tracked on-chain.", icon: <Globe className="h-8 w-8" /> },
    { number: "03", title: "Receive Funds", description: "Campaign owners can withdraw raised funds directly to their wallet at any time.", icon: <Shield className="h-8 w-8" /> },
  ];

  return (
    <section className="py-20 px-4 bg-base-200/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={animations.fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground mt-2">Three simple steps to create impact</p>
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
              className="card bg-base-100 shadow-md"
            >
              <div className="card-body">
                <div className="text-4xl font-bold text-success/30">{step.number}</div>
                <div className="text-success mb-2">{step.icon}</div>
                <h3 className="card-title">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Impact Stories Section
function ImpactStoriesSection({ stories }: { stories: CampaignStory[] }) {
  // Use real stories or fallback with explicit values
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
          <h2 className="text-3xl font-bold">Impact Stories</h2>
          <p className="text-muted-foreground mt-2">Real change from real people</p>
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
              className="card bg-base-100 shadow-md"
            >
              <div className="card-body">
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="text-lg">&ldquo;{story.metadata?.content || story.metadata?.beneficiary_story}&rdquo;</p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="avatar placeholder">
                    <div className="bg-success text-success-content rounded-full w-10">
                      <span className="text-sm">{story.metadata?.author?.[0] || "?"}</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{story.metadata?.author}</p>
                    <p className="text-xs text-muted-foreground">{story.metadata?.location}</p>
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

// CTA Section
function CTASection() {
  return (
    <section className="py-20 px-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={animations.scaleIn}
        className="max-w-4xl mx-auto"
      >
        <div className="card bg-success text-success-content shadow-xl">
          <div className="card-body text-center">
            <h2 className="card-title text-3xl justify-center">
              Ready to Make a Difference?
            </h2>
            <p className="text-success-content/80 max-w-md mx-auto">
              Join thousands of donors supporting causes across Africa. Your contribution creates lasting change.
            </p>
            <div className="card-actions justify-center gap-4 mt-4">
              <Link href="/create" className="btn btn-primary bg-base-100 text-success hover:bg-base-200">
                Start a Campaign
              </Link>
              <Link href="#campaigns" className="btn btn-outline bg-transparent border-base-100 text-base-100 hover:bg-base-100/10">
                Donate Now
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}