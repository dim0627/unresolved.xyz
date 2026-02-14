---
title: "tsconfigのbaseUrlとeslintを共存させる"
date: "2020-08-10T00:00+09:00"
tags:
  - "TypeScript"
  - "TIL"
---

tsconfigにbaseUrlを設定しているとeslintがコケることがある。

1回設定したら終わりだしメモらなくていいでしょ〜って思ってたけど5回ぐらいググってるのでこっちにメモっとく。

```text
error  Unable to resolve path to module '#/foo'  import/no-unresolved
```

## eslint-import-resolver-typescriptの導入とresolverの設定をする

ようはimport記法でtsファイルを解決できてないらしい。

```bash
yarn add -D eslint-import-resolver-typescript
```

して、

``` json
{
  // other configuration are omitted for brevity
  settings: {
    "import/resolver": {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    },
  },
}
```

したら消えます。

## refs

- [[import/no-unresolved] when using with typescript "baseUrl" and "paths" option #1485](https://github.com/benmosher/eslint-plugin-import/issues/1485)
