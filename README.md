# DS.ai

AI-powered design system generator. Describe your brand, paste a URL, or upload a logo — download production-ready tokens as CSS variables, Tailwind v4, DTCG JSON, and flat JSON.

The site is the demo: switching a preset live-swaps the whole UI through CSS custom properties.

## Local setup

```bash
npm install
cp .env.example .env.local
```

Set `ANTHROPIC_API_KEY` in `.env.local`. Without it, the generator falls back to a local preset in development only.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — production server
- `npm run lint` — ESLint

## Launch notes

This is a public beta: no accounts, no payments. Generation and URL extraction are rate-limited. Do not commit `.env.local`. Set `ANTHROPIC_API_KEY` and `NEXT_PUBLIC_SITE_URL` on the host (Vercel) before going live.
