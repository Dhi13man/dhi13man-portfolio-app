import React from 'react'
import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import Home from '../page'
import { fetchGitHubStats } from '@/lib/github'
import { isDatePresent, parseStartDate } from '@/lib/date'
import { findEarliestWorkExperience } from '@/lib/experience'
import type { Project } from '@/types/project'
import type { Venture } from '@/types/venture'
import type { Experience } from '@/types/experience'

// =============================================================================
// UNIT TESTS - Business Logic
// =============================================================================

describe('Home Page - Unit Tests', () => {
  describe('Earliest Work Experience Calculation', () => {
    it('should find earliest start date from multiple experiences with multiple roles', () => {
      // Arrange
      const experiences: Experience[] = [
        {
          name: 'Company A',
          about: 'Test',
          roles: [
            { title: 'Role 1', description: '', startDate: 'Jun 2023', endDate: 'Present', location: '' },
            { title: 'Role 2', description: '', startDate: 'Jan 2022', endDate: 'May 2023', location: '' },
          ],
        },
        {
          name: 'Company B',
          about: 'Test',
          roles: [
            { title: 'Role 3', description: '', startDate: 'May 2021', endDate: 'Dec 2021', location: '' },
          ],
        },
        {
          name: 'Company C',
          about: 'Test',
          roles: [
            { title: 'Role 4', description: '', startDate: 'Oct 2020', endDate: 'Apr 2021', location: '' },
          ],
        },
      ]

      // Act
      const earliestWorkExperience = findEarliestWorkExperience(experiences)

      // Assert
      expect(earliestWorkExperience.getFullYear()).toBe(2020)
      expect(earliestWorkExperience.getMonth()).toBe(9) // October (0-indexed)
    })

    it('should handle empty experiences array by returning current date', () => {
      // Arrange
      const experiences: Experience[] = []

      // Act
      const earliestWorkExperience = findEarliestWorkExperience(experiences)

      // Assert - should return a date close to now (within last second)
      const now = new Date()
      const diffMs = Math.abs(now.getTime() - earliestWorkExperience.getTime())
      expect(diffMs).toBeLessThan(1000) // Within 1 second
    })

    it('should skip experiences with empty roles arrays', () => {
      // Arrange
      const experiences: Experience[] = [
        {
          name: 'Company A',
          about: 'Test',
          roles: [], // Empty roles array
        },
        {
          name: 'Company B',
          about: 'Test',
          roles: [
            { title: 'Role 1', description: '', startDate: 'Jan 2021', endDate: 'Present', location: '' },
          ],
        },
      ]

      // Act
      const earliestWorkExperience = findEarliestWorkExperience(experiences)

      // Assert - should return Jan 2021, not epoch (1970)
      expect(earliestWorkExperience.getFullYear()).toBe(2021)
      expect(earliestWorkExperience.getMonth()).toBe(0) // January (0-indexed)
    })

    it('should handle mix of experiences with and without roles', () => {
      // Arrange
      const experiences: Experience[] = [
        {
          name: 'Company A',
          about: 'Test',
          roles: [], // Empty
        },
        {
          name: 'Company B',
          about: 'Test',
          roles: [
            { title: 'Role 1', description: '', startDate: 'Jun 2022', endDate: 'Present', location: '' },
          ],
        },
        {
          name: 'Company C',
          about: 'Test',
          roles: [], // Empty
        },
        {
          name: 'Company D',
          about: 'Test',
          roles: [
            { title: 'Role 2', description: '', startDate: 'Mar 2021', endDate: 'May 2022', location: '' },
          ],
        },
      ]

      // Act
      const earliestWorkExperience = findEarliestWorkExperience(experiences)

      // Assert - should find Mar 2021
      expect(earliestWorkExperience.getFullYear()).toBe(2021)
      expect(earliestWorkExperience.getMonth()).toBe(2) // March (0-indexed)
    })

    it('should correctly identify earliest among roles in same experience', () => {
      // Arrange
      const experiences: Experience[] = [
        {
          name: 'Company A',
          about: 'Test',
          roles: [
            { title: 'Senior', description: '', startDate: 'Jun 2023', endDate: 'Present', location: '' },
            { title: 'Mid', description: '', startDate: 'Jan 2022', endDate: 'May 2023', location: '' },
            { title: 'Junior', description: '', startDate: 'Apr 2021', endDate: 'Dec 2021', location: '' },
          ],
        },
      ]

      // Act
      const earliestWorkExperience = findEarliestWorkExperience(experiences)

      // Assert - should find Apr 2021 (Junior role)
      expect(earliestWorkExperience.getFullYear()).toBe(2021)
      expect(earliestWorkExperience.getMonth()).toBe(3) // April (0-indexed)
    })
  })

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
      startDate: 'Jan 2023',
      endDate: 'Present',
    },
    {
      name: 'Newer Current Project',
      description: 'A newer current project',
      startDate: 'Jun 2024',
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
      roles: [{ startDate: 'Jan 2023', endDate: 'Present', title: 'Founder', description: 'Test' }],
    },
    {
      name: 'Newer Current Venture',
      about: 'A newer current venture',
      roles: [{ startDate: 'Jun 2024', endDate: 'Present', title: 'CEO', description: 'Test' }],
    },
    {
      name: 'Past Venture',
      about: 'A past venture',
      roles: [{ startDate: '2022-01-01', endDate: '2022-12-31', title: 'Former', description: 'Test' }],
    },
  ],
}))

vi.mock('@/data/experiences', () => ({
  experiences: [
    {
      name: 'Company A',
      about: 'Test company A',
      roles: [
        { startDate: 'Jul 2023', endDate: 'Present', title: 'Senior Engineer', description: 'Test', location: 'Remote' },
        { startDate: 'Jul 2022', endDate: 'Jun 2023', title: 'Engineer', description: 'Test', location: 'Remote' },
      ],
    },
    {
      name: 'Company B',
      about: 'Test company B',
      roles: [
        { startDate: 'Jan 2021', endDate: 'Jun 2022', title: 'Freelancer', description: 'Test', location: 'Remote' },
      ],
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
      expect(screen.getByText('4')).toBeInTheDocument() // 2 current projects + 2 current ventures
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

    it('should log warning in development mode when GitHub API fails', async () => {
      // Arrange
      vi.stubEnv('NODE_ENV', 'development')
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      vi.mocked(fetchGitHubStats).mockResolvedValueOnce({
        publicRepos: null,
        totalStars: null,
        isError: true,
        errorMessage: 'Test error message',
      })

      // Act
      await renderHome()

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        'GitHub stats fetch failed: Test error message. Using fallback display.'
      )

      // Cleanup
      consoleSpy.mockRestore()
      vi.unstubAllEnvs()
    })

    it('should not log warning in production mode when GitHub API fails', async () => {
      // Arrange
      vi.stubEnv('NODE_ENV', 'production')
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      vi.mocked(fetchGitHubStats).mockResolvedValueOnce({
        publicRepos: null,
        totalStars: null,
        isError: true,
        errorMessage: 'Test error message',
      })

      // Act
      await renderHome()

      // Assert
      expect(consoleSpy).not.toHaveBeenCalled()

      // Cleanup
      consoleSpy.mockRestore()
      vi.unstubAllEnvs()
    })
  })
})
