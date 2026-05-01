import { Metadata } from 'next'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/glass-card'
import { Footer } from '@/components/layout/footer'

export const metadata: Metadata = {
  title: 'Support Ticket - PeaceLeague Africa',
  description: 'Submit a support request.',
}

export default function SupportTicketPage() {
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
        <section className="max-w-2xl mx-auto px-6">
          <Card variant="gold">
            <CardHeader>
              <CardTitle className="text-white">Submit a Support Request</CardTitle>
              <CardDescription className="text-white/60">We are here to help. Fill out the form below.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Your Email</label>
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#d4a853]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Subject</label>
                  <select className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] rounded-xl text-white focus:outline-none focus:border-[#d4a853]">
                    <option value="">Select a topic</option>
                    <option value="donation">Donation Issue</option>
                    <option value="campaign">Campaign Question</option>
                    <option value="account">Account Help</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Message</label>
                  <textarea 
                    rows={5}
                    placeholder="Describe your issue..."
                    className="w-full px-4 py-3 bg-white/[0.02] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#d4a853] resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 px-6 bg-[#d4a853] text-[#1a1815] font-semibold rounded-xl hover:bg-[#e8c87a] transition-colors"
                >
                  Submit Request
                </button>
              </form>
            </CardContent>
            <CardFooter className="justify-center">
              <p className="text-sm text-white/40">Average response time: 24-48 hours</p>
            </CardFooter>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}