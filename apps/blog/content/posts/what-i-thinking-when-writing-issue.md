---
title: "Issueを書くときに考えていること"
date: "2022-03-26T00:00+09:00"
tags:
  - "poem"
---

最近Issueがわかりづらいなあと思うことが多くて、以下のTweetに感化されて自分が普段Issueを書くときに考えていることをまとめてみたいなと思った

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">技術力の向上に、issueをちゃんと書けるになる訓練をするのが良いのではと思った - Magnolia Tech <a href="https://t.co/6ckr2Mwf8j">https://t.co/6ckr2Mwf8j</a></p>&mdash; magnoliak🍧 (@magnolia_k_) <a href="https://twitter.com/magnolia_k_/status/1507336857666809857?ref_src=twsrc%5Etfw">March 25, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">最近考えてたことだ<br>直接的に伝える文章より、間接的に誰かが見る文章のほうが親しみがないのでうまく出来ない人が多い印象 <a href="https://t.co/POiwwL4w9o">https://t.co/POiwwL4w9o</a></p>&mdash; Daisuke Tsuji🍿 (@dim0627) <a href="https://twitter.com/dim0627/status/1507571491453681676?ref_src=twsrc%5Etfw">March 26, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

ここでいうIssueはOSSのものではなくて、仕事でプロダクト開発をするという体のものを指してます

## タイトルにはWhoとWhat、可能ならWhereを入れる

「CSVエクスポートできるようにする」みたいなタイトルではなく「ユーザーは注文一覧画面から注文をCSVエクスポートできる」のように「ActorはWhatができる」のようにストーリーベースで書くようにしてる

タイトルから「完了した状態」をわかるようにする、という言い方がわかりやすいかも

## 本文は長くしない、議論は入れない

個人的な経験上、本文は空っぽだったり議論がだらーっと書いてあったりすることが多かった

だけど、空っぽならまだしも議論が書いてあると結論がわからないしリーディングコストがかかるのでできれば避けたいと思ってる

そのIssueを完遂（タイトルの状態を満たす）するのに必要な情報かどうか？というのを考えているという表現が正しいかも

経緯はSlackであったり口頭の議事がドキュメンテーションツールにあると思うので、本文の末尾にリンクとしてはったりすることが多い

## 本文にWhyを入れる

本文はIssueを担当する人が背景を知ることで盲目的に作業するのではない = モチベーションを持ってもらうために、Whyを入れるようにしてる

例えばこんな感じ

```markdown
## Why

- 顧客のユースケースとしてCSVエクスポートの需要がユーザヒアリングによってわかったため
- ヒアリングのログ: https://example.com
```

## 本文にHowを入れる

WhyでそのIssueの目的がわかっても、じゃあ実際に何をどう作ればいいのか？というところが詰まっていないので、どういう実現をすればいいのかをHowとして記載する

```markdown
## How

- 注文一覧画面の上部右端に「CSVエクスポート」のボタンを配置
- 押下したらCSVがダウンロードされる
- UIのイメージ: https://www.figma.com/file/xxxxxxxxxxx
```

ここはタイトルと情報が重複することがあるけど、タイトルに情報が多いほうがIssue一覧から詳細に行かずにゴールが見えるメリットを優先してる

Howは難しいところで、例えば

- 一覧にペジネーションがある場合は表示されているものだけを出すのか？
- 処理が高負荷になる可能性がある場合はどう考慮するか？

など、起票者だけでは拾いきれない、決めきれないことがあったりするので、**あまり時間をかけて書ききらずに最低限を書いてスクラムチームでともに作り切る**のがいいのでは、というのが現段階の個人的な解という感じ

## 参考

- [技術力の向上に、issueをちゃんと書けるになる訓練をするのが良いのではと思った - Magnolia Tech](https://blog.magnolia.tech/entry/2021/03/02/193504)
