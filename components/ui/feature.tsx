'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface WorkflowStep {
  number: string
  title: string
  description: string
  icon?: React.ReactNode
}

interface AppWorkflowProps {
  steps: WorkflowStep[]
  className?: string
}

export function AppWorkflow({ steps, className = '' }: AppWorkflowProps) {
  return (
    <div className={cn('relative', className)}>
      <div className="absolute bottom-20 left-[calc(50%-1px)] top-20 hidden w-0.5 bg-gradient-to-b from-[#d4a853] to-[#c46d46] opacity-30 md:block" />

      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {steps.map((step, index) => (
          <div key={index} className={cn('relative flex gap-6', index % 2 === 1 && 'md:mt-24')}>
            <div className="relative shrink-0">
              <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] bg-gradient-to-br from-[#d4a853] to-[#c46d46]">
                {step.icon ? <div className="text-white">{step.icon}</div> : <span className="text-lg font-bold text-white">{step.number}</span>}
              </div>
              <div className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full bg-[#d4a853]" />
            </div>

            <div className="flex-1 pt-2">
              <h3 className="mb-2 text-lg font-semibold text-[#21160c] dark:text-white">{step.title}</h3>
              <p className="text-sm text-[#5c4732] dark:text-white/70">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface FeatureTab {
  id: string
  label: string
  title: string
  description: string
  content?: React.ReactNode
  image?: string
}

interface FeatureTabsProps {
  tabs: FeatureTab[]
  className?: string
}

export function FeatureTabs({ tabs, className = '' }: FeatureTabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id)
  const active = tabs.find(t => t.id === activeTab) || tabs[0]

  return (
    <div className={cn('', className)}>
      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300',
              activeTab === tab.id
                ? 'bg-[#d4a853] text-[#1a1815]'
                : 'border border-black/10 bg-black/[0.03] text-[#5c4732] hover:bg-black/[0.06] hover:text-[#1f140b] dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid items-center gap-8 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <h3 className="mb-4 font-display text-2xl font-bold text-[#21160c] dark:text-white md:text-3xl">{active.title}</h3>
          <p className="mb-6 text-lg text-[#5c4732] dark:text-white/70">{active.description}</p>
          {active.content && <div>{active.content}</div>}
        </div>

        {active.image && (
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-br from-[#d4a853]/10 to-[#c46d46]/10 p-8 dark:border-white/10">
              <img src={active.image} alt={active.title} className="h-auto w-full rounded-[1rem]" />
              <div className="absolute inset-0 rounded-2xl ring-1 ring-[#d4a853]/20" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
}

interface FeatureGridProps {
  features: FeatureItem[]
  columns?: 2 | 3 | 4
  className?: string
}

export function FeatureGrid({ features, columns = 3, className = '' }: FeatureGridProps) {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn(`grid ${gridCols[columns]} gap-6`, className)}>
      {features.map((feature, index) => (
        <div
          key={index}
          className="group rounded-2xl border border-black/[0.08] bg-white/75 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#d4a853]/30 dark:border-white/[0.08] dark:bg-white/[0.02]"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[#d4a853]/10 text-[#d4a853] transition-colors group-hover:bg-[#d4a853]/20">
            {feature.icon}
          </div>
          <h3 className="mb-2 text-lg font-semibold text-[#21160c] dark:text-white">{feature.title}</h3>
          <p className="text-sm text-[#5c4732] dark:text-white/70">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}

interface HowItWorksStep {
  number: string
  title: string
  description: string
}

interface HowItWorksProps {
  steps: HowItWorksStep[]
  className?: string
}

export function HowItWorks({ steps, className = '' }: HowItWorksProps) {
  return (
    <div className={cn('grid gap-6 md:grid-cols-3 md:gap-8', className)}>
      {steps.map((step, index) => (
        <div key={index} className="group relative text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a853] to-[#c46d46] text-xl font-bold text-white shadow-lg shadow-[#d4a853]/20 transition-transform duration-300 group-hover:scale-110">
            {step.number}
          </div>
          <h3 className="mb-2 text-lg font-semibold text-[#21160c] dark:text-white">{step.title}</h3>
          <p className="text-sm text-[#5c4732] dark:text-white/70">{step.description}</p>

          {index < steps.length - 1 && (
            <div className="absolute left-[calc(50%+40%)] top-8 hidden text-[#d4a853]/30 md:block">
              <svg className="h-6 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
