---
title: "MissingAPIError: indexedDB API missing"
date: "2020-06-13T00:00+09:00"
tags:
  - "Jest"
  - "JavaScript"
---

初めてIndexedDBを使ったんだけど、Jestが落ちるようになっちゃって直したのでメモ。

```text
MissingAPIError: indexedDB API missing
```

議論はここでされてて、

- [Puppeteer, Jest, Unhandled rejection: MissingAPIError: indexedDB API not found](https://github.com/dfahlander/Dexie.js/issues/790)

これを使えば解決できる。

- [dumbmatter / fakeIndexedDB](https://github.com/dumbmatter/fakeIndexedDB)

jest.setup.jsとかに

```javascript
import 'fake-indexeddb/auto';
```

を入れるだけ。
