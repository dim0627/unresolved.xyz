import { ContentfulService } from "@libs";
import { Container, PostList } from "@components";
import { InferGetStaticPropsType } from "next";
import { Shell } from "@layouts";
import Head from "next/head";

export default function Index(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Shell>
      <Head>
        <title>blog.unresolved.xyz</title>
      </Head>
      <Container>
        <PostList posts={props.posts} />
      </Container>
    </Shell>
  );
}

export async function getStaticProps() {
  const client = new ContentfulService();
  const posts = await client.getPosts();

  return {
    props: {
      posts: posts.items,
    },
    revalidate: 60 * 60 * 12,
  };
}
