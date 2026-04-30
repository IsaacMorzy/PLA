---
source_url: https://www.helius.dev
extraction_date: 2026-04-30
description: Helius-inspired design for PeaceLeague Africa - clean, dark theme, professional, community-focused
personalization_keywords:
  - clean
  - professional
  - dark-theme
  - community-focused
  - trustworthy
  - technical-excellence
---

# PeaceLeague Africa Design System

## Based on: Helius (helius.dev)

Modern dark-themed developer platform aesthetic adapted for charity/crowdfunding. Clean, trustworthy, community-focused.

---

## Colors

### Primary Palette (Helius Dark)

| Name | Hex | Usage |
|------|-----|-------|
| Deep Black | `#0a0a0a` | Page background |
| Card Dark | `#111111` | Card backgrounds |
| Border Dark | `#222222` | Borders, dividers |
| Hope Gold | `#d4a853` | Primary CTAs, accents |
| Hover Gold | `#eab308` | Button hover |
| Bronze | `#c46d46` | Secondary accent |
| Text Primary | `#ffffff` | Headlines |
| Text Secondary | `#a1a1a1` | Body text |
| Text Muted | `#6b6b6b` | Captions, metadata |

### Functional Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#22c55e` | Progress, funded |
| Warning | `#f59e0b` | Pending |
| Error | `#ef4444` | Failed |
| Info | `#3b82f6` | Links |

---

## Typography

### Font Families

| Name | Usage | Source |
|------|-------|--------|
| **Inter** | Body text, UI | Google Fonts |
| **Fraunces** | Headlines, display | Google Fonts |
| **JetBrains Mono** | Code, numbers | Google Fonts |

### Type Scale (Helius-style)

| Token | Size | Usage |
|-------|------|-------|
| display-4xl | 3.5rem / 56px | Hero headlines |
| display-3xl | 2.5rem / 40px | Page titles |
| display-2xl | 2rem / 32px | Section headlines |
| display-xl | 1.5rem / 24px | Subsection |
| text-xl | 1.25rem / 20px | Large body |
| text-lg | 1.125rem / 18px | Body text |
| text-base | 1rem / 16px | Default |
| text-sm | 0.875rem / 14px | Small |
| text-xs | 0.75rem / 12px | Caption |

---

## Layout

### Container

| Name | Max Width |
|------|-----------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

### Spacing Scale

| Token | Value |
|-------|-------|
| 0 | 0 |
| 1 | 4px |
| 2 | 8px |
| 3 | 12px |
| 4 | 16px |
| 6 | 24px |
| 8 | 32px |
| 10 | 40px |
| 12 | 48px |
| 16 | 64px |
| 20 | 80px |
| 24 | 96px |

---

## Components

### Glass Card (Helius-style)

```tsx
function Card({ children }) {
  return (
    <div className="bg-[#111111] border border-[#222222] rounded-xl p-6">
      {children}
    </div>
  );
}
```

### Button Primary (Gold)

- Background: `#d4a853`
- Hover: `#eab308`
- Text: `#0a0a0a` (dark)
- Border radius: `8px`
- Padding: `12px 24px`
- Font: `Inter`, 600 weight

### Button Secondary (Outline)

- Background: transparent
- Border: `1px solid #222222`
- Text: `#ffffff`
- Hover: Background `#222222`

### Button Ghost

- Background: transparent
- Text: `#a1a1a1`
- Hover: Text `#ffffff`

### Input Field

- Background: `#0a0a0a`
- Border: `1px solid #222222`
- Focus border: `#d4a853`
- Text: `#ffffff`
- Placeholder: `#6b6b6b`

### Badge

- Background: `#111111`
- Border: `1px solid #222222`
- Text: `#a1a1a1`
- Border radius: `9999px`
- Padding: `4px 12px`

### Progress Bar

- Track: `#222222`
- Fill: `#d4a853` (gold)
- Height: `8px`
- Border radius: `9999px`

---

## Glass Cards (Tailgrids-style)

### Card Variants

| Variant | Background | Border |
|---------|------------|--------|
| `default` | `bg-white/[0.02]` backdrop-blur-xl | `border-white/[0.08]` |
| `gradient` | `bg-gradient-to-br from-white/[0.08] to-white/[0.02]` | `border-white/[0.1]` |
| `gold` | `bg-gradient-to-br from-[hsla(45,85%,55%,0.08)] to-transparent` | `border-[hsla(45,85%,55%,0.15)]` |
| `terracotta` | `bg-gradient-to-br from-[hsla(25,60%,45%,0.08)] to-transparent` | `border-[hsla(25,60%,45%,0.15)]` |

### Card Subcomponents

```tsx
// Wrapper
<Card variant="gold" hover>...</Card>

// Header + Title + Description
<CardHeader>
  <CardTitle>Title</CardTitle>
  <CardDescription>Description</CardDescription>
</CardHeader>

// Content + Footer
<CardContent>...</CardContent>
<CardFooter>...</CardFooter>
```

### Specialized Cards

- **FeatureCard**: Icon + Title + Description + CTA, uses gold variant
- **StatsCard**: Label + Value + Optional change indicator + Icon
- **ProfileCard**: Image + Name + Role + Quote content, uses gradient variant
- **GlassCard**: Glassmorphism wrapper with variant support

### Hover Effects

```tsx
// When hover={true}:
transition-all duration-300 ease-out
hover:border-[hsla(45,85%,55%,0.3)]
hover:shadow-[0_0_30px_hsla(45,85%,55%,0.1)]
hover:-translate-y-1
```

---

## Buttons (Tailgrids-style)

### Variant Reference

| Variant | Class | Use Case |
|---------|-------|---------|
| `default` | Gold gradient, full shadow | Primary CTA |
| `glow` | Gold + outer glow shadow | Premium CTA |
| `soft` | Dark bg, subtle border | Secondary |
| `glass` | Glassmorphism | Tertiary |
| `outline` | Transparent + gold border | Outlined |
| `secondary` | Terracotta | Cancel/Danger |
| `ghost` | Minimal | Text links |
| `link` | Gold text | Inline links |
| `destructive` | Red | Delete actions |

### Size Variants

| Size | Height | Padding |
|------|-------|---------|
| sm | `h-8` | `px-4` |
| default | `h-10` | `px-5` |
| lg | `h-12` | `px-8` |
| xl | `h-14` | `px-10` |
| icon | `h-10 w-10` | - |

### Colors

- **Brand Gold**: `#d4a853` (primary)
- **Gold Hover**: `#e8c87a` (lighter)
- **Brand Terracotta**: `#c46d46` (secondary)
- **Dark Base**: `#1a1815` (soft button bg)

---

## Interactive Components (Tailgrids-style)

### Accordion

```tsx
<Accordion
  items={[
    { id: '1', title: 'Question', content: 'Answer' }
  ]}
  allowMultiple={false} // or true
/>
```

- Background: `bg-white/[0.02]`
- Border: `border-white/[0.08]`
- Chevron rotates on open (180deg)
- Grid animation: `grid-rows-[1fr]`

### Tabs

```tsx
<Tabs
  tabs={[
    { id: 'tab1', label: 'Label', content: <div>Content</div> }
  ]}
  defaultTab="tab1"
/>
```

- Tab list: `bg-white/[0.05]` container
- Active: `bg-[#d4a853] text-[#1a1815]`
- Inactive: `text-white/70 hover:text-white`

### Pricing Table

- Grid: 3 columns on desktop
- Popular tier: Gold gradient border + "Popular" badge
- Feature list with gold checkmarks

### Contact Form

- Input fields: `bg-white/[0.02] border-white/[0.08]`
- Focus: `border-[#d4a853]/50`
- Submit: Gold background

### Stats Grid

- 2x2 mobile, 4 columns desktop
- Centered content
- Optional change indicators (green/red)

---

## Feature Components (Tailgrids-style)

### AppWorkflow

- Zigzag layout with connection line
- Step number circle: Gold gradient
- Pulse dot for active step
- Offset pattern: `md:mt-24` on even items

### FeatureTabs

- Horizontal tab buttons
- Title + Description layout
- Optional image/visual

### FeatureGrid

- Columns: 2, 3, or 4
- Icon + Title + Description
- Hover: Gold border + translate-y

### HowItWorks

- Numbered circles (01, 02, 03)
- Arrow connectors between steps
- Group hover: scale-110

---

## Glassmorphism Design System

### Backgrounds

```css
/* Subtle glass */
bg-white/[0.02]
bg-white/[0.05]
bg-white/[0.08]

/* Gradients */
bg-gradient-to-br from-white/[0.08] to-white/[0.02]
```

### Borders

```css
/* Default */
border-white/[0.08]
border-white/[0.1]

/* Accent states */
border-[hsla(45,85%,55%,0.15)]
border-[hsla(45,85%,55%,0.3)]
```

### Effects

```css
/* Blur */
backdrop-blur-xl
backdrop-blur-md

/* Shadows */
shadow-[0_0_30px_hsla(45,85%,55%,0.1)]
shadow-brand-gold/20
```

### Text

```css
/* Primary */
text-white

/* Secondary */
text-white/70
text-white/60

/* Muted */
text-white/50
```

---

## Gold Accent Usage (#d4a853)

### Color Values

| Name | Value | Usage |
|------|-------|-------|
| Gold | `#d4a853` | Primary CTA, icons |
| Gold Light | `#e8c87a` | Hover state |
| Gold HSLA | `hsla(45,85%,55%,0.15)` | Subtle backgrounds |
| Bronze | `#c46d46` | Secondary accent |

### Usage Patterns

- **CTAs**: `bg-[#d4a853] text-[#1a1815]`
- **Icons**: `text-[#d4a853]` or `bg-[#d4a853]/10`
- **Borders**: `border-[#d4a853]/30`
- **Glows**: `shadow-[0_0_30px_hsla(45,85%,55%,0.4)]`

---

## Animations & Transitions

### Durations

| Name | Value |
|------|-------|
| fast | 150ms |
| default | 200ms |
| normal | 300ms |

### Hover Animations

```css
hover:scale-[1.02]
hover:-translate-y-1
hover:border-[hsla(45,85%,55%,0.3)]
```

### Active States

```css
active:scale-[0.98]
```

### Special Effects

- Pulse animation on active steps
- Rotate 180deg on accordion chevron
- Scale transform on HowItWorks circles

---

## Navigation (Helius Header)

### Desktop Header

```tsx
function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-[#222222]">
      <nav className="max-w-6xl mx-auto h-20 flex items-center justify-between px-6">
        {/* Logo */}
        <Logo />
        
        {/* Nav Links - Center */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/campaigns">Campaigns</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/team">Team</NavLink>
          <NavLink href="/blog">Blog</NavLink>
        </div>
        
        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <Link href="/donate" className="btn btn-primary">
            Donate
          </Link>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-[#a1a1a1] hover:text-white transition-colors">
      {children}
    </Link>
  );
}
```

### Mobile Navigation

- Hamburger icon (3 lines, animated to X)
- Slide-in panel from right
- Full height overlay
- Background blur
- Close button

---

## Sections (Tailgrids/Helius-style)

### 1. Hero Section

- Full viewport height option (`min-h-[90vh]`)
- Centered content
- Eyebrow badge + Headline + Description + CTAs
- Optional: Subtle grid pattern background

```tsx
function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111111] border border-[#222222] text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-[#d4a853]" />
          <span className="text-[#a1a1a1]">Empowering African Communities</span>
        </div>
        
        {/* Headline */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-display">
          Fund <span className="text-[#d4a853]">Change</span> Across Africa
        </h1>
        
        {/* Description */}
        <p className="text-xl text-[#a1a1a1] mb-10 max-w-2xl mx-auto">
          Transparent crowdfunding for African causes. Every SOL donated goes directly to those who need it most.
        </p>
        
        {/* CTAs */}
        <div className="flex items-center justify-center gap-4">
          <Link href="/create" className="btn btn-primary">
            Start Campaign
          </Link>
          <Link href="/donate" className="btn btn-outline">
            Donate Now
          </Link>
        </div>
      </div>
    </section>
  );
}
```

### 2. Countries We Serve

- Grid: 4 columns (md), 2 columns (sm)
- Flag emoji + Country name
- Hover: Scale up slightly

```tsx
const AFRICAN_FLAGS = [
  { flag: "🇳🇬", name: "Nigeria" },
  { flag: "🇰🇪", name: "Kenya" },
  { flag: "🇬🇭", name: "Ghana" },
  { flag: "🇿🇦", name: "South Africa" },
  { flag: "🇪🇬", name: "Egypt" },
  { flag: "🇸🇳", name: "Senegal" },
  { flag: "🇨🇲", name: "Cameroon" },
  { flag: "🇪🇹", name: "Ethiopia" },
];
```

### 3. Featured Campaigns

- Grid: 3 columns
- Campaign card: Image + Title + Progress bar + Amount
- Hover: Border glow

### 4. Stats/Metrics Section

- Grid of cards with large numbers
- JetBrains Mono for numbers
- Labels below

### 5. How It Works

- Numbered steps (01, 02, 03)
- Icon + Title + Description
- Horizontal layout on desktop

### 6. Trust/Transparency

- On-chain verification badge
- Stats cards
- Testimonial quotes

### 7. Impact Stories

- Two-column layout
- Quote + Author + Location
- Star rating

### 8. FAQ

- Accordion style
- Plus/minus toggle

### 9. CTA Section

- Full-width
- Centered content
- Background gradient

### 10. Newsletter

- Email input + Button
- Privacy note

---

## Blog Pages

### /blog (Blog Listing)

- Header with title
- Featured post (large)
- Grid of recent posts (3 columns)
- Pagination

### /blog/[slug] (Blog Detail)

- Hero image (full width)
- Title + Date + Author
- Content (markdown)
- Tags
- Share buttons
- Related posts

### Blog Card Component

```tsx
function BlogCard({ title, excerpt, image, date, slug, author }) {
  return (
    <Link href={`/blog/${slug}`} className="group">
      <article className="bg-[#111111] border border-[#222222] rounded-xl overflow-hidden hover:border-[#d4a853] transition-colors">
        <div className="aspect-video relative">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
        <div className="p-6">
          <p className="text-sm text-[#6b6b6b] mb-2">{date}</p>
          <h3 className="text-xl font-semibold text-white group-hover:text-[#d4a853] transition-colors mb-2">
            {title}
          </h3>
          <p className="text-[#a1a1a1] line-clamp-2">{excerpt}</p>
          <div className="flex items-center gap-2 mt-4">
            <Image src={author.image} width={24} height={24} className="rounded-full" />
            <span className="text-sm text-[#6b6b6b]">{author.name}</span>
          </div>
        </div>
      </article>
    </Link>
  );
}
```

---

## Footer

### Layout

- 4 columns on desktop
- Single column on mobile
- Bottom: Copyright + Social links

### Columns

1. Logo + Brief description
2. Quick Links
3. Support
4. Connect (Social + Newsletter)

---

## Animations

### Page Transitions

- Fade in on mount
- Stagger children elements

### Hover Effects

- Scale: `scale-105` on cards
- Border color change
- Text color change

### Loading States

- Skeleton loaders
- Pulse animation

---

## Responsive Breakpoints

| Breakpoint | Width |
|------------|-------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

---

## CMS Integration (Cosmic)

### Object Types

| Type | Slug | Fields |
|------|------|--------|
| Campaigns | `campaigns` | title, description, goal, raised, image, category |
| Stories | `stories` | title, content, author, location, image |
| Testimonials | `testimonials` | quote, name, role, image |
| Team Members | `team-members` | name, role, bio, image, linkedin, twitter |
| Blog Posts | `blog-posts` | title, slug, content, excerpt, image, author, published_at |
| Gallery | `gallery` | image, location, category |

### Fetch Functions

```tsx
// lib/cosmic.ts
export async function getCampaigns(limit?: number)
export async function getFeaturedCampaigns(limit?: number)
export async function getCampaignBySlug(slug: string)
export async function getStories()
export async function getTestimonials()
export async function getTeamMembers()
export async function getBlogPosts()
export async function getBlogPostBySlug(slug: string)
export async function getGallery()
```

---

## Implementation Checklist

- [ ] Header component with mobile nav
- [ ] Hero Section
- [ ] Countries Section (flags)
- [ ] Campaigns Section (grid)
- [ ] How It Works Section
- [ ] Transparency Section
- [ ] Impact Stories Section
- [ ] FAQ Accordion
- [ ] CTA Section
- [ ] Newsletter Section
- [ ] Footer
- [ ] Blog listing page
- [ ] Blog detail page
- [ ] All pages connect to Cosmic CMS

---

## Design Principles (from Helius)

1. **Dark theme default** - `#0a0a0a` background
2. **Clean borders** - Subtle `#222222` borders
3. **Gold accents** - `#d4a853` for CTAs and highlights
4. **Inter font** - Clean, readable body text
5. **Generous spacing** - Let content breathe
6. **Card-based layout** - Organized information
7. **Subtle animations** - Professional feel, not flashy
8. **Mobile-first** - Works on all devices
9. **Fast loading** - Optimize images, lazy load
10. **Accessible** - Proper contrast, ARIA labels