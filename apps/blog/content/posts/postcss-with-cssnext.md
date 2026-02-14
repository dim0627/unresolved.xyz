---
title: "今後もPostCSSを使っていく上でどうしていくべきかを考えてみた"
date: "2017-10-19T00:00+09:00"
tags:
  - "CSS"
---

この記事は酔っ払いながら書いてるので正しくない可能性があります。

Railsをwebpacker + PostCSSに移行してそれなりにコードを書いてみたけど、ちょっと思うところや考えなければいけないことがあったのでまとめてみる。

[\[Rails5\.1\.3\] Asset Pipeline \+ SCSSからwebpacker \+ PostCSSに移行してみるか by 42 Design Work](https://42-design.work/technology/postcss-on-rails-with-webpacker/)

## PostCSSのリスク

PostCSSはすごく面白い仕組みで、なんかこの仕組を使ってるだけでわくわくしちゃうような仕組みなんだけど、組織で使うなら色々考えなければいけない部分もあるなと思う。

### 独自に進みすぎるリスク

まず誰もが感じるのはこれだと思う。

PostCSSはプラグイン形式でいろいろな機能を追加していけるので、ビュッフェ感覚で気軽にプラグインを追加できてしまう。

これはまさに秘伝のタレを作るようなもので、導入した本人はよくても、周りの人はそのルールを知ることが難しいし、結局文法が分離してしまうリスクになってしまうと思う。

### 過多になりすぎるリスク

webpackerではPostCSSのプラグインとして、デフォルトで以下の2個が入ってる。

* postcss-smart-import
* postcss-cssnext

これはまあいい落とし所だと思っていて、ギリギリ最低限のものに見える。

webpack側のローダーにはsass-loaderがあるので、Railsから移行する上でスムーズにいけるように、と考えられているんだと思う。

が、cssnextはちょっとプラグインが過多で、いきなり全部把握するのはちょっとむずかしい。
CSS4に準拠してるという意味ではまあ妥当なんだろうけど、個人的にいきなりcssnextを使うのはいいかなと思ったので使っていない。

## cssnextを使うか、cssnextのサブセットを構築するのが安全なのでは

というわけで、ここまで書いたようなことを感じたのもあって、先日書いた記事からPostCSSの構成をだいぶアップデートした。

どういう考えでどういうアップデートをしたのかをまとめてみる。

### Sassを実現しようとしない、cssnextで使われていないプラグインは使わない

とはいえcssnextは重要な指標になると思っていて、進むべき方向として参考にするには十分な存在だと思っている。
ものすごく安易でもはや自分で判断したものではないんだけど・・・。

cssnextは結局はプラグインの集まりなので、ここに使われているプラグインはある程度信用していいと思う。

CSS4の文法に則っているわけだし、もしプラグインが死んでも自分で作れる or 誰かが作る可能性が高いと思う。

そもそも、Sassの機能を使いたいならPostCSSに移行すべきじゃない。

### postcss-simple-varsを捨てる

これがめっちゃくちゃしんどかった。

変数なんてあっちこっちで使ってるし、記法が結構変な感じで変わるので置換もちょっとめんどくて・・・。

これまでは

``` scss
$font-size: 1rem;
.container {
  font-size: $font-size;
}
```

と書いていたのを、

``` css
:root {
  --font-size: 1rem;
}

.container {
  font-size: var(--font-size);
}
```

と書くようにする。ちなみにスコープが使えるようになるよ。僕は使ってないけど。

**追記: スコープは未実装でした。**

置換したコマンドはちょっとどれだったか覚えてないけど、これかな・・・。

``` sh
grep -rl "\\$" ./ | xargs perl -i -pe 's/\$([a-z|-]+)/var(--\1)/g'
```

動かなかったらすみません。

### postcss-nestingに乗り換える

僕はなぜかpostcss-nestedを使ってたんだけど、postcss-nestingに切り替えました。

これによって以下が、

``` css
.container {
  .element {
    font-size: 1rem;
  }

  .wrapper & {
    padding: 1rem;
  }
}
```

こう書かなければいけなくなりました。

``` css
.container {
  & .element {
    font-size: 1rem;
  }

  @nest .wrapper & {
    padding: 1rem;
  }
}
```

これは置換する方法がわからなかったので、1個1個手で・・・。
まだCSSのファイルが40くらいだったので、軽い痛みで済みました。

なんでわざわざ辛い方に行ったのかと言うと、これもやはりCSS4の仕様に追従するためです。
中途半端にSassの機能を引きずりたくなかったので。

### extendを捨てる

まあこれもSassで好きな機能だったんだけど、やめました。
postcss-applyを使えばだいたい同じことができます。

こう書いてたものが、

``` css
%filled {
  background-color: #fff;
  line-height: 1.25rem;
}

.container {
  @extend %filled;
}
```

こうなる。

``` css
:root {
  --filled {
    background-color: #fff;
    line-height: 1.25rem;
  }
}

.container {
  @apply --filled;
}
```

カレントセレクタはどうなんだろ、使えないと思う。

### mixinは残した

これはちょっとどうしょうもなかった。

他に代替的な仕様がないのか探したんだけど見つからなくて・・・。

## grepで除去できるものは使っても良いルール

最終的に、cssnextにないけど残したプラグインは以下の2個。

* postcss-hexrgba
* postcss-mixins

これらは最悪やめるときがきても、grepで引っ掛けられるからいいかなと。

### 今使っている.postcssrc.yml

``` yml
plugins:
  postcss-smart-import: {}
  postcss-mixins: {}
  postcss-apply: {}
  postcss-nesting: {}
  postcss-custom-media: {}
  postcss-custom-properties: {}
  postcss-hexrgba: {}
  autoprefixer: {}
```

わかんなくなったらplaygroundへ。

[cssnext Playground](http://cssnext.io/playground/)

以上です。
