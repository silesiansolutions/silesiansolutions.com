# silesiansolutions.com

[![CD](https://github.com/silesiansolutions/silesiansolutions.com/actions/workflows/cd.yml/badge.svg)](https://github.com/silesiansolutions/silesiansolutions.com/actions/workflows/cd.yml)
[![CI](https://github.com/silesiansolutions/silesiansolutions.com/actions/workflows/ci.yml/badge.svg)](https://github.com/silesiansolutions/silesiansolutions.com/actions/workflows/ci.yml)
[![CodeQL](https://github.com/silesiansolutions/silesiansolutions.com/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/silesiansolutions/silesiansolutions.com/actions/workflows/github-code-scanning/codeql)

Static company website built with Astro and React islands. Content remains in `content/` as JSON and Markdown; Astro generates the production site in `dist/`.

## Development

```bash
pnpm install
pnpm develop
```

## Verification

```bash
pnpm type-check
pnpm lint
pnpm format:check
pnpm test
pnpm build
pnpm check:build
```

The build contract verifies the 44 routes inherited from the Gatsby site together with canonical URLs, social metadata, JSON-LD, sitemap, robots and the web manifest.

`pnpm check:structured-data` validates every generated JSON-LD block and the relationships between the canonical `ProfessionalService`, `WebSite`, page, breadcrumb, `BlogPosting` and `Service` nodes. CI and CD both run this gate against the final `dist/` output. Google discovers updates through the sitemap declared in `robots.txt`; the Indexing API is intentionally not used because these pages are neither job postings nor livestream events.
