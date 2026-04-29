import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/glass-card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Privacy Policy - PeaceLeague Africa',
  description: 'Our commitment to protecting your privacy and data.',
}

export default function PrivacyPolicyPage() {
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
        <section className="max-w-3xl mx-auto px-6">
          <Card variant="gold">
            <CardContent>
              <h1 className="text-3xl font-bold text-white mb-2 font-display">Privacy Policy</h1>
              <p className="text-white/50 text-sm mb-8">Last updated: April 2026</p>

              <div className="space-y-8 text-white/70">
                <section>
                  <h2 className="text-lg font-semibold text-white mb-3">Information We Collect</h2>
                  <p className="text-white/60">We collect information you provide directly, including name, email, and payment details when making donations. We also collect usage data to improve our services.</p>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white mb-3">How We Use Your Information</h2>
                  <p className="text-white/60">Your information is used to process donations, communicate about campaigns, and provide our services. We never sell your personal data to third parties.</p>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white mb-3">Data Protection</h2>
                  <p className="text-white/60">We implement industry-standard security measures to protect your data. All transactions are encrypted via blockchain technology.</p>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white mb-3">Your Rights</h2>
                  <p className="text-white/60">You have the right to access, correct, or delete your personal data. Contact us to exercise these rights.</p>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white mb-3">Contact Us</h2>
                  <p className="text-white/60">For privacy inquiries, reach out to our support team.</p>
                </section>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}