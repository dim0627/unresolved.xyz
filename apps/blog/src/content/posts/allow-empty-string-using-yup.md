---
title: "yupでnumber型バリデーションで空文字を許容する方法"
date: "2021-12-14T00:00+09:00"
tags:
  - "TIL"
  - "JavaScript"
---

漏れがあるかもしれませんが、ひとまずこれで動きました。

``` ts
  weight: yup.number().positive().integer().nullable().transform((a) => isNaN(a) ? null : a),
```

- [yupでnumberだけどnullも許す感じでバリデーションしたいとき - 青いやつの進捗日記。](https://tech.motoki-watanabe.net/entry/2021/01/23/205510)
- [Number but allow empty string · Issue #298 · jquense/yup](https://github.com/jquense/yup/issues/298)
