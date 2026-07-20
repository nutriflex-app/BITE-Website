// Single source of truth for site-wide values. Update these as the app ships.
export const SITE = {
  name: 'BITE',
  domain: 'https://bite.coach',
  tagline: 'Your nutrition tracker and AI coach.',
  description:
    'BITE is your nutrition tracker and AI coach in one. Log any meal in seconds, plan your week from recipes matched to your targets, and let Mr Bite coach you to your goals.',
  // TestFlight invite, kept for reference only. DownloadButtons hides the beta badge
  // whenever appStoreUrl is live, because sending people to a beta they could just
  // download from the App Store is a downgrade. Set to '#' to retire it entirely.
  testflightUrl: 'https://testflight.apple.com/join/ZdXsPeSp',
  // Public store links. Use '#' while unpublished; the badge is then not rendered.
  appStoreUrl: 'https://apps.apple.com/app/id6755889300', // live 2026-07-17, v1.1.0
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.nutriflex.systems.app',
  // Contact shown on the support + legal pages (mirrors the app's PrivacyScreen).
  supportEmail: 'support@nutriflex.app',
  privacyEmail: 'privacy@nutriflex.app',
  // Last-updated date for the legal pages (kept in sync with the app).
  legalLastUpdated: 'July 2026',
} as const;
