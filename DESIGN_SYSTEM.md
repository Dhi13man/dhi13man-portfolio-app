# Portfolio Design System & Implementation Guide

**Last Updated:** 2025-11-19
**Version:** 2.0 (Linear Design System)
**Tech Stack:** Next.js 15 + Tailwind CSS + TypeScript + Linear Design Aesthetic

---

## Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Design Philosophy](#design-philosophy)
4. [Design Tokens](#design-tokens)
5. [Components](#components)
6. [Layout System](#layout-system)
7. [Page Patterns](#page-patterns)
8. [Performance Standards](#performance-standards)
9. [Accessibility Requirements](#accessibility-requirements)
10. [Development Guidelines](#development-guidelines)

---

## Overview

### Vision

A modern, high-performance portfolio built with industry-standard technologies, embodying Linear's flat, minimal, information-dense design aesthetic.

### Core Principles

1. **Performance First**: Core Web Vitals compliance (LCP < 2.5s, INP < 200ms, CLS < 0.1)
2. **Accessibility Always**: WCAG 2.2 AA compliance minimum
3. **Linear Aesthetic**: Flat, precise, minimal, no shadows, information-dense
4. **Industry Standards**: Next.js + TypeScript + Tailwind for maximum maintainability
5. **Static Export**: Zero server dependency, deployed to Cloudflare Pages

---

## Technology Stack

### Core Technologies

#### Framework & Language

```plain
- Next.js 15.5.6 (App Router, Static Export)
- React 19.2.0
- TypeScript 5.6.3 (strict mode)
```

**Why Next.js?**

- Industry standard for React applications
- Built-in image optimization
- File-based routing
- Static site generation (`output: 'export'`)
- Zero-config TypeScript support

#### Styling

```plain
- Tailwind CSS 3.4.14 (utility-first)
- Inter font family (from Google Fonts CDN)
```

**Why Tailwind?**

- Linear design tokens map perfectly to utilities
- Rapid development with design consistency
- Tree-shaking eliminates unused classes
- Works seamlessly with Next.js

#### Build & Deploy

```plain
- Node.js 18+
- npm for package management
- Cloudflare Pages for static hosting
```

### Project Structure

```text
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout with fonts, header, footer
│   │   ├── page.tsx            # Home/About page
│   │   ├── projects/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── education/page.tsx
│   │   ├── achievements/page.tsx
│   │   ├── recommendations/page.tsx
│   │   └── ventures/page.tsx
│   │
│   ├── components/
│   │   ├── ui/                 # Linear design components
│   │   │   ├── button.tsx      # Minimal button (4 variants)
│   │   │   ├── panel.tsx       # Flat bordered container
│   │   │   ├── section.tsx     # Full-width page sections
│   │   │   └── timeline.tsx    # Chronological display
│   │   ├── layout/
│   │   │   └── Header.tsx      # Site navigation
│   │   └── domain/             # Content-specific (legacy, not used)
│   │
│   ├── data/                   # TypeScript data files
│   │   ├── about.ts
│   │   ├── projects.ts
│   │   ├── experiences.ts
│   │   ├── education.ts
│   │   ├── achievements.ts
│   │   ├── recommendations.ts
│   │   └── ventures.ts
│   │
│   ├── types/                  # TypeScript interfaces
│   │   ├── common.ts
│   │   ├── project.ts
│   │   ├── experience.ts
│   │   ├── education.ts
│   │   ├── achievement.ts
│   │   ├── recommendation.ts
│   │   └── venture.ts
│   │
│   ├── lib/
│   │   ├── utils.ts            # cn() utility
│   │   └── date.ts             # formatDateRange()
│   │
│   └── styles/
│       └── globals.css         # Tailwind directives + Linear tokens
│
├── public/
│   └── assets/                 # Static images
│       ├── me.webp             # Profile photo
│       ├── projects/
│       ├── work_experiences/
│       └── ...
│
├── tailwind.config.ts          # Linear design tokens
├── next.config.js              # Static export config
└── tsconfig.json               # TypeScript config
```

### Build Configuration

#### next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',              // Static HTML export
  images: {
    unoptimized: true,           // Required for static export
  },
  trailingSlash: true,
  reactStrictMode: true,
}

module.exports = nextConfig
```

#### Build Commands

```bash
npm run dev      # Development server
npm run build    # Production build → /out directory
npm run lint     # ESLint check
```

---

## Design Philosophy

### Linear Aesthetic

**Complete departure from card-based layouts.** The design embodies Linear's principles:

1. **Flat & Minimal**: No shadows, subtle borders only
2. **Precise & Dense**: Tight spacing, grid-aligned everything
3. **Information-First**: Content > decoration
4. **Fast & Snappy**: 150ms transitions, minimal animation
5. **One-Dimensional**: Linear scroll, no complex grids

### Visual Principles

- **Near-black backgrounds** (not pure black like #000)
- **White text with opacity** for hierarchy (not gray colors)
- **Subtle 1px borders** at 8% opacity
- **Minimal accent color** (purple, sparingly used)
- **No card shadows** - completely flat
- **Fixed typography scale** (no fluid clamp)
- **4px spacing base** for tight layouts

---

## Design Tokens

### Colors (Tailwind Config)

#### Background & Surface

```javascript
background: '#0a0a0a',          // Near-black (NOT #000)
surface: '#141414',             // Elevated panels
```

#### Borders

```javascript
border: {
  DEFAULT: 'rgba(255, 255, 255, 0.08)',    // Subtle dividers
  hover: 'rgba(255, 255, 255, 0.15)',      // Hover state
  accent: '#8B5CF6',                        // Purple accent
}
```

#### Text Hierarchy (White + Opacity)

```javascript
text: {
  primary: 'rgba(255, 255, 255, 1.0)',      // 100% - Headings
  secondary: 'rgba(255, 255, 255, 0.7)',    // 70% - Body
  tertiary: 'rgba(255, 255, 255, 0.5)',     // 50% - Labels
  quaternary: 'rgba(255, 255, 255, 0.3)',   // 30% - Subtle hints
}
```

#### Accent Colors (Minimal Use)

```javascript
accent: {
  DEFAULT: '#8B5CF6',           // Purple - primary
  hover: '#9F7AEA',             // Lighter purple
}

status: {
  success: '#10B981',           // Green
  warning: '#F59E0B',           // Amber
  error: '#EF4444',             // Red
  info: '#3B82F6',              // Blue
}

hover: {
  bg: 'rgba(255, 255, 255, 0.05)',  // Subtle highlight
}
```

### Typography

#### Font Families

```javascript
sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
display: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],  // Same font, bold weights
mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
```

#### Font Loading (Google Fonts CDN)

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
```

#### Font Sizes (Fixed, not fluid)

```javascript
'12': ['12px', { lineHeight: '1.5' }],      // Captions, timestamps
'14': ['14px', { lineHeight: '1.5' }],      // Small labels
'16': ['16px', { lineHeight: '1.5' }],      // Base body (default)
'20': ['20px', { lineHeight: '1.5' }],      // Large body
'24': ['24px', { lineHeight: '1.5' }],      // Section headings (h3)
'32': ['32px', { lineHeight: '1.25' }],     // Page section titles (h2)
'48': ['48px', { lineHeight: '1.1' }],      // Page titles (h1)
'64': ['64px', { lineHeight: '1.1' }],      // Hero displays
```

### Spacing (4px Base Unit)

```javascript
'1': '4px',
'2': '8px',
'3': '12px',
'4': '16px',
'6': '24px',
'8': '32px',
'12': '48px',
'16': '64px',
```

### Border Radius (Subtle, Not Rounded)

```javascript
DEFAULT: '8px',       // Standard panels
sm: '4px',            // Small elements
lg: '12px',           // Large panels
none: '0',            // Sharp edges
```

### Transitions (Fast Only)

```javascript
transitionDuration: {
  DEFAULT: '150ms',
  fast: '150ms',
}

transitionTimingFunction: {
  DEFAULT: 'cubic-bezier(0.4, 0, 0.2, 1)',
}
```

### Global CSS

#### src/styles/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-text-primary;
    font-feature-settings: 'rlig' 1, 'calt' 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Linear typography hierarchy */
  h1 {
    @apply font-display text-48 font-bold text-text-primary;
  }

  h2 {
    @apply font-display text-32 font-bold text-text-primary;
  }

  h3 {
    @apply font-sans text-24 font-semibold text-text-primary;
  }

  h4 {
    @apply font-sans text-20 font-semibold text-text-primary;
  }

  p {
    @apply text-16 text-text-secondary;
  }

  a {
    @apply text-accent hover:text-accent-hover transition-colors duration-fast;
  }

  *:focus-visible {
    @apply outline-none ring-2 ring-accent ring-offset-2 ring-offset-background;
  }
}

@layer utilities {
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  /* Linear panel component */
  .panel {
    @apply bg-surface border border-border rounded p-4;
  }

  .panel-hover {
    @apply bg-surface border border-border rounded p-4 transition-all duration-fast;
    @apply hover:border-border-hover hover:bg-hover-bg;
  }

  /* Section divider */
  .section-divider {
    @apply border-t border-border w-full;
  }

  /* Linear-style list marker */
  .list-linear {
    @apply space-y-2;
  }

  .list-linear li {
    @apply flex items-start gap-2 text-text-secondary;
  }

  .list-linear li::before {
    content: '→';
    @apply text-accent font-bold shrink-0;
  }
}
```

---

## Components

### Panel (Replaces Card)

**Purpose**: Flat bordered container, NO shadows

```tsx
// src/components/ui/panel.tsx
const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  ({ hoverable = false, noBorder = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-surface rounded p-4',
          !noBorder && 'border border-border',
          hoverable && 'transition-all duration-fast hover:border-border-hover hover:bg-hover-bg',
        )}
        {...props}
      />
    )
  }
)
```

**Usage**:

```tsx
<Panel hoverable>
  <PanelTitle>Title</PanelTitle>
  <PanelDescription>Description</PanelDescription>
  <PanelContent>Content here</PanelContent>
</Panel>
```

### Section (Full-Width Dividers)

**Purpose**: Page sections with border-top dividers

```tsx
// src/components/ui/section.tsx
const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ noDivider = false, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          'w-full py-12',
          !noDivider && 'border-t border-border',
        )}
        {...props}
      >
        <div className="max-w-[1200px] mx-auto px-8">
          {children}
        </div>
      </section>
    )
  }
)
```

**Usage**:

```tsx
<Section noDivider>  {/* First section, no top border */}
  <SectionHeader>
    <SectionTitle>Section Title</SectionTitle>
    <SectionDescription>Description</SectionDescription>
  </SectionHeader>
  {/* Content */}
</Section>

<Section>  {/* Subsequent sections have border-top */}
  {/* Content */}
</Section>
```

### Timeline (Chronological Display)

**Purpose**: Vertical timeline for Experience/Education/Ventures

```tsx
// src/components/ui/timeline.tsx
<Timeline>
  <TimelineItem isLast={false}>
    <TimelineHeader>
      <TimelineTitle>Role Title</TimelineTitle>
      <TimelineMeta>
        <TimelineDate>Jan 2020 - Present</TimelineDate>
        <TimelineLocation>Location</TimelineLocation>
      </TimelineMeta>
    </TimelineHeader>
    <TimelineContent>
      <TimelineDescription>Description</TimelineDescription>
    </TimelineContent>
  </TimelineItem>
</Timeline>
```

**Visual**:

- Vertical line connecting items
- Dots for milestones
- Precise alignment
- Compact spacing

### Button (Minimal)

**Purpose**: 4 variants - primary, secondary, ghost, link

```tsx
// src/components/ui/button.tsx
<Button variant="primary" size="md">
  Click Me
</Button>

<Button asChild variant="secondary">
  <Link href="/projects">View Projects</Link>
</Button>
```

**Variants**:

- `primary`: Filled accent background
- `secondary`: Border + accent text
- `ghost`: Transparent, hover shows bg
- `link`: Underline on hover

**Sizes**: `sm`, `md`, `lg`

---

## Layout System

### Container Widths

```text
Max width: 1200px (centered)
Horizontal padding:
  - Mobile: 16px (px-4)
  - Tablet: 24px (px-6)
  - Desktop: 32px (px-8)
```

### Section Spacing

```text
Vertical padding: 48px (py-12)
Between sections: Border-top divider (1px, opacity 0.08)
```

### Grid System

**Projects/Lists**: Flat vertical list (NOT grid)

```tsx
<div className="space-y-3">
  {items.map(item => (
    <Panel hoverable key={item.id}>
      {/* Content */}
    </Panel>
  ))}
</div>
```

**Timelines**: Vertical with connecting line

```tsx
<Timeline>
  {items.map((item, i) => (
    <TimelineItem isLast={i === items.length - 1}>
      {/* Content */}
    </TimelineItem>
  ))}
</Timeline>
```

---

## Page Patterns

### Home Page

**Structure**:

1. **Hero Section** (noDivider):
   - Profile photo (circular, 128px, border)
   - Name in text-64 font-display
   - Tagline in text-20
   - Centered layout

2. **About Section**:
   - Section title
   - Multi-paragraph description
   - Max-width: 3xl (768px)
   - Generous line-height

3. **Current Initiatives** (if any):
   - Active Projects (flat list)
   - Active Ventures (flat list)
   - Each in hoverable Panel

**Example**:

```tsx
<Section noDivider className="py-16">
  {/* Profile photo */}
  <div className="relative w-32 h-32 rounded-full border-2 border-border">
    <Image src="/assets/me.webp" alt="Name" fill />
  </div>

  {/* Name & tagline */}
  <h1 className="text-64">Name</h1>
  <p className="text-20">Tagline</p>
</Section>

<Section>
  <SectionTitle>About</SectionTitle>
  <div className="space-y-4">
    {paragraphs.map(p => <p>{p}</p>)}
  </div>
</Section>
```

### Projects Page

**Structure**: Flat list with project panels

```tsx
<div className="space-y-3">
  {projects.map(project => (
    <Panel hoverable>
      <div className="flex gap-4">
        {/* Project image (optional) */}
        {/* Project details */}
        <div>
          <h3>{project.name}</h3>
          <time className="text-12">{dateRange}</time>
          <p className="text-14">{project.description}</p>

          {/* Details list with → arrow */}
          <ul className="space-y-1">
            {project.details.map(detail => (
              <li className="flex gap-2">
                <span className="text-accent">→</span>
                <span className="text-12">{detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  ))}
</div>
```

### Experience/Education/Ventures Pages

**Structure**: Timeline format

```tsx
<Timeline>
  {allRoles.map((role, index) => {
    const showCompanyHeader = index === 0 ||
      role.companyName !== allRoles[index - 1].companyName

    return (
      <TimelineItem isLast={index === allRoles.length - 1}>
        {/* Company header (conditionally shown) */}
        {showCompanyHeader && (
          <div className="mb-3 flex gap-3">
            {/* Company logo */}
            <div className="w-12 h-12">
              <Image src={companyImage} />
            </div>

            {/* Company info */}
            <div>
              <h3 className="text-20">{companyName}</h3>
              <p className="text-14 text-text-tertiary">{about}</p>
            </div>
          </div>
        )}

        {/* Role details */}
        <TimelineHeader>
          <TimelineTitle>{role.title}</TimelineTitle>
          <TimelineDate>{dateRange}</TimelineDate>
        </TimelineHeader>

        <TimelineContent>
          <TimelineDescription>{description}</TimelineDescription>
          {/* Details list */}
        </TimelineContent>
      </TimelineItem>
    )
  })}
</Timeline>
```

### Achievements Page

**Structure**: Three sections with flat lists

```tsx
<Section noDivider>
  <SectionTitle>Achievements</SectionTitle>
</Section>

<Section>
  <h2 className="text-24">Honors & Awards</h2>
  <div className="space-y-3">
    {awards.map(award => (
      <Panel hoverable>
        <h3 className="text-16">{award.title}</h3>
        <p className="text-14 text-text-tertiary">{award.issuer}</p>
        <p className="text-14">{award.description}</p>
      </Panel>
    ))}
  </div>
</Section>

<Section>
  <h2 className="text-24">Licenses & Certifications</h2>
  {/* Similar structure */}
</Section>

<Section>
  <h2 className="text-24">Test Scores</h2>
  {/* Similar structure */}
</Section>
```

### Recommendations Page

**Structure**: Quotation-style panels

```tsx
<div className="space-y-4">
  {recommendations.map(rec => (
    <Panel hoverable>
      <blockquote className="text-16 italic border-l-2 border-accent pl-4">
        {rec.text}
      </blockquote>
      <p className="text-14 font-semibold">{rec.from}</p>
    </Panel>
  ))}
</div>
```

---

## Performance Standards

### Core Web Vitals Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s | Static HTML, optimized images, preload fonts |
| **INP** | < 200ms | Minimal JS, fast transitions |
| **CLS** | < 0.1 | Sized images, no layout shifts |

### Current Performance

```text
Build Output (Nov 2025):
Route                    Size    First Load JS
/                       162 B   106 kB
/achievements           127 B   102 kB
/education              180 B   111 kB
/experience             180 B   111 kB
/projects               180 B   111 kB
/recommendations        127 B   102 kB
/ventures               180 B   111 kB

Total First Load JS: ~102-111 kB per page ✅
All pages statically exported ✅
```

### Optimization Checklist

- ✅ Static HTML export (no server)
- ✅ Images use Next/Image (automatic optimization)
- ✅ Fonts loaded from CDN with system fallbacks
- ✅ Minimal animations (150ms transitions only)
- ✅ No heavy shadows or blurs
- ✅ Fast transitions (transform/opacity only)
- ✅ Reduced motion support
- ✅ Hydration warning fixed (suppressHydrationWarning on footer date)

---

## Accessibility Requirements

### WCAG 2.2 AA Compliance

**Implemented**:

- ✅ Semantic HTML (h1-h6 hierarchy)
- ✅ Focus indicators (ring-2 ring-accent)
- ✅ Keyboard navigation (all interactive elements)
- ✅ Alt text on images
- ✅ Color contrast (white on near-black = 18:1 ratio)
- ✅ Reduced motion support
- ✅ Screen reader friendly (proper landmarks)

**Testing Tools**:

- axe DevTools
- Lighthouse Accessibility audit
- NVDA/VoiceOver screen readers
- Keyboard-only navigation

---

## Development Guidelines

### Adding New Pages

1. Create `src/app/[page-name]/page.tsx`
2. Use Section/Panel components
3. Add to navigation in `src/components/layout/Header.tsx`
4. Follow Linear design patterns (flat, minimal)

### Adding New Data

1. Define TypeScript interface in `src/types/`
2. Create data file in `src/data/`
3. Export typed array
4. Import in page component

### Styling Guidelines

**DO**:

- Use Tailwind utilities
- Use design tokens from tailwind.config.ts
- Keep layouts flat (no nested cards)
- Use opacity for text hierarchy
- Use 4px spacing scale

**DON'T**:

- Add shadows (except focus rings)
- Use arbitrary values (stick to tokens)
- Create complex grids (flat lists preferred)
- Use heavy animations
- Use pure black (#000) or pure white (#fff)

### Component Patterns

**Hoverable Panel**:

```tsx
<Panel hoverable>
  {/* Content */}
</Panel>
```

**Section with Header**:

```tsx
<Section>
  <SectionHeader>
    <SectionTitle>Title</SectionTitle>
    <SectionDescription>Description</SectionDescription>
  </SectionHeader>
  {/* Content */}
</Section>
```

**List with Arrow Bullets**:

```tsx
<ul className="space-y-2">
  {items.map(item => (
    <li className="flex items-start gap-2 text-14">
      <span className="text-accent font-bold shrink-0">→</span>
      <span>{item}</span>
    </li>
  ))}
</ul>
```

### Build & Deploy Workflow

**Local Development**:

```bash
npm run dev           # http://localhost:3000
```

**Production Build**:

```bash
npm run build         # Builds to /out directory
```

**Cloudflare Pages Configuration**:

```text
Build command: npm run build
Build output directory: out
Root directory: /
Environment variables:
  NODE_VERSION: 18
```

---

## Troubleshooting

### Common Issues

#### 1. Hydration Warnings

- Use `suppressHydrationWarning` on elements with dynamic content (like dates)
- Example: `<p suppressHydrationWarning>{new Date().getFullYear()}</p>`

#### 2. Image Paths

- Always use absolute paths: `/assets/image.webp`
- Never prepend slash in components: `src={imagePath}` (NOT `src={`/${imagePath}`}`)

#### 3. Type Errors

- Ensure all data matches TypeScript interfaces
- Check optional fields with `?.` operator
- Verify array methods return correct types

#### 4. Build Failures

- Check ESLint errors: `npm run lint`
- Verify all imports are correct
- Ensure no TypeScript errors: `npx tsc --noEmit`

---

## Future Enhancements

### Potential Additions

- Dark mode toggle (currently always dark)
- Animations on scroll (Intersection Observer)
- Search/filter functionality
- Analytics integration
- Contact form
- Blog section

### Design System Extensions

- Loading skeletons
- Toast notifications
- Modal dialogs
- Dropdown menus
- Tabs component

---

## References

- **Linear Design**: <https://linear.app/>
- **Next.js Docs**: <https://nextjs.org/docs>
- **Tailwind Docs**: <https://tailwindcss.com/docs>
- **Inter Font**: <https://rsms.me/inter/>
- **WCAG 2.2**: <https://www.w3.org/TR/WCAG22/>

---

**Document Status**: Complete ✅
**Last Verified**: 2025-11-19
**Maintained By**: Portfolio development team
