---
title: "class-validatorで特定の場合のみValidationしないようにしたい"
date: "2023-09-09T00:00+09:00"
tags:
  - "TypeScript"
  - "TIL"
---

例えば `IsDateString` を使いたいけど空文字やnullを許容したい場合とか。

こんな感じで `ValidateIf` で制御できるっぽい。

``` ts
  @ApiProperty({ format: 'date-time', nullable: true })
  @IsDateString()
  @IsOptional()
  @ValidateIf((_, value) => !!value)
  dateFrom?: string;
```

- <https://github.com/typestack/class-validator#conditional-validation>
