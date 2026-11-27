'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './desktop-navigation.module.css';

const links = [
  { href: '#top', label: 'Home' },
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Our Works' },
  { href: '#about', label: 'About Us' },
  { href: '#contact', label: 'Contact' },
] as const;

export default function DesktopNavigation() {
  const nav = useRef<HTMLElement>(null);
  const indicator = useRef<HTMLSpanElement>(null);
  const targetRef = useRef('#top');
  const [active, setActive] = useState('#top');
  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const target = hovered ?? focused ?? active;

  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash || '#top';
      setActive(links.some(link => link.href === hash) ? hash : '#top');
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useEffect(() => {
    const root = nav.current;
    const bar = indicator.current;
    if (!root || !bar) return;
    // Observe layout once, not on every hover: the initial ResizeObserver
    // notification previously snapped the indicator to its destination.
    let previousWidth = root.clientWidth;
    const observer = new ResizeObserver(() => {
      const width = root.clientWidth;
      if (width === previousWidth) return;
      previousWidth = width;
      const link = Array.from(root.querySelectorAll('a')).find(item => item.hash === targetRef.current);
      if (!width || !link) return;
      gsap.set(bar, { x: link.offsetLeft, y: link.offsetTop, width: link.offsetWidth, height: link.offsetHeight, opacity: 1, overwrite: true });
      bar.dataset.ready = 'true';
    });
    observer.observe(root);
    return () => { observer.disconnect(); gsap.killTweensOf(bar); };
  }, []);

  useEffect(() => {
    targetRef.current = target;
    const root = nav.current;
    const bar = indicator.current;
    if (!root || !bar || !root.clientWidth) return;
    const link = Array.from(root.querySelectorAll('a')).find(item => item.hash === target);
    if (!link) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.to(bar, {
      x: link.offsetLeft,
      y: link.offsetTop,
      width: link.offsetWidth,
      height: link.offsetHeight,
      opacity: 1,
      duration: !reduced && bar.dataset.ready ? 0.48 : 0,
      ease: 'power3.inOut',
      overwrite: 'auto',
    });
    bar.dataset.ready = 'true';
  }, [target]);

  return (
    <nav ref={nav} className={styles.nav} aria-label="Main navigation"
      onPointerLeave={() => setHovered(null)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(null); }}>
      <span ref={indicator} className={styles.indicator} aria-hidden="true" />
      {links.map(link => (
        <a key={link.href} href={link.href}
          aria-current={active === link.href ? 'location' : undefined}
          data-highlighted={target === link.href}
          onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(link.href); }}
          onFocus={() => setFocused(link.href)}
          onClick={() => setActive(link.href)}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}
