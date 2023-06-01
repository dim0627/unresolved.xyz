import { FC } from "react";
import { ContentfulService } from "../../libs/contentful";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostBodyProps {
  post: Awaited<
    ReturnType<InstanceType<typeof ContentfulService>["getPosts"]>
  >["items"][0];
}

export const PostBody: FC<PostBodyProps> = ({ post }) => {
  return (
    <ReactMarkdown
      className="break-all"
      remarkPlugins={[remarkGfm]}
      components={{
        h2: ({ node, ...props }) => (
          <h2 {...props} className="text-xl font-semibold mt-16 mb-4" />
        ),
        h3: ({ node, ...props }) => (
          <h3 {...props} className="text-lg font-semibold mt-10 mb-4" />
        ),
        p: ({ node, ...props }) => <p {...props} className="my-4 text-lg" />,
        pre: ({ node, ...props }) => (
          <pre
            {...props}
            className="my-4 p-6 text-xs bg-slate-50 rounded whitespace-pre overflow-scroll"
          />
        ),
        a: ({ node, ...props }) => (
          <a {...props} className="text-red-500 underline" />
        ),
        b: ({ node, ...props }) => <b {...props} className="font-semibold" />,
        strong: ({ node, ...props }) => (
          <b {...props} className="font-semibold" />
        ),
        code: ({ node, ...props }) => (
          <code
            {...props}
            className="bg-slate-50 text-slate-700 rounded px-2 py-1 text-xs"
          />
        ),
        ul: ({ node, ...props }) => (
          <ul {...props} className="list-disc list-inside pl-4" />
        ),
        ol: ({ node, ...props }) => (
          <ul {...props} className="list-decimal list-inside pl-4" />
        ),
        li: ({ node, ...props }) => <li {...props} className="my-2" />,
      }}
    >
      {post.fields.body as string}
    </ReactMarkdown>
  );
};
