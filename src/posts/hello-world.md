---
title: Hello, world
date: 2026-09-23
description: The first post on this site.
---

Welcome to my blog. This post lives in `src/posts/hello-world.md`, and so the URL is `/blog/hello-world`.

## Writing a post

Create a new `.md` file in `src/posts/` with some frontmatter at the top:

```markdown
---
title: My new post
date: 2026-10-01
description: Optional one-liner.
---

Your content here.
```

Add `draft: true` to hide a post in production (it still shows while running `npm run dev`).

## Markdown support

You get **bold**, *italics*, [links](https://example.com), lists, tables, and code:

```js
function greet(name) {
  return `hello, ${name}`
}
```

> Blockquotes work too.

| Feature | Supported |
| ------- | --------- |
| Tables  | yes       |
| Code    | yes       |

- [x] Task lists
- [ ] Also work
