---
title: "nextjs-auth0のgetAccessTokenでOpaque TokenではなくJWTがほしい場合はAUTH0_AUDIENCEを設定しないといけない"
date: "2021-11-01T00:00+09:00"
tags:
  - "TIL"
  - "Auth0"
  - "Next.js"
---

これは本当に数週間詰まって大変でした。

`AUTH0_AUDIENCE` を設定しなくても認証は疎通してしまうのですが、この設定の有無で返ってくるトークンがどちらになるか切り替わるようです。

- [Why is my access token not a JWT? (Opaque Token) - Auth0 Community](https://community.auth0.com/t/why-is-my-access-token-not-a-jwt-opaque-token/31028)

認証周りは難しすぎて辛いです。
