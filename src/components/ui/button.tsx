import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'
  size?: 'sm' | 'md' | 'lg'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    const baseStyles =
      'inline-flex items-center justify-center whitespace-nowrap rounded-lg font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group'

    const variants = {
      primary:
        'bg-primary text-primary-foreground hover:-translate-y-0.5 hover:shadow-glow',
      secondary:
        'bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    }

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 py-2',
      lg: 'h-14 px-8 py-3 text-lg',
    }

    if (asChild) {
      return (
        <Comp
          className={cn(baseStyles, variants[variant], sizes[size], className)}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      )
    }

    return (
      <Comp
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {variant === 'primary' && (
          <span className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-735 ease-pylon -z-10" />
        )}
        <span className="relative z-10">{children}</span>
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button }
