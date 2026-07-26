---
title: "rmagickで画像を一括リサイズする方法"
date: "2020-05-18T00:00+09:00"
tags:
  - "Ruby"
---

前回に続いてローカルの作業自動化で何回か使ったので、見失わないようにメモしておきます。

``` ruby
Dir.glob('app/javascript/images/flags/improved/*.png').each do |file|
  img = Magick::Image.read(file)[0]
  thumbnail = img.resize_to_fill(512, 330)
  thumbnail.write(file)
end
```

記事にしなくてもTILで十分ですね。

## 参考にさせていただきました

- <https://rmagick.github.io/resize_to_fill.rb.html>
