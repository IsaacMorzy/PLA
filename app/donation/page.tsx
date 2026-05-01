'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/glass-card'

export default function DonationPage() {
  const [amount, setAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')

  const PRESET_AMOUNTS = ['0.5', '1', '2', '5', '10']

  const handlePresetClick = (value: string) => {
    setAmount(value)
    setCustomAmount('')
  }

  const handleCustomChange = (value: string) => {
    setCustomAmount(value)
    setAmount('')
  }

  const donateAmount = amount || customAmount

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
            <CardContent>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white font-display">Make a Donation</h2>
                <p className="text-white/50 text-sm">Your contribution creates real impact</p>
              </div>

              <div className="space-y-6">
                {/* Preset Amounts */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Select Amount (SOL)</label>
                  <div className="grid grid-cols-5 gap-3">
                    {PRESET_AMOUNTS.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handlePresetClick(preset)}
                        className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                          amount === preset
                            ? 'bg-[#d4a853] text-[#1a1815]'
                            : 'bg-white/[0.02] border border-white/[0.08] text-white/70 hover:border-[#d4a853]/50'
                        }`}
                      >
                        {preset} SOL
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-3">Or Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">SOL</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={customAmount}
                      onChange={(e) => handleCustomChange(e.target.value)}
                      className="w-full py-3 pl-12 pr-4 bg-white/[0.02] border border-white/[0.08] rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-[#d4a853]"
                    />
                  </div>
                </div>

                {/* Anonymous Donation */}
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="anonymous"
                    className="w-5 h-5 rounded border-white/20 bg-white/[0.02] text-[#d4a853] focus:ring-[#d4a853]"
                  />
                  <label htmlFor="anonymous" className="text-white/60">Make this donation anonymous</label>
                </div>

                {/* Donate Button */}
                <button 
                  disabled={!donateAmount}
                  className="w-full py-4 px-6 bg-[#d4a853] hover:bg-[#e8c87a] disabled:opacity-50 disabled:cursor-not-allowed text-[#1a1815] font-semibold rounded-xl transition-colors text-lg"
                >
                  Donate {donateAmount ? `${donateAmount} SOL` : ''}
                </button>
              </div>
            </CardContent>
            <CardFooter className="justify-center flex-col gap-2">
              <p className="text-sm text-white/40">Secure donation via Solana blockchain</p>
              <p className="text-xs text-white/30">All donations are final and cannot be refunded</p>
            </CardFooter>
          </Card>
        </section>
      </main>
    </div>
  )
}