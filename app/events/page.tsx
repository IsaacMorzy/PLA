import { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Events - PeaceLeague Africa",
  description: "Join our upcoming events and fundraising activities.",
};

const events = [
  {
    title: "Africa Giving Day",
    date: "June 15, 2026",
    location: "Virtual",
    description: "A 24-hour global crowdfunding marathon designed to rally donors around high-impact African causes.",
    type: "Virtual event",
  },
  {
    title: "Impact Summit 2026",
    date: "July 20-22, 2026",
    location: "Nairobi, Kenya",
    description: "Meet campaign creators, donors, builders, and partners shaping the future of transparent giving.",
    type: "In person",
  },
  {
    title: "Monthly Donor Call",
    date: "Every first Wednesday",
    location: "Virtual",
    description: "A recurring touchpoint for supporters to hear updates, progress stories, and platform milestones.",
    type: "Community call",
  },
  {
    title: "Campaign Creator Workshop",
    date: "Every Saturday",
    location: "Virtual",
    description: "A practical session for organizers learning how to launch stronger, more credible campaign pages.",
    type: "Workshop",
  },
];

export default function EventsPage() {
  return (
    <SitePage>
      <PageShell>
        <PageHero
          eyebrow="Events"
          title={
            <>
              Gatherings that turn support
              <span className="block text-[#f1ddab]">into stronger community momentum.</span>
            </>
          }
          description="Join donor briefings, creator workshops, and live community events that turn campaign visibility into measurable support."
          ctaHref="/contact"
          ctaLabel="Host with us"
        />

        <SectionBlock>
          <SectionIntro
            eyebrow="Upcoming"
            title="Upcoming sessions for donors, creators, and partners."
            description="Each listing highlights event format, date, and expected outcome so you can decide quickly where to participate."
          />

          <div className="grid gap-6 lg:grid-cols-2">
            {events.map((event, index) => (
              <Card key={event.title} className={`rounded-[2rem] border border-white/10 p-7 ${index % 2 === 0 ? "bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]" : "bg-[linear-gradient(180deg,rgba(212,168,83,0.12),rgba(255,255,255,0.03))]"}`}>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-[#f1ddab]">
                    {event.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-white/55">
                    <MapPin className="h-3.5 w-3.5 text-[#d4a853]" />
                    {event.location}
                  </span>
                </div>

                <h2 className="mt-5 font-display text-3xl text-white">{event.title}</h2>
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-[#f1ddab]">
                  <CalendarDays className="h-4 w-4" />
                  {event.date}
                </p>
                <p className="mt-5 text-sm leading-7 text-white/72">{event.description}</p>

                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="inline-flex items-center gap-2 text-sm text-white/68">
                    <Sparkles className="h-4 w-4 text-[#d4a853]" />
                    Donor and creator community event
                  </span>
                  <Link href="/contact" className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a853]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#120f0c]">
                    Register interest
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
