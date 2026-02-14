---
title: "例によってポートフォリオをリニューアルしました"
date: "2020-07-28T00:00+09:00"
tags:
  - "TIL"
  - "poem"
---

[Daisuke Tsuji's portfolio](https://yet.unresolved.xyz/)

もともとcreate-react-appで作ったものを1年ぐらい前にNext.jsに置き換えたのですが、その後メンテしていなかったですし、コンテンツ管理もコードベタ書きでつらかったので一気に置き換えました。

6時間ぐらいかかりました。

## 技術スタック

- [Next.js](https://nextjs.org/)
- [GraphCMS](https://graphcms.com/)

リニューアル前はJS上にJSONでコンテンツを持っていたのですが、さすがにメンテしづらいですしGraphCMS使ってみたかったですし、最近作った自分用サービスもあったからコンテンツ追加したいし、ということが重なったのでいいタイミングになりました。

## GraphCMSがとてもよかったです

Headless CMSは個人的に気に入っているソリューションなのですが、今は群雄割拠の時代すぎてどれを選ぶかがとても困る状態になっています。

<https://headlesscms.org/>

同時にGraphQLは個人的にとても気に入っていて、さらに深入りしていきたい気持ちもあったのでそこに特化しているGraphCMSを選びました。

あと気になっていたのはこの辺りです。

- <https://www.sanity.io/>
- <https://strapi.io/>

GraphCMS、使ってみた感想としてはとてもシンプルでいいです！

ただのHTTPベースのAPIで認証もbearer tokenなので、Contentfulみたいにライブラリが使いづらいということもないですし、ブログもGraphCMSにしておけばよかったという気持ちです。
