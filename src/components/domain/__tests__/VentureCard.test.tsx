import React from 'react'
import { render, screen } from '@testing-library/react'
import { VentureCard } from '../VentureCard'
import type { Venture } from '@/types/venture'

// Mock ImageGallery to avoid complex state testing
vi.mock('@/components/ui/image-gallery', () => ({
  ImageGallery: ({ images, alt }: { images: string[]; alt: string }) => (
    <div data-testid="image-gallery" data-images={images.length} data-alt={alt} />
  ),
}))

describe('VentureCard', () => {
  const createMockVenture = (overrides: Partial<Venture> = {}): Venture => ({
    name: 'Test Venture',
    about: 'Test venture description',
    roles: [],
    ...overrides,
  })

  describe('VentureCard_whenBasicData_thenRendersNameAndAbout', () => {
    it('should render venture name', () => {
      // Arrange
      const venture = createMockVenture({
        name: 'My Startup',
      })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: 'My Startup' })).toBeInTheDocument()
    })

    it('should render venture about text', () => {
      // Arrange
      const venture = createMockVenture({
        about: 'An innovative tech startup',
      })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      expect(screen.getByText('An innovative tech startup')).toBeInTheDocument()
    })
  })

  describe('VentureCard_whenStyling_thenAppliesCorrectStyles', () => {
    it('should apply line-clamp to about text', () => {
      // Arrange
      const venture = createMockVenture({
        about: 'Long description text',
      })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      const aboutText = screen.getByText('Long description text')
      expect(aboutText).toHaveClass('line-clamp-2')
    })

    it('should have heading with correct typography', () => {
      // Arrange
      const venture = createMockVenture({ name: 'Venture Name' })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      const heading = screen.getByRole('heading', { level: 4 })
      expect(heading).toHaveClass('text-16', 'font-semibold')
    })
  })

  describe('VentureCard_whenImages_thenRendersImageGallery', () => {
    it('should render ImageGallery with primary image', () => {
      // Arrange
      const venture = createMockVenture({
        images: {
          primary: '/venture-logo.jpg',
        },
      })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      const gallery = screen.getByTestId('image-gallery')
      expect(gallery).toBeInTheDocument()
      expect(gallery).toHaveAttribute('data-images', '1')
    })

    it('should render ImageGallery with primary and other images', () => {
      // Arrange
      const venture = createMockVenture({
        images: {
          primary: '/primary.jpg',
          others: ['/other1.jpg', '/other2.jpg'],
        },
      })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      const gallery = screen.getByTestId('image-gallery')
      expect(gallery).toHaveAttribute('data-images', '3')
    })

    it('should not render ImageGallery when no images', () => {
      // Arrange
      const venture = createMockVenture({
        images: undefined,
      })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      expect(screen.queryByTestId('image-gallery')).not.toBeInTheDocument()
    })

    it('should filter out falsy image values', () => {
      // Arrange
      const venture = createMockVenture({
        images: {
          primary: '/primary.jpg',
          others: [undefined as unknown as string, '/valid.jpg'],
        },
      })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      const gallery = screen.getByTestId('image-gallery')
      expect(gallery).toHaveAttribute('data-images', '2')
    })

    it('should pass venture name as alt text', () => {
      // Arrange
      const venture = createMockVenture({
        name: 'My Venture Name',
        images: { primary: '/logo.jpg' },
      })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      const gallery = screen.getByTestId('image-gallery')
      expect(gallery).toHaveAttribute('data-alt', 'My Venture Name')
    })
  })

  describe('VentureCard_whenLinks_thenRendersLinkIcon', () => {
    it('should render link when primary link exists', () => {
      // Arrange
      const venture = createMockVenture({
        links: { primary: 'https://example.com' },
      })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should have accent color styling for link', () => {
      // Arrange
      const venture = createMockVenture({
        links: { primary: 'https://example.com' },
      })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      const link = screen.getByRole('link')
      expect(link).toHaveClass('text-accent')
    })

    it('should not render link when no links', () => {
      // Arrange
      const venture = createMockVenture({
        links: undefined,
      })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })

  describe('VentureCard_whenLongAbout_thenTruncatesWithLineClamp', () => {
    it('should truncate long about text', () => {
      // Arrange
      const longText = 'This is a very long description that should be truncated after two lines because we want to keep the cards compact and readable.'
      const venture = createMockVenture({
        about: longText,
      })

      // Act
      render(<VentureCard venture={venture} />)

      // Assert
      const aboutElement = screen.getByText(longText)
      expect(aboutElement).toHaveClass('line-clamp-2')
    })
  })
})
