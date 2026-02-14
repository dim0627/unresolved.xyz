---
title: "ブログをGatsbyJS + Contentful + Netlifyで作り直したので今日はGatsby記念日"
date: "2018-07-07T00:00+09:00"
tags: []
---

SPAがいいねと君が言ったから7月6日はGatsby記念日。ざっと3日くらいおうちで頑張って移行したぞ！

スタックはこう。

* [GatsbyJS](https://www.gatsbyjs.org/)
* [Contentful: Content Infrastructure for Digital Teams](https://www.contentful.com/)
* [Netlify: All\-in\-one platform for automating modern web projects\.](https://www.netlify.com/)

## HugoからGatsbyJSへ

Hugoが嫌いになったわけではないです。

開発も盛んで気がつけばバージョンが倍くらい上がってたりするような活発さで、ちょっとついていけなかったりしたけどとてもお世話になったプロダクトだった。

だけど、ちょっと静的サイトジェネレータ自体の運用に疲れてしまった・・・。

Markdownをファイル生成して書いて〜コミットして〜みたいなのってすごく楽なんだけど、なんか日付とかカテゴリをファイル内で管理するのが辛くなってきたのが正直なところ。

なんかこう、JSONを手でいじってるときと似た辛さ。

## 静的サイトジェネレータのここが辛かった

思えばいろいろと辛い場面はあった気がする。

まあでもGatsbyJSも静的サイトジェネレータではあるんけど、融通の利きやすさ（Contentfulとかコンテンツソースが選び放題）という意味で以下の辛さがだいたい解決できるのでは？と思ってる。

* Frontmattersの管理
* 画像の配置のめんどうさ、リサイズや最適化
  * 画像をディレクトリにいれてマークダウンにパスをかいて・・・みたいなの辛い
* 静的資材の管理、webpack等との共存
  * HugoもHugoで変更監視をしてるしwebpackにもやらせると仲良くできなかったりした
  * Ignoreしたり調整すればなんとかなると思う！
* （Hugoに限る話だが）Goのテンプレートの書きづらさ、エラー原因特定のしづらさ

どれも頑張ればなんとかできることだし、実際なんとかしてる人も多いと思うけど、ちょっと個人的に限界が来てしまった。

## バックエンドのContentful、フロントエンドのGatsbyJS

もうバックエンドは手元で管理するのをやめて、Contentfulに載せることにした。

Conntentfulは知ったときから気になってたHeadless CMSというたぐいのサービスで、まあデータ構造とデータ自体の管理だけやってあとはAPI（GraphQL）で配信してあげるよって感じのもの。

これ絶対有用だしこれからの時代でバリバリ使う場面あるっしょと思ってたんだけど、なんだかんだその場面が見いだせずにここまで来てしまった。出遅れた。

これがこれまでより楽になるかはもうちょっと運営しないとわからないけど、まあ物は試しで。

## とにかくGetting Started

まずこれを読む。

[GatsbyJS and Contentful in five minutes](https://www.contentful.com/r/knowledgebase/gatsbyjs-and-contentful-in-five-minutes/)

`package.json`を見ると`yarn dev`で動きそうなので叩いてみるけど、こんな感じでエラーしたので、

```text
error We encountered an error while trying to load your site's gatsby-config. Please fix the error and try again.


  TypeError: Cannot destructure property `spaceId` of 'undefined' or 'null'.
```

`gatsby-config.js`を見ながらこんな修正をしてみる。

``` diff
~/Develop/repositories/src/github.com/dim0627/blog.unresolved.xyz (*master) $ git diff
diff --git a/gatsby-config.js b/gatsby-config.js
index 6f41f16..994f447 100644
--- a/gatsby-config.js
+++ b/gatsby-config.js
@@ -1,7 +1,7 @@
 let contentfulConfig

 try {
-  contentfulConfig = require('./.contentful')
+  contentfulConfig = require('./.contentful')[process.env.NODE_ENV]
 } catch (_) {
   contentfulConfig = {
     spaceId: process.env.CONTENTFUL_SPACE_ID,
```

これで通るようになるんだけど、実際にContentfulに設定されている構造とサンプルのGraphQLのリクエストがミスマッチを起こしてエラーするので、その変を適宜調整。

GraphQLは初めてで全然わかんなかったけど、読めばなんとなくわかるのですごい。

## カスタマイズ

[Next\.js](https://nextjs.org/)と同様、examplesがたくさん用意されているので疎通だけならほとんど詰まることはなかった。

[gatsby/examples at master · gatsbyjs/gatsby](https://github.com/gatsbyjs/gatsby/tree/master/examples/)

こういうのほんとたすかる。

とはいえReact自体の知識がなさすぎるのとGatsbyJSの土地勘がないので、細かい部分までやろうとすると結構詰まった場面は多かった。

いらないファイル消したりstyled-componentsに置き換えたり地道な作業もあったし。

## デプロイの自動化、WebHookによるデプロイ

Hugo使ってるときはコンテンツの管理とブログ自体のソースを一緒くたにしてたんだけど、今回はGitHub上にブログのソース、コンテンツはContentfulって感じで切り分けることができた。

なのでmaster pushをするとNetlifyがうけとってリビルドしてくれるんだけど、Contentful側でコンテンツをかえた場合はリビルドされないので、ContentfulのWebHookとNetlifyのWebHookをつなげてあげれば自動デプロイの環境が簡単につくれる。
