# Design system and identity

[Back to README](../README.md)

## Direction

AZMACH.E uses an architectural, cinematic and editorial technology aesthetic. Favor clear visual hierarchy, intentional negative space, abstract technical artwork and restrained red accents. Reuse the actual brand mark and existing animated-logo component; do not substitute an unrelated logo.

## Typography

Global CSS sets Arial for headings and Helvetica (with Arial fallback) for body text, buttons and form controls. The root layout also loads Inter and Space Grotesk; existing specialized styles may reference their variables. Check the component before changing a font globally.

## Theme tokens

Current website values from global.css:

| Token | Light | Dark |
| --- | --- | --- |
| Background | #f5f3ef | #141414 |
| Foreground | #171717 | #f4f1ed |
| Accent | #b91c1c | #f05252 |
| Muted | #595955 | #b7b2ac |
| Line | #d4d0ca | #393633 |
| Surface | #faf9f7 | #191919 |
| Raised surface | #eae7e2 | #292725 |

Use CSS custom properties rather than hard-coded colors for new theme-aware components. Header height is 78px by default and 66px at widths up to 700px. The global gutter uses a responsive clamp.

Light mode is the initial default even on a dark system. Manual selection persists in localStorage under azmach-theme. ThemeSwitch updates the root data-theme attribute, emits azmach-theme-change, and uses a view transition where supported, with a CSS fallback.

## Motion

- Shared reveal uses IntersectionObserver and marks elements with data-reveal-state; content reveals when entering and hides when leaving the viewport.
- Use data-reveal for explicit groups and data-no-reveal for areas that must remain outside the global effect. Avoid double animation of nested card text.
- Lenis manages smooth wheel scrolling and anchor navigation.
- Services use GSAP to stagger SVG drawing timelines and reset drawings outside the viewport.
- Portfolio transitions use blur and movement; keep selection changes responsive.
- Respect prefers-reduced-motion, clean up observers and timelines, and ensure content remains usable without animation.

## Navigation and responsive UX

Keep header navigation consistent with current section anchors. Preserve the desktop sliding highlight, mobile navigation, visible focus styles, accessible names, semantic landmarks and skip link. Avoid horizontal overflow and make controls usable with a keyboard. Retain direct links as fallbacks for embedded portfolio previews.

## Brand collateral

For new promotional material, use verified logo assets and approved brand copy. Print-specific palettes, bleed and output formats must be confirmed against original brand assets; the table above describes the website, not a certified print color specification.
