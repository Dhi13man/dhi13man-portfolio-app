import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe } from 'vitest-axe'
import ExperiencePage from '../experience/page'

// Mock the data module with comprehensive test data
vi.mock('@/data/experiences', () => ({
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
    {
      name: 'Empty Others',
      about: 'Company with empty others arrays',
      roles: [
        {
          title: 'Developer',
          description: 'Development work',
          startDate: 'Jan 2018',
          endDate: 'Dec 2018',
        },
      ],
      links: {
        others: [],
      },
    },
  ],
}))

// Mock ImageGallery
vi.mock('@/components/ui/image-gallery', () => ({
  ImageGallery: ({ alt }: { alt: string }) => (
    <div data-testid="image-gallery" data-alt={alt} />
  ),
}))

describe('Experience Page', () => {
  describe('ExperiencePage_whenRendered_thenDisplaysPageTitle', () => {
    it('ExperiencePage_whenRendered_thenDisplaysPageTitle', () => {
      // Arrange
      const expectedTitle = 'Experience'

      // Act
      render(<ExperiencePage />)

      // Assert
      expect(
        screen.getByRole('heading', { level: 1, name: expectedTitle }),
      ).toBeInTheDocument()
      expect(
        screen.getByText(/A journey through my professional career/),
      ).toBeInTheDocument()
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
      expect(
        screen.getByText('Leading tech company description'),
      ).toBeInTheDocument()
      expect(
        screen.getByText('Innovative startup description'),
      ).toBeInTheDocument()
      expect(screen.getByText('Independent consulting')).toBeInTheDocument()
    })
  })

  describe('ExperiencePage_whenRolesProvided_thenDisplaysRoleDetails', () => {
    it('ExperiencePage_whenRolesAreProvided_thenDisplaysRoleHeadings', () => {
      // Arrange
      const expectedRoleTitles = [
        'Senior Engineer',
        'Software Engineer',
        'Full Stack Developer',
      ]

      // Act
      render(<ExperiencePage />)

      // Assert
      expectedRoleTitles.forEach((title) => {
        expect(
          screen.getByRole('heading', { level: 3, name: title }),
        ).toBeInTheDocument()
      })
    })

    it('should render role descriptions', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      expect(
        screen.getByText('Leading backend initiatives'),
      ).toBeInTheDocument()
      expect(screen.getByText('Built core features')).toBeInTheDocument()
      expect(
        screen.getByText('Developed full stack solutions'),
      ).toBeInTheDocument()
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
      const primaryLink = screen.getByRole('link', {
        name: 'View Tech Company',
      })
      expect(primaryLink).toHaveAttribute('href', 'https://techcompany.com')
    })

    it('should render other links with correct labels', () => {
      // Arrange & Act
      render(<ExperiencePage />)

      // Assert
      const linkedinLinks = screen.getAllByRole('link').filter((link) => {
        const href = link.getAttribute('href')
        if (!href) return false
        try {
          const url = new URL(href)
          return (
            url.hostname === 'linkedin.com' ||
            url.hostname.endsWith('.linkedin.com')
          )
        } catch {
          return false
        }
      })
      expect(linkedinLinks.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('ExperiencePage_whenMultipleRoles_thenRendersAll', () => {
    it('ExperiencePage_whenCompanyHasMultipleRoles_thenRendersEveryRole', () => {
      // Arrange
      const expectedRoleTitles = ['Senior Engineer', 'Software Engineer']

      // Act
      render(<ExperiencePage />)

      // Assert
      expectedRoleTitles.forEach((title) => {
        expect(
          screen.getByRole('heading', { level: 3, name: title }),
        ).toBeInTheDocument()
      })
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

    it('ExperiencePage_whenRoleHasNoLocation_thenRendersRoleHeading', () => {
      // Arrange
      const expectedRoleTitle = 'Full Stack Developer'

      // Act
      render(<ExperiencePage />)

      // Assert
      expect(
        screen.getByRole('heading', { level: 3, name: expectedRoleTitle }),
      ).toBeInTheDocument()
    })

    it('ExperiencePage_whenRoleHasNoDetails_thenRendersRoleHeading', () => {
      // Arrange
      const expectedRoleTitle = 'Consultant'

      // Act
      render(<ExperiencePage />)

      // Assert
      expect(
        screen.getByRole('heading', { level: 3, name: expectedRoleTitle }),
      ).toBeInTheDocument()
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

  describe('ExperiencePage_whenCheckedForAccessibility_thenHasNoViolations', () => {
    it('ExperiencePage_whenAllLinkAndListVariantsRender_thenPassesAutomatedAccessibilityChecks', async () => {
      // Arrange
      const page = <ExperiencePage />

      // Act
      const { container } = render(page)
      const result = await axe(container)

      // Assert
      expect(result).toHaveNoViolations()
    })
  })
})
