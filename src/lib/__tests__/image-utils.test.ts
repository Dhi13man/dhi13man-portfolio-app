import { gatherImages } from '../image-utils'
import type { Images } from '@/types/common'

describe('gatherImages', () => {
  describe('gatherImages_whenImagesUndefined_thenReturnsEmptyArray', () => {
    it('should return empty array for undefined input', () => {
      // Arrange
      const images = undefined

      // Act
      const result = gatherImages(images)

      // Assert
      expect(result).toEqual([])
    })
  })

  describe('gatherImages_whenOnlyPrimaryImage_thenReturnsArrayWithPrimary', () => {
    it('should return array with primary image', () => {
      // Arrange
      const images: Images = {
        primary: '/path/to/primary.jpg',
      }

      // Act
      const result = gatherImages(images)

      // Assert
      expect(result).toEqual(['/path/to/primary.jpg'])
    })
  })

  describe('gatherImages_whenPrimaryAndOthers_thenReturnsCombinedArray', () => {
    it('should return array with primary followed by others', () => {
      // Arrange
      const images: Images = {
        primary: '/path/to/primary.jpg',
        others: ['/path/to/other1.jpg', '/path/to/other2.jpg'],
      }

      // Act
      const result = gatherImages(images)

      // Assert
      expect(result).toEqual([
        '/path/to/primary.jpg',
        '/path/to/other1.jpg',
        '/path/to/other2.jpg',
      ])
    })
  })

  describe('gatherImages_whenOnlyOthers_thenReturnsOthersArray', () => {
    it('should return only others when no primary', () => {
      // Arrange
      const images: Images = {
        primary: '',
        others: ['/path/to/other1.jpg', '/path/to/other2.jpg'],
      }

      // Act
      const result = gatherImages(images)

      // Assert
      expect(result).toEqual(['/path/to/other1.jpg', '/path/to/other2.jpg'])
    })
  })

  describe('gatherImages_whenEmptyOthersArray_thenReturnsOnlyPrimary', () => {
    it('should return only primary when others is empty', () => {
      // Arrange
      const images: Images = {
        primary: '/path/to/primary.jpg',
        others: [],
      }

      // Act
      const result = gatherImages(images)

      // Assert
      expect(result).toEqual(['/path/to/primary.jpg'])
    })
  })

  describe('gatherImages_whenBothEmpty_thenReturnsEmptyArray', () => {
    it('should return empty array when both primary and others are empty', () => {
      // Arrange
      const images: Images = {
        primary: '',
        others: [],
      }

      // Act
      const result = gatherImages(images)

      // Assert
      expect(result).toEqual([])
    })
  })

  describe('gatherImages_whenOthersNotArray_thenIgnoresOthers', () => {
    it('should handle missing others property', () => {
      // Arrange
      const images: Images = {
        primary: '/path/to/primary.jpg',
      }

      // Act
      const result = gatherImages(images)

      // Assert
      expect(result).toEqual(['/path/to/primary.jpg'])
    })
  })
})
