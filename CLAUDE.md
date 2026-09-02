# CLAUDE.md — DesignSystems.ai

## Project Overview

AI-powered design system generator SaaS. Users input their brand identity (guided questions, URL, or logo upload) and get a complete, production-ready design token package downloadable in multiple formats. The website itself IS the demo — it live-swaps its own design system using CSS custom properties.

**Repo**: Bold-and-Code org, `designsystems-ai`
**Domain**: TBD (finding a catchy name, not `designsystems.ai`)
**Status**: MVP P1-P4 COMPLETE (2026-03-23). AI generation, export pipeline, color engine, extraction all wired. Auth/persistence/payments left for CTO handoff.

## Development Commands

- `npm run dev` — Start dev server (default port 3000, may use 3001 if taken)
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — ESLint

## Tech Stack

- **Next.js 16.2.0** (App Router, RSC)
- **Tailwind CSS v4** — CSS-native `@theme inline` (no tailwind.config.js)
- **React 19**
- **TypeScript 5**
- **shadcn/ui** components (not yet initialized — to be added)
- **framer-motion** — animations
- **lucide-react** — icons
- **culori** — color manipulation (installed, type declarations in src/types/culori.d.ts)
- **zod** — schema validation (used for AI output validation)
- **@anthropic-ai/sdk** — Claude API for token generation
- **jszip** — client-side ZIP packaging for exports

## Architecture

### Styling: CSS Custom Properties

ALL styling uses CSS custom variables, NOT Tailwind utility color classes. This is what enables the live theme-swap demo.

**Semantic colors** (shadcn-compatible naming):
```
var(--background), var(--foreground)
var(--card), var(--card-foreground)
var(--primary), var(--primary-foreground)
var(--secondary), var(--secondary-foreground)
var(--muted), var(--muted-foreground)
var(--accent), var(--accent-foreground)
var(--destructive), var(--destructive-foreground)
var(--border), var(--input), var(--ring)
```

**Other tokens**:
```
var(--radius), var(--radius-sm), var(--radius-lg), var(--radius-xl)
var(--font-heading), var(--font-body), var(--font-mono)
var(--shadow-sm), var(--shadow-md), var(--shadow-lg), var(--shadow-xl)
var(--duration-fast), var(--duration-normal), var(--duration-slow)
```

### Live Theme-Swap

`lib/tokens/apply-theme.ts` writes a `DesignTokens` object to `:root` as CSS custom properties. All components use these vars, so the entire page morphs instantly when tokens change. Smooth 0.4s transitions on all elements via `globals.css`.

### ThemeTokenProvider

Context at `providers/theme-token-provider.tsx`. Hook: `useThemeTokens()` returns:
- `tokens` — current DesignTokens object
- `activePresetId` — which preset is active (null if custom)
- `setTokens(tokens)` — apply custom tokens
- `setPreset(id)` — switch to a preset
- `presets` — array of 8 PresetMeta objects

### 8 Pre-Built Presets

Defined in `lib/tokens/presets.ts`:
1. Midnight SaaS (default) — dark, electric blue, Inter
2. Warm Studio — cream, terracotta, Playfair Display
3. Neon Startup — near-black, lime green, Space Grotesk
4. Corporate Trust — navy, conservative, system fonts
5. Playful Brand — coral + teal, rounded, Nunito
6. Minimal Swiss — black/white, red accent, 0px radius
7. Nature Organic — forest green, DM Serif Display
8. Brutalist — high contrast, sharp, Space Mono

## File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout + ThemeTokenProvider
│   ├── page.tsx                # Landing page (assembles sections)
│   ├── globals.css             # Tailwind v4 @theme + CSS vars
│   ├── generator/
│   │   ├── layout.tsx          # Three-panel layout + mobile tabs
│   │   └── page.tsx            # Generator state management + real API call
│   └── api/
│       ├── generate/route.ts   # Claude API → structured tokens → color engine → full DesignTokens
│       └── extract-url/route.ts # Server-side URL color/font extraction
├── components/
│   ├── landing/
│   │   ├── header.tsx          # Sticky nav + ThemeSwitcher
│   │   ├── hero.tsx            # Main hero + "Watch It Change" cycling
│   │   ├── theme-switcher.tsx  # 8 colored preset circles
│   │   ├── how-it-works.tsx    # 3-step cards
│   │   ├── token-categories.tsx # 8 category cards with live previews
│   │   ├── export-formats.tsx  # 4 format tabs with real code blocks
│   │   ├── cta-banner.tsx      # CTA section
│   │   └── footer.tsx
│   └── generator/
│       ├── chat-panel.tsx      # 7-step questions + URL/logo extraction
│       ├── preview-panel.tsx   # 20+ section comprehensive preview
│       └── export-panel.tsx    # Format selection + ZIP download
├── lib/
│   ├── utils.ts                # cn() utility
│   ├── ai/
│   │   ├── schema.ts           # Zod schema + JSON schema for Claude tool_use
│   │   └── prompt.ts           # System prompt + user prompt builder
│   ├── tokens/
│   │   ├── types.ts            # Complete DesignTokens (20+ token categories)
│   │   ├── presets.ts          # 8 pre-built design systems
│   │   ├── defaults.ts         # All default values (spacing, animation, components, typography usage, etc.)
│   │   ├── apply-theme.ts      # CSS var injection + Google Font loader
│   │   └── color-utils.ts      # Color scale generation + WCAG contrast + color-blind sim
│   └── export/
│       ├── dtcg-formatter.ts   # W3C DTCG JSON format
│       ├── css-formatter.ts    # CSS Custom Properties
│       ├── tailwind-formatter.ts # Tailwind v4 @theme block
│       ├── flat-json-formatter.ts # Flat key-value JSON
│       └── zip-builder.ts      # Client-side JSZip + browser download
├── extract/
│   └── image-colors.ts         # Client-side Canvas API color extraction
├── types/
│   └── culori.d.ts             # Type declarations for culori
├── providers/
│   └── theme-token-provider.tsx
└── hooks/                      # (empty, to be used)
```

## What's Built

### Landing Page (/)
- Header with nav + ThemeSwitcher (8 preset circles)
- Hero with "Watch It Change" auto-cycling demo
- How It Works (3 steps)
- What We Generate (8 token category cards with live previews)
- Export Formats (4 tabs with real code blocks that update with theme)
- CTA Banner + Footer

### Generator Page (/generator) — FULLY WIRED
- Three-panel layout: Input (380px) | Preview (flex) | Export (340px)
- Mobile: tab bar switches between panels
- Left panel: 7 guided question steps + URL extraction + logo upload
- Center panel: 20+ section comprehensive preview (colors, typography, components, accessibility, spacing, etc.)
- Right panel: format selection, code preview, token stats, real ZIP download
- **Real AI generation** via Claude Sonnet 4 (tool_use structured output)
- Falls back to mock if API key is missing

### AI Generation Pipeline
- Claude generates reduced schema (8 color anchors, semantic colors, fonts, radius)
- Server expands to full DesignTokens: color engine generates 50-950 scales, WCAG contrast auto-fix, defaults for spacing/animation/components/typography usage
- Zod validation on AI output

### Export Pipeline
- 4 formats: DTCG JSON, CSS Variables, Tailwind v4, Flat JSON
- All 20+ token categories exported in every format
- Client-side JSZip with README + quickstart.md (framework guides)

### Color Engine
- RGB mixing for 50-950 scale generation (hue-stable)
- WCAG AA contrast checking + auto-fix
- Color blindness simulation utility

### Extraction
- URL: server-side fetch + HTML/CSS parsing (colors + fonts)
- Logo: client-side Canvas API color extraction

### Token Categories Generated (20+)
Colors (8x11 + 19 semantic), typography (families, scale, weights), typography usage rules (14 roles), component tokens (button, card, input, badge, avatar), border radius, shadows, spacing, animation, breakpoints, z-index, opacity, border-width, letter-spacing, line-height, focus config, section spacing (responsive)

## What Needs to Be Built (CTO Handoff)

### Infrastructure
- Auth (Clerk)
- Persistence/database (Supabase)
- Payments (Stripe) — see pricing in research docs
- Deployment (Vercel)
- Domain setup

### Enhancements
- Dark mode variant generation
- More export formats (SCSS, Swift, Kotlin, Figma Variables, JS/TS modules)
- Token fine-tuning editor (post-generation editing UI)
- API access for programmatic generation
- shadcn/ui component library integration
- Shareable HTML style guide page

## Key Patterns

- **Always use CSS vars for colors** — never hardcode hex in components. `style={{ backgroundColor: "var(--primary)" }}` not `bg-blue-500`
- **Every component must morph** — when `applyTheme()` is called, every visible element should transition smoothly
- **Fonts from Google Fonts only** (MVP) — `loadGoogleFonts()` in `apply-theme.ts` dynamically injects `<link>` tags
- **Mobile-first** — generator uses tab navigation on <1024px

## Research & Plan

Full market research, competitor analysis, and phased implementation plan saved in:
- `/Users/franciscosaez/.claude/projects/-Users-franciscosaez-PatentiaRepo/memory/spinoff_designsystems_ai.md`
- `/Users/franciscosaez/.claude/projects/-Users-franciscosaez-PatentiaRepo/memory/spinoff_designsystems_ai_research.md`
- `/Users/franciscosaez/.claude/plans/unified-twirling-comet.md`
