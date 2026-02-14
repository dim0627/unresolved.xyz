---
title: "Hygenで大文字小文字の制御をする"
date: "2020-05-31T00:00+09:00"
tags:
  - "JavaScript"
  - "TIL"
---

最近[Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [GraphQL](https://graphql.org/)のスタックで個人PJを進めてるんだけど、Railsと違ってコードジェネレータがないのが辛かったので[Hygen](https://github.com/jondot/hygen/)を使ってみたときの些細なメモ。

## Hygenでのパラメタの先頭大文字や小文字化

結論言うとここに全部のヘルパが載ってる。

<https://www.hygen.io/templates/#helpers-and-inflections>

Reactだとファイル名やコンポーネント名をアッパーキャメルケースにしたり、変数名はローワーキャメルケースにしたりするので、適宜Helpersを使い分ければよさそう。

Hygenは簡単に使えちゃうのでDocumentをちゃんと読まなかったんだけど、テンプレートの章は目を通して損なさげ。

<https://www.hygen.io/templates>

拡張もできるらしい。

<https://www.hygen.io/extensibility/#helpers>
