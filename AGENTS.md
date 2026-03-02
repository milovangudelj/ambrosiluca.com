# AGENTS.md

This file provides guidance for AI coding agents working in this repository.

## Project Overview

Personal website for Luca Ambrosi. **Turborepo monorepo** with a single Next.js app.
Built with **Next.js 16** (App Router), **React 19**, **TypeScript** (strict mode),
**Tailwind CSS v4**, and the **React Compiler**. Package manager is **Bun**.

## Monorepo Structure

```
turbo.json                          # Turborepo task configuration
package.json                        # Root — workspaces, turbo scripts, packageManager
apps/
  web/                              # Next.js web application (@repo/web)
    app/                            # App Router — pages, layouts, route handlers
      layout.tsx                    # Root layout
      page.tsx                      # Home page
      globals.css                   # Global styles (Tailwind v4 import)
    next.config.ts                  # Next.js config (React Compiler enabled)
    tsconfig.json                   # Extends @repo/typescript-config/nextjs.json
    eslint.config.mjs               # Re-exports @repo/eslint-config/next
    postcss.config.mjs              # PostCSS (Tailwind v4 plugin)
    package.json                    # App dependencies and scripts
packages/
  typescript-config/                # Shared TypeScript configs (@repo/typescript-config)
    base.json                       # Base tsconfig (strict, bundler resolution)
    nextjs.json                     # Next.js tsconfig (extends base)
  eslint-config/                    # Shared ESLint configs (@repo/eslint-config)
    next.mjs                        # Next.js ESLint config (core-web-vitals + TS)
```

Internal packages use the `@repo/` namespace and `workspace:*` protocol.

## Build / Lint / Dev Commands

All commands are run from the **repository root** via Turborepo:

```bash
bun run dev            # Start all apps in dev mode
bun run build          # Production build (all packages, catches type errors)
bun run lint           # Run ESLint across all packages
bun run check-types    # Run tsc --noEmit across all packages
```

### Filtering to a single app/package

```bash
bunx turbo run build --filter=@repo/web       # Build only the web app
bunx turbo run lint --filter=@repo/web         # Lint only the web app
```

### Running scripts directly in a package

```bash
bun run --cwd apps/web dev         # Next.js dev server directly
bun run --cwd apps/web build       # Next.js build directly
bun run --cwd apps/web check-types # tsc --noEmit in web app
```

### Testing

No test framework is currently configured. If one is added (e.g. Vitest), add a
`test` task to `turbo.json` and a `test` script to the relevant `package.json`.

### Formatting

No Prettier or formatter is configured. Follow the code style conventions below.

## Code Style Guidelines

### TypeScript

- **Strict mode is enabled.** Do not use `any` — prefer `unknown` and narrow types.
- Use `import type { ... }` for type-only imports. Never mix type and value imports.
- Annotate exported values: `export const metadata: Metadata = { ... }`.
- Annotate config/module-level variables with their types.
- Use `Readonly<{ ... }>` for component props to enforce immutability.
- Use `React.ReactNode` for children prop types.

### Imports

- **Type imports first**, then value imports, then side-effect imports (e.g. CSS).
- Use **named imports** — avoid default imports from libraries where possible.
- Within `apps/web`, use the **`~/` path alias** (maps to `apps/web/*` in tsconfig).
  Prefer `~/components/Button` over `../../components/Button`.
- Import from internal packages by name: `import { ... } from "@repo/package-name"`.
- Import CSS files with side-effect import: `import "./globals.css"`.

### Formatting

- **2-space indentation** (no tabs).
- **Double quotes** for all strings (`"`, not `'`).
- **Semicolons** — always.
- **Trailing commas** in objects, arrays, function parameters.
- **Parentheses around JSX** in return statements.
- **LF line endings** (Unix-style).
- Files end with a single newline.

### Naming Conventions

| Kind                   | Convention    | Example                          |
|------------------------|---------------|----------------------------------|
| Components             | PascalCase    | `RootLayout`, `UserProfile`      |
| Functions / variables  | camelCase     | `getUserData`, `isLoading`       |
| Constants (module)     | camelCase     | `const metadata: Metadata = ...` |
| Types / Interfaces     | PascalCase    | `type UserProps = { ... }`       |
| File names (routes)    | lowercase     | `page.tsx`, `layout.tsx`         |
| File names (components)| PascalCase    | `UserProfile.tsx`                |
| CSS files              | camelCase     | `globals.css`                    |
| Directories            | lowercase     | `components`, `lib`, `utils`     |
| Internal packages      | @repo/ prefix | `@repo/web`, `@repo/ui`         |

### React / Next.js Patterns

- **Server Components by default.** Only add `"use client"` when the component needs
  browser APIs, event handlers, or React hooks (`useState`, `useEffect`, etc.).
- Define components as **function declarations** with `export default`:
  ```tsx
  export default function Home() {
    return <main>...</main>;
  }
  ```
- Do NOT use arrow functions for page/layout component exports.
- Props are destructured inline with a `Readonly<>` wrapper:
  ```tsx
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) { ... }
  ```
- The **React Compiler** is enabled (`next.config.ts` → `reactCompiler: true`).
  Avoid manual `useMemo`/`useCallback`/`React.memo` — the compiler handles memoization.
- Use Next.js App Router conventions: `page.tsx`, `layout.tsx`, `loading.tsx`,
  `error.tsx`, `not-found.tsx`, `route.ts`.

### Tailwind CSS

- Tailwind CSS v4 with the `@import "tailwindcss"` syntax in `globals.css`.
- Apply styles via **utility classes** directly in JSX. Avoid custom CSS unless necessary.
- No CSS Modules or CSS-in-JS — use Tailwind utilities and `globals.css` only.

### Error Handling

- Use Next.js `error.tsx` boundaries for route-level error handling.
- Use `not-found.tsx` for 404 pages.
- In server actions and API routes, use try/catch and return typed error responses.
- Never silently swallow errors — always log or surface them.

### ESLint

Shared ESLint 9 flat config lives in `packages/eslint-config/next.mjs` and extends:
- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`

Each app re-exports it (e.g. `apps/web/eslint.config.mjs`).

## Configuration Notes

- **Turborepo**: `turbo.json` defines `build`, `dev`, `lint`, `check-types` tasks.
- **Workspaces**: `apps/*` and `packages/*` (declared in root `package.json`).
- **Path alias**: `~/*` → `./*` scoped to `apps/web/tsconfig.json`.
- **React Compiler**: Enabled — do not manually memoize.
- **PostCSS**: `@tailwindcss/postcss` for Tailwind v4 (per-app config).
- **No Prettier** — rely on consistent manual formatting per the rules above.
- **No CI/CD** — no GitHub Actions, Docker, or deployment config yet.

## Git Conventions

- Do not commit `.next/`, `.turbo/`, `node_modules/`, `out/`, or `build/` directories.
- Do not modify `next-env.d.ts` — it is auto-generated.
- Run `bun run lint` and `bun run build` from the root before committing.
