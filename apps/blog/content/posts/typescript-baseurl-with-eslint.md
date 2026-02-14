---
title: "tsconfigのbaseUrlとeslintを共存させる方法"
date: "2020-08-10T00:00+09:00"
tags:
  - "TypeScript"
  - "TIL"
---

tsconfigにbaseUrlを設定しているとeslintがコケることがあります。

1回設定したら終わりだしメモしなくていいだろうと思っていましたが、5回くらいググっているのでこちらにメモしておきます。

```text
error  Unable to resolve path to module '#/foo'  import/no-unresolved
```

## eslint-import-resolver-typescriptの導入とresolverの設定をする

要はimport記法でtsファイルを解決できていないようです。

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

としたら消えます。

## refs

- [[import/no-unresolved] when using with typescript "baseUrl" and "paths" option #1485](https://github.com/benmosher/eslint-plugin-import/issues/1485)
