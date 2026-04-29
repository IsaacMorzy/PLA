import { Metadata } from 'next'
import { GlassCard } from '@/components/ui/glass-card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'How It Works - PeaceLeague Africa',
  description: 'Learn how crowdfunding works on PeaceLeague Africa.',
}

const steps = [
  {
    num: '01',
    title: 'Create a Campaign',
    desc: 'Start by sharing your story. Tell us what problem you want to solve and how the funds will make a difference.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Share Your Story',
    desc: 'Your campaign goes live. Share it on social media, with friends, and with your community to spread the word.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.826-3.318 3 3 0 00-5.826 3.318z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Receive Support',
    desc: 'Donors from around the world contribute to your cause. Every amount makes a difference.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Create Impact',
    desc: 'Once funded, implement your project. Share updates with donors to show the real-world impact of their generosity.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
]

const benefits = [
  { title: 'No Upfront Costs', desc: 'We only charge a small fee when you reach your goal.' },
  { title: 'Real-Time Updates', desc: 'Keep donors informed with progress reports.' },
  { title: 'Secure Payments', desc: 'Bank-level encryption protects every transaction.' },
  { title: 'Global Reach', desc: 'Access donors from anywhere in the world.' },
]

export default function HowItWorksPage() {
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
              How <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Crowdfunding</span> Works
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Four simple steps from idea to impact. Anyone can raise funds for causes they care about.
            </p>
          </GlassCard>
        </section>

        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <GlassCard key={i} className="p-6 relative">
                <div className="absolute -top-3 -left-3 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">{step.num}</span>
                </div>
                <div className="mt-6 mb-4 text-indigo-400">{step.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Why Fund With Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="text-center p-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
                  <p className="text-sm text-gray-400">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>
      </main>

      <Footer />
    </div>
  )
}