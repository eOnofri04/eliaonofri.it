rm -rf node_modules dist .astro
npm ci
npm run build
npm run metrics
npm run preview