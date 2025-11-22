import React from 'react'
import { render, screen } from '@testing-library/react'
import EducationPage from '../education/page'

// Mock the data module with comprehensive test data
vi.mock('@/data/education', () => ({
  education: [
    {
      name: 'Test University',
      about: 'Premier institution description',
      courses: [
        {
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          description: 'Main course description',
          startDate: '2018',
          endDate: '2022',
          gpa: '3.9',
          details: ['Detail one', 'Detail two'],
        },
        {
          degree: 'Minor',
          field: 'Mathematics',
          description: 'Minor description',
          startDate: '2019',
          endDate: '2022',
        },
      ],
      images: {
        primary: '/test-primary.jpg',
        others: ['/test-other.jpg'],
      },
      links: {
        primary: 'https://test.edu',
        others: ['https://linkedin.com/school/test'],
      },
    },
    {
      name: 'High School',
      about: 'High school description',
      courses: [
        {
          degree: 'High School Diploma',
          description: 'High school education',
          startDate: '2014',
          endDate: '2018',
          percentage: '95',
        },
      ],
      links: {
        primary: 'https://school.edu',
      },
    },
    {
      name: 'Minimal Institution',
      about: 'Minimal description',
      courses: [
        {
          degree: 'Certificate',
          description: 'Certificate program',
          startDate: '2020',
          endDate: '2020',
        },
      ],
    },
    {
      name: 'Images Only Primary',
      about: 'Institution with images but no others',
      courses: [
        {
          degree: 'Diploma',
          description: 'Diploma program',
          startDate: '2019',
          endDate: '2019',
        },
      ],
      images: {
        primary: '/only-primary.jpg',
      },
    },
    {
      name: 'Empty Others Arrays',
      about: 'Institution with empty others arrays',
      courses: [
        {
          degree: 'Workshop',
          description: 'Workshop program',
          startDate: '2021',
          endDate: '2021',
        },
      ],
      links: {
        others: [],
      },
    },
  ],
}))

// Mock ImageGallery to avoid complex state testing
vi.mock('@/components/ui/image-gallery', () => ({
  ImageGallery: ({ alt }: { alt: string }) => (
    <div data-testid="image-gallery" data-alt={alt} />
  ),
}))

describe('Education Page', () => {
  describe('EducationPage_whenRendered_thenDisplaysPageTitle', () => {
    it('should render page title and description', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: 'Education' })).toBeInTheDocument()
      expect(screen.getByText(/My academic journey through premier institutions/)).toBeInTheDocument()
    })
  })

  describe('EducationPage_whenRendered_thenDisplaysAllInstitutions', () => {
    it('should render all institution names', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      expect(screen.getByText('Test University')).toBeInTheDocument()
      expect(screen.getByText('High School')).toBeInTheDocument()
      expect(screen.getByText('Minimal Institution')).toBeInTheDocument()
    })

    it('should render institution about descriptions', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      expect(screen.getByText('Premier institution description')).toBeInTheDocument()
      expect(screen.getByText('High school description')).toBeInTheDocument()
      expect(screen.getByText('Minimal description')).toBeInTheDocument()
    })
  })

  describe('EducationPage_whenCoursesProvided_thenDisplaysCourseDetails', () => {
    it('should render course degrees and fields', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      expect(screen.getByText(/Bachelor of Science/)).toBeInTheDocument()
      expect(screen.getByText(/Computer Science/)).toBeInTheDocument()
      expect(screen.getByText(/Minor in Mathematics/)).toBeInTheDocument()
    })

    it('should render course descriptions', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      expect(screen.getByText('Main course description')).toBeInTheDocument()
      expect(screen.getByText('Minor description')).toBeInTheDocument()
    })

    it('should render course details list when provided', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      expect(screen.getByText('Detail one')).toBeInTheDocument()
      expect(screen.getByText('Detail two')).toBeInTheDocument()
    })

    it('should render GPA when provided', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      expect(screen.getByText('GPA: 3.9')).toBeInTheDocument()
    })

    it('should render percentage when provided', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      expect(screen.getByText('95%')).toBeInTheDocument()
    })
  })

  describe('EducationPage_whenImagesProvided_thenRendersImageGallery', () => {
    it('should render image gallery for institutions with images', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      const galleries = screen.getAllByTestId('image-gallery')
      expect(galleries.length).toBeGreaterThanOrEqual(1)
      expect(galleries[0]).toHaveAttribute('data-alt', 'Test University')
    })
  })

  describe('EducationPage_whenLinksProvided_thenRendersLinks', () => {
    it('should render primary link button', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      const links = screen.getAllByRole('link')
      const primaryLinks = links.filter(link => link.getAttribute('href') === 'https://test.edu')
      expect(primaryLinks.length).toBeGreaterThanOrEqual(1)
    })

    it('should render other links with correct labels', () => {
      // Arrange & Act
      render(<EducationPage />)

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

  describe('EducationPage_whenMultipleCourses_thenRendersAll', () => {
    it('should render multiple courses under same institution', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert - Test University has 2 courses
      expect(screen.getByText(/Bachelor of Science/)).toBeInTheDocument()
      expect(screen.getByText(/Minor in Mathematics/)).toBeInTheDocument()
    })
  })

  describe('EducationPage_whenNoOptionalData_thenRendersGracefully', () => {
    it('should render institution without images', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert - High School and Minimal Institution don't have images
      expect(screen.getByText('High School')).toBeInTheDocument()
      expect(screen.getByText('Minimal Institution')).toBeInTheDocument()
    })

    it('should render institution without other links', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      expect(screen.getByText('High School')).toBeInTheDocument()
    })

    it('should render course without field', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: 'High School Diploma' })).toBeInTheDocument()
    })

    it('should render course without gpa/percentage', () => {
      // Arrange & Act
      render(<EducationPage />)

      // Assert
      expect(screen.getByRole('heading', { level: 4, name: 'Certificate' })).toBeInTheDocument()
    })
  })

  describe('EducationPage_whenRendered_thenUsesTimeline', () => {
    it('should use timeline structure', () => {
      // Arrange & Act
      const { container } = render(<EducationPage />)

      // Assert
      expect(container.querySelector('section')).toBeInTheDocument()
    })
  })
})
