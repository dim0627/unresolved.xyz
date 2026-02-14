---
title: "Hugoのテーマを何個か作ったので知見をまとめてみる"
date: "2016-10-03T00:00+09:00"
tags: []
---

Hugoは静的サイトジェネレータの中でもだいぶ柔軟性のあるツールだと思う。

でも、その分気をつけなきゃいけないことがあったり、実現する方法が分かりづらかったりすることが多いので、
そういう点をまとめてみる。

## テーマの作成

まずはテーマを作る。
この章では、テーマを作るための環境の作り方を解説する。

### HugoBasicExampleをcloneしよう

HugoにはHugoBasicExampleという、サンプルの記事や基本的な機能を使ったテスト用レポジトリが用意されている。

[spf13/HugoBasicExample: Example site to use with Hugo & Hugo Themes](https://github.com/spf13/HugoBasicExample)

Hugoのテーマづくりは、このレポジトリのcloneから始まる。

### hugo new theme

次にテーマの雛形を作る。
Hugoにはテーマの雛形を作り上げるコマンドがある。

```bash
hugo new theme [name]
```

`hugo new`コマンドは、新しくサイトを作るときやページを作るときにも使われる。
とにかく、何か新しいものを作るときに使われるコマンドで、テーマを作るときもこれを使う。

cloneしたHugoBasicExampleのルートディレクトリでコマンドを実行すれば、`./themes/XXXX`に雛形が作られる。

後述するthemes.gohugo.ioに載せてもらうために必要なファイルも揃っているので、0からファイルを作るよりこのコマンドを使うのが賢明だと思う。

### ページの構造とテーマファイルの基礎的な構造を理解する

Hugoのページ構造はだいたい次の通り。

* HomePage
* list
* single
* taxonomies
* terms
* 404.html

で、`hugo new`で作られるテーマファイルの構成は次の通り。

```text
.
├── LICENSE.md
├── archetypes
│   └── default.md
├── layouts
│   ├── 404.html
│   ├── _default
│   │   ├── list.html
│   │   └── single.html
│   ├── index.html
│   └── partials
│       ├── footer.html
│       └── header.html
├── static
│   ├── css
│   └── js
└── theme.toml
```

実は、この雛形には足りないものや要らないものもある。
それはおいおい自分の好きなように足したり消したりすればいい。

### テンプレートファイルと対象ページの紐付けを理解する

テンプレートファイルと対象ページの紐付けは、実は少しややこしい。

なぜかというと、Hugoは対象のテンプレートを特定の順番で走査する仕組みになっていて、
ページごとに細かくデザインを変えたり、全体で1つのテンプレートに統一したりと、融通が効くようになっている。

listページを例に具体的な構造を示すとこうなる。

```text
/layouts/section/SECTION.html
/layouts/_default/section.html
/layouts/_default/list.html
/themes/THEME/layouts/section/SECTION.html
/themes/THEME/layouts/_default/section.html
/themes/THEME/layouts/_default/list.html
```

[Hugo \- Content List Template](https://gohugo.io/templates/list/)

上から順に、最初に見つかったテンプレートを採用する。
つまり、最終的に`/themes/THEME/layouts/_default/list.html`まですべて見つからなければ、何も描画されない。

### オーバーライドの仕組みを理解する

Hugoの最も便利なしくみの1つとして、テンプレートファイルは`./themes`とルート直下のものでそれぞれ用意できるような仕様がある。

つまり、`themes`においたテーマファイルをユーザが独自にオーバーライドできるようになっている。

先の例にあげたlistで言えば、`/layouts`と`/themes`で同じファイルを走査しているのがわかる。

```text
/layouts/section/SECTION.html
/layouts/_default/section.html
/layouts/_default/list.html
/themes/THEME/layouts/section/SECTION.html
/themes/THEME/layouts/_default/section.html
/themes/THEME/layouts/_default/list.html
```

例えば、ユーザがあなたのテーマを使ってくれたとする。

そのまま使えばあなたがデザインしたとおりに描画されるが、対象のテンプレートファイルと同じ名前をルートディレクトリに配置することで、
そのファイルだけを独自に変更することができる。

ここで大事なのが、これはテンプレートファイルに限った話ではなく、**CSSや画像などの静的ファイルにも同じことが言える**ということ。

これをうまく利用することで、ユーザが豊富なバリエーションで使うことができるテーマを作ることができる。

## 何から手をつけるか

ここまでで、Hugoのテーマづくりにおける基礎的な解説はできたと思う。

しかし、実際に手をつけるとなるとどこから着手していいかわからなくなると思う。
というわけで、僕がテーマを作るときの作業順序をまとめてみる。

### ./layouts/index.htmlの削除

Hugoは`./layouts/index.html`がなければ、`./layouts/_default/list.html`が採用される。

僕は複雑な構造にするのが嫌なので、まず`./layouts/index.html`を消してしまう。

トップとそれ以外の記事一覧で表示を変えたい場合は、if文と`.IsHome`でなんとかする。

トップと一覧が大幅に乖離する場合は、ちゃんと分けたほうがいい。

### ./layouts/_default/baseof.htmlの作成

後述するblock templatesを使うため、`baseof.html`を作る。
ここでHTMLに必要な`<!DOCTYPE html>`や`meta`タグの配置、ヘッダとフッタのマークアップとデザインをする。

[Hugo \- Block Templates](https://gohugo.io/templates/blocks/)

### ./layouts/_default/list.htmlの作成

次に`list.html`を作る。
前述したとおり、Hugoは`./layouts/index.html`がなければ、`./layouts/_default/list.html`が採用される。

このタイミングで、トップページのマークアップとデザインを終わらせる。

### ./layouts/_default/li.htmlの作成

Hugoは断片的なパーツ、例えば一覧表示用の記事など、使い回しをする素材を切り出すことを推奨している。

これは`Page`が持つ`.Render`を使って実現する。

[Hugo \- Hugo Template Functions](https://gohugo.io/templates/functions#render)

`./layouts/_default/list.html`には最新記事の一覧を表示する場合がほとんどであるため、
`./layouts/_default/list.html`で作った記事1つ1つを`li.html`に切り出す。

### ./layouts/_default/single.htmlの作成

次に記事詳細を作ってしまう。
これはここまでで説明したものとなんらかわりないので、特筆なし。

### ./layouts/_default/terms.htmlの作成

次にtermsのページを作る。
このページは質素になりがちなので、デザインが難しい。

### ./layouts/404.htmlの作成

わすれがちなのが`404.html`。
ちゃんと作っておかないと空白のページが作られる。

## 気をつけたほうがいいこと

ここまでで基本的なテーマは作れるまでの説明をした。
しかし、これだけだときっとハマるであろう落とし穴がいくつかある。

### 相対パスは避ける

画像や静的資材の参照には相対パスを使ってはいけない。これはHTML上にあらわれるあらゆるファイルすべてに言える。

ユーザはドメインのルートであなたのテーマを使うとは限らない。
例えばthemes.gohugo.ioがいい例。

[Hugo Themes Site](http://themes.gohugo.io/)

各テーマのデモはサブディレクトリで構成される。
つまり、相対パスを使ってしまうと参照が壊れてデザインが崩れる。

`{{ .Site.BaseURL}}`を使って絶対参照で構築するべき。

### マジックナンバーは避ける

よくあるのが、Taxonomyに使われる値をべた書きしてしまうものだ。
`categories`や`tags`など。

これをマジックナンバーで書いてしまうと、ユーザが独自にTaxonomyを定義できない。
Hugoは`.Site.Taxonomies`で定義されたTaxonomyをすべて取得できるので、できるだけ柔軟に使えるようにしよう。

[Hugo \- Displaying Taxonomies](https://gohugo.io/taxonomies/displaying/)

Hugo側で`categories`と`tags`はデファクトみたいなスタンスを取っているので、それを理解した上でべた書きするのはありだと思う。

## 必要最低限の機能を付ける

サイトを作る上で、誰もが使いたいであろう機能がある。
そういった機能はできるだけつけたほうがいい。

### GoogleAnalytics

代表的なものがGoogleAnalytics。
Hugoは`config.toml`にGoogleAnalyticsのUserAgentを記述できるようになっている。

```toml
googleAnalytics = "UA-123-45"
```

この値が設定されていればGoogleAnalyticsのタグを配置するべきだし、
設定されてないなら出すべきじゃない。

そういったときには`with`が便利にはたらく。

[Conditionals | Hugo \- Go Template Primer](https://gohugo.io/templates/go-templates/#conditionals)

GoogleAnalyticsのタグは`_internal/google_analytics.html`という内部テンプレートが用意されている。
自分で書くよりもこれを呼び出してしまえば、値の設定、未設定の判定もやってくれる。

[Hugo \- Analytics in Hugo](https://gohugo.io/extras/analytics/)

### Disqus

静的サイトのコメント機能でもっとも有名なDisqus。
これもGoogleAnalyticsと同様、変数名が決まっている。

```toml
disqusShortname = "XYW"
```

[Hugo \- Comments in Hugo](https://gohugo.io/extras/comments#configuring-disqus)

DisqusもGoogleAnalytics同様、内部テンプレートが用意されているので、それを呼び出すのがいい。

### Generator

HugoはHugoのコミュニティを成長させるために、metaタグにgeneratorを明記することを推奨している。

``` html
<meta name="generator" content="Hugo 0.17-DEV" />
```

generatorは`{{ .Hugo.Generator }}`でタグとともに出力される。
ユーザに影響をあたえるものではないが、Hugoの発展のためにできるかぎり入れてあげたい。

[generator-meta-tag | Hugo \- Creating a Theme](https://gohugo.io/themes/creation#generator-meta-tag)

### Share button

シェアボタンも、基本的にはどのサイトにも必要になる。
これは国によって使われるサービスやSNSが異なるため、可変にできるとなおいい。

また、シェア自体いらないという場合もあるため、config.tomlで表示、非表示が切り替えられたり、
記事単位に`.Params`で切り替えられたりするといいと思う。

## よりよいテーマにするために

ここまでで、必要最低限なものが揃ったテーマを作るための説明はできたと思う。
次は少し発展させて、ユーザが柔軟にテーマを使うための機能を作る。

### Menuを可変にする

だいたいのWebサイトには、メニューが配置される。
HugoにはMenusという機能があり、これを使うこともできる。

[Hugo \- Menus](https://gohugo.io/extras/menus/)

が、実際にこれを使ってMenuを形成している人は少なそうな印象。
そのため、config.tomlなどで設定できるようにしているテーマが多く見られる。

自分がもっとも適切と思える形で実装し、READMEで設定の仕方を説明するといい。

### Shortcodesを用意する

Wordpressやその他のブログシステムにはShortcodesというとてつもなく便利な機能がある。

もちろんHugoにもあるので、基本的なものはテーマ側で用意しておくといい。

[Hugo \- Shortcodes](https://gohugo.io/extras/shortcodes/)

これはマークダウン内で定型的なHTMLを差し込むことができるもの。
例えば、画像やiframe、Twitterの埋め込みなどは、毎回HTMLを書くよりも手軽に呼び出せるようにしたかったりする。

テーマが用意するShortcodesとしては、画像の埋め込みと右寄せ、左寄せくらいを提供できるといい。
機能を作ったら、README.mdに使い方を書いておく。

### custom.cssを作っておく

ユーザが独自に、デザイン的なオーバーライドをしたい場合がある。

`styles.css`1つ用意しておけば、ユーザがまるまるHugoのルートディレクトリにコピーしてオーバーライドすることもできるが、
全体をコピーしないといけなくなる。

そういったときのため、custom.cssという空っぽのスタイルシートを用意して読み込ませておくといい。
ユーザは必要な場合のみcustom.cssを作ればいいし、そうでないなら空っぽのまま使われるだけ。

テーマのバージョンアップをしたときも、影響を少なくすることができる。

## 言語を超えて拡張性をもたせる

Hugoは全世界のあらゆる国で使われている。
テーマもできるだけ、特定の国に依存しないようにする。

### DateFormatを可変にする

まず言えるのが、日付の形式だ。

日本は`2016/01/01`といった形式だが、世界では違う。
これはできるだけ、柔軟に変えられるといい。

例えば、config.tomlに次のように設定できるようにする。

```toml
[params]
  dateformat = "Jan 2, 2006" # Optional
```

テンプレートファイルでは次のように描画する。

```html
{{ .Lastmod.Format ( .Site.Params.dateformat | default "Jan 2, 2006") }}
```

### フォントを可変にする

英語圏ではHelveticaやArialなどでいいフォントも、国によってはそうとも言えない。

これもDateFormatと同じように、config.tomlなどで設定できるといい。
custom.cssを用意する方法でも良いが、フォントだけのためにファイルを作らせるよりは、設定で変えられると親切だと思う。

## 開発における発展的なノウハウ

ここでは、テーマを作る上でのさらに発展的なノウハウについてまとめる。

### block templatesを使いたい

すでに登場したが、Hugoはblock templatesという機能が使える。

[Hugo \- Block Templates](https://gohugo.io/templates/blocks/)

これはベースとなるテンプレートと子となるテンプレートを用意できる機能で、
HTMLの共通的な部分をベーステンプレートに切り出すことができる。

しかし、このHugoのこの機能には現在バグがあり、時折Golangのエラーメッセージを吐いてクラッシュする。

```text
fatal error: concurrent map read and map write
```

この記事を書いている今も、かなりの回数クラッシュしている。

おそらく記事生成をgoroutineで回していて、その中でmapへの不適切なアクセスが走っているのだと思う。
そのうち直ると思っているが、気になる人はblock templates自体を使わないほうがいい。

[Concurrent map read and write error in template handling · Issue \#2224 · spf13/hugo](https://github.com/spf13/hugo/issues/2224)

Issueもあがっているが、再現できていないらしい。

### AMP対応をしたい

AMP対応は制約がいくつか付くだけなので、そこまで難しい実装ではない。

おそらくいちばんこまるのがスタイルシートの導入だと思う。
僕は`./layouts/partials/styles.css`にスタイルを配置して、次のようにしてインラインCSSとして描画している。

```html
<style amp-custom>
  {{ replaceRE " +" " " (replaceRE "\n" "" (partial "styles.css" .)) | safeCSS }}
</style>
```

## themes.gohugo.ioに載せてもらう

テーマを作ったら、Hugoのテーマポータルであるthemes.gohugo.ioに載せてもらうための手順を進める。

[Hugo Themes Site](http://themes.gohugo.io/)

### theme.tomlを書く

まず、theme.tomlを書く必要がある。
これは`hugo new`で雛形が作られているので、それにそって書けばいい。

基本的な説明は、Hugoのテーマ用レポジトリのREADMEにある。

[spf13/hugoThemes: All Themes Hugo](https://github.com/spf13/hugoThemes)

### スクリーンショットを撮る

themes.gohugo.ioに表示されるサムネイルが2つの異なるサイズで必要になる。

> Thumbnail should be 900×600 in pixels
>
> Screenshot should be 1500×1000 in pixels
>
> Media must be located in:
>
> [ThemeDir]/images/screenshot.png
>
> [ThemeDir]/images/tn.png

一番映えるページでスクリーンショットを撮り、配置する。

### README.mdを書く

README.mdはユーザにもっとも近いドキュメントになる。
ここにはできるかぎり親切な情報を載せたほうがいい。

例えば次のようなもの。

* Screenshots
* Features
* config.toml example
* frontmatter example
* Shortcodes example

必要であれば、画像も使って説明をする。

### GitHubにIssueをあげる

ここまでできたら、自分のテーマレポジトリをHugoのテーマ用レポジトリにIssueとして連絡すればいい。

[spf13/hugoThemes: All Themes Hugo](https://github.com/spf13/hugoThemes)

コントリビューターの方が確認して、修正すべきポイントがあればIssueをあげてくれるし、
問題なければ取り込んでCloseしてくれる。
