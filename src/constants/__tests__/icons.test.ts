import {
  VALUE_ICONS,
  VALID_ICON_NAMES,
  isValidIconName,
  getValueIcon,
  type ValueIconName,
} from '../icons'

describe('icons', () => {
  describe('VALUE_ICONS', () => {
    it('should have all expected icons', () => {
      expect(VALUE_ICONS).toHaveProperty('layers')
      expect(VALUE_ICONS).toHaveProperty('git-branch')
      expect(VALUE_ICONS).toHaveProperty('users')
      expect(VALUE_ICONS).toHaveProperty('zap')
      expect(VALUE_ICONS).toHaveProperty('target')
      expect(VALUE_ICONS).toHaveProperty('code')
    })

    it('should have 6 icons total', () => {
      expect(Object.keys(VALUE_ICONS)).toHaveLength(6)
    })
  })

  describe('VALID_ICON_NAMES', () => {
    it('should contain all icon names', () => {
      expect(VALID_ICON_NAMES).toContain('layers')
      expect(VALID_ICON_NAMES).toContain('git-branch')
      expect(VALID_ICON_NAMES).toContain('users')
      expect(VALID_ICON_NAMES).toContain('zap')
      expect(VALID_ICON_NAMES).toContain('target')
      expect(VALID_ICON_NAMES).toContain('code')
    })
  })

  describe('isValidIconName', () => {
    it('should return true for valid icon names', () => {
      expect(isValidIconName('layers')).toBe(true)
      expect(isValidIconName('git-branch')).toBe(true)
      expect(isValidIconName('users')).toBe(true)
      expect(isValidIconName('zap')).toBe(true)
      expect(isValidIconName('target')).toBe(true)
      expect(isValidIconName('code')).toBe(true)
    })

    it('should return false for invalid icon names', () => {
      expect(isValidIconName('invalid')).toBe(false)
      expect(isValidIconName('')).toBe(false)
      expect(isValidIconName('random-icon')).toBe(false)
    })
  })

  describe('getValueIcon', () => {
    it('should return icon component for valid names', () => {
      const layersIcon = getValueIcon('layers')
      expect(layersIcon).toBeDefined()
      // Lucide icons are React forwardRef components
      expect(layersIcon.$$typeof).toBeDefined()
    })

    it('should return different icons for different names', () => {
      const layers = getValueIcon('layers')
      const users = getValueIcon('users')
      expect(layers).not.toBe(users)
    })

    it('should return all icons without throwing', () => {
      VALID_ICON_NAMES.forEach((name) => {
        expect(() => getValueIcon(name)).not.toThrow()
      })
    })

    it('should throw error for invalid icon name', () => {
      // @ts-expect-error Testing invalid icon name error
      expect(() => getValueIcon('invalid-icon')).toThrow(
        'Invalid icon name: "invalid-icon"'
      )
    })
  })
})
