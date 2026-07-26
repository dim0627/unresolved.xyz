---
title: "ポートフォリオをちょっとメンテしました"
date: "2018-07-29T00:00+09:00"
tags:
  - "Diary"
---

ずっと放置していたポートフォリオをメンテしました。

[Portfolio \- Daisuke Tsuji](https://yet.unresolved.xyz/)

## 依存性を整理しました

[prop\-types](https://www.npmjs.com/package/prop-types)などを勉強がてら入れていましたが、ただのペライチには不釣合いだったので削除しました。

加えて[styled\-components](https://www.styled-components.com/)に移行したりもしました。

ついでに以下の対応もやりました。

[CircleCIでyarn upgradeとかbundle updateをやってプルリクを作ってもらう \- unresolved](https://blog.unresolved.xyz/continuous-dependency-update/)

## 構造のリファクタ

無駄にコンポーネント化されていたりしたので、フラットな感じに変えました。

ちょっとメンテせずに戻ってきたときにとてもわかりづらかったので、おそらく良い構造ではなかったのだと思います。

## 404対応

ポートフォリオはGitHubのWebHookで[Netlify](https://www.netlify.com/)にデプロイされるようになっているのですが、create-react-appで作ったものをそのまま載せると、どんなURLでも200になってしまいます。

そのため、リダイレクトの設定をこのようにしました。

`public/_redirects`

```text
/ /index.html 200
/* /index.html 404
```

雑ですね。

## 内容の更新

個人プロジェクトやフリーになってからの経歴が載せられていなかったので追加しました。

あとは無駄な情報を削ったり、もろもろ整理しました。
