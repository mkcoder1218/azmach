# Deployment and security

[Back to README](../README.md)

## Production build

From repository root with Node.js 24 and pnpm 12.4.2:

```sh
pnpm install --frozen-lockfile
pnpm nx build web
pnpm nx start web
```

The application requires a Next.js server-capable hosting environment for the contact endpoint. A static-only export would not preserve that server functionality. Next.js config enables strict mode and trailing slashes, disables the powered-by header and production browser source maps, and uses unoptimized images.

## Hosting

For a Vercel deployment, import the GitHub repository, select the Next.js application at apps/web, retain monorepo dependency access and the pnpm lockfile, and set Node.js 24 where available. Configure RESEND_API_KEY and CONTACT_FROM_EMAIL as server-side environment variables. Confirm framework build settings and run a preview deployment before promoting to production.

For a self-hosted deployment, run the production server with a process supervisor and an HTTPS reverse proxy. Preserve the request host/origin so contact validation works. Do not expose the internal application port directly to the internet.

These are deployment instructions, not a verified record of a currently running environment. No hosting configuration file or deployment workflow is present in the inspected repository tree.

## Continuous integration

The Quality and security workflow runs on pushes and pull requests targeting main and manual dispatch. It uses ubuntu-latest, Node.js 24, pinned pnpm and pinned action SHAs, with read-only repository permissions. It installs frozen dependencies, runs lint, typecheck, production build and two dependency audits (all dependencies and production only) at low severity. It does not currently execute Playwright or deploy the website.

## Release checklist

- Confirm the intended commit and branch.
- Pass lint, typecheck and production build; run browser tests separately.
- Configure secrets on the host, never in public source.
- Check HTTPS, navigation, both themes, responsive layout and reduced motion.
- Submit a controlled test enquiry and confirm inbox delivery.
- Confirm external project links and preview fallbacks.
- Keep the previous working release available for rollback.

## Known maintenance items

- Root .gitignore does not explicitly cover environment files; protect local secrets and consider adding shared ignore rules.
- Nx defaultBase is master although the active branch is main.
- The contact route has no built-in rate limiting or durable delivery mechanism.
- An existing browser assertion appears out of sync with the current about heading.
- CI currently lacks browser-test execution and deployment automation.

These are documented observations, not changes made to application behavior. Evaluate fixes separately and never assume an untested deployment is healthy.
