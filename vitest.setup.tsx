import '@testing-library/jest-dom/vitest'
import * as axeMatchers from 'vitest-axe/matchers'
import { expect, vi } from 'vitest'
import React from 'react'

// Extend Vitest matchers with accessibility testing
expect.extend(axeMatchers)

// Mock Next.js Image component - filter out Next.js specific props
vi.mock('next/image', () => ({
  default: (props: Record<string, unknown>) => {
    // Filter out Next.js specific props that cause warnings
    // Using underscore prefix for intentionally unused variables
    const { fill, priority, sizes: _sizes, quality: _quality, placeholder: _placeholder, blurDataURL: _blurDataURL, loader: _loader, ...imgProps } = props
    // eslint-disable-next-line @next/next/no-img-element
    return React.createElement('img', {
      ...imgProps,
      alt: (props.alt as string) || '',
      'data-fill': fill ? 'true' : undefined,
      'data-priority': priority ? 'true' : undefined,
    })
  },
}))

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => {
    return React.createElement('a', { href, ...props }, children)
  },
}))

// Mock usePathname for Header component tests
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}))
