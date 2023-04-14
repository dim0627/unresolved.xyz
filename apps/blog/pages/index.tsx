import { ContentfulService } from "@libs";
import { Container, PostList } from "@components";
import { InferGetStaticPropsType } from "next";

export default function Index(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  return (
    <Container>
      <PostList posts={props.posts} />;
    </Container>
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
