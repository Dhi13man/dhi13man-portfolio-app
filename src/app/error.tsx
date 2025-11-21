'use client'

import { useEffect } from 'react'

/**
 * Error boundary for the application.
 * Catches runtime errors and displays a user-friendly fallback UI.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development only
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error)
    }
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-32 font-display font-bold text-text-primary mb-4">
          Something went wrong
        </h1>
        <p className="text-16 text-text-secondary mb-6">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors duration-fast font-medium"
        >
          Try again
        </button>
      </div>
    </div>
  )
}
