// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://gregoryschnese.com',
  trailingSlash: 'ignore',
  // Everything is prerendered to static HTML except routes that opt out with
  // `export const prerender = false` (the MCP endpoint at /mcp).
  output: 'static',
  adapter: vercel(),
  redirects: {
    '/yields-and-bounties': { status: 301, destination: '/writing/yields-and-bounties' },
    '/metrics-in-metrics': { status: 301, destination: '/writing/metrics-in-metrics' },
    '/how-to-run-a-proper-ab-test': { status: 301, destination: '/writing/how-to-run-a-proper-ab-test' },
    '/work-with-me': { status: 301, destination: '/advisory' },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !page.includes('/404') && !/\/(yields-and-bounties|metrics-in-metrics|how-to-run-a-proper-ab-test|work-with-me)\/?$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
