import React from 'react'
import { render, screen } from '@testing-library/react'
import { getLinkType, getLinkLabel, LinkIcon } from '../link-utils'

describe('getLinkType', () => {
  describe('getLinkType_whenGitHubUrl_thenReturnsGithub', () => {
    it.each([
      ['https://github.com/user/repo'],
      ['http://github.com/user/repo'],
      ['https://www.github.com/user'],
      ['https://GITHUB.COM/user'],
    ])('should return "github" for URL: %s', (url) => {
      // Arrange
      // URL provided via parameter

      // Act
      const result = getLinkType(url)

      // Assert
      expect(result).toBe('github')
    })
  })

  describe('getLinkType_whenLinkedInUrl_thenReturnsLinkedin', () => {
    it.each([
      ['https://linkedin.com/in/username'],
      ['https://www.linkedin.com/company/test'],
      ['http://LINKEDIN.COM/posts/123'],
    ])('should return "linkedin" for URL: %s', (url) => {
      // Arrange
      // URL provided via parameter

      // Act
      const result = getLinkType(url)

      // Assert
      expect(result).toBe('linkedin')
    })
  })

  describe('getLinkType_whenYouTubeUrl_thenReturnsYoutube', () => {
    it.each([
      ['https://youtube.com/watch?v=123'],
      ['https://www.youtube.com/channel/ABC'],
      ['https://youtu.be/123'],
      ['http://YOUTU.BE/video'],
    ])('should return "youtube" for URL: %s', (url) => {
      // Arrange
      // URL provided via parameter

      // Act
      const result = getLinkType(url)

      // Assert
      expect(result).toBe('youtube')
    })
  })

  describe('getLinkType_whenNpmUrl_thenReturnsNpm', () => {
    it.each([
      ['https://npmjs.com/package/test'],
      ['https://www.npmjs.com/package/test'],
      ['https://npm.im/package-name'],
    ])('should return "npm" for URL: %s', (url) => {
      // Arrange
      // URL provided via parameter

      // Act
      const result = getLinkType(url)

      // Assert
      expect(result).toBe('npm')
    })
  })

  describe('getLinkType_whenPubDevUrl_thenReturnsPubdev', () => {
    it.each([
      ['https://pub.dev/packages/test'],
      ['https://www.pub.dev/publishers/test'],
    ])('should return "pubdev" for URL: %s', (url) => {
      // Arrange
      // URL provided via parameter

      // Act
      const result = getLinkType(url)

      // Assert
      expect(result).toBe('pubdev')
    })
  })

  describe('getLinkType_whenUnknownUrl_thenReturnsGeneric', () => {
    it.each([
      ['https://example.com'],
      ['https://mywebsite.org'],
      ['https://random-domain.io/page'],
      ['ftp://files.server.com'],
    ])('should return "generic" for URL: %s', (url) => {
      // Arrange
      // URL provided via parameter

      // Act
      const result = getLinkType(url)

      // Assert
      expect(result).toBe('generic')
    })
  })
})

describe('getLinkLabel', () => {
  describe('getLinkLabel_whenKnownType_thenReturnsCorrectLabel', () => {
    it.each([
      ['github', 'GitHub'],
      ['linkedin', 'LinkedIn'],
      ['youtube', 'YouTube'],
      ['npm', 'npm'],
      ['pubdev', 'pub.dev'],
      ['generic', 'Link'],
    ] as const)('should return %s for type %s', (type, expected) => {
      // Arrange
      // Type provided via parameter

      // Act
      const result = getLinkLabel(type)

      // Assert
      expect(result).toBe(expected)
    })
  })
})

describe('LinkIcon', () => {
  describe('LinkIcon_whenGitHub_thenRendersGitHubIcon', () => {
    it('should render GitHub SVG icon', () => {
      // Arrange
      const type = 'github' as const

      // Act
      const { container } = render(<LinkIcon type={type} />)

      // Assert
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveClass('w-4', 'h-4')
    })
  })

  describe('LinkIcon_whenLinkedIn_thenRendersLinkedInIcon', () => {
    it('should render LinkedIn SVG icon', () => {
      // Arrange
      const type = 'linkedin' as const

      // Act
      const { container } = render(<LinkIcon type={type} />)

      // Assert
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('LinkIcon_whenYouTube_thenRendersYouTubeIcon', () => {
    it('should render YouTube SVG icon', () => {
      // Arrange
      const type = 'youtube' as const

      // Act
      const { container } = render(<LinkIcon type={type} />)

      // Assert
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('LinkIcon_whenNpm_thenRendersNpmIcon', () => {
    it('should render npm SVG icon', () => {
      // Arrange
      const type = 'npm' as const

      // Act
      const { container } = render(<LinkIcon type={type} />)

      // Assert
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('LinkIcon_whenPubDev_thenRendersPubDevIcon', () => {
    it('should render pub.dev SVG icon', () => {
      // Arrange
      const type = 'pubdev' as const

      // Act
      const { container } = render(<LinkIcon type={type} />)

      // Assert
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('LinkIcon_whenGeneric_thenRendersGenericLinkIcon', () => {
    it('should render generic link SVG icon', () => {
      // Arrange
      const type = 'generic' as const

      // Act
      const { container } = render(<LinkIcon type={type} />)

      // Assert
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })
  })

  describe('LinkIcon_whenCustomClassName_thenAppliesClassName', () => {
    it.each([
      ['github', 'w-6 h-6'],
      ['linkedin', 'w-8 h-8 text-blue-500'],
      ['generic', 'custom-class'],
    ] as const)('should apply custom className for %s icon', (type, className) => {
      // Arrange
      // Type and className provided via parameters

      // Act
      const { container } = render(<LinkIcon type={type} className={className} />)

      // Assert
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass(...className.split(' '))
    })
  })

  describe('LinkIcon_whenDefaultClassName_thenUsesDefault', () => {
    it('should use default "w-4 h-4" when no className provided', () => {
      // Arrange
      const type = 'github' as const

      // Act
      const { container } = render(<LinkIcon type={type} />)

      // Assert
      const svg = container.querySelector('svg')
      expect(svg).toHaveClass('w-4', 'h-4')
    })
  })
})
