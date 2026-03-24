import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.tsx'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'cobertura'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/types/**/*',
        'src/data/**/*',
        'src/app/layout.tsx',
        // GSAP ScrollTrigger branches need real browser scroll events; jsdom can't provide them
        'src/lib/gsap.ts',
        'src/components/journey/**/*',
        'src/hooks/useReducedMotion.ts',
      ],
      thresholds: {
        branches: 95,
        functions: 97,
        lines: 98,
        statements: 98,
      },
    },
    clearMocks: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
