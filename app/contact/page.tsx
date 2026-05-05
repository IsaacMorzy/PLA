"use client";

import { useState } from "react";
import { Mail, MapPin, Clock3 } from "lucide-react";
import { ContactForm } from "@/components/ui/tailgrids";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SectionIntro, SitePage } from "@/components/site/page-shell";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SitePage>
      <PageShell className="max-w-6xl">
        <PageHero
          eyebrow="Contact"
          title={
            <>
              Reach the team behind
              <span className="block text-[#f1ddab]">PeaceLeague Africa.</span>
            </>
          }
          description="This page should feel calm, direct, and trustworthy — a polished place to ask questions, start partnerships, or get support."
          align="left"
        />

        <SectionBlock>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <SectionIntro
                eyebrow="Send a message"
                title="A clearer contact flow with less friction and more confidence."
                description="The layout now separates the action from the reassurance so users can decide quickly and act without confusion."
              />
              <Card className="rounded-[2rem] border border-white/10 bg-white/[0.045] p-8">
                {submitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 text-[#d4a853]">
                      <Mail className="h-7 w-7" />
                    </div>
                    <h2 className="mt-6 font-display text-3xl text-white">Message sent</h2>
                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/62">
                      Thanks for reaching out. We’ll follow up as soon as possible with the right next step.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 rounded-full border border-[#d4a853]/20 bg-[#d4a853]/10 px-5 py-2.5 text-sm font-medium text-[#f1ddab] transition duration-300 hover:bg-[#d4a853]/16 hover:text-white"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <div onSubmitCapture={() => setSubmitted(true)}>
                    <ContactForm className="[&_button]:rounded-full [&_button]:bg-[#d4a853] [&_button]:text-[#17120d] [&_input]:rounded-[1rem] [&_input]:border-white/10 [&_input]:bg-black/20 [&_label]:text-white/78 [&_select]:rounded-[1rem] [&_select]:border-white/10 [&_select]:bg-black/20 [&_textarea]:rounded-[1rem] [&_textarea]:border-white/10 [&_textarea]:bg-black/20" />
                  </div>
                )}
              </Card>
            </div>

            <div className="space-y-6">
              {[{
                icon: <Mail className="h-5 w-5" />,
                title: "Email",
                body: "hello@peaceleague.africa",
              }, {
                icon: <MapPin className="h-5 w-5" />,
                title: "Location",
                body: "Nairobi, Kenya",
              }, {
                icon: <Clock3 className="h-5 w-5" />,
                title: "Response time",
                body: "Usually within 24 hours",
              }].map((item) => (
                <Card key={item.title} className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4a853]/10 text-[#d4a853]">{item.icon}</div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">{item.title}</p>
                      <p className="mt-3 text-base text-white">{item.body}</p>
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
