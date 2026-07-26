# blog

Tech blog published at [blog.unresolved.xyz](https://blog.unresolved.xyz/).

Built with Astro and Tailwind CSS. Posts are local Markdown files, so there is no CMS or database to configure. The pages ship no client-side JavaScript.

## Getting Started

Install dependencies from the repository root, then start the development server:

```bash
pnpm i
pnpm dev --filter blog
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result. Running `pnpm dev` from the root starts every app in the monorepo instead.

## Content

Posts live in `src/content/posts/` as Markdown files. The file name is the slug, so `src/content/posts/hello-vitest.md` is published at `/hello-vitest`.

```yaml
---
title: "Vitest導入覚書き"
date: "2023-09-30T00:00+09:00"
tags:
  - "TIL"
draft: false
---
```

The frontmatter schema is defined as an Astro content collection in `src/content.config.ts`. `draft: true` keeps a post out of the build entirely.

A post containing a `## Table of contents` heading gets a nested list of links to its remaining headings inserted below it, matching what `remark-toc` used to do. The implementation is in `astro.config.mjs`.

## Markdown pipeline

Astro 7 renders Markdown with Sätteri rather than remark/rehype, so pipeline extensions are `mdastPlugins` / `hastPlugins` passed to `satteri()` in `astro.config.mjs`. GFM and raw HTML work out of the box, and heading IDs are added by Astro itself.

Two settings exist purely to match the output of the previous Next.js implementation:

- Smart punctuation is disabled. Sätteri enables it by default, but `react-markdown` did not convert quotes, so leaving it on would change the characters in already published posts.
- Code blocks use Shiki's `dark-plus`, the same VS Code Dark+ theme the previous `react-syntax-highlighter` setup rendered.

Line numbers in code blocks are drawn with a CSS counter in `src/styles/global.css`. Shiki has no line-number feature, and keeping them in CSS means they are not part of the text you copy.

The post list needs the body as plain text. `src/libs/excerpt.ts` parses the Markdown and flattens it, rather than stripping syntax with regular expressions. It deliberately drops code blocks and leaves GFM off, because the previous list rendering applied only `strip-markdown` and behaved the same way.

## Build

```bash
pnpm build --filter blog
```

The build emits a fully static site to `dist/`.

`build` runs `astro check` before `astro build`. `astro build` does not type-check on its own, and Biome only parses the frontmatter of an `.astro` file, never the template, so `astro check` is the only thing covering `.astro` types.

`astro.config.mjs` sets `build.format: 'file'` so pages are emitted as `<slug>.html` rather than `<slug>/index.html`. That keeps published post URLs free of the trailing-slash redirect the directory layout would introduce.

To preview that output the same way it is served in production, run:

```bash
pnpm start --filter blog
```

This runs `wrangler dev` against the built assets rather than the Astro development server.

## Dates

Post dates are formatted by `src/libs/date.ts`, pinned to `Asia/Tokyo`. Frontmatter dates carry a `+09:00` offset, and `Date#toDateString()` formats in the build machine's local timezone, so it rendered dates one day early whenever the build ran in UTC — which CI does. Pinning the zone makes the build output identical regardless of where it runs.

## Deployment

Deployment is handled by Cloudflare Workers as a static asset Worker, configured in `wrangler.jsonc` and served at the `blog.unresolved.xyz` custom domain.

Pushing to `main` triggers the `Deploy` GitHub Actions workflow, which builds every app and deploys them with `wrangler`. There is no manual deploy step in the normal flow.

## Learn More

- [Astro Documentation](https://docs.astro.build/)
- [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/)
