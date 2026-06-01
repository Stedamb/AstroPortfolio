---
title: Codebase Audit & Cleanup
type: refactor
date: 2026-06-01
---

# Codebase Audit & Cleanup

## Overview

Comprehensive audit of the AstroPortfolio codebase to fix best-practice issues, remove dead code, tighten TypeScript/Dependency configs, improve developer experience, and resolve potential bugs. Covers 6 categories across ~25 findings.

## Categories

- [ ] **Dependency Hygiene** — Remove unused packages, move types to devDeps, fix dual lockfiles
- [ ] **TypeScript Config** — Fix deprecated/unoptimal tsconfig options
- [ ] **Build & Linting** — Fix build script redundancy, ESLint config, dead ESLint file
- [ ] **Dead Code Removal** — Delete unused components, files, and logic
- [ ] **Bug Fixes** — Fix video MIME type, canonical URL redundancy, duplicate GTM logic
- [ ] **Developer Experience** — Extract glass card utility, add 404 page, organize routes data, rename confusing imports

---

## Phase 1: Dependency Hygiene

### 1.1 Remove unused runtime dependencies

These packages are in `dependencies` (or `devDependencies`) but are never imported:

| Package | Reason | Location |
|---------|--------|----------|
| `@astrojs/node` | Vercel adapter is used, not Node | `package.json:16` |
| `autoprefixer` | Tailwind v4 handles prefixes natively | `package.json:29` |
| `lucide-astro` | All icons use `lucide-react` | `package.json:34` |
| `mapbox` | Not imported anywhere; map is static SVG | `package.json:36` |
| `mapbox-gl` | Same as above | `package.json:37` |
| `react-google-reviews` | Not imported anywhere | `package.json:42` |
| `embla-carousel-autoplay` | Imported in deps but never used in `carousel.tsx` | `package.json:32` |
| `vaul` | Not imported anywhere | `package.json:47` |

### 1.2 Move type packages to devDependencies

| Package | Current | Target |
|---------|---------|--------|
| `@types/nodemailer` | `dependencies` | `devDependencies` |
| `@types/react` | `dependencies` | `devDependencies` |
| `@types/react-dom` | `dependencies` | `devDependencies` |
| `@astrojs/check` | `dependencies` | `devDependencies` |

### 1.3 Remove dual lockfiles

`package-lock.json` exists alongside `pnpm-lock.yaml`. Delete `package-lock.json` (project uses pnpm).

### 1.4 Potential security concern: `mapbox` package

The `mapbox` package at version `1.0.0-beta10` (`package.json:36`) does not match the official Mapbox npm package (which is published under `@mapbox/*` scoped packages). This may be a typosquatting/malware package. Verify and remove regardless.

Reference: https://www.npmjs.com/package/mapbox

**Verification command:**
```bash
pnpm why mapbox && npm view mapbox
```

---

## Phase 2: TypeScript Configuration

### 2.1 Fix `moduleResolution`

`tsconfig.json:13` — Change `"node"` to `"bundler"` for correct ESM resolution with Vite/Astro.

```json
// tsconfig.json:13
"moduleResolution": "bundler",
```

### 2.2 Replace `importsNotUsedAsValues`

`tsconfig.json:8` — This option is deprecated in TS 5.5+. Replace with `verbatimModuleSyntax`.

```json
// tsconfig.json (remove line 8, add after strict: true)
"verbatimModuleSyntax": true,
```

### 2.3 Remove redundant `skipLibCheck`

`tsconfig.json:6` — Already included in `astro/tsconfigs/strict`. Safe to remove.

### 2.4 Update `env.d.ts` Route interface

`src/env.d.ts:1-5` — The `Route` interface defines `path` and `label` properties but `routes/routes.ts` uses `name` and `href`. Either:
- Update the interface to match actual usage, or
- Delete it entirely (it's never imported anywhere)

### 2.5 Verify `includes` pattern

`tsconfig.json:22` — `**/*.astro/types.d.ts` may not catch all Astro-generated type files in v6. Check if this matches the current Astro v6 type output.

---

## Phase 3: Build & Linting

### 3.1 Fix build script

`package.json:8` — `tsc --noEmit` is redundant with `astro check` (both check types). Remove it.

```json
"build": "astro check && astro build",
```

Optionally separate check from build for faster local iterations:
```json
"check": "astro check",
"build": "astro check && astro build",
```

### 3.2 Fix ESLint config

`./.eslintrc` is actually a Prettier config file with the wrong name:
- Keys are `singleQuote`, `trailingComma`, `arrowParens`, etc. — Prettier options, not ESLint.
- ESLint silently ignores all keys and enforces nothing.
- Settings partially conflict with `.prettierrc` (`printWidth: 120` vs `printWidth: 100`).

Options:
- **Remove** `./eslintrc` entirely (Prettier settings are in `.prettierrc`)
- OR install `eslint-plugin-astro` and write a proper ESLint config

### 3.3 Consider adding `@astrojs/sitemap`

Not installed. For a portfolio on Vercel with SSR, sitemaps help SEO. Add:

```bash
pnpm add @astrojs/sitemap
```

```js
// astro.config.mjs
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.stedamb.it',
  integrations: [react(), sitemap()],
});
```

---

## Phase 4: Dead Code Removal

### 4.1 Remove unused component files

| File | Reason |
|------|--------|
| `src/components/Loader.astro` | Never imported anywhere |
| `src/components/ui/card.tsx` | Exports never imported |
| `src/components/ui/skeleton.tsx` | Exports never imported |
| `src/components/ui/carousel.tsx` | Exports never imported |
| `src/lib/animations.ts` | `setupAnimations` / `animateElement` never imported |

### 4.2 Remove unused library files

| File | Reason |
|------|--------|
| `src/env.d.ts` | `Route` interface types don't match actual usage; never imported |

---

## Phase 5: Bug Fixes

### 5.1 Fix video MIME type

`src/components/Hero.astro:9` — Source is `.webm` but declared as `type="video/mp4"`.

```astro
<source src="/assets/waves.webm" type="video/webm" />
```

### 5.2 Deduplicate GTM loading code

`src/components/seo/CookieConsent.astro` — The `window.__loadGTM` function is defined twice:
- Lines 74-87: SSR-side `script is:inline` block (when `cookieConsent === 'accepted'`)
- Lines 160-170: In the client-side fallback block

Extract a single `__loadGTM` definition.

### 5.3 Remove redundant canonical variable

`src/layouts/Layout.astro:25` — `const canonical = canonicalURL || new URL(...)` is always identical to the destructured default on line 21. Use `canonicalURL` directly.

---

## Phase 6: Developer Experience

### 6.1 Add 404 page

Create `src/pages/404.astro` with the same glass-card aesthetic and a "back home" link.

```astro
---
import Layout from '@/layouts/Layout.astro';
---

<Layout title="404 - Page Not Found">
  <section class="flex min-h-svh flex-col items-center justify-center">
    <h1 class="font-serif text-6xl italic">404</h1>
    <p class="mt-4 text-foreground/70">Page not found</p>
    <a href="/" class="mt-8 ...">Go back home</a>
  </section>
</Layout>
```

### 6.2 Extract glass card CSS utility

The pattern `rounded-lg border border-white/12.5 bg-white/5 transition-colors duration-200 hover:bg-white/10` is repeated ~16 times across 5 files.

Add a `@utility` in `src/styles/globals.css`:

```css
@utility card-glass {
  @apply rounded-lg border border-white/12.5 bg-white/5 transition-colors duration-200 hover:bg-white/10;
}
```

Or use `@apply` in a selector. Then refactor components to use it.

### 6.3 Fix `button.tsx` glass variant

`src/components/ui/button.tsx:20` — `bg-linear-to-br` has no gradient stops:

```ts
glass: 'bg-linear-to-br bg-white/5 ...'
```

Either remove `bg-linear-to-br` or add stops (e.g., `from-white/5 to-transparent`).

### 6.4 Rename confusing import

`src/components/Hero.astro:3` — `import AnimatedSocials from '@/components/react/AnimatedButtons'` but the file exports `AnimatedButtons`.

```astro
import AnimatedButtons from '@/components/react/AnimatedButtons';
```

### 6.5 Move routes data file

`src/routes/routes.ts` is non-standard. Consider moving to `src/lib/routes.ts` or `src/data/routes.ts`.

### 6.6 Optimize `client:load` usage

7 occurrences of `client:load` in the project. Consider downgrading non-critical hydration:
- `Toaster` → `client:visible`
- `AnimatedText` (Hero) → `client:idle`

---

## Future Considerations

- **CSS animations over motion/react**: Hero text animations use React islands (`client:load`) for letter-by-letter animation. CSS `@keyframes` with `animation-delay` could achieve the same effect with zero JS.
- **Content collections**: Project and tech data is hardcoded in components. `src/content/` with Astro collections would be cleaner for growth.
- **Vercel image optimization**: Configure `@astrojs/vercel` image service for optimized `<Image />` output.
- **Lighthouse audit**: After fixes, run a performance audit to verify improvements.

---

## References

### Internal Files

- `package.json` — Dependency list, build script
- `tsconfig.json` — TypeScript compiler options
- `src/layouts/Layout.astro:25` — Redundant canonical variable
- `src/components/Hero.astro:9` — Wrong video MIME type
- `src/components/seo/CookieConsent.astro` — Duplicate GTM loading
- `src/components/ui/button.tsx:20` — Broken glass variant
- `src/env.d.ts` — Dead Route interface
- `src/routes/routes.ts` — Non-standard file location
- `.eslintrc` — Wrong file type (actually Prettier config)

### Best Practices

- Astro islands architecture: https://docs.astro.build/en/guides/islands/
- Tailwind v4 utility patterns: https://tailwindcss.com/v4/docs/adding-custom-styles
- Astro sitemap integration: https://docs.astro.build/en/guides/integrations-guide/sitemap/
