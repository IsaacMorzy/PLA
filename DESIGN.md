---
source_url: https://stripe.com
extraction_date: 2026-04-29
description: Stripe-inspired design for PeaceLeague Africa - clean, trustworthy, confident
personality_keywords:
  - professional
  - trustworthy
  - confident
  - editorial
  - clean
  - premium
---

# Stripe Design System for PeaceLeague Africa

## Overview

Stripe's design philosophy: **confident clarity**. Large typography, generous whitespace, clean bento grids, subtle borders. Perfect for a charity/crowdfunding platform that needs to feel trustworthy and professional.

---

## Colors

### Primary Palette

| Name | Hex | Usage |
|------|-----|-------|
| Stripe Purple | `#635bff` | Primary CTAs, accents |
| Deep Slate | `#1a1a1a` | Headlines, important text |
| Warm Orange | `#f7b538` | Donate buttons, CTAs (adapted for charity) |
| Cream White | `#fafaf9` | Page backgrounds |
| Pure White | `#ffffff` | Card backgrounds |

### Neutral Palette

| Name | Hex | Usage |
|------|-----|-------|
| Slate 900 | `#0f0f0f` | Primary text |
| Slate 700 | `#3c3c3c` | Body text |
| Slate 500 | `#71717a` | Secondary text |
| Slate 300 | `#d4d4d8` | Borders |
| Slate 100 | `#f4f4f5` | Subtle backgrounds |

### Accent Colors (Adapted for Charity)

| Name | Hex | Usage |
|------|-----|-------|
| Hope Gold | `#eab308` | Hero CTAs, donate buttons |
| Impact Green | `#22c55e` | Success states, progress |
| Trust Blue | `#3b82f6` | Links, secondary actions |

---

## Typography

### Font Families

| Name | Usage | Weights |
|------|-------|--------|
| **Stripe Sans** (system fallback: `Outfit`) | Body text | 400, 500, 600 |
| **Fraunces** | Headlines, display | 600, 700 |

### Type Scale

| Token | Size | Line Height | Usage |
|-------|------|------------|-------|
| display-3xl | 4rem / 64px | 1.1 | Hero headlines |
| display-2xl | 2.5rem / 40px | 1.2 | Page titles |
| display-xl | 2rem / 32px | 1.3 | Section headlines |
| text-xl | 1.25rem / 20px | 1.6 | Large body |
| text-lg | 1.125rem / 18px | 1.6 | Body text |
| text-base | 1rem / 16px | 1.6 | Default |
| text-sm | 0.875rem / 14px | 1.5 | Small text |
| text-xs | 0.75rem / 12px | 1.5 | Captions |

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Regular | 400 | Body text |
| Medium | 500 | Emphasis, labels |
| Semibold | 600 | Headlines |
| Bold | 700 | Hero text |

---

## Spacing

### Spacing Scale (Tailwind-based)

| Token | Value | Usage |
|-------|-------|-------|
| 0 | 0px | No spacing |
| px | 1px | Tight connections |
| 0.5 | 2px | Micro spacing |
| 1 | 4px | Component internal |
| 2 | 8px | Tight spacing |
| 3 | 12px | Default spacing |
| 4 | 16px | Section spacing |
| 6 | 24px | Section breathing |
| 8 | 32px | Large gaps |
| 10 | 40px | XL gaps |
| 12 | 48px | Section separation |
| 16 | 64px | Hero spacing |
| 20 | 80px | Major sections |

### Container

| Token | Value | Usage |
|-------|-------|-------|
| sm | 640px | Mobile container |
| md | 768px | Tablet container |
| lg | 1024px | Desktop container |
| xl | 1280px | Wide container |
| 2xl | 1536px | Max width |

---

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| none | 0px | Sharp corners |
| sm | 4px | Small elements |
| DEFAULT | 8px | Default cards |
| md | 12px | Medium cards |
| lg | 16px | Large cards |
| xl | 24px | Hero elements |
| full | 9999px | Pills, avatars |

---

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| sm | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| DEFAULT | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)` | Cards |
| md | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)` | Hover states |
| lg | `0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)` | Modals |

---

## Components

### Button Variants

#### Primary (Donate CTA)

```
background: Hope Gold (#eab308)
color: Deep Slate (#0f0f0f)
padding: 12px 24px
border-radius: 8px
font-weight: 600
hover: brightness(1.1)
transition: 200ms ease
```

#### Secondary

```
background: Transparent
border: 1px solid Slate 300
color: Slate 700
padding: 12px 24px
border-radius: 8px
font-weight: 500
hover: background Slate 100
```

#### Ghost

```
background: Transparent
color: Stripe Purple
padding: 12px 24px
font-weight: 500
hover: background subtle purple tint
```

### Card Component

```
background: Pure White
border: 1px solid Slate 100
border-radius: 12px
padding: 24px
shadow: DEFAULT
hover: shadow-md, subtle border change
transition: 200ms ease
```

### Bento Grid Card

Used for feature highlights and stats:

```
background: Pure White
border: 1px solid Slate 100
border-radius: 16px
padding: 32px
display: grid
gap: 24px
```

---

## Layout Patterns

### Hero Section

```
min-height: 80vh (or auto)
background: Cream White
padding: 80px 0
content:
  - eyebrow text (uppercase, small)
  - headline (display-3xl, bold)
  - subheadline (text-xl, Slate 700)
  - CTA buttons (primary + secondary)
  - optional illustration/image
```

### Stats Section (Bento Grid)

```
grid: 4 columns (desktop), 2 columns (tablet), 1 column (mobile)
gap: 24px
cards with:
  - large number (display-2xl, bold)
  - label (text-sm, Slate 500)
```

### Feature Cards (Grid)

```
grid: 3 columns (desktop), 1 column (mobile)
gap: 24px
each card:
  - icon or image
  - title (text-lg, semibold)
  - description (text-base, Slate 500)
```

### Navigation

```
height: 72px
background: Pure White
border-bottom: 1px solid Slate 100
logo: left
nav links: center
CTAs: right (Sign in + Donate button)
sticky: yes
backdrop-blur: sm
```

---

## Animations

### Transitions

```css
transition: all 200ms ease;
```

### Hover Effects

- Cards: lift with shadow-md
- Buttons: slight scale (1.02) or brightness change
- Links: color transition

### Page Load

```css
animation: fadeIn 500ms ease;
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
```

---

## Responsive Breakpoints

| Breakpoint | Width | Columns |
|------------|-------|---------|
| sm | 640px | 1 |
| md | 768px | 2 |
| lg | 1024px | 3 |
| xl | 1280px | 4 |

---

## Accessibility

- Minimum contrast: 4.5:1 for text
- Focus states: visible outline (Stripe Purple)
- Touch targets: minimum 44px
- Reduced motion: respect `prefers-reduced-motion`

---

## Visual Ground Truth

From Stripe.com homepage observation:

1. **Hero**: Large "Financial infrastructure to grow your revenue" with confident white space
2. **Header**: Clean, minimal navigation with logo + CTAs
3. **Cards**: White cards with 1px borders, 12px radius, subtle shadows
4. **Colors**: Lots of white/cream, purple/violet primary, confident typography
5. **Layout**: Bento grid for features and stats, generous vertical spacing
6. **Images**: High-quality product imagery
7. **CTAs**: Orange/gold for primary donate actions