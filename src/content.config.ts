import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Astro 5+ Content Layer API. Gallery entries are one JSON file per piece under
// src/content/gallery/; images live in public/gallery/ as optimised WebP.
// With a `source` bib key, year, tag and filter groups are derived from the bib;
// pieces not tied to a paper omit it and may set them by hand.
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    caption: z.string(),
    alt: z.string(),
    image: z.string(),               // public path, e.g. /gallery/foo.webp
    width: z.number().int(),
    height: z.number().int(),
    source: z.string().optional(),   // bib key in src/data/publications.bib; omit or "" if none
    year: z.number().int().optional(),   // only used without a source
    tag: z.string().optional(),          // only used without a source
    groups: z.array(z.string()).optional(), // filter ids (crypto, graph, numerical, ml, topology); only without a source
    licence: z.string().default('CC BY-NC-SA 4.0'),
    order: z.number().optional(),    // lower first; ties fall back to year, newest first
    reviewed: z.boolean().default(false), // caption checked by Elia
  }),
});

export const collections = { gallery };
