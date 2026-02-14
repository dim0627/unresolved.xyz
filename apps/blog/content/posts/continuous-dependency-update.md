---
title: "CircleCIでyarn upgradeとかbundle updateをやってプルリクを作ってもらう"
date: "2018-07-26T00:00+09:00"
tags: []
---

ほんとにライフチェンジングなのでやってない人はぜひやってみてほしい。

<blockquote class="twitter-tweet" data-lang="en"><p lang="ja" dir="ltr">CIでまいにちbundleとかyarnのアップデートやらせるやつまじで革命的な生活だからもっとはやくやればよかったと思ってる</p>&mdash; dtsuji (@dim0627) <a href="https://twitter.com/dim0627/status/1013387079890264064?ref_src=twsrc%5Etfw">July 1, 2018</a></blockquote>

有志が以下のような素晴らしいツールを公開してくれているので、これらをありがたく使わせてもらう！

* [masutaka/circleci\-bundle\-update\-pr: Create PullRequest of bundle update in CircleCI](https://github.com/masutaka/circleci-bundle-update-pr)
* [taichi/ci\-yarn\-upgrade: Keep NPM dependencies up\-to\-date with CI, providing version\-to\-version diff for each library](https://github.com/taichi/ci-yarn-upgrade)

## CircleCIで依存ライブラリのアップデートを回す

僕はこんな`config.yml`を使っている。

``` yml
version: 2
jobs:
  build:
    # your default build scripts.
  bundle-update:
    docker:
      - image: circleci/ruby:2.5.1-node
    steps:
      - checkout
      - restore_cache:
          name: Restore bundler cache
          key: rails-demo-{{ checksum "Gemfile.lock" }}
      - run:
          name: Setup requirements for continuous bundle update
          command: gem install -N circleci-bundle-update-pr
      - deploy:
          name: Continuous bundle update
          command: circleci-bundle-update-pr $GIT_USER_NAME $GIT_USER_EMAIL

  yarn-upgrade:
    docker:
      - image: node:6-alpine
    steps:
      - run: apk add --update --no-cache git openssh-client
      - checkout
      - run: yarn global add ci-yarn-upgrade
      - run: yarn install
      - run: ci-yarn-upgrade --execute --verbose --latest;

workflows:
  version: 2
  build_and_test:
    jobs:
      - build
  nightly-bundle-update:
    triggers:
      - schedule:
          cron: "0 0 * * *"
          filters:
            branches:
              only: master
    jobs:
      - bundle-update
  nightly-yarn-upgrade:
    triggers:
      - schedule:
          cron: "0 0 * * *"
          filters:
            branches:
              only: master
    jobs:
      - yarn-upgrade
```

CircleCI上のcronはUTCで回るので、日本だとAM9時に処理がされる。

## サービスにやらせるならこれ

たぶん王道はこの辺なのかなー。

* [Dependabot \- Automated Dependency Updates](https://dependabot.com/)
* [renovatebot/renovate: Automated dependency updates\. Flexible, so you don't need to be\.](https://github.com/renovatebot/renovate)
* [Greenkeeper \| Automate your npm dependency management](https://greenkeeper.io/)

どちらもセルフホスティングできるはずなので、お金払いたくないなら自分でたてちゃえば済むと思う。
