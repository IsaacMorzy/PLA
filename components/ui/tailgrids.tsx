"use client"

// Tailgrids-style Accordion & Interactive Components - Warm Gold Theme

import { useState } from 'react'
import { cn } from '@/lib/utils'

// ===== ACCORDION =====
interface AccordionItem {
  id: string
  title: string
  content: string | React.ReactNode
}

interface AccordionProps {
  items: AccordionItem[]
  allowMultiple?: boolean
  className?: string
}

export function Accordion({ items, allowMultiple = false, className = '' }: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(id) 
          ? prev.filter(i => i !== id)
          : [...prev, id]
      )
    } else {
      setOpenItems(prev => prev.includes(id) ? [] : [id])
    }
  }

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        return (
          <div 
            key={item.id}
            className="rounded-[1rem] bg-white/[0.02] border border-white/[0.08] overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-colors"
            >
              <span className="font-medium text-white">{item.title}</span>
              <svg 
                className={cn(
                  'w-5 h-5 text-[#d4a853] transition-transform duration-300',
                  isOpen && 'rotate-180'
                )} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={cn(
                'grid transition-all duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-white/70">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ===== TABS =====
interface TabItem {
  id: string
  label: string
  content: React.ReactNode
}

interface TabsProps {
  tabs: TabItem[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].id)
  const active = tabs.find(t => t.id === activeTab) || tabs[0]

  return (
    <div className={cn('', className)}>
      {/* Tab List */}
      <div className="flex gap-2 p-1 rounded-full bg-white/[0.05] border border-white/[0.08] w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeTab === tab.id 
                ? 'bg-[#d4a853] text-[#1a1815] shadow-sm' 
                : 'text-white/70 hover:text-white hover:bg-white/[0.05]'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="mt-6">
        {active.content}
      </div>
    </div>
  )
}

// ===== PRICING TABLE =====
interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  popular?: boolean
}

interface PricingTableProps {
  tiers: PricingTier[]
  className?: string
}

export function PricingTable({ tiers, className = '' }: PricingTableProps) {
  return (
    <div className={cn('grid md:grid-cols-3 gap-6', className)}>
      {tiers.map((tier, index) => (
        <div 
          key={index}
          className={cn(
            'relative rounded-2xl p-6 border',
            tier.popular 
              ? 'bg-gradient-to-br from-[#d4a853]/10 to-transparent border-[#d4a853]/30' 
              : 'bg-white/[0.02] border-white/[0.08]'
          )}
        >
          {tier.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#d4a853] text-[#1a1815] text-xs font-semibold rounded-full">
              Popular
            </div>
          )}
          
          <h3 className="text-lg font-semibold text-white mb-1">{tier.name}</h3>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-3xl font-bold text-white">{tier.price}</span>
          </div>
          <p className="text-white/60 text-sm mb-6">{tier.description}</p>
          
          <ul className="space-y-3 mb-6">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                <svg className="w-4 h-4 text-[#d4a853] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
          
          <button 
            className={cn(
              'w-full py-3 rounded-full font-medium transition-all',
              tier.popular 
                ? 'bg-[#d4a853] text-[#1a1815] hover:bg-[#e8c87a]' 
                : 'border border-white/20 text-white hover:bg-white/10'
            )}
          >
            {tier.cta}
          </button>
        </div>
      ))}
    </div>
  )
}

// ===== CONTACT FORM =====
interface ContactFormProps {
  className?: string
}

export function ContactForm({ className = '' }: ContactFormProps) {
  return (
    <form className={cn('space-y-5', className)}>
      <div className="grid md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">First Name</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 rounded-[1rem] bg-white/[0.02] border border-white/[0.08] text-white placeholder:text-white/30 focus:border-[#d4a853]/50 focus:outline-none transition-colors"
            placeholder="John"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">Last Name</label>
          <input 
            type="text" 
            className="w-full px-4 py-3 rounded-[1rem] bg-white/[0.02] border border-white/[0.08] text-white placeholder:text-white/30 focus:border-[#d4a853]/50 focus:outline-none transition-colors"
            placeholder="Doe"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Email</label>
        <input 
          type="email" 
          className="w-full px-4 py-3 rounded-[1rem] bg-white/[0.02] border border-white/[0.08] text-white placeholder:text-white/30 focus:border-[#d4a853]/50 focus:outline-none transition-colors"
          placeholder="john@example.com"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Subject</label>
        <select className="w-full px-4 py-3 rounded-[1rem] bg-white/[0.02] border border-white/[0.08] text-white focus:border-[#d4a853]/50 focus:outline-none transition-colors">
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="partnerships">Partnerships</option>
          <option value="support">Technical Support</option>
          <option value="press">Press & Media</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">Message</label>
        <textarea 
          rows={4}
          className="w-full px-4 py-3 rounded-[1rem] bg-white/[0.02] border border-white/[0.08] text-white placeholder:text-white/30 focus:border-[#d4a853]/50 focus:outline-none transition-colors resize-none"
          placeholder="How can we help you?"
        />
      </div>
      
      <button 
        type="submit"
        className="w-full py-4 rounded-full bg-[#d4a853] text-[#1a1815] font-semibold hover:bg-[#e8c87a] transition-colors"
      >
        Send Message
      </button>
    </form>
  )
}

// ===== STATS GRID =====
interface StatItem {
  value: string
  label: string
  change?: { value: string; positive: boolean }
}

interface StatsGridProps {
  stats: StatItem[]
  className?: string
}

export function StatsGrid({ stats, className = '' }: StatsGridProps) {
  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center"
        >
          <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
          <div className="text-white/60 text-sm">{stat.label}</div>
          {stat.change && (
            <div className={cn(
              'text-xs mt-2',
              stat.change.positive ? 'text-[#f1ddab]' : 'text-red-400'
            )}>
              {stat.change.positive ? '↑' : '↓'} {stat.change.value}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
