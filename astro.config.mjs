import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  // /work is the canonical work listing; keep the old /portfolio URL alive.
  // Case-study URLs (/portfolio/[slug]) are a separate route and unaffected.
  redirects: {
    '/portfolio': '/work',
  },
});
