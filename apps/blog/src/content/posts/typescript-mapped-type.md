---
title: "TypeScriptのmapped typeの記法が本当にわかりません"
date: "2021-10-25T00:00+09:00"
tags:
  - "TypeScript"
  - "TIL"
draft: true
---

- [Creating a mapped type | Learn TypeScript](https://learntypescript.dev/08/l2-mapped-type)

``` js
interface Props {
  title: string
  [x: string]: any
}

type MappedTypeName = {
  [K in keyof ExistingType1]: ExistingType2;
};
```

脳みその記憶容量が足りなくて辛いです。
