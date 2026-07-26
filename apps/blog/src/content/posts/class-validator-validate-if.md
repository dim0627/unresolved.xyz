---
title: "class-validatorで特定の場合のみValidationしないようにする方法"
date: "2023-09-09T00:00+09:00"
tags:
  - "TypeScript"
  - "TIL"
---

例えば `IsDateString` を使いたいけれど空文字やnullを許容したい場合などです。

以下のように `ValidateIf` で制御できるようです。

``` ts
  @ApiProperty({ format: 'date-time', nullable: true })
  @IsDateString()
  @IsOptional()
  @ValidateIf((_, value) => !!value)
  dateFrom?: string;
```

- <https://github.com/typestack/class-validator#conditional-validation>
