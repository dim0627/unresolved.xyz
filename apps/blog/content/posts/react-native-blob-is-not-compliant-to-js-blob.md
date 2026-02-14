---
title: "React NativeのBlobがJSのBlobに準拠していない問題について"
date: "2022-03-31T00:00+09:00"
tags:
  - "React Native"
  - "TIL"
---

[TypeError: Network request failed when fetching a file:// uri · Issue #2402 · expo/expo](https://github.com/expo/expo/issues/2402)

これはとてもエッジケースではないかという気がしますが、ファイルアップロードなどでBlobが必要になる場面は結構あり、気軽に踏み抜いてしまいました。

ワークアラウンドとしてはコメントに上がっている通りXHRを使ってBlobを取得すればなんとかなります。

``` js
const blob = await new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    resolve(xhr.response);
  };
  xhr.onerror = function() {
    reject(new TypeError('Network request failed'));
  };
  xhr.responseType = 'blob';
  xhr.open('GET', uri, true);
  xhr.send(null);
});
```

ちなみにCommunityでも議題に上がってはいますが、放置されています。

[Fix Blob Compatibility · Issue #109 · react-native-community/discussions-and-proposals](https://github.com/react-native-community/discussions-and-proposals/issues/109)
