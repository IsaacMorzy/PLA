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
          description="Support pages should feel stable and reassuring. This redesign makes the request flow easier to scan and more in line with the rest of the platform."
          align="left"
        />

        <SectionBlock>
          <div className="grid gap-6 lg:grid-cols-[1fr_0.82fr] lg:items-start">
            <div>
              <SectionIntro
                eyebrow="Open a ticket"
                title="Describe the issue once, and let the layout do the rest."
                description="This page is built to reduce ambiguity and help users provide useful details faster."
              />
              <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8">
                <ContactForm className="[&_button]:rounded-full [&_button]:bg-[#d4a853] [&_button]:text-[#17120d] [&_input]:rounded-[1rem] [&_input]:border-white/10 [&_input]:bg-black/20 [&_label]:text-white/78 [&_select]:rounded-[1rem] [&_select]:border-white/10 [&_select]:bg-black/20 [&_textarea]:rounded-[1rem] [&_textarea]:border-white/10 [&_textarea]:bg-black/20" />
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
                <Card key={item.title} className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(212,168,83,0.1),rgba(255,255,255,0.03))] p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4a853]/10 text-[#d4a853]">{item.icon}</div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">{item.title}</p>
                      <p className="mt-3 text-sm leading-7 text-white/64">{item.body}</p>
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
