import { ContentfulService } from '@libs';
import type { Metadata } from 'next';
import { List } from './list';

export const revalidate = 60 * 60; // revalidate every hour

export default async function Page() {
  const client = new ContentfulService();
  const posts = await client.getPosts();

  return <List items={posts.items} />;
}

export const metadata: Metadata = {
  title: 'blog.unresolved.xyz',
};
