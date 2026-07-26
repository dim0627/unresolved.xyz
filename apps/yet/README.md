# yet

Portfolio site published at [yet.unresolved.xyz](https://yet.unresolved.xyz/).

A single page built with Next.js (App Router) and Tailwind CSS. All content is checked into the repository, so there is no CMS or database to configure.

## Getting Started

Install dependencies from the repository root, then start the development server:

```bash
pnpm i
pnpm dev --filter yet
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Running `pnpm dev` from the root starts every app in the monorepo instead.

## Content

The page is driven by the static content modules in `content/`:

- `profile.ts` — profile and introduction
- `projects.ts` — project list
- `careers.ts` — work history

Their shapes are defined in `types/content.ts`. Editing these files is all that is needed to update the site.

## Build

```bash
pnpm build --filter yet
```

The app is configured with `output: 'export'`, so the build emits a fully static site to `out/`.

To preview that output the same way it is served in production, run:

```bash
pnpm start --filter yet
```

This runs `wrangler dev` against the built assets rather than the Next.js development server.

## Deployment

Deployment is handled by Cloudflare Workers as a static asset Worker, configured in `wrangler.jsonc` and served at the `yet.unresolved.xyz` custom domain.

Pushing to `main` triggers the `Deploy` GitHub Actions workflow, which builds every app and deploys them with `wrangler`. There is no manual deploy step in the normal flow.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/)
