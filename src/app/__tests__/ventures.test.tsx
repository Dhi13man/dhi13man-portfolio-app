import React from 'react'
import { render, screen } from '@testing-library/react'
import VenturesPage from '../ventures/page'

// Mock the data module with comprehensive test data
vi.mock('@/data/ventures', () => ({
  ventures: [
    {
      name: 'Tech Startup',
      about: 'Innovative tech startup description',
      roles: [
        {
          title: 'CTO',
          description: 'Leading technical vision',
          startDate: 'Jan 2023',
          endDate: 'Present',
          location: 'Remote',
          details: ['Built architecture', 'Hired team'],
        },
        {
          title: 'Co-Founder',
          description: 'Co-founded the company',
          startDate: 'Jun 2022',
          endDate: 'Dec 2022',
          location: 'San Francisco',
        },
      ],
      images: {
        primary: '/startup-logo.png',
        others: ['/startup-product.png'],
      },
      links: {
        primary: 'https://techstartup.com',
        others: ['https://linkedin.com/company/techstartup'],
      },
    },
    {
      name: 'Side Project',
      about: 'Personal side project',
      roles: [
        {
          title: 'Creator',
          description: 'Built from scratch',
          startDate: 'Mar 2021',
          endDate: 'Sep 2021',
          details: ['Developed MVP', 'Launched to users'],
        },
      ],
      images: {
        primary: '/project-logo.png',
      },
      links: {
        primary: 'https://sideproject.com',
      },
    },
    {
      name: 'Open Source',
      about: 'Open source contributions',
      roles: [
        {
          title: 'Maintainer',
          description: 'Maintaining OSS project',
          startDate: 'Jan 2020',
          endDate: 'Dec 2020',
        },
      ],
    },
    {
      name: 'Empty Others Venture',
      about: 'Venture with empty others arrays',
      roles: [
        {
          title: 'Advisor',
          description: 'Advisory role',
          startDate: 'Jan 2019',
          endDate: 'Jun 2019',
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

describe('Ventures Page', () => {
  describe('VenturesPage_whenRendered_thenDisplaysPageTitle', () => {
    it('should render page title and description', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: 'Ventures' })).toBeInTheDocument()
      expect(screen.getByText(/My entrepreneurial journey through founding/)).toBeInTheDocument()
    })
  })

  describe('VenturesPage_whenRendered_thenDisplaysAllVentures', () => {
    it('should render all venture names', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      expect(screen.getByText('Tech Startup')).toBeInTheDocument()
      expect(screen.getByText('Side Project')).toBeInTheDocument()
      expect(screen.getByText('Open Source')).toBeInTheDocument()
    })

    it('should render venture about descriptions', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      expect(screen.getByText('Innovative tech startup description')).toBeInTheDocument()
      expect(screen.getByText('Personal side project')).toBeInTheDocument()
      expect(screen.getByText('Open source contributions')).toBeInTheDocument()
    })
  })

  describe('VenturesPage_whenRolesProvided_thenDisplaysRoleDetails', () => {
    it('should render role titles', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: 'CTO' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 4, name: 'Co-Founder' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 4, name: 'Creator' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 4, name: 'Maintainer' })).toBeInTheDocument()
    })

    it('should render role descriptions', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      expect(screen.getByText('Leading technical vision')).toBeInTheDocument()
      expect(screen.getByText('Co-founded the company')).toBeInTheDocument()
      expect(screen.getByText('Built from scratch')).toBeInTheDocument()
    })

    it('should render role details list when provided', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      expect(screen.getByText('Built architecture')).toBeInTheDocument()
      expect(screen.getByText('Hired team')).toBeInTheDocument()
      expect(screen.getByText('Developed MVP')).toBeInTheDocument()
    })

    it('should render role location when provided', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      expect(screen.getByText('Remote')).toBeInTheDocument()
      expect(screen.getByText('San Francisco')).toBeInTheDocument()
    })
  })

  describe('VenturesPage_whenImagesProvided_thenRendersImageGallery', () => {
    it('should render image gallery for ventures with images', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      const galleries = screen.getAllByTestId('image-gallery')
      expect(galleries.length).toBeGreaterThanOrEqual(2)
    })

    it('should show venture header only on first role', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert - Tech Startup should appear only once despite having 2 roles
      const ventureNames = screen.getAllByText('Tech Startup')
      expect(ventureNames.length).toBe(1)
    })
  })

  describe('VenturesPage_whenLinksProvided_thenRendersLinks', () => {
    it('should render primary link button', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      const links = screen.getAllByRole('link')
      const primaryLinks = links.filter(link =>
        link.getAttribute('href') === 'https://techstartup.com'
      )
      expect(primaryLinks.length).toBeGreaterThanOrEqual(1)
    })

    it('should render other links with correct labels', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      const linkedinLinks = screen.getAllByRole('link').filter(link => {
        const href = link.getAttribute('href')
        if (!href) return false
        try {
          const url = new URL(href)
          return url.hostname === 'linkedin.com' || url.hostname.endsWith('.linkedin.com')
        } catch {
          return false
        }
      })
      expect(linkedinLinks.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('VenturesPage_whenMultipleRoles_thenRendersAll', () => {
    it('should render multiple roles from same venture', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert - Tech Startup has 2 roles
      expect(screen.getByRole('heading', { level: 4, name: 'CTO' })).toBeInTheDocument()
      expect(screen.getByRole('heading', { level: 4, name: 'Co-Founder' })).toBeInTheDocument()
    })

    it('should flatten all roles across ventures', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert - Total 4 roles across 3 ventures
      const roleTitles = ['CTO', 'Co-Founder', 'Creator', 'Maintainer']
      roleTitles.forEach(title => {
        expect(screen.getByRole('heading', { level: 4, name: title })).toBeInTheDocument()
      })
    })
  })

  describe('VenturesPage_whenNoOptionalData_thenRendersGracefully', () => {
    it('should render venture without images', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      expect(screen.getByText('Open Source')).toBeInTheDocument()
    })

    it('should render venture without other links', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      expect(screen.getByText('Side Project')).toBeInTheDocument()
    })

    it('should render role without location', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: 'Creator' })).toBeInTheDocument()
    })

    it('should render role without details', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: 'Maintainer' })).toBeInTheDocument()
    })
  })

  describe('VenturesPage_whenRendered_thenUsesTimeline', () => {
    it('should use timeline structure', () => {
      // Arrange & Act
      const { container } = render(<VenturesPage />)

      // Assert
      expect(container.querySelector('section')).toBeInTheDocument()
    })
  })

  describe('VenturesPage_whenMultipleVentures_thenVentureHeaderShowsOnce', () => {
    it('should show venture header only for first role of each venture', () => {
      // Arrange & Act
      render(<VenturesPage />)

      // Assert - Each venture name should appear exactly once
      expect(screen.getAllByText('Tech Startup').length).toBe(1)
      expect(screen.getAllByText('Side Project').length).toBe(1)
      expect(screen.getAllByText('Open Source').length).toBe(1)
    })
  })
})
