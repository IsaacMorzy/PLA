"use client"

import { useState } from 'react'
import { cn } from '@/lib/utils'

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
      setOpenItems(prev => (prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]))
    } else {
      setOpenItems(prev => (prev.includes(id) ? [] : [id]))
    }
  }

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openItems.includes(item.id)
        return (
          <div
            key={item.id}
            className="overflow-hidden rounded-[1rem] border border-black/[0.08] bg-white/75 dark:border-white/[0.08] dark:bg-white/[0.02]"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.02]"
            >
              <span className="font-medium text-[#21160c] dark:text-white">{item.title}</span>
              <svg
                className={cn('h-5 w-5 text-[#d4a853] transition-transform duration-300', isOpen && 'rotate-180')}
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
                <div className="px-5 pb-5 text-[#5c4732] dark:text-white/70">{item.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

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
      <div className="flex w-fit gap-2 rounded-full border border-black/[0.08] bg-black/[0.03] p-1 dark:border-white/[0.08] dark:bg-white/[0.05]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
              activeTab === tab.id
                ? 'bg-[#d4a853] text-[#1a1815] shadow-sm'
                : 'text-[#4f3b28] hover:bg-black/[0.05] hover:text-[#1f140b] dark:text-white/70 dark:hover:bg-white/[0.05] dark:hover:text-white'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-6">{active.content}</div>
    </div>
  )
}

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
    <div className={cn('grid gap-6 md:grid-cols-3', className)}>
      {tiers.map((tier, index) => (
        <div
          key={index}
          className={cn(
            'relative rounded-2xl border p-6',
            tier.popular
              ? 'border-[#d4a853]/30 bg-gradient-to-br from-[#d4a853]/10 to-transparent'
              : 'border-black/[0.08] bg-white/75 dark:border-white/[0.08] dark:bg-white/[0.02]'
          )}
        >
          {tier.popular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#d4a853] px-3 py-1 text-xs font-semibold text-[#1a1815]">
              Popular
            </div>
          )}

          <h3 className="mb-1 text-lg font-semibold text-[#21160c] dark:text-white">{tier.name}</h3>
          <div className="mb-3 flex items-baseline gap-1">
            <span className="text-3xl font-bold text-[#21160c] dark:text-white">{tier.price}</span>
          </div>
          <p className="mb-6 text-sm text-[#5c4732] dark:text-white/70">{tier.description}</p>

          <ul className="mb-6 space-y-3">
            {tier.features.map((feature, i) => (
              <li key={i} className="flex items-center gap-3 text-sm text-[#4f3b28] dark:text-white/80">
                <svg className="h-4 w-4 shrink-0 text-[#d4a853]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          <button
            className={cn(
              'w-full rounded-full py-3 font-medium transition-all',
              tier.popular
                ? 'bg-[#d4a853] text-[#1a1815] hover:bg-[#e8c87a]'
                : 'border border-black/20 text-[#2a1d12] hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10'
            )}
          >
            {tier.cta}
          </button>
        </div>
      ))}
    </div>
  )
}

interface ContactFormProps {
  className?: string
}

export function ContactForm({ className = '' }: ContactFormProps) {
  return (
    <form className={cn('space-y-5', className)}>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-[#4a3828] dark:text-white/80">First Name</label>
          <input
            type="text"
            className="w-full rounded-[1rem] border border-black/[0.12] bg-white/85 px-4 py-3 text-[#21160c] placeholder:text-[#7a6652] transition-colors focus:border-[#d4a853]/50 focus:outline-none dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/30"
            placeholder="John"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-[#4a3828] dark:text-white/80">Last Name</label>
          <input
            type="text"
            className="w-full rounded-[1rem] border border-black/[0.12] bg-white/85 px-4 py-3 text-[#21160c] placeholder:text-[#7a6652] transition-colors focus:border-[#d4a853]/50 focus:outline-none dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/30"
            placeholder="Doe"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#4a3828] dark:text-white/80">Email</label>
        <input
          type="email"
          className="w-full rounded-[1rem] border border-black/[0.12] bg-white/85 px-4 py-3 text-[#21160c] placeholder:text-[#7a6652] transition-colors focus:border-[#d4a853]/50 focus:outline-none dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/30"
          placeholder="john@example.com"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#4a3828] dark:text-white/80">Subject</label>
        <select className="w-full rounded-[1rem] border border-black/[0.12] bg-white/85 px-4 py-3 text-[#21160c] transition-colors focus:border-[#d4a853]/50 focus:outline-none dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white">
          <option value="">Select a subject</option>
          <option value="general">General Inquiry</option>
          <option value="partnerships">Partnerships</option>
          <option value="support">Technical Support</option>
          <option value="press">Press & Media</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-[#4a3828] dark:text-white/80">Message</label>
        <textarea
          rows={4}
          className="w-full resize-none rounded-[1rem] border border-black/[0.12] bg-white/85 px-4 py-3 text-[#21160c] placeholder:text-[#7a6652] transition-colors focus:border-[#d4a853]/50 focus:outline-none dark:border-white/[0.08] dark:bg-white/[0.02] dark:text-white dark:placeholder:text-white/30"
          placeholder="How can we help you?"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-[#d4a853] py-4 font-semibold text-[#1a1815] transition-colors hover:bg-[#e8c87a]"
      >
        Send Message
      </button>
    </form>
  )
}

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
    <div className={cn('grid grid-cols-2 gap-4 md:grid-cols-4', className)}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="rounded-2xl border border-black/[0.08] bg-white/75 p-5 text-center dark:border-white/[0.08] dark:bg-white/[0.02]"
        >
          <div className="mb-1 text-2xl font-bold text-[#21160c] dark:text-white md:text-3xl">{stat.value}</div>
          <div className="text-sm text-[#5c4732] dark:text-white/70">{stat.label}</div>
          {stat.change && (
            <div className={cn('mt-2 text-xs', stat.change.positive ? 'text-[#8f641f] dark:text-[#f1ddab]' : 'text-red-500 dark:text-red-400')}>
              {stat.change.positive ? '↑' : '↓'} {stat.change.value}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
