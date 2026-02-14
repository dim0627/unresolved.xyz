---
title: "webpacker3系の依存してるwebpack-dev-server2系がCVE-2018-14732脆弱性に引っかかるのでwebpacker4.0.0.rc.2を使うようにした"
date: "2019-01-05T00:00+09:00"
tags:
  - "TIL"
  - "Ruby on Rails"
---

GitHubのSecurity AlertをOnにしていたら以下の様なAlertがあがってきた。

> CVE-2018-14732 More information
> low severity
> Vulnerable versions: < 3.1.11
> Patched version: 3.1.11
> An issue was discovered in lib/Server.js in webpack-dev-server before 3.1.11. Attackers are able to steal developer's code because the origin of requests is not checked by the WebSocket server, which is used for HMR (Hot Module Replacement). Anyone can receive the HMR message sent by the WebSocket server via a ws://127.0.0.1:8080/ connection from any origin.
>
> <https://nvd.nist.gov/vuln/detail/CVE-2018-14732>

webpacker3系はwebpack3系のラッパーで、webpack3系はwebpack-dev-server2系に依存している。で、webpack-dev-server2系に関する脆弱性らしい。

気持ち的にはさっさとwebpack4系にしたかったので、webpacker4系の安定版を待たずにRCの4系を使ってみようと思う。

CHANGELOGはここ。

<https://github.com/rails/webpacker/blob/master/CHANGELOG.md>

## Upgrade to webpacker v4.0.0.rc.2

とりあえずサクッとバージョンだけあげよう。

Gemfile

``` diff
- gem 'webpacker'
+ gem 'webpacker', '>= 4.0.0.rc.2'
```

package.json

``` diff
-     "@rails/webpacker": "^3.5.5",
+     "@rails/webpacker": "https://github.com/rails/webpacker",
```

## Reinstall binstubs

binnstubが変わってるぽいので最新のもので再生成。

```bash
bin/rails webpacker:binstubs
```

## Regenerate configuration files

あとで書くけど、babelやpostcssの設定ファイルのフォーマットが変わってるのでこちらも再生成。

```bash
bin/rails webpacker:install
```

## breakingなchanges（気になったやつだけ）

今使ってる3.5系からの差分をCHANGELOG見ながら読んだけどこんなもん？

### postcss-next is replaced with postcss-preset-env

さよなら・・・。`@apply`が仕様から落ちたのは本当に痛い。ので僕は一旦、postcss-nextを使い続けるようにした。

そのうち外す。

### Separate CSS extraction from build environment

エントリポイントであるJSから呼んだCSSをファイル展開せず、分割されたままheadに動的に埋め込むようにした？

<https://github.com/rails/webpacker/pull/1625>

webpacker.ymlに以下の記載をすることで設定ができるぽい。

```yaml
  extract_css: true
```

trueにすればこれまでと同じ挙動をする模様？

### .babelrcと.postcssrcのフォーマットがJSに

babel.config.jsとpostcss.config.jsになった。

<https://github.com/rails/webpacker/pull/1822/files>

## 余談

webpacker4系になれば少しは薄いラッパーになるのかなあと思ってたけどそうでもないらしい。

webpackを自分で入れる運用にするべきか迷ってたけど、その気持ちが強くなった。
