import { Metadata } from 'next'
import { getRecentDonors } from '@/lib/cosmic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/glass-card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Donor List - PeaceLeague Africa',
  description: 'Our amazing donors who make a difference.',
}

export default async function DonorListPage() {
  const donors = await getRecentDonors()
  
  // Fallback data if no CMS content
  const fallbackDonors = [
    { id: '1', title: 'Anonymous Donor', metadata: { amount: '25 SOL', message: 'Keep up the great work!' }},
    { id: '2', title: 'Sarah M.', metadata: { amount: '15 SOL', message: 'Supporting education in Africa' }},
    { id: '3', title: 'CryptoForGood', metadata: { amount: '10 SOL', message: 'Every little helps' }},
    { id: '4', title: 'Anonymous Donor', metadata: { amount: '8 SOL', message: '' }},
    { id: '5', title: 'David K.', metadata: { amount: '5 SOL', message: 'Water for all' }},
    { id: '6', title: 'Anonymous Donor', metadata: { amount: '5 SOL', message: '' }},
    { id: '7', title: 'Maria L.', metadata: { amount: '3 SOL', message: 'Thank you for what you do' }},
    { id: '8', title: 'Anonymous Donor', metadata: { amount: '2.5 SOL', message: '' }},
    { id: '9', title: 'John T.', metadata: { amount: '2 SOL', message: 'Small contribution for a big cause' }},
    { id: '10', title: 'Anonymous Donor', metadata: { amount: '1.5 SOL', message: '' }},
    { id: '11', title: 'Emma R.', metadata: { amount: '1 SOL', message: 'Believe in this mission' }},
    { id: '12', title: 'Robert H.', metadata: { amount: '1 SOL', message: 'Go team!' }},
  ]

  const displayDonors = donors.length > 0 ? donors.map(donor => ({
    id: donor.id,
    title: donor.metadata?.is_anonymous ? 'Anonymous Donor' : donor.title || 'Anonymous Donor',
    metadata: {
      amount: donor.metadata?.amount || '0',
      message: donor.metadata?.message || '',
      is_anonymous: donor.metadata?.is_anonymous
    }
  })) : fallbackDonors

  return (
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-16">
        <section className="max-w-4xl mx-auto px-6 mb-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Donors</h1>
            <p className="text-xl text-gray-300">Thank you to our amazing community of supporters</p>
          </div>

          <Card>
            <div className="overflow-hidden">
              <div className="grid grid-cols-3 gap-4 p-4 bg-white/[0.02] border-b border-white/[0.08] text-sm font-medium text-gray-400">
                <div className="col-span-2">Donor</div>
                <div className="text-right">Amount</div>
              </div>
              <div className="divide-y divide-white/[0.08]">
                {displayDonors.map((donor) => (
                  <div key={donor.id} className="grid grid-cols-3 gap-4 p-4 hover:bg-white/[0.02] transition-colors">
                    <div className="col-span-2">
                      <p className="font-medium text-white">{donor.title}</p>
                      {donor.metadata.message && (
                        <p className="text-sm text-gray-400">{donor.metadata.message}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full text-indigo-400 text-sm font-medium">
                        {donor.metadata.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <p className="text-center text-gray-500 text-sm mt-8">
            * Showing recent donors. Many more choose to give anonymously.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}