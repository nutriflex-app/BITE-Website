import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static marketing + legal site for BITE. Pure HTML/CSS — no SSR, no app code.
// `site` drives canonical URLs, the sitemap, and Open Graph absolute URLs — keep
// it in lockstep with SITE.domain in src/config.ts.
export default defineConfig({
  site: 'https://bite.coach',
  output: 'static',
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
