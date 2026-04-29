'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/glass-card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

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
    <div className="min-h-screen bg-[#0a0a0f] relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-gradient-to-r from-emerald-500/15 to-teal-500/15 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <Header />

      <main className="relative z-10 pt-24 pb-16">
        <section className="max-w-2xl mx-auto px-6">
          <Card>
            <CardContent>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white">Make a Donation</h2>
                <p className="text-gray-400 text-sm">Your contribution creates real impact</p>
              </div>

              <div className="space-y-6">
                {/* Preset Amounts */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Select Amount (SOL)</label>
                  <div className="grid grid-cols-5 gap-3">
                    {PRESET_AMOUNTS.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => handlePresetClick(preset)}
                        className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                          amount === preset
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                            : 'bg-white/[0.02] border border-white/[0.08] text-gray-300 hover:border-indigo-500/50'
                        }`}
                      >
                        {preset} SOL
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Or Custom Amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">SOL</span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={customAmount}
                      onChange={(e) => handleCustomChange(e.target.value)}
                      className="w-full py-3 pl-12 pr-4 bg-white/[0.02] border border-white/[0.08] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* Anonymous Donation */}
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    id="anonymous"
                    className="w-5 h-5 rounded border-white/20 bg-white/[0.02] text-indigo-500 focus:ring-indigo-500"
                  />
                  <label htmlFor="anonymous" className="text-gray-300">Make this donation anonymous</label>
                </div>

                {/* Donate Button */}
                <button 
                  disabled={!donateAmount}
                  className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all text-lg"
                >
                  Donate {donateAmount ? `${donateAmount} SOL` : ''}
                </button>
              </div>
            </CardContent>
            <CardFooter className="justify-center flex-col gap-2">
              <p className="text-sm text-gray-500">Secure donation via Solana blockchain</p>
              <p className="text-xs text-gray-600">All donations are final and cannot be refunded</p>
            </CardFooter>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}