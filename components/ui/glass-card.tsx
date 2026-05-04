// Tailgrids-style Card Component - Warm Gold Theme
// Based on https://tailgrids.com/docs/components/card

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'gradient' | 'gold' | 'terracotta'
  hover?: boolean
}

export function Card({ children, className = "", variant = 'default', hover = false, ...props }: CardProps) {
  const variants = {
    default: 'bg-white/[0.02] backdrop-blur-xl border border-white/[0.08]',
    gradient: 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1]',
    gold: 'bg-gradient-to-br from-[hsla(45,85%,55%,0.08)] to-transparent border border-[hsla(45,85%,55%,0.15)]',
    terracotta: 'bg-gradient-to-br from-[hsla(25,60%,45%,0.08)] to-transparent border border-[hsla(25,60%,45%,0.15)]'
  }
  
  const hoverClass = hover 
    ? ' transition-all duration-300 ease-out hover:border-[hsla(45,85%,55%,0.3)] hover:shadow-[0_0_30px_hsla(45,85%,55%,0.1)] hover:-translate-y-1' 
    : ''
  
  return (
    <div 
      className={`rounded-2xl ${variants[variant]}${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`p-6 pb-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = "", ...props }: CardProps) {
  return (
    <h3 className={`text-xl font-semibold text-white font-display ${className}`} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className = "", ...props }: CardProps) {
  return (
    <p className={`text-sm text-white/60 mt-1 ${className}`} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardAction({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`p-6 pb-0 ml-auto ${className}`} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = "", ...props }: CardProps) {
  return (
    <div className={`p-6 pt-0 flex justify-between ${className}`} {...props}>
      {children}
    </div>
  )
}

// Feature Action Card - Icon + Title + Description + CTA Button
export function FeatureCard({ 
  icon, 
  title, 
  description, 
  action,
  className = "" 
}: { 
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
  className?: string
}) {
  return (
    <Card variant="gold" hover className={`p-6 ${className}`}>
      <div className="w-12 h-12 rounded-[1rem] bg-[hsla(45,85%,55%,0.15)] flex items-center justify-center text-[#d4a853] mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-white/60 text-sm mb-4">{description}</p>
      {action && <div>{action}</div>}
    </Card>
  )
}

// Stats Card - For dashboard metrics
export function StatsCard({ 
  label, 
  value, 
  change, 
  icon,
  className = "" 
}: { 
  label: string
  value: string | number
  change?: { value: string; positive: boolean }
  icon?: React.ReactNode
  className?: string
}) {
  return (
    <Card variant="default" className={`p-5 ${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/50 text-sm">{label}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-2 ${change.positive ? 'text-[#f1ddab]' : 'text-red-400'}`}>
              {change.positive ? '↑' : '↓'} {change.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 rounded-lg bg-[hsla(45,85%,55%,0.1)] flex items-center justify-center text-[#d4a853]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}

// Profile Card - For team/testimonials
export function ProfileCard({
  image,
  name,
  role,
  content,
  className = ""
}: {
  image?: string
  name: string
  role?: string
  content: string
  className?: string
}) {
  return (
    <Card variant="gradient" className={`p-6 ${className}`}>
      <div className="flex items-start gap-4">
        {image && (
          <img 
            src={image} 
            alt={name} 
            className="w-12 h-12 rounded-full object-cover border-2 border-[hsla(45,85%,55%,0.3)]"
          />
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-white">{name}</h4>
          {role && <p className="text-[#d4a853] text-sm">{role}</p>}
          <p className="text-white/70 text-sm mt-3 italic">"{content}"</p>
        </div>
      </div>
    </Card>
  )
}

// Glass Card - With variant support
interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'gradient' | 'gold' | 'terracotta'
}

export function GlassCard({ children, className = "", variant = 'default', ...props }: GlassCardProps) {
  const variants = {
    default: 'bg-white/[0.02] backdrop-blur-xl border border-white/[0.08]',
    gradient: 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/[0.1]',
    gold: 'bg-gradient-to-br from-[hsla(45,85%,55%,0.08)] to-transparent border border-[hsla(45,85%,55%,0.15)]',
    terracotta: 'bg-gradient-to-br from-[hsla(25,60%,45%,0.08)] to-transparent border border-[hsla(25,60%,45%,0.15)]'
  }

  return (
    <div className={`rounded-2xl ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}
