import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ImageGallery } from '../image-gallery'

describe('ImageGallery', () => {
  describe('ImageGallery_whenNoImages_thenReturnsNull', () => {
    it('should return null when images array is empty', () => {
      // Arrange
      const images: string[] = []

      // Act
      const { container } = render(<ImageGallery images={images} alt="Test" />)

      // Assert
      expect(container.firstChild).toBeNull()
    })

    it('should return null when images is undefined', () => {
      // Arrange & Act
      const { container } = render(<ImageGallery images={undefined as unknown as string[]} alt="Test" />)

      // Assert
      expect(container.firstChild).toBeNull()
    })
  })

  describe('ImageGallery_whenSingleImage_thenRendersSimpleLayout', () => {
    it('should render single image without counter', () => {
      // Arrange
      const images = ['/image1.jpg']
      const alt = 'Single image'

      // Act
      render(<ImageGallery images={images} alt={alt} />)

      // Assert
      const image = screen.getByAltText(alt)
      expect(image).toBeInTheDocument()
      expect(screen.queryByText(/\+/)).not.toBeInTheDocument()
    })

    it('should have correct aria-label for single image', () => {
      // Arrange
      const images = ['/image1.jpg']
      const alt = 'Test image'

      // Act
      render(<ImageGallery images={images} alt={alt} />)

      // Assert
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', `View ${alt}`)
    })
  })

  describe('ImageGallery_whenMultipleImages_thenRendersGalleryLayout', () => {
    it('should render all images', () => {
      // Arrange
      const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg']
      const alt = 'Gallery'

      // Act
      render(<ImageGallery images={images} alt={alt} />)

      // Assert
      const imageButtons = screen.getAllByRole('button')
      expect(imageButtons).toHaveLength(3)
    })

    it('should show counter on first image', () => {
      // Arrange
      const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg']
      const alt = 'Gallery'

      // Act
      render(<ImageGallery images={images} alt={alt} />)

      // Assert
      expect(screen.getByText('+2')).toBeInTheDocument()
    })

    it('should have correct aria-label for multiple images', () => {
      // Arrange
      const images = ['/image1.jpg', '/image2.jpg']
      const alt = 'Gallery'

      // Act
      render(<ImageGallery images={images} alt={alt} />)

      // Assert
      const buttons = screen.getAllByRole('button')
      expect(buttons[0]).toHaveAttribute('aria-label', 'View image 1 of 2')
      expect(buttons[1]).toHaveAttribute('aria-label', 'View image 2 of 2')
    })
  })

  describe('ImageGallery_whenThumbnailSize_thenAppliesCorrectSize', () => {
    it.each([
      ['sm', 'w-12'],
      ['md', 'w-24'],
      ['lg', 'w-32'],
    ] as const)('should apply %s size class', (size, expectedClass) => {
      // Arrange
      const images = ['/image1.jpg']

      // Act
      const { container } = render(
        <ImageGallery images={images} alt="Test" thumbnailSize={size} />
      )

      // Assert
      const thumbnail = container.querySelector(`.${expectedClass}`)
      expect(thumbnail).toBeInTheDocument()
    })
  })

  describe('ImageGallery_whenLightboxOpened_thenRendersModal', () => {
    it('should open lightbox when image is clicked', async () => {
      // Arrange
      const images = ['/image1.jpg']
      const alt = 'Test'
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt={alt} />)
      await user.click(screen.getByRole('button'))

      // Assert
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByLabelText('Close')).toBeInTheDocument()
    })

    it('should open lightbox on Enter keypress', () => {
      // Arrange
      const images = ['/image1.jpg']

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      const button = screen.getByRole('button')
      fireEvent.keyDown(button, { key: 'Enter' })

      // Assert
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })

  describe('ImageGallery_whenLightboxClosed_thenHidesModal', () => {
    it('should close lightbox when close button is clicked', async () => {
      // Arrange
      const images = ['/image1.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getByRole('button'))
      await user.click(screen.getByLabelText('Close'))

      // Assert
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should close lightbox when backdrop is clicked', async () => {
      // Arrange
      const images = ['/image1.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getByRole('button'))
      const dialog = screen.getByRole('dialog')
      await user.click(dialog)

      // Assert
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('should close lightbox on Escape key', async () => {
      // Arrange
      const images = ['/image1.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getByRole('button'))
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })

      // Assert
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('ImageGallery_whenNavigating_thenChangesImage', () => {
    it('should show navigation buttons for multiple images', async () => {
      // Arrange
      const images = ['/image1.jpg', '/image2.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getAllByRole('button')[0])

      // Assert
      expect(screen.getByLabelText('Previous image')).toBeInTheDocument()
      expect(screen.getByLabelText('Next image')).toBeInTheDocument()
    })

    it('should not show navigation buttons for single image', async () => {
      // Arrange
      const images = ['/image1.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getByRole('button'))

      // Assert
      expect(screen.queryByLabelText('Previous image')).not.toBeInTheDocument()
      expect(screen.queryByLabelText('Next image')).not.toBeInTheDocument()
    })

    it('should navigate to next image', async () => {
      // Arrange
      const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getAllByRole('button')[0])

      // Initial counter shows 1/3
      expect(screen.getByText('1 / 3')).toBeInTheDocument()

      await user.click(screen.getByLabelText('Next image'))

      // Assert
      expect(screen.getByText('2 / 3')).toBeInTheDocument()
    })

    it('should navigate to previous image', async () => {
      // Arrange
      const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getAllByRole('button')[0])
      await user.click(screen.getByLabelText('Previous image'))

      // Assert - wraps to last image
      expect(screen.getByText('3 / 3')).toBeInTheDocument()
    })

    it('should cycle through images on ArrowRight key', async () => {
      // Arrange
      const images = ['/image1.jpg', '/image2.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getAllByRole('button')[0])
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowRight' })

      // Assert
      expect(screen.getByText('2 / 2')).toBeInTheDocument()
    })

    it('should cycle through images on ArrowLeft key', async () => {
      // Arrange
      const images = ['/image1.jpg', '/image2.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getAllByRole('button')[0])
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'ArrowLeft' })

      // Assert - wraps to last image
      expect(screen.getByText('2 / 2')).toBeInTheDocument()
    })

    it('should wrap from last to first image when clicking next', async () => {
      // Arrange
      const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getAllByRole('button')[0])

      // Navigate to last image
      await user.click(screen.getByLabelText('Next image'))
      await user.click(screen.getByLabelText('Next image'))
      expect(screen.getByText('3 / 3')).toBeInTheDocument()

      // Click next again to wrap to first
      await user.click(screen.getByLabelText('Next image'))

      // Assert - should wrap to first image
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })

    it('should navigate normally when not at boundary', async () => {
      // Arrange
      const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getAllByRole('button')[0])
      await user.click(screen.getByLabelText('Next image'))

      // Now at image 2, go previous (should go to image 1, not wrap)
      await user.click(screen.getByLabelText('Previous image'))

      // Assert
      expect(screen.getByText('1 / 3')).toBeInTheDocument()
    })
  })

  describe('ImageGallery_whenBodyScroll_thenPreventsWhenOpen', () => {
    it('should prevent body scroll when lightbox is open', async () => {
      // Arrange
      const images = ['/image1.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getByRole('button'))

      // Assert
      expect(document.body.style.overflow).toBe('hidden')
    })

    it('should restore body scroll when lightbox is closed', async () => {
      // Arrange
      const images = ['/image1.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getByRole('button'))
      await user.click(screen.getByLabelText('Close'))

      // Assert
      expect(document.body.style.overflow).toBe('unset')
    })

    it('should restore body scroll when component unmounts with lightbox open', async () => {
      // Arrange
      const images = ['/image1.jpg']
      const user = userEvent.setup()

      // Act
      const { unmount } = render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getByRole('button'))
      expect(document.body.style.overflow).toBe('hidden')

      // Unmount while lightbox is open
      unmount()

      // Assert - cleanup should restore scroll
      expect(document.body.style.overflow).toBe('unset')
    })
  })

  describe('ImageGallery_whenCustomClassName_thenAppliesClasses', () => {
    it('should apply custom className', () => {
      // Arrange
      const customClass = 'my-gallery'
      const images = ['/image1.jpg']

      // Act
      const { container } = render(
        <ImageGallery images={images} alt="Test" className={customClass} />
      )

      // Assert
      expect(container.firstChild).toHaveClass(customClass)
    })

    it('should apply custom imageClassName', () => {
      // Arrange
      const imageClassName = 'custom-image'
      const images = ['/image1.jpg']

      // Act
      const { container } = render(
        <ImageGallery images={images} alt="Test" imageClassName={imageClassName} />
      )

      // Assert
      const imageContainer = container.querySelector(`.${imageClassName}`)
      expect(imageContainer).toBeInTheDocument()
    })
  })

  describe('ImageGallery_whenAccessibility_thenHasCorrectAttributes', () => {
    it('should have correct dialog attributes', async () => {
      // Arrange
      const images = ['/image1.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getByRole('button'))

      // Assert
      const dialog = screen.getByRole('dialog')
      expect(dialog).toHaveAttribute('aria-modal', 'true')
      expect(dialog).toHaveAttribute('aria-label', 'Image viewer')
    })

    it('should have tabIndex for keyboard interaction', async () => {
      // Arrange
      const images = ['/image1.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('tabIndex', '0')

      await user.click(button)
      expect(screen.getByRole('dialog')).toHaveAttribute('tabIndex', '0')
    })
  })

  describe('ImageGallery_whenImageClicked_thenStopsPropagation', () => {
    it('should not close lightbox when image container is clicked', async () => {
      // Arrange
      const images = ['/image1.jpg']
      const user = userEvent.setup()

      // Act
      render(<ImageGallery images={images} alt="Test" />)
      await user.click(screen.getByRole('button'))

      // Click on the image container (not the backdrop)
      const dialog = screen.getByRole('dialog')
      const imageContainer = dialog.querySelector('.max-w-7xl')
      if (imageContainer) {
        fireEvent.click(imageContainer)
      }

      // Assert - dialog should still be open
      expect(screen.getByRole('dialog')).toBeInTheDocument()
    })
  })
})
