import { FC } from "react";
import { ContentfulService } from "@libs";
import strip from "strip-markdown";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

interface ItemProps {
  post: Awaited<
    ReturnType<InstanceType<typeof ContentfulService>["getPosts"]>
  >["items"][0];
}

const Item: FC<ItemProps> = ({ post }) => {
  const { title, body } = post.fields;
  return (
    <Link
      className="block hover:bg-slate-50 p-6 -mx-4 rounded-none sm:rounded-3xl duration-200"
      href={`/${post.fields.slug}`}
    >
      <h2 className="mb-2 text-xl tracking-widest font-semibold">
        {title as string}
      </h2>
      <div className="line-clamp-4 text-slate-500">
        <ReactMarkdown remarkPlugins={[strip]}>{body as string}</ReactMarkdown>
      </div>
    </Link>
  );
};

interface PostListProps {
  posts: Awaited<
    ReturnType<InstanceType<typeof ContentfulService>["getPosts"]>
  >["items"];
}

export const PostList: FC<PostListProps> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-y-2">
      {posts.map((post) => (
        <Item key={post.sys.id} post={post} />
      ))}
    </div>
  );
};
