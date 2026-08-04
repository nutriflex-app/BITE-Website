import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static marketing + legal site for BITE. Pure HTML/CSS — no SSR, no app code.
// `site` drives canonical URLs, the sitemap, and Open Graph absolute URLs — keep
// it in lockstep with SITE.domain in src/config.ts.
export default defineConfig({
  site: 'https://bite.coach',
  output: 'static',
  integrations: [
    // The checkout return pages are noindex (Base.astro), so listing them in
    // the sitemap would send crawlers contradictory signals.
    sitemap({
      filter: (page) => !page.includes('/pro/success') && !page.includes('/pro/cancel'),
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
