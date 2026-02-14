---
title: "Yupで文字列のBool値をBoolean型に変換する"
date: "2023-09-19T00:00+09:00"
tags:
  - "TIL"
  - "TypeScript"
---

こんな簡単なことに15分くらい詰まった

``` ts
yup.boolean().transform((_, value) => value === "true")
```
