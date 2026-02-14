---
title: "rmagickで画像合成をするときにradiusをかける"
date: "2020-05-15T00:00+09:00"
tags: []
---

最近やけに画像合成をサーバサイドでやることがあるんだけど、角丸の画像合成ってできるのかなって気になったので調べた & できたのでメモしときたい。

## rmagickを用いた角丸画像合成の実装

もう完全に動かしたコードのコピペだけどこんな感じ。ビジネス的な命名されてたところは雑に直したので動かなくなってるかもしれない。

``` ruby
class OgpGenerator < OgpGenerator::Base
  include Magick

  COMPOSIT_WIDTH = 300
  COMPOSIT_HEIGHT = 200

  def initialize(file_object:)
    @file_object = file_object
  end

  def exec!
    img = Magick::ImageList.new(Rails.root.join("app/javascript/images/og_image_background/v3.jpg"))
    composit_image = Magick::ImageList.new("app/javascript/images/composit.png")
    composit_image = rounded(flag_image, "#{COMPOSIT_WIDTH}x#{COMPOSIT_HEIGHT}>", 22)
    img.write(@file_object.path)
    img.destroy!

    true
  end

  private

  def rounded(source_image, geometry_string, radius = 10)
    source_image.change_geometry(geometry_string) do |cols, rows, img|
      # Make a resized copy of the image
      thumb = img.resize(cols, rows)

      # Set a transparent background: pixels that are transparent will be
      # discarded from the source image.
      mask = Image.new(cols, rows) { self.background_color = 'transparent' }

      # Create a white rectangle with rounded corners. This will become the
      # mask for the area you want to retain in the original image.
      Draw.new.stroke('none').stroke_width(0).fill('white')
        .roundrectangle(0, 0, cols, rows, radius, radius)
        .draw(mask)

      # Apply the mask and write it out
      thumb.composite!(mask, 0, 0, Magick::CopyAlphaCompositeOp)
      thumb
    end
  end
end
```

`rounded` メソッドに対象の画像とサイズ、角丸の大きさを渡して上から角丸になるように生成した画像を重ね合わせて合成した画像インスタンスを返してる。

新しい画像インスタンスを作ってるので元のインスタンスは変わらないことに注意（なので代入してる）。

ほとんど後述するSOFのコードのコピペです。

## 参考にさせてもらいました

- <http://www.imagemagick.org/Usage/thumbnails/#rounded>
- <https://stackoverflow.com/questions/2716457/rmagick-rounded-corners>
