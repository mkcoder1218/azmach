'use client';

import { useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';

const selector = 'main h1, main h2, main h3, main p, main article, main [data-reveal]';

export default function RevealEffects() {
  const pathname = usePathname();

  useLayoutEffect(() => {
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
          node.dataset.revealState = entry.isIntersecting ? 'visible' : 'hidden';
        }
      }, { threshold: 0, rootMargin: '-8% 0px -8% 0px' });

      const scan = () => {
        for (const node of tracked) {
          if (!node.isConnected) { observer?.unobserve(node); tracked.delete(node); }
        }
        const added: { node: HTMLElement; transition: string; priority: string }[] = [];
        for (const node of document.querySelectorAll<HTMLElement>(selector)) {
          if (tracked.has(node) || node.closest('[data-no-reveal]')) continue;
          // Reveal a card or explicit group as a unit; never animate its text twice.
          const ancestor = node.parentElement?.closest(selector);
          if (ancestor && (ancestor.matches('article, [data-reveal]'))) continue;
          added.push({
            node,
            transition: node.style.getPropertyValue('transition'),
            priority: node.style.getPropertyPriority('transition'),
          });
          // Establish the hidden starting style without an initial fade-out.
          node.style.setProperty('transition', 'none', 'important');
          node.dataset.revealState = 'hidden';
          tracked.add(node);
        }
        if (added.length) {
          // Commit the hidden styles before the observer can reveal above-the-fold
          // content. Without this, initial hidden/visible writes may be coalesced.
          for (const { node } of added) void window.getComputedStyle(node).opacity;
          for (const { node, transition, priority } of added) {
            if (transition) node.style.setProperty('transition', transition, priority);
            else node.style.removeProperty('transition');
            observer?.observe(node);
          }
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
