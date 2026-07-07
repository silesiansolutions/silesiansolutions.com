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
