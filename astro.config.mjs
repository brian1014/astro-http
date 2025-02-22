// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',

  // output: 'server',
  integrations: [mdx(), sitemap(), vue()],

  adapter: cloudflare(),
});