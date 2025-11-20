import { formatDate, formatDateRange, isDatePresent } from '../date'

describe('formatDate', () => {
  describe('formatDate_whenValidISODate_thenReturnsFormattedString', () => {
    it.each([
      ['2023-01-15', 'Jan 2023'],
      ['2024-12-01', 'Dec 2024'],
      ['2020-06-30', 'Jun 2020'],
      ['2025-03-10', 'Mar 2025'],
    ])('should format %s as %s', (input, expected) => {
      // Arrange
      // Input provided via parameter

      // Act
      const result = formatDate(input)

      // Assert
      expect(result).toBe(expected)
    })
  })

  describe('formatDate_whenEmptyInput_thenReturnsEmptyString', () => {
    it.each([
      ['', ''],
    ])('should return empty string for empty input', (input, expected) => {
      // Arrange
      // Input provided via parameter

      // Act
      const result = formatDate(input)

      // Assert
      expect(result).toBe(expected)
    })
  })

  describe('formatDate_whenPresentKeyword_thenReturnsPresentString', () => {
    it('should return "Present" when input is "Present"', () => {
      // Arrange
      const input = 'Present'

      // Act
      const result = formatDate(input)

      // Assert
      expect(result).toBe('Present')
    })
  })

  describe('formatDate_whenInvalidDate_thenReturnsOriginalString', () => {
    it.each([
      ['invalid-date'],
      ['not-a-date'],
      ['2023/01/15'],
    ])('should return original string for invalid date: %s', (input) => {
      // Arrange
      // Input provided via parameter

      // Act
      const result = formatDate(input)

      // Assert
      expect(result).toBe(input)
    })
  })
})

describe('formatDateRange', () => {
  describe('formatDateRange_whenBothDatesValid_thenReturnsRange', () => {
    it.each([
      ['2023-01-01', '2023-12-31', 'Jan 2023 - Dec 2023'],
      ['2020-06-15', '2024-03-01', 'Jun 2020 - Mar 2024'],
      ['2019-01-01', 'Present', 'Jan 2019 - Present'],
    ])('should format range from %s to %s as %s', (start, end, expected) => {
      // Arrange
      // Inputs provided via parameters

      // Act
      const result = formatDateRange(start, end)

      // Assert
      expect(result).toBe(expected)
    })
  })

  describe('formatDateRange_whenOnlyStartDate_thenReturnsStartOnly', () => {
    it('should return only start date when end is empty', () => {
      // Arrange
      const startDate = '2023-01-01'
      const endDate = ''

      // Act
      const result = formatDateRange(startDate, endDate)

      // Assert
      expect(result).toBe('Jan 2023')
    })
  })

  describe('formatDateRange_whenOnlyEndDate_thenReturnsEndOnly', () => {
    it('should return only end date when start is empty', () => {
      // Arrange
      const startDate = ''
      const endDate = '2023-12-31'

      // Act
      const result = formatDateRange(startDate, endDate)

      // Assert
      expect(result).toBe('Dec 2023')
    })
  })

  describe('formatDateRange_whenBothEmpty_thenReturnsEmptyString', () => {
    it('should return empty string when both dates are empty', () => {
      // Arrange
      const startDate = ''
      const endDate = ''

      // Act
      const result = formatDateRange(startDate, endDate)

      // Assert
      expect(result).toBe('')
    })
  })

  describe('formatDateRange_whenEndIsPresent_thenFormatsCorrectly', () => {
    it('should handle "Present" as end date', () => {
      // Arrange
      const startDate = '2022-01-01'
      const endDate = 'Present'

      // Act
      const result = formatDateRange(startDate, endDate)

      // Assert
      expect(result).toBe('Jan 2022 - Present')
    })
  })
})

describe('isDatePresent', () => {
  describe('isDatePresent_whenPresent_thenReturnsTrue', () => {
    it('should return true for "Present"', () => {
      // Arrange
      const input = 'Present'

      // Act
      const result = isDatePresent(input)

      // Assert
      expect(result).toBe(true)
    })
  })

  describe('isDatePresent_whenNotPresent_thenReturnsFalse', () => {
    it.each([
      ['2023-01-01'],
      ['present'],
      ['PRESENT'],
      [''],
      ['2024-12-31'],
    ])('should return false for %s', (input) => {
      // Arrange
      // Input provided via parameter

      // Act
      const result = isDatePresent(input)

      // Assert
      expect(result).toBe(false)
    })
  })
})
