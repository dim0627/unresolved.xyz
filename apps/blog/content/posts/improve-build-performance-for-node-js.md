---
title: "Node.js（NestJS）のビルドパフォーマンスを改善する"
date: "2025-06-16T00:00+09:00"
tags:
  - "TypeScript"
  - "NestJS"
---

NestJSで構築している担当プロダクトのビルドが地味に遅くなっているのは薄々気づいてたんだけど、ついにデプロイ時にOOM Killされる自体になったので本腰を上げて調べてみた。

## `tsc` でトランスパイルの効率を調べる

`tsc` はトランスパイルするだけでなく、解析をする機能もいくつかついていて、今回はそれにだいぶお世話になった。

- [extendedDiagnostics](https://www.typescriptlang.org/tsconfig/#extendedDiagnostics)
- [generateTrace](https://www.typescriptlang.org/tsconfig/#generateTrace)

### `extendedDiagnostics` による解析

まず1つ目の `extendedDiagnostics` はトランスパイルの内訳を時間や行数として出力してくれるもので、こんな感じの数字になった。

``` sh
❯ npx tsc -p tsconfig.build.json --extendedDiagnostics
Files:                         4775
Lines of Library:             41198
Lines of Definitions:       2211971
Lines of TypeScript:          82535
Lines of JavaScript:              0
Lines of JSON:                    0
Lines of Other:                   0
Identifiers:                2286631
Symbols:                    1440909
Types:                       148758
Instantiations:              692686
Memory used:               2035800K
Assignability cache size:     67932
Identity cache size:           2622
Subtype cache size:             490
Strict subtype cache size:    10926
I/O Read time:                0.28s
Parse time:                   2.31s
ResolveModule time:           0.39s
ResolveLibrary time:          0.01s
ResolveTypeReference time:    0.02s
Program time:                 3.38s
Bind time:                    1.65s
transformTime time:           0.02s
commentTime time:             0.00s
printTime time:               0.09s
Emit time:                    0.09s
Check time:                   2.44s
Source Map time:              0.00s
I/O Write time:               0.01s
Total time:                   7.56s
```

一般的な数値がわからなかったのでAIに食わせてみるとこういう見解。

| 指標 | 値 | コメント |
| --- | --- | --- |
| Memory used: | **約2GB（2035800K）** | 通常 Nest アプリの tsc では 400〜800MB 程度。明らかに高い。 |
| Lines of Definitions: | **2,212,971 行** | 明らかに外部ライブラリ or 型定義が大量。→ node_modules/@types や SDK類の影響が濃厚。 |
| Identifiers: | **2,286,631** | 通常数十万程度。TypeScript の型システムが相当な負荷に。 |
| Symbols: | **1,440,909** | 同上。依存型の解決コストが大きい。 |
| Types: | **148,758** | 高め。ジェネリクス + DTO/Entity の組み合わせが複雑かも。 |
| Instantiations: | **692,686** | 非常に多い。型推論が深く入り込んでいる可能性大。 |

確かにメモリ2GBは食い過ぎだよなというのと、型定義も異様に多いのが気になるところ。

ぱっと思いつくところが、依存している外部APIのOpenAPI定義からSDKを作って利用していたので、おそらくこいつがBarrelで対象の不要コードを読ませてしまっていたのでは、というもの。

SDKは [Hey API](https://heyapi.dev/) で作成していたので、依存していた6つのAPIそれぞれを利用しているパスのみSDKを生成するようにした結果がこちら。

``` sh
❯ npx tsc -p tsconfig.build.json --extendedDiagnostics
Files:                        3907
Lines of Library:            41836
Lines of Definitions:       623962
Lines of TypeScript:         61760
Lines of JavaScript:             0
Lines of JSON:                   0
Lines of Other:                  0
Identifiers:                815861
Symbols:                    664803
Types:                      131985
Instantiations:             591658
Memory used:               906866K
Assignability cache size:    68451
Identity cache size:          2845
Subtype cache size:            779
Strict subtype cache size:   10741
I/O Read time:               0.59s
Parse time:                  0.88s
ResolveModule time:          0.40s
ResolveLibrary time:         0.01s
ResolveTypeReference time:   0.02s
Program time:                2.13s
Bind time:                   0.61s
transformTime time:          0.21s
commentTime time:            0.00s
printTime time:              0.30s
Emit time:                   0.30s
Check time:                  2.24s
Source Map time:             0.00s
I/O Write time:              0.01s
Total time:                  5.27s
```

ざっと比べるとこんな感じ。
メモリは半分以下になって型定義は3分の1とかくらい？

``` sh
# Memory used:
Before 2,035,800K
After    906,866K

# Lines of Definitions:
Before  2,211,971
After     623,962

# Lines of TypeScript:
Before     82,535
After      61,760
```

### `generateTrace` による解析

`generateTrace` は `extendedDiagnostics` と同じように `tsc` のオプションで、これをつけるとトレース情報をファイルとして出力してくれる。

詳細は末尾に記載する記事に任せるけど、だいたいこんな感じの実行方法。

``` sh
npx tsc -p tsconfig.build.json --generateTrace ~/Desktop/trace --incremental false
```

出力されたファイルはChromeの chrome://tracing/ に食わせるとそれぞれのプロセスを可視化してくれる。

## Refs

- [TypeScript プロジェクトのコンパイル時間を改善してみた話](https://zenn.dev/forcia_tech/articles/20231017_tsuji)
