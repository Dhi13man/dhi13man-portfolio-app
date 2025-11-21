import React from 'react'
import { render, screen } from '@testing-library/react'
import ProjectsPage from '../projects/page'

// Mock the data module
vi.mock('@/data/projects', () => ({
  projects: [
    {
      name: 'Project One',
      description: 'First project description',
      startDate: '2023-01-01',
      endDate: '2023-06-30',
    },
    {
      name: 'Project Two',
      description: 'Second project description',
      startDate: '2022-01-01',
      endDate: 'Present',
    },
    {
      name: 'Project Three',
      description: 'Third project description',
      startDate: '2021-01-01',
      endDate: '2021-12-31',
    },
  ],
}))

// Mock ImageGallery to avoid complex state testing
vi.mock('@/components/ui/image-gallery', () => ({
  ImageGallery: ({ alt }: { alt: string }) => (
    <div data-testid="image-gallery" data-alt={alt} />
  ),
}))

describe('Projects Page', () => {
  describe('ProjectsPage_whenRendered_thenDisplaysPageTitle', () => {
    it('should render page title', () => {
      // Arrange & Act
      render(<ProjectsPage />)

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: 'Projects' })).toBeInTheDocument()
    })
  })

  describe('ProjectsPage_whenRendered_thenDisplaysAllProjects', () => {
    it('should render all projects', () => {
      // Arrange & Act
      render(<ProjectsPage />)

      // Assert
      expect(screen.getByText('Project One')).toBeInTheDocument()
      expect(screen.getByText('Project Two')).toBeInTheDocument()
      expect(screen.getByText('Project Three')).toBeInTheDocument()
    })

    it('should render project descriptions', () => {
      // Arrange & Act
      render(<ProjectsPage />)

      // Assert
      expect(screen.getByText('First project description')).toBeInTheDocument()
      expect(screen.getByText('Second project description')).toBeInTheDocument()
      expect(screen.getByText('Third project description')).toBeInTheDocument()
    })
  })

  describe('ProjectsPage_whenRendered_thenUsesGridLayout', () => {
    it('should render projects in appropriate container', () => {
      // Arrange & Act
      const { container } = render(<ProjectsPage />)

      // Assert - check that content is within sections
      expect(container.querySelector('section')).toBeInTheDocument()
    })
  })
})
