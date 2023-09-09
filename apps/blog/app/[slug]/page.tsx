import { metaTitle, ContentfulService } from "@libs";
import { Body } from "./body";
import { Metadata, ResolvingMetadata } from "next";

export const revalidate = 60 * 60; // revalidate every hour

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
  const client = new ContentfulService();
  const post = await client.getPost(params.slug as string);

  if (!post) return null;

  return (
    <div>
      <header className="mt-8 mb-4">
        <h1 className="text-2xl font-semibold">
          {post.fields.title as string}
        </h1>
        <div className="flex mt-4 justify-between text-xs">
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

  return posts.items.map((post) => ({
    slug: post.fields.slug as string,
  }));
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const client = new ContentfulService();
  const post = await client.getPost(params.slug as string);

  if (!post) return {};

  return {
    title: metaTitle(post.fields.title as string),
  };
}
