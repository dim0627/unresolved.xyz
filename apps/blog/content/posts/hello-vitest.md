---
title: "Vitest導入覚書き"
date: "2023-10-01T00:00+09:00"
tags:
  - "Next.js"
  - "Testing"
---

[Turborepo](https://turbo.build/repo)環境に配置した[Next.js](https://nextjs.org/)に[Vitest](https://vitest.dev/)を入れようとして結構詰まったので色々メモりたい。

## Next.js公式のサンプル

公式にもサンプルが配置されてる。

[next.js/examples/with-vitest at canary · vercel/next.js](https://github.com/vercel/next.js/tree/canary/examples/with-vitest)

コードを見た限りだとtesting-library/jest-domが有効にされてないように見えるので、matcherが使えない気が？

## testing-library/jest-domがVitestをサポート

このPRでサポートされた。

[feat!: local types, supporting jest, @jest/globals, vitest by jgoz · Pull Request #511 · testing-library/jest-dom](https://github.com/testing-library/jest-dom/pull/511)

v6.0.0のリリースに入ったぽいので、比較的最近導入された模様。

[Release v6.0.0 · testing-library/jest-dom](https://github.com/testing-library/jest-dom/releases/tag/v6.0.0)

これによってこれまでは `vitest.setup.ts` とかで

```ts
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
```

とかやってたのが、

```ts
import '@testing-library/jest-dom/vitest'
```

だけで良くなった。

## 導入した所感

比較的新しめのライブラリなので、ネット上にある情報がほとんど参考にならなかった。

とはいえJestよりはTSネイティブな感じがあるのと、Viteから派生しただけあってESM標準に作られてるのが良かった。

あと、不要なライブラリをほとんど導入しなくて良いのでJestよりはだいぶスマートな感じ。

とはいえ、JestはNext.jsが公式に `next/jest` というパッケージでサポートしている（[next.js/examples/with-jest](https://github.com/vercel/next.js/tree/canary/examples/with-jest)）ので、エコシステム的にはJestに軍配が上がるかなという印象。

## 参考にさせていただきました

[Vitest × testing-library雑めも](https://zenn.dev/ogakuzuko/scraps/584b9fe0d23155)
