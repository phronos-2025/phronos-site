// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// https://astro.build/config
export default defineConfig({
  site: 'https://phronos.org',
  integrations: [
    mdx({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => {
        // Higher priority for dispatches and methods
        if (item.url.includes('/dispatches/') && !item.url.endsWith('/dispatches/')) {
          item.priority = 0.9;
        } else if (item.url.includes('/methods/') && !item.url.endsWith('/methods/')) {
          item.priority = 0.8;
        } else if (item.url.endsWith('/dispatches/') || item.url.endsWith('/methods/')) {
          item.priority = 0.7;
        } else if (item.url === 'https://phronos.org/') {
          item.priority = 1.0;
        } else {
          item.priority = 0.5;
        }
        return item;
      },
    }),
  ],
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-light'
    }
  }
});