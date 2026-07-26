---
title: "Hygenで大文字小文字の制御をする方法"
date: "2020-05-31T00:00+09:00"
tags:
  - "JavaScript"
  - "TIL"
---

最近[Next.js](https://nextjs.org/) + [TypeScript](https://www.typescriptlang.org/) + [GraphQL](https://graphql.org/)のスタックで個人プロジェクトを進めているのですが、Railsと違ってコードジェネレータがないのが辛かったので[Hygen](https://github.com/jondot/hygen/)を使ってみたときの些細なメモです。

## Hygenでのパラメタの先頭大文字や小文字化

結論としてはここに全部のヘルパーが載っています。

<https://www.hygen.io/templates/#helpers-and-inflections>

Reactだとファイル名やコンポーネント名をアッパーキャメルケースにしたり、変数名はローワーキャメルケースにしたりするので、適宜Helpersを使い分ければよさそうです。

Hygenは簡単に使えてしまうのでDocumentをちゃんと読まなかったのですが、テンプレートの章は目を通して損はなさそうです。

<https://www.hygen.io/templates>

拡張もできるようです。

<https://www.hygen.io/extensibility/#helpers>
