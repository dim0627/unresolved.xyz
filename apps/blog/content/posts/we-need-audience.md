---
title: "nextjs-auth0のgetAccessTokenでOpaque TokenじゃなくてJWTがほしいならAUTH0_AUDIENCEを設定しないといけない"
date: "2021-11-01T00:00+09:00"
tags:
  - "TIL"
  - "Auth0"
  - "Next.js"
---

これほんと数週間詰まって死ぬかと思った

`AUTH0_AUDIENCE` を設定しなくても認証は疎通しちゃうんだけど、この設定の有無で返ってくるトークンがどっちか切り替わるみたい。

- [Why is my access token not a JWT? (Opaque Token) - Auth0 Community](https://community.auth0.com/t/why-is-my-access-token-not-a-jwt-opaque-token/31028)

認証周りむずすぎてつらい。
