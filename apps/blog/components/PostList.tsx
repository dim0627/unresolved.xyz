import { FC } from "react";
import { ContentfulService } from "@libs";

interface ItemProps {
  post: Awaited<
    ReturnType<InstanceType<typeof ContentfulService>["getPosts"]>
  >["items"][0];
}

const Item: FC<ItemProps> = ({ post }) => {
  return (
    <div>
      <h2>{post.fields.title as string}</h2>
    </div>
  );
};

interface PostListProps {
  posts: Awaited<
    ReturnType<InstanceType<typeof ContentfulService>["getPosts"]>
  >["items"];
}

export const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Item key={post.sys.id} post={post} />
      ))}
    </div>
  );
};
