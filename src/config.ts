// Single source of truth for site-wide values. Update these as the app ships.
export const SITE = {
  name: 'BITE',
  domain: 'https://bite.coach',
  tagline: 'Your nutrition tracker and AI coach.',
  description:
    'BITE is your nutrition tracker and AI coach in one. Log any meal in seconds, plan your week from recipes matched to your targets, and let Mr Bite coach you to your goals.',
  // Primary distribution today is TestFlight. Paste the invite link here and the
  // hero/CTA buttons switch from "coming soon" to a live "Join the beta" button.
  testflightUrl: 'https://testflight.apple.com/join/ZdXsPeSp',
  // Public store links. Use '#' while unpublished; buttons show a "Coming soon" state.
  appStoreUrl: '#', // iOS public App Store - not live yet (iOS is TestFlight beta for now)
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.nutriflex.systems.app',
  // Contact shown on the support + legal pages (mirrors the app's PrivacyScreen).
  supportEmail: 'support@nutriflex.app',
  privacyEmail: 'privacy@nutriflex.app',
  // Last-updated date for the legal pages (kept in sync with the app).
  legalLastUpdated: 'June 2026',
} as const;
