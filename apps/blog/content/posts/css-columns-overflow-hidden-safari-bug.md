---
title: "CSS columns + overflow:hidden が iOS Safari で壊れる問題と解決策"
date: "2026-03-25T00:00+09:00"
tags:
  - "CSS"
  - "Safari"
  - "Tailwind CSS"
---

CSS columns による Masonry レイアウトを実装した際に、iOS Safari の実機でだけ表示が壊れる問題に遭遇しました。原因の特定から解決までの過程を記録します。

## Table of contents

## 起きたこと

CSS columns による Masonry レイアウトを実装した。PC のブラウザや DevTools のレスポンシブモードでは問題なく表示されるが、実機の iPhone（Safari）で確認すると、右列のカードの上端に影だけがチラッとはみ出して表示される不具合が発生。

`overflow:hidden` で高さを制限してカードを途中でカットする演出をしていたが、Safari ではカードの一部が overflow の境界を超えて描画されてしまっていた。

## 構成

```html
<!-- 外側: overflow:hidden で高さ制限 -->
<div class="relative max-h-[120svh] overflow-hidden">
  <!-- CSS columns で Masonry -->
  <div class="columns-2 gap-3 p-3 sm:columns-3 md:columns-4 lg:columns-5">
    <!-- カード -->
    <div class="mb-3 break-inside-avoid overflow-hidden rounded-xl shadow-xs">
      ...
    </div>
  </div>
</div>
```

## 原因

Safari には CSS columns と `overflow:hidden` の組み合わせが正しく動作しない既知のバグがある。columns 内の要素が overflow の境界を無視して描画されることがある。

DevTools のレスポンシブモードでは再現しない（Chrome のレンダリングエンジンを使っているため）ので、実機テストでしか気づけない。

参考:
- [breck7/safaricolumnbug](https://github.com/breck7/safaricolumnbug)
- [ampproject/amphtml#28556](https://github.com/ampproject/amphtml/issues/28556)

## 試した対策と結果

### 1. 上パディングの除去 → ❌

PostGrid の `p-3` を `px-3 pb-3`（pt-0）に変更。効果なし。

### 2. shadow を下方向のみに変更 → ❌

`shadow-xs` を `shadow-[0_1px_2px_rgba(0,0,0,0.05)]` に変更して上方向の影をなくした。影の見た目は変わったが、根本的な配置ズレは解決せず。

### 3. transform: translateZ(0) → ❌

`overflow:hidden` のコンテナに `[transform:translateZ(0)]` を追加して GPU レイヤーに乗せる。Safari の overflow 系バグの定番ワークアラウンドだが、今回は効果なし。

### 4. inline-block + w-full → ✅ 解決！

カードに `inline-block w-full` を追加。

```diff
- <div class="mb-3 break-inside-avoid overflow-hidden rounded-xl ...">
+ <div class="mb-3 inline-block w-full break-inside-avoid overflow-hidden rounded-xl ...">
```

`break-inside-avoid` だけでは Safari の columns 内での要素配置が不安定になることがあり、`inline-block` を組み合わせることで配置が安定する。`w-full` は inline-block にすると幅が shrink-to-fit になるため、列幅いっぱいに広げるために必要。

## まとめ

- CSS columns の Masonry レイアウトで Safari 対応するなら `inline-block w-full break-inside-avoid` の3点セットが安定
- DevTools のレスポンシブモードでは再現しないので実機テスト必須
- `transform: translateZ(0)` は万能ではない
