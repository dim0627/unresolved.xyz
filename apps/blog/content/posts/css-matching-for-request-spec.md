---
title: "request specでもcssでマッチさせたい"
date: "2019-05-28T00:00+09:00"
tags:
  - "Ruby"
  - "RSpec"
---

例えばcanonicalやmetaタグにちゃんとした値が出てることもテストしたいとか。

system/feature specを使えば簡単だけどrequest specのほうがパフォーマンスいいし・・・。

## Capybara.stringのhas_css?メソッドを使う

``` ruby
expect(Capybara.string(response.body)).to be_has_css '.your-awesome-class'
```

## metaタグ、head内要素など見えないタグの場合

``` ruby
expect(Capybara.string(response.body)).to be_has_css '[content="noindex"]', visible: false
```

## 参考にさせていただきました

[Capybaraでドキュメント・メタデータが出力されていることを確認したい \| feedforce Engineers' blog](http://tech.feedforce.jp/capybara-rails_with_metadata.html)
