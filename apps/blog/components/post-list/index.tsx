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
    <div className="p-6 rounded-3xl shadow-[0_4px_0_0_rgba(0,0,0,.2)] bg-white">
      <h2 className="font-bold text-2xl mb-2 text-gray-700">
        {title as string}
      </h2>
      <div className="line-clamp-4">
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
    <div className="flex flex-col gap-y-4">
      {posts.map((post) => (
        <Item key={post.sys.id} post={post} />
      ))}
    </div>
  );
};
