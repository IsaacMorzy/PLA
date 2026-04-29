import { Metadata } from 'next'
import { GlassCard } from '@/components/ui/glass-card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Events - PeaceLeague Africa',
  description: 'Join our upcoming events and fundraising activities.',
}

const events = [
  {
    title: 'Africa Giving Day',
    date: 'June 15, 2026',
    location: 'Virtual',
    description: 'A 24-hour global crowdfunding marathon. Join donors worldwide to support African causes.',
    type: 'Virtual Event',
  },
  {
    title: 'Impact Summit 2026',
    date: 'July 20-22, 2026',
    location: 'Nairobi, Kenya',
    description: 'Meet campaign creators, donors, and partners. Learn about crowdfunding trends in Africa.',
    type: 'In-Person',
  },
  {
    title: 'Monthly Donor Call',
    date: 'Every first Wednesday',
    location: 'Virtual',
    description: 'Join our monthly call to hear updates from campaigns you support.',
    type: 'Virtual Event',
  },
  {
    title: 'Campaign Creator Workshop',
    date: 'Every Saturday',
    location: 'Virtual',
    description: 'Free workshop for anyone looking to start a crowdfunding campaign.',
    type: 'Workshop',
  },
]

export default function EventsPage() {
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
              Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Events</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Join our community events. Connect, learn, and make an impact together.
            </p>
          </GlassCard>
        </section>

        <section className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <GlassCard key={i} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-sm rounded-full">
                    {event.type}
                  </span>
                  <span className="text-gray-400 text-sm">{event.location}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                <p className="text-indigo-400 mb-3">{event.date}</p>
                <p className="text-gray-400">{event.description}</p>
                <button className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
                  Register
                </button>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-12">
          <GlassCard className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4">Host Your Own Event</h2>
            <p className="text-gray-300 mb-6">
              Want to organize a fundraising event? We&apos;d love to support your efforts.
            </p>
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