---
title: "例によってポートフォリオをリニューアルした"
date: "2020-07-28T00:00+09:00"
tags:
  - "TIL"
  - "poem"
---

[Daisuke Tsuji's portfolio](https://yet.unresolved.xyz/)

もともとcreate-react-appで作ったものを1年ぐらい前にNext.jsに置き換えたんだけど、その後メンテしてなかったしコンテンツ管理もコードベタ書きで辛かったので一気に置き換えた。

6時間ぐらいかかった。

## 技術スタック

- [Next.js](https://nextjs.org/)
- [GraphCMS](https://graphcms.com/)

リニューアル前はJS上にJSONでコンテンツを持ってたんだけど、流石にメンテしづらいしGraphCMS使ってみたかったし、最近作った自分用サービスもあったからコンテンツ追加したいし、ということが重なったのでいいタイミングになった。

## GraphCMSがめちゃよかった

Headless CMSは個人的に気に入ってるソリューションなんだけど、今は群雄割拠の時代すぎてどれを選ぶかがめっちゃ困る状態になってる。

<https://headlesscms.org/>

同時にGraphQLは個人的にめちゃ気に入ってて、さらに深入りしていきたい気持ちもあったのでそこに特化しているGraphCMSを選んだ。

あと気になってたのはこの辺

- <https://www.sanity.io/>
- <https://strapi.io/>

GraphCMS、使ってみた感想としてはめちゃシンプルでいい！

ただのHTTPベースのAPIで認証もbearer tokenなので、Contentfulみたいにライブラリが使いづらいとかもないし、ブログもGraphCMSにしとけばよかったって気持ち。
