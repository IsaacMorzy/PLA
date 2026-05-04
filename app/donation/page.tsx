"use client";

import { useState } from "react";
import { Lock, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/glass-card";
import { PageHero, PageShell, SectionBlock, SitePage } from "@/components/site/page-shell";

export default function DonationPage() {
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const PRESET_AMOUNTS = ["0.5", "1", "2", "5", "10"];

  const handlePresetClick = (value: string) => {
    setAmount(value);
    setCustomAmount("");
  };

  const handleCustomChange = (value: string) => {
    setCustomAmount(value);
    setAmount("");
  };

  const donateAmount = amount || customAmount;

  return (
    <SitePage>
      <PageShell className="max-w-5xl">
        <PageHero
          eyebrow="Donation"
          title={
            <>
              Give with more confidence,
              <span className="block text-[#f1ddab]">clarity, and momentum.</span>
            </>
          }
          description="This standalone donation surface now feels closer to the rest of the platform: focused, premium, and structured around one clear action."
          align="center"
        />

        <SectionBlock>
          <div className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-start">
            <Card className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(212,168,83,0.12),rgba(255,255,255,0.03))] p-8">
              <p className="text-sm uppercase tracking-[0.3em] text-[#d4a853]">Choose an amount</p>
              <h2 className="mt-4 font-display text-3xl text-white">Support the mission in SOL.</h2>

              <div className="mt-8">
                <label className="mb-3 block text-sm font-medium text-white/70">Preset amounts</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {PRESET_AMOUNTS.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => handlePresetClick(preset)}
                      className={`rounded-[1rem] px-4 py-3 text-sm font-semibold transition-all ${
                        amount === preset
                          ? "bg-[#d4a853] text-[#17120d]"
                          : "border border-white/10 bg-black/20 text-white/72 hover:border-[#d4a853]/30 hover:text-white"
                      }`}
                    >
                      {preset} SOL
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <label className="mb-3 block text-sm font-medium text-white/70">Custom amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/38">SOL</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={customAmount}
                    onChange={(event) => handleCustomChange(event.target.value)}
                    className="w-full rounded-[1rem] border border-white/10 bg-black/20 py-3 pl-12 pr-4 text-white placeholder:text-white/28 focus:border-[#d4a853]/40 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3 rounded-[1rem] border border-white/10 bg-black/20 px-4 py-3">
                <input type="checkbox" id="anonymous" className="h-5 w-5 rounded border-white/20 bg-transparent text-[#d4a853] focus:ring-[#d4a853]" />
                <label htmlFor="anonymous" className="text-sm text-white/62">
                  Make this donation anonymous
                </label>
              </div>

              <button
                disabled={!donateAmount}
                className="mt-8 w-full rounded-full bg-[#d4a853] px-6 py-4 text-lg font-semibold text-[#17120d] transition duration-300 hover:bg-[#e5bc68] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Donate {donateAmount ? `${donateAmount} SOL` : "now"}
              </button>
            </Card>

            <div className="space-y-5">
              <Card className="rounded-[1.8rem] border border-white/10 bg-white/[0.045] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4a853]/10 text-[#d4a853]">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">Security</p>
                    <p className="mt-3 text-sm leading-7 text-white/64">Donations are designed to feel direct and secure, with the platform centered on transparent giving flows.</p>
                  </div>
                </div>
              </Card>
              <Card className="rounded-[1.8rem] border border-white/10 bg-white/[0.045] p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4a853]/10 text-[#d4a853]">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">Reminder</p>
                    <p className="mt-3 text-sm leading-7 text-white/64">Blockchain donations are final, so users should review the amount and destination carefully before confirming.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </SectionBlock>
      </PageShell>
    </SitePage>
  );
}
