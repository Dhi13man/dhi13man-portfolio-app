import React from 'react'
import { render, screen } from '@testing-library/react'
import RecommendationsPage from '../recommendations/page'

// Mock the data module
jest.mock('@/data/recommendations', () => ({
  recommendations: [
    {
      from: 'John Doe',
      text: 'Great developer and team player.',
    },
    {
      from: 'Jane Smith',
      text: 'Excellent problem-solving skills.',
      links: { primary: 'https://linkedin.com/in/janesmith' },
    },
  ],
}))

describe('Recommendations Page', () => {
  describe('RecommendationsPage_whenRendered_thenDisplaysPageTitle', () => {
    it('should render page title', () => {
      // Arrange & Act
      render(<RecommendationsPage />)

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: 'Recommendations' })).toBeInTheDocument()
    })
  })

  describe('RecommendationsPage_whenRendered_thenDisplaysAllRecommendations', () => {
    it('should render all recommendations', () => {
      // Arrange & Act
      render(<RecommendationsPage />)

      // Assert
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('Jane Smith')).toBeInTheDocument()
    })

    it('should render recommendation texts', () => {
      // Arrange & Act
      render(<RecommendationsPage />)

      // Assert
      expect(screen.getByText('Great developer and team player.')).toBeInTheDocument()
      expect(screen.getByText('Excellent problem-solving skills.')).toBeInTheDocument()
    })
  })

  describe('RecommendationsPage_whenRendered_thenUsesGridLayout', () => {
    it('should render recommendations in appropriate container', () => {
      // Arrange & Act
      const { container } = render(<RecommendationsPage />)

      // Assert - check that content is within sections
      expect(container.querySelector('section')).toBeInTheDocument()
    })
  })
})
