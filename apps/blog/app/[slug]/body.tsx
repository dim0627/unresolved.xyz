"use client";

import { FC } from "react";
import { ContentfulService } from "@libs";
import ReactMarkdown from "react-markdown";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import toc from "remark-toc";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";

const CodeBlock: SpecialComponents["code"] = ({
  node,
  inline,
  className,
  children,
  ...props
}) => {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <SyntaxHighlighter
      {...props}
      style={nord}
      language={match[1]}
      codeTagProps={{ className: "text-xs leading-3" }}
      PreTag={(props) => (
        <div {...props} className="!rounded !my-6 !bg-slate-800" />
      )}
      showLineNumbers
    >
      {String(children).replace(/\n$/, "")}
    </SyntaxHighlighter>
  ) : (
    <code
      {...props}
      className="bg-slate-800 text-white rounded px-2 py-1 text-xs"
    >
      {children}
    </code>
  );
};

interface BodyProps {
  post: Awaited<
    ReturnType<InstanceType<typeof ContentfulService>["getPosts"]>
  >["items"][0];
}

export const Body: FC<BodyProps> = ({ post }) => {
  return (
    <ReactMarkdown
      className="break-all"
      remarkPlugins={[remarkGfm, [toc, { tight: true }]]}
      rehypePlugins={[rehypeSlug, rehypeRaw]}
      components={{
        h2: ({ node, ...props }) => (
          <h2 {...props} className="text-xl font-semibold mt-16 mb-4" />
        ),
        h3: ({ node, ...props }) => (
          <h3 {...props} className="text-lg font-semibold mt-10 mb-4" />
        ),
        p: ({ node, ...props }) => <p {...props} className="my-6 text-lg" />,
        code: CodeBlock,
        a: ({ node, ...props }) => (
          <a {...props} className="text-red-500 underline" />
        ),
        b: ({ node, ...props }) => <b {...props} className="font-semibold" />,
        strong: ({ node, ...props }) => (
          <b {...props} className="font-semibold" />
        ),
        ul: ({ node, ...props }) => (
          <ul {...props} className="list-disc pl-8" />
        ),
        ol: ({ node, ...props }) => (
          <ul {...props} className="list-decimal pl-8" />
        ),
        li: ({ node, ...props }) => <li {...props} className="my-2 text-lg" />,
      }}
    >
      {post.fields.body as string}
    </ReactMarkdown>
  );
};
