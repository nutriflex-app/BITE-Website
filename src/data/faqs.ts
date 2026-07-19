// Home-page FAQ content. Shared between the rendered accordion (Faq.astro) and
// the FAQPage structured data (index.astro) so the two can never drift — Google
// requires schema FAQ text to match what's visible on the page.
export interface Faq {
  q: string;
  a: string;
}

export const homeFaqs: Faq[] = [
  {
    q: 'What is Mr BITE?',
    a: 'Mr BITE is a free nutrition tracking and AI coaching app for iPhone and Android. It lets you log any meal in seconds, gives you personalised calorie and protein targets, and plans your week from recipes that fit those targets.',
  },
  {
    q: 'How does Mr BITE work?',
    a: 'You answer a few quick questions to set daily calorie and protein targets, then log meals by photo, barcode, voice, or search. Mr BITE, the built-in AI coach, plans meals around your targets, turns them into a shopping list sorted by aisle, and tracks your weight and macro trends over time.',
  },
  {
    q: 'Is Mr BITE free?',
    a: 'Yes. Mr BITE is free to download on Google Play and the App Store, with no subscriptions, in-app purchases, or ads. If a paid plan ever arrives, it will be made clear up front.',
  },
  {
    q: 'What platforms is Mr BITE available on?',
    a: 'Mr BITE is available on iPhone through the Apple App Store and on Android through Google Play.',
  },
  {
    q: 'Do I have to weigh my food?',
    a: 'No. Snap a photo, scan a barcode, say what you ate, or search, and Mr BITE estimates the macros for you. You can fine-tune portions whenever you like.',
  },
  {
    q: 'How does the Mr BITE AI coach work?',
    a: 'The AI coach uses your targets, your logged meals, and any constraints or cravings you describe to suggest recipes, meal plans, and swaps that fit your numbers and your real life. It answers in plain language rather than acting as a generic chatbot.',
  },
  {
    q: 'Does Mr BITE create meal plans and shopping lists?',
    a: 'Yes. Pick a few meals and Mr BITE fills in the rest of your week from recipes that match your targets, then turns the whole plan into a single shopping list organised by aisle.',
  },
  {
    q: 'Do I need an account to use Mr BITE?',
    a: 'Yes. You create a free account so your targets, meals, and plans stay in sync across sessions and remain private to you. You can delete your account and data at any time.',
  },
  {
    q: 'Is my data private?',
    a: 'Your data is encrypted in transit and at rest, Mr BITE never sells it, and you can delete everything from the app at any time.',
  },
  {
    q: 'Is Mr BITE medical advice?',
    a: 'No. Mr BITE is a nutrition tracker and coaching tool, not a medical or clinical service. For medical needs, please check with a qualified professional.',
  },
];
