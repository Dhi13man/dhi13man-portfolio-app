import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../page'

// Mock the data modules with no current initiatives
jest.mock('@/data/about', () => ({
  aboutData: {
    tagline: 'Test Tagline',
    headline: 'Test Headline',
    introduction: 'Test introduction.',
    highlights: [
      { value: '5+', label: 'Years Experience' },
    ],
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
    funFacts: [
      { emoji: '☕', fact: 'Test fun fact' },
    ],
  },
}))

jest.mock('@/data/projects', () => ({
  projects: [
    {
      name: 'Past Project Only',
      description: 'A past project',
      startDate: '2022-01-01',
      endDate: '2022-12-31',
    },
  ],
}))

jest.mock('@/data/ventures', () => ({
  ventures: [
    {
      name: 'Past Venture Only',
      about: 'A past venture',
      roles: [{ endDate: '2022-12-31' }],
    },
  ],
}))

// Mock ImageGallery
jest.mock('@/components/ui/image-gallery', () => ({
  ImageGallery: ({ alt }: { alt: string }) => (
    <div data-testid="image-gallery" data-alt={alt} />
  ),
}))

describe('Home Page - No Current Initiatives', () => {
  it('should not render current initiatives section when all projects are past', () => {
    // Arrange & Act
    render(<Home />)

    // Assert
    expect(screen.queryByRole('heading', { level: 2, name: 'Current Initiatives' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'Active Projects' })).not.toBeInTheDocument()
    expect(screen.queryByRole('heading', { level: 3, name: 'Active Ventures' })).not.toBeInTheDocument()
  })

  it('should still render hero and about sections', () => {
    // Arrange & Act
    render(<Home />)

    // Assert
    expect(screen.getByRole('heading', { level: 1, name: 'Dhiman Seal' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'About' })).toBeInTheDocument()
  })
})
