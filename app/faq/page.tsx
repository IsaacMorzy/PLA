'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/ui/glass-card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

interface FAQItem {
  question: string
  answer: string
}

const faqItems: FAQItem[] = [
  {
    question: 'How does PeaceLeague Africa work?',
    answer: 'We connect donors with verified campaigns across Africa. Campaign creators set a funding goal, share their story, and receive support from our global community of donors. Funds are released only when campaigns meet their goal.',
  },
  {
    question: 'Is my donation secure?',
    answer: 'Yes. We use bank-level encryption for all transactions. Your payment information is never stored on our servers. We partner with trusted payment processors to ensure every donation is secure.',
  },
  {
    question: 'How are funds distributed?',
    answer: 'Funds are transferred directly to campaign organizers via bank transfer or mobile money once their campaign meets its goal. We require progress updates to ensure transparency.',
  },
  {
    question: 'Can I get a tax deduction?',
    answer: 'Yes, donations to verified charitable campaigns may be tax-deductible. We provide receipts for all donations that can be used for tax purposes.',
  },
  {
    question: 'What happens if a campaign doesn\'t reach its goal?',
    answer: 'If a campaign doesn\'t reach its goal, donors receive full refunds. This protects donors and encourages campaign creators to engage their networks.',
  },
  {
    question: 'How can I start a campaign?',
    answer: 'Click "Start a Campaign" on our homepage. You\'ll need to verify your identity, describe your cause, set a goal, and share your story. Our team reviews submissions within 48 hours.',
  },
  {
    question: 'Is there a fee to use the platform?',
    answer: 'We charge a small platform fee (5%) only on successful campaigns. This helps us maintain the platform and verify campaigns. There\'s no cost to start a campaign.',
  },
  {
    question: 'How can I track my impact?',
    answer: 'Donors receive regular progress updates from campaigns they support. You can also visit your dashboard to see all campaigns you\'ve supported and their outcomes.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-16">
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <GlassCard className="text-center py-16 px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Questions</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to know about crowdfunding with PeaceLeague Africa.
            </p>
          </GlassCard>
        </section>

        <section className="max-w-3xl mx-auto px-6">
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <GlassCard key={index} className="overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between"
                >
                  <span className="text-lg font-medium text-white pr-4">
                    {item.question}
                  </span>
                  <span className={`flex-shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-6 text-gray-400">{item.answer}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-12">
          <GlassCard className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Still have questions?</h2>
            <p className="text-gray-300 mb-6">Can\'t find what you\'re looking for? Our team is here to help.</p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all"
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