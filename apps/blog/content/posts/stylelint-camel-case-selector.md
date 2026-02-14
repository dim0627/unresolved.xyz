---
title: "stylelintでセレクタ名にキャメルケースを強要する"
date: "2020-06-07T00:00+09:00"
tags:
  - "TIL"
  - "CSS"
---

React書くときはクラス名もローワーキャメルケースがいいなと思ってLintを設定しようとしたら色々手間取ったのでメモ。

stylelintのセレクタ命名は `selector-class-pattern` で設定できる。

公式にも汎用的な正規表現の定義が載ってるのでそれをパクってくればOK。

- <https://stylelint.io/user-guide/rules/regex>

```yml
rules:
  selector-class-pattern: "^[a-z][a-zA-Z0-9]+$"
```
