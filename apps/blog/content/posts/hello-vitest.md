---
title: "Vitest導入覚書き"
date: "2023-10-01T00:00+09:00"
tags:
  - "Next.js"
  - "Testing"
---

[Turborepo](https://turbo.build/repo)環境に配置した[Next.js](https://nextjs.org/)に[Vitest](https://vitest.dev/)を入れようとして結構詰まったので、いろいろメモしておきます。

## Next.js公式のサンプル

公式にもサンプルが配置されています。

[next.js/examples/with-vitest at canary · vercel/next.js](https://github.com/vercel/next.js/tree/canary/examples/with-vitest)

コードを見た限りだとtesting-library/jest-domが有効にされていないように見えるので、matcherが使えない気がします。

## testing-library/jest-domがVitestをサポート

このPRでサポートされました。

[feat!: local types, supporting jest, @jest/globals, vitest by jgoz · Pull Request #511 · testing-library/jest-dom](https://github.com/testing-library/jest-dom/pull/511)

v6.0.0のリリースに入ったようなので、比較的最近導入されたもののようです。

[Release v6.0.0 · testing-library/jest-dom](https://github.com/testing-library/jest-dom/releases/tag/v6.0.0)

これによって、これまでは `vitest.setup.ts` などで

```ts
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);
```

のようにしていたのが、

```ts
import '@testing-library/jest-dom/vitest'
```

だけで良くなりました。

## 導入した所感

比較的新しめのライブラリなので、ネット上にある情報がほとんど参考になりませんでした。

とはいえJestよりはTypeScriptネイティブな感じがありますし、Viteから派生しただけあってESM標準に作られているのが良かったです。

また、不要なライブラリをほとんど導入しなくて良いので、Jestよりはだいぶスマートな印象です。

とはいえ、JestはNext.jsが公式に `next/jest` というパッケージでサポートしている（[next.js/examples/with-jest](https://github.com/vercel/next.js/tree/canary/examples/with-jest)）ので、エコシステム的にはJestに軍配が上がるかなという印象です。

## 参考にさせていただきました

[Vitest × testing-library雑めも](https://zenn.dev/ogakuzuko/scraps/584b9fe0d23155)
