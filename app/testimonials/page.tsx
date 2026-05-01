import { Metadata } from 'next'
import { getTestimonials } from '@/lib/cosmic'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, ProfileCard } from '@/components/ui/glass-card'

export const metadata: Metadata = {
  title: 'Testimonials - PeaceLeague Africa',
  description: 'Hear from our donors and campaign creators.',
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()
  
  // Fallback data if no CMS content
  const fallbackTestimonials = [
    { id: '1', title: 'Emmanuel Musa', metadata: { quote: "PeaceLeague Africa gave me the platform to raise funds for my community's water project.", role: 'Campaign Creator, Nigeria' }},
    { id: '2', title: 'Lisa Thompson', metadata: { quote: "I love being able to track exactly where my donations go.", role: 'Monthly Donor, USA' }},
    { id: '3', title: 'Grace Mwangi', metadata: { quote: "We raised $50,000 for our school in 30 days.", role: 'Campaign Creator, Kenya' }},
    { id: '4', title: 'David Chen', metadata: { quote: "Finally, a platform that truly cares about impact.", role: 'Major Donor, Singapore' }},
    { id: '5', title: 'Amina Hassan', metadata: { quote: "The team helped us every step of the way.", role: 'Campaign Creator, Ghana' }},
    { id: '6', title: 'Robert Williams', metadata: { quote: "PeaceLeague Africa is revolutionizing how we think about giving back.", role: 'Recurring Donor, UK' }},
  ]

  const displayTestimonials = testimonials.length > 0 ? testimonials.map(t => ({
    id: t.id,
    title: t.title || 'Anonymous',
    metadata: { 
      quote: t.metadata?.quote || '',
      role: t.metadata?.role || ''
    }
  })) : fallbackTestimonials

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

      <main className="relative z-10 pt-24 pb-16">
        {/* Hero Section - asymmetric layout */}
        <section className="max-w-6xl mx-auto px-6 mb-16">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <div className="flex-1">
              <Card variant="gold" className="p-8 md:p-12 inline-block">
                <h1 className="text-4xl md:text-5xl font-bold text-white font-display mb-4">
                  Stories of Impact
                </h1>
                <p className="text-xl text-white/70 max-w-xl">
                  Hear from the people whose lives have been changed through PeaceLeague Africa.
                </p>
              </Card>
            </div>
            <div className="text-6xl md:text-8xl text-[#d4a853]/20 font-display">
              "
            </div>
          </div>
        </section>

        {/* Testimonials Grid - varied sizes for visual interest */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {displayTestimonials.map((t, index) => (
              <div key={t.id} className={index % 3 === 0 ? 'md:col-span-1' : ''}>
                <Card variant={index % 2 === 0 ? 'gold' : 'gradient'} hover className="h-full p-6">
                  {/* Quote icon - gold */}
                  <div className="w-10 h-10 rounded-lg bg-[hsla(45,85%,55%,0.15)] flex items-center justify-center text-[#d4a853] mb-4">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.748-9.609 8.783-9.609 4.718 0 7.393 3.301 7.393 8.293v7.707h-6.965l.001-4.215c0-1.789-.935-2.686-2.411-2.686-1.297 0-2.002 1.084-2.002 2.803v4.303h-6.895v7.707h9.096zm-9.087-8.414v-.031c0-4.312 2.819-7.609 6.935-7.609 4.013 0 6.758 3.085 6.758 7.427 0 3.721-2.301 6.275-5.984 6.275-1.858 0-3.508-.686-4.692-1.829l-1.892 1.832c1.584 1.477 3.638 2.306 5.969 2.306 4.013 0 7.393-2.741 7.393-7.609h-8.505z" />
                    </svg>
                  </div>
                  <p className="text-white/80 mb-6 italic leading-relaxed">"{t.metadata.quote}"</p>
                  <div className="border-t border-white/10 pt-4 mt-auto">
                    <p className="font-semibold text-white">{t.title}</p>
                    <p className="text-sm text-[#d4a853]/80">{t.metadata.role}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}