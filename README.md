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

Pushing to `main` runs `.github/workflows/ci-cd.yml`. The build job typechecks and builds `dist/`; the deploy job rsyncs it to `<DEPLOY_PATH>/releases/<sha>`, then atomically points the `current` symlink at that release. The last 5 releases are kept, so rolling back is pointing `current` at an older release.

GitHub repository secrets:

| Secret | Required | Default |
| ------ | -------- | ------- |
| `HOST` | yes | — |
| `USER` | yes | — |
| `SSH_KEY` | yes | — (private key) |
| `SSH_PORT` | no | `22` |
| `DEPLOY_PATH` | no | `/home/vizz/0xsamarth.xyz` |

Optional repository variable `SITE_URL` overrides the post-deploy smoke-test URL (defaults to `http://$HOST/`).

nginx serves `current/` using `deploy/nginx.conf`. One-time server setup (DNS, packages, deploy key, nginx, HTTPS) is in [`deploy/SETUP.md`](deploy/SETUP.md). `vercel.json` and `public/_redirects` are only needed if you host on Vercel or Netlify.
