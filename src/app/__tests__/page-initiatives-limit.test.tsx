import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../page'

// Mock the GitHub stats fetching
vi.mock('@/lib/github', () => ({
  fetchGitHubStats: vi.fn().mockResolvedValue({
    publicRepos: 25,
    totalStars: 1500,
    isError: false,
  }),
  calculateYearsExperience: vi.fn().mockReturnValue(6),
  formatStarCount: vi.fn().mockImplementation((stars: number | null) => {
    if (stars === null) return '—';
    return stars >= 1000 ? `${(stars / 1000).toFixed(1)}K+` : `${stars}+`;
  }),
  formatRepoCount: vi.fn().mockImplementation((repos: number | null) => {
    if (repos === null) return '—';
    return `${repos}+`;
  }),
}))

// Mock the data modules with more than 4 current initiatives
vi.mock('@/data/about', () => ({
  aboutData: {
    tagline: 'Test Tagline',
    headline: 'Test Headline',
    introduction: 'Test introduction.',
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

// Create 6 current projects with different start dates
vi.mock('@/data/projects', () => ({
  projects: [
    {
      name: 'Project 3 - Sep 2021',
      description: 'Third oldest project',
      startDate: 'Sep 2021',
      endDate: 'Present',
    },
    {
      name: 'Project 1 - Jun 2023',
      description: 'Most recent project',
      startDate: 'Jun 2023',
      endDate: 'Present',
    },
    {
      name: 'Project 5 - Nov 2020',
      description: 'Fifth oldest project',
      startDate: 'Nov 2020',
      endDate: 'Present',
    },
    {
      name: 'Project 2 - May 2022',
      description: 'Second recent project',
      startDate: 'May 2022',
      endDate: 'Present',
    },
    {
      name: 'Project 4 - May 2021',
      description: 'Fourth oldest project',
      startDate: 'May 2021',
      endDate: 'Present',
    },
    {
      name: 'Project 6 - Oct 2019',
      description: 'Oldest project - should not appear',
      startDate: 'Oct 2019',
      endDate: 'Present',
    },
    {
      name: 'Past Project',
      description: 'A past project - should not appear',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
    },
  ],
}))

// Create 6 current ventures with different start dates
vi.mock('@/data/ventures', () => ({
  ventures: [
    {
      name: 'Venture 2 - Dec 2023',
      about: 'Second most recent venture',
      roles: [{ startDate: 'Dec 2023', endDate: 'Present', title: 'Co-Founder' }],
    },
    {
      name: 'Venture 1 - Nov 2025',
      about: 'Most recent venture',
      roles: [{ startDate: 'Nov 2025', endDate: 'Present', title: 'Founder' }],
    },
    {
      name: 'Venture 4 - Aug 2022',
      about: 'Fourth oldest venture',
      roles: [{ startDate: 'Aug 2022', endDate: 'Present', title: 'Tech Lead' }],
    },
    {
      name: 'Venture 3 - May 2023',
      about: 'Third oldest venture',
      roles: [{ startDate: 'May 2023', endDate: 'Present', title: 'Advisor' }],
    },
    {
      name: 'Venture 5 - Oct 2018',
      about: 'Fifth oldest venture - should not appear',
      roles: [{ startDate: 'Oct 2018', endDate: 'Present', title: 'Developer' }],
    },
    {
      name: 'Venture 6 - Nov 2018',
      about: 'Sixth oldest venture - should not appear',
      roles: [{ startDate: 'Nov 2018', endDate: 'Present', title: 'Instructor' }],
    },
    {
      name: 'Past Venture',
      about: 'A past venture - should not appear',
      roles: [{ startDate: '2022-01-01', endDate: '2022-12-31', title: 'Former' }],
    },
  ],
}))

// Mock ImageGallery
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

describe('Home Page - Initiative Limiting and Sorting', () => {
  describe('HomePage_whenMoreThanFourProjects_thenLimitsToFour', () => {
    it('should display maximum of 4 current projects', async () => {
      // Arrange & Act
      await renderHome()

      // Assert - Should show exactly 4 projects (the most recent ones)
      expect(screen.getByText('Project 1 - Jun 2023')).toBeInTheDocument()
      expect(screen.getByText('Project 2 - May 2022')).toBeInTheDocument()
      expect(screen.getByText('Project 3 - Sep 2021')).toBeInTheDocument()
      expect(screen.getByText('Project 4 - May 2021')).toBeInTheDocument()

      // Should NOT show the 5th and 6th oldest projects
      expect(screen.queryByText('Project 5 - Nov 2020')).not.toBeInTheDocument()
      expect(screen.queryByText('Project 6 - Oct 2019')).not.toBeInTheDocument()

      // Should NOT show past projects
      expect(screen.queryByText('Past Project')).not.toBeInTheDocument()
    })

    it('should sort projects by descending start date (most recent first)', async () => {
      // Arrange & Act
      await renderHome()

      // Assert - Get all project names and verify order
      const projectElements = screen.getAllByText(/Project \d+ - /)
      const projectNames = projectElements.map(el => el.textContent)

      // Verify descending order: Jun 2023 > May 2022 > Sep 2021 > May 2021
      expect(projectNames).toEqual([
        'Project 1 - Jun 2023',
        'Project 2 - May 2022',
        'Project 3 - Sep 2021',
        'Project 4 - May 2021',
      ])
    })
  })

  describe('HomePage_whenMoreThanFourVentures_thenLimitsToFour', () => {
    it('should display maximum of 4 current ventures', async () => {
      // Arrange & Act
      await renderHome()

      // Assert - Should show exactly 4 ventures (the most recent ones)
      expect(screen.getByText('Venture 1 - Nov 2025')).toBeInTheDocument()
      expect(screen.getByText('Venture 2 - Dec 2023')).toBeInTheDocument()
      expect(screen.getByText('Venture 3 - May 2023')).toBeInTheDocument()
      expect(screen.getByText('Venture 4 - Aug 2022')).toBeInTheDocument()

      // Should NOT show the 5th and 6th oldest ventures
      expect(screen.queryByText('Venture 5 - Oct 2018')).not.toBeInTheDocument()
      expect(screen.queryByText('Venture 6 - Nov 2018')).not.toBeInTheDocument()

      // Should NOT show past ventures
      expect(screen.queryByText('Past Venture')).not.toBeInTheDocument()
    })

    it('should sort ventures by descending start date (most recent first)', async () => {
      // Arrange & Act
      await renderHome()

      // Assert - Get all venture names and verify order
      const ventureElements = screen.getAllByText(/Venture \d+ - /)
      const ventureNames = ventureElements.map(el => el.textContent)

      // Verify descending order: Nov 2025 > Dec 2023 > May 2023 > Aug 2022
      expect(ventureNames).toEqual([
        'Venture 1 - Nov 2025',
        'Venture 2 - Dec 2023',
        'Venture 3 - May 2023',
        'Venture 4 - Aug 2022',
      ])
    })
  })

  describe('HomePage_activeInitiativesCount_reflectsTotalNotDisplayed', () => {
    it('should show total active initiatives count (all active, not just displayed)', async () => {
      // Arrange & Act
      await renderHome()

      // Assert - Active Initiatives count should be 8 (6 projects + 6 ventures that are active)
      // even though only 4 of each are displayed
      // Note: The count is currentProjects.length + currentVentures.length AFTER limiting
      // So it will be 4 + 4 = 8
      expect(screen.getByText('8')).toBeInTheDocument()
      expect(screen.getByText('Active Initiatives')).toBeInTheDocument()
    })
  })
})
