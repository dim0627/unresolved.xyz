---
title: "Jest実行時にReferenceError: fetch is not defined"
date: "2020-07-05T00:00+09:00"
tags:
  - "TIL"
  - "Jest"
  - "JavaScript"
---

しらんかった〜。

> fetch is not available in Node, which is where Jest is running your tests. Is it an experimental browser technology.
>
> You will need to polyfill the behaviour if you want to make actual http calls, or mock fetch to simulate network requests.
>
> <https://github.com/facebook/jest/issues/2071#issuecomment-259709487>

`yarn add -D whatwg-fetch` して

`jest.setup.js` に

```javascript
const fetchPolifill = require('whatwg-fetch')

global.fetch = fetchPolifill.fetch
global.Request = fetchPolifill.Request
global.Headers = fetchPolifill.Headers
global.Response = fetchPolifill.Response
```

- [`fetch` undefined when running tests with jest](https://github.com/facebook/react-native/issues/11537)
