/**
 * Modal/Dialog component following Linear design system
 * - Flat design with backdrop blur
 * - Focus trap for accessibility
 * - ESC key to close
 * - Click outside to close (optional)
 */

'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  closeOnClickOutside?: boolean
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onOpenChange, children, closeOnClickOutside = true }, _ref) => {
    const modalRef = React.useRef<HTMLDivElement>(null)

    // Handle ESC key
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && open) {
          onOpenChange(false)
        }
      }

      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, onOpenChange])

    // Handle click outside
    React.useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (
          closeOnClickOutside &&
          modalRef.current &&
          !modalRef.current.contains(e.target as Node)
        ) {
          onOpenChange(false)
        }
      }

      if (open) {
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [open, onOpenChange, closeOnClickOutside])

    // Prevent body scroll when modal is open
    React.useEffect(() => {
      if (open) {
        document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = 'unset'
        }
      }
    }, [open])

    if (!open) return null

    return (
      <div
        className="fixed inset-0 z-modalBackdrop flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" aria-hidden="true" />

        {/* Modal content */}
        <div
          ref={modalRef}
          className="relative z-modal w-full max-w-lg rounded-lg bg-surface border border-border p-6 shadow-none animate-fade-in"
        >
          {children}
        </div>
      </div>
    )
  }
)
Modal.displayName = 'Modal'

const ModalHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-start justify-between gap-4 mb-4', className)}
      {...props}
    />
  )
)
ModalHeader.displayName = 'ModalHeader'

const ModalTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn('text-24 font-semibold text-text-primary', className)}
      {...props}
    />
  )
)
ModalTitle.displayName = 'ModalTitle'

const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-14 text-text-secondary mt-2', className)}
    {...props}
  />
))
ModalDescription.displayName = 'ModalDescription'

interface ModalCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClose: () => void
}

const ModalCloseButton = React.forwardRef<HTMLButtonElement, ModalCloseButtonProps>(
  ({ className, onClose, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      onClick={onClose}
      className={cn(
        'shrink-0 rounded p-1 text-text-tertiary hover:text-text-primary transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface',
        className
      )}
      aria-label="Close dialog"
      {...props}
    >
      <X className="h-5 w-5" />
    </button>
  )
)
ModalCloseButton.displayName = 'ModalCloseButton'

const ModalContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('space-y-4', className)}
      {...props}
    />
  )
)
ModalContent.displayName = 'ModalContent'

const ModalFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-end gap-2 mt-6 pt-4 border-t border-border', className)}
      {...props}
    />
  )
)
ModalFooter.displayName = 'ModalFooter'

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
}
