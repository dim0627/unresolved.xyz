---
title: "NativeBaseのFabがBottomTab(React Navigation)にかぶってしまう問題の解決方法"
date: "2022-03-24T00:00+09:00"
tags:
  - "React Native"
  - "TIL"
---

BottomTabのheightは `useBottomTabBarHeight` で取得できるので、このような形で回避できます。

``` tsx
import { Box, Fab, Icon, Text } from 'native-base';
import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export function XxxScreen() {
  const bottomTabBarHeight = useBottomTabBarHeight()

  return (
    <Box>
      <Fab
        colorScheme='green'
        size="sm"
        bottom={bottomTabBarHeight + 20}
        icon={<Icon name="plus" as={Entypo} size={6} />}
      />
    </Box>
  );
}

export default XxxScreen;
```
