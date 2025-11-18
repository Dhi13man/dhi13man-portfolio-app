# Portfolio Redesign Implementation Plan
## Inspired by Pylon's Modern Design Language

**Created:** 2025-11-18
**Target Completion:** TBD
**Status:** Planning Phase

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Design Analysis: Pylon](#design-analysis-pylon)
3. [Current Portfolio Assessment](#current-portfolio-assessment)
4. [Technology Stack Decision](#technology-stack-decision)
5. [Design System Specification](#design-system-specification)
6. [Component Architecture](#component-architecture)
7. [Implementation Roadmap](#implementation-roadmap)
8. [Performance Standards](#performance-standards)
9. [Accessibility Requirements](#accessibility-requirements)
10. [Success Metrics](#success-metrics)

---

## Executive Summary

### Vision
Transform the current portfolio into a modern, performant, and accessible showcase that embodies cutting-edge web development practices while maintaining clean, maintainable code. Inspired by Pylon's geometric visual language and smooth interactions, but uniquely tailored for a developer portfolio.

### Core Principles
1. **Performance First**: Core Web Vitals compliance (LCP < 2.5s, INP < 200ms, CLS < 0.1)
2. **Accessibility Always**: WCAG 2.2 AA compliance minimum
3. **Modern Standards**: Leveraging 2025 CSS/JS capabilities
4. **Maintainability**: Clean, readable code with minimal complexity
5. **Progressive Enhancement**: Works without JavaScript, enhanced with it

### Key Objectives
- Reduce initial load time by 40%+
- Achieve all-green Lighthouse scores
- Implement smooth, delightful micro-interactions
- Ensure keyboard and screen reader navigation excellence
- Create a cohesive design system for consistency

---

## Design Analysis: Pylon

### Visual Language Extracted

#### 1. Geometric Iconography
```
Pylon uses SVG geometric shapes as brand elements:
- Hexagons (rotated on hover)
- Cubes (3D perspective with rotation)
- Grids (dynamic line patterns)
- Diamonds (scale and rotate transforms)

Application to Portfolio:
- Use geometric shapes as section dividers
- Animated icons for skills/technologies
- Geometric backgrounds for project cards
- SVG illustrations for achievements
```

#### 2. Color Philosophy
```css
/* Pylon's Color Strategy */
Primary Brand: #5B0EFF (Vibrant Purple)
Card Accents:
  - Yellow: #FFEB3B (Energy, Optimism)
  - Topaz: #FF9800 (Warmth, Creativity)
  - Ember: #FF5722 (Passion, Impact)
  - Alloy: #607D8B (Stability, Trust)

Our Adaptation:
Primary: #5d00ff (Keep similar purple for consistency)
Accents: Use color to categorize content types
  - Projects: Vibrant blue (#3B82F6)
  - Experience: Deep purple (#8B5CF6)
  - Education: Emerald green (#10B981)
  - Achievements: Amber (#F59E0B)
```

#### 3. Typography System
```css
/* Pylon's Approach */
font-feature-settings: "ss06"; /* Stylistic set */
Font Sizing: Viewport-based with clamp()
Hierarchy: Clear h1 > h2 > h3 > small progression

Our Implementation:
Base: System font stack (performance + native feel)
Accent: Variable font for headings (flexibility)
Sizing: Fluid typography with clamp()
Rhythm: Consistent line-height scale (1.2, 1.5, 1.75)
```

#### 4. Interaction Patterns
```css
/* Pylon's Signature Animation */
--cubic-default: cubic-bezier(0.65, 0.05, 0, 1);
--duration-default: 0.735s;

Hover Effects:
- Cards: translateY(-4px) + shadow increase
- Buttons: Background slide-up using ::before
- Icons: Rotate, scale, transform animations
- Links: Underline slide-in effect

Our Adaptation:
- Use same easing curve for brand consistency
- Apply to cards, buttons, navigation
- Add reduced-motion fallbacks
- Ensure performance (transform/opacity only)
```

#### 5. Layout Structure
```
Pylon's Grid System:
- Container with max-width
- Responsive grid: auto-fill/auto-fit minmax
- Spacer components for vertical rhythm
- Full-bleed sections with constrained content

Our Implementation:
- CSS Container Queries for true component responsiveness
- CSS Grid with subgrid for alignment
- Consistent spacing scale (4px base unit)
- Modular sections that work independently
```

#### 6. Component Philosophy
```
Pylon's Components:
1. Cards with hover states and background overlays
2. Navigation with active state indicators
3. Dropdown menus with smooth transitions
4. Image/video backgrounds with overlay gradients
5. Form inputs with focus states
6. Slider/carousel with custom controls

Our Portfolio Needs:
1. Project cards with image, tech stack, links
2. Experience timeline with company logos
3. Skill tags with proficiency indicators
4. Achievement badges with details
5. Recommendation cards with avatars
6. Navigation with smooth section scrolling
```

---

## Current Portfolio Assessment

### Strengths to Preserve
✅ **Clean data layer separation** - Keep this architecture
✅ **Component-based structure** - Enhance and modernize
✅ **Responsive design** - Upgrade to modern standards
✅ **Semantic HTML** - Maintain and improve
✅ **No framework dependency** - Good for performance

### Areas for Improvement
❌ **Visual design feels dated** - Needs modern aesthetic
❌ **Limited micro-interactions** - Add delightful animations
❌ **Inconsistent spacing** - Implement design tokens
❌ **Basic accessibility** - Upgrade to WCAG 2.2 AA
❌ **No build optimization** - Add for production
❌ **Large image files** - Optimize formats and sizes
❌ **Inline styles in JS** - Move to CSS with proper classes

### Technical Debt
1. Mixed CSS methodologies across pages
2. Font loading from multiple CDNs
3. No critical CSS extraction
4. JavaScript renders all content (not SEO friendly)
5. No lazy loading for images
6. Redundant CSS across page files

---

## Technology Stack Decision

### Decision Framework Applied

```
Site Complexity: Medium (7 pages, dynamic rendering)
Interactivity: Low-Medium (navigation, filtering, animations)
Content Updates: Occasional (JSON data files)
Performance Requirements: High (portfolio showcase)
Team Size: Solo developer
Hosting: Cloudflare Pages
```

### Selected Stack

#### Core Technologies
```
HTML: Semantic HTML5 (progressive enhancement)
CSS: Modern CSS (no preprocessor needed)
  - Native nesting
  - CSS Custom Properties
  - Container Queries
  - CSS Grid + Subgrid
JavaScript: Vanilla ES6+ (no framework)
  - ES Modules
  - Progressive enhancement
  - Feature detection
```

#### Build Tools (Lightweight)
```
Vite: Development server + production builds
  - Fast HMR for development
  - Automatic code splitting
  - Asset optimization
  - No complex configuration needed

PostCSS: Minimal processing
  - Autoprefixer only
  - No Sass/Less complexity
```

#### Asset Pipeline
```
Images: Sharp (via Vite plugin)
  - AVIF generation
  - WebP fallbacks
  - Responsive srcsets
  - Automatic optimization

Fonts: Variable fonts self-hosted
  - Subset to required characters
  - WOFF2 format
  - Preload critical fonts
```

### Rationale Document

**Why NOT React/Vue/Svelte?**
- Portfolio doesn't need complex state management
- Content is mostly static (data from JSON)
- Vanilla JS keeps bundle size minimal
- Easier to showcase actual web fundamentals
- Faster initial page load (no framework bootstrap)

**Why Vite?**
- Zero-config for simple projects
- Fast development experience (HMR)
- Production optimizations (minification, tree-shaking)
- Asset pipeline (images, fonts)
- Can be removed later if needed (outputs standard files)

**Why Modern CSS over Tailwind/Sass?**
- Native nesting eliminates Sass need
- CSS Custom Properties for theming
- Smaller bundle (no utility class bloat)
- Better for learning and showcasing CSS skills
- Container queries not possible in Tailwind v3

**Why NOT Static Site Generator?**
- Only 7 pages (not enough to justify complexity)
- Data layer already structured as JSON
- Want full control over rendering logic
- Cloudflare Pages handles static hosting well
- Can add SSG later if content scales

---

## Design System Specification

### 1. Color System

#### Primitive Tokens
```css
:root {
  /* Grayscale */
  --gray-50: #F9FAFB;
  --gray-100: #F3F4F6;
  --gray-200: #E5E7EB;
  --gray-300: #D1D5DB;
  --gray-400: #9CA3AF;
  --gray-500: #6B7280;
  --gray-600: #4B5563;
  --gray-700: #374151;
  --gray-800: #1F2937;
  --gray-900: #111827;
  --gray-950: #030712;

  /* Primary (Purple - inspired by Pylon) */
  --purple-50: #FAF5FF;
  --purple-100: #F3E8FF;
  --purple-500: #8B5CF6;
  --purple-600: #7C3AED;
  --purple-700: #6D28D9;
  --purple-900: #4C1D95;

  /* Accent Colors */
  --blue-500: #3B82F6;
  --blue-600: #2563EB;
  --emerald-500: #10B981;
  --emerald-600: #059669;
  --amber-500: #F59E0B;
  --amber-600: #D97706;
}
```

#### Semantic Tokens
```css
:root {
  /* Surfaces */
  --color-background: var(--gray-50);
  --color-surface: #FFFFFF;
  --color-surface-hover: var(--gray-100);
  --color-overlay: rgba(0, 0, 0, 0.5);

  /* Text */
  --color-text-primary: var(--gray-900);
  --color-text-secondary: var(--gray-600);
  --color-text-tertiary: var(--gray-500);
  --color-text-on-primary: #FFFFFF;

  /* Brand */
  --color-primary: var(--purple-600);
  --color-primary-hover: var(--purple-700);
  --color-primary-light: var(--purple-100);

  /* Semantic */
  --color-success: var(--emerald-500);
  --color-warning: var(--amber-500);
  --color-error: #EF4444;
  --color-info: var(--blue-500);

  /* Interactive */
  --color-link: var(--purple-600);
  --color-link-hover: var(--purple-700);
  --color-focus: var(--purple-600);

  /* Borders */
  --color-border: var(--gray-200);
  --color-border-hover: var(--gray-300);
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-background: var(--gray-950);
    --color-surface: var(--gray-900);
    --color-surface-hover: var(--gray-800);
    --color-text-primary: var(--gray-50);
    --color-text-secondary: var(--gray-400);
    --color-text-tertiary: var(--gray-500);
    --color-border: var(--gray-700);
    --color-border-hover: var(--gray-600);
  }
}
```

#### Category Colors (Content Type)
```css
:root {
  --color-projects: var(--blue-500);
  --color-experience: var(--purple-500);
  --color-education: var(--emerald-500);
  --color-achievements: var(--amber-500);
  --color-ventures: #EC4899; /* Pink */
  --color-recommendations: #8B5CF6; /* Purple variant */
}
```

### 2. Typography System

#### Font Stack
```css
:root {
  /* System font stack for body - performance & native feel */
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI',
               Roboto, 'Helvetica Neue', Arial, sans-serif,
               'Apple Color Emoji', 'Segoe UI Emoji';

  /* Display font for headings - character & personality */
  --font-display: 'Inter Variable', var(--font-sans);

  /* Monospace for code */
  --font-mono: ui-monospace, 'Cascadia Code', 'Source Code Pro',
               Menlo, Monaco, Consolas, monospace;
}
```

#### Font Sizes (Fluid Typography)
```css
:root {
  /* Base: 16px */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);      /* 12-14px */
  --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem);        /* 14-16px */
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);      /* 16-18px */
  --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.5rem);        /* 18-24px */
  --text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.875rem);      /* 20-30px */
  --text-2xl: clamp(1.5rem, 1.3rem + 1vw, 2.25rem);          /* 24-36px */
  --text-3xl: clamp(1.875rem, 1.6rem + 1.375vw, 3rem);       /* 30-48px */
  --text-4xl: clamp(2.25rem, 1.9rem + 1.75vw, 3.75rem);      /* 36-60px */
  --text-5xl: clamp(3rem, 2.5rem + 2.5vw, 4.5rem);           /* 48-72px */
}
```

#### Line Heights
```css
:root {
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

#### Font Weights
```css
:root {
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}
```

#### Letter Spacing
```css
:root {
  --tracking-tighter: -0.05em;
  --tracking-tight: -0.025em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

### 3. Spacing System (4px base unit)

```css
:root {
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
}
```

#### Semantic Spacing
```css
:root {
  --spacing-section: var(--space-20);
  --spacing-component: var(--space-12);
  --spacing-element: var(--space-6);
  --spacing-inline: var(--space-4);
}
```

### 4. Shadows & Elevation

```css
:root {
  /* Subtle shadows for depth */
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1),
                 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
               0 2px 4px -2px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
               0 4px 6px -4px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
               0 8px 10px -6px rgba(0, 0, 0, 0.1);

  /* Colored shadow for primary elements */
  --shadow-primary: 0 10px 25px -5px rgba(139, 92, 246, 0.3);
}
```

### 5. Border Radius

```css
:root {
  --radius-none: 0;
  --radius-sm: 0.25rem;    /* 4px */
  --radius-base: 0.5rem;   /* 8px */
  --radius-md: 0.75rem;    /* 12px */
  --radius-lg: 1rem;       /* 16px */
  --radius-xl: 1.5rem;     /* 24px */
  --radius-2xl: 2rem;      /* 32px */
  --radius-full: 9999px;   /* Circular */
}
```

### 6. Animation & Transitions

```css
:root {
  /* Durations */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --duration-slower: 735ms; /* Pylon's signature duration */

  /* Easing curves */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-pylon: cubic-bezier(0.65, 0.05, 0, 1); /* Pylon's signature easing */

  /* Combined transitions */
  --transition-fast: all var(--duration-fast) var(--ease-out);
  --transition-base: all var(--duration-base) var(--ease-out);
  --transition-slow: all var(--duration-slow) var(--ease-pylon);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast: 0ms;
    --duration-base: 0ms;
    --duration-slow: 0ms;
    --duration-slower: 0ms;
  }
}
```

### 7. Breakpoints

```css
:root {
  --breakpoint-sm: 640px;   /* Mobile landscape */
  --breakpoint-md: 768px;   /* Tablet portrait */
  --breakpoint-lg: 1024px;  /* Tablet landscape */
  --breakpoint-xl: 1280px;  /* Desktop */
  --breakpoint-2xl: 1536px; /* Large desktop */
}
```

### 8. Container Widths

```css
:root {
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
  --container-2xl: 1536px;
  --container-full: 100%;
}
```

### 9. Z-Index Scale

```css
:root {
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-fixed: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-popover: 600;
  --z-tooltip: 700;
}
```

---

## Component Architecture

### Component Library Structure

```
src/
├── components/
│   ├── core/              # Foundational components
│   │   ├── Button.js      # Primary, secondary, ghost variants
│   │   ├── Card.js        # Base card with hover states
│   │   ├── Badge.js       # Skill tags, labels
│   │   ├── Link.js        # Internal and external links
│   │   └── Icon.js        # SVG icon wrapper
│   │
│   ├── layout/            # Structural components
│   │   ├── Container.js   # Max-width container
│   │   ├── Grid.js        # Responsive grid
│   │   ├── Section.js     # Page sections with spacing
│   │   ├── Spacer.js      # Vertical rhythm
│   │   └── Header.js      # Site header/navigation
│   │
│   ├── domain/            # Portfolio-specific components
│   │   ├── ProjectCard.js
│   │   ├── ExperienceCard.js
│   │   ├── EducationCard.js
│   │   ├── AchievementBadge.js
│   │   ├── RecommendationCard.js
│   │   ├── VentureCard.js
│   │   └── SkillTag.js
│   │
│   └── media/             # Media components
│       ├── ResponsiveImage.js
│       ├── ImageGallery.js
│       └── VideoBackground.js
│
└── styles/
    ├── tokens.css         # Design system tokens
    ├── reset.css          # CSS reset/normalize
    ├── typography.css     # Type styles
    ├── utilities.css      # Utility classes
    └── components/        # Component-specific styles
        ├── button.css
        ├── card.css
        └── ...
```

### Core Component Specifications

#### 1. Button Component
```javascript
// src/components/core/Button.js

/**
 * Button component with variants
 * @param {Object} props
 * @param {string} props.variant - 'primary' | 'secondary' | 'ghost'
 * @param {string} props.size - 'sm' | 'md' | 'lg'
 * @param {string} props.href - Optional link
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.disabled
 * @param {string} props.children - Button text/content
 */
export function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  children,
  ...props
}) {
  const className = `button button--${variant} button--${size}`;

  if (href) {
    return `
      <a href="${href}" class="${className}" ${disabled ? 'aria-disabled="true"' : ''} ${Object.entries(props).map(([k, v]) => `${k}="${v}"`).join(' ')}>
        <span class="button__text">${children}</span>
        <span class="button__bg"></span>
      </a>
    `;
  }

  return `
    <button
      type="button"
      class="${className}"
      ${disabled ? 'disabled' : ''}
      ${onClick ? `onclick="${onClick}"` : ''}
      ${Object.entries(props).map(([k, v]) => `${k}="${v}"`).join(' ')}
    >
      <span class="button__text">${children}</span>
      <span class="button__bg"></span>
    </button>
  `;
}
```

```css
/* src/styles/components/button.css */

.button {
  /* Reset */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  text-decoration: none;
  font-family: inherit;

  /* Base styles */
  position: relative;
  overflow: hidden;
  font-weight: var(--font-semibold);
  border-radius: var(--radius-lg);
  transition: transform var(--transition-base);

  /* Ensure text is above background */
  & .button__text {
    position: relative;
    z-index: 1;
    transition: color var(--transition-base);
  }

  /* Animated background */
  & .button__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    transform: translateY(100%);
    transition: transform var(--duration-slower) var(--ease-pylon);
  }

  &:hover .button__bg {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
}

/* Variants */
.button--primary {
  background: var(--color-primary);
  color: var(--color-text-on-primary);

  & .button__bg {
    background: var(--color-primary-hover);
  }
}

.button--secondary {
  background: var(--color-surface);
  color: var(--color-primary);
  border: 1px solid var(--color-border);

  & .button__bg {
    background: var(--color-primary-light);
  }

  &:hover {
    border-color: var(--color-primary);
  }
}

.button--ghost {
  background: transparent;
  color: var(--color-primary);

  & .button__bg {
    background: var(--color-primary-light);
  }
}

/* Sizes */
.button--sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
}

.button--md {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
}

.button--lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .button {
    transition: none;

    & .button__bg {
      display: none;
    }

    &:hover {
      opacity: 0.8;
    }
  }
}
```

#### 2. Card Component
```javascript
// src/components/core/Card.js

/**
 * Card component with optional hover effects
 * @param {Object} props
 * @param {boolean} props.hoverable - Enable hover lift effect
 * @param {string} props.accentColor - Left border accent color
 * @param {string} props.children - Card content
 */
export function Card({
  hoverable = true,
  accentColor,
  className = '',
  children,
  ...props
}) {
  const classes = [
    'card',
    hoverable ? 'card--hoverable' : '',
    accentColor ? `card--accent-${accentColor}` : '',
    className
  ].filter(Boolean).join(' ');

  return `
    <div class="${classes}" ${Object.entries(props).map(([k, v]) => `${k}="${v}"`).join(' ')}>
      ${children}
    </div>
  `;
}
```

```css
/* src/styles/components/card.css */

.card {
  background: var(--color-surface);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  box-shadow: var(--shadow-base);
  transition: var(--transition-slow);

  /* Prevent layout shift on hover */
  will-change: transform, box-shadow;
}

.card--hoverable {
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
  }
}

/* Accent border variants */
.card--accent-projects {
  border-left: 4px solid var(--color-projects);
}

.card--accent-experience {
  border-left: 4px solid var(--color-experience);
}

.card--accent-education {
  border-left: 4px solid var(--color-education);
}

.card--accent-achievements {
  border-left: 4px solid var(--color-achievements);
}

/* Card header/body/footer sections */
.card__header {
  margin-bottom: var(--space-6);
}

.card__title {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.card__subtitle {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
}

.card__body {
  margin-bottom: var(--space-6);
}

.card__footer {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding-top: var(--space-6);
  border-top: 1px solid var(--color-border);
}
```

#### 3. Badge Component (Skills/Tags)
```javascript
// src/components/core/Badge.js

/**
 * Badge component for tags, labels, skills
 * @param {Object} props
 * @param {string} props.variant - 'default' | 'primary' | 'success' | 'warning'
 * @param {string} props.size - 'sm' | 'md'
 * @param {string} props.children - Badge text
 */
export function Badge({
  variant = 'default',
  size = 'md',
  children,
  ...props
}) {
  return `
    <span class="badge badge--${variant} badge--${size}" ${Object.entries(props).map(([k, v]) => `${k}="${v}"`).join(' ')}>
      ${children}
    </span>
  `;
}
```

```css
/* src/styles/components/badge.css */

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  font-weight: var(--font-medium);
  white-space: nowrap;
}

/* Sizes */
.badge--sm {
  padding: var(--space-1) var(--space-3);
  font-size: var(--text-xs);
}

.badge--md {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
}

/* Variants */
.badge--default {
  background: var(--gray-100);
  color: var(--gray-700);
}

.badge--primary {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.badge--success {
  background: #D1FAE5;
  color: var(--emerald-600);
}

.badge--warning {
  background: #FEF3C7;
  color: var(--amber-600);
}

@media (prefers-color-scheme: dark) {
  .badge--default {
    background: var(--gray-800);
    color: var(--gray-300);
  }
}
```

### Domain Component Specifications

#### 1. ProjectCard Component
```javascript
// src/components/domain/ProjectCard.js

import { Card } from '../core/Card.js';
import { Badge } from '../core/Badge.js';
import { ResponsiveImage } from '../media/ResponsiveImage.js';

/**
 * Project card with image, description, tech stack, links
 */
export function ProjectCard({
  name,
  description,
  details = [],
  skills = [],
  images,
  links,
  startDate,
  endDate
}) {
  const skillBadges = skills.map(skill =>
    Badge({ variant: 'primary', size: 'sm', children: skill })
  ).join('');

  const detailsList = details.length > 0 ? `
    <ul class="project-card__details">
      ${details.map(detail => `<li>${detail}</li>`).join('')}
    </ul>
  ` : '';

  const projectLinks = `
    <div class="project-card__links">
      ${links.primary ? `
        <a href="${links.primary}" class="link link--primary" target="_blank" rel="noopener noreferrer">
          View Project →
        </a>
      ` : ''}
      ${links.others && links.others.length > 0 ? links.others.map(link => `
        <a href="${link}" class="link link--secondary" target="_blank" rel="noopener noreferrer">
          ${new URL(link).hostname}
        </a>
      `).join('') : ''}
    </div>
  `;

  const dateRange = `
    <time class="project-card__date" datetime="${startDate}">
      ${formatDateRange(startDate, endDate)}
    </time>
  `;

  return Card({
    hoverable: true,
    accentColor: 'projects',
    children: `
      ${images?.primary ? ResponsiveImage({
        src: images.primary,
        alt: `${name} screenshot`,
        className: 'project-card__image'
      }) : ''}

      <div class="card__header">
        <h3 class="card__title">${name}</h3>
        ${dateRange}
      </div>

      <div class="card__body">
        <p class="project-card__description">${description}</p>
        ${detailsList}
      </div>

      <div class="card__footer">
        <div class="project-card__skills">
          ${skillBadges}
        </div>
      </div>

      ${projectLinks}
    `
  });
}

function formatDateRange(start, end) {
  if (end === 'Present') {
    return `${start} - Present`;
  }
  return `${start} - ${end}`;
}
```

```css
/* src/styles/components/project-card.css */

.project-card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-6);
}

.project-card__date {
  display: block;
  font-size: var(--text-sm);
  color: var(--color-text-tertiary);
  margin-top: var(--space-2);
}

.project-card__description {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin-bottom: var(--space-4);
}

.project-card__details {
  list-style: none;
  padding: 0;
  margin: 0;

  & li {
    position: relative;
    padding-left: var(--space-6);
    margin-bottom: var(--space-2);
    color: var(--color-text-secondary);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);

    &::before {
      content: '→';
      position: absolute;
      left: 0;
      color: var(--color-projects);
      font-weight: var(--font-bold);
    }
  }
}

.project-card__skills {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.project-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-top: var(--space-6);
}

.link {
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
  text-decoration: none;
  transition: var(--transition-base);

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid var(--color-focus);
    outline-offset: 2px;
    border-radius: var(--radius-sm);
  }
}

.link--primary {
  color: var(--color-primary);
}

.link--secondary {
  color: var(--color-text-secondary);
}
```

---

## Implementation Roadmap

### Phase 1: Foundation (Week 1)
**Goal:** Set up modern development environment and design system

#### Tasks:
1. **Project Setup**
   - [ ] Initialize Vite project
   - [ ] Configure PostCSS with Autoprefixer
   - [ ] Set up file structure
   - [ ] Configure Cloudflare Pages deployment

2. **Design System Implementation**
   - [ ] Create `tokens.css` with all design variables
   - [ ] Implement CSS reset/normalize
   - [ ] Build typography system
   - [ ] Create utility classes

3. **Asset Optimization Setup**
   - [ ] Convert all images to AVIF/WebP
   - [ ] Generate responsive image srcsets
   - [ ] Subset and self-host fonts
   - [ ] Optimize SVG icons

#### Success Criteria:
- Development server runs with HMR
- Design tokens accessible via CSS variables
- All images optimized and in modern formats
- Fonts loading optimally

---

### Phase 2: Core Components (Week 2)
**Goal:** Build reusable component library

#### Tasks:
1. **Core Components**
   - [ ] Button (all variants + hover effects)
   - [ ] Card (with Pylon-inspired hover lift)
   - [ ] Badge (skill tags, labels)
   - [ ] Link (internal/external with icons)
   - [ ] Icon wrapper

2. **Layout Components**
   - [ ] Container (responsive max-width)
   - [ ] Grid (with CSS Grid + Container Queries)
   - [ ] Section (consistent spacing)
   - [ ] Spacer (vertical rhythm)
   - [ ] Header/Navigation

3. **Component Testing**
   - [ ] Create component showcase page
   - [ ] Test all variants and states
   - [ ] Verify responsive behavior
   - [ ] Check accessibility (keyboard, screen reader)

#### Success Criteria:
- All core components render correctly
- Hover effects smooth and performant
- Components work independently
- Accessibility verified

---

### Phase 3: Domain Components (Week 3)
**Goal:** Build portfolio-specific components

#### Tasks:
1. **Project Components**
   - [ ] ProjectCard (with animated hover)
   - [ ] ProjectGrid (responsive layout)
   - [ ] ProjectFilter (by tech/category)

2. **Experience Components**
   - [ ] ExperienceCard (company + roles)
   - [ ] ExperienceTimeline
   - [ ] CompanyLogo component

3. **Education Components**
   - [ ] EducationCard (institution + courses)
   - [ ] CourseDetails

4. **Achievement Components**
   - [ ] AchievementBadge (awards, certs, scores)
   - [ ] AchievementGrid

5. **Other Components**
   - [ ] RecommendationCard
   - [ ] VentureCard
   - [ ] SkillTag with proficiency indicator

#### Success Criteria:
- All content types have dedicated components
- Components consume data layer seamlessly
- Designs match Pylon-inspired aesthetic
- Interactions feel smooth and delightful

---

### Phase 4: Page Implementation (Week 4)
**Goal:** Rebuild all 7 pages with new components

#### Tasks:
1. **Home/About Page**
   - [ ] Hero section with geometric background
   - [ ] Bio and tagline
   - [ ] Current initiatives (filtered)
   - [ ] Call-to-action sections

2. **Projects Page**
   - [ ] Project grid with category filters
   - [ ] Featured project highlight
   - [ ] Load more/pagination

3. **Experience Page**
   - [ ] Timeline layout
   - [ ] Company cards with roles
   - [ ] Expandable role details

4. **Education Page**
   - [ ] Institution cards
   - [ ] Course achievements
   - [ ] Academic highlights

5. **Achievements Page**
   - [ ] Three-column grid (awards, certs, scores)
   - [ ] Badge-style display
   - [ ] Expandable details

6. **Recommendations Page**
   - [ ] Testimonial cards
   - [ ] Avatar placeholders
   - [ ] Link to recommender profiles

7. **Ventures Page**
   - [ ] Venture cards with roles
   - [ ] Entrepreneurial timeline

#### Success Criteria:
- All pages functional and content-complete
- Navigation between pages works smoothly
- Content renders from data layer
- Responsive on all breakpoints

---

### Phase 5: Animations & Interactions (Week 5)
**Goal:** Add delightful micro-interactions

#### Tasks:
1. **Scroll Animations**
   - [ ] Intersection Observer for reveal animations
   - [ ] Parallax effects (subtle, performant)
   - [ ] Smooth scroll to sections

2. **Hover Interactions**
   - [ ] Card lift on hover (Pylon-style)
   - [ ] Button background slide-up
   - [ ] SVG icon animations
   - [ ] Link underline animations

3. **Loading States**
   - [ ] Skeleton screens for images
   - [ ] Page transition animations
   - [ ] Lazy load indicators

4. **Navigation**
   - [ ] Active section highlighting
   - [ ] Smooth scroll to anchor
   - [ ] Mobile menu slide-in

5. **Reduced Motion Support**
   - [ ] Disable animations for users who prefer reduced motion
   - [ ] Ensure all interactions still provide feedback

#### Success Criteria:
- Animations feel smooth (60fps)
- No layout shift (CLS < 0.1)
- Reduced motion preference respected
- Interactions enhance, not distract

---

### Phase 6: Performance Optimization (Week 6)
**Goal:** Achieve Core Web Vitals targets

#### Tasks:
1. **Image Optimization**
   - [ ] Lazy load all below-fold images
   - [ ] Implement LQIP (Low Quality Image Placeholders)
   - [ ] Optimize srcsets for all breakpoints
   - [ ] Defer off-screen images

2. **Critical CSS**
   - [ ] Extract above-fold CSS
   - [ ] Inline critical CSS in HTML
   - [ ] Async load non-critical CSS

3. **JavaScript Optimization**
   - [ ] Code splitting by page
   - [ ] Defer non-critical scripts
   - [ ] Remove unused code
   - [ ] Minify production bundles

4. **Resource Hints**
   - [ ] Preload critical fonts
   - [ ] Prefetch next page on hover
   - [ ] DNS prefetch for external domains

5. **Caching Strategy**
   - [ ] Set cache headers for static assets
   - [ ] Service worker for offline support (optional)
   - [ ] Immutable asset URLs

#### Target Metrics:
- LCP: < 2.5s
- INP: < 200ms
- CLS: < 0.1
- Lighthouse Performance: 95+
- Total bundle size: < 200KB

---

### Phase 7: Accessibility Audit (Week 7)
**Goal:** Ensure WCAG 2.2 AA compliance

#### Tasks:
1. **Semantic HTML Review**
   - [ ] Verify heading hierarchy (h1-h6)
   - [ ] Ensure proper landmark regions
   - [ ] Add ARIA labels where needed
   - [ ] Remove redundant ARIA

2. **Keyboard Navigation**
   - [ ] Test tab order on all pages
   - [ ] Verify focus indicators visible
   - [ ] Ensure all interactive elements keyboard accessible
   - [ ] Add skip links

3. **Screen Reader Testing**
   - [ ] Test with NVDA (Windows)
   - [ ] Test with VoiceOver (macOS/iOS)
   - [ ] Verify alt text on all images
   - [ ] Check form labels

4. **Color Contrast**
   - [ ] Verify all text meets 4.5:1 ratio
   - [ ] Check large text meets 3:1
   - [ ] Test UI components contrast
   - [ ] Validate in both light/dark modes

5. **Testing Tools**
   - [ ] Run axe DevTools audit
   - [ ] Use WAVE browser extension
   - [ ] Lighthouse accessibility score
   - [ ] Manual testing checklist

#### Success Criteria:
- Zero critical accessibility errors
- Lighthouse Accessibility: 100
- All pages keyboard navigable
- Screen reader friendly

---

### Phase 8: Testing & Polish (Week 8)
**Goal:** Cross-browser/device testing and final refinements

#### Tasks:
1. **Browser Testing**
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)
   - [ ] Mobile browsers (iOS Safari, Chrome Android)

2. **Device Testing**
   - [ ] Desktop (1920x1080, 1366x768)
   - [ ] Tablet (iPad, Android tablets)
   - [ ] Mobile (iPhone, Android phones)
   - [ ] Small screens (320px width)

3. **Functionality Testing**
   - [ ] All links work
   - [ ] Forms submit (if any)
   - [ ] Images load correctly
   - [ ] Navigation works on all devices

4. **Performance Testing**
   - [ ] Test on slow 3G
   - [ ] Test on fast 4G
   - [ ] Test with cache disabled
   - [ ] Verify bundle sizes

5. **Final Polish**
   - [ ] Fix any visual bugs
   - [ ] Adjust spacing/alignment
   - [ ] Refine animations
   - [ ] Optimize final assets

#### Success Criteria:
- Works perfectly in all major browsers
- Responsive on all device sizes
- No broken functionality
- All tests passing

---

### Phase 9: Documentation & Deployment (Week 9)
**Goal:** Document system and deploy to production

#### Tasks:
1. **Documentation**
   - [ ] Component usage guide
   - [ ] Design system documentation
   - [ ] Data layer schema
   - [ ] Deployment guide

2. **Code Quality**
   - [ ] Remove console.logs
   - [ ] Clean up commented code
   - [ ] Verify no dead code
   - [ ] Run linters

3. **Production Build**
   - [ ] Generate production build
   - [ ] Verify bundle sizes
   - [ ] Test production build locally
   - [ ] Check for build warnings

4. **Deployment**
   - [ ] Deploy to Cloudflare Pages
   - [ ] Configure custom domain (if any)
   - [ ] Set up analytics (optional)
   - [ ] Verify live site

5. **Post-Launch**
   - [ ] Monitor Core Web Vitals
   - [ ] Check Search Console
   - [ ] Gather user feedback
   - [ ] Plan future iterations

#### Success Criteria:
- Documentation complete
- Production build successful
- Live site performs as expected
- All metrics green

---

## Performance Standards

### Core Web Vitals Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | Hero image/text loads quickly |
| **INP** (Interaction to Next Paint) | ≤ 200ms | Button clicks feel instant |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | No unexpected content jumps |

### Asset Budget

| Asset Type | Budget | Strategy |
|------------|--------|----------|
| HTML | < 50KB | Minify, remove comments |
| CSS | < 100KB total | Code splitting, critical CSS |
| JavaScript | < 150KB total | Code splitting, tree-shaking |
| Images | AVIF/WebP | Lazy load, responsive srcsets |
| Fonts | < 100KB | Variable fonts, subset, preload |

### Loading Strategy

```
1. Initial HTML (inline critical CSS)
   ↓
2. Preload critical font (woff2)
   ↓
3. Load above-fold images (eager)
   ↓
4. Parse JavaScript (defer)
   ↓
5. Lazy load below-fold images
   ↓
6. Load non-critical CSS (async)
   ↓
7. Prefetch next page (on hover)
```

### Image Optimization Checklist

- [ ] All images in AVIF format with WebP fallback
- [ ] Responsive srcsets for all breakpoints
- [ ] Lazy loading on all below-fold images
- [ ] Width/height attributes set (prevent CLS)
- [ ] Alt text on all images
- [ ] LQIP for smooth loading experience

---

## Accessibility Requirements

### WCAG 2.2 AA Compliance Checklist

#### Perceivable
- [ ] **1.1.1** All images have alt text
- [ ] **1.3.1** Proper heading hierarchy (h1-h6)
- [ ] **1.3.2** Meaningful sequence of content
- [ ] **1.4.3** Color contrast 4.5:1 (normal text)
- [ ] **1.4.4** Text resizable to 200% without loss
- [ ] **1.4.10** Content reflows at 320px width
- [ ] **1.4.11** UI component contrast 3:1
- [ ] **1.4.12** Text spacing adjustable

#### Operable
- [ ] **2.1.1** All functionality keyboard accessible
- [ ] **2.1.2** No keyboard trap
- [ ] **2.1.4** Character key shortcuts can be remapped
- [ ] **2.2.1** Timing adjustable (if any)
- [ ] **2.4.1** Skip to main content link
- [ ] **2.4.2** Page titles descriptive
- [ ] **2.4.3** Logical focus order
- [ ] **2.4.5** Multiple ways to find pages
- [ ] **2.4.6** Headings and labels descriptive
- [ ] **2.4.7** Focus indicator visible
- [ ] **2.5.3** Label in name matches accessible name
- [ ] **2.5.8** Target size minimum 24x24px

#### Understandable
- [ ] **3.1.1** Page language declared
- [ ] **3.2.3** Consistent navigation
- [ ] **3.2.4** Consistent identification
- [ ] **3.3.1** Error identification
- [ ] **3.3.2** Labels or instructions provided

#### Robust
- [ ] **4.1.2** Name, role, value for all UI components
- [ ] **4.1.3** Status messages

### Testing Tools
- axe DevTools
- WAVE Browser Extension
- Lighthouse Accessibility Audit
- NVDA Screen Reader (Windows)
- VoiceOver (macOS/iOS)
- Keyboard-only navigation
- Color contrast analyzer

---

## Success Metrics

### Technical Metrics
| Metric | Current | Target | How to Measure |
|--------|---------|--------|----------------|
| Lighthouse Performance | TBD | 95+ | Chrome DevTools |
| Lighthouse Accessibility | TBD | 100 | Chrome DevTools |
| LCP | TBD | < 2.5s | PageSpeed Insights |
| INP | TBD | < 200ms | PageSpeed Insights |
| CLS | TBD | < 0.1 | PageSpeed Insights |
| Total Bundle Size | TBD | < 300KB | Build output |
| Time to Interactive | TBD | < 3.5s | Lighthouse |

### User Experience Metrics
- All pages load in under 3 seconds on 4G
- Navigation feels instant
- Animations smooth (60fps)
- No unexpected layout shifts
- Works without JavaScript (progressive enhancement)
- Accessible via keyboard
- Screen reader friendly

### Design Quality Metrics
- Consistent spacing (design system adherence)
- Color contrast passes WCAG AA
- Typography scales smoothly across devices
- Components reusable across pages
- Design feels modern and cohesive

---

## Risk Mitigation

### Potential Risks

1. **Performance Regression**
   - Risk: New animations could harm performance
   - Mitigation: Use transform/opacity only, test on low-end devices

2. **Accessibility Gaps**
   - Risk: Complex interactions may not be keyboard accessible
   - Mitigation: Test with keyboard/screen reader early and often

3. **Browser Compatibility**
   - Risk: Modern CSS features may not work in older browsers
   - Mitigation: Use progressive enhancement, test in Safari/Firefox

4. **Timeline Slippage**
   - Risk: Scope creep or unforeseen complexity
   - Mitigation: Stick to plan, use feature flags for nice-to-haves

5. **Design Inconsistency**
   - Risk: Deviating from design system
   - Mitigation: Component library, regular design reviews

---

## Next Steps

1. **Review and Approval**
   - Review this plan thoroughly
   - Approve technology choices
   - Confirm design direction

2. **Begin Phase 1**
   - Set up development environment
   - Implement design system
   - Optimize initial assets

3. **Weekly Check-ins**
   - Review progress against roadmap
   - Adjust timeline if needed
   - Ensure quality standards maintained

---

## Appendix

### Useful Resources
- [Pylon Website](https://www.usepylon.com/) - Design inspiration
- [web.dev](https://web.dev/) - Performance guides
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) - Accessibility standard
- [Radix UI](https://www.radix-ui.com/) - Component patterns
- [Modern CSS](https://moderncss.dev/) - CSS techniques

### Tool References
- Vite: https://vitejs.dev/
- PostCSS: https://postcss.org/
- Sharp: https://sharp.pixelplumbing.com/
- axe DevTools: https://www.deque.com/axe/devtools/

---

**Plan Version:** 1.0
**Last Updated:** 2025-11-18
**Status:** Ready for Implementation
