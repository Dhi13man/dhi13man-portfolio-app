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
    {
      number: 2,
      title: 'Open Source Impact',
      description: 'Advancing technology through open source',
      iconName: 'git-branch',
    },
    {
      number: 3,
      title: 'Technical Leadership',
      description: 'Leading high-performance teams',
      iconName: 'users',
    },
  ],
  funFacts: [
    { emoji: '☕', fact: 'Powered by coffee' },
    { emoji: '🎮', fact: 'Debugs code and defeats bosses' },
  ],
  currentFocus: 'Currently exploring AI-assisted development',
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

  describe('AboutSection_whenRendered_thenDisplaysValues', () => {
    it('should render values section heading', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('Core Principles')).toBeInTheDocument()
    })

    it('should render all value titles', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('Scalable Solutions')).toBeInTheDocument()
      expect(screen.getByText('Open Source Impact')).toBeInTheDocument()
      expect(screen.getByText('Technical Leadership')).toBeInTheDocument()
    })

    it('should render all value descriptions', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('Architecting elegant solutions')).toBeInTheDocument()
      expect(screen.getByText('Advancing technology through open source')).toBeInTheDocument()
      expect(screen.getByText('Leading high-performance teams')).toBeInTheDocument()
    })

    it('should render value numbers with zero-padding', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('01')).toBeInTheDocument()
      expect(screen.getByText('02')).toBeInTheDocument()
      expect(screen.getByText('03')).toBeInTheDocument()
    })
  })

  describe('AboutSection_whenRendered_thenDisplaysFunFacts', () => {
    it('should render fun facts section heading', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('Fun Facts')).toBeInTheDocument()
    })

    it('should render all fun facts', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('Powered by coffee')).toBeInTheDocument()
      expect(screen.getByText('Debugs code and defeats bosses')).toBeInTheDocument()
    })

    it('should render fun fact emojis with aria-hidden', () => {
      render(<AboutSection data={mockAboutData} />)
      const coffeeEmoji = screen.getByText('☕')
      expect(coffeeEmoji).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('AboutSection_whenCurrentFocusProvided_thenDisplaysIt', () => {
    it('should render current focus when provided', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByText('Current Focus')).toBeInTheDocument()
      expect(screen.getByText('Currently exploring AI-assisted development')).toBeInTheDocument()
    })

    it('should not render current focus when not provided', () => {
      const dataWithoutFocus = { ...mockAboutData, currentFocus: undefined }
      render(<AboutSection data={dataWithoutFocus} />)
      expect(screen.queryByText('Current Focus')).not.toBeInTheDocument()
    })
  })

  describe('AboutSection_whenRendered_thenHasProperAccessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<AboutSection data={mockAboutData} />)
      // h3 for headline
      expect(screen.getByRole('heading', { level: 3, name: 'Test Headline' })).toBeInTheDocument()
    })

    it('should render value titles as h5', () => {
      render(<AboutSection data={mockAboutData} />)
      expect(screen.getByRole('heading', { level: 5, name: 'Scalable Solutions' })).toBeInTheDocument()
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

    it('should handle empty values array', () => {
      const dataWithEmptyValues = { ...mockAboutData, values: [] }
      render(<AboutSection data={dataWithEmptyValues} />)
      expect(screen.getByText('Core Principles')).toBeInTheDocument()
    })

    it('should handle empty funFacts array', () => {
      const dataWithEmptyFunFacts = { ...mockAboutData, funFacts: [] }
      render(<AboutSection data={dataWithEmptyFunFacts} />)
      expect(screen.getByText('Fun Facts')).toBeInTheDocument()
    })
  })
})
