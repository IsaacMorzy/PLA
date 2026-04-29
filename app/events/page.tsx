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
    <div className="min-h-screen bg-[#1a1815] relative overflow-hidden">
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
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <GlassCard variant="gradient" className="text-center py-16 px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 font-display">
              Upcoming <span className="text-[#d4a853]">Events</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Join our community events. Connect, learn, and make an impact together.
            </p>
          </GlassCard>
        </section>

        <section className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <GlassCard key={i} variant={i % 2 === 0 ? 'default' : 'gold'} className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="px-3 py-1 bg-[#d4a853]/20 text-[#d4a853] text-sm rounded-full">
                    {event.type}
                  </span>
                  <span className="text-white/50 text-sm">{event.location}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                <p className="text-[#d4a853] mb-3">{event.date}</p>
                <p className="text-white/60">{event.description}</p>
                <button className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg transition-colors">
                  Register
                </button>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 mt-12">
          <GlassCard variant="gold" className="p-8 text-center">
            <h2 className="text-2xl font-semibold text-white mb-4 font-display">Host Your Own Event</h2>
            <p className="text-white/60 mb-6">
              Want to organize a fundraising event? We&apos;d love to support your efforts.
            </p>
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