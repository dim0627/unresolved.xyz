---
title: "Chakra UIのuseBreakpointValueでProps全体を柔軟に扱う"
date: "2021-10-16T00:00+09:00"
tags:
  - "TIL"
  - "React"
  - "Chakra UI"
---

chakraのサンプルにある

```js
const variant = useBreakpointValue({ base: "outline", md: "solid" })
```

だと柔軟性が伝わらないんだけど、結局の所ブレークポイント単位に特定の定義した値を返すことができるので、こんな感じでPropsをごそっと定義することもできて便利

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

無茶なレスポンシブ対応をしたいときとか（しないほうがいいけど）に活躍したりする

- [useBreakpointValue - Chakra UI](https://chakra-ui.com/docs/hooks/use-breakpoint-value)
