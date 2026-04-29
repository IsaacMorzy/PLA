# Peace League Africa - Onboarding Guide

## Project Overview

- **Name**: Builderz Solana dApp Scaffold (Peace League Africa)
- **Stack**: Next.js 16, React 19, Tailwind CSS v4, shadcn/ui, Solana Wallet Adapter
- **Purpose**: Solana dApp with wallet connection, modern 2026 aesthetics

## Architecture (from Knowledge Graph)

### Layers (Communities)

| Layer | Files | Purpose |
|-------|-------|---------|
| **UI Components** | logo.tsx, button.tsx, sheet.tsx | shadcn/ui + custom |
| **Layout** | header.tsx, footer.tsx, theme-toggle.tsx, mobile-nav.tsx | App shell |
| **Wallet** | wallet-button.tsx, ContextProvider.tsx | Solana connection |
| **App** | layout.tsx, providers.tsx, page.tsx | Next.js pages |
| **Config** | next.config.ts, postcss.config.js | Build config |

### Key File Map

```
app/
├── layout.tsx          # Root layout with providers
├── providers.tsx      # Theme + Wallet context
└── page.tsx          # Homepage

components/
├── ui/               # shadcn/ui (button, sheet, visually-hidden)
├── layout/           # Header, Footer, ThemeToggle, MobileNav
└── wallet/          # WalletButton

contexts/
└── ContextProvider.tsx  # Solana wallet context

lib/
└── utils.ts          # cn() utility

styles/
└── globals.css      # Design system (glassmorphism, glow, animations)
```

### Components & Relationships

| Component | Community | Connects To |
|-----------|-----------|------------|
| `logo.tsx` | 0 | - |
| `ThemeToggle` | 1 | next-themes |
| `Footer` | 2 | - |
| `WalletButton` | 3 | ContextProvider |
| `ContextProvider` | 4 | WalletAdapter |
| `providers.tsx` | 6 | ContextProvider, next-themes |
| `rootlayout.tsx` | 7 | providers.tsx |

## Getting Started

```bash
# Install
pnpm install

# Dev server
pnpm dev

# Add components
pnpm dlx shadcn@latest add dialog
```

## Design System

### CSS Utilities (in `globals.css`)

| Class | Effect |
|-------|--------|
| `.bg-mesh` | Auto mesh gradient |
| `.glass` | Frosted glass |
| `.glow-green` | Brand glow |
| `.animate-fade-in` | Fade in |
| `.soft-ui` | Neumorphic |

### Button Variants

```tsx
<Button variant="default">Primary</Button>
<Button variant="glow">Glowing</Button>
<Button variant="soft">Soft UI</Button>
<Button variant="glass">Glass</Button>
<Button variant="outline">Outline</Button>
```

## Complexity Hotspots

| File | Complexity | Notes |
|------|------------|-------|
| ContextProvider.tsx | High | Wallet state |
| providers.tsx | Medium | Context nesting |

## Tour (Recommended Learning Path)

1. **Start**: `app/page.tsx` - The homepage
2. **Shell**: `app/layout.tsx` - Root layout
3. **Providers**: `app/providers.tsx` - Theme/wallet setup
4. **Context**: `contexts/ContextProvider.tsx` - Wallet logic
5. **UI**: `components/ui/button.tsx` - Component patterns
6. **Design**: `styles/globals.css` - Design system