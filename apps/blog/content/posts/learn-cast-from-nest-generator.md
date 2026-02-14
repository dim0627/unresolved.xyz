---
title: "JSの文字列 -> 整数変換はNestJSのgeneratorから学んだ"
date: "2021-10-18T00:00+09:00"
tags:
  - "JavaScript"
  - "NestJS"
  - "TIL"
---

Nest.jsの `nest g res xxx` をするとこんなコントローラが生まれるんだけど、この `+id` なに・・・？って思ってたらどうやらHTTPパラメタで渡ってきた文字列のIDを整数にするためにやってるぽかった。

```js
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatXxxDto: UpdateXxxDto,
  ) {
    return this.xxxService.update(+id, updatexxxDto);
  }
```

一昔前に `"1" | 0` ってやるのが一番パフォーマンスが良いと教えてもらったことがあるけど、今はこういうやり方があるんだなあという学び。
