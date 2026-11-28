# Architecture

[Back to README](../README.md)

## Technology stack

| Layer | Implementation |
| --- | --- |
| Workspace | Nx 24.0.6, pnpm 12.4.2 |
| Application | Next.js ~16.4.1, React 19, TypeScript ~6.0.3 |
| Styles | CSS Modules, global CSS, Tailwind CSS 4 |
| Motion | GSAP 3.15.1, Lenis 1.3.25, IntersectionObserver |
| Testing | Playwright, ESLint, TypeScript |
| Email | Resend HTTP API, called only on the server |

Versions are declared ranges where applicable; the lockfile controls installed versions.

## Workspace map

| Path | Responsibility |
| --- | --- |
| `apps/web/src/app/page.tsx` | Homepage, portfolio selection and preview, story, industries, testimonials, principles and FAQ |
| `apps/web/src/app/layout.tsx` | Metadata, fonts, initial theme and shared motion |
| `apps/web/src/app/global.css` | Theme tokens, typography and global styles |
| `apps/web/src/app/page.module.css` | Homepage layout and section styling |
| `apps/web/src/app/motion.css` | Shared reveal styles |
| `apps/web/src/components/services-section.tsx` | Four services and animated SVG artwork |
| `apps/web/src/components/contact-section.tsx` | Enquiry form and contact information |
| `apps/web/src/components/desktop-navigation.tsx` | Desktop navigation |
| `apps/web/src/components/mobile-navigation.tsx` | Mobile navigation |
| `apps/web/src/components/animated-logo.tsx` | Animated brand mark |
| `apps/web/src/components/theme-switch.tsx` | Persistent light/dark mode |
| `apps/web/src/components/section-banner.tsx` | Shared section banners |
| `apps/web/src/components/ui/form-controls.tsx` | Reusable form controls |
| `apps/web/src/components/motion/` | Shared scroll and reveal behavior |
| `apps/web/public/` | Static assets and section banners |
| `apps/web/src/app/api/contact/route.ts` | Contact API |
| `apps/web-e2e/` | Browser test project |
| `nx.json` | Inferred Nx targets and workspace settings |

## Routing

The current website is a single-page experience at `/`, with section anchors including `#top`, `#services`, `#industries`, `#work`, `#testimonials`, `#about`, `#principles`, `#faqs` and `#contact`. These are not independent Next.js pages. The server endpoint is `POST /api/contact/`.

## Data and boundaries

Most marketing content is stored in typed arrays or JSX in the homepage and section components. No separate database, CMS or authentication application is present in the inspected tree. Portfolio previews use external websites; providers can prevent iframe embedding, so retain direct website links. The first project is selected initially and the preview stage is observed before display.

Enquiries flow from the form to the Next.js route, which validates the payload and calls Resend. There is no checked-in enquiry persistence layer. Keep secrets and provider calls on the server.

## Extension conventions

Reuse existing components and CSS tokens. Extract repeated behavior when needed, keep browser-dependent functionality in client components, and avoid adding a separate backend or service for simple presentation changes. Update metadata in the root layout when branding changes.
