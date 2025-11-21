import React from 'react'
import { render, screen } from '@testing-library/react'
import { AboutSection } from '../AboutSection'
import type { About } from '@/types/about'

const mockAboutData: About = {
  tagline: 'Test Tagline',
  headline: 'Test Headline',
  introduction: 'Test introduction text.',
  highlights: [
    { value: '6+', label: 'Years Experience' },
    { value: '20+', label: 'Open Source Packages' },
    { value: '1.5K+', label: 'GitHub Stars' },
    { value: '50K+', label: 'Monthly Downloads' },
  ],
  expertise: [
    {
      area: 'Backend & Systems',
      skills: ['Go', 'Python', 'Node.js'],
    },
    {
      area: 'Frontend & Mobile',
      skills: ['React', 'Flutter', 'TypeScript'],
    },
  ],
  values: [
    {
      number: 1,
      title: 'Scalable Solutions',
      description: 'Architecting elegant solutions',
      iconName: 'layers',
    },
  ],
}

describe('AboutSection', () => {
  describe('AboutSection_whenRendered_thenDisplaysHeadlineAndIntro', () => {
    it('should render the headline', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('Test Headline')).toBeInTheDocument()
    })

    it('should render the introduction text', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('Test introduction text.')).toBeInTheDocument()
    })
  })

  describe('AboutSection_whenRendered_thenDisplaysHighlights', () => {
    it('should render all highlight values', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('6+')).toBeInTheDocument()
      expect(screen.getByText('20+')).toBeInTheDocument()
      expect(screen.getByText('1.5K+')).toBeInTheDocument()
      expect(screen.getByText('50K+')).toBeInTheDocument()
    })

    it('should render all highlight labels', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('Years Experience')).toBeInTheDocument()
      expect(screen.getByText('Open Source Packages')).toBeInTheDocument()
      expect(screen.getByText('GitHub Stars')).toBeInTheDocument()
      expect(screen.getByText('Monthly Downloads')).toBeInTheDocument()
    })
  })

  describe('AboutSection_whenRendered_thenDisplaysExpertise', () => {
    it('should render expertise section heading', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('Expertise')).toBeInTheDocument()
    })

    it('should render all expertise areas', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('Backend & Systems')).toBeInTheDocument()
      expect(screen.getByText('Frontend & Mobile')).toBeInTheDocument()
    })

    it('should render all skills within expertise areas', () => {
      render(<AboutSection data={mockAboutData} />)
      // Backend & Systems skills
      expect(screen.getByText('Go')).toBeInTheDocument()
      expect(screen.getByText('Python')).toBeInTheDocument()
      expect(screen.getByText('Node.js')).toBeInTheDocument()
      // Frontend & Mobile skills
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('Flutter')).toBeInTheDocument()
      expect(screen.getByText('TypeScript')).toBeInTheDocument()
    })
  })

  describe('AboutSection_whenRendered_thenHasProperAccessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<AboutSection data={mockAboutData} />)
      // h3 for headline
      expect(screen.getByRole('heading', { level: 3, name: 'Test Headline' })).toBeInTheDocument()
    })
  })

  describe('AboutSection_whenEmptyData_thenHandlesGracefully', () => {
    it('should handle empty highlights array', () => {
      const dataWithEmptyHighlights = { ...mockAboutData, highlights: [] }
      render(<AboutSection data={dataWithEmptyHighlights} />)
      expect(screen.getByText('Test Headline')).toBeInTheDocument()
    })

    it('should handle empty expertise array', () => {
      const dataWithEmptyExpertise = { ...mockAboutData, expertise: [] }
      render(<AboutSection data={dataWithEmptyExpertise} />)
      expect(screen.getByText('Expertise')).toBeInTheDocument()
    })
  })
})
