---
title: "stylelintでセレクタ名にキャメルケースを強要する方法"
date: "2020-06-07T00:00+09:00"
tags:
  - "TIL"
  - "CSS"
---

Reactを書くときはクラス名もローワーキャメルケースがいいなと思ってLintを設定しようとしたら色々手間取ったのでメモしておきます。

stylelintのセレクタ命名は `selector-class-pattern` で設定できます。

公式にも汎用的な正規表現の定義が載っているので、それを参考にすればOKです。

- <https://stylelint.io/user-guide/rules/regex>

```yml
rules:
  selector-class-pattern: "^[a-z][a-zA-Z0-9]+$"
```
