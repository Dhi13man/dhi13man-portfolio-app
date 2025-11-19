import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'outline'
  size?: 'sm' | 'md'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded font-medium whitespace-nowrap transition-colors duration-fast'

    const variants = {
      default: 'bg-surface text-text-primary border border-border',
      accent: 'bg-accent/10 text-accent border border-accent/20',
      success: 'bg-status-success/10 text-status-success border border-status-success/20',
      warning: 'bg-status-warning/10 text-status-warning border border-status-warning/20',
      error: 'bg-status-error/10 text-status-error border border-status-error/20',
      info: 'bg-status-info/10 text-status-info border border-status-info/20',
      outline: 'bg-transparent text-text-secondary border border-border hover:border-border-hover',
    }

    const sizes = {
      sm: 'px-2 py-0.5 text-12',
      md: 'px-3 py-1 text-14',
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
