'use client'

import { useState } from 'react'
import { GlassCard } from '@/components/ui/glass-card'
import { ContactForm } from '@/components/ui/tailgrids'
import { Footer } from '@/components/layout/footer'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

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
              Get In <span className="text-[#d4a853]">Touch</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Reach out and we'll get back to you within 24 hours.
            </p>
          </GlassCard>
        </section>

        <section className="max-w-4xl mx-auto px-6 mb-16">
          <GlassCard variant="default" className="p-8">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#d4a853]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#d4a853]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-2 font-display">Message Sent!</h2>
                <p className="text-white/60">Thank you for reaching out. We'll get back to you soon.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[#d4a853] hover:text-[#e8c87a]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <ContactForm />
            )}
          </GlassCard>
        </section>

        {/* Contact info */}
        <section className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard variant="default" className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#d4a853]/10 flex items-center justify-center text-[#d4a853]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
              <p className="text-white/60">hello@peaceleague.africa</p>
            </GlassCard>
            
            <GlassCard variant="default" className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#d4a853]/10 flex items-center justify-center text-[#d4a853]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Location</h3>
              <p className="text-white/60">Nairobi, Kenya</p>
            </GlassCard>
            
            <GlassCard variant="default" className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-[#d4a853]/10 flex items-center justify-center text-[#d4a853]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">Response Time</h3>
              <p className="text-white/60">Within 24 hours</p>
            </GlassCard>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}