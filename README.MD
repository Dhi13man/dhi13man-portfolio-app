# dhi13man-portfolio

A modern, production-ready portfolio website built with Next.js 15, React 19, and TypeScript. Designed for both human developers and AI agent integration.

**Live demo:** [dhimanseal.dev](https://dhimanseal.dev)

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Customizing Your Portfolio](#customizing-your-portfolio)
- [Data Structures (API Documentation)](#data-structures-api-documentation)
- [Development Guide](#development-guide)
- [Deployment](#deployment)
- [Architecture](#architecture)
- [AI Agent Integration](#ai-agent-integration)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview

This portfolio showcases professional achievements, work experiences, technical projects, recommendations, and entrepreneurial ventures. Built with modern web technologies for optimal performance, accessibility, and maintainability.

### Features

- **Static Site Generation** - Fast loading with pre-rendered pages
- **Type-Safe** - Full TypeScript with strict mode enabled
- **Accessible** - WCAG 2.1 Level AA compliant
- **Responsive** - Mobile-first design for all screen sizes
- **Dynamic Data** - GitHub stats fetched at build time
- **Production-Ready** - Comprehensive error handling, validation, and testing

### Technologies

- **Framework:** Next.js 15 (App Router, Static Export)
- **Language:** TypeScript 5 (Strict Mode)
- **Styling:** Tailwind CSS 4
- **Testing:** Jest + React Testing Library
- **Validation:** Zod
- **Icons:** Lucide React

## Quick Start

### Prerequisites

- **Node.js:** >= 20.0.0
- **npm:** >= 9.0.0

Verify your versions:

```bash
node --version  # Should output v20.x.x or higher
npm --version   # Should output 9.x.x or higher
```

### Installation

```bash
# Clone the repository
git clone https://github.com/Dhi13man/dhi13man-portfolio.git
cd dhi13man-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
# Create optimized static build
npm run build

# Output is in /out directory
# Deploy this folder to any static hosting
```

### Available Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build in `/out` |
| `npm start` | Serve production build locally |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate coverage report |
| `npm run lint` | Check code quality with ESLint |
| `npm run format` | Format code with Prettier |

## Project Structure

```text
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page (async Server Component)
│   ├── achievements/      # Achievements page
│   ├── education/         # Education page
│   ├── experience/        # Experience page
│   ├── projects/          # Projects page
│   ├── recommendations/   # Recommendations page
│   └── ventures/          # Ventures page
├── components/
│   ├── layout/            # Layout components (Header, Navigation)
│   ├── domain/            # Business logic components (Cards, Sections)
│   └── ui/                # Reusable UI components (Button, Timeline)
├── data/                   # TypeScript data files (portfolio content)
│   ├── about.ts           # About section data
│   ├── projects.ts        # Projects data
│   ├── experiences.ts     # Work experience data
│   ├── education.ts       # Education data
│   ├── achievements.ts    # Achievements data
│   ├── recommendations.ts # Recommendations data
│   └── ventures.ts        # Ventures data
├── types/                  # TypeScript type definitions
├── constants/              # Application constants (icons, etc.)
├── lib/                    # Utility functions
│   ├── github.ts          # GitHub API utilities
│   ├── date.ts            # Date formatting utilities
│   └── utils.ts           # General utilities
└── assets/                 # Images and static assets

public/                     # Static files served directly
.github/workflows/          # CI/CD pipelines
```

## Customizing Your Portfolio

### Adding a New Project

1. Open `src/data/projects.ts`
2. Add a new project object:

```typescript
{
  name: "My New Project",
  description: "A brief description of the project",
  details: [
    "Key feature or accomplishment",
    "Another important detail",
  ],
  skills: ["React", "TypeScript", "Node.js"],
  startDate: "Jan 2024",
  endDate: "Present",  // Or specific date like "Dec 2024"
  images: {
    primary: "/assets/projects/my-project.png",
    others: [],
  },
  links: {
    primary: "https://github.com/username/project",
    others: ["https://demo.example.com"],
  },
}
```

### Updating the About Section

1. Open `src/data/about.ts`
2. Modify these fields:

```typescript
export const aboutData: About = {
  tagline: "Your professional tagline",
  headline: "Your compelling headline",
  introduction: "Your detailed introduction paragraph...",
  expertise: [
    {
      area: "Backend & Systems",
      skills: ["Go", "Python", "PostgreSQL"],
    },
    // Add more expertise areas...
  ],
  values: [
    {
      number: 1,
      title: "Core Value Name",
      description: "Description of this value",
      iconName: "layers",  // See Icon Names section
    },
    // Add more values (max 4 recommended)...
  ],
  highlights: [],  // Populated at build time from GitHub
};
```

### Adding a New Achievement

Open `src/data/achievements.ts` and add:

```typescript
{
  title: "Award or Achievement Name",
  description: "What you achieved and its significance",
  date: "2024",
  category: "Award",  // Award, Certification, Publication, etc.
}
```

### Adding Work Experience

Open `src/data/experiences.ts` and add:

```typescript
{
  title: "Senior Software Engineer",
  company: "Company Name",
  description: "Description of your role and accomplishments",
  skills: ["React", "Node.js", "AWS"],
  startDate: "Jan 2022",
  endDate: "Present",
}
```

### Available Icon Names

For `iconName` in values, use one of:

- `layers` - Layers/stack icon
- `git-branch` - Git branch icon
- `users` - Team/users icon
- `zap` - Lightning/speed icon
- `target` - Target/goal icon
- `code` - Code icon

## Data Structures (API Documentation)

### Project

```typescript
interface Project {
  name: string;           // Project title
  description: string;    // Brief description
  details?: string[];     // Bullet points of details
  skills?: string[];      // Technologies used
  startDate: string;      // Start date (e.g., "Jan 2024")
  endDate: string;        // End date or "Present"
  images?: {
    primary: string;      // Main image path
    others?: string[];    // Additional images
  };
  links?: {
    primary: string;      // Main link (GitHub, demo)
    others?: string[];    // Additional links
  };
}
```

### Experience

```typescript
interface Experience {
  title: string;          // Job title
  company: string;        // Company name
  description: string;    // Role description
  skills?: string[];      // Technologies/skills
  startDate: string;      // Start date
  endDate: string;        // End date or "Present"
}
```

### Achievement

```typescript
interface Achievement {
  title: string;          // Award/achievement name
  description: string;    // Description
  date: string;           // Date (e.g., "2024")
  category: string;       // Category type
}
```

### About

```typescript
interface About {
  tagline: string;                    // One-line summary
  headline: string;                   // Main headline
  introduction: string;               // Detailed intro
  highlights: AboutHighlight[];       // Stats (build-time)
  expertise: AboutExpertise[];        // Skill areas
  values: AboutValue[];               // Core values
}

interface AboutHighlight {
  value: string;   // Display value (e.g., "6+", "1.5K+")
  label: string;   // Label (e.g., "Years Experience")
}

interface AboutExpertise {
  area: string;      // Category name
  skills: string[];  // List of skills
}

interface AboutValue {
  number: number;           // Display order (1-4)
  title: string;            // Value name
  description: string;      // Value description
  iconName: ValueIconName;  // Icon identifier
}
```

### GitHub Stats (Build-Time)

The `highlights` array in About is populated at build time with:

- Years of experience (calculated from 2019)
- Public repositories (from GitHub API)
- Total stars (from GitHub API, non-forked repos)
- Active initiatives (current projects + ventures)

## Development Guide

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npx tsc --noEmit
```

### Running Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

Test coverage target: **95%+**

### Component Patterns

#### UI Components

`src/components/ui/`

- Generic, reusable components
- No business logic
- Examples: Button, Timeline, Section

#### Domain Components

`src/components/domain/`

- Business-specific components
- Portfolio-related logic
- Examples: ProjectCard, AboutSection

#### Layout Components

`src/components/layout/`

- Page structure components
- Examples: Header, Navigation

### Adding a New Component

1. Create file in appropriate directory:

    ```typescript
    // src/components/domain/NewCard.tsx
    interface NewCardProps {
      title: string;
      description: string;
    }

    export function NewCard({ title, description }: NewCardProps) {
      return (
        <div className="p-4 border border-border rounded-lg">
          <h3 className="text-16 font-semibold">{title}</h3>
          <p className="text-14 text-text-secondary">{description}</p>
        </div>
      );
    }
    ```

2. Create test file:

    ```typescript
    // src/components/domain/__tests__/NewCard.test.tsx
    import { render, screen } from '@testing-library/react';
    import { NewCard } from '../NewCard';

    describe('NewCard', () => {
      it('renders title and description', () => {
        render(<NewCard title="Test" description="Description" />);
        expect(screen.getByText('Test')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
      });
    });
    ```

## Deployment

### Build Process

```bash
npm run build
```

This creates a static export in `/out`:

1. Compiles TypeScript and React
2. Fetches GitHub stats
3. Generates static HTML pages
4. Optimizes assets

### GitHub Pages

1. Push to GitHub
2. Go to Settings → Pages
3. Set source to GitHub Actions or `/out` folder

### Netlify

- Build command: `npm run build`
- Publish directory: `out`
- Node version: 20+

### Vercel

- Connect repository
- Framework preset: Next.js
- Output directory: `out`

### Pre-Deployment Checklist

```bash
npm run lint        # Check code quality
npm test            # Run all tests
npm run build       # Verify build succeeds
npm start           # Test locally
```

### CI/CD Pipelines

Automated checks on every push (`.github/workflows/`):

- **ci.yml** - Lint, type-check, tests
- **codeql.yml** - Security scanning
- **lighthouse.yml** - Performance testing
- **release.yml** - Release automation

## Architecture

### Design Principles

1. **Static Generation** - All pages pre-rendered at build time
2. **Type Safety** - Strict TypeScript throughout
3. **Component Composition** - Small, focused components
4. **Data-Driven** - Content in TypeScript data files

### Data Flow

```text
TypeScript Data Files (src/data/)
        ↓
Server Components (src/app/)
        ↓
Domain Components (src/components/domain/)
        ↓
UI Components (src/components/ui/)
        ↓
Static HTML (out/)
```

### Build-Time Processing

The home page fetches GitHub stats at build time:

```typescript
// src/app/page.tsx
export default async function Home() {
  const stats = await fetchGitHubStats("Dhi13man");
  // Stats included in static HTML
}
```

GitHub API features:

- 24-hour cache duration
- 10-second timeout
- Rate limit checking
- Zod validation
- Error state handling (shows "—" on failure)

### Configuration

**TypeScript** (`tsconfig.json`)

- Target: ES2020
- Strict mode: Enabled
- Path alias: `@/*` → `./src/*`

**Next.js** (`next.config.js`)

- Output: Static export
- Image optimization: Disabled (for static export)

**Tailwind** (`tailwind.config.js`)

- Custom design tokens
- Utility-first CSS

## AI Agent Integration

This codebase is designed for safe AI agent modification.

### Safe to Modify

- **Data files** (`src/data/*`) - Add/update content
- **Styling** - Tailwind classes in components
- **New components** - Add to appropriate directory

### Modify with Care

- **Types** (`src/types/*`) - Ensure backward compatibility
- **Utilities** (`src/lib/*`) - Add tests for changes
- **Page components** - Maintain async patterns

### Do Not Modify

- **Build configuration** without understanding implications
- **Test mocks** without updating corresponding code
- **GitHub username** in `src/app/page.tsx` (line 25)

### File Organization

```text
src/
├── data/          ← Content changes (safe)
├── components/    ← UI changes (safe with tests)
├── types/         ← Type definitions (careful)
├── lib/           ← Utilities (needs tests)
└── app/           ← Pages (maintain patterns)
```

### Common Tasks

#### Add a Project

```typescript
// src/data/projects.ts - Add to array
{ name: "...", description: "...", ... }
```

#### Update About Section

```typescript
// src/data/about.ts - Modify fields
tagline: "New tagline"
```

#### Add Expertise Area

```typescript
// src/data/about.ts - Add to expertise array
{ area: "New Area", skills: ["Skill1", "Skill2"] }
```

### Validation Patterns

The codebase uses Zod for runtime validation:

```typescript
// Example from src/lib/github.ts
const GitHubUserSchema = z.object({
  public_repos: z.number().int().nonnegative(),
});

const result = GitHubUserSchema.safeParse(data);
if (!result.success) {
  // Handle validation error
}
```

## Troubleshooting

### Common Issues

#### Module Not Found Errors

```bash
rm -rf node_modules .next
npm install
```

#### Build Fails with Type Errors

```bash
npx tsc --noEmit  # See all type errors
```

#### Tests Failing After Changes

```bash
npm run test:watch  # Run in watch mode to iterate
```

#### GitHub Stats Showing Dash

- API rate limited (60 requests/hour for unauthenticated)
- Network issues during build
- Check build logs for error message

#### Images Not Loading

- Ensure images are in `public/assets/`
- Use absolute paths starting with `/`

#### Styles Not Applying

- Restart dev server after Tailwind config changes
- Check for typos in class names

### Debug Commands

```bash
# Clear all caches
rm -rf .next out node_modules/.cache

# Check Node version
node --version

# Verify dependencies
npm ls

# Run specific test
npm test -- --testPathPattern="github"
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make changes and add tests
4. Run tests: `npm test`
5. Run lint: `npm run lint`
6. Commit: `git commit -m "feat: add my feature"`
7. Push: `git push origin feature/my-feature`
8. Open a Pull Request

### Commit Convention

- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code refactoring
- `test:` Adding tests
- `docs:` Documentation
- `chore:` Maintenance

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
