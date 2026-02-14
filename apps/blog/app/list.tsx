import Link from 'next/link';
import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import strip from 'strip-markdown';
import type { Post } from '../types/post';

interface ItemProps {
  item: Post;
}

const Item: FC<ItemProps> = ({ item }) => {
  return (
    <Link
      className="-mx-4 block rounded-none p-4 duration-200 hover:bg-slate-50 sm:rounded-3xl"
      href={`/${item.slug}`}
    >
      <h2 className="mb-2 font-semibold text-xl tracking-widest">
        {item.title}
      </h2>
      <div className="line-clamp-4 text-slate-500">
        <ReactMarkdown remarkPlugins={[strip]}>{item.body}</ReactMarkdown>
      </div>
    </Link>
  );
};

interface ListProps {
  items: Post[];
}

export const List: FC<ListProps> = ({ items }) => {
  return (
    <div className="flex flex-col gap-y-2">
      {items.map((item) => (
        <Item key={item.slug} item={item} />
      ))}
    </div>
  );
};
