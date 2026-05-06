import { Metadata } from "next";
import { LifeBuoy, MailWarning, ShieldAlert } from "lucide-react";
import { Card } from "@/components/ui/glass-card";
import { ContactForm } from "@/components/ui/tailgrids";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

export const metadata: Metadata = {
  title: "Support Ticket - PeaceLeague Africa",
  description: "Submit a support request.",
};

export default function SupportTicketPage() {
  return (
    <SitePage>
      <PageShell className="max-w-6xl">
        <PageHero
          eyebrow="Support"
          title={
            <>
              Submit a request with
              <span className="block text-[#f1ddab]">clarity and the right context.</span>
            </>
          }
          description="Submit campaign, wallet, or account issues with full context so our team can resolve faster and reduce repeat back-and-forth."
          align="left"
        />

        <SectionBlock>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-start">
            <div>
              <SectionIntro
                eyebrow="Open a ticket"
                title="Share the issue once, get a faster resolution path."
                description="Include clear details and references so support can diagnose accurately on first review."
              />
              <Card className="rounded-[2rem] border border-black/10 bg-white/75 p-8 dark:border-white/10 dark:bg-white/[0.045]">
                <ContactForm className="[&_button]:rounded-full [&_button]:bg-[#d4a853] [&_button]:text-[#17120d]" />
              </Card>
            </div>

            <div className="space-y-5">
              {[{
                icon: <LifeBuoy className="h-5 w-5" />, title: "General support", body: "Questions about campaigns, platform usage, or navigation issues.",
              }, {
                icon: <MailWarning className="h-5 w-5" />, title: "Transaction help", body: "Donation and wallet-related issues should include the relevant transaction details.",
              }, {
                icon: <ShieldAlert className="h-5 w-5" />, title: "Urgent trust issue", body: "If something appears suspicious or incorrect, flag it with as much context as possible.",
              }].map((item) => (
                <Card key={item.title} className="rounded-[1.8rem] border border-black/10 bg-[linear-gradient(180deg,rgba(212,168,83,0.16),rgba(255,255,255,0.72))] p-6 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(212,168,83,0.1),rgba(255,255,255,0.03))]">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4a853]/10 text-[#d4a853]">{item.icon}</div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-[#6a5441] dark:text-white/55">{item.title}</p>
                      <p className="mt-3 text-sm leading-7 text-[#5c4732] dark:text-white/72">{item.body}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
