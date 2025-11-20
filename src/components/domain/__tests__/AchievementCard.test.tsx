import React from 'react'
import { render, screen } from '@testing-library/react'
import { AwardCard, CertificationCard, TestScoreCard } from '../AchievementCard'
import type { Award, Certification, TestScore } from '@/types/achievement'

describe('AwardCard', () => {
  const createMockAward = (overrides: Partial<Award> = {}): Award => ({
    title: 'Test Award',
    issuer: 'Test Organization',
    description: 'Award description',
    startDate: '2023-01-01',
    endDate: '2023-01-01',
    ...overrides,
  })

  describe('AwardCard_whenBasicData_thenRendersCorrectly', () => {
    it('should render award title, issuer, and description', () => {
      // Arrange
      const award = createMockAward({
        title: 'Best Achievement',
        issuer: 'Award Organization',
        description: 'For outstanding performance',
      })

      // Act
      render(<AwardCard award={award} />)

      // Assert
      expect(screen.getByRole('heading', { level: 3, name: 'Best Achievement' })).toBeInTheDocument()
      expect(screen.getByText('Award Organization')).toBeInTheDocument()
      expect(screen.getByText('For outstanding performance')).toBeInTheDocument()
    })

    it('should render formatted date range', () => {
      // Arrange
      const award = createMockAward({
        startDate: '2023-06-15',
        endDate: '2023-06-15',
      })

      // Act
      render(<AwardCard award={award} />)

      // Assert
      expect(screen.getByText('Jun 2023 - Jun 2023')).toBeInTheDocument()
    })
  })

  describe('AwardCard_whenLinks_thenRendersLinkButton', () => {
    it('should render link button when primary link exists', () => {
      // Arrange
      const award = createMockAward({
        title: 'Award with Link',
        links: { primary: 'https://example.com/award' },
      })

      // Act
      render(<AwardCard award={award} />)

      // Assert
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://example.com/award')
      expect(link).toHaveAttribute('aria-label', 'View Award with Link')
    })

    it('should not render link when no links', () => {
      // Arrange
      const award = createMockAward({ links: undefined })

      // Act
      render(<AwardCard award={award} />)

      // Assert
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })

  describe('AwardCard_whenDetails_thenRendersList', () => {
    it('should render details list', () => {
      // Arrange
      const award = createMockAward({
        details: ['Detail 1', 'Detail 2'],
      })

      // Act
      render(<AwardCard award={award} />)

      // Assert
      expect(screen.getByText('Detail 1')).toBeInTheDocument()
      expect(screen.getByText('Detail 2')).toBeInTheDocument()
    })

    it('should not render details when empty', () => {
      // Arrange
      const award = createMockAward({ details: [] })

      // Act
      const { container } = render(<AwardCard award={award} />)

      // Assert
      expect(container.querySelector('ul')).not.toBeInTheDocument()
    })
  })
})

describe('CertificationCard', () => {
  const createMockCertification = (overrides: Partial<Certification> = {}): Certification => ({
    title: 'Test Certification',
    issuer: 'Certification Body',
    description: 'Certification description',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    ...overrides,
  })

  describe('CertificationCard_whenBasicData_thenRendersCorrectly', () => {
    it('should render certification title, issuer, and description', () => {
      // Arrange
      const certification = createMockCertification({
        title: 'AWS Certified',
        issuer: 'Amazon Web Services',
        description: 'Cloud certification',
      })

      // Act
      render(<CertificationCard certification={certification} />)

      // Assert
      expect(screen.getByRole('heading', { level: 3, name: 'AWS Certified' })).toBeInTheDocument()
      expect(screen.getByText('Amazon Web Services')).toBeInTheDocument()
      expect(screen.getByText('Cloud certification')).toBeInTheDocument()
    })
  })

  describe('CertificationCard_whenCredentialId_thenDisplaysIt', () => {
    it('should render credential ID when provided', () => {
      // Arrange
      const certification = createMockCertification({
        credentialId: 'ABC123XYZ',
      })

      // Act
      render(<CertificationCard certification={certification} />)

      // Assert
      expect(screen.getByText(/Credential ID:/)).toBeInTheDocument()
      expect(screen.getByText(/ABC123XYZ/)).toBeInTheDocument()
    })

    it('should not render credential ID when not provided', () => {
      // Arrange
      const certification = createMockCertification({
        credentialId: undefined,
      })

      // Act
      render(<CertificationCard certification={certification} />)

      // Assert
      expect(screen.queryByText(/Credential ID:/)).not.toBeInTheDocument()
    })
  })

  describe('CertificationCard_whenLinks_thenRendersLinkButton', () => {
    it('should render link button when primary link exists', () => {
      // Arrange
      const certification = createMockCertification({
        title: 'Cert with Link',
        links: { primary: 'https://verify.example.com' },
      })

      // Act
      render(<CertificationCard certification={certification} />)

      // Assert
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://verify.example.com')
      expect(link).toHaveAttribute('aria-label', 'View Cert with Link')
    })
  })

  describe('CertificationCard_whenDetails_thenRendersList', () => {
    it('should render details list', () => {
      // Arrange
      const certification = createMockCertification({
        details: ['Skill 1', 'Skill 2'],
      })

      // Act
      render(<CertificationCard certification={certification} />)

      // Assert
      expect(screen.getByText('Skill 1')).toBeInTheDocument()
      expect(screen.getByText('Skill 2')).toBeInTheDocument()
    })
  })
})

describe('TestScoreCard', () => {
  const createMockTestScore = (overrides: Partial<TestScore> = {}): TestScore => ({
    name: 'Test Score',
    score: '95/100',
    description: 'Test description',
    startDate: '2023-01-01',
    endDate: '2023-01-01',
    ...overrides,
  })

  describe('TestScoreCard_whenBasicData_thenRendersCorrectly', () => {
    it('should render test name and description', () => {
      // Arrange
      const testScore = createMockTestScore({
        name: 'GRE',
        description: 'Graduate Record Examination',
      })

      // Act
      render(<TestScoreCard testScore={testScore} />)

      // Assert
      expect(screen.getByRole('heading', { level: 3, name: 'GRE' })).toBeInTheDocument()
      expect(screen.getByText('Graduate Record Examination')).toBeInTheDocument()
    })

    it('should render score prominently', () => {
      // Arrange
      const testScore = createMockTestScore({
        score: '330/340',
      })

      // Act
      render(<TestScoreCard testScore={testScore} />)

      // Assert
      const scoreElement = screen.getByText('330/340')
      expect(scoreElement).toBeInTheDocument()
      expect(scoreElement).toHaveClass('text-20', 'font-bold', 'text-accent')
    })
  })

  describe('TestScoreCard_whenLinks_thenRendersLinkButton', () => {
    it('should render link button when primary link exists', () => {
      // Arrange
      const testScore = createMockTestScore({
        name: 'Test with Link',
        links: { primary: 'https://scores.example.com' },
      })

      // Act
      render(<TestScoreCard testScore={testScore} />)

      // Assert
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://scores.example.com')
      expect(link).toHaveAttribute('aria-label', 'View Test with Link')
    })

    it('should not render link when no links', () => {
      // Arrange
      const testScore = createMockTestScore({ links: undefined })

      // Act
      render(<TestScoreCard testScore={testScore} />)

      // Assert
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })

  describe('TestScoreCard_whenDetails_thenRendersList', () => {
    it('should render details list', () => {
      // Arrange
      const testScore = createMockTestScore({
        details: ['Verbal: 170', 'Quant: 160'],
      })

      // Act
      render(<TestScoreCard testScore={testScore} />)

      // Assert
      expect(screen.getByText('Verbal: 170')).toBeInTheDocument()
      expect(screen.getByText('Quant: 160')).toBeInTheDocument()
    })

    it('should not render details when empty', () => {
      // Arrange
      const testScore = createMockTestScore({ details: [] })

      // Act
      const { container } = render(<TestScoreCard testScore={testScore} />)

      // Assert
      expect(container.querySelector('ul')).not.toBeInTheDocument()
    })
  })

  describe('TestScoreCard_whenDateRange_thenFormatsCorrectly', () => {
    it('should display formatted date range', () => {
      // Arrange
      const testScore = createMockTestScore({
        startDate: '2023-03-15',
        endDate: '2023-03-15',
      })

      // Act
      render(<TestScoreCard testScore={testScore} />)

      // Assert
      expect(screen.getByText('Mar 2023 - Mar 2023')).toBeInTheDocument()
    })
  })
})
