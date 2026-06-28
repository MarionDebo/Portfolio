import { defineCollection, z } from 'astro:content';

const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    year:        z.number(),
    tags:        z.array(z.string()),
    impact:      z.string(),
    featured:    z.boolean().default(false),
    order:       z.number().default(99),
    // Case-study detail page — only `published` entries render a /work/[slug] page.
    published:   z.boolean().default(false),
    role:        z.string().optional(),
    scope:       z.string().optional(),
    heroImageAlt:z.string().optional(),
    nextTitle:   z.string().optional(),
    nextHref:    z.string().optional(),
  }),
});

export const collections = { portfolio };
