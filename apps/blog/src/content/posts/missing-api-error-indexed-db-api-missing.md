---
title: "MissingAPIError: indexedDB API missingの解決方法"
date: "2020-06-13T00:00+09:00"
tags:
  - "Jest"
  - "JavaScript"
---

初めてIndexedDBを使ったのですが、Jestが落ちるようになってしまったので直しました。メモしておきます。

```text
MissingAPIError: indexedDB API missing
```

議論はここでされています。

- [Puppeteer, Jest, Unhandled rejection: MissingAPIError: indexedDB API not found](https://github.com/dfahlander/Dexie.js/issues/790)

これを使えば解決できます。

- [dumbmatter / fakeIndexedDB](https://github.com/dumbmatter/fakeIndexedDB)

jest.setup.jsなどに

```javascript
import 'fake-indexeddb/auto';
```

を入れるだけです。
