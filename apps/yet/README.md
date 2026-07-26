# yet

Portfolio site published at [yet.unresolved.xyz](https://yet.unresolved.xyz/).

A single page built with Astro and Tailwind CSS. All content is checked into the repository, so there is no CMS or database to configure. The page ships no client-side JavaScript.

## Getting Started

Install dependencies from the repository root, then start the development server:

```bash
pnpm i
pnpm dev --filter yet
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Running `pnpm dev` from the root starts every app in the monorepo instead.

## Content

The page is driven by the static content modules in `src/content/`:

- `profile.ts` — profile fields (name, thumbnail, social links)
- `profile-details.md` — the introduction rendered below the profile
- `projects.ts` — project list
- `careers.ts` — work history

Their shapes are defined in `src/types/content.ts`. Editing these files is all that is needed to update the site.

Icons come from `lucide-static`, imported as raw SVG (`lucide-static/icons/<name>.svg?raw`) and inlined at build time. Brand icons that Lucide dropped in v1.x live in `src/components/brand-icons.ts`.

## Build

```bash
pnpm build --filter yet
```

The build emits a fully static site to `dist/`.

`build` runs `astro check` before `astro build`. `astro build` does not type-check on its own, so this keeps the gate that `next build` used to provide: type errors in `.astro` files fail the build. Biome cannot cover this, because it only parses the frontmatter of an `.astro` file and never sees the template.

To preview that output the same way it is served in production, run:

```bash
pnpm start --filter yet
```

This runs `wrangler dev` against the built assets rather than the Astro development server.

## Deployment

Deployment is handled by Cloudflare Workers as a static asset Worker, configured in `wrangler.jsonc` and served at the `yet.unresolved.xyz` custom domain.

Pushing to `main` triggers the `Deploy` GitHub Actions workflow, which builds every app and deploys them with `wrangler`. There is no manual deploy step in the normal flow.

## Learn More

- [Astro Documentation](https://docs.astro.build/)
- [Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/)
