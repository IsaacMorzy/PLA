import { Metadata } from 'next'
import { Card, CardContent, GlassCard, FeatureCard, StatsCard } from '@/components/ui/glass-card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'About Us - PeaceLeague Africa',
  description: 'Learn about our mission to empower communities through crowdfunding.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#1a1815] relative overflow-hidden page-enter">
      {/* Warm gold mesh background */}
      <div className="fixed inset-0 pointer-events-none bg-mesh opacity-50" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20" 
          style={{ background: 'radial-gradient(circle, #d4a853 0%, transparent 70%)' }} 
        />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-15" 
          style={{ background: 'radial-gradient(circle, #c46d46 0%, transparent 70%)' }} 
        />
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-16">
        {/* Hero Section - warm gold gradient text */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <Card variant="gold" className="py-16 px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-6">
              About <span className="gradient-text">PeaceLeague Africa</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Empowering communities across Africa through transparent crowdfunding. 
              We believe every person deserves the opportunity to create meaningful change.
            </p>
          </Card>
        </section>

        {/* Stats - using StatsCard */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 stagger-children">
            <StatsCard label="Total Raised" value="$2M+" change={{ value: '150%', positive: true }} icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            } />
            <StatsCard label="Donors" value="50K+" change={{ value: '85%', positive: true }} icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            } />
            <StatsCard label="Campaigns" value="500+" change={{ value: '120%', positive: true }} icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            } />
            <StatsCard label="Countries" value="12" change={{ value: '3 new', positive: true }} icon={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A3.5 3.5 0 0011.5 9H13a4 4 0 00-8 0v2.935m0-4.945A3.5 3.5 0 0011.5 5H13a4 4 0 00-8 0v2.945m0-4.945A3.5 3.5 0 0011.5 5H13a4 4 0 00-8 0v2.945" />
              </svg>
            } />
          </div>
        </section>

        {/* Mission & Vision - Overlap Design with Zigzag Pattern */}
        <section className="max-w-6xl mx-auto px-6 mb-16 relative">
          {/* Overlap background elements */}
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#d4a853]/5 rounded-full blur-[80px] -z-10" />
          <div className="absolute bottom-20 right-1/4 w-48 h-48 bg-[#c46d46]/5 rounded-full blur-[60px] -z-10" />
          
          <div className="grid md:grid-cols-2 gap-8 stagger-children">
            {/* Mission Card - positioned higher in zigzag */}
            <div className="relative md:-mt-8 md:mb-8">
              <div className="absolute -top-4 -left-4 w-full h-full border border-[#d4a853]/20 rounded-2xl -z-10" />
              <Card variant="gold" className="p-8 relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4a853]/10 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#d4a853]/15 flex items-center justify-center text-[#d4a853] mb-6">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-display">Our Mission</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  To democratize fundraising in Africa by connecting passionate donors with community-driven projects. We ensure every contribution creates real, measurable impact.
                </p>
              </Card>
            </div>
            
            {/* Vision Card - positioned lower in zigzag */}
            <div className="relative md:mt-8">
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-[#c46d46]/20 rounded-2xl -z-10" />
              <Card variant="terracotta" className="p-8 relative">
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#c46d46]/10 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#c46d46]/15 flex items-center justify-center text-[#c46d46] mb-6">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-display">Our Vision</h3>
                <p className="text-white/70 text-lg leading-relaxed">
                  A Africa where every community has access to the resources they need to thrive. We envision a continent united by generosity and driven by transparency.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Values - using Cards */}
        <section className="max-w-6xl mx-auto px-6">
          <Card variant="gradient" className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-white font-display mb-8 text-center">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8 stagger-children">
              {[
                { 
                  title: 'Transparency', 
                  desc: 'Every dollar is tracked and reported back to donors through our blockchain-powered platform.',
                  icon: '01'
                },
                { 
                  title: 'Community First', 
                  desc: 'We prioritize local voices and sustainable solutions that empower rather than depend.',
                  icon: '02'
                },
                { 
                  title: 'Impact Driven', 
                  desc: 'We measure success by real outcomes, not donations received.',
                  icon: '03'
                },
              ].map((value, i) => (
                <Card key={i} variant={i === 0 ? 'gold' : 'default'} hover className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-[hsla(45,85%,55%,0.15)] flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg font-bold text-[#d4a853]">{value.icon}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-white/60 text-sm">{value.desc}</p>
                </Card>
              ))}
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}