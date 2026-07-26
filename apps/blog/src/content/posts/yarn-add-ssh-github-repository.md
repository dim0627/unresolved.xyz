---
title: "GitHubのレポジトリをsshでyarn addする方法"
date: "2018-09-27T00:00+09:00"
tags:
  - "TIL"
---

これは詰まったのでメモしておきます。

```bash
yarn add git+ssh://git@github.com/[username]/[repository].git
```

`package.json`の`main`にCSSを指定できるのは初めて知りました。
