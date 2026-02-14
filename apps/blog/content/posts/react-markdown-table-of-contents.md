---
title: "react-markdownで目次（Table of Contents）を表示させる"
date: "2021-12-28T00:00+09:00"
tags:
  - "React"
---

なんかHackyなことしなきゃいけないのかなと思ったけど、ちゃんとremark/rehypeのプラグインを渡せるようになってた。

## HタグにIDを追加する

これを使うだけ。

- [rehypejs/rehype-slug: plugin to add `id` attributes to headings](https://github.com/rehypejs/rehype-slug)

``` ts
rehypePlugins={[slug]}
```

## 目次を表示させる

- [https://github.com/remarkjs/react-markdown/blob/8e07e9c3ed740977d6922a6d58e5113f1c09a0c2/test/test.jsx#L1175](https://github.com/remarkjs/react-markdown/blob/8e07e9c3ed740977d6922a6d58e5113f1c09a0c2/test/test.jsx#L1175)

上記を参考に `remarkPlugins` を設定して、本文に以下のように `Table of contents` という見出しを設定すればそこに目次が配置される。

```markdown
## Table of contents
```

## Pluginに引数を渡したい

- [https://github.com/remarkjs/react-markdown#use-a-plugin-with-options](https://github.com/remarkjs/react-markdown#use-a-plugin-with-options)

これでいける

``` ts
remarkPlugins={[[toc, { tight: true }]]}
```

型があるとライブラリの仕様を追いやすくていいなあ・・・！
