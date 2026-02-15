import { getAllPostSlugs, getPost, metaTitle } from '@libs';
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
        <h1 className="font-semibold text-2xl tracking-widest">{post.title}</h1>
        <div className="mt-4 flex justify-between text-neutral-500 text-sm">
          <span className="font-semibold">
            {new Date(post.date).toDateString()}
          </span>
          <ul className="flex gap-4">
            {post.tags.map((tag) => (
              <li key={tag} className="font-semibold">
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
  return getAllPostSlugs().map((slug) => ({ slug }));
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
