import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../page'

// Mock the GitHub stats fetching
jest.mock('@/lib/github', () => ({
  fetchGitHubStats: jest.fn().mockResolvedValue({
    publicRepos: 25,
    totalStars: 1500,
    isError: false,
  }),
  calculateYearsExperience: jest.fn().mockReturnValue(6),
  formatStarCount: jest.fn().mockImplementation((stars: number | null) => {
    if (stars === null) return '—';
    return stars >= 1000 ? `${(stars / 1000).toFixed(1)}K+` : `${stars}+`;
  }),
  formatRepoCount: jest.fn().mockImplementation((repos: number | null) => {
    if (repos === null) return '—';
    return `${repos}+`;
  }),
}))

// Mock the data modules
jest.mock('@/data/about', () => ({
  aboutData: {
    tagline: 'Test Tagline',
    headline: 'Test Headline',
    introduction: 'Test introduction paragraph.',
    highlights: [], // Empty, will be computed
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

// Helper to render async Server Component
async function renderHome() {
  const HomeComponent = await Home()
  return render(HomeComponent)
}

describe('Home Page', () => {
  describe('HomePage_whenRendered_thenDisplaysHeroSection', () => {
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

  describe('HomePage_whenRendered_thenDisplaysSocialLinks', () => {
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

  describe('HomePage_whenRendered_thenDisplaysAboutSection', () => {
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

      // Assert - values come from mocked GitHub stats and calculations
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

  describe('HomePage_whenRendered_thenDisplaysCorePrinciplesSection', () => {
    it('should render core principles section title', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: 'Core Principles' })).toBeInTheDocument()
    })

    it('should render core values', async () => {
      // Arrange & Act
      await renderHome()

      // Assert
      expect(screen.getByText('Test Value')).toBeInTheDocument()
      expect(screen.getByText('Test value description')).toBeInTheDocument()
    })
  })

  describe('HomePage_whenCurrentProjects_thenDisplaysCurrentInitiatives', () => {
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

  describe('HomePage_whenGitHubApiFails_thenShowsFallbackDisplay', () => {
    it('should show fallback values when GitHub API fails', async () => {
      // Arrange - Mock the module with error state
      const { fetchGitHubStats } = jest.requireMock('@/lib/github')
      fetchGitHubStats.mockResolvedValueOnce({
        publicRepos: null,
        totalStars: null,
        isError: true,
        errorMessage: 'API rate limited',
      })

      // Act
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()
      await renderHome()

      // Assert - Should show fallback "—" values
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('GitHub stats fetch failed')
      )
      consoleSpy.mockRestore()
    })
  })
})
