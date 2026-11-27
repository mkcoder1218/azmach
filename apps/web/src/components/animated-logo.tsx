'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './animated-logo.module.css';

function ArchitecturalA({ monochrome = false }: { monochrome?: boolean }) {
  const main = monochrome ? 'var(--logo-ink)' : '#ff0004';
  const shade = monochrome ? 'var(--logo-shade)' : '#c11720';

  return (
    <>
      <g data-leg="left">
        <path fill={shade} d="M41.45,639.9l171.22.38,210.48-454.9V63l-43-.19L146.84,566.58Z" />
        <path fill={main} d="M68.91,630.69l138.14.25L416.54,183.66V69.87l-33.07.46Q267.82,321.18,152.16,572Z" />
      </g>
      <g data-leg="right">
        <path fill={shade} d="M821.6,639.63,650.38,640,439.9,185.11V62.73l43-.19q116.64,251.9,233.29,503.77Z" />
        <path fill={main} d="M794.14,630.42,656,630.67,446.51,183.39V69.6l33.07.46Q595.25,320.92,710.89,571.77Z" />
      </g>
      <g data-sheet="">
        <path fill={shade} d="M363.26,458.6l129.09,0L427.83,320.12Q395.55,389.36,363.26,458.6Z" />
        <path fill={main} d="M378.14,449l99.36,0L427.84,342.43Z" />
      </g>
      <g data-sheet="">
        <path fill={main} d="M342.94,484.19,362,463.84l132.63-.09,19,20.35Z" />
        <path fill={shade} d="M343,484.14H513.68a19.81,19.81,0,0,1-3.69,6.11,30,30,0,0,1-5.34,4.77H351.87a32.38,32.38,0,0,1-5.38-5.11A22,22,0,0,1,343,484.14Z" />
      </g>
      <g data-sheet="">
        <path fill={main} d="M351,499.26l154.89,0a82.49,82.49,0,0,0,17.47,36.31A75.5,75.5,0,0,0,539,549.52H317.62a71.48,71.48,0,0,0,16-13.69A78.23,78.23,0,0,0,351,499.26Z" />
        <path fill={shade} d="M317.62,549.49l221.38,0a26.47,26.47,0,0,1,0,16.62c-4.05,11.82-15.33,16.18-17,16.78H334.74c-1.61-.57-12.9-4.79-17-16.55A26.4,26.4,0,0,1,317.62,549.49Z" />
      </g>
      <g data-sheet="">
        <path fill={main} d="M333.88,587.6h189a93.78,93.78,0,0,0,13.42,12,90.09,90.09,0,0,0,21,11.49l-257.93,0a101.52,101.52,0,0,0,18.38-9.93A104.68,104.68,0,0,0,333.88,587.6Z" />
        <rect fill={shade} x="299.36" y="611.12" width="257.91" height="29.16" />
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
            { x: -196, y: 104, rotation: -12, transformOrigin: '50% 50%', opacity: 0 },
            { x: 0, y: 0, rotation: 0, opacity: 1, duration: .52 }, cursor);
          if (right) timeline.fromTo(right,
            { x: 196, y: -104, rotation: 12, transformOrigin: '50% 50%', opacity: 0 },
            { x: 0, y: 0, rotation: 0, opacity: 1, duration: .52 }, cursor + .1);
          sheets.forEach((sheet, index) => {
            timeline.fromTo(sheet,
              { y: 150, opacity: 0 },
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
      <g data-mark="" transform="translate(-2.69 2.38) scale(.065)"><ArchitecturalA /></g>
      <g fill="var(--logo-ink)">
        <path data-letter="" d="M61 4H96L75 36H96L92 44H57L79 12H57Z" />
        <path data-letter="" d="M102 4H108L123 24L138 4H144V44H137V18L123 36L109 18V44H102Z" />
      </g>
      <g data-mark="" transform="translate(147.31 2.38) scale(.065)"><ArchitecturalA monochrome /></g>
      <g fill="var(--logo-ink)">
        <path data-letter="" d="M238 4H211L203 12V36L211 44H238L234 37H214L210 33V15L214 11H234Z" />
        <path data-letter="" d="M244 4H251V21H271V4H278V44H271V28H251V44H244Z" />
      </g>
      <path data-letter="" fill="#E61010" d="M284 37H291V44H284Z" />
      <path data-letter="" fill="#E61010" d="M298 4H335L331 11H305V21H332L328 28H305V37H335L331 44H298Z" />
    </svg>
  );
}
