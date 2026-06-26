# BITE — marketing & legal site

A static [Astro](https://astro.build) site for BITE. It is **separate from the Expo app**
(no app code, no Supabase, no Clerk) and lives in its own repo.

Its only jobs: look premium, point people to download the app, and host the legal pages.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # static output in dist/
npm run preview  # preview the built site
```

## Deploy

Any static host. Recommended: Vercel, Netlify, or Cloudflare Pages.
A root `netlify.toml` is already configured for Netlify.
- Build command: `npm run build`
- Output directory: `dist`

Then point the domain at it. Update `site` in `astro.config.mjs` to the real domain
first (used for canonical URLs and Open Graph).

## Editing content

- **Pages:** `src/pages/*.astro`
- **Design tokens / brand colors:** `src/styles/global.css` (`:root`)
- **Download links & contact email:** `src/config.ts` (single source of truth)
- **Legal copy:** `src/pages/privacy.astro` and `src/pages/terms.astro` — mirror of the
  app's `PrivacyScreen.tsx`. Keep them in sync when the app's copy changes.
- **Screenshots:** `public/screens/` (curated from `ad-screenshots/`)
