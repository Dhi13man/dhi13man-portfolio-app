import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  PanelContent,
  PanelFooter,
} from '../panel'

describe('Panel', () => {
  describe('Panel_whenRendered_thenDisplaysChildren', () => {
    it('should render children content', () => {
      // Arrange
      const content = 'Panel content'

      // Act
      render(<Panel>{content}</Panel>)

      // Assert
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe('Panel_whenDefaultProps_thenHasBorderAndNoHover', () => {
    it('should have border and no hover styles by default', () => {
      // Arrange
      const content = 'Default Panel'

      // Act
      const { container } = render(<Panel>{content}</Panel>)

      // Assert
      const panel = container.firstChild
      expect(panel).toHaveClass('border-border')
      expect(panel).not.toHaveClass('hover:border-border-hover')
    })
  })

  describe('Panel_whenHoverable_thenAppliesHoverStyles', () => {
    it('should apply hover styles when hoverable is true', () => {
      // Arrange
      const content = 'Hoverable Panel'

      // Act
      const { container } = render(<Panel hoverable>{content}</Panel>)

      // Assert
      const panel = container.firstChild
      expect(panel).toHaveClass('hover:border-border-hover')
      expect(panel).toHaveClass('hover:bg-hover-bg')
    })
  })

  describe('Panel_whenNoBorder_thenRemovesBorder', () => {
    it('should not have border when noBorder is true', () => {
      // Arrange
      const content = 'Borderless Panel'

      // Act
      const { container } = render(<Panel noBorder>{content}</Panel>)

      // Assert
      const panel = container.firstChild
      expect(panel).not.toHaveClass('border-border')
    })
  })

  describe('Panel_whenCustomClassName_thenMergesClasses', () => {
    it('should merge custom className', () => {
      // Arrange
      const content = 'Custom Panel'
      const customClass = 'my-custom-class'

      // Act
      const { container } = render(<Panel className={customClass}>{content}</Panel>)

      // Assert
      const panel = container.firstChild
      expect(panel).toHaveClass(customClass)
      expect(panel).toHaveClass('bg-surface') // base style
    })
  })

  describe('Panel_whenForwardRef_thenReceivesRef', () => {
    it('should forward ref to the div element', () => {
      // Arrange
      const ref = React.createRef<HTMLDivElement>()

      // Act
      render(<Panel ref={ref}>Content</Panel>)

      // Assert
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })

  describe('Panel_displayName_thenIsPanel', () => {
    it('should have displayName set to "Panel"', () => {
      // Arrange & Act & Assert
      expect(Panel.displayName).toBe('Panel')
    })
  })
})

describe('PanelHeader', () => {
  describe('PanelHeader_whenRendered_thenDisplaysChildren', () => {
    it('should render children content', () => {
      // Arrange
      const content = 'Header content'

      // Act
      render(<PanelHeader>{content}</PanelHeader>)

      // Assert
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe('PanelHeader_whenCustomClassName_thenMergesClasses', () => {
    it('should merge custom className with default styles', () => {
      // Arrange
      const customClass = 'custom-header'

      // Act
      const { container } = render(<PanelHeader className={customClass}>Header</PanelHeader>)

      // Assert
      expect(container.firstChild).toHaveClass(customClass)
      expect(container.firstChild).toHaveClass('space-y-1')
    })
  })

  describe('PanelHeader_displayName_thenIsPanelHeader', () => {
    it('should have displayName set to "PanelHeader"', () => {
      // Arrange & Act & Assert
      expect(PanelHeader.displayName).toBe('PanelHeader')
    })
  })
})

describe('PanelTitle', () => {
  describe('PanelTitle_whenRendered_thenDisplaysAsH3', () => {
    it('should render as h3 heading', () => {
      // Arrange
      const title = 'Panel Title'

      // Act
      render(<PanelTitle>{title}</PanelTitle>)

      // Assert
      expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument()
    })
  })

  describe('PanelTitle_whenCustomClassName_thenMergesClasses', () => {
    it('should merge custom className', () => {
      // Arrange
      const customClass = 'custom-title'

      // Act
      render(<PanelTitle className={customClass}>Title</PanelTitle>)

      // Assert
      const title = screen.getByRole('heading', { level: 3 })
      expect(title).toHaveClass(customClass)
      expect(title).toHaveClass('font-semibold')
    })
  })

  describe('PanelTitle_displayName_thenIsPanelTitle', () => {
    it('should have displayName set to "PanelTitle"', () => {
      // Arrange & Act & Assert
      expect(PanelTitle.displayName).toBe('PanelTitle')
    })
  })
})

describe('PanelDescription', () => {
  describe('PanelDescription_whenRendered_thenDisplaysAsParagraph', () => {
    it('should render as paragraph', () => {
      // Arrange
      const description = 'Panel description text'

      // Act
      render(<PanelDescription>{description}</PanelDescription>)

      // Assert
      expect(screen.getByText(description)).toBeInTheDocument()
      expect(screen.getByText(description).tagName).toBe('P')
    })
  })

  describe('PanelDescription_displayName_thenIsPanelDescription', () => {
    it('should have displayName set to "PanelDescription"', () => {
      // Arrange & Act & Assert
      expect(PanelDescription.displayName).toBe('PanelDescription')
    })
  })
})

describe('PanelContent', () => {
  describe('PanelContent_whenRendered_thenDisplaysChildren', () => {
    it('should render children content', () => {
      // Arrange
      const content = 'Main content here'

      // Act
      render(<PanelContent>{content}</PanelContent>)

      // Assert
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe('PanelContent_whenRendered_thenHasPaddingTop', () => {
    it('should have padding-top style', () => {
      // Arrange & Act
      const { container } = render(<PanelContent>Content</PanelContent>)

      // Assert
      expect(container.firstChild).toHaveClass('pt-3')
    })
  })

  describe('PanelContent_displayName_thenIsPanelContent', () => {
    it('should have displayName set to "PanelContent"', () => {
      // Arrange & Act & Assert
      expect(PanelContent.displayName).toBe('PanelContent')
    })
  })
})

describe('PanelFooter', () => {
  describe('PanelFooter_whenRendered_thenDisplaysChildren', () => {
    it('should render children content', () => {
      // Arrange
      const content = 'Footer content'

      // Act
      render(<PanelFooter>{content}</PanelFooter>)

      // Assert
      expect(screen.getByText(content)).toBeInTheDocument()
    })
  })

  describe('PanelFooter_whenRendered_thenHasBorderTop', () => {
    it('should have border-top style', () => {
      // Arrange & Act
      const { container } = render(<PanelFooter>Footer</PanelFooter>)

      // Assert
      expect(container.firstChild).toHaveClass('border-t')
      expect(container.firstChild).toHaveClass('border-border')
    })
  })

  describe('PanelFooter_displayName_thenIsPanelFooter', () => {
    it('should have displayName set to "PanelFooter"', () => {
      // Arrange & Act & Assert
      expect(PanelFooter.displayName).toBe('PanelFooter')
    })
  })
})

describe('Panel composition', () => {
  describe('Panel_whenCompoundComponents_thenRendersTogether', () => {
    it('should render all compound components together', () => {
      // Arrange
      const titleText = 'Test Title'
      const descriptionText = 'Test Description'
      const contentText = 'Test Content'
      const footerText = 'Test Footer'

      // Act
      render(
        <Panel>
          <PanelHeader>
            <PanelTitle>{titleText}</PanelTitle>
            <PanelDescription>{descriptionText}</PanelDescription>
          </PanelHeader>
          <PanelContent>{contentText}</PanelContent>
          <PanelFooter>{footerText}</PanelFooter>
        </Panel>
      )

      // Assert
      expect(screen.getByRole('heading', { level: 3, name: titleText })).toBeInTheDocument()
      expect(screen.getByText(descriptionText)).toBeInTheDocument()
      expect(screen.getByText(contentText)).toBeInTheDocument()
      expect(screen.getByText(footerText)).toBeInTheDocument()
    })
  })
})
