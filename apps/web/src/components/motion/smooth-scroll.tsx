'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let lenis: Lenis | undefined;
    let frame = 0;

    const configure = () => {
      cancelAnimationFrame(frame);
      lenis?.destroy();
      lenis = undefined;
      if (media.matches) return;
      lenis = new Lenis({
        lerp: 0.1,
        anchors: true,
        stopInertiaOnNavigate: true,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
      });
      const tick = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    configure();
    media.addEventListener('change', configure);
    return () => {
      media.removeEventListener('change', configure);
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, [pathname]);

  return null;
}
