# Updating the site

Nearly every section is driven by one data file, so content changes rarely touch a page.
Edit the file, check the result with `npm run dev` (also in a narrow window), then commit and push to `main`: the GitHub Action rebuilds and publishes the site in a couple of minutes.

| Section | File |
| --- | --- |
| Publications, statistics | `CV_repo/bibdesk-database.bib`, then `npm run sync:bib` |
| Talks | `src/data/research.ts`, `talks` |
| Projects | `src/data/research.ts`, `projects` |
| Service | `src/data/research.ts`, `service` |
| Home: *Highlights*, research chips | `src/data/highlights.ts` |
| Home: affiliations | `src/data/affiliations.ts` |
| Teaching and students (EN and IT) | `src/data/teaching.ts` |
| Software | `src/data/software.ts` |
| Gallery | `src/content/gallery/*.json` and `public/gallery/*.webp` |
| Collaboration graph | `src/data/collaborators.json` |
| CV | `CV_repo/CV_Onofri_{light,dark}.pdf`, then `npm run sync:cv` |

A `color` field takes `'teal'`, `'terra'`, `'gold'` or `'purple'`.
In the `.ts` files, mind the commas between entries, and write an apostrophe inside single quotes as `\'`.
Topic keywords are listed in [TAXONOMY.md](TAXONOMY.md).

## Publications

The site reads a copy of the CV bib, so edit the entry in BibDesk (`CV_repo/bibdesk-database.bib`), push the CV repository as usual, and run `npm run sync:bib`.

The `keywords` field decides where an entry goes and how it is labelled:

- the first section keyword (`journal`, `proceeding`, `conference`, `other`, `editor`, `thesis`, `submitted`, `inprep`) picks the section, *Other Contributions* by default;
- the topic keywords give the chips and the filters (see [TAXONOMY.md](TAXONOMY.md));
- `toappear` adds a *to appear* badge to the title, so a "[To appear]" at the end of the journal name is dropped on the site.

Entries under review show the `journal` field if there is one (e.g. `arXiv preprint`), otherwise *arXiv preprint*, *bioRxiv preprint* or *Preprint*, guessed from the links; their note is not shown.

The corresponding author gets a small envelope, both here and in the CV.
By default that is me, except for theses and edited volumes.
A `corresponding` field overrides it: `{Di Pietro}`, `{Onofri, Silvia}` when a surname is ambiguous, several names joined by `and`, or `{none}`.

Links come from the entry itself:
`doi` and `url` as they are, and in `note` the macros `\arxiv{…}`, `\eprint{…}` and `\href{url}{text}`.
A placeholder such as `\arxiv{2609.XXXX}` stays hidden until it is a real id.

The collaboration graph and the counts on `/statistics` are recomputed from the bib at every build.

## Talks

One line per talk in `research.ts`, anywhere in the list (the page sorts by date):

```ts
{ date: '2026-09-16', title: 'COD-ssi: …', event: 'ESORICS 2026', location: 'Rome, Italy', kind: 'Talk',
  paper: 'Onofri_De-Salve_Mori_etal_27',
  links: [{ label: 'slides', href: 'https://drive.google.com/file/d/…/view?usp=sharing' }] },
```

`kind` is one of `'Talk'`, `'Invited talk'`, `'Invited lesson'`, `'Seminar'`, `'Poster'`, `'Mini-course'`.
`paper` borrows the topics of a publication; `topics: [...]` adds keywords to it, or stands in for it.
`location` and `links` are optional, and slides can be added later.
Drive files must be shared with "anyone with the link"; a PDF under `public/talks/` works as `href: '/talks/file.pdf'`.

## Projects

```ts
{
  acronym: 'H2IOSC', title: '…', org: 'IAC · CNR', period: '2023 – 2025',
  grant: '…', url: 'https://…',        // optional
  blurb: 'One or two sentences.',
  color: 'gold',
  topics: ['numerical analysis', 'cultural heritage'],
  tags: ['HPC'],                        // optional extras
},
```

Cards keep the order of the list.

## Service

Blocks with a `heading` and `roles` (`{ role, org, detail?, url? }`), `tagGroups` (`{ label, tags: [{ name, detail }] }`), or both.
A new review usually means widening a `detail`, e.g. `'2025'` to `'2025–26'`.

## Home page

The *Highlights* cards (`highlights.ts`, `highlights`) do not expire by themselves, so revisit them every few months:

```ts
{ kind: 'Talk', date: 'Sep 2026', title: '…', detail: 'ESORICS 2026 · Rome, Italy', color: 'teal', href: '/research' },
```

`kind` is `'Talk'`, `'Organising'`, `'Teaching'`, `'Primer'` or `'Paper'` (`HighlightKind` at the top of the file); `date` is free text; `href` is optional.
The research chips below are plain `{ label, color }` pairs.

Affiliations (`affiliations.ts`):

```ts
{ role: 'Postdoctoral Researcher · CRI-Lab, CEMSE', org: 'KAUST', location: 'Thuwal, Saudi Arabia',
  color: 'teal', primary: true, url: 'https://www.kaust.edu.sa' },
```

`primary: true` puts it in the headline under the name.

## Teaching and students

`teaching.ts` feeds both `/teaching` and `/it/teaching`, so every visible string is a pair `{ en: '…', it: '…' }`.

```ts
{ name: { en: 'Cryptography I', it: 'Crittografia I' }, ssd: '[INF/01]', year: 'A.Y. 2027', programme: 'MDA' },
```

`code`, `links` and `detail` are optional.
MDA courses use `A.Y.` and one calendar year, university courses `A.Y. 2024/25`.

```ts
{ name: '…', degree: { en: 'M.Sc. …', it: 'Laurea Magistrale in …' }, date: '2026-03-07', thesis: '…', coSupervisor: '…' },
```

An ongoing thesis has `date: 'current'` and no `thesis` until the title is settled.
Titles stay in the language of the thesis.

## Software

```ts
{
  name: '…', tagline: 'One line', blurb: 'Two sentences.',
  tags: ['Python', 'Cryptography'], color: 'teal',
  links: [
    { label: 'code', href: 'https://github.com/eOnofri04/…' },
    { label: 'paper', href: '…', soon: true },   // a "soon" badge instead of a link
  ],
},
```

Remove `soon: true` once the repository is public.
The `toolbox` rows at the top are `{ label, color, items: [...] }`.

## Gallery

Convert the figure to WebP, at most 1600 px on the long edge:

```bash
# from a PDF:  pdftoppm -png -r 220 -singlefile fig.pdf fig
magick fig.png -resize '1600x1600>' -strip /tmp/fig.png
cwebp -q 82 /tmp/fig.png -o public/gallery/my-piece.webp
magick identify -format '%w %h\n' public/gallery/my-piece.webp
```

and add `src/content/gallery/my-piece.json`:

```json
{
  "title": "Posterior Glow",
  "caption": "One sentence, shown under the title.",
  "alt": "What the image shows, for screen readers.",
  "image": "/gallery/my-piece.webp",
  "width": 1600,
  "height": 1200,
  "source": "Stolfi_Onofri_Bretti_25",
  "date": "2025-09",
  "reviewed": true
}
```

`source` is the bib key of the paper: the card links to it and takes its topics, and a wrong key stops the build.
`date` (`YYYY`, `YYYY-MM` or `YYYY-MM-DD`) sets the order, newest first; it defaults to the publication date and can be changed to move a piece.
A piece with no paper omits `source` and gets `"topics": [...]` instead; a piece with a paper may add `topics` too.
`licence` defaults to CC BY-NC-SA 4.0, and `reviewed` is only my own checklist.
`exif` is the mock camera data shown with the `i` key in the enlarged view (see [Easter eggs](#easter-eggs)).
Deleting a piece means deleting both its `.json` and its `.webp`; originals can sit in the git-ignored `public/gallery/tmp/`.

## Collaboration graph

Co-authors and their colours (the applications of our shared papers) come from the bib.
To link someone to a page, add an entry keyed by the hyphenated, lower-case name:

```json
"alberto-paoluzzi": { "name": "Alberto Paoluzzi", "url": "https://…", "affiliation": "Roma Tre University" }
```

Nodes with a `url` get a gold ring and open it on click.
A name spelled two ways in the bib makes two nodes.

## Easter eggs

The trophies are listed in `src/lib/trophies.ts` (title, tier, the hint shown while locked, the description shown once earned); the code that awards them lives with each egg, and `src/scripts/eggs.ts` keeps the progress in the visitor's browser.
The tracker opens with `?` or `h`, or from the cup in the footer.

| Egg | Where | Trophy |
| --- | --- | --- |
| Konami code (↑↑↓↓←→←→BA): retro look until reload | any page | Up, Up, Down, Down |
| Campfire: "Progress saved" | footer | Bonfire Lit |
| Theme toggle, to light | header | Let There Be Light |
| Pixel-art gear and `tinker()` | browser console | Tinkerer |
| d20: jumps to a random paper | Publications | Roll for Initiative, Critical Fail, Critical Success |
| Depth gauge, seabed and safety stop at 5 m | Publications, Research (`depth` prop of `BaseLayout`) | Seabed, Safety Stop |
| `N`, or a click on the central node: knight's tour | Statistics | Knight's Tour |
| `i`: mock EXIF | Gallery, enlarged view | Pixel Peeper; Curator for opening every piece |
| Gear sounds, off by default | 404 | Encore; Off the Map for visiting, Cryptanalyst for decrypting by hand |

Each gallery piece may carry its EXIF line:

```json
"exif": { "camera": "matplotlib", "aperture": "3.14", "exposure": "3 days", "iso": 3200 }
```

`aperture` is a mathematical constant written numerically (π as `3.14`, e as `2.72`, φ as `1.62`, …) and shown as `f/3.14`.
`exposure` is how long the figure took to make.
`iso` encodes how light the picture is, on the camera scale from 100 (very dark) through 3200 (middling) to 64000 (very light); it is left out when absent.
`dpi` defaults to the year of the piece and can be overridden.
A piece without `exif` shows nothing.
The current values are placeholders: camera, aperture and exposure are random, and ISO was measured from the mean grey level of each image, rescaled across the collection.

On the d20, a natural 1 lands on the oldest thesis and a natural 20 on `CRIT_SUCCESS` in `publications.astro` (a bib key; empty means the first entry of the list).

## Citation metrics

The deploy workflow refreshes the `/statistics` figures every Monday, and on demand from the *Actions* tab (*Run workflow*).
Locally, `npm run metrics` updates `src/data/metrics.json`.

## CV

Put the compiled `CV_Onofri_light.pdf` and `CV_Onofri_dark.pdf` in `CV_repo/` (they are not tracked there), run `npm run sync:cv`, then commit and push.
