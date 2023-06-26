import { ContentfulService } from "@libs";
import { Container, PostBody } from "@components";
import { InferGetStaticPropsType } from "next";
import { Shell } from "@layouts";
import Head from "next/head";

export default function Index(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  if (!props.post) return null;

  const { post } = props;

  return (
    <Shell>
      <Head>
        <title>{post.fields.title as string} - blog.unresolved.xyz</title>
      </Head>
      <div className="bg-slate-800 pt-20 pb-8 -mt-6 mb-6">
        <Container>
          <h1 className="text-3xl font-semibold leading-relaxed text-white">
            {post.fields.title as string}
          </h1>
        </Container>
      </div>
      <Container>
        <PostBody post={post} />
      </Container>
    </Shell>
  );
}

export async function getStaticPaths() {
  const client = new ContentfulService();
  const posts = await client.getPosts();
  const paths = posts.items
    .map((post) => ({
      params: { slug: post.fields.slug as string },
    }))
    .filter((path) => !!path.params.slug);

  return {
    paths,
    fallback: true,
  };
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const client = new ContentfulService();
  const post = await client.getPost(params.slug as string);

  return {
    props: {
      post: post,
    },
    revalidate: 60 * 60 * 12,
  };
};
