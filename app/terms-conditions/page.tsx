import { Metadata } from "next";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SitePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Terms & Conditions - PeaceLeague Africa",
  description: "Terms and conditions for using PeaceLeague Africa platform.",
};

export default function TermsConditionsPage() {
  return (
    <SitePage>
      <PageShell className="max-w-5xl">
        <PageHero
          eyebrow="Terms"
          title={
            <>
              The platform rules guiding
              <span className="block text-[#f1ddab]">use of PeaceLeague Africa.</span>
            </>
          }
          description="This page keeps the legal content readable and structured while remaining visually consistent with the rest of the redesigned site."
          align="left"
        />

        <SectionBlock>
          <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 sm:p-10 lg:p-12">
            <p className="text-sm text-white/42">Effective: April 2026</p>
            <div className="mt-8 space-y-10 text-white/70 [&_p]:leading-8">
              <section>
                <h2 className="font-display text-3xl text-white">Acceptance of terms</h2>
                <p className="mt-4">By accessing or using PeaceLeague Africa, users agree to the terms that govern the platform and its associated services. If a user does not agree, they should not continue using the platform.</p>
              </section>
              <section>
                <h2 className="font-display text-3xl text-white">User responsibilities</h2>
                <p className="mt-4">Campaign creators are expected to provide accurate and lawful information. Donors and users are responsible for safeguarding wallet credentials and reviewing transaction details carefully.</p>
              </section>
              <section>
                <h2 className="font-display text-3xl text-white">Donations and refunds</h2>
                <p className="mt-4">Blockchain-based donations are generally final. Because of how on-chain transactions work, refunds may not be possible once a transaction has been submitted and confirmed.</p>
              </section>
              <section>
                <h2 className="font-display text-3xl text-white">Campaign guidelines</h2>
                <p className="mt-4">Campaigns must comply with platform standards and applicable law. PeaceLeague Africa reserves the right to review, restrict, or remove campaigns that violate these expectations.</p>
              </section>
              <section>
                <h2 className="font-display text-3xl text-white">Limitation of liability</h2>
                <p className="mt-4">PeaceLeague Africa provides platform infrastructure and user experience layers, but campaign organizers remain responsible for their own fundraising representations and fund usage.</p>
              </section>
              <section>
                <h2 className="font-display text-3xl text-white">Changes to terms</h2>
                <p className="mt-4">These terms may be updated over time. Continued use of the platform after updates may constitute acceptance of the revised terms.</p>
              </section>
            </div>
          </Card>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
