'use client';

import type { ContentfulService } from '@libs';
import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import toc from 'remark-toc';

const CodeBlock = ({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'code'>) => {
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter
      style={nord}
      language={match[1]}
      codeTagProps={{ className: 'text-xs leading-3' }}
      PreTag={(props) => (
        <div {...props} className="!my-6 !rounded !bg-slate-800" />
      )}
      showLineNumbers
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code
      {...props}
      className="rounded bg-slate-800 px-2 py-1 text-white text-xs"
    >
      {children}
    </code>
  );
};

interface BodyProps {
  post: Awaited<
    ReturnType<InstanceType<typeof ContentfulService>['getPosts']>
  >['items'][0];
}

export const Body: FC<BodyProps> = ({ post }) => {
  return (
    <div className="break-all">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, [toc, { tight: true }]]}
        rehypePlugins={[rehypeSlug, rehypeRaw]}
        components={{
          h2: (props) => (
            <h2 {...props} className="mt-16 mb-4 font-semibold text-xl" />
          ),
          h3: (props) => (
            <h3 {...props} className="mt-10 mb-4 font-semibold text-lg" />
          ),
          p: (props) => <p {...props} className="my-6 text-lg" />,
          code: CodeBlock,
          a: (props) => <a {...props} className="text-red-500 underline" />,
          b: (props) => <b {...props} className="font-semibold" />,
          strong: (props) => <b {...props} className="font-semibold" />,
          ul: (props) => <ul {...props} className="list-disc pl-8" />,
          ol: (props) => <ul {...props} className="list-decimal pl-8" />,
          li: (props) => <li {...props} className="my-2 text-lg" />,
        }}
      >
        {post.fields.body as string}
      </ReactMarkdown>
    </div>
  );
};
