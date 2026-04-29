import { Metadata } from 'next'
import { GlassCard } from '@/components/ui/glass-card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'About Us - PeaceLeague Africa',
  description: 'Learn about our mission to empower communities through crowdfunding.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-16">
        {/* Hero Section */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <GlassCard className="text-center py-16 px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">PeaceLeague Africa</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Empowering communities across Africa through transparent crowdfunding. 
              We believe every person deserves the opportunity to create meaningful change.
            </p>
          </GlassCard>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300">
                To democratize fundraising in Africa by connecting passionate donors with 
                community-driven projects. We ensure every contribution creates real, measurable impact.
              </p>
            </GlassCard>

            <GlassCard className="p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4">Our Vision</h2>
              <p className="text-gray-300">
                A Africa where every community has access to the resources they need to thrive. 
                We envision a continent united by generosity and driven by transparency.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Values */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Transparency', desc: 'Every dollar is tracked and reported back to donors.' },
                { title: 'Community First', desc: 'We prioritize local voices and sustainable solutions.' },
                { title: 'Impact Driven', desc: 'We measure success by real outcomes, not donations received.' },
              ].map((value, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <span className="text-lg font-bold text-indigo-400">{i + 1}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-400">{value.desc}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        {/* Stats */}
        <section className="max-w-6xl mx-auto px-6">
          <GlassCard className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { number: '$2M+', label: 'Raised' },
                { number: '50K+', label: 'Donors' },
                { number: '500+', label: 'Campaigns' },
                { number: '12', label: 'Countries' },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 mt-1">{stat.label}</div>
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