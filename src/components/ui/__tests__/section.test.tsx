import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from '../section'

describe('Section', () => {
  describe('Section_whenRendered_thenDisplaysChildren', () => {
    it('should render children content', () => {
      // Arrange
      const content = 'Section content'

      // Act
      render(<Section>{content}</Section>)

      // Assert
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe('Section_whenRendered_thenRendersAsSectionElement', () => {
    it('should render as section HTML element', () => {
      // Arrange
      const testId = 'test-section'

      // Act
      const { container } = render(<Section data-testid={testId}>Content</Section>)

      // Assert
      expect(container.querySelector('section')).toBeInTheDocument()
    })
  })

  describe('Section_whenDefaultProps_thenHasDivider', () => {
    it('should have border-top divider by default', () => {
      // Arrange & Act
      const { container } = render(<Section>Content</Section>)

      // Assert
      expect(container.firstChild).toHaveClass('border-t')
      expect(container.firstChild).toHaveClass('border-border')
    })
  })

  describe('Section_whenNoDivider_thenRemovesBorder', () => {
    it('should not have border when noDivider is true', () => {
      // Arrange & Act
      const { container } = render(<Section noDivider>Content</Section>)

      // Assert
      expect(container.firstChild).not.toHaveClass('border-t')
    })
  })

  describe('Section_whenCustomClassName_thenMergesClasses', () => {
    it('should merge custom className', () => {
      // Arrange
      const customClass = 'custom-section'

      // Act
      const { container } = render(<Section className={customClass}>Content</Section>)

      // Assert
      expect(container.firstChild).toHaveClass(customClass)
      expect(container.firstChild).toHaveClass('py-12') // base style
    })
  })

  describe('Section_whenForwardRef_thenReceivesRef', () => {
    it('should forward ref to the section element', () => {
      // Arrange
      const ref = React.createRef<HTMLElement>()

      // Act
      render(<Section ref={ref}>Content</Section>)

      // Assert
      expect(ref.current).toBeInstanceOf(HTMLElement)
      expect(ref.current?.tagName).toBe('SECTION')
    })
  })

  describe('Section_whenRendered_thenHasMaxWidthContainer', () => {
    it('should have max-width container for children', () => {
      // Arrange
      const content = 'Test content'

      // Act
      const { container } = render(<Section>{content}</Section>)

      // Assert
      const innerDiv = container.querySelector('.max-w-\\[1200px\\]')
      expect(innerDiv).toBeInTheDocument()
      expect(innerDiv).toHaveClass('mx-auto')
      expect(innerDiv).toHaveClass('px-8')
    })
  })

  describe('Section_displayName_thenIsSection', () => {
    it('should have displayName set to "Section"', () => {
      // Arrange & Act & Assert
      expect(Section.displayName).toBe('Section')
    })
  })
})

describe('SectionHeader', () => {
  describe('SectionHeader_whenRendered_thenDisplaysChildren', () => {
    it('should render children content', () => {
      // Arrange
      const content = 'Header content'

      // Act
      render(<SectionHeader>{content}</SectionHeader>)

      // Assert
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe('SectionHeader_whenRendered_thenHasSpacingAndMargin', () => {
    it('should have spacing and margin styles', () => {
      // Arrange & Act
      const { container } = render(<SectionHeader>Header</SectionHeader>)

      // Assert
      expect(container.firstChild).toHaveClass('space-y-2')
      expect(container.firstChild).toHaveClass('mb-8')
    })
  })

  describe('SectionHeader_displayName_thenIsSectionHeader', () => {
    it('should have displayName set to "SectionHeader"', () => {
      // Arrange & Act & Assert
      expect(SectionHeader.displayName).toBe('SectionHeader')
    })
  })
})

describe('SectionTitle', () => {
  describe('SectionTitle_whenRendered_thenDisplaysAsH2', () => {
    it('should render as h2 heading', () => {
      // Arrange
      const title = 'Section Title'

      // Act
      render(<SectionTitle>{title}</SectionTitle>)

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: title })).toBeInTheDocument()
    })
  })

  describe('SectionTitle_whenRendered_thenHasTypographyStyles', () => {
    it('should have correct typography styles', () => {
      // Arrange
      const title = 'Title'

      // Act
      render(<SectionTitle>{title}</SectionTitle>)

      // Assert
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass('font-display')
      expect(heading).toHaveClass('font-bold')
      expect(heading).toHaveClass('text-text-primary')
    })
  })

  describe('SectionTitle_whenCustomClassName_thenMergesClasses', () => {
    it('should merge custom className', () => {
      // Arrange
      const customClass = 'custom-title'

      // Act
      render(<SectionTitle className={customClass}>Title</SectionTitle>)

      // Assert
      const heading = screen.getByRole('heading', { level: 2 })
      expect(heading).toHaveClass(customClass)
    })
  })

  describe('SectionTitle_displayName_thenIsSectionTitle', () => {
    it('should have displayName set to "SectionTitle"', () => {
      // Arrange & Act & Assert
      expect(SectionTitle.displayName).toBe('SectionTitle')
    })
  })
})

describe('SectionDescription', () => {
  describe('SectionDescription_whenRendered_thenDisplaysAsParagraph', () => {
    it('should render as paragraph', () => {
      // Arrange
      const description = 'Section description text'

      // Act
      render(<SectionDescription>{description}</SectionDescription>)

      // Assert
      const paragraph = screen.getByText(description)
      expect(paragraph).toBeInTheDocument()
      expect(paragraph.tagName).toBe('P')
    })
  })

  describe('SectionDescription_whenRendered_thenHasTypographyStyles', () => {
    it('should have correct typography styles', () => {
      // Arrange
      const description = 'Description'

      // Act
      render(<SectionDescription>{description}</SectionDescription>)

      // Assert
      const paragraph = screen.getByText(description)
      expect(paragraph).toHaveClass('text-text-secondary')
    })
  })

  describe('SectionDescription_displayName_thenIsSectionDescription', () => {
    it('should have displayName set to "SectionDescription"', () => {
      // Arrange & Act & Assert
      expect(SectionDescription.displayName).toBe('SectionDescription')
    })
  })
})

describe('Section composition', () => {
  describe('Section_whenCompoundComponents_thenRendersTogether', () => {
    it('should render all compound components together', () => {
      // Arrange
      const titleText = 'Test Section Title'
      const descriptionText = 'Test section description'
      const contentText = 'Main section content'

      // Act
      render(
        <Section>
          <SectionHeader>
            <SectionTitle>{titleText}</SectionTitle>
            <SectionDescription>{descriptionText}</SectionDescription>
          </SectionHeader>
          <div>{contentText}</div>
        </Section>
      )

      // Assert
      expect(screen.getByRole('heading', { level: 2, name: titleText })).toBeInTheDocument()
      expect(screen.getByText(descriptionText)).toBeInTheDocument()
      expect(screen.getByText(contentText)).toBeInTheDocument()
    })
  })
})
