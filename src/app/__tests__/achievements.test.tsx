import React from 'react'
import { render, screen } from '@testing-library/react'
import AchievementsPage from '../achievements/page'

// Mock the data module
vi.mock('@/data/achievements', () => ({
  achievements: {
    honorsAndAwards: [
      {
        title: 'Best Award',
        issuer: 'Award Org',
        description: 'Award description',
        startDate: '2023-01-01',
        endDate: '2023-01-01',
      },
    ],
    licensesAndCertifications: [
      {
        title: 'AWS Certified',
        issuer: 'Amazon',
        description: 'Cloud cert',
        startDate: '2023-01-01',
        endDate: '2025-01-01',
        credentialId: 'ABC123',
      },
    ],
    testScores: [
      {
        name: 'GRE',
        score: '330/340',
        description: 'Graduate exam',
        startDate: '2023-01-01',
        endDate: '2023-01-01',
      },
    ],
  },
}))

describe('Achievements Page', () => {
  describe('AchievementsPage_whenRendered_thenDisplaysPageTitle', () => {
    it('should render page title', () => {
      // Arrange & Act
      render(<AchievementsPage />)

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: 'Achievements' })).toBeInTheDocument()
    })
  })

  describe('AchievementsPage_whenRendered_thenDisplaysAllSections', () => {
    it('should render awards section', () => {
      // Arrange & Act
      render(<AchievementsPage />)

      // Assert
      expect(screen.getByText('Honors & Awards')).toBeInTheDocument()
      expect(screen.getByText('Best Award')).toBeInTheDocument()
    })

    it('should render certifications section', () => {
      // Arrange & Act
      render(<AchievementsPage />)

      // Assert
      expect(screen.getByText('Licenses & Certifications')).toBeInTheDocument()
      expect(screen.getByText('AWS Certified')).toBeInTheDocument()
    })

    it('should render test scores section', () => {
      // Arrange & Act
      render(<AchievementsPage />)

      // Assert
      expect(screen.getByText('Test Scores')).toBeInTheDocument()
      expect(screen.getByText('GRE')).toBeInTheDocument()
      expect(screen.getByText('330/340')).toBeInTheDocument()
    })
  })
})
