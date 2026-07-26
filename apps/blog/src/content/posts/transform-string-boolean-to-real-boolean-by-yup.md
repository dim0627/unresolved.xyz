---
title: "Yupで文字列のBool値をBoolean型に変換する方法"
date: "2023-09-19T00:00+09:00"
tags:
  - "TIL"
  - "TypeScript"
---

こんな簡単なことに15分くらい詰まりました。

``` ts
yup.boolean().transform((_, value) => value === "true")
```
