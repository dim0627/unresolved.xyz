// frontmatter の日付は `+09:00` 付きで書かれているので、表示も JST で固定する。
// `Date#toDateString()` はビルドマシンのローカルタイムで整形するため、UTC で
// 走る CI では 1 日前の日付が出てしまう。体裁は toDateString() に合わせてある。
const formatter = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Tokyo',
  weekday: 'short',
  month: 'short',
  day: '2-digit',
  year: 'numeric',
});

/** 記事の日付を `Sat Dec 04 2021` の形で返す。 */
export function formatPostDate(date: string): string {
  const parts = Object.fromEntries(
    formatter
      .formatToParts(new Date(date))
      .map(({ type, value }) => [type, value]),
  );

  return `${parts.weekday} ${parts.month} ${parts.day} ${parts.year}`;
}
