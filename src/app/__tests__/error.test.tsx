import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ErrorPage from '../error'

// Helper to create error objects without conflicting with the imported component
function createError(message?: string, digest?: string): Error & { digest?: string } {
  const error = new globalThis.Error(message) as Error & { digest?: string }
  if (digest) error.digest = digest
  return error
}

describe('ErrorPage', () => {
  describe('ErrorPage_whenRendered_thenDisplaysErrorMessage', () => {
    it('should display generic message in production mode', () => {
      // Arrange
      const error = createError('Test error message')
      const reset = jest.fn()

      // Act
      render(<ErrorPage error={error} reset={reset} />)

      // Assert - In production/test mode, shows generic message for security
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument()
    })

    it('should display error message in development mode', () => {
      // Arrange
      const originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'development'
      const error = createError('Development error message')
      const reset = jest.fn()

      // Act
      render(<ErrorPage error={error} reset={reset} />)

      // Assert - In development, shows actual error message
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('Development error message')).toBeInTheDocument()

      // Cleanup
      process.env.NODE_ENV = originalEnv
    })

    it('should display default message when error has no message', () => {
      // Arrange
      const error = createError('')
      const reset = jest.fn()

      // Act
      render(<ErrorPage error={error} reset={reset} />)

      // Assert
      expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument()
    })
  })

  describe('ErrorPage_whenResetClicked_thenCallsResetFunction', () => {
    it('should call reset function when button is clicked', () => {
      // Arrange
      const error = createError('Test error')
      const reset = jest.fn()

      // Act
      render(<ErrorPage error={error} reset={reset} />)
      fireEvent.click(screen.getByRole('button', { name: 'Try again' }))

      // Assert
      expect(reset).toHaveBeenCalledTimes(1)
    })
  })

  describe('ErrorPage_whenErrorHasDigest_thenRendersWithoutCrash', () => {
    it('should handle error with digest property', () => {
      // Arrange
      const error = createError('Digest error', 'abc123')
      const reset = jest.fn()

      // Act
      render(<ErrorPage error={error} reset={reset} />)

      // Assert - Renders without crashing, shows generic message in production
      expect(screen.getByText('Something went wrong')).toBeInTheDocument()
      expect(screen.getByText('An unexpected error occurred. Please try again.')).toBeInTheDocument()
    })
  })
})
