import { Metadata } from "next";
import { getTestimonials } from "@/lib/cosmic";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Testimonials - PeaceLeague Africa",
  description: "Hear from our donors and campaign creators.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  const fallbackTestimonials = [
    { id: "1", title: "Emmanuel Musa", metadata: { quote: "PeaceLeague Africa gave our community project real visibility and made donors feel confident enough to give quickly.", role: "Campaign Creator, Nigeria" } },
    { id: "2", title: "Lisa Thompson", metadata: { quote: "The experience feels much more trustworthy than most fundraising platforms. I understood the mission right away.", role: "Donor, USA" } },
    { id: "3", title: "Grace Mwangi", metadata: { quote: "The structure of the campaign page helped us explain our need clearly and build momentum faster.", role: "Campaign Creator, Kenya" } },
    { id: "4", title: "David Chen", metadata: { quote: "It feels like a serious product, not a generic donation page. That matters when deciding where to give.", role: "Recurring Donor, Singapore" } },
    { id: "5", title: "Amina Hassan", metadata: { quote: "The platform helped us communicate updates and impact with more confidence.", role: "Campaign Creator, Ghana" } },
    { id: "6", title: "Robert Williams", metadata: { quote: "This is the kind of interface that makes transparency tangible for donors.", role: "Supporter, UK" } },
  ];

  const displayTestimonials =
    testimonials.length > 0
      ? testimonials.map((testimonial) => ({
          id: testimonial.id,
          title: testimonial.title || "Anonymous",
          metadata: {
            quote: testimonial.metadata?.quote || "",
            role: testimonial.metadata?.role || "",
          },
        }))
      : fallbackTestimonials;

  return (
    <SitePage>
      <PageShell>
        <PageHero
          eyebrow="Testimonials"
          title={
            <>
              Social proof with more
              <span className="block text-[#f1ddab]">gravity, warmth, and credibility.</span>
            </>
          }
          description="These stories should feel like endorsements of both impact and trust — not decorative filler."
          align="left"
        />

        <SectionBlock>
          <SectionIntro
            eyebrow="Community voices"
            title="How donors and organizers describe the platform when it works well."
            description="The redesigned testimonial system uses stronger hierarchy and more breathing room so each quote feels worth reading."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {displayTestimonials.map((testimonial, index) => (
              <Card
                key={testimonial.id}
                className={`rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7 ${
                  index === 1 ? "lg:translate-y-8" : ""
                }`}
              >
                <div className="flex items-center gap-1 text-[#d4a853]">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-6 font-display text-2xl leading-relaxed text-white">
                  “{testimonial.metadata.quote}”
                </p>
                <div className="mt-8 border-t border-white/10 pt-5">
                  <p className="font-medium text-white">{testimonial.title}</p>
                  <p className="mt-1 text-sm text-white/48">{testimonial.metadata.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
