// Tailgrids-style Feature Components - Warm Gold Theme

'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

// ===== APP WORKFLOW - Step by Step Process =====
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
      {/* Connection line */}
      <div className="hidden md:block absolute left-[calc(50%-1px)] top-20 bottom-20 w-0.5 bg-gradient-to-b from-[#d4a853] to-[#c46d46] opacity-30" />
      
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {steps.map((step, index) => (
          <div 
            key={index} 
            className={cn(
              'relative flex gap-6',
              index % 2 === 1 && 'md:mt-24' // Offset for zigzag pattern
            )}
          >
            {/* Step number / icon */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-[1rem] bg-gradient-to-br from-[#d4a853] to-[#c46d46] flex items-center justify-center">
                {step.icon ? (
                  <div className="text-white">{step.icon}</div>
                ) : (
                  <span className="text-lg font-bold text-white">{step.number}</span>
                )}
              </div>
              {/* Pulse dot for active step */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#d4a853] rounded-full animate-pulse" />
            </div>
            
            {/* Content */}
            <div className="flex-1 pt-2">
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-white/60 text-sm">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ===== FEATURE TABS - Tabbed Interface =====
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
        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                activeTab === tab.id 
                  ? 'bg-[#d4a853] text-[#1a1815]' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
  
        {/* Tab Content */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-2xl md:text-3xl font-bold text-white font-display mb-4">
              {active.title}
            </h3>
            <p className="text-white/70 text-lg mb-6">
              {active.description}
            </p>
            {active.content && <div>{active.content}</div>}
          </div>
          
          {/* Visual / Image */}
          {active.image && (
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#d4a853]/10 to-[#c46d46]/10 p-8 border border-white/10">
                <img src={active.image} alt={active.title} className="w-full h-auto rounded-[1rem]" />
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-[#d4a853]/20" />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

// ===== FEATURE GRID - Icon-based features =====
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
      4: 'md:grid-cols-2 lg:grid-cols-4'
    }
  
    return (
      <div className={cn(`grid ${gridCols[columns]} gap-6`, className)}>
        {features.map((feature, index) => (
          <div 
            key={index}
            className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-[#d4a853]/30 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-[1rem] bg-[#d4a853]/10 flex items-center justify-center text-[#d4a853] mb-4 group-hover:bg-[#d4a853]/20 transition-colors">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
            <p className="text-white/60 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    )
  }

// ===== HOW IT WORKS - Numbered Steps =====
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
      <div className={cn('grid md:grid-cols-3 gap-6 md:gap-8', className)}>
        {steps.map((step, index) => (
          <div key={index} className="relative text-center group">
            {/* Number circle */}
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#d4a853] to-[#c46d46] flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-[#d4a853]/20 group-hover:scale-110 transition-transform duration-300">
              {step.number}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
            <p className="text-white/60 text-sm">{step.description}</p>
            
            {/* Arrow connector (except last) */}
            {index < steps.length - 1 && (
              <div className="hidden md:block absolute top-8 left-[calc(50%+40%)] text-[#d4a853]/30">
                <svg className="w-16 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    )
  }
