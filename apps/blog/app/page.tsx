import { getPosts } from '@libs';
import type { Metadata } from 'next';
import { List } from './list';

export default function Page() {
  const posts = getPosts();

  return <List items={posts} />;
}

export const metadata: Metadata = {
  title: 'blog.unresolved.xyz',
};
