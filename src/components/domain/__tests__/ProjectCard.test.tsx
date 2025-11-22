import React from 'react'
import { render, screen } from '@testing-library/react'
import { ProjectCard } from '../ProjectCard'
import type { Project } from '@/types/project'

// Mock ImageGallery to avoid complex state testing
vi.mock('@/components/ui/image-gallery', () => ({
  ImageGallery: ({ images, alt }: { images: string[]; alt: string }) => (
    <div data-testid="image-gallery" data-images={images.length} data-alt={alt} />
  ),
}))

describe('ProjectCard', () => {
  const createMockProject = (overrides: Partial<Project> = {}): Project => ({
    name: 'Test Project',
    description: 'A test project description',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    ...overrides,
  })

  describe('ProjectCard_whenMinimalData_thenRendersBasicInfo', () => {
    it('should render project name and description', () => {
      // Arrange
      const project = createMockProject({
        name: 'My Project',
        description: 'Project description here',
      })

      // Act
      render(<ProjectCard project={project} />)

      // Assert
      expect(screen.getByRole('heading', { level: 3, name: 'My Project' })).toBeInTheDocument()
      expect(screen.getByText('Project description here')).toBeInTheDocument()
    })

    it('should render formatted date range', () => {
      // Arrange
      const project = createMockProject({
        startDate: '2023-01-01',
        endDate: '2023-12-31',
      })

      // Act
      render(<ProjectCard project={project} />)

      // Assert
      expect(screen.getByText('Jan 2023 - Dec 2023')).toBeInTheDocument()
    })
  })

  describe('ProjectCard_whenImages_thenRendersImageGallery', () => {
    it('should render ImageGallery with primary image', () => {
      // Arrange
      const project = createMockProject({
        images: {
          primary: '/primary.jpg',
        },
      })

      // Act
      render(<ProjectCard project={project} />)

      // Assert
      const gallery = screen.getByTestId('image-gallery')
      expect(gallery).toBeInTheDocument()
      expect(gallery).toHaveAttribute('data-images', '1')
    })

    it('should render ImageGallery with primary and other images', () => {
      // Arrange
      const project = createMockProject({
        images: {
          primary: '/primary.jpg',
          others: ['/other1.jpg', '/other2.jpg'],
        },
      })

      // Act
      render(<ProjectCard project={project} />)

      // Assert
      const gallery = screen.getByTestId('image-gallery')
      expect(gallery).toHaveAttribute('data-images', '3')
    })

    it('should not render ImageGallery when no images', () => {
      // Arrange
      const project = createMockProject({
        images: undefined,
      })

      // Act
      render(<ProjectCard project={project} />)

      // Assert
      expect(screen.queryByTestId('image-gallery')).not.toBeInTheDocument()
    })

    it('should filter out falsy image values', () => {
      // Arrange
      const project = createMockProject({
        images: {
          primary: '/primary.jpg',
          others: [undefined as unknown as string, '/valid.jpg'],
        },
      })

      // Act
      render(<ProjectCard project={project} />)

      // Assert
      const gallery = screen.getByTestId('image-gallery')
      expect(gallery).toHaveAttribute('data-images', '2')
    })
  })

  describe('ProjectCard_whenLinks_thenRendersLinkButtons', () => {
    it('should render primary link button', () => {
      // Arrange
      const project = createMockProject({
        links: {
          primary: 'https://example.com',
        },
      })

      // Act
      render(<ProjectCard project={project} />)

      // Assert
      const link = screen.getByRole('link')
      expect(link).toHaveAttribute('href', 'https://example.com')
      expect(link).toHaveAttribute('target', '_blank')
    })

    it('should render secondary links with icons', () => {
      // Arrange
      const project = createMockProject({
        links: {
          others: ['https://github.com/repo', 'https://linkedin.com/post'],
        },
      })

      // Act
      render(<ProjectCard project={project} />)

      // Assert
      const links = screen.getAllByRole('link')
      expect(links).toHaveLength(2)
      expect(links[0]).toHaveAttribute('aria-label', 'GitHub')
      expect(links[1]).toHaveAttribute('aria-label', 'LinkedIn')
    })

    it('should not render links section when no links', () => {
      // Arrange
      const project = createMockProject({
        links: undefined,
      })

      // Act
      render(<ProjectCard project={project} />)

      // Assert
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })

  describe('ProjectCard_whenDetails_thenRendersDetailsList', () => {
    it('should render details list in non-compact mode', () => {
      // Arrange
      const project = createMockProject({
        details: ['Detail 1', 'Detail 2', 'Detail 3'],
      })

      // Act
      render(<ProjectCard project={project} compact={false} />)

      // Assert
      expect(screen.getByText('Detail 1')).toBeInTheDocument()
      expect(screen.getByText('Detail 2')).toBeInTheDocument()
      expect(screen.getByText('Detail 3')).toBeInTheDocument()
    })

    it('should not render details in compact mode', () => {
      // Arrange
      const project = createMockProject({
        details: ['Detail 1', 'Detail 2'],
      })

      // Act
      render(<ProjectCard project={project} compact={true} />)

      // Assert
      expect(screen.queryByText('Detail 1')).not.toBeInTheDocument()
      expect(screen.queryByText('Detail 2')).not.toBeInTheDocument()
    })

    it('should not render details when empty array', () => {
      // Arrange
      const project = createMockProject({
        details: [],
      })

      // Act
      const { container } = render(<ProjectCard project={project} />)

      // Assert
      const detailsList = container.querySelector('ul')
      expect(detailsList).not.toBeInTheDocument()
    })
  })

  describe('ProjectCard_whenCompactMode_thenAppliesCompactStyles', () => {
    it('should apply smaller heading in compact mode', () => {
      // Arrange
      const project = createMockProject({ name: 'Compact Project' })

      // Act
      render(<ProjectCard project={project} compact={true} />)

      // Assert
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveClass('text-16')
    })

    it('should apply larger heading in non-compact mode', () => {
      // Arrange
      const project = createMockProject({ name: 'Normal Project' })

      // Act
      render(<ProjectCard project={project} compact={false} />)

      // Assert
      const heading = screen.getByRole('heading', { level: 3 })
      expect(heading).toHaveClass('text-20')
    })
  })

  describe('ProjectCard_whenPresent_thenHandlesEndDate', () => {
    it('should display "Present" for current projects', () => {
      // Arrange
      const project = createMockProject({
        startDate: '2023-01-01',
        endDate: 'Present',
      })

      // Act
      render(<ProjectCard project={project} />)

      // Assert
      expect(screen.getByText('Jan 2023 - Present')).toBeInTheDocument()
    })
  })
})
