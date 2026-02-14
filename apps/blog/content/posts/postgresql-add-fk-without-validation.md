---
title: "PostgreSQLで検証を無効にしてFKを設定する方法"
date: "2025-02-23T00:00+09:00"
tags: []
---

既存テーブルにFKを追加しようとしたときにDBに負荷がかかるのを避けたいので、検証なしのFKを張る方法をメモします。

こんな感じで `NOT VALID` をつけておけばよいです。

```sql
ALTER TABLE "SomeTable" ADD CONSTRAINT "SomeTable_fkey" FOREIGN KEY ("someId") REFERENCES "ToTable"("id") ON DELETE RESTRICT ON UPDATE CASCADE NOT VALID;
```

検証がずっと無効だと困るので、別途検証を有効にします。

```sql
ALTER TABLE "SomeTable"  VALIDATE CONSTRAINT "SomeTable_fkey";
```

## テーブルのON DELETE、ON UPDATEの確認

```sql
select
  connamespace,
  conname,
  c.relname as child_table,
  p.relname as parent_table,
  confdeltype
from
  pg_constraint
  join pg_class c on c.oid = conrelid
  join pg_class p on p.oid = confrelid;
-- Foreign key deletion action code: a = no action, r = restrict, c = cascade, n = set null, d = set default
```

## 参考

- [PostgreSQL: Documentation: 17: 51.13. pg\_constraint](https://www.postgresql.org/docs/current/catalog-pg-constraint.html)
- [sql - How to know if a foreign key has cascade on delete clause - Stack Overflow](https://stackoverflow.com/questions/59353063/how-to-know-if-a-foreign-key-has-cascade-on-delete-clause)
