# Development guide

[Back to README](../README.md)

## Local setup

Use Node.js 24 and the pinned pnpm version. From the repository root:

```sh
npm install --global pnpm@12.4.2
pnpm install --frozen-lockfile
pnpm nx dev web
```

Use the URL printed by Nx (normally http://localhost:3000). See [Contact API](CONTACT_API.md) for local server environment setup.

## Nx commands

```sh
pnpm nx show project web
pnpm nx show project web-e2e
pnpm nx graph
pnpm nx run-many -t lint --parallel=1 --skip-nx-cache
pnpm nx run-many -t typecheck --parallel=1 --skip-nx-cache
pnpm nx run web:build --skip-nx-cache
pnpm nx start web
```

Nx infers targets through Next.js, TypeScript, ESLint and Playwright plugins. The root package currently has no custom npm scripts. The repository branch is main, but nx.json currently specifies master as defaultBase; supply an explicit base/head when using affected commands, for example:

```sh
pnpm nx affected -t lint --base=origin/main --head=HEAD
```

## Browser tests

```sh
pnpm exec playwright install
pnpm nx e2e web-e2e
```

On Linux CI hosts use `pnpm exec playwright install --with-deps` if browser system dependencies are missing. Playwright config uses Chromium, Firefox and WebKit and starts the dev server locally or the production server in CI. Build first when CI mode is enabled. BASE_URL can override navigation URLs, but the existing webServer configuration still starts or reuses a local server.

Existing coverage includes homepage identity, mobile overflow, desktop navigation, active section tracking, service cards, repeatable reveal motion, reduced-motion preferences and saved theme selection. The homepage test currently expects an about heading named “Built with purpose.” while the page uses “Our Story”; reconcile this assertion with the intended content before treating the suite as green.

## Development checklist

- Keep changes scoped and use reusable components.
- Test desktop and narrow mobile layouts, keyboard navigation and both themes.
- Check motion in both scroll directions and with reduced motion enabled.
- Run lint, typecheck, production build and relevant browser tests.
- Update documentation when changing configuration, behavior or design.
- Do not commit secrets, local credentials or generated output.

## Troubleshooting

If Nx caching or daemon state is suspect, run `pnpm nx reset` and retry the failed task with `--skip-nx-cache`. If build fails while fetching Google fonts, check build-time network access; the root layout imports fonts through next/font/google. For contact failures, use the documented API status codes rather than exposing provider diagnostics.
