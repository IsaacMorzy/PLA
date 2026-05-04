import { Metadata } from "next";
import { getTeamMembers } from "@/lib/cosmic";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Our Team - PeaceLeague Africa",
  description: "Meet the team behind PeaceLeague Africa.",
};

export default async function TeamPage() {
  const teamMembers = await getTeamMembers();

  const fallbackMembers = [
    { id: "1", title: "Sarah Chen", metadata: { role: "Founder & CEO", bio: "10+ years in fintech, focused on financial inclusion and trusted giving systems." } },
    { id: "2", title: "James Okonkwo", metadata: { role: "CTO", bio: "Former Solana validator and blockchain systems engineer." } },
    { id: "3", title: "Amara Diallo", metadata: { role: "Director of Operations", bio: "Leads cross-regional coordination and program execution." } },
    { id: "4", title: "Michael Rodriguez", metadata: { role: "Head of Partnerships", bio: "Builds strategic relationships with donors and ecosystem partners." } },
    { id: "5", title: "Fatima Al-Hassan", metadata: { role: "Lead Developer", bio: "Designs scalable product systems and user-facing web experiences." } },
    { id: "6", title: "Kwame Asante", metadata: { role: "Community Manager", bio: "Connects organizers and supporters across the continent." } },
  ];

  const displayTeam =
    teamMembers.length > 0
      ? teamMembers.map((member) => ({
          id: member.id,
          title: member.title || "Team Member",
          metadata: {
            role: member.metadata?.role || "",
            bio: member.metadata?.bio || "",
            image: member.metadata?.image || "",
          },
        }))
      : fallbackMembers.map((member) => ({
          ...member,
          metadata: { ...member.metadata, image: "" },
        }));

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  return (
    <SitePage>
      <PageShell>
        <PageHero
          eyebrow="Our team"
          title={
            <>
              The people building a more
              <span className="block text-[#f1ddab]">credible future for giving.</span>
            </>
          }
          description="PeaceLeague Africa combines product, community, and operational expertise to make transparent fundraising feel both trustworthy and human."
          align="left"
        />

        <SectionBlock>
          <SectionIntro
            eyebrow="Team"
            title="A multidisciplinary group shaping trust, technology, and community outcomes."
            description="This page should feel less like a directory and more like a portrait of the people building the platform."
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {displayTeam.map((member, index) => (
              <Card
                key={member.id}
                className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/36">Team member {String(index + 1).padStart(2, "0")}</p>
                    <h2 className="mt-4 font-display text-3xl text-white">{member.title}</h2>
                    <p className="mt-2 text-sm text-[#f1ddab]">{member.metadata.role}</p>
                  </div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 text-lg font-semibold text-[#f1ddab]">
                    {member.metadata.image ? (
                      <img src={member.metadata.image} alt={member.title} className="h-full w-full rounded-full object-cover" />
                    ) : (
                      getInitials(member.title)
                    )}
                  </div>
                </div>
                <p className="mt-6 text-sm leading-7 text-white/64">{member.metadata.bio}</p>
              </Card>
            ))}
          </div>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
