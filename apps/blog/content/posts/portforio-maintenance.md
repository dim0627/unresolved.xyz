---
title: "ポートフォリオをちょっとメンテした"
date: "2018-07-29T00:00+09:00"
tags:
  - "Diary"
---

ずっと放置してたポートフォリオをメンテした。

[Portfolio \- Daisuke Tsuji](https://yet.unresolved.xyz/)

## 依存性を整理した

[prop\-types](https://www.npmjs.com/package/prop-types)とか勉強がてら入れてたけど、ただのペライチに不釣合いだったので削除した。

加えて[styled\-components](https://www.styled-components.com/)に移行したりした。

ついでに以下の対応もやった。

[CircleCIでyarn upgradeとかbundle updateをやってプルリクを作ってもらう \- unresolved](https://blog.unresolved.xyz/continuous-dependency-update/)

## 構造のリファクタ

無駄にコンポーネント化されてたりしたのでフラットな感じに変えた。

ちょっとメンテせずに戻ってきたときにめちゃわかりづらかったので、たぶん良い構造ではなかったんだと思う。

## 404対応

ポートフォリオはGitHubのWebHookで[Netlify](https://www.netlify.com/)にデプロイされるようになるんだけど、create-react-appで作ったやつをそのままのせると、どんなURLでも200になってしまう。

ので、リダイレクトの設定をこうした。

`public/_redirects`

```text
/ /index.html 200
/* /index.html 404
```

雑。

## 内容の更新

個人プロジェクトとかフリーになってからの経歴がのせられてなかったので追加した。

あと無駄な情報を削ったりもろもろ。
