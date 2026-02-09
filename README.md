# Example site using @wcs-mn/ee-core

## 1) Point the dependency at your core repo
In `package.json`, replace:

- `github:REPLACE_WITH_YOUR_GITHUB_OR_NPM_REF`

with something real, e.g.:

- `github:kaianolevine/eleventy-excellent-core#main`

(or publish core to npm and use a semver version)

## 2) Install + run

```bash
npm ci
npm run start
```

## How it works

- `@wcs-mn/ee-core` provides templates, layouts, and assets.
- This repo only provides site content + overrides.
- Nunjucks is configured to search:
  1) `site/src/_includes` (overrides)
  2) `node_modules/@wcs-mn/ee-core/src/_includes` (fallback)

## CSS build

`npm run build:css` compiles the core Tailwind entry file into:

- `src/assets/css/global.css`

Then Eleventy passthrough copies it to:

- `/assets/css/global.css`
