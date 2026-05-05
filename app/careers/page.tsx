import { Metadata } from "next";
import Link from "next/link";
import { Briefcase, MapPin, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/glass-card";
import { FeatureGrid } from "@/components/ui/feature";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Careers - PeaceLeague Africa",
  description: "Join our team and help make a difference.",
};

const jobs = [
  {
    title: "Community Manager",
    department: "Operations",
    location: "Remote (Africa)",
    type: "Full-time",
    description: "Build strong relationships with campaign creators and donors across the continent.",
  },
  {
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Design and build beautiful, accessible interfaces for our crowdfunding platform.",
  },
  {
    title: "Partnership Manager",
    department: "Business Development",
    location: "Nairobi, Kenya",
    type: "Full-time",
    description: "Forge partnerships with NGOs, companies, and institutions across Africa and beyond.",
  },
  {
    title: "Content Writer",
    department: "Marketing",
    location: "Remote",
    type: "Contract",
    description: "Tell compelling stories about campaigns, donors, and measurable impact.",
  },
];

const benefits = [
  { icon: <Sparkles className="h-6 w-6" />, title: "Mission-led work", description: "Every role contributes to a more credible and effective fundraising experience." },
  { icon: <Briefcase className="h-6 w-6" />, title: "Flexible structure", description: "Remote-friendly workflows and strong cross-functional collaboration." },
  { icon: <MapPin className="h-6 w-6" />, title: "Pan-African perspective", description: "Work on products and partnerships with real continental reach." },
];

export default function CareersPage() {
  return (
    <SitePage>
      <PageShell>
        <PageHero
          eyebrow="Careers"
          title={
            <>
              Build the future of
              <span className="block text-[#f1ddab]">transparent giving with us.</span>
            </>
          }
          description="PeaceLeague Africa needs operators, builders, and storytellers who care about trust, access, and community impact."
          ctaHref="mailto:careers@peaceleague.africa"
          ctaLabel="Email careers"
        />

        <SectionBlock>
          <SectionIntro
            eyebrow="Open roles"
            title="A cleaner, more intentional hiring surface."
            description="Open positions should feel as credible and well-structured as the rest of the site — clear, scannable, and mission-driven."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {jobs.map((job, index) => (
              <Card
                key={job.title}
                className={`rounded-[2rem] border border-white/10 p-7 ${index % 2 === 0 ? "bg-[linear-gradient(180deg,rgba(212,168,83,0.12),rgba(255,255,255,0.03))]" : "bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]"}`}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#f1ddab]">
                    {job.department}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-white/50">
                    {job.type}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-3xl text-white">{job.title}</h2>
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-white/55">
                  <MapPin className="h-4 w-4 text-[#d4a853]" />
                  {job.location}
                </p>
                <p className="mt-5 text-sm leading-7 text-white/64">{job.description}</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <Link
                    href="mailto:careers@peaceleague.africa"
                    className="inline-flex items-center rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 px-4 py-2 text-sm font-medium text-[#f1ddab] transition duration-300 hover:bg-[#d4a853]/16 hover:text-white"
                  >
                    Apply for this role
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock>
          <SectionIntro
            eyebrow="Why join"
            title="The platform is ambitious. The team should feel the same way."
            description="We want the culture around PeaceLeague Africa to feel serious, collaborative, and rooted in meaningful work."
          />
          <FeatureGrid features={benefits} columns={3} className="[&>div]:rounded-[1.7rem] [&>div]:border-white/10 [&>div]:bg-white/[0.04] [&>div]:p-7" />
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
