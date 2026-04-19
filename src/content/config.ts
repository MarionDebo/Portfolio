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
  }),
});

export const collections = { portfolio };
