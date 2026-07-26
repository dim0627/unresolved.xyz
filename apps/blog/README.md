# blog

Tech blog published at [blog.unresolved.xyz](https://blog.unresolved.xyz/).

Built with Next.js (App Router) and Tailwind CSS. Posts are local Markdown files, so there is no CMS or database to configure.

## Getting Started

Install dependencies from the repository root, then start the development server:

```bash
pnpm i
pnpm dev --filter blog
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result. Running `pnpm dev` from the root starts every app in the monorepo instead.

## Content

Posts live in `content/posts/` as Markdown files with gray-matter frontmatter. Adding a file is enough to publish a post — routes are generated from the filename via the `[slug]` dynamic route, and Markdown is rendered through a remark/rehype pipeline with syntax highlighting.

## Build

```bash
pnpm build --filter blog
```

The app is configured with `output: 'export'`, so the build emits a fully static site to `out/`.

To preview that output the same way it is served in production, run:

```bash
pnpm start --filter blog
```

This runs `wrangler dev` against the built assets rather than the Next.js development server.

## Deployment

Deployment is handled by Cloudflare Workers as a static asset Worker, configured in `wrangler.jsonc` and served at the `blog.unresolved.xyz` custom domain.

Pushing to `main` triggers the `Deploy` GitHub Actions workflow, which builds every app and deploys them with `wrangler`. There is no manual deploy step in the normal flow.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/)
