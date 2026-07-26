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

Both apps are Astro and ship no client-side JavaScript. Points that apply to both:
- Tailwind CSS v4 via `@tailwindcss/vite` (no PostCSS config)
- `build` runs `astro check` before `astro build`. `astro build` does not type-check on its own, and Biome only parses the frontmatter of an `.astro` file (never the template), so `astro check` is the only thing covering `.astro` types. Biome's unused-import/variable rules are therefore disabled for `**/*.astro` in `biome.json` — they produce nothing but false positives there
- Astro 7 renders Markdown with **Sätteri**, not remark/rehype. Pipeline extensions are `mdastPlugins`/`hastPlugins` passed to `satteri()` in `astro.config.mjs`; using remark/rehype plugins instead would require installing `@astrojs/markdown-remark`. Sätteri's smart punctuation is disabled in both apps to match the pre-migration output
- A hast/mdast plugin object is reused across documents, so per-document state must live in `ctx.data` (fresh per compile), never in a closure variable

### Blog App (`apps/blog`)
- Astro with a dynamic `[slug]` route; posts are Markdown in `src/content/posts/`, typed as an Astro content collection in `src/content.config.ts`
- `build.format: 'file'` emits `<slug>.html` instead of `<slug>/index.html`, so published post URLs keep working without a trailing-slash redirect
- `## Table of contents` headings get a nested link list inserted by the hast plugin in `astro.config.mjs` (replaces `remark-toc`). It assigns heading IDs itself with `github-slugger`, because Astro's own heading-ID plugin runs *after* user plugins and honours IDs that already exist
- Syntax highlighting is Shiki's `dark-plus`; code-block line numbers are a CSS counter in `src/styles/global.css` (Shiki has no line-number feature)
- `src/libs/excerpt.ts` turns post bodies into plain text for the index. It drops code blocks and disables GFM on purpose — the previous list rendering applied only `strip-markdown` and behaved that way
- Post dates are formatted by `src/libs/date.ts`, pinned to `Asia/Tokyo`. Do not go back to `toDateString()` — it formats in the build machine's local timezone, which made CI (UTC) render dates a day earlier than the `+09:00` frontmatter intends

### Yet App (`apps/yet`)
- Astro, single page
- Content managed via static TypeScript modules in `src/content/` (`profile.ts`, `projects.ts`, `careers.ts`), plus `profile-details.md` for the prose block
- Type definitions in `src/types/content.ts`
- Icons come from `lucide-static`, imported as raw SVG (`...svg?raw`) and inlined at build time. Brand icons Lucide dropped in v1.x live in `src/components/brand-icons.ts`

### Path Aliases
Both apps use the same TypeScript path aliases:
- `@libs` → `./src/libs/index.ts`
- `@components/*` → `./src/components/*`
- `@layouts/*` → `./src/layouts/*` (blog only)
- `@styles/*` → `./src/styles/*`

Components are aliased per file rather than through a barrel, because `.astro` components cannot be re-exported from an `index.ts`.

## Environment Variables

**Blog:** None (local Markdown content)
**Yet:** None (static content)

## CI Pipeline

`.github/workflows/ci.yml` runs on push to main and PRs: build → syncpack lint → biome lint → test → security audit.

The security audit runs `pnpm audit --audit-level=high --prod`. Transitive dependencies can trip it without any direct dependency being at fault; such advisories are resolved with `pnpm.overrides` in the root `package.json`.

## Deployment

`.github/workflows/deploy.yml` runs on push to main and deploys both apps to Cloudflare Workers with `wrangler`, then notifies Slack.

Both apps build to plain static files in `dist/` and are served as static asset Workers, configured per app in `wrangler.jsonc` with custom domains (`assets.directory` must match the build output). `not_found_handling: "404-page"` expects a `dist/404.html`, which Astro only emits if `src/pages/404.astro` exists. Deploys require the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets; the Slack notification requires `SLACK_WEBHOOK_URL`.
