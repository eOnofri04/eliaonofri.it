import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Astro 5+ Content Layer API. Gallery entries are one JSON file per piece under
// src/content/gallery/; images live in public/gallery/ as optimised WebP.
// With a `source` bib key, the classification (field/application) comes from the bib;
// pieces not tied to a paper omit it and list `topics` keywords (src/lib/taxonomy.ts).
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
    // YYYY, YYYY-MM or YYYY-MM-DD; drives the ordering (newest first). Pre-filled from
    // the publication date; edit it freely to move a piece. Falls back to the bib date.
    date: z.string().regex(/^\d{4}(-\d{2}){0,2}$/).optional(),
    topics: z.array(z.string()).optional(), // taxonomy keywords; added to the bib's when a source is given
    licence: z.string().default('CC BY-NC-SA 4.0'),
    // mock camera data, shown with the `i` key in the enlarged view (easter egg)
    exif: z.object({
      camera: z.string().optional(),                     // the tool that drew it
      aperture: z.string().optional(),                   // a constant, numerically: "3.14" is shown as f/3.14
      exposure: z.string().optional(),                   // how long it took to make
      iso: z.union([z.number(), z.string()]).optional(), // brightness: 100 very dark … 64000 very light
      dpi: z.union([z.number(), z.string()]).optional(), // defaults to the year of the piece
    }).optional(),
    reviewed: z.boolean().default(false), // caption checked by Elia
  }),
});

export const collections = { gallery };
