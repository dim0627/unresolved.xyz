---
title: "Nxに入門したので覚書します"
date: "2021-11-26T00:00+09:00"
tags:
  - "Nx"
---

[Nx: Smart, Extensible Build Framework](https://nx.dev/)

## 用語の整理

- ワークスペース
  - そのプロジェクト全体のこと
  - ワークスペースの中にAPIやWebなど複数のアプリケーションが配置されます
- アプリケーション
  - そのプロジェクトに必要なAPIやWebといった単位のソースコード群のこと

## 今回のゴール

- バックエンドAPIとフロントエンドをぞれぞれNest.js、Next.jsで軽く動くところまでやります
- generateコマンドでコンポーネントか何かを作ってみます

## ワークスペースを作る

とりあえずAPIから作ります、Nest.jsです。

``` sh
[21-12-03 8:34] ~/Desktop/nx $ npx create-nx-workspace
npx: installed 48 in 8.219s
✔ Workspace name (e.g., org name)     · myapp
✔ What to create in the new workspace · nest
✔ Application name                    · api
✔ Use Nx Cloud? (It's free and doesn't require registration.) · No
```

実行が終わるとこんな感じでワークスペース名のディレクトリができます。

``` sh
[21-12-03 8:37] ~/Desktop/nx (master) $ tree -L 2
.
└── myapp
    ├── README.md
    ├── apps
    ├── jest.config.js
    ├── jest.preset.js
    ├── libs
    ├── node_modules
    ├── nx.json
    ├── package-lock.json
    ├── package.json
    ├── tools
    ├── tsconfig.base.json
    └── workspace.json

5 directories, 8 files
```

この `apps` の中に見慣れたNest.jsのファイル群が配置されています。

``` sh
[21-12-03 8:38] ~/Desktop/nx/myapp/apps (main) $ tree -L 3
.
└── api
    ├── jest.config.js
    ├── project.json
    ├── src
    │   ├── app
    │   ├── assets
    │   ├── environments
    │   └── main.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    └── tsconfig.spec.json
```

### Next.jsのコード群を追加する

ドキュメントはここです。

[@nrwl/next:application - Nx](https://nx.dev/l/r/next/application)

`@nrwl/next` を使いたいので依存性に追加します。

``` sh
[21-12-03 8:49] ~/Desktop/nx/myapp (main) $ yarn add -D @nrwl/next
```

インストールできたらgenerateコマンドでアプリケーションを追加します、 `web` という命名にしておきます。

``` sh
[21-12-03 8:50] ~/Desktop/nx/myapp (main) $ npx nx g @nrwl/next:application web
✔ Which stylesheet format would you like to use? · css
```

`apps/web` に見慣れたものが追加されました！

```sh
[21-12-03 8:52] ~/Desktop/nx/myapp/apps (*main) $ tree -L 2
.
├── api
│   ├── jest.config.js
│   ├── project.json
│   ├── src
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   └── tsconfig.spec.json
├── web
│   ├── index.d.ts
│   ├── jest.config.js
│   ├── next-env.d.ts
│   ├── next.config.js
│   ├── pages
│   ├── project.json
│   ├── public
│   ├── specs
│   ├── tsconfig.json
│   └── tsconfig.spec.json
└── web-e2e
    ├── cypress.json
    ├── project.json
    ├── src
    └── tsconfig.json
```

e2eは何でしょうか？一旦置いておきます。

## とりあえず起動してみる

`npx nx serve [application]` で起動できる模様です、まずはAPIから。

``` sh
[21-12-03 8:54] ~/Desktop/nx/myapp (main) $ npx nx serve api

> nx run api:serve
chunk (runtime: main) main.js (main) 2.82 KiB [entry] [rendered]
webpack compiled successfully (c6c55bd9a9c7a0f8)
Debugger listening on ws://localhost:9229/2546e79e-3fd2-4432-9568-8a1a1e908488
Debugger listening on ws://localhost:9229/2546e79e-3fd2-4432-9568-8a1a1e908488
For help, see: https://nodejs.org/en/docs/inspector
Issues checking in progress...
[Nest] 33832  - 12/03/2021, 8:54:19 AM     LOG [NestFactory] Starting Nest application...
[Nest] 33832  - 12/03/2021, 8:54:19 AM     LOG [InstanceLoader] AppModule dependencies initialized +14ms
[Nest] 33832  - 12/03/2021, 8:54:19 AM     LOG [RoutesResolver] AppController {/api}: +5ms
[Nest] 33832  - 12/03/2021, 8:54:19 AM     LOG [RouterExplorer] Mapped {/api, GET} route +2ms
[Nest] 33832  - 12/03/2021, 8:54:19 AM     LOG [NestApplication] Nest application successfully started +2ms
[Nest] 33832  - 12/03/2021, 8:54:19 AM     LOG 🚀 Application is running on: http://localhost:3333/api
No issues found.
```

できてそうです。

``` sh
[21-12-03 8:55] ~/Desktop/nx/myapp (main) $ curl http://localhost:3333/api
{"message":"Welcome to api!"}
```

webも起動してみます。

``` sh
[21-12-03 8:55] ~/Desktop/nx/myapp (main) $ npx nx serve web

> nx run web:serve
We detected TypeScript in your project and reconfigured your tsconfig.json file for you. Strict-mode is set to false by default.

The following suggested values were added to your tsconfig.json. These values can be changed to fit your project's needs:

        - incremental was set to true

info  - automatically enabled Fast Refresh for 1 custom loader
event - compiled successfully (174 modules)
[ ready ] on http://localhost:4200
```

できましたが・・・見た目がいまいちです・・・

![Screen Shot 2021-12-03 at 8.56.40](/images/posts/hello-nx-1.png)

まあいいでしょう。

## コンポーネントをgenerateしてみる

ドキュメントはここです、Next.js用のコンポーネントジェネレーターがあります。

[@nrwl/next:component - Nx](https://nx.dev/l/r/next/component)

ちなみに `--dry-run` フラグでドライランができます、便利です。

`--project` を指定しないと `nx.json` で指定されているデフォルトプロジェクトの `api` 側に作ってしまうので注意が必要です。

``` sh
[21-12-03 9:01] ~/Desktop/nx/myapp (main) $ npx nx g @nrwl/next:component Header --project=web --dry-run
✔ Which stylesheet format would you like to use? · css
CREATE apps/web/components/header/header.module.css
CREATE apps/web/components/header/header.spec.tsx
CREATE apps/web/components/header/header.tsx

NOTE: The "dryRun" flag means no changes were made.
```

specもできるのがいいですね！ファイル名がアッパーキャメルではないのがちょっと気になります・・・

コンポーネントのtsxはこんな感じで、 `React.FC<HeaderProps>` になっていないのが少し気になるところです。

``` tsx
import './header.module.css';

/* eslint-disable-next-line */
export interface HeaderProps {}

export function Header(props: HeaderProps) {
  return (
    <div>
      <h1>Welcome to Header!</h1>
    </div>
  );
}

export default Header;
```

specはこのようになっています。

``` tsx
import { render } from '@testing-library/react';

import Header from './header';

describe('Header', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Header />);
    expect(baseElement).toBeTruthy();
  });
});
```

便利すぎて感動しました。

とりあえずバックエンド、フロントエンドがそれぞれ動いたのでここまでにします。

また進めていくと無限に躓きそうですが、肌感はわかったのでよしとします！

## 所感

全体的に便利でした、気になったのはこの辺りです。

- nxを経由していろんなこと（起動など諸々）をやるのは、いらない依存が増えるという見方もできるかなと思いました
- generator、カスタマイズしたくなったら面倒そうだなと思いました
  - カスタマイズするよりhygenなどにしてしまったほうがいいのでしょうか？

とはいえ思っていたより便利で満足です、generatorもデフォルトのまま使えそうですし、プロダクションで使ってみたいところです。

次はデプロイまでやってみようかなと思います。

## 参考になりそうなリンク

- [【フロントエンド、バックエンドを一つのリポジトリで管理】monorepoを実現できるNxをさわってみた | DevelopersIO](https://dev.classmethod.jp/articles/monorepo-nx/)
  - とても詳細に書かれていて良さそうでした、ちゃんと読んでいませんが困ったら読もうと思います
