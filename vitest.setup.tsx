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
    const { fill, priority, sizes, quality, placeholder, blurDataURL, loader, ...imgProps } = props
    // Acknowledge intentionally unused variables
    void sizes; void quality; void placeholder; void blurDataURL; void loader;
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
