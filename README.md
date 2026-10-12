# eliaonofri.it

Source for [eliaonofri.it](https://eliaonofri.it) — a static site built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Local development

Requires **Node ≥ 22.12** (Astro 7).

```bash
npm install
npm run dev        # http://localhost:4321
```

## Build & deploy

```bash
npm run build      # output → dist/
npm run preview    # preview the production build locally
```

Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages automatically.

## CV repository (`CV_repo/`)

The CV's LaTeX sources are expected in `CV_repo/`, a separate git repository cloned inside this one and git-ignored here.
The site uses only two things from it:

- `bibdesk-database.bib` — the single source of truth for publications;
- `CV_Onofri_light.pdf` and `CV_Onofri_dark.pdf` — the compiled CVs, if present.

```bash
npm run sync:bib   # CV_repo/bibdesk-database.bib → src/data/publications.bib
npm run sync:cv    # the above, plus the two CV PDFs → public/cv/ (skipped when absent)
```

The copies are committed, so the CI build does not need `CV_repo/`.

## Updating content

See [UPDATING.md](UPDATING.md) for which file drives each section and how to add talks, publications, gallery pieces, and so on.

## Stack

- **Framework:** Astro (static output)
- **Fonts:** Source Serif 4, Source Sans 3, Source Code Pro — self-hosted variable woff2 via `@fontsource-variable` (no CDN). Swap a family by changing the import in `BaseLayout.astro` and the matching `--serif`/`--sans`/`--mono` token in `global.css`.
- **Publications:** rendered at build time from `src/data/publications.bib` (synced from `CV_repo/bibdesk-database.bib` via `npm run sync:bib`) by the dependency-free parser in `src/lib/`
- **Styling:** vanilla CSS with design tokens in `src/styles/global.css`
- **i18n:** English at `/` (default, unprefixed); Italian at `/it/…`

## Licence

Code is MIT. Content (text, artworks, data) is CC BY-NC-SA 4.0. See [LICENSE](LICENSE) for details.
