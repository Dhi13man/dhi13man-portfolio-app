# Linear-Inspired Design System for Portfolio

## Design Philosophy

**Complete departure from card-based layouts.** Linear aesthetic: flat, precise, minimal, information-dense.

## Color System

### Base Palette (LCH-inspired)

- **Background**: `#0a0a0a` (near-black, not pure black)
- **Surface**: `#141414` (elevated panels)
- **Border**: `rgba(255, 255, 255, 0.08)` (subtle dividers)

### Text Hierarchy (White with opacity)

- **Primary**: `rgba(255, 255, 255, 1.0)` - Main headings, critical text
- **Secondary**: `rgba(255, 255, 255, 0.7)` - Body text, descriptions
- **Tertiary**: `rgba(255, 255, 255, 0.5)` - Supporting text, labels
- **Quaternary**: `rgba(255, 255, 255, 0.3)` - Subtle hints, timestamps

### Accent (Minimal use)

- **Primary Accent**: `#8B5CF6` (purple) - CTAs, links, brand
- **Status Colors**:
  - Success: `#10B981` (green)
  - Warning: `#F59E0B` (amber)
  - Error: `#EF4444` (red)
  - Info: `#3B82F6` (blue)

## Typography

### Fonts

- **Display**: Inter Display (bold headings)
- **Sans**: Inter (body text, UI)
- **Mono**: JetBrains Mono (code, data)

### Scale (8px base, 1.25 ratio)

```
12px  - Captions, timestamps
14px  - Small labels, secondary text
16px  - Base body text (default)
20px  - Large body, sub-headings
24px  - Section headings (h3)
32px  - Page section titles (h2)
48px  - Page titles (h1)
64px  - Hero displays
```

### Line Heights

- **Tight** (1.1): Large displays
- **Normal** (1.5): Body text
- **Relaxed** (1.7): Long-form content

## Spacing System

**4px base unit** - tight, precise

```
4px   (1)  - Minimal gaps
8px   (2)  - Tight spacing
12px  (3)  - Compact grouping
16px  (4)  - Default spacing
24px  (6)  - Section gaps
32px  (8)  - Major section gaps
48px  (12) - Page section dividers
64px  (16) - Hero spacing
```

## Layout Principles

### Structure

1. **No cards with shadows** - flat panels only
2. **Precise alignment** - everything aligns on grid
3. **Linear flow** - one-dimensional scroll
4. **Dense information** - less whitespace than typical
5. **Subtle dividers** - 1px borders at low opacity

### Containers

- **Max width**: 1200px (content)
- **Padding**: 16px mobile, 24px tablet, 32px desktop
- **Sections**: Full-width with dividers between

## Components

### Panel (replaces Card)

```
- Background: surface (#141414)
- Border: 1px solid rgba(255,255,255,0.08)
- Padding: 16-24px
- Border radius: 8px (subtle, not rounded)
- NO shadow
```

### Button (Minimal)

```
Primary: Filled accent color
Secondary: Border + accent text
Ghost: No border, hover shows bg
Interaction: 150ms transitions
```

### Section

```
Full-width container
Border-top: 1px rgba(255,255,255,0.08)
Padding: 48-64px vertical
Max-width content centered
```

### Timeline (for Experience)

```
Vertical line on left
Dots for milestones
Aligned content blocks
Compact, precise spacing
```

## Interactions

### Hover States

- Opacity shift: 1.0 → 0.7
- Background: transparent → rgba(255,255,255,0.05)
- Border: opacity 0.08 → 0.15
- **Fast transitions**: 150ms

### Focus States

- Ring: 2px accent color
- Offset: 2px

## Visual Treatments

### Borders

- Default: 1px solid rgba(255,255,255,0.08)
- Hover: 1px solid rgba(255,255,255,0.15)
- Accent: 1px solid accent color

### Dividers

- Horizontal: Full-width, 1px, opacity 0.08
- Vertical: 1px, opacity 0.08, 24-32px height

### Gradients (Minimal use)

- Subtle background gradients
- Text gradients for emphasis
- NO heavy gradient overlays

## Page Patterns

### Home

1. **Hero**: Large display text, minimal CTA, centered
2. **About**: Single column, generous line-height
3. **Featured Work**: Flat list, not grid
4. **Contact**: Simple, direct

### Projects/Experience Lists

- **Flat list** format (not grid of cards)
- Each item: flat panel with border
- Hover: subtle highlight
- Dense information layout

### Timeline Views (Experience, Education)

- Vertical timeline with connecting line
- Dots for milestones
- Aligned content blocks
- Dates in monospace

## Performance

- Minimal animations (only essential)
- No heavy shadows or blurs
- Optimized images with blur placeholders
- Fast transitions (150ms max)

## Implementation Notes

1. **Delete old Card component** - start fresh
2. **Build Panel component** - flat, bordered container
3. **Rebuild Button** - minimal styling
4. **Create Section** - full-width divider sections
5. **Timeline component** - for chronological content
6. **Update all pages** - systematic application

This is a complete visual language change - no half measures.
