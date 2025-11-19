import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

/**
 * Button component props following Linear design system
 * 
 * @property {('primary' | 'secondary' | 'ghost' | 'link')} variant - Visual style variant
 * @property {('sm' | 'md' | 'lg')} size - Size of the button
 * @property {boolean} asChild - Render as child component (e.g., Link)
 * 
 * @example
 * // Primary button
 * <Button variant="primary" size="md">Click me</Button>
 * 
 * @example
 * // Button as Link
 * <Button asChild variant="secondary">
 *   <Link href="/projects">View Projects</Link>
 * </Button>
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant - default is 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost' | 'link'
  /** Size of the button - default is 'md' */
  size?: 'sm' | 'md' | 'lg'
  /** Render as child component (useful with Next.js Link) */
  asChild?: boolean
}

/**
 * Button component with Linear design system aesthetics
 * - Flat design with no shadows
 * - Fast 150ms transitions
 * - Full keyboard and screen reader support
 * - Multiple variants and sizes
 * 
 * @component
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    const baseStyles =
      'inline-flex items-center justify-center whitespace-nowrap rounded font-medium transition-all duration-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50'

    const variants = {
      primary:
        'bg-accent text-text-primary hover:bg-accent-hover',
      secondary:
        'border border-border text-accent hover:border-border-hover hover:bg-hover-bg',
      ghost:
        'text-text-secondary hover:text-text-primary hover:bg-hover-bg',
      link:
        'text-accent hover:text-accent-hover underline-offset-4 hover:underline',
    }

    const sizes = {
      sm: 'h-8 px-3 text-12',
      md: 'h-10 px-4 text-14',
      lg: 'h-12 px-6 text-16',
    }

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
)
Button.displayName = 'Button'

export { Button }
