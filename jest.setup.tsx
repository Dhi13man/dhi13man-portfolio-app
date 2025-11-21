import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'

// Extend Jest matchers with accessibility testing
expect.extend(toHaveNoViolations)

// Mock Next.js Image component - filter out Next.js specific props
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // Filter out Next.js specific props that cause warnings
    // Using underscore prefix for intentionally unused variables
    const { fill, priority, sizes: _sizes, quality: _quality, placeholder: _placeholder, blurDataURL: _blurDataURL, loader: _loader, ...imgProps } = props
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...imgProps} alt={(props.alt as string) || ''} data-fill={fill ? 'true' : undefined} data-priority={priority ? 'true' : undefined} />
  },
}))

// Mock Next.js Link component
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => {
    return <a href={href} {...props}>{children}</a>
  },
}))

// Mock usePathname for Header component tests
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/'),
}))

// Suppress console.error for cleaner test output (optional)
// const originalError = console.error
// beforeAll(() => {
//   console.error = (...args: unknown[]) => {
//     if (typeof args[0] === 'string' && args[0].includes('Warning:')) {
//       return
//     }
//     originalError.call(console, ...args)
//   }
// })

// afterAll(() => {
//   console.error = originalError
// })
