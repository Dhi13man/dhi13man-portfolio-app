import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import Home from '../page'
import { fetchGitHubStats } from '@/lib/github'
import { isDatePresent, parseStartDate } from '@/lib/date'
import type { Project } from '@/types/project'
import type { Venture } from '@/types/venture'

// =============================================================================
// UNIT TESTS - Business Logic
// =============================================================================

describe('Home Page - Unit Tests', () => {
  describe('Initiative Filtering Logic', () => {
    it('should filter projects with endDate = Present', () => {
      // Arrange
      const projects: Project[] = [
        { name: 'Current', description: '', startDate: '2023-01-01', endDate: 'Present' },
        { name: 'Past', description: '', startDate: '2022-01-01', endDate: '2022-12-31' },
      ]

      // Act
      const currentProjects = projects.filter((p) => isDatePresent(p.endDate))

      // Assert
      expect(currentProjects).toHaveLength(1)
      expect(currentProjects[0].name).toBe('Current')
    })

    it('should filter ventures with active roles', () => {
      // Arrange
      const ventures: Venture[] = [
        { name: 'Active', about: '', roles: [{ title: 'Founder', description: '', startDate: '2023-01-01', endDate: 'Present' }] },
        { name: 'Inactive', about: '', roles: [{ title: 'Former', description: '', startDate: '2022-01-01', endDate: '2022-12-31' }] },
      ]

      // Act
      const currentVentures = ventures.filter((v) =>
        Array.isArray(v.roles) && v.roles.some((r) => isDatePresent(r?.endDate))
      )

      // Assert
      expect(currentVentures).toHaveLength(1)
      expect(currentVentures[0].name).toBe('Active')
    })
  })

  describe('Initiative Sorting Logic', () => {
    it('should sort projects by descending start date', () => {
      // Arrange
      const projects: Project[] = [
        { name: 'Old', description: '', startDate: 'Jan 2020', endDate: 'Present' },
        { name: 'New', description: '', startDate: 'Jun 2023', endDate: 'Present' },
        { name: 'Mid', description: '', startDate: 'May 2022', endDate: 'Present' },
      ]

      // Act
      const sorted = projects.sort((a, b) =>
        parseStartDate(b.startDate).getTime() - parseStartDate(a.startDate).getTime()
      )

      // Assert
      expect(sorted.map(p => p.name)).toEqual(['New', 'Mid', 'Old'])
    })

    it('should sort ventures by active role start date descending', () => {
      // Arrange
      const ventures: Venture[] = [
        { name: 'Old', about: '', roles: [{ title: 'A', description: '', startDate: 'Oct 2018', endDate: 'Present' }] },
        { name: 'New', about: '', roles: [{ title: 'B', description: '', startDate: 'Nov 2025', endDate: 'Present' }] },
        { name: 'Mid', about: '', roles: [{ title: 'C', description: '', startDate: 'Dec 2023', endDate: 'Present' }] },
      ]

      // Act
      const sorted = ventures.sort((a, b) => {
        const getActiveRoleStartDate = (venture: Venture) => {
          const activeRole = venture.roles.find((r) => isDatePresent(r?.endDate))
          return activeRole ? parseStartDate(activeRole.startDate) : new Date(0)
        }
        return getActiveRoleStartDate(b).getTime() - getActiveRoleStartDate(a).getTime()
      })

      // Assert
      expect(sorted.map(v => v.name)).toEqual(['New', 'Mid', 'Old'])
    })
  })

  describe('Initiative Limiting Logic', () => {
    it('should limit to max 4 items', () => {
      // Arrange
      const items = [1, 2, 3, 4, 5, 6]
      const MAX_INITIATIVES = 4

      // Act
      const limited = items.slice(0, MAX_INITIATIVES)

      // Assert
      expect(limited).toHaveLength(4)
      expect(limited).toEqual([1, 2, 3, 4])
    })
  })
})

// =============================================================================
// COMPONENT TESTS - Rendering
// =============================================================================

// Mock the GitHub stats fetching
vi.mock('@/lib/github', () => ({
  fetchGitHubStats: vi.fn().mockResolvedValue({
    publicRepos: 25,
    totalStars: 1500,
    isError: false,
  }),
  calculateYearsExperience: vi.fn().mockReturnValue(6),
  formatStarCount: vi.fn().mockImplementation((stars: number | null) => {
    if (stars === null) return '—'
    return stars >= 1000 ? `${(stars / 1000).toFixed(1)}K+` : `${stars}+`
  }),
  formatRepoCount: vi.fn().mockImplementation((repos: number | null) => {
    if (repos === null) return '—'
    return `${repos}+`
  }),
}))

// Mock the data modules
vi.mock('@/data/about', () => ({
  aboutData: {
    tagline: 'Test Tagline',
    headline: 'Test Headline',
    introduction: 'Test introduction paragraph.',
    highlights: [],
    expertise: [
      {
        area: 'Backend & Systems',
        skills: ['Go', 'Python'],
      },
    ],
    values: [
      {
        number: 1,
        title: 'Test Value',
        description: 'Test value description',
        iconName: 'layers',
      },
    ],
  },
}))

vi.mock('@/data/projects', () => ({
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

vi.mock('@/data/ventures', () => ({
  ventures: [
    {
      name: 'Current Venture',
      about: 'A current venture',
      roles: [{ startDate: '2023-01-01', endDate: 'Present', title: 'Founder' }],
    },
    {
      name: 'Past Venture',
      about: 'A past venture',
      roles: [{ startDate: '2022-01-01', endDate: '2022-12-31', title: 'Former' }],
    },
  ],
}))

// Mock ImageGallery to avoid complex state testing
vi.mock('@/components/ui/image-gallery', () => ({
  ImageGallery: ({ alt }: { alt: string }) => (
    <div data-testid="image-gallery" data-alt={alt} />
  ),
}))

// Helper to render async Server Component
async function renderHome() {
  const HomeComponent = await Home()
  return render(HomeComponent)
}

describe('Home Page - Component Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Hero Section', () => {
    it('should render name and tagline', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByRole('heading', { level: 1, name: 'Dhiman Seal' })).toBeInTheDocument()
      expect(screen.getByText('Test Tagline')).toBeInTheDocument()
    })

    it('should render profile image', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      const profileImage = screen.getByAltText('Dhiman Seal')
      expect(profileImage).toBeInTheDocument()
      expect(profileImage).toHaveAttribute('src', '/assets/me.webp')
    })
  })

  describe('Social Links', () => {
    it('should render social media links', async () => {
      // Arrange & Act
      await renderHome()

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

    it('should have target="_blank" on external links', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      const githubLink = screen.getByRole('link', { name: /github profile/i })
      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('About Section', () => {
    it('should render about section title', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeInTheDocument()
    })

    it('should render about headline and introduction', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByText('Test Headline')).toBeInTheDocument()
      expect(screen.getByText('Test introduction paragraph.')).toBeInTheDocument()
    })

    it('should render highlights/stats from GitHub data', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByText('6+')).toBeInTheDocument()
      expect(screen.getByText('Years Experience')).toBeInTheDocument()
      expect(screen.getByText('25+')).toBeInTheDocument()
      expect(screen.getByText('Open Source Packages')).toBeInTheDocument()
      expect(screen.getByText('1.5K+')).toBeInTheDocument()
      expect(screen.getByText('GitHub Stars')).toBeInTheDocument()
      expect(screen.getByText('2')).toBeInTheDocument() // 1 current project + 1 current venture
      expect(screen.getByText('Active Initiatives')).toBeInTheDocument()
    })

    it('should render expertise areas and skills', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByText('Backend & Systems')).toBeInTheDocument()
      expect(screen.getByText('Go')).toBeInTheDocument()
      expect(screen.getByText('Python')).toBeInTheDocument()
    })
  })

  describe('Core Principles', () => {
    it('should render core principles section title', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: 'Core Principles' })).toBeInTheDocument()
    })

    it('should render core values', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByText('Test Value')).toBeInTheDocument()
      expect(screen.getByText('Test value description')).toBeInTheDocument()
    })
  })

  describe('Current Initiatives', () => {
    it('should render current initiatives section', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: 'Current Initiatives' })).toBeInTheDocument()
    })

    it('should render active projects heading', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByRole('heading', { level: 3, name: 'Active Projects' })).toBeInTheDocument()
    })

    it('should render active ventures heading', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByRole('heading', { level: 3, name: 'Active Ventures' })).toBeInTheDocument()
    })

    it('should only render current projects (endDate = Present)', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByText('Current Project')).toBeInTheDocument()
      expect(screen.queryByText('Past Project')).not.toBeInTheDocument()
    })

    it('should only render current ventures (role endDate = Present)', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByText('Current Venture')).toBeInTheDocument()
      expect(screen.queryByText('Past Venture')).not.toBeInTheDocument()
    })
  })

  describe('GitHub API Fallback', () => {
    it('should show fallback values when GitHub API fails', async () => {
      // Arrange
      vi.mocked(fetchGitHubStats).mockResolvedValueOnce({
        publicRepos: null,
        totalStars: null,
        isError: true,
        errorMessage: 'API rate limited',
      })

      // Act
      await renderHome()

      // Assert
      expect(screen.getAllByText('—').length).toBeGreaterThan(0)
    })
  })
})
