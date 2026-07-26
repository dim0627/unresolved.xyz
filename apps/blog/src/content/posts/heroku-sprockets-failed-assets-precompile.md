---
title: "Heroku + Rails(Sprockets4.0.1)でassets:precompileがエラーする問題"
date: "2020-06-06T00:00+09:00"
tags:
  - "Ruby on Rails"
  - "TIL"
---

dependabotのオートマージで夜中にデプロイ失敗したよというメッセージが発生しました。

```text
NoMethodError: undefined method `+' for nil:NilClass
  from sprockets/asset.rb:138:in `etag'
  from sprockets/asset.rb:67:in `block in digest_path'
  from sprockets/asset.rb:67:in `sub'
  from sprockets/asset.rb:67:in `digest_path'
  from sprockets/manifest.rb:175:in `block in compile'
  from sprockets/manifest.rb:173:in `each'
  from sprockets/manifest.rb:173:in `compile'
  from sprockets/rails/task.rb:68:in `block (3 levels) in define'
  from rake/sprocketstask.rb:148:in `with_logger'
  from sprockets/rails/task.rb:67:in `block (2 levels) in define'
  from rake/task.rb:281:in `block in execute'
  from rake/task.rb:281:in `each'
  from rake/task.rb:281:in `execute'
  from rake/task.rb:219:in `block in invoke_with_call_chain'
  from monitor.rb:230:in `mon_synchronize'
  from rake/task.rb:199:in `invoke_with_call_chain'
  from rake/task.rb:188:in `invoke'
  from rake/application.rb:160:in `invoke_task'
  from rake/application.rb:116:in `block (2 levels) in top_level'
  from rake/application.rb:116:in `each'
  from rake/application.rb:116:in `block in top_level'
  from rake/application.rb:125:in `run_with_threads'
  from rake/application.rb:110:in `top_level'
  from rake/application.rb:83:in `block in run'
  from rake/application.rb:186:in `standard_exception_handling'
  from rake/application.rb:80:in `run'
  from bundle/ruby/2.6.0/gems/rake-13.0.1/exe/rake:27:in `<top (required)>'
  from ./vendor/bundle/bin/rake:29:in `load'
  from ./vendor/bundle/bin/rake:29:in `<main>'
```

以下で解決できました。

```diff
-Rails.application.config.assets.version = '1.0'
+Rails.application.config.assets.version = 'v1.0'
```

- <https://stackoverflow.com/questions/62208867/rails-deployment-to-heroku-nomethoderror-undefined-method-for-nilnilclass>
- <https://github.com/rails/sprockets/issues/683>
