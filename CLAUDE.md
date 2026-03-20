# CLAUDE.md — DesignSystems.ai

## Project Overview

AI-powered design system generator SaaS. Users input their brand identity (guided questions, URL, or logo upload) and get a complete, production-ready design token package downloadable in multiple formats. The website itself IS the demo — it live-swaps its own design system using CSS custom properties.

**Repo**: Bold-and-Code org, `designsystems-ai`
**Domain**: TBD (finding a catchy name, not `designsystems.ai`)
**Status**: MVP Week 1-3 complete. Landing page + generator page built with mock generation.

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
- **culori** — color manipulation (installed, not yet used)
- **zod** — schema validation (installed, not yet used)
- **Style Dictionary v4** — NOT YET INSTALLED, needed for export pipeline

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
│   └── generator/
│       ├── layout.tsx          # Three-panel layout + mobile tabs
│       └── page.tsx            # Generator state management + mock generation
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
│       ├── chat-panel.tsx      # Guided 7-step question flow
│       ├── preview-panel.tsx   # Live component preview (idle/generating/complete)
│       └── export-panel.tsx    # Format selection + download
├── lib/
│   ├── utils.ts                # cn() utility
│   └── tokens/
│       ├── types.ts            # Core DesignTokens interfaces (DTCG-aligned)
│       ├── presets.ts          # 8 pre-built design systems
│       ├── defaults.ts         # Shared default values (spacing, animation, etc.)
│       └── apply-theme.ts      # CSS var injection + Google Font loader
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

### Generator Page (/generator)
- Three-panel layout: Input (380px) | Preview (flex) | Export (340px)
- Mobile: tab bar switches between panels
- Left panel: 7 guided question steps (industry, mood, color, typography, roundedness, references, context)
- Center panel: 3 states (idle placeholder, generating spinner, complete with full preview)
- Right panel: format selection, code preview, token stats, download button
- **Currently uses MOCK generation** — picks a random preset after 2.5s delay

## What Needs to Be Built Next

### Priority 1: Wire Real Generation
- `src/app/api/generate/route.ts` — Claude API route with structured output
- `src/lib/ai/prompt.ts` — System prompt for token generation
- `src/lib/ai/schema.ts` — Zod schema for DesignTokens structured output
- Environment variable: `ANTHROPIC_API_KEY`
- Install: `@anthropic-ai/sdk`

### Priority 2: Export Pipeline
- `src/app/api/export/route.ts` — Token transformation + ZIP packaging
- `src/lib/export/dtcg-formatter.ts` — DTCG JSON output
- `src/lib/export/css-formatter.ts` — CSS custom properties
- `src/lib/export/tailwind-formatter.ts` — Tailwind v4 @theme block
- `src/lib/export/flat-json-formatter.ts`
- `src/lib/export/zip-builder.ts` — JSZip packaging
- Install: `style-dictionary`, `jszip`, `file-saver`

### Priority 3: Color Engine
- `src/lib/tokens/color-utils.ts` — Culori integration
- Generate full 50-950 scales from primary color anchors (Oklch interpolation)
- WCAG AA contrast validation + auto-fix
- Color-blind simulation

### Priority 4: Extraction
- `src/app/api/extract-url/route.ts` — Playwright headless browser
- `src/app/api/extract-image/route.ts` — Color Thief extraction
- Install: `playwright`, `colorthief`, `sharp`

### Future Phases
- Auth (Clerk), persistence (Supabase), payments (Stripe)
- Dark mode variant generation
- More export formats (SCSS, Swift, Kotlin, Figma)
- Token fine-tuning editor
- API access for programmatic generation

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
