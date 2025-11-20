import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../page'

// Mock the data modules
jest.mock('@/data/about', () => ({
  aboutData: {
    tagline: 'Test Tagline',
    description: 'Test description paragraph 1.\nTest description paragraph 2.',
  },
}))

jest.mock('@/data/projects', () => ({
  projects: [
    {
      name: 'Current Project',
      description: 'A current project',
      startDate: '2023-01-01',
      endDate: 'Present',
    },
    {
      name: 'Past Project',
      description: 'A past project',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
    },
  ],
}))

jest.mock('@/data/ventures', () => ({
  ventures: [
    {
      name: 'Current Venture',
      about: 'A current venture',
      roles: [{ endDate: 'Present' }],
    },
    {
      name: 'Past Venture',
      about: 'A past venture',
      roles: [{ endDate: '2022-12-31' }],
    },
  ],
}))

// Mock ImageGallery to avoid complex state testing
jest.mock('@/components/ui/image-gallery', () => ({
  ImageGallery: ({ alt }: { alt: string }) => (
    <div data-testid="image-gallery" data-alt={alt} />
  ),
}))

describe('Home Page', () => {
  describe('HomePage_whenRendered_thenDisplaysHeroSection', () => {
    it('should render name and tagline', () => {
      // Arrange & Act
      render(<Home />)

      // Assert
      expect(screen.getByRole('heading', { level: 1, name: 'Dhiman Seal' })).toBeInTheDocument()
      expect(screen.getByText('Test Tagline')).toBeInTheDocument()
    })

    it('should render profile image', () => {
      // Arrange & Act
      render(<Home />)

      // Assert
      const profileImage = screen.getByAltText('Dhiman Seal')
      expect(profileImage).toBeInTheDocument()
      expect(profileImage).toHaveAttribute('src', '/assets/me.webp')
    })
  })

  describe('HomePage_whenRendered_thenDisplaysSocialLinks', () => {
    it('should render social media links', () => {
      // Arrange & Act
      render(<Home />)

      // Assert
      expect(screen.getByRole('link', { name: /github profile/i })).toHaveAttribute(
        'href',
        'https://github.com/Dhi13man'
      )
      expect(screen.getByRole('link', { name: /linkedin profile/i })).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/dhi13man/'
      )
      expect(screen.getByRole('link', { name: /medium profile/i })).toHaveAttribute(
        'href',
        'https://medium.com/@dhi13man'
      )
      expect(screen.getByRole('link', { name: /email/i })).toHaveAttribute(
        'href',
        'mailto:dhiman.seal@hotmail.com'
      )
    })

    it('should have target="_blank" on external links', () => {
      // Arrange & Act
      render(<Home />)

      // Assert
      const githubLink = screen.getByRole('link', { name: /github profile/i })
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('HomePage_whenRendered_thenDisplaysAboutSection', () => {
    it('should render about section title', () => {
      // Arrange & Act
      render(<Home />)

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeInTheDocument()
    })

    it('should render about description paragraphs', () => {
      // Arrange & Act
      render(<Home />)

      // Assert
      expect(screen.getByText('Test description paragraph 1.')).toBeInTheDocument()
      expect(screen.getByText('Test description paragraph 2.')).toBeInTheDocument()
    })
  })

  describe('HomePage_whenCurrentProjects_thenDisplaysCurrentInitiatives', () => {
    it('should render current initiatives section', () => {
      // Arrange & Act
      render(<Home />)

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: 'Current Initiatives' })).toBeInTheDocument()
    })

    it('should render active projects heading', () => {
      // Arrange & Act
      render(<Home />)

      // Assert
      expect(screen.getByRole('heading', { level: 3, name: 'Active Projects' })).toBeInTheDocument()
    })

    it('should render active ventures heading', () => {
      // Arrange & Act
      render(<Home />)

      // Assert
      expect(screen.getByRole('heading', { level: 3, name: 'Active Ventures' })).toBeInTheDocument()
    })

    it('should only render current projects (endDate = Present)', () => {
      // Arrange & Act
      render(<Home />)

      // Assert
      expect(screen.getByText('Current Project')).toBeInTheDocument()
      expect(screen.queryByText('Past Project')).not.toBeInTheDocument()
    })

    it('should only render current ventures (role endDate = Present)', () => {
      // Arrange & Act
      render(<Home />)

      // Assert
      expect(screen.getByText('Current Venture')).toBeInTheDocument()
      expect(screen.queryByText('Past Venture')).not.toBeInTheDocument()
    })
  })
})
