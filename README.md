# eliaonofri.it

Source for [eliaonofri.it](https://eliaonofri.it) — a static site built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Local development

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

## Stack

- **Framework:** Astro (static output)
- **Fonts:** Source Serif 4, Source Sans 3, Source Code Pro — self-hosted variable TTFs under `public/fonts/`
- **Styling:** vanilla CSS with design tokens in `src/styles/global.css`
- **i18n:** English at `/` (default, unprefixed); Italian at `/it/…`

## Licence

Code is MIT. Content (text, artworks, data) is CC BY-NC-SA 4.0. See [LICENSE](LICENSE) for details.
