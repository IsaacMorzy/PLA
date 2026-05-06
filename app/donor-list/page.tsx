import { Metadata } from "next";
import { getRecentDonors } from "@/lib/cosmic";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Donor List - PeaceLeague Africa",
  description: "Our amazing donors who make a difference.",
};

export default async function DonorListPage() {
  const donors = await getRecentDonors();

  const fallbackDonors = [
    { id: "1", title: "Anonymous Donor", metadata: { amount: "25 SOL", message: "Keep up the great work!" } },
    { id: "2", title: "Sarah M.", metadata: { amount: "15 SOL", message: "Supporting education in Africa" } },
    { id: "3", title: "CryptoForGood", metadata: { amount: "10 SOL", message: "Every little helps" } },
    { id: "4", title: "Anonymous Donor", metadata: { amount: "8 SOL", message: "" } },
    { id: "5", title: "David K.", metadata: { amount: "5 SOL", message: "Water for all" } },
    { id: "6", title: "Anonymous Donor", metadata: { amount: "5 SOL", message: "" } },
  ];

  const displayDonors =
    donors.length > 0
      ? donors.map((donor) => ({
          id: donor.id,
          title: donor.metadata?.is_anonymous ? "Anonymous Donor" : donor.title || "Anonymous Donor",
          metadata: {
            amount: donor.metadata?.amount || "0",
            message: donor.metadata?.message || "",
          },
        }))
      : fallbackDonors;

  return (
    <SitePage>
      <PageShell className="max-w-6xl">
        <PageHero
          eyebrow="Donors"
          title={
            <>
              The community behind the
              <span className="block text-[#f1ddab]">momentum of every campaign.</span>
            </>
          }
          description="A transparent view of recent supporter activity to reinforce donor confidence and community momentum."
          align="center"
        />

        <SectionBlock>
          <SectionIntro
            eyebrow="Recent support"
            title="Recent contributions from the PeaceLeague community."
            description="Scan supporter identity, donation amount, and optional message in one view."
            className="mx-auto text-center"
          />

          <Card className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045]">
            <div className="grid grid-cols-[1.5fr_0.8fr_1.7fr] gap-4 border-b border-white/8 px-6 py-4 text-[11px] uppercase tracking-[0.25em] text-white/55">
              <div>Supporter</div>
              <div>Amount</div>
              <div className="hidden md:block">Message</div>
            </div>

            <div className="divide-y divide-white/8">
              {displayDonors.map((donor, index) => (
                <div key={donor.id} className="grid grid-cols-1 gap-4 px-6 py-5 md:grid-cols-[1.5fr_0.8fr_1.7fr] md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 text-sm font-semibold text-[#f1ddab]">
                      {donor.title
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium text-white">{donor.title}</p>
                      <p className="text-sm text-white/55">Entry {String(index + 1).padStart(2, "0")}</p>
                    </div>
                  </div>

                  <div>
                    <span className="inline-flex rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 px-3 py-1 text-sm font-medium text-[#f1ddab]">
                      {donor.metadata.amount}
                    </span>
                  </div>

                  <div>
                    <p className="text-sm leading-7 text-white/72">{donor.metadata.message || "No public message shared."}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <p className="mt-6 text-center text-sm text-white/58">Many supporters choose to give anonymously. This list highlights recent visible contributions only.</p>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
