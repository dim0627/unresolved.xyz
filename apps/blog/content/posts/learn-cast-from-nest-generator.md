---
title: "JSの文字列 -> 整数変換はNestJSのgeneratorから学びました"
date: "2021-10-18T00:00+09:00"
tags:
  - "JavaScript"
  - "NestJS"
  - "TIL"
---

Nest.jsの `nest g res xxx` をするとこのようなコントローラが生まれるのですが、この `+id` は何だろうと思っていたら、どうやらHTTPパラメタで渡ってきた文字列のIDを整数にするためにやっているようでした。

```js
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatXxxDto: UpdateXxxDto,
  ) {
    return this.xxxService.update(+id, updatexxxDto);
  }
```

一昔前に `"1" | 0` とするのが一番パフォーマンスが良いと教えてもらったことがありますが、今はこういうやり方があるのだなという学びでした。
