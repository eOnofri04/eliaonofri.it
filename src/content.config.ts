import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Astro 5+ Content Layer API. Gallery entries are one JSON file per piece under
// src/content/gallery/ (not wired into the gallery page yet — see TODO).
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/gallery' }),
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
