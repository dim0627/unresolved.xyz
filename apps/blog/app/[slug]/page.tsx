import { getPost, getPosts, metaTitle } from '@libs';
import type { Metadata, ResolvingMetadata } from 'next';
import { Body } from './body';

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return null;

  return (
    <div>
      <header className="mt-8 mb-4">
        <h1 className="font-semibold text-2xl">{post.title}</h1>
        <div className="mt-4 flex justify-between text-xs">
          <span className="font-semibold text-slate-500">
            {new Date(post.date).toDateString()}
          </span>
          <ul className="flex gap-4">
            {post.tags.map((tag) => (
              <li key={tag} className="font-semibold text-red-500">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </header>
      <Body body={post.body} />
    </div>
  );
}

export function generateStaticParams() {
  const posts = getPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  return {
    title: metaTitle(post.title),
  };
}
