---
title: "エンジニアは技術ブログをどこで運用するのがいいのか問題"
date: "2018-07-18T00:00+09:00"
tags: []
---

もう移行は終わってしまいましたが、最近いろいろ考えることが多かったのでまとめてみます。

## 何を決めるべきなのか

そもそも選択肢が多いのが悪いです。

よくあるパターンとメリット・デメリットはこのあたりでしょうか。

### どこかのプラットフォームを使う場合

メリット

* 画像の圧縮はだいたいやってくれるはず
* 管理コストがない
* ドメインが強いかも

デメリット

* 融通がきかないかも
* HTMLが汚いかも（とはいえ自分で書いても汚いですが）

### 自作する場合

メリット

* いくらでも融通がきく
* 1プロダクトになる

デメリット

* インフラが面倒
* お金がかかるかも
* メンテが面倒

## 何を目的にするのか

そもそもブログとは何なのでしょうか。

* ブランディング
* 個人メモ
* ブログ自体がサンドボックス

## 具体的にどんな手段があるのか

おそらくこのあたりです。

* [Medium](https://medium.com/)
* [Hatena Blog](http://hatenablog.com/)
* [Hugo](https://gohugo.io/)
* [GatsbyJS](https://www.gatsbyjs.org/)
* [Contentful](https://www.contentful.com/)

[Contentful](https://www.contentful.com/)は広告で知ったのですが、そのときからとても良いなと思っていて、これを機に使ってみたい気持ちがあります。

ただ管理画面がとても難しいです。

## やっぱり自分で作りたい

楽したい気持ちもありますが、自分で作りたい気持ちもあります。

### [GatsbyJS](https://www.gatsbyjs.org/) + [Netlify](https://www.netlify.com/)

* なんだかんだ触ってみたい[GatsbyJS](https://www.gatsbyjs.org/)
* [Contentful](https://www.contentful.com/)と連携させれば画像圧縮もうまくやれるのでは
* これにしましょう。新しいものをやりたいです

### [Hugo](https://gohugo.io/) + [GitHub Pages](https://pages.github.com/)

* [Hugo](https://gohugo.io/)はまだまだ勢いがありますし、枯れているようで枯れていません
  * 最近追えていなかったのも心残りでした
  * ただ飽きた感はあります
* GitHub PagesもHTTPS対応したのでもう[Netlify](https://www.netlify.com/)はいい気がします。ポートフォリオだけそちらで
* CircleCIで自動デプロイの環境を作りましょう
* デザインをゼロから真面目に作ります

## ポートフォリオもなんとかしなければ問題

* 本当に404の対応などもできていなくてひどいです
* メンテしなければなりません
* なのでポートフォリオは別でやります
  * [Nuxt\.js](https://nuxtjs.org/)でも使おうかなと思います
