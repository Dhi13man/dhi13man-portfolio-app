import React from 'react'
import { render, screen } from '@testing-library/react'
import { ValueIcon } from '../ValueIcon'

describe('ValueIcon', () => {
  describe('ValueIcon_whenValidIconName_thenRendersIcon', () => {
    it('should render layers icon', () => {
      render(<ValueIcon iconName="layers" />)
      const icon = document.querySelector('svg')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveAttribute('aria-hidden', 'true')
    })

    it('should render git-branch icon', () => {
      render(<ValueIcon iconName="git-branch" />)
      const icon = document.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('should render users icon', () => {
      render(<ValueIcon iconName="users" />)
      const icon = document.querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('should apply custom className', () => {
      render(<ValueIcon iconName="layers" className="w-8 h-8" />)
      const icon = document.querySelector('svg')
      expect(icon).toHaveClass('w-8', 'h-8')
    })

    it('should use default className when not provided', () => {
      render(<ValueIcon iconName="layers" />)
      const icon = document.querySelector('svg')
      expect(icon).toHaveClass('w-5', 'h-5')
    })
  })

  describe('ValueIcon_whenInvalidIconName_thenRendersFallback', () => {
    it('should render warning fallback for invalid icon name', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      // @ts-expect-error Testing invalid icon name
      render(<ValueIcon iconName="invalid-icon" />)

      const fallback = screen.getByRole('img')
      expect(fallback).toHaveAttribute('aria-label', 'Missing icon: invalid-icon')
      expect(fallback).toHaveAttribute('title', 'Missing icon: invalid-icon')
      expect(fallback).toHaveTextContent('⚠')

      expect(consoleSpy).toHaveBeenCalledWith(
        'ValueIcon: Invalid icon name "invalid-icon". Using fallback.'
      )
      consoleSpy.mockRestore()
    })

    it('should apply className to fallback span', () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation()

      // @ts-expect-error Testing invalid icon name
      render(<ValueIcon iconName="unknown" className="custom-class" />)

      const fallback = screen.getByRole('img')
      expect(fallback).toHaveClass('custom-class')

      consoleSpy.mockRestore()
    })
  })
})
