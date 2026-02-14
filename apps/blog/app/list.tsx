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
    <Link className="group block" href={`/${item.slug}`}>
      <h2 className="mb-2 font-semibold text-lg tracking-widest group-hover:underline">
        {item.title}
      </h2>
      <div className="line-clamp-4 text-neutral-500 text-sm">
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
    <div className="space-y-12">
      {items.map((item) => (
        <Item key={item.slug} item={item} />
      ))}
    </div>
  );
};
