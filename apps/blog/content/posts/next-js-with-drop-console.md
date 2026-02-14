---
title: "Next.jsでもdrop_consoleしたい"
date: "2023-06-23T00:00+09:00"
tags:
  - "Next.js"
  - "TIL"
---

webpackでいう `drop_console` をNext.jsでもやりたい

next.config.jsにこう

``` ts
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};
```
