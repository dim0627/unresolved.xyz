# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Turborepo monorepo containing two statically exported websites:
- **apps/blog** — Blog at blog.unresolved.xyz (Next.js App Router, local Markdown content, Tailwind CSS)
- **apps/yet** — Portfolio at yet.unresolved.xyz (Astro, static TypeScript content, Tailwind CSS)
- **packages/tsconfig** — Shared TypeScript configurations

## Common Commands

```bash
# Install dependencies
pnpm i

# Development (runs all apps)
pnpm dev

# Production build (all apps)
pnpm build

# Linting (Biome)
pnpm lint
pnpm lint:fix          # auto-fix with --write --unsafe

# Package version consistency
pnpm syncpack:lint
pnpm syncpack:fix

# Tests
pnpm test
```

Blog dev server runs on port 3001, Yet on port 3000 (set explicitly in `astro.config.mjs`; Astro's own default is 4321).

## Architecture

### Monorepo Tooling
- **pnpm** (10.12.2) workspaces with Turborepo orchestration
- **Biome** (2.1.1) for linting and formatting (single quotes, space indentation, import organization)
- **Node** 22.12.0 (`.node-version`)

### Blog App (`apps/blog`)
- Next.js App Router with dynamic `[slug]` routes
- Content managed via local Markdown files in `content/posts/` with gray-matter frontmatter
- Markdown rendered via remark/rehype pipeline with syntax highlighting
- Tailwind CSS for styling

### Yet App (`apps/yet`)
- Astro, single page, ships no client-side JavaScript
- Content managed via static TypeScript modules in `src/content/` (`profile.ts`, `projects.ts`, `careers.ts`), plus `profile-details.md` for the prose block
- Type definitions in `src/types/content.ts`
- Tailwind CSS v4 via `@tailwindcss/vite` (no PostCSS config)
- Icons come from `lucide-static`, imported as raw SVG (`...svg?raw`) and inlined at build time. Brand icons Lucide dropped in v1.x live in `src/components/brand-icons.ts`
- `build` runs `astro check` before `astro build`. `astro build` does not type-check on its own, and Biome only parses the frontmatter of an `.astro` file (never the template), so `astro check` is the only thing covering `.astro` types. Biome's unused-import/variable rules are therefore disabled for `**/*.astro` in `biome.json` — they produce nothing but false positives there
- Astro 7 renders Markdown with Sätteri, not remark/rehype. Pipeline extensions are `mdastPlugins`/`hastPlugins` passed to `satteri()` in `astro.config.mjs`; using remark/rehype plugins instead would require installing `@astrojs/markdown-remark`. Sätteri's smart punctuation is disabled there to match the previous output

### Path Aliases
Both apps use TypeScript path aliases:
- Blog: `@libs` → `./libs/index.ts`, `@components` → `./components/index.ts`, `@styles/*` → `./styles/*`, `@layouts` → `./layouts/index.ts`
- Yet: `@libs` → `./src/libs/index.ts`, `@components/*` → `./src/components/*`, `@styles/*` → `./src/styles/*`

Yet aliases components per file rather than through a barrel, because `.astro` components cannot be re-exported from an `index.ts`.

## Environment Variables

**Blog:** None (local Markdown content)
**Yet:** None (static content)

## CI Pipeline

`.github/workflows/ci.yml` runs on push to main and PRs: build → syncpack lint → biome lint → test → security audit.

The security audit runs `pnpm audit --audit-level=high --prod`. Because transitive dependencies pinned by Next.js can trip it without any direct dependency being at fault, such advisories are resolved with `pnpm.overrides` in the root `package.json`.

## Deployment

`.github/workflows/deploy.yml` runs on push to main and deploys both apps to Cloudflare Workers with `wrangler`, then notifies Slack.

Both apps build to plain static files and are served as static asset Workers, configured per app in `wrangler.jsonc` with custom domains. The build output directory differs per app and must match `assets.directory`: blog (Next.js `output: 'export'`) emits `out/`, yet (Astro) emits `dist/`. Deploys require the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets; the Slack notification requires `SLACK_WEBHOOK_URL`.
