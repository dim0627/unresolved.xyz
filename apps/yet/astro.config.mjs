// @ts-check
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

/**
 * Markdown 内の外部リンクを新しいタブで開かせる hast プラグイン。
 */
const externalLinks = {
  name: 'external-links',
  element: {
    filter: ['a'],
    /** @type {(node: any, ctx: any) => void} */
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href === 'string' && /^https?:\/\//.test(href)) {
        ctx.setProperty(node, 'target', '_blank');
        ctx.setProperty(node, 'rel', 'nofollow noreferrer');
      }
    },
  },
};

export default defineConfig({
  site: 'https://yet.unresolved.xyz',
  server: { port: 3000 },
  markdown: {
    // 出力を揃えるためスマート約物は無効にしている。
    processor: satteri({
      features: { smartPunctuation: false },
      hastPlugins: [externalLinks],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
