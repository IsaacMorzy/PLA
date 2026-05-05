import { Metadata } from "next";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SitePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy - PeaceLeague Africa",
  description: "Our commitment to protecting your privacy and data.",
};

export default function PrivacyPolicyPage() {
  return (
    <SitePage>
      <PageShell className="max-w-5xl">
        <PageHero
          eyebrow="Privacy policy"
          title={
            <>
              How PeaceLeague Africa handles
              <span className="block text-[#f1ddab]">privacy and personal data.</span>
            </>
          }
          description="Legal pages should still feel intentional. This version improves readability and structure without overdesigning policy content."
          align="left"
        />

        <SectionBlock>
          <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 sm:p-10 lg:p-12">
            <p className="text-sm text-white/42">Last updated: April 2026</p>
            <div className="mt-8 space-y-10 text-white/70 [&_p]:leading-8">
              <section>
                <h2 className="font-display text-3xl text-white">Information we collect</h2>
                <p className="mt-4">We collect information you provide directly, including contact details and information required to interact with campaigns or platform support. We may also collect product usage signals that help us improve reliability and user experience.</p>
              </section>
              <section>
                <h2 className="font-display text-3xl text-white">How we use your information</h2>
                <p className="mt-4">Your information is used to operate the platform, process relevant communications, improve product performance, and support campaign-related activity. We do not position personal data as a resale asset.</p>
              </section>
              <section>
                <h2 className="font-display text-3xl text-white">Data protection</h2>
                <p className="mt-4">We apply appropriate technical and organizational measures to protect user data. Where blockchain infrastructure is involved, users should also understand the public nature of on-chain activity.</p>
              </section>
              <section>
                <h2 className="font-display text-3xl text-white">Your rights</h2>
                <p className="mt-4">You may have rights to access, correct, or request deletion of certain personal information depending on the applicable jurisdiction and the nature of the data involved.</p>
              </section>
              <section>
                <h2 className="font-display text-3xl text-white">Contact</h2>
                <p className="mt-4">For privacy-related questions or requests, please contact the PeaceLeague Africa support team through the appropriate support or contact channel.</p>
              </section>
            </div>
          </Card>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
