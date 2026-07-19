// Home-page FAQ content. Shared between the rendered accordion (Faq.astro) and
// the FAQPage structured data (index.astro) so the two can never drift — Google
// requires schema FAQ text to match what's visible on the page.
export interface Faq {
  q: string;
  a: string;
}

export const homeFaqs: Faq[] = [
  {
    q: 'Is Mr BITE free?',
    a: 'Yes. Mr BITE is free to download on Google Play and the App Store. If a paid plan ever arrives, it will be made clear up front.',
  },
  {
    q: 'Do I have to weigh my food?',
    a: 'No. Snap a photo, scan a barcode, say what you ate, or search, and Mr BITE estimates the macros for you. You can fine-tune portions whenever you like.',
  },
  {
    q: 'Is Mr BITE on iPhone and Android?',
    a: 'Yes. Mr BITE is live on the App Store for iPhone and on Google Play for Android.',
  },
  {
    q: 'Is my data private?',
    a: 'Your data is encrypted in transit and at rest, we never sell it, and you can delete everything from the app at any time.',
  },
  {
    q: 'Is Mr BITE medical advice?',
    a: 'No. Mr BITE is a nutrition tracker and coaching tool, not a medical or clinical service. For medical needs, please check with a qualified professional.',
  },
];
