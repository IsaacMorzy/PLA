// Tailgrids-style Card Component - Warm Gold Theme
// Based on https://tailgrids.com/docs/components/card

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'gradient' | 'gold' | 'terracotta'
  hover?: boolean
}

export function Card({ children, className = "", variant = 'default', hover = false, ...props }: CardProps) {
  const variants = {
    default: 'bg-white/80 backdrop-blur-xl border border-black/[0.08] dark:bg-white/[0.02] dark:border-white/[0.08]',
    gradient: 'bg-gradient-to-br from-white/95 to-[#f3eadb] border border-black/[0.08] dark:from-white/[0.08] dark:to-white/[0.02] dark:border-white/[0.1]',
    gold: 'bg-gradient-to-br from-[hsla(45,85%,55%,0.16)] to-transparent border border-[hsla(45,85%,55%,0.24)] dark:from-[hsla(45,85%,55%,0.08)] dark:border-[hsla(45,85%,55%,0.15)]',
    terracotta: 'bg-gradient-to-br from-[hsla(25,60%,45%,0.16)] to-transparent border border-[hsla(25,60%,45%,0.24)] dark:from-[hsla(25,60%,45%,0.08)] dark:border-[hsla(25,60%,45%,0.15)]'
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
    <h3 className={`text-xl font-semibold text-[#22170d] dark:text-white font-display ${className}`} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className = "", ...props }: CardProps) {
  return (
    <p className={`mt-1 text-sm text-[#5c4732] dark:text-white/70 ${className}`} {...props}>
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
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-[1rem] bg-[hsla(45,85%,55%,0.15)] text-[#d4a853]">
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-[#22170d] dark:text-white">{title}</h3>
      <p className="mb-4 text-sm text-[#5c4732] dark:text-white/70">{description}</p>
      {action && <div>{action}</div>}
    </Card>
  )
}

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
          <p className="text-sm text-[#6c5640] dark:text-white/62">{label}</p>
          <p className="mt-1 text-2xl font-bold text-[#1f140b] dark:text-white">{value}</p>
          {change && (
            <p className={`mt-2 text-sm ${change.positive ? 'text-[#8f641f] dark:text-[#f1ddab]' : 'text-red-500 dark:text-red-400'}`}>
              {change.positive ? '↑' : '↓'} {change.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[hsla(45,85%,55%,0.1)] text-[#d4a853]">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}

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
            className="h-12 w-12 rounded-full border-2 border-[hsla(45,85%,55%,0.3)] object-cover"
          />
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-[#22170d] dark:text-white">{name}</h4>
          {role && <p className="text-[#d4a853] text-sm">{role}</p>}
          <p className="mt-3 text-sm italic text-[#5c4732] dark:text-white/70">"{content}"</p>
        </div>
      </div>
    </Card>
  )
}

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  variant?: 'default' | 'gradient' | 'gold' | 'terracotta'
}

export function GlassCard({ children, className = "", variant = 'default', ...props }: GlassCardProps) {
  const variants = {
    default: 'bg-white/80 backdrop-blur-xl border border-black/[0.08] dark:bg-white/[0.02] dark:border-white/[0.08]',
    gradient: 'bg-gradient-to-br from-white/95 to-[#f3eadb] border border-black/[0.08] dark:from-white/[0.08] dark:to-white/[0.02] dark:border-white/[0.1]',
    gold: 'bg-gradient-to-br from-[hsla(45,85%,55%,0.16)] to-transparent border border-[hsla(45,85%,55%,0.24)] dark:from-[hsla(45,85%,55%,0.08)] dark:border-[hsla(45,85%,55%,0.15)]',
    terracotta: 'bg-gradient-to-br from-[hsla(25,60%,45%,0.16)] to-transparent border border-[hsla(25,60%,45%,0.24)] dark:from-[hsla(25,60%,45%,0.08)] dark:border-[hsla(25,60%,45%,0.15)]'
  }

  return (
    <div className={`rounded-2xl ${variants[variant]} ${className}`} {...props}>
      {children}
    </div>
  )
}
