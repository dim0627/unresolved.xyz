# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Turborepo monorepo containing two Next.js websites:
- **apps/blog** — Blog at blog.unresolved.xyz (Next.js App Router, Contentful CMS, Tailwind CSS)
- **apps/yet** — Portfolio at yet.unresolved.xyz (Next.js Pages Router, GraphQL/Hygraph, Vanilla Extract CSS)
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

# GraphQL codegen (yet app only)
cd apps/yet && pnpm codegen
```

Blog dev server runs on port 3001, Yet on port 3000.

## Architecture

### Monorepo Tooling
- **pnpm** (10.12.2) workspaces with Turborepo orchestration
- **Biome** (2.1.1) for linting and formatting (single quotes, space indentation, import organization)
- **Node** 22.12.0 (`.node-version`)

### Blog App (`apps/blog`)
- Next.js App Router with dynamic `[slug]` routes
- Content fetched from Contentful CMS (`libs/contentful.ts`)
- Markdown rendered via remark/rehype pipeline with syntax highlighting
- Tailwind CSS for styling
- ISR with 60-second revalidation

### Yet App (`apps/yet`)
- Next.js Pages Router with dynamic `[slug]` routes
- Data fetched via GraphQL (graphql-request) from Hygraph
- Generated types in `src/gql/` via GraphQL Code Generator (`codegen.ts`)
- Vanilla Extract for CSS-in-JS styling
- Masonry layout with react-responsive-masonry

### Path Aliases
Both apps use TypeScript path aliases:
- `@libs` → `./libs/index.ts`
- `@components` → `./components/index.ts`
- `@styles/*` → `./styles/*`
- Blog also has `@layouts` → `./layouts/index.ts`
- Yet also has `@graphql` / `@graphql/*` → `./src/gql/`

## Environment Variables

**Blog:** `CONTENTFUL_SPACE_ID`, `CONTENTFUL_ACCESS_TOKEN`, `CONTENTFUL_PREVIEW_ENABLED`
**Yet:** `SCHEMA_PATH`, `GRAPHCMS_BEARER_TOKEN`

## CI Pipeline

GitHub Actions runs on push to main and PRs: build → syncpack lint → biome lint → test.
