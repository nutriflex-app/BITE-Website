#!/usr/bin/env node
// Pulls real customer reviews from the App Store + Google Play and writes them to
// src/data/reviews.json, which the site reads at build time (see src/data/reviews.ts).
//
// Sources:
//   - App Store: Apple's public customer-reviews RSS/JSON feed (no auth, per-country).
//   - Google Play: google-play-scraper (unofficial; scrapes the public listing).
//
// This runs as a `prebuild` step and MUST NOT break the deploy: any source that
// errors is skipped, and if the whole run yields nothing we keep the existing
// committed JSON rather than overwriting it with an empty list. That means the
// last good set of reviews always ships even if a feed is down or Google changes
// its markup. Run manually to refresh the committed file: `npm run reviews`.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, '../src/data/reviews.json');

// --- Config -----------------------------------------------------------------
const APP_STORE_ID = '6755889300';
const PLAY_PACKAGE = 'com.nutriflex.systems.app';

// Storefronts to sweep. Reviews are per-country on both stores, so pull from the
// markets the app is likely to have users in and merge. Add more as you expand.
const COUNTRIES = ['us', 'gb', 'ca', 'au', 'ie', 'nz', 'ng', 'za', 'in', 'de', 'nl', 'se', 'fr'];

const MIN_RATING = 4; // only surface 4-5 star reviews on the marketing site
const MAX_REVIEWS = 30; // cap what we commit; the data layer caps again for display
const APPLE_PAGES = 5; // RSS pages per country (Apple returns ~50 reviews/page)

// --- Helpers ----------------------------------------------------------------
const clean = (s) => (s || '').replace(/\s+/g, ' ').trim();

// Stable id so the same review dedupes across refreshes and across pinned/fetched.
const makeId = (source, raw) => `${source}:${raw}`;

async function fetchJson(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'bite-web-reviews/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

// --- App Store --------------------------------------------------------------
async function fetchAppStore() {
  const out = [];
  for (const country of COUNTRIES) {
    for (let page = 1; page <= APPLE_PAGES; page++) {
      const url = `https://itunes.apple.com/${country}/rss/customerreviews/page=${page}/id=${APP_STORE_ID}/sortBy=mostRecent/json`;
      let feed;
      try {
        feed = await fetchJson(url);
      } catch {
        break; // no more pages for this country
      }
      const entries = feed?.feed?.entry;
      // The first entry is app metadata, not a review; real reviews have im:rating.
      const reviews = Array.isArray(entries) ? entries.filter((e) => e['im:rating']) : [];
      if (!reviews.length) break;
      for (const r of reviews) {
        const rating = Number(r['im:rating']?.label);
        if (!rating) continue;
        out.push({
          id: makeId('app_store', r.id?.label),
          source: 'app_store',
          author: clean(r.author?.name?.label) || 'App Store user',
          rating,
          title: clean(r.title?.label),
          body: clean(r.content?.label),
          date: r.updated?.label || null,
          country,
        });
      }
    }
  }
  return out;
}

// --- Google Play ------------------------------------------------------------
async function fetchPlay() {
  const { default: gplay } = await import('google-play-scraper');
  const out = [];
  for (const country of COUNTRIES) {
    let res;
    try {
      res = await gplay.reviews({
        appId: PLAY_PACKAGE,
        sort: gplay.sort.NEWEST,
        num: 100,
        country,
      });
    } catch {
      continue;
    }
    for (const r of res?.data || []) {
      const rating = Number(r.score);
      if (!rating) continue;
      out.push({
        id: makeId('play_store', r.id),
        source: 'play_store',
        author: clean(r.userName) || 'Google Play user',
        rating,
        title: '',
        body: clean(r.text),
        date: r.date ? new Date(r.date).toISOString() : null,
        country,
      });
    }
  }
  return out;
}

// --- Normalize --------------------------------------------------------------
function refine(reviews) {
  const seen = new Set();
  return reviews
    .filter((r) => r.rating >= MIN_RATING && (r.body || r.title))
    .filter((r) => {
      // Dedupe: same review can appear across country storefronts.
      const key = r.id || `${r.source}:${r.author}:${r.body}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
    .slice(0, MAX_REVIEWS);
}

async function readExisting() {
  try {
    return JSON.parse(await readFile(OUT, 'utf8'));
  } catch {
    return null;
  }
}

// --- Main -------------------------------------------------------------------
async function main() {
  const results = await Promise.allSettled([fetchAppStore(), fetchPlay()]);
  const [apple, play] = results;

  if (apple.status === 'rejected') console.warn('[reviews] App Store fetch failed:', apple.reason?.message);
  if (play.status === 'rejected') console.warn('[reviews] Google Play fetch failed:', play.reason?.message);

  const raw = [
    ...(apple.status === 'fulfilled' ? apple.value : []),
    ...(play.status === 'fulfilled' ? play.value : []),
  ];
  const reviews = refine(raw);

  const existing = await readExisting();

  if (!reviews.length) {
    if (existing?.reviews?.length) {
      console.warn('[reviews] Fetched 0 reviews; keeping existing reviews.json.');
      return;
    }
    // No data anywhere yet (fresh launch). Write an empty-but-valid file so the
    // build has something to import; pinned reviews in reviews.ts still render.
    console.warn('[reviews] No reviews found from any source; writing empty file.');
  }

  const appStore = reviews.filter((r) => r.source === 'app_store').length;
  const playStore = reviews.filter((r) => r.source === 'play_store').length;

  const payload = {
    updatedAt: new Date().toISOString(),
    counts: { total: reviews.length, appStore, playStore },
    reviews,
  };

  await mkdir(dirname(OUT), { recursive: true });
  await writeFile(OUT, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(`[reviews] Wrote ${reviews.length} reviews (App Store: ${appStore}, Google Play: ${playStore}).`);
}

main().catch((err) => {
  // Last-resort guard: never fail the build over reviews.
  console.warn('[reviews] Unexpected error, leaving reviews.json untouched:', err?.message);
  process.exit(0);
});
