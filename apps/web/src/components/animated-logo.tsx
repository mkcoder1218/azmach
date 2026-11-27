'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './animated-logo.module.css';

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
            { x: -31, y: 16, rotation: -12, transformOrigin: '50% 50%', opacity: 0 },
            { x: 0, y: 0, rotation: 0, opacity: 1, duration: .52 }, cursor);
          if (right) timeline.fromTo(right,
            { x: 31, y: -16, rotation: 12, transformOrigin: '50% 50%', opacity: 0 },
            { x: 0, y: 0, rotation: 0, opacity: 1, duration: .52 }, cursor + .1);
          sheets.forEach((sheet, index) => {
            timeline.fromTo(sheet,
              { y: 23, opacity: 0 },
              { y: 0, opacity: 1, duration: .38 },
              cursor + .25 + index * .13);
          });
          cursor += .96;
        } else {
          timeline.fromTo(part,
            { y: 31, x: -10, opacity: 0, scale: .94, transformOrigin: '50% 50%', filter: 'blur(4px)' },
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
    <svg ref={ref} className={styles.logo} viewBox="47 93 813 114" aria-hidden="true" focusable="false">
      {/* Outlines from Artboard 29_22.svg, with the dark palette from Artboard 29_21.svg. */}
      <g data-mark="">
        <g data-leg="left">
          <path fill="#c11720" d="M47,197.38l28,.06q17.2-37.16,34.4-74.33v-20l-7,0q-19,41.16-38.12,82.32Z" />
          <path fill="#ff0004" d="M51.45,195.88l22.57,0,34.23-73.09v-18.6l-5.4.08-37.8,82Z" />
        </g>
        <g data-leg="right">
          <path fill="#c11720" d="M174.44,197.34l-28,.06q-17.21-37.17-34.4-74.33v-20l7,0q19.07,41.16,38.12,82.32Z" />
          <path fill="#ff0004" d="M170,195.83l-22.58,0-34.23-73.09V104.19l5.41.08q18.9,41,37.79,82Z" />
        </g>
        <g data-sheet="">
          <path fill="#c11720" d="M99.55,167.76h21.09L110.1,145.13Q104.82,156.44,99.55,167.76Z" />
          <path fill="#ff0004" d="M102,166.19h16.24l-8.12-17.42Z" />
        </g>
        <g data-sheet="">
          <path fill="#ff0004" d="M96.23,171.94l3.11-3.33H121l3.11,3.32Z" />
          <path fill="#c11720" d="M96.24,171.93h27.89a3.25,3.25,0,0,1-.61,1,5.1,5.1,0,0,1-.87.78h-25a5.25,5.25,0,0,1-.88-.84A3.73,3.73,0,0,1,96.24,171.93Z" />
        </g>
        <g data-sheet="">
          <path fill="#ff0004" d="M97.55,174.4h25.31a13.54,13.54,0,0,0,2.86,5.94,12.27,12.27,0,0,0,2.55,2.27H92.09a11.77,11.77,0,0,0,2.62-2.24A12.73,12.73,0,0,0,97.55,174.4Z" />
          <path fill="#c11720" d="M92.09,182.61h36.18a4.39,4.39,0,0,1,0,2.72,4.74,4.74,0,0,1-2.77,2.74H94.89a4.69,4.69,0,0,1-2.79-2.7A4.35,4.35,0,0,1,92.09,182.61Z" />
        </g>
        <g data-sheet="">
          <path fill="#ff0004" d="M94.75,188.83h30.88a15.29,15.29,0,0,0,2.2,2,14.58,14.58,0,0,0,3.42,1.88H89.1a16.58,16.58,0,0,0,5.65-3.85Z" />
          <rect fill="#c11720" x="89.11" y="192.68" width="42.14" height="4.76" />
        </g>
      </g>
      <path data-letter="" fill="light-dark(#0b0b0d, #fafbfc)" d="M197.46,102.65l-7.2,15.81,47.3.08L190.3,189.88l7.54,7.53,71,0-8.25-15.92-42.43-.16,50.68-78.64Z" />
      <path data-letter="" fill="light-dark(#0b0b0d, #fafbfc)" d="M284.86,191.37l7.32,6h8.47l0-63.09,31.47,47.28,31.52-47.27v57.29l7.11,5.78h8.63q0-47.35,0-94.7H368.68l-36.47,50.82L296,102.65l-11.16,0Q284.88,147,284.86,191.37Z" />
      <g data-mark="">
        <g data-leg="left">
          <path fill="light-dark(#525252, #d5d3d3)" d="M395.17,197.3l27.65.06q17-37.17,34-74.33V103l-6.95,0-37.66,82.32Z" />
          <path fill="light-dark(#0b0b0d, #fafbfc)" d="M399.52,195.79l22.3,0q16.92-36.54,33.82-73.09V104.15l-5.34.08-37.34,82Z" />
        </g>
        <g data-leg="right">
          <path fill="light-dark(#525252, #d5d3d3)" d="M521.05,197.25l-27.65.07q-17-37.17-34-74.34V103l6.95,0L504,185.27Z" />
          <path fill="light-dark(#0b0b0d, #fafbfc)" d="M516.61,195.75l-22.3,0q-16.92-36.54-33.83-73.09V104.11l5.34.07,37.35,82Z" />
        </g>
        <g data-sheet="">
          <path fill="light-dark(#0b0b0d, #fafbfc)" d="M447.57,167.24h20.65L457.9,144.82Z" />
          <path fill="light-dark(#525252, #d5d3d3)" d="M450,165.69h15.89l-7.94-17.25Z" />
        </g>
        <g data-sheet="">
          <path fill="light-dark(#525252, #d5d3d3)" d="M444.28,171.61l3.08-3.32,21.41,0,3.07,3.33Z" />
          <path fill="light-dark(#0b0b0d, #fafbfc)" d="M444.3,171.61h27.55a3.16,3.16,0,0,1-.6,1,4.34,4.34,0,0,1-.86.78H445.73a5.13,5.13,0,0,1-.87-.83A3.53,3.53,0,0,1,444.3,171.61Z" />
        </g>
        <g data-sheet="">
          <path fill="light-dark(#525252, #d5d3d3)" d="M445.55,174.36h25a13.52,13.52,0,0,0,2.82,5.93,12.26,12.26,0,0,0,2.52,2.28H440.16a11.73,11.73,0,0,0,2.58-2.24A12.8,12.8,0,0,0,445.55,174.36Z" />
          <path fill="light-dark(#0b0b0d, #fafbfc)" d="M440.16,182.56H475.9a4.44,4.44,0,0,1,0,2.72,4.72,4.72,0,0,1-2.74,2.74H442.92a4.69,4.69,0,0,1-2.75-2.71A4.35,4.35,0,0,1,440.16,182.56Z" />
        </g>
        <g data-sheet="">
          <path fill="light-dark(#525252, #d5d3d3)" d="M442.94,188.75h30.52a15.44,15.44,0,0,0,2.17,2,14.62,14.62,0,0,0,3.38,1.88H437.37a16,16,0,0,0,3-1.62A16.35,16.35,0,0,0,442.94,188.75Z" />
          <rect fill="light-dark(#0b0b0d, #fafbfc)" x="437.37" y="192.59" width="41.64" height="4.76" />
        </g>
      </g>
      <path data-letter="" fill="light-dark(#0b0b0d, #fafbfc)" d="M607.17,118.43q4.27-7.89,8.57-15.78H552.8a27.13,27.13,0,0,0-9.65,7.41A27.78,27.78,0,0,0,537,126.12v48.73a29.09,29.09,0,0,0,7,15.89,28.22,28.22,0,0,0,8.7,6.56l55.4,0,7.65-6-8-9.81-47-.19a21.39,21.39,0,0,1-4.94-5.55,21.7,21.7,0,0,1-3.16-10q0-15.75.07-31.5a21,21,0,0,1,3-9.72,20.74,20.74,0,0,1,5.7-6.07Z" />
      <path data-letter="" fill="light-dark(#0b0b0d, #fafbfc)" d="M631.78,102.64l15.75,0,.06,39.18,47.11-.15q0-19.52,0-39l15.8,0q0,47.31-.07,94.62H701l-6.23-7.34q0-15.75,0-31.49l-47.17.29,0,38.63-9.54,0s-2.43-3.15-6.22-8.06Q631.76,146,631.78,102.64Z" />
      <rect data-letter="" fill="#ff0004" x="726.3" y="180.73" width="15.78" height="16.62" />
      <path data-letter="" fill="#ff0004" d="M829.09,197.35l7.59-7.51V181.6l-63,0,0-23.26,55.06-.48,7.93-7.71-7.48-6.06-55.32.59q-.09-12.94-.19-25.91l55.27-.16,7.74-6.91,0-8.9-78.77,0-.06,94.62Z" />
    </svg>
  );
}
