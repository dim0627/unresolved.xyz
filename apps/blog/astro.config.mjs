// @ts-check
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import Slugger from 'github-slugger';

/** remark-toc が目次を差し込む対象にしていた見出し。 */
const TOC_HEADING = /^(table[ -]of[ -])?contents?$|^toc$/i;

const isHeading = (/** @type {any} */ node) =>
  node.type === 'element' && /^h[1-6]$/.test(node.tagName);

/**
 * `## Table of contents` の直後に、以降の見出しへのリンク一覧を差し込む。
 * 移行前は remark-toc（`tight: true`）が担っていた処理。
 *
 * 見出しの id は Astro の heading-ids プラグインが付けるが、そちらはユーザーの
 * hast プラグインより後に走るため、この時点ではまだ付いていない。そこで同じ
 * github-slugger で id を先に確定させておく。heading-ids は既存の id を
 * 尊重する実装なので、後から上書きされることはない。
 *
 * 「処理済み」の目印はクロージャではなく `ctx.data` に置く。プラグイン本体は
 * 記事をまたいで使い回されるため、クロージャの変数だと最初の記事で立った旗が
 * 残り、以降の記事が丸ごとスキップされる。`ctx.data` はコンパイルごとに新しい。
 */
const tocPlugin = {
  name: 'table-of-contents',
  element: {
    filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    /** @type {(node: any, ctx: any) => void} */
    visit(node, ctx) {
      // 最初の見出しに来た時点で兄弟をまとめて読み、一度だけ処理する。
      if (ctx.data.tocHandled) return;
      ctx.data.tocHandled = true;

      const root = ctx.parent(node);
      if (!root) return;

      const slugger = new Slugger();
      const headings = root.children
        .filter(isHeading)
        .map((/** @type {any} */ h) => {
          const text = ctx.textContent(h).trim();
          const id = slugger.slug(text);
          ctx.setProperty(h, 'id', id);
          return { node: h, depth: Number(h.tagName.slice(1)), text, id };
        });

      const at = headings.findIndex((/** @type {any} */ h) =>
        TOC_HEADING.test(h.text),
      );
      if (at === -1) return;

      const list = buildList(
        headings.slice(at + 1).filter((/** @type {any} */ h) => h.text),
      );
      if (list) ctx.insertAfter(headings[at].node, list);
    },
  },
};

/**
 * 見出しの深さに沿って入れ子の `ul` を組み立てる。
 * 移行前と同じく、より深い見出しは直前の項目の子リストにぶら下げる。
 *
 * @param {{depth: number, text: string, id: string}[]} entries
 */
function buildList(entries) {
  if (entries.length === 0) return null;

  const el = (
    /** @type {string} */ tagName,
    /** @type {any[]} */ children,
  ) => ({
    type: 'element',
    tagName,
    properties: {},
    children,
  });

  const root = el('ul', []);
  // 各段の「今開いているリスト」と、そこに直近で追加した項目を持って回る。
  const stack = [{ depth: entries[0].depth, list: root }];

  for (const entry of entries) {
    while (stack.length > 1 && entry.depth <= stack[stack.length - 1].depth) {
      stack.pop();
    }

    let top = stack[stack.length - 1];
    if (entry.depth > top.depth) {
      const siblings = top.list.children;
      const parentItem = siblings[siblings.length - 1];
      // 親項目が無い（いきなり深い見出しが来た）場合は同じ階層に置く。
      if (parentItem) {
        const nested = el('ul', []);
        parentItem.children.push(nested);
        stack.push({ depth: entry.depth, list: nested });
        top = stack[stack.length - 1];
      }
    }

    const link = el('a', [{ type: 'text', value: entry.text }]);
    link.properties = { href: `#${entry.id}` };
    top.list.children.push(el('li', [link]));
  }

  return root;
}

export default defineConfig({
  site: 'https://blog.unresolved.xyz',
  // Astro の既定は 4321 だが、移行前の Next と同じ 3001 を使う（yet は 3000）。
  server: { port: 3001 },
  build: {
    // 既定の 'directory' は `<slug>/index.html` を出力し、`/<slug>` へのアクセスが
    // 末尾スラッシュへリダイレクトされる。移行前（Next の output: 'export'）は
    // `<slug>.html` だったため、公開済み記事の URL を変えないよう合わせる。
    format: 'file',
  },
  markdown: {
    // 移行前は react-syntax-highlighter の vscDarkPlus を使っていた。
    // dark-plus は同じ VS Code Dark+ を Shiki に移植したもの。
    shikiConfig: { theme: 'dark-plus' },
    // Sätteri はスマート約物が既定で有効だが、移行前の react-markdown は
    // 変換していなかった。本文の文字が変わってしまうため無効にする。
    processor: satteri({
      features: { smartPunctuation: false },
      hastPlugins: [tocPlugin],
    }),
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
