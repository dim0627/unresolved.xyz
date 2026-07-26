---
title: "今後もPostCSSを使っていく上でどうしていくべきかを考えてみました"
date: "2017-10-19T00:00+09:00"
tags:
  - "CSS"
---

この記事は酔っ払いながら書いているので正しくない可能性があります。

Railsをwebpacker + PostCSSに移行してそれなりにコードを書いてみましたが、ちょっと思うところや考えなければいけないことがあったのでまとめてみます。

[\[Rails5\.1\.3\] Asset Pipeline \+ SCSSからwebpacker \+ PostCSSに移行してみるか by 42 Design Work](https://42-design.work/technology/postcss-on-rails-with-webpacker/)

## PostCSSのリスク

PostCSSはとても面白い仕組みで、この仕組みを使っているだけでわくわくしてしまうようなものなのですが、組織で使うなら色々考えなければいけない部分もあるなと思います。

### 独自に進みすぎるリスク

まず誰もが感じるのはこれだと思います。

PostCSSはプラグイン形式でいろいろな機能を追加していけるので、ビュッフェ感覚で気軽にプラグインを追加できてしまいます。

これはまさに秘伝のタレを作るようなもので、導入した本人はよくても、周りの人はそのルールを知ることが難しいですし、結局文法が分離してしまうリスクになってしまうと思います。

### 過多になりすぎるリスク

webpackerではPostCSSのプラグインとして、デフォルトで以下の2個が入っています。

* postcss-smart-import
* postcss-cssnext

これはまあいい落とし所だと思っていて、ギリギリ最低限のものに見えます。

webpack側のローダーにはsass-loaderがあるので、Railsから移行する上でスムーズにいけるように、と考えられているのだと思います。

が、cssnextはちょっとプラグインが過多で、いきなり全部把握するのはちょっと難しいです。
CSS4に準拠しているという意味ではまあ妥当なのでしょうが、個人的にいきなりcssnextを使うのはいいかなと思ったので使っていません。

## cssnextを使うか、cssnextのサブセットを構築するのが安全なのでは

というわけで、ここまで書いたようなことを感じたのもあって、先日書いた記事からPostCSSの構成をだいぶアップデートしました。

どういう考えでどういうアップデートをしたのかをまとめてみます。

### Sassを実現しようとしない、cssnextで使われていないプラグインは使わない

とはいえcssnextは重要な指標になると思っていて、進むべき方向として参考にするには十分な存在だと思っています。
とても安易でもはや自分で判断したものではないのですが・・・。

cssnextは結局はプラグインの集まりなので、ここに使われているプラグインはある程度信用していいと思います。

CSS4の文法に則っていますし、もしプラグインが死んでも自分で作れる、あるいは誰かが作る可能性が高いと思います。

そもそも、Sassの機能を使いたいならPostCSSに移行すべきではありません。

### postcss-simple-varsを捨てる

これがとても大変でした。

変数なんてあちこちで使っていますし、記法が結構変な感じで変わるので置換もちょっと面倒で・・・。

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

と書くようにします。ちなみにスコープが使えるようになります。私は使っていませんが。

**追記: スコープは未実装でした。**

置換したコマンドはちょっとどれだったか覚えていませんが、これでしょうか・・・。

``` sh
grep -rl "\\$" ./ | xargs perl -i -pe 's/\$([a-z|-]+)/var(--\1)/g'
```

動かなかったらすみません。

### postcss-nestingに乗り換える

私はなぜかpostcss-nestedを使っていたのですが、postcss-nestingに切り替えました。

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

これは置換する方法がわからなかったので、1個1個手で修正しました・・・。
まだCSSのファイルが40くらいだったので、軽い痛みで済みました。

なぜわざわざ大変な方に行ったのかと言うと、これもやはりCSS4の仕様に追従するためです。
中途半端にSassの機能を引きずりたくなかったので。

### extendを捨てる

まあこれもSassで好きな機能だったのですが、やめました。
postcss-applyを使えばだいたい同じことができます。

こう書いていたものが、

``` css
%filled {
  background-color: #fff;
  line-height: 1.25rem;
}

.container {
  @extend %filled;
}
```

こうなります。

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

カレントセレクタはどうなのでしょう、使えないと思います。

### mixinは残しました

これはちょっとどうしようもありませんでした。

他に代替的な仕様がないのか探したのですが見つからなくて・・・。

## grepで除去できるものは使っても良いルール

最終的に、cssnextにないけど残したプラグインは以下の2個です。

* postcss-hexrgba
* postcss-mixins

これらは最悪やめるときがきても、grepで引っ掛けられるからいいかなと思います。

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

わからなくなったらplaygroundへ。

[cssnext Playground](http://cssnext.io/playground/)

以上です。
