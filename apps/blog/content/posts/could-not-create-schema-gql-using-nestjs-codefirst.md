---
title: "Nest.js + CodeFirst GraphQLでschema.gqlが生成できない"
date: "2022-01-29T00:00+09:00"
tags:
  - "Next.js"
  - "GraphQL"
  - "TIL"
---

```text
Error: Expected undefined to be a GraphQL schema.
```

こんな感じのバージョンで動かない。

```json
"@nestjs/common": "^8.0.0",
"@nestjs/core": "^8.0.0",
"@nestjs/graphql": "^9.1.2",
"@nestjs/platform-express": "^8.0.0",
"graphql": "^16.3.0"
```

## graphql v16とは相性が悪いっぽい

一旦ダウングレードすれば動いた感じ

```bash
yarn add graphql@15.7.1
```

- [@nestjs/graphql@9.1.1 not compatible with GraphQL@16 · Issue #8551 · nestjs/nest](https://github.com/nestjs/nest/issues/8551)
- [javascript - NestJS - Expected undefined to be a GraphQL schema - Stack Overflow](https://stackoverflow.com/questions/69778679/nestjs-expected-undefined-to-be-a-graphql-schema)
