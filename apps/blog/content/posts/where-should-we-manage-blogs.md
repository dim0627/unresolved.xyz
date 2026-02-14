---
title: "エンジニアは技術ブログをどこで運用するのがいいんだ問題"
date: "2018-07-18T00:00+09:00"
tags: []
---

もう移行終わっちゃったけど、最近いろいろ考えることが多かったのでまとめてみる。

## 何を決めるべきなのか？

そもそも選択肢が多いのがわるい。

よくあるパターンとメリット・デメリットはこんなもん？

### どこかのプラットフォームを使う場合

メリット

* 画像の圧縮だいたいやってくれるはず
* 管理コストがない
* ドメインが強いかも

デメリット

* 融通きかないかも
* HTML汚いかも（ゆうて自分で書いても汚い）

### 自作する場合

メリット

* いくらでも融通がきく
* 1プロダクトになる

デメリット

* インフラめんどう
* お金かかるかも
* メンテめんどう

## 何を目的にするのか？

そもそもブログってなんなんや

* ブランディング
* 個人メモ
* ブログ自体がサンドボックス

## 具体的にどんな手段があるのか？

多分こんなもん。

* [Medium](https://medium.com/)
* [Hatena Blog](http://hatenablog.com/)
* [Hugo](https://gohugo.io/)
* [GatsbyJS](https://www.gatsbyjs.org/)
* [Contentful](https://www.contentful.com/)

[Contentful](https://www.contentful.com/)は広告で知ったんだけど、そのときからこれすごくいいじゃん！と思ってて、まあこれを機に使ってみたい気はする。

でも管理画面クソ難しい。

## やっぱり自分で作りたい

楽したい気持ちもあるけど自分で作りたい気持ちもある。

### [GatsbyJS](https://www.gatsbyjs.org/) + [Netlify](https://www.netlify.com/)

* なんだかんだ触ってみたい[GatsbyJS](https://www.gatsbyjs.org/)
* [Contentful](https://www.contentful.com/)と連携させれば画像圧縮うまくやれんじゃ？
* これにしよう！新しいものをやりたい

### [Hugo](https://gohugo.io/) + [GitHub Pages](https://pages.github.com/)

* [Hugo](https://gohugo.io/)はまだまだ勢いがあるし枯れてるようで枯れてない
  * 最近追えてなかったのもなんか心残りだったし
  * でも飽きた感はある
* GitHub PagesもHTTPS対応したのでもう[Netlify](https://www.netlify.com/)はいい気がする、ポートフォリオだけそっち
* CircleCIで自動デプロイの環境を作ろう
* デザインをゼロから真面目に作る

## ポートフォリオもなんとかしろ問題

* マジ404の対応とかできてないしひどすぎ
* メンテしろ
* なのでポートフォリオは別でやる
  * [Nuxt\.js](https://nuxtjs.org/)でも使おうかな
