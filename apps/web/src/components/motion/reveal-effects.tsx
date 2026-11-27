'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const selector = 'main h1, main h2, main h3, main p, main article, main [data-reveal]';

export default function RevealEffects() {
  const pathname = usePathname();

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tracked = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;

    const clear = () => {
      observer?.disconnect();
      mutations?.disconnect();
      for (const node of tracked) {
        node.removeAttribute('data-reveal-state');
      }
      tracked.clear();
    };

    const configure = () => {
      clear();
      if (media.matches) return;
      observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          const node = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            node.dataset.revealState = 'visible';
          } else if (entry.boundingClientRect.bottom <= 0 || entry.boundingClientRect.top >= window.innerHeight) {
            node.dataset.revealState = 'hidden';
          }
        }
      }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });

      const scan = () => {
        for (const node of tracked) {
          if (!node.isConnected) { observer?.unobserve(node); tracked.delete(node); }
        }
        for (const node of document.querySelectorAll<HTMLElement>(selector)) {
          if (tracked.has(node) || node.closest('[data-no-reveal]')) continue;
          // Reveal a card or explicit group as a unit; never animate its text twice.
          const ancestor = node.parentElement?.closest(selector);
          if (ancestor && (ancestor.matches('article, [data-reveal]'))) continue;
          const bounds = node.getBoundingClientRect();
          node.dataset.revealState = bounds.bottom > 0 && bounds.top < window.innerHeight * .95 ? 'visible' : 'hidden';
          tracked.add(node);
          observer?.observe(node);
        }
      };
      scan();
      mutations = new MutationObserver(scan);
      mutations.observe(document.body, { childList: true, subtree: true });
    };

    configure();
    media.addEventListener('change', configure);
    return () => { media.removeEventListener('change', configure); clear(); };
  }, [pathname]);

  return null;
}
