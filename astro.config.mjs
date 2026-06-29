import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://eliaonofri.it',
  output: 'static',
  integrations: [sitemap()],
  // Service folded into the Research page (CLAUDE.md leaves this open); keep the
  // old path working for any inbound links.
  redirects: {
    '/service': '/research#service',
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
