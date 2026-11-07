# jagnyesh.github.io

The source for [jagnyesh.github.io](https://jagnyesh.github.io), my personal site: projects, posts, résumé, and contact details. It is an [Astro](https://astro.build) static site. GitHub Actions builds it and deploys it to GitHub Pages on every push to `main`.

## Run it locally

You need Node.js 22.23.4 or later.

```bash
npm ci
npm run dev
```

The dev server prints its address, usually `http://localhost:4321`. Drafts show under `npm run dev` and never ship in a build.

## Write a post

Add a Markdown file to `src/content/posts/`. The file name becomes the URL, so `src/content/posts/why-fhir.md` publishes at `/posts/why-fhir/`.

```markdown
---
title: Why FHIR mapping standards exist
description: One sentence for the post list, the home page card, and the RSS feed.
pubDate: 2026-11-07
featured: false
draft: true
---

The post body, in Markdown.
```

Set `featured: true` to put the post in the **Start here** grid on the home page. Set `draft: false` when the post is ready. The **Posts** link in the header and the post sections on the home page appear once at least one post is published.

## Edit the other pages

- `src/data/projects.ts` holds the project cards on the home page and the projects page.
- `src/data/resume.ts` holds the résumé. It is transcribed from the résumé document, without the phone number. Change both when either one changes.
- `src/consts.ts` holds the site title, the description, and the contact links.

## Checks

The deploy workflow runs these on every push and pull request. A failure stops the deploy.

| Command | What it checks |
|---|---|
| `npm run check` | Types in `.astro` and `.ts` files, and post front matter against the schema in `src/content.config.ts` |
| `npm run build` | Builds the site into `dist/` |
| `npm run check:links` | Fails when a built page links to a local path that the build did not produce. It does not fetch external links. |
