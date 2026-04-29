import { Metadata } from 'next'
import { GlassCard } from '@/components/ui/glass-card'
import { Header } from '@/components/layout/header'
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
              Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Team</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Help us democratize fundraising in Africa. Work with a passionate team making real impact.
            </p>
          </GlassCard>
        </section>

        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            {jobs.map((job, i) => (
              <GlassCard key={i} className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-sm rounded-full">
                    {job.department}
                  </span>
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm rounded-full">
                    {job.type}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-1">{job.title}</h3>
                <p className="text-gray-400 text-sm mb-3">{job.location}</p>
                <p className="text-gray-300 mb-4">{job.description}</p>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
                  Apply Now
                </button>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mb-16">
          <GlassCard className="p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Benefits</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-300">{benefit}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </section>

        <section className="max-w-6xl mx-auto px-6">
          <GlassCard className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Don&apos;t see the right role?</h2>
            <p className="text-gray-300 mb-6">
              We&apos;re always looking for talented people. Send us your resume and we&apos;ll keep you in mind.
            </p>
            <a
              href="mailto:careers@peaceleague.africa"
              className="inline-block px-8 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl transition-all"
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