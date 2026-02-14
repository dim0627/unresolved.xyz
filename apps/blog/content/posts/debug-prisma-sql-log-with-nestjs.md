---
title: "NestJS + PrismaでSQLをログに出したい"
date: "2023-09-10T00:00+09:00"
tags:
  - "Prisma"
  - "NestJS"
---

こう。

``` ts
import config from '@/libs/config';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit
{
  constructor() {
    super({ log: ['query', 'info', 'warn', 'error'] });
  }

  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    if (config().nodeEnv !== 'production') {
      this.$on('query', (event) => {
        this.logger.log(
          `Query: ${event.query}`,
          `Params: ${event.params}`,
          `Duration: ${event.duration} ms`,
        );
      });
      this.$on('info', (event) => {
        this.logger.log(`message: ${event.message}`);
      });
      this.$on('error', (event) => {
        this.logger.log(`error: ${event.message}`);
      });
      this.$on('warn', (event) => {
        this.logger.log(`warn: ${event.message}`);
      });
    }
    await this.$connect();
  }
}
```

## 参考にさせていただきました

- [NestJS で Prisma の発行するクエリを出力する](https://zenn.dev/takepepe/articles/nestjs-prisma-logger)
