/**
 * Dropdown Menu component following Linear design system
 * - Flat design with subtle borders
 * - Keyboard navigation support
 * - Click outside to close
 * - Accessible with proper ARIA attributes
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface DropdownContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownContext = React.createContext<DropdownContextValue | undefined>(undefined)

function useDropdownContext() {
  const context = React.useContext(DropdownContext)
  if (!context) {
    throw new Error('Dropdown components must be used within a Dropdown component')
  }
  return context
}

interface DropdownProps {
  children: React.ReactNode
  onOpenChange?: (open: boolean) => void
}

const Dropdown = ({ children, onOpenChange }: DropdownProps) => {
  const [open, setOpenState] = React.useState(false)

  const setOpen = React.useCallback(
    (newOpen: boolean) => {
      setOpenState(newOpen)
      onOpenChange?.(newOpen)
    },
    [onOpenChange]
  )

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  )
}
Dropdown.displayName = 'Dropdown'

const DropdownTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { open, setOpen } = useDropdownContext()

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      aria-haspopup="true"
      onClick={() => setOpen(!open)}
      className={className}
      {...props}
    >
      {children}
    </button>
  )
})
DropdownTrigger.displayName = 'DropdownTrigger'

const DropdownContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: 'left' | 'right' }
>(({ className, align = 'left', children, ...props }, _ref) => {
  const { open, setOpen } = useDropdownContext()
  const contentRef = React.useRef<HTMLDivElement>(null)

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, setOpen])

  // Handle ESC key
  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [open, setOpen])

  if (!open) return null

  return (
    <div
      ref={contentRef}
      role="menu"
      aria-orientation="vertical"
      className={cn(
        'absolute z-dropdown mt-2 min-w-[200px] rounded border border-border bg-surface p-1 shadow-none animate-fade-in',
        align === 'right' ? 'right-0' : 'left-0',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
DropdownContent.displayName = 'DropdownContent'

const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { destructive?: boolean }
>(({ className, destructive = false, children, onClick, ...props }, ref) => {
  const { setOpen } = useDropdownContext()

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e)
    setOpen(false)
  }

  return (
    <button
      ref={ref}
      role="menuitem"
      type="button"
      onClick={handleClick}
      className={cn(
        'w-full text-left px-3 py-2 text-14 rounded transition-all duration-fast',
        'focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface',
        destructive
          ? 'text-status-error hover:bg-status-error/10'
          : 'text-text-primary hover:bg-hover-bg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
DropdownItem.displayName = 'DropdownItem'

const DropdownSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    role="separator"
    className={cn('my-1 h-px bg-border', className)}
    {...props}
  />
))
DropdownSeparator.displayName = 'DropdownSeparator'

const DropdownLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-3 py-2 text-12 font-semibold text-text-tertiary', className)}
    {...props}
  />
))
DropdownLabel.displayName = 'DropdownLabel'

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
}
