import * as React from 'react'
import { cn } from '@/lib/utils'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  spacing?: 'none' | 'sm' | 'md' | 'lg'
}

export function Section({ className, spacing = 'lg', children, ...props }: SectionProps) {
  const spacings = {
    none: '',
    sm: 'py-8',
    md: 'py-16',
    lg: 'py-20 md:py-24',
  }

  return (
    <section className={cn(spacings[spacing], className)} {...props}>
      {children}
    </section>
  )
}
