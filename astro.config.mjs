import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://eliaonofri.it',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
