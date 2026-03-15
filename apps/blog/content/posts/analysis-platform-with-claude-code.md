---
title: "Claude Code駆動の分析基盤を作って、個人プロダクトのファネル分析を自動化した話"
date: "2026-03-15T00:00+09:00"
tags:
  - "AI"
  - "Claude Code"
  - "個人開発"
---

自分が運営している複数の個人プロダクトを横断的に分析するために、Claude Codeを分析エンジンとして活用する `analysis` リポジトリを構築しました。最初のターゲットは [honn.me](https://honn.me) のファネル分析。GitHub Actionsでデータ収集を自動化し、Claude Codeで分析するハイブリッド方式に至るまでのストーリーを、失敗談も含めて書いていきます。

## Table of contents

## 背景・モチベーション

honn.meは本の推薦文を共有するサービスで、ユーザーの行動をDBのイベントログとして記録しています。ファネル分析だけなら[GA4でもできる](https://support.google.com/analytics/answer/9327974?hl=ja)んですが、やりたかったのはもっと広い話で、DBのイベントログやアプリケーション固有のメトリクスなど、あらゆるデータソースから自由に数字を引っ張ってきて分析すること。GAはあくまでページビュー周りのツールなので、アプリケーション内部のイベントやビジネスロジックに紐づくデータまではカバーしきれない。

たとえばhonn.meのDBには `page_view_home → title_input_focus → book_select → create_button_click → share_button_click` というイベントが記録されています。これをファネルとして見るだけでなく、「特定のメタデータを持つイベントだけ抽出したい」「DB上のユーザー属性と掛け合わせたい」といった柔軟な分析がしたい。そしてそれを自然言語で指示できたら最高だなと。

もう一つの動機として、分析基盤を作ること自体が、プロダクトの解像度を上げるという期待もありました。「何を計測すべきか」を考える過程で、プロダクトの課題が見えてくるのではないかと。

## analysis リポジトリの設計思想

いくつかの設計方針を決めて始めました。

- **Claude Code駆動**: スクリプトの実装からSQLの組み立てまで、Claude Codeに主導してもらう。自分は方針を決めて指示を出す側に徹する。さらに、収集済みデータの分析もClaude Codeに任せる。GitHub Actionsが毎日記録した定点データをClaude Codeに読ませて「この数字どう思う？」と自然言語で対話できるのが強み
- **データソース非依存**: GAに限らず、DBのイベントログ、アプリケーション固有のメトリクス、外部APIなど、あらゆるデータソースからメトリクスを収集できる。取得スクリプトを書けばどんなデータでも分析対象にできる
- **プロジェクト横断**: `config/projects.json` でプロジェクト情報を管理し、自分が運営するすべてのプロダクトを一元的に分析できるようにする。honn.meは最初のターゲットだが、他のプロダクトもスクリプトとconfig追加だけで対応できる設計
- **シークレット分離**: DB接続情報やSlack Webhook URLは環境変数で管理。`projects.json` には `env_key` パターンだけを記述する
- **日付ベース出力**: `output/{project}/{date}/data/` に日次でデータを出力。時系列で比較できるようにする
- **TypeScript + SQL二段構え**: TypeScript（tsx）経由でDBやGAなどからデータを取得するスクリプトと、DB直接参照用のSQLファイルの両方を用意。手段を複数持つことで柔軟に対応できる

```json
// config/projects.json のイメージ
{
  "projects": [
    {
      "name": "honn.me",
      "env_key": "HONN_ME",
      "database_url_env": "HONN_ME_DATABASE_URL"
    }
  ]
}
```

## 実際にやったこと（時系列）

### スキャフォルディング

最初にClaude Codeにリポジトリの雛形を作ってもらいました。ディレクトリ構成、TypeScriptの設定、共通ユーティリティ。ここは本当にスムーズで、指示を出してから数分で動く状態になりました。

### Eventテーブル中心に方針転換

当初はいくつかのテーブルからデータを引っ張る想定でしたが、途中でEventテーブルに集約する方針に転換しました。honn.meのイベントログは `events` テーブルに `event_type` と `metadata` で記録されているので、ここだけ見ればファネル分析に必要なデータはすべて揃う。

```typescript
// scripts/honn.me/fetch-db-metrics.ts のイメージ
const funnelEvents = [
  'page_view_home',
  'title_input_focus',
  'book_select',
  'create_button_click',
  'share_button_click',
] as const

const results = await pool.query(`
  SELECT event_type, COUNT(*) as count
  FROM events
  WHERE event_type = ANY($1)
    AND created_at >= $2
    AND created_at < $3
  GROUP BY event_type
`, [funnelEvents, startDate, endDate])
```

### SSL接続とスキーマ修正

Render.comのPostgreSQLに接続する際、SSL設定でハマりました。`sslmode=require` だけでは足りず、接続文字列の調整が必要でした。さらにスキーマ名の指定も最初は間違えていて、Claude Codeに修正してもらいながら進めました。

### Slack通知の実装

毎日の分析結果をSlackに通知する仕組みを作りました。Block Kitを使ってファネルを可視化しています。

```typescript
// scripts/_shared/notify-slack.ts で構築するBlock Kit
const blocks = [
  {
    type: 'header',
    text: { type: 'plain_text', text: '📊 honn.me Daily Funnel Report' }
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: funnelSteps.map(step =>
        `${step.emoji} ${step.label}: *${step.count}* (${step.rate}%)`
      ).join('\n')
    }
  }
]
```

実際にSlackに届くレポートはこんな感じです。

![Slackに届くファネル分析レポート](/images/posts/analysis-platform-slack-report.png)

各ステップの転換率が一目でわかるので、日々の変化を追いやすくなりました。

### GitHub Actionsで日次の定点記録を自動化

最終的にデータ収集をGitHub Actionsで自動化しました。ここで重要なのは、GitHub Actionsの役割はあくまで「日次の定点記録」だということ。毎日同じクエリを叩いて、その日のファネル数値をJSONに保存し、Slackに通知する。判断や解釈は一切しない、淡々とした記録係です。

```yaml
# .github/workflows/fetch-metrics.yml
name: Fetch Metrics
on:
  schedule:
    - cron: '0 0 * * *'  # 毎日UTC 0:00
  workflow_dispatch:

jobs:
  fetch:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run scripts/honn.me/fetch-db-metrics.ts
        env:
          HONN_ME_DATABASE_URL: ${{ secrets.HONN_ME_DATABASE_URL }}
      - run: bun run scripts/_shared/notify-slack.ts
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## Coworkで詰まった話

Claude CodeにはCoworkというVM上で長時間タスクを実行するモードがあります。「データ収集から分析まで全部Coworkに任せれば完全自動化できるのでは？」と考えて試してみました。

結果は全滅でした。

CoworkのVM環境にはネットワーク制約があり、外部のデータベースへの接続ができません。Render.comのPostgreSQLへの接続もタイムアウト。GitHub APIもSlack Webhookも叩けない。つまり、外部サービスとの通信が必要な処理はCoworkでは実行できないということがわかりました。

これがハイブリッド方式に至った直接的な理由です。GitHub Actionsは毎日決まったクエリを叩いてデータをJSONに記録する「定点観測係」。Claude Codeはその蓄積されたデータを読み込んで、傾向の分析や仮説の提示を行う「分析係」。データ収集と分析の責務がきれいに分かれて、結果的には良い設計になりました。

## 面白かった発見

### 分析基盤を作ること自体がプロダクト改善

ファネルを定義する過程で「このステップの間に何が起きているのか」を深く考えることになりました。分析基盤を作ること自体が、プロダクトの解像度を上げる行為だったと感じています。

### 転換率から見えるUXの課題

実際のデータを見ると、`title_input_focus → book_select` の転換率が低いことがわかりました。ユーザーはタイトルを入力するところまでは来るが、本の選択で離脱している。これは本の検索UIに改善の余地があることを示唆しています。

### Block Kitでのファネル可視化

Slackの通知でBlock Kitを使ったファネル可視化は見た目以上に便利でした。毎朝Slackを開くだけで、前日のファネル状況がぱっと見れる。ダッシュボードを別途開く必要がないのは、個人開発のスケール感にちょうど良い。

### book_removeの解釈

データを見ていて `book_remove` というイベントが気になりました。本を一度選択した後に削除するユーザーがいる。これは「間違えて選んだ」のか「比較検討している」のか。こういった解釈の余地がある指標を自然言語でClaude Codeに投げて議論できるのは、この分析基盤ならではの体験でした。SQLを書かなくても「book_removeが多い日の傾向を教えて」と聞けば分析してくれる。

## 現在のアーキテクチャ

最終的に落ち着いた構成は以下の通りです。

### 定点記録レイヤー（GitHub Actions）

- 毎日定時にワークフローが起動
- 各プロダクトのデータベースからイベントデータを取得
- JSON形式で `output/{project}/{date}/data/` に保存
- Slack Block Kitで当日のファネル数値を通知
- 判断・解釈は行わない。あくまで「その日の数字を記録する」だけ

### 分析レイヤー（Claude Code）

- 蓄積された日次JSONデータを横断的に読み込み
- 自然言語で分析を指示できる（「先週と比べて転換率がどう変わった？」「book_selectの離脱が多い日に共通点はある？」）
- 数字の解釈や改善仮説の提示
- ファネルに限らず、データがあればどんな切り口でも柔軟に分析できる

ポイントは、GitHub Actionsは「何が起きたか」を淡々と記録し、Claude Codeは「それが何を意味するか」を考える、という責務の分離です。定点記録は毎日安定して自動実行され、分析は必要なタイミングでClaude Codeと対話しながら行う。

## 技術スタック

- **ランタイム**: TypeScript + tsx（Bun）
- **データベース**: PostgreSQL（Render.com）、`pg` ライブラリで接続
- **定点記録**: GitHub Actions（日次スケジュール実行）
- **通知**: Slack Incoming Webhooks + Block Kit
- **分析**: Claude Code（蓄積データの解釈・仮説提示）
- **設定管理**: JSON（`config/projects.json`）

## まとめ

複数の個人プロダクトを横断的に分析するための `analysis` リポジトリを作りました。Coworkでの失敗を経て、GitHub Actionsでデータ収集、Claude Codeで分析というハイブリッド方式に落ち着きました。

個人開発の規模感では、専用のBIツールを導入するほどでもないけれど、GAだけではデータソースが限られる。DBのイベントログやアプリ固有のメトリクスまで含めて、自然言語で柔軟に分析できるこの構成は、ちょうど良い中間地点だと感じています。honn.meで仕組みが回り始めたので、次は他のプロダクトにも同じ基盤を横展開していく予定です。

分析基盤を作る過程でファネルの転換率からUXの課題が見えたり、「作ること自体がプロダクト改善」という体験ができたのは、やってみて良かったポイントです。
