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

// Mock the data modules with no current initiatives
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

vi.mock('@/data/projects', () => ({
  projects: [
    {
      name: 'Past Project Only',
      description: 'A past project',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
    },
  ],
}))

vi.mock('@/data/ventures', () => ({
  ventures: [
    {
      name: 'Past Venture Only',
      about: 'A past venture',
      roles: [{ endDate: '2022-12-31' }],
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

describe('Home Page - No Current Initiatives', () => {
  it('should not render current initiatives section when all projects are past', async () => {
    // Arrange & Act
    await renderHome()

    // Assert
    expect(screen.queryByRole('heading', { level: 2, name: 'Current Initiatives' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'Active Projects' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'Active Ventures' })).not.toBeInTheDocument()
  })

  it('should still render hero and about sections', async () => {
    // Arrange & Act
    await renderHome()

    // Assert
    expect(screen.getByRole('heading', { level: 1, name: 'Dhiman Seal' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeInTheDocument()
  })

  it('should show zero active initiatives in highlights', async () => {
    // Arrange & Act
    await renderHome()

    // Assert
    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByText('Active Initiatives')).toBeInTheDocument()
  })
})
