import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import nodejs from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://koi-ikeno.github.io',
  base: '/blog',
  integrations: [mdx(), sitemap(), tailwind()],
  adapter: nodejs({
    mode: 'middleware' // または'standalone'
  }),
  output: 'hybrid',
});