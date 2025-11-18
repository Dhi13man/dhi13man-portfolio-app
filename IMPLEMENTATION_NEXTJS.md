# Portfolio Redesign: Next.js + Tailwind + TypeScript Implementation

**Stack:** Next.js 14 (App Router) + Tailwind CSS v4 + TypeScript + Framer Motion
**Focus:** Industry Standard + Maximum Performance + Maintainability
**Deployment:** Cloudflare Pages (Static Export)
**Created:** 2025-11-18

---

## Table of Contents

1. [Technology Stack Rationale](#technology-stack-rationale)
2. [Architecture Overview](#architecture-overview)
3. [Performance Strategy](#performance-strategy)
4. [Project Setup](#project-setup)
5. [Design System (Tailwind Config)](#design-system-tailwind-config)
6. [Component Architecture](#component-architecture)
7. [Data Layer & TypeScript](#data-layer--typescript)
8. [Implementation Phases](#implementation-phases)
9. [Performance Targets](#performance-targets)
10. [Deployment Strategy](#deployment-strategy)

---

## Technology Stack Rationale

### Why Next.js 14 (App Router)?

✅ **Industry Standard** - Most React jobs require Next.js experience
✅ **Static Site Generation** - Build-time rendering = zero server needed
✅ **Image Optimization** - `next/image` handles AVIF/WebP automatically
✅ **File-based Routing** - Clean, maintainable structure
✅ **TypeScript First** - Built-in TS support
✅ **Zero Config** - Works out of the box
✅ **RSC Ready** - React Server Components for future enhancements

### Why Tailwind CSS v4?

✅ **Industry Adoption** - Used by GitHub, Netflix, NASA
✅ **Design Tokens** - CSS variables under the hood (Pylon-compatible)
✅ **Utility-First** - Rapid development without CSS files
✅ **Tree-Shaking** - Only used classes in production
✅ **JIT Compiler** - Instant arbitrary values
✅ **Built-in Dark Mode** - `dark:` prefix support

### Why TypeScript?

✅ **Type Safety** - Catch errors at compile time
✅ **Better DX** - Autocomplete, refactoring, IntelliSense
✅ **Industry Standard** - Required at most companies
✅ **Self-Documentation** - Interfaces document data structures
✅ **Refactoring Safety** - Rename with confidence

### Why Framer Motion?

✅ **Declarative Animations** - React-friendly API
✅ **Pylon-Style Effects** - Easy to replicate cubic-bezier easing
✅ **Layout Animations** - Smooth transitions between states
✅ **Gesture Support** - Hover, tap, drag interactions
✅ **Performance** - GPU-accelerated, optimized for React

---

## Architecture Overview

### File Structure

```
portfolio-app/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Home/About page
│   │   ├── projects/
│   │   │   └── page.tsx
│   │   ├── experience/
│   │   │   └── page.tsx
│   │   ├── education/
│   │   │   └── page.tsx
│   │   ├── achievements/
│   │   │   └── page.tsx
│   │   ├── recommendations/
│   │   │   └── page.tsx
│   │   └── ventures/
│   │       └── page.tsx
│   │
│   ├── components/               # React components
│   │   ├── ui/                   # Shadcn/UI primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Navigation.tsx
│   │   │   ├── Container.tsx
│   │   │   └── Section.tsx
│   │   └── domain/
│   │       ├── ProjectCard.tsx
│   │       ├── ExperienceCard.tsx
│   │       ├── EducationCard.tsx
│   │       └── ...
│   │
│   ├── data/                     # Data layer (typed)
│   │   ├── projects.ts
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   ├── achievements.ts
│   │   ├── recommendations.ts
│   │   └── ventures.ts
│   │
│   ├── types/                    # TypeScript types
│   │   ├── project.ts
│   │   ├── experience.ts
│   │   └── common.ts
│   │
│   ├── lib/                      # Utilities
│   │   ├── utils.ts              # cn() helper, etc.
│   │   └── date.ts               # Date formatting
│   │
│   └── styles/
│       └── globals.css           # Tailwind directives + custom CSS
│
├── public/                       # Static assets
│   ├── images/
│   ├── favicon.ico
│   └── ...
│
├── tailwind.config.ts            # Tailwind configuration
├── next.config.js                # Next.js configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json
```

### Key Architectural Decisions

1. **Static Export** - No server, pure HTML/CSS/JS output
2. **Component Colocation** - UI components near where they're used
3. **Data Separation** - TypeScript files, not JSON (type safety)
4. **Shadcn/UI** - Copy/paste components (full control)
5. **Tailwind + CSS Variables** - Utility classes + design tokens

---

## Performance Strategy

### Static Site Generation (SSG)

```typescript
// next.config.js
module.exports = {
  output: 'export', // Static HTML export
  images: {
    unoptimized: false, // Use Next.js optimization
    formats: ['image/avif', 'image/webp'],
  },
  // Cloudflare Pages compatible
}
```

**How It Works:**
```
Build Time:
  1. Next.js renders all pages to HTML
  2. Optimizes images (AVIF/WebP)
  3. Bundles and minifies JS/CSS
  4. Outputs static files to /out

Runtime:
  1. Cloudflare serves static HTML
  2. No React rendering needed (HTML pre-rendered)
  3. React hydrates for interactivity
  4. Minimal JS bundle loaded
```

### Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s | Static HTML, optimized images, preload critical resources |
| **INP** | < 200ms | Code splitting, lazy loading, minimal JS |
| **CLS** | < 0.1 | Sized images, font preloading, no layout shifts |
| **FCP** | < 1.8s | Inline critical CSS, preload fonts |
| **Bundle Size** | < 200KB | Tree-shaking, code splitting, dynamic imports |
| **Lighthouse** | 95+ | All optimizations combined |

### Bundle Size Optimization

```typescript
// Dynamic imports for heavy components
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // Client-side only if needed
})

// Route-based code splitting (automatic with App Router)
// Each page in /app becomes a separate chunk

// Component-level code splitting
const FramerMotion = dynamic(() => import('framer-motion'), {
  ssr: false, // Animations client-side only
})
```

### Image Optimization

```tsx
import Image from 'next/image'

// Automatic AVIF/WebP conversion
<Image
  src="/images/project.jpg"
  alt="Project screenshot"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

**Benefits:**
- AVIF/WebP automatic conversion
- Responsive srcsets
- Lazy loading by default
- Blur-up placeholder
- Size optimization

---

## Project Setup

### 1. Initialize Next.js Project

```bash
# Create Next.js app with TypeScript
npx create-next-app@latest portfolio-redesign --typescript --tailwind --app --src-dir

# Options selected:
# ✓ TypeScript: Yes
# ✓ ESLint: Yes
# ✓ Tailwind CSS: Yes
# ✓ App Router: Yes
# ✓ src/ directory: Yes
# ✓ Import alias (@/*): Yes

cd portfolio-redesign
```

### 2. Install Dependencies

```bash
# UI Components (Shadcn/UI)
npx shadcn-ui@latest init

# Animation library
npm install framer-motion

# Utility libraries
npm install clsx tailwind-merge
npm install date-fns

# Development tools
npm install -D @types/node
npm install -D prettier prettier-plugin-tailwindcss
```

### 3. Configure Static Export

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },
  // Disable features incompatible with static export
  trailingSlash: true,
}

module.exports = nextConfig
```

### 4. Configure TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 5. Set Up Scripts

```json
// package.json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next build && next export",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\""
  }
}
```

---

## Design System (Tailwind Config)

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Pylon-inspired color system
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          50: '#FAF5FF',
          100: '#F3E8FF',
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          900: '#4C1D95',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        // Category colors (content types)
        projects: {
          DEFAULT: '#3B82F6',
          light: '#DBEAFE',
        },
        experience: {
          DEFAULT: '#8B5CF6',
          light: '#F3E8FF',
        },
        education: {
          DEFAULT: '#10B981',
          light: '#D1FAE5',
        },
        achievements: {
          DEFAULT: '#F59E0B',
          light: '#FEF3C7',
        },
        ventures: {
          DEFAULT: '#EC4899',
          light: '#FCE7F3',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        // Fluid typography with clamp()
        'xs': ['clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)', { lineHeight: '1.5' }],
        'sm': ['clamp(0.875rem, 0.8rem + 0.375vw, 1rem)', { lineHeight: '1.5' }],
        'base': ['clamp(1rem, 0.95rem + 0.25vw, 1.125rem)', { lineHeight: '1.5' }],
        'lg': ['clamp(1.125rem, 1rem + 0.625vw, 1.5rem)', { lineHeight: '1.5' }],
        'xl': ['clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem)', { lineHeight: '1.25' }],
        '2xl': ['clamp(1.5rem, 1.3rem + 1vw, 2.25rem)', { lineHeight: '1.25' }],
        '3xl': ['clamp(1.875rem, 1.6rem + 1.375vw, 3rem)', { lineHeight: '1.2' }],
        '4xl': ['clamp(2.25rem, 1.9rem + 1.75vw, 3.75rem)', { lineHeight: '1.1' }],
        '5xl': ['clamp(3rem, 2.5rem + 2.5vw, 4.5rem)', { lineHeight: '1' }],
      },
      spacing: {
        // 4px base unit scale
        '18': '4.5rem',  // 72px
        '22': '5.5rem',  // 88px
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
      },
      keyframes: {
        // Pylon-inspired animations
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-up-bg': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.65, 0.05, 0, 1)',
        'slide-up-bg': 'slide-up-bg 0.735s cubic-bezier(0.65, 0.05, 0, 1)',
      },
      transitionTimingFunction: {
        'pylon': 'cubic-bezier(0.65, 0.05, 0, 1)',
      },
      transitionDuration: {
        '735': '735ms',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

### Global CSS Variables

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Colors */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 262.1 83.3% 57.8%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 262.1 83.3% 57.8%;
    --radius: 1rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 262.1 83.3% 57.8%;
    --primary-foreground: 210 40% 98%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 262.1 83.3% 57.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: 'rlig' 1, 'calt' 1;
  }
}

@layer utilities {
  /* Animation utilities with reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}
```

---

## Component Architecture

### Core Components (Shadcn/UI)

Install base components:

```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add avatar
```

### Custom Button with Pylon Animation

```tsx
// src/components/ui/button.tsx (extend Shadcn version)
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:-translate-y-1 hover:shadow-glow',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 py-2',
        lg: 'h-14 px-8 py-3 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  withAnimation?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, withAnimation = true, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {withAnimation && variant === 'primary' && (
          <span className="absolute inset-0 bg-primary-600 translate-y-full group-hover:translate-y-0 transition-transform duration-735 ease-pylon -z-10" />
        )}
        <span className="relative z-10">{children}</span>
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
```

### Enhanced Card Component

```tsx
// src/components/ui/card.tsx (extend Shadcn version)
import * as React from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  accentColor?: 'projects' | 'experience' | 'education' | 'achievements' | 'ventures'
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable = false, accentColor, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl bg-card text-card-foreground shadow-md transition-all duration-500 ease-pylon',
        hoverable && 'hover:-translate-y-1 hover:shadow-lg cursor-pointer',
        accentColor && {
          'border-l-4 border-projects': accentColor === 'projects',
          'border-l-4 border-experience': accentColor === 'experience',
          'border-l-4 border-education': accentColor === 'education',
          'border-l-4 border-achievements': accentColor === 'achievements',
          'border-l-4 border-ventures': accentColor === 'ventures',
        },
        className
      )}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-bold leading-tight tracking-tight', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

### ProjectCard Component

```tsx
// src/components/domain/ProjectCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github } from 'lucide-react'
import type { Project } from '@/types/project'
import { formatDateRange } from '@/lib/date'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card hoverable accentColor="projects">
      {project.images?.primary && (
        <div className="relative w-full h-48 overflow-hidden rounded-t-2xl">
          <Image
            src={project.images.primary}
            alt={`${project.name} screenshot`}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        </div>
      )}

      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <time className="text-sm text-muted-foreground">
          {formatDateRange(project.startDate, project.endDate)}
        </time>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-base leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        {project.details && project.details.length > 0 && (
          <ul className="space-y-2">
            {project.details.map((detail, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-projects font-bold mt-0.5">→</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className="flex-col items-start gap-4">
        {/* Skills */}
        {project.skills && project.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {project.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-projects-light text-projects">
                {skill}
              </Badge>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-3">
          {project.links?.primary && (
            <Button asChild size="sm">
              <Link href={project.links.primary} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Project
              </Link>
            </Button>
          )}
          {project.links?.others?.find(link => link.includes('github')) && (
            <Button asChild size="sm" variant="secondary">
              <Link
                href={project.links.others.find(link => link.includes('github'))!}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
```

---

## Data Layer & TypeScript

### Type Definitions

```typescript
// src/types/common.ts
export interface Links {
  primary?: string
  others?: string[]
}

export interface Images {
  primary?: string
  others?: string[]
}

export interface DateRange {
  startDate: string
  endDate: string | 'Present'
}
```

```typescript
// src/types/project.ts
import type { Links, Images, DateRange } from './common'

export interface Project extends DateRange {
  name: string
  description: string
  details?: string[]
  skills?: string[]
  images?: Images
  links?: Links
}
```

```typescript
// src/types/experience.ts
import type { Links, Images, DateRange } from './common'

export interface Role extends DateRange {
  title: string
  location?: string
  description: string
  details?: string[]
}

export interface Experience {
  name: string
  about: string
  images?: Images
  links?: Links
  roles: Role[]
}
```

### Data Files (Typed)

```typescript
// src/data/projects.ts
import type { Project } from '@/types/project'

export const projects: Project[] = [
  {
    name: 'Flutter Neumorphic',
    description: 'A complete, ready-to-use Neumorphic UI kit for Flutter.',
    details: [
      'Published on pub.dev with 500+ stars on GitHub',
      'Used in production apps with 1M+ downloads',
      'Comprehensive documentation and examples',
    ],
    skills: ['Flutter', 'Dart', 'UI/UX', 'Open Source'],
    startDate: '2020-01',
    endDate: 'Present',
    images: {
      primary: '/images/projects/flutter-neumorphic.jpg',
    },
    links: {
      primary: 'https://pub.dev/packages/flutter_neumorphic',
      others: ['https://github.com/Dhi13man/flutter_neumorphic'],
    },
  },
  // ... more projects
]
```

### Data Hooks

```typescript
// src/data/hooks.ts
import { projects } from './projects'
import { experiences } from './experience'
import type { Project } from '@/types/project'

export function getActiveProjects(): Project[] {
  return projects.filter(p => p.endDate === 'Present')
}

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectsBySkill(skill: string): Project[] {
  return projects.filter(p => p.skills?.includes(skill))
}

// Similar for other data types...
```

---

## Implementation Phases

### Phase 1: Project Setup (Day 1)

**Tasks:**
- [x] Initialize Next.js 14 with TypeScript
- [x] Configure Tailwind CSS with design tokens
- [x] Set up static export configuration
- [x] Install Shadcn/UI and Framer Motion
- [x] Configure ESLint and Prettier
- [x] Set up folder structure

**Commands:**
```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir
cd portfolio
npx shadcn-ui@latest init
npm install framer-motion clsx tailwind-merge date-fns
```

**Deliverable:** Working development environment with HMR

---

### Phase 2: Design System & Core Components (Days 2-3)

**Tasks:**
- [ ] Configure Tailwind with Pylon-inspired tokens
- [ ] Add global CSS variables
- [ ] Install base Shadcn components (button, card, badge)
- [ ] Customize components with Pylon animations
- [ ] Create utility functions (cn, formatDate)
- [ ] Set up font loading (Inter Variable)

**Deliverable:** Reusable component library with Pylon aesthetics

---

### Phase 3: Data Layer & Types (Day 4)

**Tasks:**
- [ ] Define TypeScript interfaces for all data types
- [ ] Migrate existing data to TypeScript files
- [ ] Create data access hooks
- [ ] Implement date formatting utilities
- [ ] Add data validation (optional: Zod)

**Deliverable:** Type-safe data layer with full IntelliSense

---

### Phase 4: Layout & Navigation (Day 5)

**Tasks:**
- [ ] Create root layout with header/footer
- [ ] Build navigation component with active states
- [ ] Implement mobile menu
- [ ] Add smooth scroll to sections
- [ ] Create container/section components

**Deliverable:** Consistent layout across all pages

---

### Phase 5: Domain Components (Days 6-7)

**Tasks:**
- [ ] ProjectCard with image optimization
- [ ] ExperienceCard with timeline
- [ ] EducationCard with course details
- [ ] AchievementBadge component
- [ ] RecommendationCard component
- [ ] VentureCard component

**Deliverable:** All content types have dedicated components

---

### Phase 6: Pages Implementation (Days 8-10)

**Tasks:**
- [ ] Home/About page with hero section
- [ ] Projects page with filtering
- [ ] Experience page with timeline
- [ ] Education page
- [ ] Achievements page (3-column grid)
- [ ] Recommendations page
- [ ] Ventures page

**Deliverable:** All 7 pages functional and styled

---

### Phase 7: Animations & Interactions (Days 11-12)

**Tasks:**
- [ ] Add Framer Motion to cards (scroll animations)
- [ ] Implement Pylon-style hover effects
- [ ] Add page transitions
- [ ] Create loading skeletons
- [ ] Implement reduced motion support

**Deliverable:** Smooth, delightful interactions throughout

---

### Phase 8: Image Optimization (Day 13)

**Tasks:**
- [ ] Convert all images to AVIF/WebP
- [ ] Generate blur placeholders
- [ ] Implement responsive srcsets
- [ ] Add lazy loading
- [ ] Optimize image sizes

**Deliverable:** Optimized images with blur-up loading

---

### Phase 9: Performance Optimization (Days 14-15)

**Tasks:**
- [ ] Analyze bundle size with @next/bundle-analyzer
- [ ] Implement code splitting for heavy components
- [ ] Add route prefetching on hover
- [ ] Optimize fonts (preload, subset)
- [ ] Extract critical CSS
- [ ] Run Lighthouse audit and fix issues

**Deliverable:** Core Web Vitals targets met

---

### Phase 10: Accessibility Audit (Day 16)

**Tasks:**
- [ ] Verify semantic HTML structure
- [ ] Test keyboard navigation
- [ ] Add skip links
- [ ] Verify color contrast (4.5:1)
- [ ] Test with screen reader (NVDA/VoiceOver)
- [ ] Fix axe DevTools issues

**Deliverable:** WCAG 2.2 AA compliant

---

### Phase 11: Testing & Polish (Days 17-18)

**Tasks:**
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Device testing (desktop, tablet, mobile)
- [ ] Fix visual bugs
- [ ] Refine animations
- [ ] Final content review

**Deliverable:** Production-ready site

---

### Phase 12: Deployment (Day 19-20)

**Tasks:**
- [ ] Build static export (`npm run build`)
- [ ] Test production build locally
- [ ] Deploy to Cloudflare Pages
- [ ] Configure custom domain
- [ ] Set up analytics (optional)
- [ ] Monitor Core Web Vitals

**Deliverable:** Live, performant portfolio

---

## Performance Targets

### Core Web Vitals (75th Percentile)

| Metric | Target | How to Achieve |
|--------|--------|----------------|
| **LCP** | < 2.5s | • Static HTML (pre-rendered)<br>• Optimized images (AVIF/WebP)<br>• Preload critical resources<br>• CDN delivery (Cloudflare) |
| **INP** | < 200ms | • Code splitting<br>• Lazy load off-screen components<br>• Minimal JavaScript bundle<br>• Debounce interactions |
| **CLS** | < 0.1 | • Image dimensions specified<br>• Font preloading<br>• Reserve space for dynamic content<br>• No layout shifts on load |

### Bundle Size Budget

| Asset Type | Budget | Current | Status |
|------------|--------|---------|--------|
| HTML (per page) | < 50KB | TBD | ⏳ |
| CSS (total) | < 100KB | TBD | ⏳ |
| JavaScript (total) | < 150KB | TBD | ⏳ |
| Fonts | < 50KB | TBD | ⏳ |
| Images (per page) | AVIF/WebP | TBD | ⏳ |

### Lighthouse Scores

| Category | Target | Current | Status |
|----------|--------|---------|--------|
| Performance | 95+ | TBD | ⏳ |
| Accessibility | 100 | TBD | ⏳ |
| Best Practices | 100 | TBD | ⏳ |
| SEO | 100 | TBD | ⏳ |

---

## Deployment Strategy

### Build Configuration

```javascript
// next.config.js
module.exports = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96],
  },
  trailingSlash: true,
}
```

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build
# Outputs to /out directory

# Test production build locally
npx serve out

# Deploy to Cloudflare Pages
# Connect GitHub repo to Cloudflare Pages
# Build command: npm run build
# Output directory: out
```

### Cloudflare Pages Configuration

```yaml
# Build settings
Build command: npm run build
Build output directory: out
Root directory: /

# Environment variables
NODE_VERSION: 18
NPM_VERSION: 9

# Headers (_headers file in /public)
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/images/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable
```

---

## Success Criteria

### Technical Excellence

✅ **Performance**
- All Core Web Vitals in green (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- Lighthouse Performance score 95+
- Total bundle size < 300KB
- Time to Interactive < 3s on 4G

✅ **Accessibility**
- WCAG 2.2 AA compliant
- Lighthouse Accessibility score 100
- Keyboard navigable
- Screen reader friendly
- 4.5:1 color contrast minimum

✅ **Code Quality**
- TypeScript with strict mode
- Zero TypeScript errors
- ESLint passing
- Prettier formatted
- No console errors/warnings

✅ **Maintainability**
- Component library documented
- Type-safe data layer
- Consistent design system
- Clean file structure
- Readable, self-documenting code

### User Experience

✅ **Visual Design**
- Pylon-inspired aesthetics
- Smooth animations (60fps)
- Consistent spacing/typography
- Professional polish
- Dark mode support

✅ **Functionality**
- All content renders correctly
- Links work
- Images load with placeholders
- Responsive on all devices
- Works in all major browsers

✅ **Performance Feel**
- Instant page transitions
- Smooth scrolling
- No jank or lag
- Fast image loading
- Responsive interactions

---

## Timeline Summary

| Phase | Duration | Status |
|-------|----------|--------|
| 1. Project Setup | 1 day | ⏳ Pending |
| 2. Design System & Components | 2 days | ⏳ Pending |
| 3. Data Layer & Types | 1 day | ⏳ Pending |
| 4. Layout & Navigation | 1 day | ⏳ Pending |
| 5. Domain Components | 2 days | ⏳ Pending |
| 6. Pages Implementation | 3 days | ⏳ Pending |
| 7. Animations & Interactions | 2 days | ⏳ Pending |
| 8. Image Optimization | 1 day | ⏳ Pending |
| 9. Performance Optimization | 2 days | ⏳ Pending |
| 10. Accessibility Audit | 1 day | ⏳ Pending |
| 11. Testing & Polish | 2 days | ⏳ Pending |
| 12. Deployment | 2 days | ⏳ Pending |
| **Total** | **20 days** | |

---

## Next Steps

1. **Review this implementation plan**
2. **Approve the approach**
3. **Begin Phase 1: Project Setup**

Ready to start building! 🚀
