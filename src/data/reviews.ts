// Home-page review content. The hybrid model:
//
//   1. FETCHED — scripts/fetch-reviews.mjs pulls real 4-5 star reviews from the
//      App Store + Google Play into reviews.json at build time (`npm run build`
//      runs it via `prebuild`). This keeps the wall fresh automatically.
//   2. PINNED — hand-picked favourites you want shown first and never dropped.
//      Add REAL reviews here only (copy the wording from the store). Never invent
//      testimonials — the point is that everything on the page is a genuine review.
//
// Pinned reviews render first, in order, then the freshest fetched ones fill in
// behind them (deduped so a pinned review never appears twice). See Reviews.astro.
import fetched from './reviews.json';

export type ReviewSource = 'app_store' | 'play_store';

export interface Review {
  /** Stable id — for fetched reviews, "app_store:<n>" / "play_store:<n>". */
  id: string;
  source: ReviewSource;
  author: string;
  /** 1-5. Only 4-5 are surfaced. */
  rating: number;
  /** Optional short headline (App Store reviews have one; Play reviews don't). */
  title?: string;
  body: string;
  /** ISO date string, or null if unknown. */
  date?: string | null;
  country?: string;
}

// How many reviews to show on the page at most.
const MAX_DISPLAY = 9;

// --- Pinned (curated) -------------------------------------------------------
// Paste real reviews you want featured. To pin a fetched review to the top
// instead of retyping it, copy its `id` from src/data/reviews.json and add an
// entry with that same id — the fetched duplicate is dropped automatically.
export const pinnedReviews: Review[] = [
  // {
  //   id: 'app_store:1234567890',
  //   source: 'app_store',
  //   author: 'Jane D.',
  //   rating: 5,
  //   title: 'Finally a tracker I actually use',
  //   body: 'Logging by photo is unreal. Mr BITE plans my whole week in seconds.',
  //   date: '2026-07-10T00:00:00Z',
  // },
];

// --- Merge ------------------------------------------------------------------
const fetchedReviews = (fetched.reviews as Review[]) ?? [];
const pinnedIds = new Set(pinnedReviews.map((r) => r.id));

export const homeReviews: Review[] = [
  ...pinnedReviews,
  ...fetchedReviews.filter((r) => !pinnedIds.has(r.id)),
]
  .filter((r) => r.rating >= 4 && (r.body || r.title))
  .slice(0, MAX_DISPLAY);

// --- Aggregate (for optional schema.org AggregateRating) --------------------
// Only meaningful once a handful of reviews exist; the page guards on `count`.
const ratingSum = homeReviews.reduce((sum, r) => sum + r.rating, 0);

export const reviewStats = {
  count: homeReviews.length,
  average: homeReviews.length ? Math.round((ratingSum / homeReviews.length) * 10) / 10 : 0,
  appStore: homeReviews.filter((r) => r.source === 'app_store').length,
  playStore: homeReviews.filter((r) => r.source === 'play_store').length,
  /** When the underlying store data was last pulled. */
  updatedAt: fetched.updatedAt as string,
};
