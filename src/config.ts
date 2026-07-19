// Single source of truth for site-wide values. Update these as the app ships.
export const SITE = {
  name: 'Mr BITE',
  domain: 'https://bite.coach',
  tagline: 'Your nutrition tracker and AI coach.',
  description:
    'Mr BITE is your nutrition tracker and AI coach in one. Log any meal in seconds, plan your week from recipes matched to your targets, and let Mr BITE coach you to your goals.',
  // TestFlight beta is retired now that iOS is live on the public App Store.
  // Set back to an invite link to re-enable the beta button.
  testflightUrl: '#',
  // Public store links. Use '#' while unpublished; buttons show a "Coming soon" state.
  appStoreUrl: 'https://apps.apple.com/us/app/mr-bite-ai-nutrition-coach/id6755889300',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.nutriflex.systems.app',
  // Contact shown on the support + legal pages (mirrors the app's PrivacyScreen).
  supportEmail: 'support@nutriflex.app',
  privacyEmail: 'privacy@nutriflex.app',
  // Last-updated date for the legal pages (kept in sync with the app).
  legalLastUpdated: 'July 2026',
  // ISO date surfaced as schema.org dateModified (freshness signal for search + AI).
  updated: '2026-07-19',
  // The company behind the app — surfaced as the schema.org Organization maker.
  legalName: 'Nutriflex Systems Ltd',
  // Verified brand profiles for schema.org sameAs + footer links. Store links are
  // added automatically; add social URLs (Instagram/TikTok/X/YouTube) here.
  social: [
    'https://www.instagram.com/bite.coach.app/',
    'https://www.tiktok.com/@biteaicoach',
    'https://www.youtube.com/@bitecoach',
  ] as readonly string[],
  // Core capabilities, stated as plain facts. Feeds the SoftwareApplication
  // featureList (structured data) and reads as crawlable text on the site.
  features: [
    'Log meals by photo, barcode, voice, or text search',
    'AI nutrition coach (Mr BITE) that plans meals around your targets',
    'Personalised daily calorie and protein targets',
    'Automatic weekly meal plans from recipes that fit your numbers',
    'Aisle-sorted shopping lists generated from your plan',
    'Weight and macro trend tracking',
    'Free on iOS and Android with no ads or subscriptions',
  ] as readonly string[],
} as const;
