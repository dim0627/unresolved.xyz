# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Turborepo monorepo containing two Next.js websites:
- **apps/blog** — Blog at blog.unresolved.xyz (Next.js App Router, local Markdown content, Tailwind CSS)
- **apps/yet** — Portfolio at yet.unresolved.xyz (Next.js App Router, static TypeScript content, Tailwind CSS)
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

Blog dev server runs on port 3001, Yet on port 3000.

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
- Next.js App Router (single page portfolio)
- Content managed via static TypeScript modules in `content/` (`profile.ts`, `projects.ts`, `careers.ts`)
- Type definitions in `types/content.ts`
- Tailwind CSS for styling

### Path Aliases
Both apps use TypeScript path aliases:
- `@libs` → `./libs/index.ts`
- `@components` → `./components/index.ts`
- `@styles/*` → `./styles/*`
- Blog also has `@layouts` → `./layouts/index.ts`

## Environment Variables

**Blog:** None (local Markdown content)
**Yet:** None (static content)

## CI Pipeline

`.github/workflows/ci.yml` runs on push to main and PRs: build → syncpack lint → biome lint → test → security audit.

The security audit runs `pnpm audit --audit-level=high --prod`. Because transitive dependencies pinned by Next.js can trip it without any direct dependency being at fault, such advisories are resolved with `pnpm.overrides` in the root `package.json`.

## Deployment

`.github/workflows/deploy.yml` runs on push to main and deploys both apps to Cloudflare Workers with `wrangler`, then notifies Slack.

Both apps use `output: 'export'` and are served as static asset Workers, configured per app in `wrangler.jsonc` with custom domains. Deploys require the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets; the Slack notification requires `SLACK_WEBHOOK_URL`.
