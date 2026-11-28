# AZMACH.E

**Build Today. Lead Tomorrow.**

Official website for AZMACH.E, an Ethiopian technology company offering web development, mobile applications, business software solutions and digital experiences.

## Getting started

Requirements: Git, Node.js 24 (matching CI), pnpm 12.4.2.

```sh
git clone https://github.com/mkcoder1218/azmach.git
cd azmach
npm install --global pnpm@12.4.2
pnpm install --frozen-lockfile
pnpm nx dev web
```

Open http://localhost:3000. Configure email delivery before testing the enquiry form (see below).

## Documentation

| Guide | Contents |
| --- | --- |
| [Architecture](docs/ARCHITECTURE.md) | Workspace, stack, routes and component ownership |
| [Development](docs/DEVELOPMENT.md) | Commands, testing and contribution workflow |
| [Design system](docs/DESIGN.md) | Identity, typography, themes, animation and accessibility |
| [Contact API](docs/CONTACT_API.md) | Request contract, validation, Resend configuration and errors |
| [Deployment and security](docs/DEPLOYMENT.md) | Hosting, CI, release checklist and operational risks |

## Common commands

```sh
pnpm nx show project web
pnpm nx graph
pnpm nx run-many -t lint
pnpm nx run-many -t typecheck
pnpm nx build web
pnpm nx start web
```

Run build before start. Use a separate terminal for the development server if needed.

## Project layout

- `apps/web`: Next.js website and server-side contact endpoint.
- `apps/web-e2e`: Playwright browser tests.
- `docs`: Maintained project documentation.
- `.github/workflows/quality-security.yml`: Automated validation.

## Contact

Website enquiries: info@azmache.com. Support: support@azmache.com.

Keep documentation synchronized with changes to routes, dependencies, environment variables, visual conventions and deployment. The guides describe the checked-in implementation, not a guarantee of live hosting or email delivery.
