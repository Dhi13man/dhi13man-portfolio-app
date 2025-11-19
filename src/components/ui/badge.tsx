import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'projects' | 'experience' | 'education' | 'achievements' | 'ventures' | 'recommendations'
  size?: 'sm' | 'md'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap'

    const variants = {
      default: 'bg-muted text-muted-foreground',
      primary: 'bg-primary-100 text-primary-700',
      secondary: 'bg-secondary text-secondary-foreground',
      success: 'bg-emerald-100 text-emerald-700',
      warning: 'bg-amber-100 text-amber-700',
      projects: 'bg-projects-light text-projects-dark',
      experience: 'bg-experience-light text-experience-dark',
      education: 'bg-education-light text-education-dark',
      achievements: 'bg-achievements-light text-achievements-dark',
      ventures: 'bg-ventures-light text-ventures-dark',
      recommendations: 'bg-recommendations-light text-recommendations-dark',
    }

    const sizes = {
      sm: 'px-2.5 py-0.5 text-xs',
      md: 'px-3 py-1 text-sm',
    }

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

export { Badge }
