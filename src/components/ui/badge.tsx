import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Semantic variant for the badge
   * - default: Neutral content with subtle styling
   * - accent: Featured/highlighted items (purple accent)
   * - success: Positive metrics, achievements (green)
   * - warning: Attention items, pending status (amber)
   * - error: Errors, failed items (red)
   * - info: Informational badges, neutral data (blue)
   * - outline: Secondary content like skill tags
   *
   * Legacy variants (deprecated - use semantic variants above):
   * - projects, experience, education, achievements, ventures, recommendations
   */
  variant?:
    | 'default'
    | 'accent'
    | 'success'
    | 'warning'
    | 'error'
    | 'info'
    | 'outline'
    // Legacy variants (deprecated but maintained for backward compatibility)
    | 'primary'
    | 'secondary'
    | 'projects'
    | 'experience'
    | 'education'
    | 'achievements'
    | 'ventures'
    | 'recommendations'
  size?: 'sm' | 'md'
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap transition-colors duration-fast'

    const variants = {
      // Semantic variants (Linear design system aligned)
      default: 'bg-surface text-text-primary border border-border',
      accent: 'bg-accent/10 text-accent border border-accent/20',
      success: 'bg-status-success/10 text-status-success border border-status-success/20',
      warning: 'bg-status-warning/10 text-status-warning border border-status-warning/20',
      error: 'bg-status-error/10 text-status-error border border-status-error/20',
      info: 'bg-status-info/10 text-status-info border border-status-info/20',
      outline: 'bg-transparent text-text-secondary border border-border hover:border-border-hover',

      // Legacy variants (maintained for backward compatibility)
      primary: 'bg-accent/10 text-accent border border-accent/20',
      secondary: 'bg-surface text-text-secondary border border-border',
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
