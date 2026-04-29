"use client";

import { WalletButton } from "@/components/wallet/wallet-button";
import { ArrowRight, Heart, Users, TrendingUp, Shield, Globe, Star, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-mesh">
      {/* Hero Section - Fincash inspired */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 text-success text-sm font-medium">
                <Globe className="h-4 w-4" />
                <span>Empowering African Communities</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-success">Fund</span>{" "}
                <span className="text-foreground">Change</span>
                <br />
                <span className="text-muted-foreground">Across Africa</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Transparent crowdfunding for African causes. Every SOL donated goes directly to those who need it most — tracked on-chain for complete transparency.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link href="/create" className="btn btn-primary gap-2 min-w-[180px]">
                  <span>Start Campaign</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="#campaigns" className="btn btn-outline gap-2 min-w-[180px]">
                  <Heart className="h-4 w-4" />
                  <span>Donate Now</span>
                </Link>
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Abstract representation */}
                <div className="absolute inset-0 bg-gradient-to-br from-success/20 via-success/10 to-transparent rounded-full blur-3xl" />
                <div className="relative grid grid-cols-2 gap-4 p-8">
                  {/* Campaign cards preview */}
                  <div className="card bg-base-100 shadow-xl">
                    <figure className="h-32 bg-success/10 flex items-center justify-center">
                      <Users className="h-12 w-12 text-success" />
                    </figure>
                    <div className="card-body p-4">
                      <h2 className="card-title text-sm">Education for All</h2>
                      <progress className="progress progress-success" value={75} max={100} />
                      <p className="text-xs text-muted">12 SOL raised</p>
                    </div>
                  </div>
                  <div className="card bg-base-100 shadow-xl mt-8">
                    <figure className="h-32 bg-warning/10 flex items-center justify-center">
                      <Heart className="h-12 w-12 text-warning" />
                    </figure>
                    <div className="card-body p-4">
                      <h2 className="card-title text-sm">Medical Aid</h2>
                      <progress className="progress progress-warning" value={45} max={100} />
                      <p className="text-xs text-muted">8.5 SOL raised</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-12 px-4 bg-base-200/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCard
              icon={<Users className="h-8 w-8 text-success" />}
              value="2,500+"
              label="Donors"
            />
            <StatCard
              icon={<Heart className="h-8 w-8 text-warning" />}
              value="150+"
              label="Campaigns"
            />
            <StatCard
              icon={<TrendingUp className="h-8 w-8 text-success" />}
              value="500+"
              label="SOL Raised"
            />
            <StatCard
              icon={<Shield className="h-8 w-8 text-warning" />}
              value="100%"
              label="Transparent"
            />
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section id="campaigns" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Campaigns</h2>
            <p className="text-muted-foreground mt-2">Support causes that matter</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Campaign cards - placeholder data */}
            <CampaignCard
              title="Clean Water for Rural Village"
              category="Healthcare"
              image="/images/campaign-1.jpg"
              raised={4.2}
              goal={10}
              donors={28}
            />
            <CampaignCard
              title="School Books Initiative"
              category="Education"
              image="/images/campaign-2.jpg"
              raised={7.8}
              goal={15}
              donors={52}
            />
            <CampaignCard
              title="Emergency Food Relief"
              category="Emergency"
              image="/images/campaign-3.jpg"
              raised={12.5}
              goal={20}
              donors={89}
            />
          </div>

          <div className="text-center mt-8">
            <Link href="/campaigns" className="btn btn-outline gap-2">
              <span>View All Campaigns</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-base-200/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground mt-2">Three simple steps to create impact</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <StepCard
              number="01"
              title="Create Campaign"
              description="Set up your cause with a compelling story and funding goal. Connect your Solana wallet."
              icon={<Heart className="h-8 w-8" />}
            />
            <StepCard
              number="02"
              title="Share Your Story"
              description="Share your campaign across social media. Every donation is tracked on-chain."
              icon={<Globe className="h-8 w-8" />}
            />
            <StepCard
              number="03"
              title="Receive Funds"
              description="Campaign owners can withdraw raised funds directly to their wallet at any time."
              icon={<Shield className="h-8 w-8" />}
            />
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Impact Stories</h2>
            <p className="text-muted-foreground mt-2">Real change from real people</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <TestimonialCard
              quote="The transparency gave donors confidence. We reached our goal in 48 hours."
              author="Sarah M."
              location="Kenya"
              role="Campaign Creator"
            />
            <TestimonialCard
              quote="I could see exactly where my donation went. That's what made me give."
              author="James T."
              location="USA"
              role="Donor"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
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
        </div>
      </section>
    </main>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-3xl font-bold">{value}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function CampaignCard({
  title,
  category,
  image,
  raised,
  goal,
  donors,
}: {
  title: string;
  category: string;
  image: string;
  raised: number;
  goal: number;
  donors: number;
}) {
  const percent = Math.round((raised / goal) * 100);

  return (
    <Link href={`/campaign/${title.toLowerCase().replace(/\s+/g, "-")}`} className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
      <figure className="h-48 bg-base-200 flex items-center justify-center">
        <Image src={image} alt={title} width={300} height={200} className="object-cover w-full h-full opacity-80" />
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
  );
}

function StepCard({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <div className="text-4xl font-bold text-success/30">{number}</div>
        <div className="text-success mb-2">{icon}</div>
        <h3 className="card-title">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function TestimonialCard({
  quote,
  author,
  location,
  role,
}: {
  quote: string;
  author: string;
  location: string;
  role: string;
}) {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <div className="flex gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-warning text-warning" />
          ))}
        </div>
        <p className="text-lg">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center gap-2 mt-4">
          <div className="avatar placeholder">
            <div className="bg-success text-success-content rounded-full w-10">
              <span className="text-sm">{author[0]}</span>
            </div>
          </div>
          <div>
            <p className="font-medium">{author}</p>
            <p className="text-xs text-muted-foreground">{location} — {role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}