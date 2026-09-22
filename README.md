# 0xsamarth.xyz

Personal site and blog. React + TypeScript + Vite.

```sh
pnpm install
pnpm dev       # http://localhost:5173
pnpm build     # typecheck + production build to dist/
```

## Editing

- **Intro and socials:** `src/config.ts`
- **Styles:** `src/styles.css`

## Writing a post

Add a markdown file to `src/posts/`. The filename becomes the URL: `my-post.md` → `/blog/my-post`.

```markdown
---
title: My post
date: 2026-10-01
description: Optional one-liner
draft: true        # optional; hidden in production builds
---

Content here. GitHub-flavored markdown and code highlighting work.
```

## Deploying

`vercel.json` (Vercel) and `public/_redirects` (Netlify) already set up the SPA fallback, so `/blog/*` URLs work when someone refreshes the page.
