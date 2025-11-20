import React from 'react'
import { render, screen } from '@testing-library/react'
import ExperiencePage from '../experience/page'

// Mock the data module with comprehensive test data
jest.mock('@/data/experiences', () => ({
  experiences: [
    {
      name: 'Tech Company',
      about: 'Leading tech company description',
      roles: [
        {
          title: 'Senior Engineer',
          description: 'Leading backend initiatives',
          startDate: 'Jan 2023',
          endDate: 'Present',
          location: 'San Francisco, CA',
          details: ['Built payment system', 'Led team of 5'],
        },
        {
          title: 'Software Engineer',
          description: 'Built core features',
          startDate: 'Jun 2021',
          endDate: 'Dec 2022',
          location: 'San Francisco, CA',
        },
      ],
      images: {
        primary: '/tech-logo.png',
        others: ['/tech-cert.jpg'],
      },
      links: {
        primary: 'https://techcompany.com',
        others: ['https://linkedin.com/company/tech'],
      },
    },
    {
      name: 'Startup Inc',
      about: 'Innovative startup description',
      roles: [
        {
          title: 'Full Stack Developer',
          description: 'Developed full stack solutions',
          startDate: 'Jan 2020',
          endDate: 'May 2021',
          details: ['Frontend with React', 'Backend with Node.js'],
        },
      ],
      images: {
        primary: '/startup-logo.png',
      },
      links: {
        primary: 'https://startup.com',
      },
    },
    {
      name: 'Freelance',
      about: 'Independent consulting',
      roles: [
        {
          title: 'Consultant',
          description: 'Technical consulting services',
          startDate: 'Jan 2019',
          endDate: 'Dec 2019',
        },
      ],
    },
  ],
}))

// Mock ImageGallery
jest.mock('@/components/ui/image-gallery', () => ({
  ImageGallery: ({ alt }: { alt: string }) => (
    <div data-testid="image-gallery" data-alt={alt} />
  ),
}))

describe('Experience Page', () => {
  describe('ExperiencePage_whenRendered_thenDisplaysPageTitle', () => {
    it('should render page title and description', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: 'Experience' })).toBeInTheDocument()
      expect(screen.getByText(/A journey through my professional career/)).toBeInTheDocument()
    })
  })

  describe('ExperiencePage_whenRendered_thenDisplaysAllCompanies', () => {
    it('should render all company names', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      expect(screen.getByText('Tech Company')).toBeInTheDocument()
      expect(screen.getByText('Startup Inc')).toBeInTheDocument()
      expect(screen.getByText('Freelance')).toBeInTheDocument()
    })

    it('should render company about descriptions', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      expect(screen.getByText('Leading tech company description')).toBeInTheDocument()
      expect(screen.getByText('Innovative startup description')).toBeInTheDocument()
      expect(screen.getByText('Independent consulting')).toBeInTheDocument()
    })
  })

  describe('ExperiencePage_whenRolesProvided_thenDisplaysRoleDetails', () => {
    it('should render role titles', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: 'Senior Engineer' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 4, name: 'Software Engineer' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 4, name: 'Full Stack Developer' })).toBeInTheDocument()
    })

    it('should render role descriptions', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      expect(screen.getByText('Leading backend initiatives')).toBeInTheDocument()
      expect(screen.getByText('Built core features')).toBeInTheDocument()
      expect(screen.getByText('Developed full stack solutions')).toBeInTheDocument()
    })

    it('should render role details list when provided', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      expect(screen.getByText('Built payment system')).toBeInTheDocument()
      expect(screen.getByText('Led team of 5')).toBeInTheDocument()
      expect(screen.getByText('Frontend with React')).toBeInTheDocument()
    })

    it('should render role location when provided', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      const locations = screen.getAllByText('San Francisco, CA')
      expect(locations.length).toBe(2)
    })
  })

  describe('ExperiencePage_whenImagesProvided_thenRendersImageGallery', () => {
    it('should render image gallery for companies with images', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      const galleries = screen.getAllByTestId('image-gallery')
      expect(galleries.length).toBeGreaterThanOrEqual(2)
      expect(galleries[0]).toHaveAttribute('data-alt', 'Tech Company')
    })
  })

  describe('ExperiencePage_whenLinksProvided_thenRendersLinks', () => {
    it('should render primary link button', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      const links = screen.getAllByRole('link')
      const primaryLinks = links.filter(link =>
        link.getAttribute('href') === 'https://techcompany.com'
      )
      expect(primaryLinks.length).toBeGreaterThanOrEqual(1)
    })

    it('should render other links with correct labels', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      const linkedinLinks = screen.getAllByRole('link').filter(
        link => link.getAttribute('href')?.includes('linkedin.com')
      )
      expect(linkedinLinks.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('ExperiencePage_whenMultipleRoles_thenRendersAll', () => {
    it('should render multiple roles under same company', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert - Tech Company has 2 roles
      expect(screen.getByRole('heading', { level: 4, name: 'Senior Engineer' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 4, name: 'Software Engineer' })).toBeInTheDocument()
    })
  })

  describe('ExperiencePage_whenNoOptionalData_thenRendersGracefully', () => {
    it('should render company without images', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      expect(screen.getByText('Freelance')).toBeInTheDocument()
    })

    it('should render company without other links', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      expect(screen.getByText('Startup Inc')).toBeInTheDocument()
    })

    it('should render role without location', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: 'Full Stack Developer' })).toBeInTheDocument()
    })

    it('should render role without details', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: 'Consultant' })).toBeInTheDocument()
    })
  })

  describe('ExperiencePage_whenRendered_thenUsesTimeline', () => {
    it('should use timeline structure', () => {
      // Arrange & Act
      const { container } = render(<ExperiencePage />)

      // Assert
      expect(container.querySelector('section')).toBeInTheDocument()
    })
  })
})
