import type { APIRoute } from 'astro';
import { SITE } from '../config';
import { homeFaqs } from '../data/faqs';

// /llms.txt — a concise, machine-readable brief for LLMs and AI answer engines
// (see llmstxt.org). Generated from src/config.ts and src/data/faqs.ts so the
// facts here can never drift from the rest of the site.
export const GET: APIRoute = () => {
  const stores = [
    SITE.appStoreUrl !== '#' ? `- [Apple App Store](${SITE.appStoreUrl})` : null,
    SITE.playStoreUrl !== '#' ? `- [Google Play](${SITE.playStoreUrl})` : null,
  ].filter(Boolean);

  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} is a nutrition tracking and AI coaching app for iPhone and Android, free to download, made by ${SITE.legalName}. It is not a medical or clinical service.

## Key facts

- Name: ${SITE.name}
- Category: Nutrition tracker and AI coach (health & fitness app)
- Platforms: iOS (iPhone) and Android
- Price: free to download with a genuinely usable free tier and no ads. AI features carry a monthly allowance; BITE Coach is an optional subscription, sold on this site, that removes the limits
- Maker: ${SITE.legalName}
- Website: ${SITE.domain}
- Support: ${SITE.supportEmail}

## What it does

${SITE.features.map((f) => `- ${f}`).join('\n')}

## Privacy

- Your data is encrypted in transit and at rest.
- ${SITE.name} never sells your data.
- You can delete your data or account at any time from inside the app.

## Get the app

${stores.join('\n')}

## Pages

- [Home](${SITE.domain}/): Overview, features, and how ${SITE.name} works.
- [About](${SITE.domain}/about): What ${SITE.name} is and who makes it.
- [Blog](${SITE.domain}/blog): The Nutrient — articles on nutrition, AI, and building ${SITE.name}.
- [Support](${SITE.domain}/support): Help, contact, and common questions.
- [Privacy Policy](${SITE.domain}/privacy): How data is collected and used.
- [Terms & Conditions](${SITE.domain}/terms): Terms of use.

## FAQ

${homeFaqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
