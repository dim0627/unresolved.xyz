---
title: "Hugoのテーマを何個か作ったので知見をまとめてみます"
date: "2016-10-03T00:00+09:00"
tags: []
---

Hugoは静的サイトジェネレータの中でもだいぶ柔軟性のあるツールだと思います。

ただ、その分気をつけなければいけないことがあったり、実現する方法が分かりづらかったりすることが多いので、
そういった点をまとめてみます。

## テーマの作成

まずはテーマを作ります。
この章では、テーマを作るための環境の作り方を解説します。

### HugoBasicExampleをcloneしましょう

HugoにはHugoBasicExampleという、サンプルの記事や基本的な機能を使ったテスト用レポジトリが用意されています。

[spf13/HugoBasicExample: Example site to use with Hugo & Hugo Themes](https://github.com/spf13/HugoBasicExample)

Hugoのテーマづくりは、このレポジトリのcloneから始まります。

### hugo new theme

次にテーマの雛形を作ります。
Hugoにはテーマの雛形を作り上げるコマンドがあります。

```bash
hugo new theme [name]
```

`hugo new`コマンドは、新しくサイトを作るときやページを作るときにも使われます。
とにかく、何か新しいものを作るときに使われるコマンドで、テーマを作るときもこれを使います。

cloneしたHugoBasicExampleのルートディレクトリでコマンドを実行すれば、`./themes/XXXX`に雛形が作られます。

後述するthemes.gohugo.ioに載せてもらうために必要なファイルも揃っているので、0からファイルを作るよりこのコマンドを使うのが賢明だと思います。

### ページの構造とテーマファイルの基礎的な構造を理解する

Hugoのページ構造はだいたい次の通りです。

* HomePage
* list
* single
* taxonomies
* terms
* 404.html

で、`hugo new`で作られるテーマファイルの構成は次の通りです。

```text
.
├── LICENSE.md
├── archetypes
│   └── default.md
├── layouts
│   ├── 404.html
│   ├── _default
│   │   ├── list.html
│   │   └── single.html
│   ├── index.html
│   └── partials
│       ├── footer.html
│       └── header.html
├── static
│   ├── css
│   └── js
└── theme.toml
```

実は、この雛形には足りないものや要らないものもあります。
それはおいおい自分の好きなように足したり消したりすれば大丈夫です。

### テンプレートファイルと対象ページの紐付けを理解する

テンプレートファイルと対象ページの紐付けは、実は少しややこしいです。

なぜかというと、Hugoは対象のテンプレートを特定の順番で走査する仕組みになっていて、
ページごとに細かくデザインを変えたり、全体で1つのテンプレートに統一したりと、融通が効くようになっています。

listページを例に具体的な構造を示すとこうなります。

```text
/layouts/section/SECTION.html
/layouts/_default/section.html
/layouts/_default/list.html
/themes/THEME/layouts/section/SECTION.html
/themes/THEME/layouts/_default/section.html
/themes/THEME/layouts/_default/list.html
```

[Hugo \- Content List Template](https://gohugo.io/templates/list/)

上から順に、最初に見つかったテンプレートを採用します。
つまり、最終的に`/themes/THEME/layouts/_default/list.html`まですべて見つからなければ、何も描画されません。

### オーバーライドの仕組みを理解する

Hugoの最も便利な仕組みの1つとして、テンプレートファイルは`./themes`とルート直下のものでそれぞれ用意できるような仕様があります。

つまり、`themes`においたテーマファイルをユーザが独自にオーバーライドできるようになっています。

先の例にあげたlistで言えば、`/layouts`と`/themes`で同じファイルを走査しているのがわかります。

```text
/layouts/section/SECTION.html
/layouts/_default/section.html
/layouts/_default/list.html
/themes/THEME/layouts/section/SECTION.html
/themes/THEME/layouts/_default/section.html
/themes/THEME/layouts/_default/list.html
```

例えば、ユーザがあなたのテーマを使ってくれたとします。

そのまま使えばあなたがデザインしたとおりに描画されますが、対象のテンプレートファイルと同じ名前をルートディレクトリに配置することで、
そのファイルだけを独自に変更することができます。

ここで大事なのは、これはテンプレートファイルに限った話ではなく、**CSSや画像などの静的ファイルにも同じことが言える**ということです。

これをうまく利用することで、ユーザが豊富なバリエーションで使うことができるテーマを作ることができます。

## 何から手をつけるか

ここまでで、Hugoのテーマづくりにおける基礎的な解説はできたと思います。

しかし、実際に手をつけるとなるとどこから着手していいかわからなくなると思います。
というわけで、自分がテーマを作るときの作業順序をまとめてみます。

### ./layouts/index.htmlの削除

Hugoは`./layouts/index.html`がなければ、`./layouts/_default/list.html`が採用されます。

自分は複雑な構造にするのが嫌なので、まず`./layouts/index.html`を消してしまいます。

トップとそれ以外の記事一覧で表示を変えたい場合は、if文と`.IsHome`でなんとかします。

トップと一覧が大幅に乖離する場合は、ちゃんと分けたほうが良いです。

### ./layouts/_default/baseof.htmlの作成

後述するblock templatesを使うため、`baseof.html`を作ります。
ここでHTMLに必要な`<!DOCTYPE html>`や`meta`タグの配置、ヘッダとフッタのマークアップとデザインをします。

[Hugo \- Block Templates](https://gohugo.io/templates/blocks/)

### ./layouts/_default/list.htmlの作成

次に`list.html`を作ります。
前述したとおり、Hugoは`./layouts/index.html`がなければ、`./layouts/_default/list.html`が採用されます。

このタイミングで、トップページのマークアップとデザインを終わらせます。

### ./layouts/_default/li.htmlの作成

Hugoは断片的なパーツ、例えば一覧表示用の記事など、使い回しをする素材を切り出すことを推奨しています。

これは`Page`が持つ`.Render`を使って実現します。

[Hugo \- Hugo Template Functions](https://gohugo.io/templates/functions#render)

`./layouts/_default/list.html`には最新記事の一覧を表示する場合がほとんどであるため、
`./layouts/_default/list.html`で作った記事1つ1つを`li.html`に切り出します。

### ./layouts/_default/single.htmlの作成

次に記事詳細を作ってしまいます。
これはここまでで説明したものとなんら変わりないので、特筆なしです。

### ./layouts/_default/terms.htmlの作成

次にtermsのページを作ります。
このページは質素になりがちなので、デザインが難しいです。

### ./layouts/404.htmlの作成

忘れがちなのが`404.html`です。
ちゃんと作っておかないと空白のページが作られます。

## 気をつけたほうがいいこと

ここまでで基本的なテーマを作れるまでの説明をしました。
しかし、これだけだときっとハマるであろう落とし穴がいくつかあります。

### 相対パスは避ける

画像や静的資材の参照には相対パスを使ってはいけません。これはHTML上にあらわれるあらゆるファイルすべてに言えます。

ユーザはドメインのルートであなたのテーマを使うとは限りません。
例えばthemes.gohugo.ioがいい例です。

[Hugo Themes Site](http://themes.gohugo.io/)

各テーマのデモはサブディレクトリで構成されます。
つまり、相対パスを使ってしまうと参照が壊れてデザインが崩れます。

`{{ .Site.BaseURL}}`を使って絶対参照で構築するべきです。

### マジックナンバーは避ける

よくあるのが、Taxonomyに使われる値をべた書きしてしまうものです。
`categories`や`tags`など。

これをマジックナンバーで書いてしまうと、ユーザが独自にTaxonomyを定義できません。
Hugoは`.Site.Taxonomies`で定義されたTaxonomyをすべて取得できるので、できるだけ柔軟に使えるようにしましょう。

[Hugo \- Displaying Taxonomies](https://gohugo.io/taxonomies/displaying/)

Hugo側で`categories`と`tags`はデファクトのようなスタンスを取っているので、それを理解した上でべた書きするのはありだと思います。

## 必要最低限の機能を付ける

サイトを作る上で、誰もが使いたいであろう機能があります。
そういった機能はできるだけつけたほうが良いです。

### GoogleAnalytics

代表的なものがGoogleAnalyticsです。
Hugoは`config.toml`にGoogleAnalyticsのUserAgentを記述できるようになっています。

```toml
googleAnalytics = "UA-123-45"
```

この値が設定されていればGoogleAnalyticsのタグを配置するべきですし、
設定されていないなら出すべきではありません。

そういったときには`with`が便利に働きます。

[Conditionals | Hugo \- Go Template Primer](https://gohugo.io/templates/go-templates/#conditionals)

GoogleAnalyticsのタグは`_internal/google_analytics.html`という内部テンプレートが用意されています。
自分で書くよりもこれを呼び出してしまえば、値の設定、未設定の判定もやってくれます。

[Hugo \- Analytics in Hugo](https://gohugo.io/extras/analytics/)

### Disqus

静的サイトのコメント機能でもっとも有名なDisqusです。
これもGoogleAnalyticsと同様、変数名が決まっています。

```toml
disqusShortname = "XYW"
```

[Hugo \- Comments in Hugo](https://gohugo.io/extras/comments#configuring-disqus)

DisqusもGoogleAnalytics同様、内部テンプレートが用意されているので、それを呼び出すのが良いです。

### Generator

HugoはHugoのコミュニティを成長させるために、metaタグにgeneratorを明記することを推奨しています。

``` html
<meta name="generator" content="Hugo 0.17-DEV" />
```

generatorは`{{ .Hugo.Generator }}`でタグとともに出力されます。
ユーザに影響をあたえるものではありませんが、Hugoの発展のためにできるかぎり入れてあげたいところです。

[generator-meta-tag | Hugo \- Creating a Theme](https://gohugo.io/themes/creation#generator-meta-tag)

### Share button

シェアボタンも、基本的にはどのサイトにも必要になります。
これは国によって使われるサービスやSNSが異なるため、可変にできるとなお良いです。

また、シェア自体いらないという場合もあるため、config.tomlで表示、非表示が切り替えられたり、
記事単位に`.Params`で切り替えられたりすると良いと思います。

## よりよいテーマにするために

ここまでで、必要最低限なものが揃ったテーマを作るための説明はできたと思います。
次は少し発展させて、ユーザが柔軟にテーマを使うための機能を作ります。

### Menuを可変にする

だいたいのWebサイトには、メニューが配置されます。
HugoにはMenusという機能があり、これを使うこともできます。

[Hugo \- Menus](https://gohugo.io/extras/menus/)

ただ、実際にこれを使ってMenuを形成している人は少なそうな印象です。
そのため、config.tomlなどで設定できるようにしているテーマが多く見られます。

自分がもっとも適切と思える形で実装し、READMEで設定の仕方を説明すると良いです。

### Shortcodesを用意する

Wordpressやその他のブログシステムにはShortcodesというとても便利な機能があります。

もちろんHugoにもありますので、基本的なものはテーマ側で用意しておくと良いです。

[Hugo \- Shortcodes](https://gohugo.io/extras/shortcodes/)

これはマークダウン内で定型的なHTMLを差し込むことができるものです。
例えば、画像やiframe、Twitterの埋め込みなどは、毎回HTMLを書くよりも手軽に呼び出せるようにしたかったりします。

テーマが用意するShortcodesとしては、画像の埋め込みと右寄せ、左寄せくらいを提供できると良いです。
機能を作ったら、README.mdに使い方を書いておきます。

### custom.cssを作っておく

ユーザが独自に、デザイン的なオーバーライドをしたい場合があります。

`styles.css`1つ用意しておけば、ユーザがまるまるHugoのルートディレクトリにコピーしてオーバーライドすることもできますが、
全体をコピーしないといけなくなります。

そういったときのため、custom.cssという空っぽのスタイルシートを用意して読み込ませておくと良いです。
ユーザは必要な場合のみcustom.cssを作ればいいですし、そうでないなら空っぽのまま使われるだけです。

テーマのバージョンアップをしたときも、影響を少なくすることができます。

## 言語を超えて拡張性をもたせる

Hugoは全世界のあらゆる国で使われています。
テーマもできるだけ、特定の国に依存しないようにします。

### DateFormatを可変にする

まず言えるのが、日付の形式です。

日本は`2016/01/01`といった形式ですが、世界では違います。
これはできるだけ、柔軟に変えられると良いです。

例えば、config.tomlに次のように設定できるようにします。

```toml
[params]
  dateformat = "Jan 2, 2006" # Optional
```

テンプレートファイルでは次のように描画します。

```html
{{ .Lastmod.Format ( .Site.Params.dateformat | default "Jan 2, 2006") }}
```

### フォントを可変にする

英語圏ではHelveticaやArialなどでいいフォントも、国によってはそうとも言えません。

これもDateFormatと同じように、config.tomlなどで設定できると良いです。
custom.cssを用意する方法でも良いですが、フォントだけのためにファイルを作らせるよりは、設定で変えられると親切だと思います。

## 開発における発展的なノウハウ

ここでは、テーマを作る上でのさらに発展的なノウハウについてまとめます。

### block templatesを使いたい

すでに登場しましたが、Hugoはblock templatesという機能が使えます。

[Hugo \- Block Templates](https://gohugo.io/templates/blocks/)

これはベースとなるテンプレートと子となるテンプレートを用意できる機能で、
HTMLの共通的な部分をベーステンプレートに切り出すことができます。

しかし、このHugoの機能には現在バグがあり、時折Golangのエラーメッセージを吐いてクラッシュします。

```text
fatal error: concurrent map read and map write
```

この記事を書いている今も、かなりの回数クラッシュしています。

おそらく記事生成をgoroutineで回していて、その中でmapへの不適切なアクセスが走っているのだと思います。
そのうち直ると思いますが、気になる方はblock templates自体を使わないほうが良いです。

[Concurrent map read and write error in template handling · Issue \#2224 · spf13/hugo](https://github.com/spf13/hugo/issues/2224)

Issueもあがっていますが、再現できていないようです。

### AMP対応をしたい

AMP対応は制約がいくつか付くだけなので、そこまで難しい実装ではありません。

おそらく一番困るのがスタイルシートの導入だと思います。
自分は`./layouts/partials/styles.css`にスタイルを配置して、次のようにしてインラインCSSとして描画しています。

```html
<style amp-custom>
  {{ replaceRE " +" " " (replaceRE "\n" "" (partial "styles.css" .)) | safeCSS }}
</style>
```

## themes.gohugo.ioに載せてもらう

テーマを作ったら、Hugoのテーマポータルであるthemes.gohugo.ioに載せてもらうための手順を進めます。

[Hugo Themes Site](http://themes.gohugo.io/)

### theme.tomlを書く

まず、theme.tomlを書く必要があります。
これは`hugo new`で雛形が作られているので、それにそって書けば大丈夫です。

基本的な説明は、Hugoのテーマ用レポジトリのREADMEにあります。

[spf13/hugoThemes: All Themes Hugo](https://github.com/spf13/hugoThemes)

### スクリーンショットを撮る

themes.gohugo.ioに表示されるサムネイルが2つの異なるサイズで必要になります。

> Thumbnail should be 900×600 in pixels
>
> Screenshot should be 1500×1000 in pixels
>
> Media must be located in:
>
> [ThemeDir]/images/screenshot.png
>
> [ThemeDir]/images/tn.png

一番映えるページでスクリーンショットを撮り、配置します。

### README.mdを書く

README.mdはユーザにもっとも近いドキュメントになります。
ここにはできるかぎり親切な情報を載せたほうが良いです。

例えば次のようなものです。

* Screenshots
* Features
* config.toml example
* frontmatter example
* Shortcodes example

必要であれば、画像も使って説明をします。

### GitHubにIssueをあげる

ここまでできたら、自分のテーマレポジトリをHugoのテーマ用レポジトリにIssueとして連絡すれば大丈夫です。

[spf13/hugoThemes: All Themes Hugo](https://github.com/spf13/hugoThemes)

コントリビューターの方が確認して、修正すべきポイントがあればIssueをあげてくれますし、
問題なければ取り込んでCloseしてくれます。
