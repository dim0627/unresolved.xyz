// @ts-check
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

/**
 * Markdown 内の外部リンクを新しいタブで開かせる hast プラグイン。
 * 移行前は react-markdown 側で `a` を上書きして同じ属性を付けていた。
 *
 * Astro 7 の既定プロセッサ Sätteri は remark/rehype ではなく mdast/hast
 * プラグインを受け取る。rehype を使うには @astrojs/markdown-remark を足して
 * unified 処理系に戻す必要があるため、ここでは Sätteri 側の API に寄せている。
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
  // Astro の既定は 4321 だが、移行前の Next と同じ 3000 を使う（blog は 3001）。
  server: { port: 3000 },
  markdown: {
    // Astro の satteri() はスマート約物を既定で有効にするが、移行前の
    // react-markdown は変換していなかった（' がそのまま出ていた）。出力を
    // 揃えるため明示的に切っている。約物の見栄えを優先するなら true にする。
    processor: satteri({
      features: { smartPunctuation: false },
      hastPlugins: [externalLinks],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
