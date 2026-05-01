'use client'

import { GlassCard } from '@/components/ui/glass-card'
import { Accordion } from '@/components/ui/tailgrids'
import { Footer } from '@/components/layout/footer'

const faqItems = [
  {
    id: '1',
    title: 'How does PeaceLeague Africa work?',
    content: 'We connect donors with verified campaigns across Africa. Campaign creators set a funding goal, share their story, and receive support from our global community of donors. Funds are released only when campaigns meet their goal.',
  },
  {
    id: '2',
    title: 'Is my donation secure?',
    content: 'Yes. We use bank-level encryption for all transactions. Your payment information is never stored on our servers. We partner with trusted payment processors to ensure every donation is secure.',
  },
  {
    id: '3',
    title: 'How are funds distributed?',
    content: 'Funds are transferred directly to campaign organizers via bank transfer or mobile money once their campaign meets its goal. We require progress updates to ensure transparency.',
  },
  {
    id: '4',
    title: 'Can I get a tax deduction?',
    content: 'Yes, donations to verified charitable campaigns may be tax-deductible. We provide receipts for all donations that can be used for tax purposes.',
  },
  {
    id: '5',
    title: 'What happens if a campaign doesn\'t reach its goal?',
    content: 'If a campaign doesn\'t reach its goal, donors receive full refunds. This protects donors and encourages campaign creators to engage their networks.',
  },
  {
    id: '6',
    title: 'How can I start a campaign?',
    content: 'Click "Start a Campaign" on our homepage. You\'ll need to verify your identity, describe your cause, set a goal, and share your story. Our team reviews submissions within 48 hours.',
  },
  {
    id: '7',
    title: 'Is there a fee to use the platform?',
    content: 'We charge a small platform fee (5%) only on successful campaigns. This helps us maintain the platform and verify campaigns. There\'s no cost to start a campaign.',
  },
  {
    id: '8',
    title: 'How can I track my impact?',
    content: 'Donors receive regular progress updates from campaigns they support. You can also visit your dashboard to see all campaigns you\'ve supported and their outcomes.',
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#1a1815] relative overflow-hidden">
      {/* Background mesh */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-30%] left-[-20%] w-[600px] h-[600px] bg-[#d4a853]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-[-30%] right-[-20%] w-[500px] h-[500px] bg-[#c46d46]/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d4a853 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <main className="relative z-10 pt-24 pb-16">
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <GlassCard variant="gradient" className="text-center py-16 px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              Frequently Asked <span className="text-[#d4a853]">Questions</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Everything you need to know about crowdfunding with PeaceLeague Africa.
            </p>
          </GlassCard>
        </section>

        <section className="max-w-3xl mx-auto px-6">
          <Accordion items={faqItems} />
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-16">
          <GlassCard variant="default" className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4 font-display">Still have questions?</h2>
            <p className="text-white/60 mb-6">Can't find what you're looking for? Our team is here to help.</p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-[#d4a853] text-[#1a1815] font-semibold rounded-xl hover:bg-[#e8c87a] transition-colors"
            >
              Contact Us
            </a>
          </GlassCard>
        </section>
      </main>

      <Footer />
    </div>
  )
}