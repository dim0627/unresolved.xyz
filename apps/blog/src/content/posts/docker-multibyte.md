---
title: "Docker上のDebianイメージ（ruby/2.3.3-slim）で日本語が打てない問題の解決方法"
date: "2017-03-23T00:00+09:00"
tags:
  - "Ruby"
  - "TIL"
  - "Docker"
---

Docker Composeはいいですよね。
とても手軽に使えますし、慣れたらもう戻れない魅力があります。

自分の開発環境はcomposeで構築していて、Railsが載っているWeb用イメージはRubyの公式Dockerイメージをベースに使っているのですが、
これだとDocker上で日本語が受け付けなくて何かと困ることが多いです。

元のDockerfileは以下で、`FROM debian:jessie`でわかるようにdebianが使われています。

[ruby/Dockerfile at 7a3e1295bbc840c350fc37d406692301b27f4e86 · docker\-library/ruby](https://github.com/docker-library/ruby/blob/7a3e1295bbc840c350fc37d406692301b27f4e86/2.3/slim/Dockerfile)

debianのロケール設定はUbuntuともちょっと違ったりして、調べて出てくる情報だと全然解決できなかったりします。
そして毎回この問題で困っている自分も嫌なので、備忘録として残しておきたいと思います。

ちなみに**結論からいうと**、自分の場合の解決方法はこちらでした。

```dockerfile
ENV LANG C.UTF-8
```

## なぜ日本語を受け付けないのか

いろいろ調べてみるとロケールの設定によるもののようです。
この辺りは少し難しいのであまり理解できていませんが、そのうちちゃんと勉強したいところです。

* [docker の ubuntu イメージで日本語が入力できない件 \- しゅんログ](http://shunlog.hateblo.jp/entry/2016/04/13/114059)
* [Docker1\.11 / Ubuntu14\.04 でコンテナの bash から日本語入力できない時 \- Qiita](http://qiita.com/narupo/items/ebee3018fb302365c053)
* [Docker＋Ubuntuで日本語入力できないのを解決した - nocorica](http://blog.nocorica.jp/2017/01/docker-ubuntu-japanese-input/)
* [Docker: Bash で日本語入力を扱う \- Sarabande\.jp](http://blog.sarabande.jp/post/129574578518)

だいたいは言語のパッケージを入れて、ロケールを設定すればいけるという説明なのですが、
Debianだと少し勝手が違ったり、そもそもそれでは直らなかったりします。

### Language Pack

Ubuntuだとこのような形で、言語パックが導入できるようです。

``` sh
apt-get install language-pack-ja-base language-pack-ja
```

これがDebianだとこうなります。

``` sh
apt-get install task-japanese
```

まあ**これが原因ではなかった**のですが、UbuntuとDebianでこのような些細な違いがあったりするのだなと。

## 日本語を打てるようにする

散々探し回ったのに、この記事で完璧に説明されていました・・・。

> たぶんLANG設定をすればうまくいきます
>
> FROM ruby:2.2.3
> ENV LANG C.UTF-8
>
> [Docker Compose でローカルの Rails 開発環境を作る \- Qiita](http://qiita.com/kbaba1001/items/39f81156589dd9a0d678#comment-6ed4ff57c5a4263b36a8)

うまくいきました。

## 結局のところロケールってどう使われているのか

OSの動作をどういう言語で行うかを設定するものなのだろう、くらいの認識です。

> Linux では Locale を使ってユーザーがどの言語を使うか定義します。また、locale は使われる文字セットも定義するので、あなたの使っている言語が非 ASCII 文字を含んでいる場合、正しい locale を設定することは特に重要になります。
>
> [ロケール \- ArchWiki](https://wiki.archlinuxjp.org/index.php/%E3%83%AD%E3%82%B1%E3%83%BC%E3%83%AB)

では`locale`コマンドで表示される変数はどういう意味を持っているのかというと、

``` sh
LANG="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_CTYPE="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_ALL="en_US.UTF-8"
```

このような意味があるようです。

|環境変数|意味|
|:----|:----|
|LC_CTYPE|文字の分類および大文字/小文字の変換。|
|LC_NUMERIC|小数区切り文字 (または基数文字)、千の区切り文字、およびグループ化を指定します。|
|LC_TIME|月の名前、曜日、一般的な完全表示や短縮表示など、日付や時刻の書式を指定します。|
|LC_MONETARY|ロケールの通貨記号、千の区切り文字、符号の位置、小数点以下の桁数など、通貨の書式を指定します。|
|LC_COLLATE|ロケールの照合順序および正規表現の定義を指定します。|
|LC_MESSAGES|ロケールのローカライズメッセージの記述言語、および肯定と否定の応答 (yes と no の文字列と表現) を指定します。|

[ロケール（locale）まとめ \- Qiita](http://qiita.com/aosho235/items/58e2e7acd5c2ee3641ff#%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%81%AE%E6%84%8F%E5%91%B3%E3%81%A8%E5%84%AA%E5%85%88%E9%A0%86%E4%BD%8D)

### 利用可能なロケールを確認 / 追加する

言語によっては最初から利用可能だったり、そうでなかったりするようです。
利用可能なロケールは`locale -a`で確認できます。

``` sh
$ locale -a
af_ZA
af_ZA.ISO8859-1
af_ZA.ISO8859-15
af_ZA.UTF-8
am_ET
am_ET.UTF-8
be_BY
be_BY.CP1131
be_BY.CP1251
be_BY.ISO8859-5
 :
 :
```

Debian系の場合は、`/etc/locale.gen`に書いてあるロケールのコメントアウトを解除して`locale-gen`コマンドを実行することで有効にできるとのことです。

## 参考にさせていただきました

* [Docker Compose でローカルの Rails 開発環境を作る \- Qiita](http://qiita.com/kbaba1001/items/39f81156589dd9a0d678#comment-6ed4ff57c5a4263b36a8)
* [Docker / rails console で日本語入力できない問題 · GitHub](https://gist.github.com/tasiyo7333/2163a09129ed36639645145a0146d8d3)
* [ロケール（locale）まとめ \- Qiita](http://qiita.com/aosho235/items/58e2e7acd5c2ee3641ff#%E7%92%B0%E5%A2%83%E5%A4%89%E6%95%B0%E3%81%AE%E6%84%8F%E5%91%B3%E3%81%A8%E5%84%AA%E5%85%88%E9%A0%86%E4%BD%8D)
* [ロケール \- ArchWiki](https://wiki.archlinuxjp.org/index.php/%E3%83%AD%E3%82%B1%E3%83%BC%E3%83%AB)
