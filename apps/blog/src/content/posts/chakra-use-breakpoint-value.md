---
title: "Chakra UIのuseBreakpointValueでProps全体を柔軟に扱う方法"
date: "2021-10-16T00:00+09:00"
tags:
  - "TIL"
  - "React"
  - "Chakra UI"
---

Chakraのサンプルにある

```js
const variant = useBreakpointValue({ base: "outline", md: "solid" })
```

だと柔軟性が伝わらないのですが、結局のところブレークポイント単位に特定の定義した値を返すことができるので、このような形でPropsをまとめて定義することもできて便利です。

``` js
const Component: React.VFC = () => {
  const imageprops = useBreakpointValue({
    base: { src: "xxxx.sp.png", width: 380, height: 397 },
    md: { src: "xxxx.png", width: 710, height: 350 }
  })

  return <Box>
    <Image { ...imageprops } alt="any image" />
  </Box>
}

export default Component;
```

無理のあるレスポンシブ対応をしたいとき（しないほうが良いですが）に活躍したりします。

- [useBreakpointValue - Chakra UI](https://chakra-ui.com/docs/hooks/use-breakpoint-value)
