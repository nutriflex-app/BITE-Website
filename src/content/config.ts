import { defineCollection, z } from 'astro:content';

// Blog collection — Markdown posts under src/content/blog/*.md.
// Add a post by dropping in a new .md file with the frontmatter below.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Collins'),
    // Remote or local URL. Used as the card thumbnail, article hero, and OG image.
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    // Set true to keep a post out of the build (index + routes).
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
