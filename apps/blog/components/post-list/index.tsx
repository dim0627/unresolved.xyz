import { FC } from "react";
import { ContentfulService } from "@libs";
import strip from "strip-markdown";
import ReactMarkdown from "react-markdown";

interface ItemProps {
  post: Awaited<
    ReturnType<InstanceType<typeof ContentfulService>["getPosts"]>
  >["items"][0];
}

const Item: FC<ItemProps> = ({ post }) => {
  const { title, body } = post.fields;
  return (
    <div className="my-4">
      <h2 className="font-bold text-2xl mb-2">{title as string}</h2>
      <div>
        <ReactMarkdown remarkPlugins={[strip]}>{body as string}</ReactMarkdown>
      </div>
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
