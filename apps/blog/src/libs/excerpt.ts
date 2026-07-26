import { markdownToHast } from 'satteri';

interface HastNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: { alt?: unknown };
  children?: HastNode[];
}

/**
 * 記事本文から記法を落として、ブロックごとのプレーンテキストにする。
 * 一覧で本文の冒頭を数行だけ見せるために使う。移行前は remark の
 * strip-markdown が同じ役割を担っていた。
 *
 * 自前で正規表現を書かず Markdown を実際にパースしているのは、コードフェンス
 * やリンクの入れ子を取りこぼさないため。`satteri` は Astro が内部で使っている
 * パーサそのもので、`markdownToHast` はその公開 API。
 */
export function toPlainTextBlocks(markdown: string): string[] {
  // GFM を切っているのは移行前に合わせるため。一覧の抜粋は remark-gfm を通さず
  // strip-markdown だけを適用していたので、表は `| 指標 | 値 |` のような
  // 素の記法のまま表示されていた。
  const root = markdownToHast(markdown, {
    features: { gfm: false },
  }) as HastNode;

  return (root.children ?? []).flatMap(toBlocks);
}

const isList = (node: HastNode) =>
  node.tagName === 'ul' || node.tagName === 'ol';

function toBlocks(node: HastNode): string[] {
  // コードブロックは冒頭数行の紹介文としては読めないので落とす。
  // strip-markdown も既定で同じ扱いをしていた（インラインコードは残す）。
  if (node.tagName === 'pre') return [];

  // リストと引用は中身をブロックに分ける。まとめて 1 ブロックにすると項目同士が
  // 区切りなく連結され、「…bundle updatetaichi/ci-yarn-upgrade…」のように繋がる。
  if (isList(node) || node.tagName === 'blockquote') {
    return (node.children ?? []).flatMap(toBlocks);
  }

  if (node.tagName === 'li') {
    const children = node.children ?? [];
    const own = children
      .filter((c) => !isList(c))
      .map(textOf)
      .join('')
      .trim();

    return [
      ...(own ? [own] : []),
      ...children.filter(isList).flatMap(toBlocks),
    ];
  }

  const text = textOf(node).trim();

  return text ? [text] : [];
}

function textOf(node: HastNode): string {
  if (node.type === 'text') return node.value ?? '';
  // 画像は alt を本文として扱う。移行前も alt が抜粋に出ていた。
  if (node.tagName === 'img') {
    const alt = node.properties?.alt;

    return typeof alt === 'string' ? alt : '';
  }
  if (!node.children) return '';

  return node.children.map(textOf).join('');
}
