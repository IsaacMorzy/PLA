import { Metadata } from 'next'
import { GlassCard } from '@/components/ui/glass-card'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Careers - PeaceLeague Africa',
  description: 'Join our team and help make a difference.',
}

const jobs = [
  {
    title: 'Community Manager',
    department: 'Operations',
    location: 'Remote (Africa)',
    type: 'Full-time',
    description: 'Build relationships with campaign creators and donors across the continent.',
  },
  {
    title: 'Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build beautiful, accessible interfaces for our crowdfunding platform.',
  },
  {
    title: 'Partnership Manager',
    department: 'Business Development',
    location: 'Nairobi, Kenya',
    type: 'Full-time',
    description: 'Forge partnerships with NGOs, companies, and governments.',
  },
  {
    title: 'Content Writer',
    department: 'Marketing',
    location: 'Remote',
    type: 'Contract',
    description: 'Tell compelling stories about campaigns and their impact.',
  },
]

const benefits = [
  'Competitive salary',
  'Health insurance',
  'Remote work flexibility',
  'Learning budget',
  'Annual team retreat',
  'Impact-driven culture',
]

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#1a1815] relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-20" 
          style={{ background: 'radial-gradient(circle, #d4a853 0%, transparent 70%)' }} 
        />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-15" 
          style={{ background: 'radial-gradient(circle, #c46d46 0%, transparent 70%)' }} 
        />
      </div>

      <main className="relative z-10 pt-24 pb-16">
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <GlassCard variant="gradient" className="text-center py-16 px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              Join Our <span className="text-[#d4a853]">Team</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Help us democratize fundraising in Africa. Work with a passionate team making real impact.
            </p>
          </GlassCard>
        </section>

        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <GlassCard key={i} variant={i % 2 === 0 ? 'gold' : 'default'} className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-[#d4a853]/20 text-[#d4a853] text-sm rounded-full">
                    {job.department}
                  </span>
                  <span className="px-3 py-1 bg-[#d4a853]/20 text-[#d4a853] text-sm rounded-full">
                    {job.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{job.title}</h3>
                <p className="text-white/50 text-sm mb-3">{job.location}</p>
                <p className="text-white/60 mb-4">{job.description}</p>
                <button className="px-4 py-2 bg-[#d4a853]/20 hover:bg-[#d4a853]/30 text-[#d4a853] text-sm rounded-lg transition-colors">
                  Apply Now
                </button>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mb-16">
          <GlassCard variant="default" className="p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center font-display">Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#d4a853]/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-white/60">{benefit}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="max-w-6xl mx-auto px-6">
          <GlassCard variant="gold" className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4 font-display">Don&apos;t see the right role?</h2>
            <p className="text-white/60 mb-6">
              We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind.
            </p>
            <a
              href="mailto:careers@peaceleague.africa"
              className="inline-block px-8 py-3 bg-[#d4a853] text-[#1a1815] font-semibold rounded-xl hover:bg-[#e8c87a] transition-colors"
            >
              Email Us
            </a>
          </GlassCard>
        </section>
      </main>

      <Footer />
    </div>
  )
}