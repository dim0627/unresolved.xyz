---
title: "[Rails5.1.3] Sass(SCSS)からwebpacker + PostCSSに移行してみるか"
date: "2017-10-11T00:00+09:00"
tags: []
---

僕は結構Asset Pipelineの仕組みが好きなんで特にやめちゃいたいみたいな意識はないんですが、
個人プロジェクトだし新しいものを実際に使ってみる経験っていうのも大切かなと。

あと、僕のプロジェクトは依存性の解決だけをyarnがやっていて、yarnで落としている3rd Party系アセットをAsset Pipelineで運用していくやり方に限界を感じていました。

CSSとその他フォントファイル等が共存しているパッケージとか。

## 移行前の状態

現状はそれなりにRailsの基本的な状態です。僕はあんまり色んなものをゴテゴテと入れないタイプなので。

* rails (5.1.3)
* アセット系はすべてAsset Pipelineで処理
* 依存性に関してはyarnでやりたかったのでwebpacker:installは済んでる
* でもwebpackerは使ってない

## 目指すところ

「移行すること」を目的にしちゃうのはあまりにもナンセンスなので、移行後に目指すところと守るべきラインを決めます。

そもそも、現状の環境に困ってるわけではないですし・・・。

* .scssで書いてるやつを全部移行して、PostCSS on webpackerで処理できるようにする
* scss-lintをやめて、stylelintに移行する
* なんかAutoprefixerは今でも使うのが常識らしいので入れる（なんか勝手にいらないものと思ってた・・・。）

[Set Up Your Build Tools  \|  Tools for Web Developers  \|  Google Developers](https://developers.google.com/web/tools/setup/setup-buildtools#dont_trip_up_with_vendor_prefixes)

### 守るべきライン

CSSに関する部分だけなので、とりあえず以下だけにしました。

* ファイルサイズは極端に増やさない（Autoprefixerなしの状態で）
* 処理時間は極端に増やさない（Asset Pipelineは移行後も生きるので、webpackの頑張り分が多少増える気がする）
* FontAwesome等の3rd Party系アセットも、きちんとダイジェスト付きで配信する
* 開発環境は悪化させない（主にwebpack-dev-serverまわりのこと）
* Roadieはちゃんと動くようにする（HTMLメールを使ってるので）

これが守れないならmasterブランチにマージしません。

僕はCSSがでっかくなるのがすごく嫌なタイプなので・・・。とはいえ少しくらい増えるのはOKとします。
10KBとか増えるならNGで。

## 移行前作業 - 現状での出力されるファイルサイズと処理時間を計測

そんなでかいプロジェクトでもないので、言うほどでもないかと。
FontAwesomeが幅取ってるかもですね・・・。

ビルド

``` sh
$ time rails assets:precompile RAILS_ENV=production
yarn install v1.2.0
[1/4] Resolving packages...
success Already up-to-date.
Done in 1.12s.
I, [2017-10-10T08:36:05.289046 #5]  INFO -- : Writing /myapp/public/assets/bg-b811dc3d5d616bfc91c7be908927f5797db3878ef5eed28e0277ed40f5c2a9ba.png
 :
 :
 :
I, [2017-10-10T08:36:14.803537 #5]  INFO -- : Writing /myapp/public/assets/express/lib/application-489ef282d160b38a75de19f711472bb48c4eca65cecd6e1ed83fceba74dcee35.js.gz
Webpacker is installed 🎉 🍰
Using /myapp/config/webpacker.yml file for setting up webpack paths
Compiling…
Compiled all packs in /myapp/public/packs
7.71user 2.51system 0:33.19elapsed 30%CPU (0avgtext+0avgdata 125336maxresident)k
0inputs+0outputs (1major+177016minor)pagefaults 0swaps
```

ファイルサイズ

``` sh
$ ll -ltrh public/assets/
total 6832
-rw-r--r--  1 daisuketsuji  staff    12K Oct 8 17:17 application-b190eef5e6c0c69209dc27227adc2168bfe95ae722ed7cc4a011fb96bd1b11ee.css.gz
-rw-r--r--  1 daisuketsuji  staff    60K Oct 8 17:17 application-b190eef5e6c0c69209dc27227adc2168bfe95ae722ed7cc4a011fb96bd1b11ee.css
```

処理時間の計測はこうでいいんでしょうか。こういうの詳しくないので誰か教えて・・・。

## 移行作業その1 - PostCSSが動くようにする

webpackerは標準設定があるので、まずそれを把握するためにとりあえずREADMEに目を通します。

[rails/webpacker: Use Webpack to manage app\-like JavaScript modules in Rails](https://github.com/rails/webpacker)

あれ！`PostCSS - Auto-Prefixer`って書いてあるな・・・。Autoprefixer、デフォルトで有効ってこと・・・？

**追記: cssnextに標準でAutoprefixerが入ってるからです。**

### application.cssを作成

こういうののディレクトリ構成はデファクトみたいなのがあると思うんですが、僕はこうしました。

``` sh
.
├── app
│   ├── assets
│   ├── helpers
│   └── javascript
│       ├── packs
│       └── stylesheets
```

application.jsはこう。

``` js
import '../stylesheets/application'
```

CSSの中身は移行したものではなく、PostCSSを使っていない暫定の記述だけです。とりあえず疎通が見たかったので。

HTMLからの呼び出しは`stylesheet_pack_tag`を使えばいけるっぽいんですが、この記事に書いてもしょうがない作業なんで割愛します。

### PostCSSがちゃんと動くかを見る

`application.css`の中身をPostCSSぽくして、ちゃんと動くかを見てみたいので、
まず、webpackerのCSSに対するローダーがデフォルトでどのようになっているかを確認してみます。

設定はここですかね。

[webpacker/style\.js at master · rails/webpacker](https://github.com/rails/webpacker/blob/master/package/loaders/style.js)

逆から読むんでしたっけ？これは以下の順番で処理してくれるということなんでしょうか。webpackの設定ファイルの見方がいまいち・・・。

1. sass-loader
1. postcss-loader
1. css-loader

あれ、sassも読めるのかな・・・。まあどちらにせよ、PostCSSのローダーは入っているようなのでこのまま行ってみましょう。

PostCSSの設定はルートに`.postcssrc.yml`を置けばいいみたいですね。

``` js
const postcssConfigPath = path.resolve(process.cwd(), '.postcssrc.yml')
```

webpackerのインストール直後はこんな感じで配置されるようです。

``` yml
plugins:
  postcss-smart-import: {}
  postcss-cssnext: {}
```

`smart-import`が入ってるので、`import`が使えるかを見てみます。

`app/javascript/stylesheets/modules`ディレクトリを作って、`test.css`を作ってみます。

``` css
.teststyle {
  color: #eceff1;
}
```

`application.css`はこんな感じ。

``` css
@import "modules/test";
```

`bin/webpack`を実行すると・・・、

``` sh
$ cat public/packs/application-3cb0874e28a4e33e875112e4732c6ddd.css
.teststyle {
  color: #eceff1;
}
```

行けてそう！

## 移行作業その2 - とりあえずCSSを移行して処理してみる

とりあえずどかっとファイル移動しただけでどうなるかを見てみます。SCSSの拡張子もそのままです。

``` sh
ERROR in ./node_modules/css-loader?{"minimize":false}!./node_modules/postcss-loader/lib?{"sourceMap":true,"config":{"path":"/myapp/.postcssrc.yml"}}!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js?{"sourceMap":true}!./app/javascript/stylesheets/application.scss
Module build failed:
@import "modules/*";
```

あー、まあエラーしたので、章をわけて1個ずつ対応します。

### smart-importでglob展開はできない

globでの`import`は出来ないんですね。過去に`postcss-import`プラグインがサポートしていたようですが、外されたようです。

[Remove glob support · postcss/postcss\-import@1fbeca6](https://github.com/postcss/postcss-import/commit/1fbeca62a6fc84e39e0fcd53cd3baaf95b94a3a2)

`postcss-easy-import`というプラグインでできるようですが、まあここで増やすのもな・・・という気もするので、1個1個`import`するように書き換えました。

[TrySound/postcss\-easy\-import: PostCSS plugin to inline @import rules content with extra features](https://github.com/trysound/postcss-easy-import)

この対応だけしたら、普通に`bin/webpack`は通るようになりました。

### FontAwesomeを読めるようにする

これまではGemで読んでたので、ダイジェストもいい感じにやってくれてました。
webpacker経由でうまいことダイジェストも解決する方法を知らないので、ここで解決しちゃいます。

``` sh
npm i font-awesome --save
```

`application.css`には

``` css
@import "~font-awesome/css/font-awesome";
```

CSSだとフォントファイルにダイジェストがつかなかったりするかな？と思ったら、なんか読み込むだけでうまくいきました・・・。

``` sh
$ head -n 20 public/packs/application-b619b7134a47c7bc1d3df67c6b135f76.css
@charset "UTF-8";

/*!
 *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome
 *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)
 */

/* FONT PATH
 * -------------------------- */

@font-face {
  font-family: 'FontAwesome';
  src: url(/packs/_/_/node_modules/font-awesome/fonts/fontawesome-webfont-674f50d287a8c48dc19ba404d20fe713.eot);
  src: url(/packs/_/_/node_modules/font-awesome/fonts/fontawesome-webfont-674f50d287a8c48dc19ba404d20fe713.eot) format("embedded-opentype"), url(/packs/_/_/node_modules/font-awesome/fonts/fontawesome-webfont-af7ae505a9eed503f8b8e6982036873e.woff2) format("woff2"), url(/packs/_/_/node_modules/font-awesome/fonts/fontawesome-webfont-fee66e712a8a08eef5805a46892932ad.woff) format("woff"), url(/packs/_/_/node_modules/font-awesome/fonts/fontawesome-webfont-b06871f281fee6b241d60582ae9369b9.ttf) format("truetype"), url(/packs/_/_/node_modules/font-awesome/fonts/fontawesome-webfont-912ec66d7572ff821749319396470bde.svg) format("svg");
  font-weight: normal;
  font-style: normal;
}

.fa {
  display: inline-block;
```

これはなんかのローダーがやってくれてるんでしょうね。ちょっとその辺は追ってませんが、すごいね・・・。

## 移行間作業 - 出力されるファイルサイズと処理時間を計測

とりあえずビルドは通ったので、ここでちょっと計測してみます。
変数展開とかが全然できてないはずなので、まだ完成じゃないですが・・・。

ビルド

``` sh
$ time rails assets:precompile RAILS_ENV=production
yarn install v1.2.0
[1/4] Resolving packages...
success Already up-to-date.
Done in 1.06s.
I, [2017-10-10T08:45:22.160159 #6]  INFO -- : Writing /myapp/public/assets/bg-b811dc3d5d616bfc91c7be908927f5797db3878ef5eed28e0277ed40f5c2a9ba.png
 :
 :
 :
I, [2017-10-10T08:45:32.132392 #6]  INFO -- : Writing /myapp/public/assets/express/lib/application-489ef282d160b38a75de19f711472bb48c4eca65cecd6e1ed83fceba74dcee35.js.gz
Webpacker is installed 🎉 🍰
Using /myapp/config/webpacker.yml file for setting up webpack paths
Compiling…
Compiled all packs in /myapp/public/packs
19.57user 11.70system 2:20.05elapsed 22%CPU (0avgtext+0avgdata 238252maxresident)k
0inputs+0outputs (16major+276827minor)pagefaults 0swaps
```

ファイルサイズ

``` sh
$ ll -ltrh public/packs/
total 296
-rw-r--r--  1 daisuketsuji  staff   125B Oct 8 17:47 application-d90f6dc35a6c073d4a45066d53e72dd6.css.map
-rw-r--r--  1 daisuketsuji  staff    18K Oct 8 17:47 application-d90f6dc35a6c073d4a45066d53e72dd6.css.gz
-rw-r--r--  1 daisuketsuji  staff   102K Oct 8 17:47 application-d90f6dc35a6c073d4a45066d53e72dd6.css
drwxr-xr-x  3 daisuketsuji  staff   102B Oct 8 17:47 _/
```

比較

```text
before   7.71user 2.51system 0:33.19elapsed 30%CPU (0avgtext+0avgdata 125336maxresident)k
after  19.57user 11.70system 2:20.05elapsed 22%CPU (0avgtext+0avgdata 238252maxresident)k
```

あれー！致命的なほど遅くなった！source mapも出しちゃってるからかな・・・。

## 移行作業その3 - webpackerの設定をちゃんとする & 足りないプラグインを入れる

このままでは失敗に終わってしまう！足りないプラグインを足しながら設定を見直します。

全然知識がないのでとりあえず調べてみる。

[build performance](http://webpack.github.io/docs/build-performance.html)

> devtool: "eval" has the best performance, but it only maps to compiled source code per module. In many cases this is good enough. (Hint: combine it with output.pathinfo: true.)

ふむふむ。source mapは一旦いっか。

### source mapを出さないようにしてみる

``` sh
$ time rails assets:precompile RAILS_ENV=production
yarn install v1.2.0
[1/4] Resolving packages...
success Already up-to-date.
Done in 0.92s.
I, [2017-10-10T12:34:02.467861 #6]  INFO -- : Writing /myapp/public/assets/bg-b811dc3d5d616bfc91c7be908927f5797db3878ef5eed28e0277ed40f5c2a9ba.png
 :
 :
 :
I, [2017-10-10T12:34:12.881463 #6]  INFO -- : Writing /myapp/public/assets/express/lib/application-489ef282d160b38a75de19f711472bb48c4eca65cecd6e1ed83fceba74dcee35.js.gz
Webpacker is installed 🎉 🍰
Using /myapp/config/webpacker.yml file for setting up webpack paths
Compiling…
Compiled all packs in /myapp/public/packs
21.31user 10.99system 2:34.00elapsed 20%CPU (0avgtext+0avgdata 216200maxresident)k
0inputs+0outputs (16major+279629minor)pagefaults 0swaps
```

む、むしろ遅くなった・・・。

### SCSSをやめる

source mapの設定はいったんデフォルトに戻して、違う原因を探します。

`application.scss`を削っていったら改善されたので、どうやら`@import`の数か、純粋に処理してるファイル量に応じて遅くなっているらしい・・・。
SCSSをそのまま移行したのがだめだったのだろうか？

``` sh
$ bin/webpack
Hash: 3a5ad03cf822d8759fb0
Version: webpack 3.6.0
Time: 90548ms
```

90548ms！

とりあえずSCSSをCSSに変えてみよう。
拡張子を変えて、処理できるようにいくつかプラグインを追加します。

``` sh
npm i postcss-simple-vars --save // 変数宣言を$でやれるようにする
npm i postcss-mixins --save // mixin機能
npm i postcss-extend --save // extend機能
npm i postcss-nested --save // ネスト記法
```

`.postcssrc.yml`にも。

``` yml
plugins:
  postcss-smart-import: {}
  postcss-mixins: {}
  postcss-extend: {}
  postcss-nested: {}
  postcss-simple-vars: {}
```

`.postcssrc.yml`は記述の順番がシビアみたいです。とりあえず上の状態では動きました・・・。

mixinについてはちょっと記述の修正が必要でした。

``` css
@define-mixin mixin-name $arg1: 1rem {
  size: $arg1;
}

.test-class {
  @mixin mixin-name 2rem;
}
```

これで実行してみると・・・。

``` sh
$ time bin/webpack RAILS_ENV=production
Hash: efdeaedf276a411fa522
Version: webpack 3.6.0
Time: 9356ms
```

お！10分の1に！

`assets:precompile`は・・・。

``` sh
$ time rails assets:precompile RAILS_ENV=production
yarn install v1.2.0
[1/4] Resolving packages...
success Already up-to-date.
Done in 0.91s.
I, [2017-10-11T01:19:52.825045 #5]  INFO -- : Writing /myapp/public/assets/bg-b811dc3d5d616bfc91c7be908927f5797db3878ef5eed28e0277ed40f5c2a9ba.png
 :
 :
 :
I, [2017-10-11T01:19:53.612881 #5]  INFO -- : Writing /myapp/public/assets/application-e7c2d6880942eb7309f8eb703c4db21e2d3a26d5b1f7a3895fb5593afe618704.js.gz
Webpacker is installed 🎉 🍰
Using /myapp/config/webpacker.yml file for setting up webpack paths
Compiling…
Compiled all packs in /myapp/public/packs
13.00user 4.80system 0:58.08elapsed 30%CPU (0avgtext+0avgdata 222560maxresident)k
0inputs+0outputs (17major+259560minor)pagefaults 0swaps
```

比較

```text
before   7.71user 2.51system 0:33.19elapsed 30%CPU (0avgtext+0avgdata 125336maxresident)k
after   13.00user 4.80system 0:58.08elapsed 30%CPU (0avgtext+0avgdata 222560maxresident)k
```

まだ移行前より遅いけど、だいぶよくなった！もうちょっと頑張ればこえられるかな・・・。一旦は許容範囲ということにしましょう。

ちなみにsource mapを出さないようにしてみると・・・？

``` sh
$ time rails assets:precompile RAILS_ENV=production
yarn install v1.2.0
[1/4] Resolving packages...
success Already up-to-date.
Done in 0.89s.
I, [2017-10-11T01:25:08.843047 #5]  INFO -- : Writing /myapp/public/assets/bg-b811dc3d5d616bfc91c7be908927f5797db3878ef5eed28e0277ed40f5c2a9ba.png
 :
 :
 :
I, [2017-10-11T01:25:09.646634 #5]  INFO -- : Writing /myapp/public/assets/application-e7c2d6880942eb7309f8eb703c4db21e2d3a26d5b1f7a3895fb5593afe618704.js.gz
Webpacker is installed 🎉 🍰
Using /myapp/config/webpacker.yml file for setting up webpack paths
Compiling…
Compiled all packs in /myapp/public/packs
13.90user 4.23system 0:58.81elapsed 30%CPU (0avgtext+0avgdata 228544maxresident)k
0inputs+0outputs (17major+258170minor)pagefaults 0swaps
```

全然はやくならん！やり方違うのかな・・・。

ファイルサイズはかわってなさげ。これはいいね。

``` sh
-rw-r--r--  1 daisuketsuji  staff    12K Oct 9 10:26 application-c22dd87ef356a17cda53b66b25a442e0.css.gz
-rw-r--r--  1 daisuketsuji  staff    60K Oct 9 10:26 application-c22dd87ef356a17cda53b66b25a442e0.css
```

他に参考にした資料。

[Optimising build performance, initial: 40s, incremental: 6s · Issue \#1574 · webpack/webpack](https://github.com/webpack/webpack/issues/1574)

## 移行作業その4 - 開発環境でのスタイルシートの更新監視

webpackでCSSを処理するようになったので、これまでのように`rails s`してれば一緒に処理される〜ってことがなくなりました。

（追記 : これ、処理されるみたいです。ただ常駐しないので毎回webpackが立ち上がって・・・って感じの挙動で遅かったです。）

`bin/webpack-dev-server`を`rails s`と並行して起動する必要があるので、公式も推奨しているForemanを使ってプロセス管理をします。

開発環境はシンプルに保ちたいので、この工程が入るなら導入しなくてもいいかなと思うくらいのハードルでした・・・。

[webpacker/env\.md at master · rails/webpacker](https://github.com/rails/webpacker/blob/master/docs/env.md)

とりあえずProcfileを作ります。ローカル用に分けたかったので、`Procfile.local`にしました。

``` procfile
rails: bundle exec rails s -p 3005 -b '0.0.0.0'
webpack: bin/webpack-dev-server
```

Foreman自体も入れましょう。

``` gemfile
group :development do
  :
  :
  gem 'foreman'
end

```

あとは実行するだけ。

``` sh
foreman start -f Procfile.local
```

## 移行後作業 - プラグインの設定とめぼしいプラグインを入れる

さて、ここらへんで今後の運用も考えて、PostCSSにはどんなプラグインがあって、どんなのを入れたいかを考えてみようと思います。
導入しないにしても、知っておく必要はあると思うので。

とりあえず移行した！だけだとただのやってみた記事になるし、そもそももったいないので。

以下から探せるんですが、

[PostCSS\.parts \| A searchable catalog of PostCSS plugins](https://www.postcss.parts/)

一覧性が悪かったので、以下をざーっと眺めてみました。

[postcss/plugins\.md at master · postcss/postcss](https://github.com/postcss/postcss/blob/master/docs/plugins.md)

CSS4のやつとかは見てて面白いですね。

### Autoprefixer

まずは目的の1つであったAutoprefixerから。

```bash
npm i autoprefixer --save
```

なんか、どのブラウザを対象にするかのジャッジがちょっとむずかしいらしいですね。
デフォルトだと結構バサッと切り捨てるようなので、一旦そのままにしてあとでちゃんとドキュメントを読んでみようと思います。

### hexrgba

これ、僕普段すごく使うので入れなきゃいけませんでした。忘れてた。

[seaneking/postcss\-hexrgba: PostCSS plugin that adds shorthand hex methods to rgba\(\) values](https://github.com/seaneking/postcss-hexrgba)

`rgba(0, 0, 0, .5)`みたいなのを、`rgba(#000, .5)`みたいに書けるようにするやつ。

```bash
npm i postcss-hexrgba --save
```

### lazyimagecss

画像のサイズを自動的にwidth、heightに設定してくれるもの。これはすごいですね！

[Jeff2Ma/postcss\-lazyimagecss: A PostCSS plugin that generates images's CSS width & height properties automatically\.](https://github.com/Jeff2Ma/postcss-lazyimagecss)

導入はしなかったけど覚えておこう。

## 移行後作業 - stylelintを入れる

[stylelint](https://stylelint.io/)

これはどちらにしろ入れる方針だったので、最後にやっちゃいます。

``` json
npm i stylelint --save
```

なんかCLIでも動くようにできるみたいですが、せっかくだしPostCSSの処理に組み込んじゃいます。

僕はCSSのlintはsmacssのソート順になっていることだけをチェックできてれば満足なので、以下の設定を使います。

[cahamilton/stylelint\-config\-property\-sort\-order\-smacss: Stylelint config for Property Sort Ordering based on the SMACSS methodology](https://github.com/cahamilton/stylelint-config-property-sort-order-smacss)

``` sh
npm i stylelint-config-property-sort-order-smacss --save
```

`.stylelintrc.yml`はこんな。

``` yml
extends: stylelint-config-property-sort-order-smacss
```

stylefmtとやらを使えばauto correctもできるみたいなので、今度やってみよう。

## まとめ

長くなったので整理します。

### 移行前後の処理時間

約30秒も遅くなっちゃいました。悔しいけど妥協します。

``` sh
7.71user 2.51system 0:33.19elapsed 30%CPU (0avgtext+0avgdata 125336maxresident)k
13.67user 7.65system 1:00.65elapsed 35%CPU (0avgtext+0avgdata 226164maxresident)k
```

### 移行前後のファイルサイズ

これはAutoprefixerも入った状態のものです。1KB増えましたね。許容範囲です。

``` sh
-rw-r--r--  1 daisuketsuji  staff    60K Oct 8 17:17 application-b190eef5e6c0c69209dc27227adc2168bfe95ae722ed7cc4a011fb96bd1b11ee.css
-rw-r--r--  1 daisuketsuji  staff    61K Oct 9 14:43 application-a390b9b8bda3b3036f4273c37d529aba.css
```

### 最終的なpackage.json

``` json
{
  "name": "myapp",
  "private": true,
  "dependencies": {
    "@rails/webpacker": "^3.0.2",
    "autoprefixer": "^7.1.5",
    "font-awesome": "^4.7.0",
    "postcss-extend": "^1.0.5",
    "postcss-hexrgba": "^1.0.0",
    "postcss-mixins": "^6.1.1",
    "postcss-nested": "^2.1.2",
    "postcss-simple-vars": "^4.1.0",
    "stylelint": "^8.2.0",
    "stylelint-config-property-sort-order-smacss": "^2.0.0"
  },
  "devDependencies": {
    "webpack-dev-server": "^2.9.1"
  }
}
```

### 最終的な.postcssrc.yml

``` yml
plugins:
  postcss-smart-import: {}
  postcss-mixins: {}
  postcss-nested: {}
  postcss-extend: {}
  postcss-simple-vars: {}
  postcss-hexrgba: {}
  autoprefixer: {}
```

stylelintはこのプロセスに入れちゃうとnode_modulesが処理されちゃって除外の仕方がわからなかったので、CLIでやるようにしました・・。

エディタ上では効くので、まあCIで弾ければいいかなと。

### 書かなかったけど詰まったところ

* @import "any/styles.css"のように拡張子をつけないと変数周りの処理がうまくいかなかった（css以外の処理が入っちゃう？）
* @define-mixin、@mixinの引数には括弧を付けちゃだめみたい（エラーしてめちゃくちゃ詰まった！）
* postcss-extendではプレースホルダーセレクタの中でカレント（&）が参照できなかったので、mixinにしました
* 画像を参照したいときは、url(asset_path())で持ってきたところを普通にurl()にすればみれるようになる。パスは~images/xxx.jpgみたいなかんじ。

### 今後

せっかくなので、JSと画像系アセットもwebpack側に寄せようかなと。
そしたらAsset Pipelineがいらなくなるので、少しは早くなるかな・・・。
