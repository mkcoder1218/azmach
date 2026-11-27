'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './animated-logo.module.css';

function ArchitecturalA({ black = false }: { black?: boolean }) {
  const main = black ? 'var(--logo-ink)' : '#E61010';
  const shade = black ? 'var(--logo-shade)' : '#A80B0B';
  const seam = black ? 'var(--logo-seam)' : '#B50D0D';
  const step = black ? 'var(--logo-step)' : '#C40E0E';
  const base = black ? 'var(--logo-base)' : '#BD0D0D';
  return (
    <>
      <path data-leg="left" fill={main} d="M 192 25 L 210 25 L 210 72 L 122 292 L 45 292 L 94 264 Z" />
      <path data-leg="right" fill={main} d="M 218 25 L 236 25 L 334 264 L 383 292 L 306 292 L 218 72 Z" />
      <g data-sheet="">
        <polygon points="214,132 184,205 244,205" fill={main} />
        <line x1="184" y1="205" x2="244" y2="205" stroke={shade} strokeWidth="1.5" />
      </g>
      <g data-sheet="">
        <path d="M 183 207 L 245 207 L 252 217 L 176 217 Z" fill={main} />
        <rect x="176" y="217" width="76" height="3" fill={seam} />
      </g>
      <g data-sheet="">
        <path d="M 178 220 L 250 220 C 251 235, 255 245, 263 252 L 165 252 C 173 245, 177 235, 178 220 Z" fill={main} />
      </g>
      <g data-sheet="">
        <path d="M 165 252 L 263 252 C 266 256, 265 262, 259 264 L 169 264 C 163 262, 162 256, 165 252 Z" fill={step} />
        <rect x="169" y="264" width="90" height="5" fill={main} />
        <rect x="167" y="269" width="94" height="3" fill={seam} />
      </g>
      <g data-sheet="">
        <path d="M 164 272 L 264 272 L 270 280 L 158 280 Z" fill={main} />
        <rect x="158" y="280" width="112" height="12" fill={base} />
        <line x1="158" y1="280" x2="270" y2="280" stroke={black ? 'var(--logo-seam)' : '#990A0A'} strokeWidth="1.5" />
      </g>
    </>
  );
}

export default function AnimatedLogo() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline.timeScale(1.25);
      const parts = Array.from(svg.querySelectorAll<SVGElement>('[data-mark], [data-letter]'));
      const animated = parts.flatMap(part =>
        part.hasAttribute('data-mark')
          ? Array.from(part.querySelectorAll<SVGElement>('[data-leg], [data-sheet]'))
          : [part]
      );

      gsap.set(animated, { opacity: 0 });
      let cursor = 0;

      for (const part of parts) {
        if (part.hasAttribute('data-mark')) {
          const left = part.querySelector<SVGElement>('[data-leg="left"]');
          const right = part.querySelector<SVGElement>('[data-leg="right"]');
          const sheets = Array.from(part.querySelectorAll<SVGElement>('[data-sheet]')).reverse();
          if (left) timeline.fromTo(left,
            { x: -85, y: 45, rotation: -12, transformOrigin: '50% 50%', opacity: 0 },
            { x: 0, y: 0, rotation: 0, opacity: 1, duration: .52 }, cursor);
          if (right) timeline.fromTo(right,
            { x: 85, y: -45, rotation: 12, transformOrigin: '50% 50%', opacity: 0 },
            { x: 0, y: 0, rotation: 0, opacity: 1, duration: .52 }, cursor + .1);
          sheets.forEach((sheet, index) => {
            timeline.fromTo(sheet,
              { y: 65, opacity: 0 },
              { y: 0, opacity: 1, duration: .38 },
              cursor + .25 + index * .13);
          });
          cursor += .96;
        } else {
          timeline.fromTo(part,
            { y: 13, x: -4, opacity: 0, scale: .94, transformOrigin: '50% 50%', filter: 'blur(4px)' },
            { y: 0, x: 0, opacity: 1, scale: 1, filter: 'blur(0px)', duration: .48 },
            cursor);
          cursor += .19;
        }
      }
      timeline.set(animated, { clearProps: 'transform,transformOrigin,filter,opacity' });
    });
    return () => media.revert();
  }, []);

  return (
    <svg ref={ref} className={styles.logo} viewBox="0 0 345 48" aria-hidden="true" focusable="false">
      <g data-mark="" transform="translate(-6.75 -1.75) scale(.15)"><ArchitecturalA /></g>
      <g fill="var(--logo-ink)">
        <path data-letter="" d="M61 4H96L75 36H96L92 44H57L79 12H57Z" />
        <path data-letter="" d="M102 4H108L123 24L138 4H144V44H137V18L123 36L109 18V44H102Z" />
      </g>
      <g data-mark="" transform="translate(143.25 -1.75) scale(.15)"><ArchitecturalA black /></g>
      <g fill="var(--logo-ink)">
        <path data-letter="" d="M238 4H211L203 12V36L211 44H238L234 37H214L210 33V15L214 11H234Z" />
        <path data-letter="" d="M244 4H251V21H271V4H278V44H271V28H251V44H244Z" />
      </g>
      <path data-letter="" fill="#E61010" d="M284 37H291V44H284Z" />
      <path data-letter="" fill="#E61010" d="M298 4H335L331 11H305V21H332L328 28H305V37H335L331 44H298Z" />
    </svg>
  );
}
