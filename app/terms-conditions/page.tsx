import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/glass-card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Terms & Conditions - PeaceLeague Africa',
  description: 'Terms and conditions for using PeaceLeague Africa platform.',
}

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-16">
        <section className="max-w-3xl mx-auto px-6">
          <Card>
            <CardContent>
              <h1 className="text-3xl font-bold text-white mb-2">Terms & Conditions</h1>
              <p className="text-gray-500 text-sm mb-8">Effective: April 2026</p>

              <div className="space-y-8 text-gray-300">
                <section>
                  <h2 className="text-lg font-semibold text-white mb-3">Acceptance of Terms</h2>
                  <p className="text-gray-400">By using PeaceLeague Africa, you agree to these terms. If you do not agree, please do not use our platform.</p>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white mb-3">User Responsibilities</h2>
                  <p className="text-gray-400">Campaign creators must provide accurate information. Donors must ensure their wallet credentials are secure.</p>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white mb-3">Donations & Refunds</h2>
                  <p className="text-gray-400">All donations are final. Due to the nature of blockchain transactions, we cannot offer refunds.</p>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white mb-3">Campaign Guidelines</h2>
                  <p className="text-gray-400">Campaigns must be for legitimate purposes. We reserve the right to remove campaigns that violate our community standards.</p>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white mb-3">Limitation of Liability</h2>
                  <p className="text-gray-400">PeaceLeague Africa facilitates donations but is not responsible for how funds are used by campaign owners.</p>
                </section>

                <section>
                  <h2 className="text-lg font-semibold text-white mb-3">Changes to Terms</h2>
                  <p className="text-gray-400">We may update these terms periodically. Continued use constitutes acceptance of updated terms.</p>
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