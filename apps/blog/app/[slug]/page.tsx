import { metaTitle, ContentfulService } from "@libs";
import { PostBody } from "@components";
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
      <h1 className="text-3xl font-semibold my-8">
        {post.fields.title as string}
      </h1>
      <PostBody post={post} />
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
