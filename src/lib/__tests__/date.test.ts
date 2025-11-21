import { formatDate, formatDateRange, isDatePresent, parseStartDate } from '../date'

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

    it('should warn in development mode for invalid date', () => {
      // Arrange
      const originalEnv = process.env.NODE_ENV
      // @ts-expect-error - NODE_ENV is read-only
      process.env.NODE_ENV = 'development'
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      // Act
      formatDate('invalid-date')

      // Assert
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Invalid date format')
      )

      // Cleanup
      consoleSpy.mockRestore()
      // @ts-expect-error - NODE_ENV is read-only
      process.env.NODE_ENV = originalEnv
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

describe('parseStartDate', () => {
  describe('parseStartDate_whenISOFormat_thenReturnsValidDate', () => {
    it.each([
      ['2023-01-15', new Date(2023, 0, 15)],
      ['2024-12-01', new Date(2024, 11, 1)],
      ['2020-06-30', new Date(2020, 5, 30)],
    ])('should parse ISO date %s correctly', (input, expected) => {
      // Arrange
      // Input provided via parameter

      // Act
      const result = parseStartDate(input)

      // Assert
      expect(result.getFullYear()).toBe(expected.getFullYear())
      expect(result.getMonth()).toBe(expected.getMonth())
      expect(result.getDate()).toBe(expected.getDate())
    })
  })

  describe('parseStartDate_whenMMMyyyyFormat_thenReturnsValidDate', () => {
    it.each([
      ['Jun 2023', 2023, 5], // June is month 5 (0-indexed)
      ['Nov 2025', 2025, 10], // November is month 10
      ['Sep 2021', 2021, 8], // September is month 8
      ['May 2022', 2022, 4], // May is month 4
      ['Oct 2019', 2019, 9], // October is month 9
      ['Dec 2023', 2023, 11], // December is month 11
      ['Jan 2024', 2024, 0], // January is month 0
    ])('should parse MMM yyyy date %s correctly', (input, expectedYear, expectedMonth) => {
      // Arrange
      // Input provided via parameter

      // Act
      const result = parseStartDate(input)

      // Assert
      expect(result.getFullYear()).toBe(expectedYear)
      expect(result.getMonth()).toBe(expectedMonth)
    })
  })

  describe('parseStartDate_whenEmptyOrInvalid_thenReturnsEpoch', () => {
    it.each([
      [''],
      ['invalid-date'],
      ['not-a-date'],
    ])('should return epoch date for invalid input: %s', (input) => {
      // Arrange
      // Input provided via parameter

      // Act
      const result = parseStartDate(input)

      // Assert
      expect(result.getTime()).toBe(new Date(0).getTime())
    })
  })

  describe('parseStartDate_sortingBehavior_thenSortsCorrectly', () => {
    it('should enable correct descending sort order', () => {
      // Arrange
      const dates = ['Sep 2021', 'Jun 2023', 'Nov 2020', 'May 2022']

      // Act
      const sorted = dates.sort((a, b) =>
        parseStartDate(b).getTime() - parseStartDate(a).getTime()
      )

      // Assert - Should be sorted descending (most recent first)
      expect(sorted).toEqual(['Jun 2023', 'May 2022', 'Sep 2021', 'Nov 2020'])
    })

    it('should handle mixed ISO and MMM yyyy formats in sorting', () => {
      // Arrange
      const dates = ['2023-01-01', 'Jun 2023', '2022-06-15', 'May 2022']

      // Act
      const sorted = dates.sort((a, b) =>
        parseStartDate(b).getTime() - parseStartDate(a).getTime()
      )

      // Assert - Should be sorted descending
      // Jun 2023 > Jan 2023 > Jun 2022 > May 2022
      expect(sorted).toEqual(['Jun 2023', '2023-01-01', '2022-06-15', 'May 2022'])
    })
  })
})
