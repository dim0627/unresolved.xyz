---
title: "NestJSで@Injectable({ scope: Scope.REQUEST })にするとテストが落ちる"
date: "2023-06-17T00:00+09:00"
tags:
  - "NestJS"
  - "TIL"
---

リクエストごとにスコープを切って欲しいサービスクラスを作ろうとしたらテストが以下エラーで落ちるようになった。

``` sh
XxxService is marked as a scoped provider. Request and transient-scoped providers can't be used in combination with "get()" method. Please, use "resolve()" instead.
```

とりあえず言うことを聞いて

``` ts
// before
service = module.get<LineWorksApiService>(LineWorksApiService);

// after
service = await module.resolve<LineWorksApiService>(LineWorksApiService);
```

みたいに直したら通った
