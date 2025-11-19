/**
 * Toast notification component following Linear design system
 * - Flat design with subtle borders
 * - Status-based color variants
 * - Auto-dismiss with configurable duration
 * - Accessible with ARIA live regions
 */

import * as React from 'react'
import { cn } from '@/lib/utils'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  title?: string
  description?: string
  onClose?: () => void
  duration?: number
}

const toastIcons = {
  default: null,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = 'default', title, description, onClose, children, ...props }, ref) => {
    const Icon = toastIcons[variant]

    const variantStyles = {
      default: 'bg-surface border-border',
      success: 'bg-status-success/10 border-status-success/20 text-status-success',
      error: 'bg-status-error/10 border-status-error/20 text-status-error',
      warning: 'bg-status-warning/10 border-status-warning/20 text-status-warning',
      info: 'bg-status-info/10 border-status-info/20 text-status-info',
    }

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="polite"
        aria-atomic="true"
        className={cn(
          'pointer-events-auto relative flex w-full items-start gap-3 rounded border p-4 shadow-none transition-all duration-fast',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {Icon && <Icon className="h-5 w-5 shrink-0 mt-0.5" aria-hidden="true" />}
        <div className="flex-1 space-y-1">
          {title && (
            <div className="text-14 font-semibold text-text-primary">
              {title}
            </div>
          )}
          {description && (
            <div className="text-12 text-text-secondary">
              {description}
            </div>
          )}
          {children}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded p-1 text-text-tertiary hover:text-text-primary transition-colors duration-fast focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Toast.displayName = 'Toast'

/**
 * ToastProvider component for managing toast notifications
 * Usage:
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 */
interface ToastContextValue {
  showToast: (props: Omit<ToastProps, 'onClose'>) => void
  hideToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastState extends ToastProps {
  id: string
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastState[]>([])

  const hideToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const showToast = React.useCallback((props: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).slice(2, 11)
    const duration = props.duration ?? 5000

    setToasts((prev) => [...prev, { ...props, id }])

    if (duration > 0) {
      setTimeout(() => {
        hideToast(id)
      }, duration)
    }
  }, [hideToast])

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <div
        className="fixed bottom-0 right-0 z-tooltip flex flex-col gap-2 p-4 w-full max-w-md pointer-events-none"
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => hideToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export { Toast }
