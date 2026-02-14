---
title: "HerokuのPostgreSQLのプランを変更するときの移行手順メモ"
date: "2019-02-23T00:00+09:00"
tags:
  - "Heroku"
  - "TIL"
---

いつも忘れて本当に困るのでメモしておきます。

```bash
heroku maintenance:on --app your-app-name

heroku pg:copy DATABASE_URL HEROKU_POSTGRESQL_COLOR_URL --app your-app-name
heroku pg:promote HEROKU_POSTGRESQL_COLOR_URL --app your-app-name

heroku maintenance:off --app your-app-name

heroku pg:info --app your-app-name

heroku pg:backups:schedules -a --app your-app-name
```

## 定期バックアップの設定

```bash
heroku pg:backups:schedule DATABASE_URL --at '4:00 Asia/Tokyo' -a your-app-name
```

## 参考にさせていただきました

<https://qiita.com/takecian/items/e37bc5d2d753f600e7e6>
