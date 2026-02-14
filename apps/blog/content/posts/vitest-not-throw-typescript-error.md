---
title: "VitestでTypeScriptのトランスパイルエラーをエラーにしてほしい問題"
date: "2023-10-19T00:00+09:00"
tags:
  - "TIL"
  - "Testing"
---

[Next.js](https://nextjs.org/) + [Vitest](https://vitest.dev/)の構成で、テストファイル内で型エラーが起きてもテストがグリーンになってしまったので困りました。

JestはしてくれるのになぜVitestはしてくれないのか・・・と思ったら、タイムリーなIssueがありました。

[Does not report TypeScript compilation errors · Issue #4295 · vitest-dev/vitest](https://github.com/vitest-dev/vitest/issues/4295)

## 結論

自分で型チェックしましょう。

```shell
tsc -p . --noEmit
```
