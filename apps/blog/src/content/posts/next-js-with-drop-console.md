---
title: "Next.jsでもdrop_consoleしたい場合の設定方法"
date: "2023-06-23T00:00+09:00"
tags:
  - "Next.js"
  - "TIL"
---

webpackでいう `drop_console` をNext.jsでもやりたい場合です。

next.config.jsにこのように設定します。

``` ts
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};
```
