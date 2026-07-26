---
title: "ブログをGatsbyJS + Contentful + Netlifyで作り直したので今日はGatsby記念日です"
date: "2018-07-07T00:00+09:00"
tags: []
---

SPAがいいねと君が言ったから7月6日はGatsby記念日。ざっと3日くらいおうちで頑張って移行しました。

スタックはこちらです。

* [GatsbyJS](https://www.gatsbyjs.org/)
* [Contentful: Content Infrastructure for Digital Teams](https://www.contentful.com/)
* [Netlify: All\-in\-one platform for automating modern web projects\.](https://www.netlify.com/)

## HugoからGatsbyJSへ

Hugoが嫌いになったわけではありません。

開発も盛んで気がつけばバージョンが倍くらい上がっていたりするような活発さで、ちょっとついていけなかったりもしましたが、とてもお世話になったプロダクトでした。

ただ、静的サイトジェネレータ自体の運用に少し疲れてしまいました・・・。

Markdownをファイル生成して書いてコミットして・・・というのはとても楽なのですが、日付やカテゴリをファイル内で管理するのが辛くなってきたのが正直なところです。

JSONを手でいじっているときと似た辛さがあります。

## 静的サイトジェネレータのここが辛かった

思えばいろいろと辛い場面はあった気がします。

GatsbyJSも静的サイトジェネレータではあるのですが、融通の利きやすさ（Contentfulなどコンテンツソースが選び放題）という意味で以下の辛さがだいたい解決できるのではないかと思っています。

* Frontmattersの管理
* 画像の配置の手間、リサイズや最適化
  * 画像をディレクトリに入れてマークダウンにパスを書いて・・・というのが辛いです
* 静的資材の管理、webpack等との共存
  * HugoもHugoで変更監視をしていてwebpackにもやらせると仲良くできなかったりしました
  * Ignoreしたり調整すればなんとかなると思います
* （Hugoに限る話ですが）Goのテンプレートの書きづらさ、エラー原因特定のしづらさ

どれも頑張ればなんとかできることですし、実際なんとかしている人も多いと思いますが、個人的に限界が来てしまいました。

## バックエンドのContentful、フロントエンドのGatsbyJS

もうバックエンドは手元で管理するのをやめて、Contentfulに載せることにしました。

Conntentfulは知ったときから気になっていたHeadless CMSというたぐいのサービスで、データ構造とデータ自体の管理だけやってあとはAPI（GraphQL）で配信するという感じのものです。

これは絶対に有用ですし、これからの時代で活躍する場面があるだろうと思っていたのですが、なかなかその場面が見いだせずにここまで来てしまいました。出遅れてしまいました。

これが従来より楽になるかはもう少し運営しないとわかりませんが、物は試しということで。

## とにかくGetting Started

まずこれを読みます。

[GatsbyJS and Contentful in five minutes](https://www.contentful.com/r/knowledgebase/gatsbyjs-and-contentful-in-five-minutes/)

`package.json`を見ると`yarn dev`で動きそうなので叩いてみますが、このようなエラーが出たので、

```text
error We encountered an error while trying to load your site's gatsby-config. Please fix the error and try again.


  TypeError: Cannot destructure property `spaceId` of 'undefined' or 'null'.
```

`gatsby-config.js`を見ながらこのような修正をしてみます。

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

これで通るようになるのですが、実際にContentfulに設定されている構造とサンプルのGraphQLのリクエストがミスマッチを起こしてエラーするので、そのあたりを適宜調整します。

GraphQLは初めてで全然わかりませんでしたが、読めばなんとなくわかるのですごいです。

## カスタマイズ

[Next\.js](https://nextjs.org/)と同様、examplesがたくさん用意されているので疎通だけならほとんど詰まることはありませんでした。

[gatsby/examples at master · gatsbyjs/gatsby](https://github.com/gatsbyjs/gatsby/tree/master/examples/)

こういうのは本当に助かります。

とはいえReact自体の知識がなさすぎるのとGatsbyJSの土地勘がないので、細かい部分までやろうとすると結構詰まった場面は多かったです。

いらないファイルを消したりstyled-componentsに置き換えたり、地道な作業もありました。

## デプロイの自動化、WebHookによるデプロイ

Hugoを使っているときはコンテンツの管理とブログ自体のソースを一緒にしていたのですが、今回はGitHub上にブログのソース、コンテンツはContentfulという形で切り分けることができました。

そのためmaster pushをするとNetlifyが受け取ってリビルドしてくれるのですが、Contentful側でコンテンツを変えた場合はリビルドされないので、ContentfulのWebHookとNetlifyのWebHookをつなげてあげれば自動デプロイの環境が簡単に作れます。
