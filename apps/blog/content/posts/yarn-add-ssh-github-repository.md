---
title: "GitHubのレポジトリをsshでyarn addする"
date: "2018-09-27T00:00+09:00"
tags:
  - "TIL"
---

これ詰まったのでメモ。

```bash
yarn add git+ssh://git@github.com/[username]/[repository].git
```

`package.json`の`main`にCSSを指定できるのはじめて知った。
