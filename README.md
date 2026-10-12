# eliaonofri.it

Source of [eliaonofri.it](https://eliaonofri.it), a static [Astro](https://astro.build) site deployed to GitHub Pages.

## Local development

Node 22.12 or later (Astro 7).

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build & deploy

```bash
npm run build      # into dist/
npm run preview    # preview the production build locally
```

A push to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages.

## CV repository (`CV_repo/`)

The LaTeX sources of the CV live in `CV_repo/`, a separate repository cloned here and git-ignored.
The site takes two things from it:

- `bibdesk-database.bib`, the publication list;
- `CV_Onofri_light.pdf` and `CV_Onofri_dark.pdf`, the compiled CVs, when present.

```bash
npm run sync:bib   # copies the bib to src/data/publications.bib
npm run sync:cv    # the same, plus the two PDFs to public/cv/
```

The copies are committed, so the CI build does not need `CV_repo/`.

## Updating content

[UPDATING.md](UPDATING.md) says which file drives each section, and [TAXONOMY.md](TAXONOMY.md) lists the topic keywords.

## Stack

- **Framework:** Astro (static output)
- **Fonts:** Source Serif 4, Source Sans 3, Source Code Pro — self-hosted variable woff2 via `@fontsource-variable` (no CDN). Swap a family by changing the import in `BaseLayout.astro` and the matching `--serif`/`--sans`/`--mono` token in `global.css`.
- **Publications:** rendered at build time from `src/data/publications.bib` (synced from `CV_repo/bibdesk-database.bib` via `npm run sync:bib`) by the dependency-free parser in `src/lib/`
- **Styling:** vanilla CSS with design tokens in `src/styles/global.css`
- **i18n:** English at `/` (default, unprefixed); Italian at `/it/…`

## Licence

Code under MIT; content (text, figures, data) under CC BY-NC-SA 4.0.
See [LICENSE](LICENSE).
