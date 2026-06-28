import { defineCollection, z } from 'astro:content';

const gallery = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    caption: z.string(),
    artType: z.enum(['network', 'spiral', 'field', 'cube', 'crowd', 'tree']),
    tags: z.array(z.string()),
    source: z.string(),
    date: z.string(),
    licence: z.string().default('CC BY-NC-SA 4.0'),
    filter: z.string(),
  }),
});

export const collections = { gallery };
