import React from 'react'
import { render, screen } from '@testing-library/react'
import { RecommendationCard } from '../RecommendationCard'
import type { Recommendation } from '@/types/recommendation'

describe('RecommendationCard', () => {
  const createMockRecommendation = (overrides: Partial<Recommendation> = {}): Recommendation => ({
    from: 'John Doe',
    text: 'This is a great recommendation text.',
    ...overrides,
  })

  describe('RecommendationCard_whenBasicData_thenRendersQuoteAndAuthor', () => {
    it('should render recommendation text as blockquote', () => {
      // Arrange
      const recommendation = createMockRecommendation({
        text: 'Exceptional work ethic and technical skills.',
      })

      // Act
      const { container } = render(<RecommendationCard recommendation={recommendation} />)

      // Assert
      const blockquote = container.querySelector('blockquote')
      expect(blockquote).toBeInTheDocument()
      expect(blockquote).toHaveTextContent('Exceptional work ethic and technical skills.')
    })

    it('should render author name', () => {
      // Arrange
      const recommendation = createMockRecommendation({
        from: 'Jane Smith',
      })

      // Act
      render(<RecommendationCard recommendation={recommendation} />)

      // Assert
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })
  })

  describe('RecommendationCard_whenStyling_thenAppliesCorrectStyles', () => {
    it('should have italic text style for quote', () => {
      // Arrange
      const recommendation = createMockRecommendation()

      // Act
      const { container } = render(<RecommendationCard recommendation={recommendation} />)

      // Assert
      const blockquote = container.querySelector('blockquote')
      expect(blockquote).toHaveClass('italic')
    })

    it('should have left border accent on blockquote', () => {
      // Arrange
      const recommendation = createMockRecommendation()

      // Act
      const { container } = render(<RecommendationCard recommendation={recommendation} />)

      // Assert
      const blockquote = container.querySelector('blockquote')
      expect(blockquote).toHaveClass('border-l-2', 'border-accent', 'pl-4')
    })

    it('should have semibold font for author name', () => {
      // Arrange
      const recommendation = createMockRecommendation({
        from: 'Test Author',
      })

      // Act
      render(<RecommendationCard recommendation={recommendation} />)

      // Assert
      const authorElement = screen.getByText('Test Author')
      expect(authorElement).toHaveClass('font-semibold')
    })
  })

  describe('RecommendationCard_whenLinks_thenRendersLinkButton', () => {
    it('should render link button when primary link exists', () => {
      // Arrange
      const recommendation = createMockRecommendation({
        from: 'John Doe',
        links: { primary: 'https://linkedin.com/in/johndoe' },
      })

      // Act
      render(<RecommendationCard recommendation={recommendation} />)

      // Assert
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://linkedin.com/in/johndoe')
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('should have correct aria-label for link', () => {
      // Arrange
      const recommendation = createMockRecommendation({
        from: 'Jane Smith',
        links: { primary: 'https://linkedin.com/in/janesmith' },
      })

      // Act
      render(<RecommendationCard recommendation={recommendation} />)

      // Assert
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('aria-label', "View Jane Smith's profile")
    })

    it('should not render link when no links provided', () => {
      // Arrange
      const recommendation = createMockRecommendation({
        links: undefined,
      })

      // Act
      render(<RecommendationCard recommendation={recommendation} />)

      // Assert
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })

  describe('RecommendationCard_whenLongText_thenRendersCompletely', () => {
    it('should render long recommendation text', () => {
      // Arrange
      const longText = 'A'.repeat(500)
      const recommendation = createMockRecommendation({
        text: longText,
      })

      // Act
      const { container } = render(<RecommendationCard recommendation={recommendation} />)

      // Assert
      const blockquote = container.querySelector('blockquote')
      expect(blockquote).toHaveTextContent(longText)
    })
  })

  describe('RecommendationCard_whenSpecialCharacters_thenRendersCorrectly', () => {
    it('should handle special characters in text', () => {
      // Arrange
      const recommendation = createMockRecommendation({
        text: "He's an excellent developer & team player!",
        from: "O'Connor",
      })

      // Act
      render(<RecommendationCard recommendation={recommendation} />)

      // Assert
      expect(screen.getByText("He's an excellent developer & team player!")).toBeInTheDocument()
      expect(screen.getByText("O'Connor")).toBeInTheDocument()
    })
  })
})
