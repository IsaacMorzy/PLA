import { Metadata } from 'next'
import { GlassCard } from '@/components/ui/glass-card'
import { HowItWorks } from '@/components/ui/feature'

export const metadata: Metadata = {
  title: 'How It Works - PeaceLeague Africa',
  description: 'Learn how crowdfunding works on PeaceLeague Africa.',
}

const steps = [
  {
    number: '01',
    title: 'Create a Campaign',
    description: 'Start by sharing your story. Tell us what problem you want to solve and how the funds will make a difference.',
  },
  {
    number: '02',
    title: 'Share Your Story',
    description: 'Your campaign goes live. Share it on social media, with friends, and with your community to spread the word.',
  },
  {
    number: '03',
    title: 'Receive Support',
    description: 'Donors from around the world contribute to your cause. Every amount makes a difference.',
  },
  {
    number: '04',
    title: 'Create Impact',
    description: 'Once funded, implement your project. Share updates with donors to show the real-world impact.',
  },
]

const benefits = [
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.672 2.99 1.56l-1.45 1.45C13.69 4.78 12.9 4.5 12 4.5c-2.76 0-5 2.24-5 5 0 .9.28 1.69.78 2.44l-1.45 1.45A5.97 5.97 0 004 12c0-3.31 2.69-6 6-6z" />
      </svg>
    ),
    title: 'Zero Platform Fees', 
    description: 'We don\'t take a cut. 100% of your donation goes to the cause.' 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'On-Chain Verification', 
    description: 'Every transaction recorded on Solana - publicly verifiable by anyone.' 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-5.618 3.04A12.02 12.02 0 003 12c0 1.605.315 3.109.874 4.456l2.157-2.157A11.95 11.95 0 0112 14.055a11.95 11.95 0 01-5.031-1.218l2.157 2.157A12.02 12.02 0 0012 20.055c1.605 0 3.109-.315 4.456-.874l-2.157-2.157a11.95 11.95 0 013.218-5.031z" />
      </svg>
    ),
    title: 'Instant Transfers', 
    description: 'Campaign owners withdraw immediately - no waiting periods.' 
  },
  { 
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-1.343 3-3s-1.343-3-3-3m0 3c-1.657 0-3 1.343-3 3s1.343 3 3 3m0-9c-3.314 0-9 3.686-9 9" />
      </svg>
    ),
    title: 'Global Reach', 
    description: 'Send SOL from anywhere - transaction under $0.01.' 
  },
]

export default function HowItWorksPage() {
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
              How <span className="text-[#d4a853]">Crowdfunding</span> Works
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Four simple steps from idea to impact. Anyone can raise funds for causes they care about.
            </p>
          </GlassCard>
        </section>

        {/* Steps */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <HowItWorks steps={steps} />
        </section>

        {/* Benefits */}
        <section className="max-w-6xl mx-auto px-6">
          <GlassCard variant="default" className="p-8">
            <h2 className="text-2xl font-semibold text-white mb-8 text-center font-display">Why Fund With Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="text-center p-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#d4a853]/10 flex items-center justify-center text-[#d4a853]">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-white/60">{benefit.description}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </main>
    </div>
  )
}