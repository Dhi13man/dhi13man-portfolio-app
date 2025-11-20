import { cn } from '../utils'

describe('cn utility function', () => {
  describe('cn_whenNoInputs_thenReturnsEmptyString', () => {
    it('should return empty string when called with no arguments', () => {
      // Arrange
      // No inputs

      // Act
      const result = cn()

      // Assert
      expect(result).toBe('')
    })
  })

  describe('cn_whenSingleClass_thenReturnsClass', () => {
    it.each([
      ['bg-red-500', 'bg-red-500'],
      ['text-lg', 'text-lg'],
      ['p-4', 'p-4'],
      ['  trimmed  ', 'trimmed'],
    ])('should return "%s" as "%s"', (input, expected) => {
      // Arrange
      // Input provided via parameter

      // Act
      const result = cn(input)

      // Assert
      expect(result).toBe(expected)
    })
  })

  describe('cn_whenMultipleClasses_thenMergesCorrectly', () => {
    it('should merge multiple non-conflicting classes', () => {
      // Arrange
      const classes = ['bg-red-500', 'text-white', 'p-4']

      // Act
      const result = cn(...classes)

      // Assert
      expect(result).toContain('bg-red-500')
      expect(result).toContain('text-white')
      expect(result).toContain('p-4')
    })

    it('should merge classes passed as separate arguments', () => {
      // Arrange
      const class1 = 'flex'
      const class2 = 'items-center'
      const class3 = 'justify-between'

      // Act
      const result = cn(class1, class2, class3)

      // Assert
      expect(result).toBe('flex items-center justify-between')
    })
  })

  describe('cn_whenConflictingTailwindClasses_thenLastWins', () => {
    it.each([
      [['bg-red-500', 'bg-blue-500'], 'bg-blue-500'],
      [['text-sm', 'text-lg'], 'text-lg'],
      [['p-2', 'p-4'], 'p-4'],
      [['m-1', 'm-2', 'm-3'], 'm-3'],
    ])('should resolve conflicts in %s to "%s"', (inputs, expected) => {
      // Arrange
      // Inputs provided via parameter

      // Act
      const result = cn(...inputs)

      // Assert
      expect(result).toBe(expected)
    })
  })

  describe('cn_whenFalsyValues_thenFiltersThemOut', () => {
    it.each([
      [[undefined, 'bg-red-500'], 'bg-red-500'],
      [[null, 'text-white'], 'text-white'],
      [[false, 'p-4'], 'p-4'],
      [['', 'flex'], 'flex'],
      [[0, 'grid'], 'grid'],
    ])('should filter out falsy value in %s', (inputs, expected) => {
      // Arrange
      // Inputs provided via parameter

      // Act
      const result = cn(...inputs)

      // Assert
      expect(result).toBe(expected)
    })

    it('should handle multiple falsy values', () => {
      // Arrange
      const inputs = [undefined, 'bg-white', null, 'text-black', false, '', 'p-4']

      // Act
      const result = cn(...inputs)

      // Assert
      expect(result).toBe('bg-white text-black p-4')
    })
  })

  describe('cn_whenConditionalClasses_thenAppliesCorrectly', () => {
    it('should apply conditional classes based on boolean', () => {
      // Arrange
      const isActive = true
      const isDisabled = false

      // Act
      const result = cn(
        'base-class',
        isActive && 'active-class',
        isDisabled && 'disabled-class'
      )

      // Assert
      expect(result).toContain('base-class')
      expect(result).toContain('active-class')
      expect(result).not.toContain('disabled-class')
    })
  })

  describe('cn_whenObjectSyntax_thenAppliesCorrectly', () => {
    it('should apply classes based on object syntax', () => {
      // Arrange
      const classObject = {
        'bg-red-500': true,
        'text-white': true,
        'p-4': false,
      }

      // Act
      const result = cn(classObject)

      // Assert
      expect(result).toContain('bg-red-500')
      expect(result).toContain('text-white')
      expect(result).not.toContain('p-4')
    })
  })

  describe('cn_whenArraySyntax_thenFlattensCorrectly', () => {
    it('should flatten and merge array of classes', () => {
      // Arrange
      const classArray = ['flex', 'items-center']
      const additionalClass = 'gap-4'

      // Act
      const result = cn(classArray, additionalClass)

      // Assert
      expect(result).toBe('flex items-center gap-4')
    })
  })
})
