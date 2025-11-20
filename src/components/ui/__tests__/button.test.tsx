import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'jest-axe'
import { Button } from '../button'

describe('Button', () => {
  describe('Button_whenRendered_thenDisplaysChildren', () => {
    it('should render children text', () => {
      // Arrange
      const buttonText = 'Click me'

      // Act
      render(<Button>{buttonText}</Button>)

      // Assert
      expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument()
    })
  })

  describe('Button_whenVariantProvided_thenAppliesCorrectStyles', () => {
    it.each([
      ['primary', 'bg-accent'],
      ['secondary', 'border-border'],
      ['ghost', 'hover:bg-hover-bg'],
      ['link', 'underline-offset-4'],
    ] as const)('should apply %s variant styles', (variant, expectedClass) => {
      // Arrange
      const buttonText = 'Test Button'

      // Act
      render(<Button variant={variant}>{buttonText}</Button>)

      // Assert
      const button = screen.getByRole('button', { name: buttonText })
      expect(button).toHaveClass(expectedClass)
    })
  })

  describe('Button_whenSizeProvided_thenAppliesCorrectStyles', () => {
    it.each([
      ['sm', 'h-8'],
      ['md', 'h-10'],
      ['lg', 'h-12'],
    ] as const)('should apply %s size styles', (size, expectedClass) => {
      // Arrange
      const buttonText = 'Test Button'

      // Act
      render(<Button size={size}>{buttonText}</Button>)

      // Assert
      const button = screen.getByRole('button', { name: buttonText })
      expect(button).toHaveClass(expectedClass)
    })
  })

  describe('Button_whenDefaultProps_thenUsesPrimaryAndMd', () => {
    it('should use primary variant and md size by default', () => {
      // Arrange
      const buttonText = 'Default Button'

      // Act
      render(<Button>{buttonText}</Button>)

      // Assert
      const button = screen.getByRole('button', { name: buttonText })
      expect(button).toHaveClass('bg-accent') // primary variant
      expect(button).toHaveClass('h-10') // md size
    })
  })

  describe('Button_whenDisabled_thenAppliesDisabledStyles', () => {
    it('should apply disabled styles when disabled prop is true', () => {
      // Arrange
      const buttonText = 'Disabled Button'

      // Act
      render(<Button disabled>{buttonText}</Button>)

      // Assert
      const button = screen.getByRole('button', { name: buttonText })
      expect(button).toBeDisabled()
      expect(button).toHaveClass('disabled:pointer-events-none')
      expect(button).toHaveClass('disabled:opacity-50')
    })
  })

  describe('Button_whenClicked_thenCallsOnClick', () => {
    it('should call onClick handler when clicked', async () => {
      // Arrange
      const mockOnClick = jest.fn()
      const buttonText = 'Clickable Button'
      const user = userEvent.setup()

      // Act
      render(<Button onClick={mockOnClick}>{buttonText}</Button>)
      await user.click(screen.getByRole('button', { name: buttonText }))

      // Assert
      expect(mockOnClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('Button_whenCustomClassName_thenMergesClasses', () => {
    it('should merge custom className with default classes', () => {
      // Arrange
      const buttonText = 'Custom Button'
      const customClass = 'my-custom-class'

      // Act
      render(<Button className={customClass}>{buttonText}</Button>)

      // Assert
      const button = screen.getByRole('button', { name: buttonText })
      expect(button).toHaveClass(customClass)
      expect(button).toHaveClass('inline-flex') // base style
    })
  })

  describe('Button_whenAsChild_thenRendersAsSlot', () => {
    it('should render as child element when asChild is true', () => {
      // Arrange
      const linkText = 'Link Button'

      // Act
      render(
        <Button asChild>
          <a href="/test">{linkText}</a>
        </Button>
      )

      // Assert
      const link = screen.getByRole('link', { name: linkText })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href', '/test')
      expect(link).toHaveClass('bg-accent') // variant styles applied
    })
  })

  describe('Button_whenForwardRef_thenReceivesRef', () => {
    it('should forward ref to the button element', () => {
      // Arrange
      const ref = React.createRef<HTMLButtonElement>()
      const buttonText = 'Ref Button'

      // Act
      render(<Button ref={ref}>{buttonText}</Button>)

      // Assert
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
      expect(ref.current?.textContent).toBe(buttonText)
    })
  })

  describe('Button_whenHtmlAttributes_thenPassesThrough', () => {
    it('should pass through HTML attributes', () => {
      // Arrange
      const buttonText = 'Attributed Button'
      const ariaLabel = 'Custom aria label'
      const dataTestId = 'test-button'

      // Act
      render(
        <Button aria-label={ariaLabel} data-testid={dataTestId}>
          {buttonText}
        </Button>
      )

      // Assert
      const button = screen.getByTestId(dataTestId)
      expect(button).toHaveAttribute('aria-label', ariaLabel)
    })
  })

  describe('Button_whenDisplayName_thenIsButton', () => {
    it('should have displayName set to "Button"', () => {
      // Arrange & Act & Assert
      expect(Button.displayName).toBe('Button')
    })
  })

  describe('Button_accessibility_thenHasNoViolations', () => {
    it('should have no accessibility violations for primary button', async () => {
      // Arrange & Act
      const { container } = render(<Button>Accessible Button</Button>)

      // Assert
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations for disabled button', async () => {
      // Arrange & Act
      const { container } = render(<Button disabled>Disabled Button</Button>)

      // Assert
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('should have no accessibility violations with aria-label', async () => {
      // Arrange & Act
      const { container } = render(
        <Button aria-label="Close modal">X</Button>
      )

      // Assert
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })
})
