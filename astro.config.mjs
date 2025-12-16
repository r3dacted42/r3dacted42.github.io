// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import { fontless } from 'fontless';

// https://astro.build/config
export default defineConfig({
  site: "https://r3dacted42.github.io",
  vite: { plugins: [fontless()] },
  integrations: [vue(), mdx()],
});
