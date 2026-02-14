---
title: "TypeScriptのmapped typeまじで記法わからん"
date: "2021-10-25T00:00+09:00"
tags:
  - "TypeScript"
  - "TIL"
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

脳みその記憶容量が足りなくて辛い
