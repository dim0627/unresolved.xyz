import { ContentfulService, metaTitle } from '@libs';
import type { Metadata, ResolvingMetadata } from 'next';
import { Body } from './body';

export const revalidate = 3600; // revalidate every hour

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const client = new ContentfulService();
  const post = await client.getPost(slug as string);

  if (!post) return null;

  return (
    <div>
      <header className="mt-8 mb-4">
        <h1 className="font-semibold text-2xl">
          {post.fields.title as string}
        </h1>
        <div className="mt-4 flex justify-between text-xs">
          <span className="font-semibold text-slate-500">
            {new Date(post.fields.date as string).toDateString()}
          </span>
          <ul className="flex gap-4">
            {/* @ts-ignore */}
            {post.fields.tags?.map((tag) => (
              <li key={tag.sys.id} className="font-semibold text-red-500">
                {tag.fields.name}
              </li>
            ))}
          </ul>
        </div>
      </header>
      <Body post={post} />
    </div>
  );
}

export async function generateStaticParams() {
  const client = new ContentfulService();
  const posts = await client.getPosts();

  return posts.items
    .filter((post) => typeof post.fields.slug === 'string')
    .map((post) => ({
      slug: post.fields.slug as string,
    }));
}

export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const client = new ContentfulService();
  const post = await client.getPost(slug as string);

  if (!post) return {};

  return {
    title: metaTitle(post.fields.title as string),
  };
}
