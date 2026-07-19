import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static marketing + legal site for BITE. Pure HTML/CSS — no SSR, no app code.
// `site` drives canonical URLs, the sitemap, and Open Graph absolute URLs — keep
// it in lockstep with SITE.domain in src/config.ts.
export default defineConfig({
  site: 'https://bite.coach',
  output: 'static',
  integrations: [
    sitemap({
      // Home is the priority landing page; legal/support pages rank below it.
      serialize(item) {
        const { pathname } = new URL(item.url);
        item.lastmod = new Date().toISOString();
        if (pathname === '/') {
          item.priority = 1.0;
          item.changefreq = 'weekly';
        } else if (/\/(privacy|terms)\/?$/.test(pathname)) {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      },
    }),
  ],
  build: {
    inlineStylesheets: 'auto',
  },
});
