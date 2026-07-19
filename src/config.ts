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
} as const;
