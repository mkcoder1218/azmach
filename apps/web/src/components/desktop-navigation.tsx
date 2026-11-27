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
    const link = Array.from(root.querySelectorAll('a')).find(item => item.hash === target);
    if (!link) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const move = (animate: boolean) => {
      if (!root.clientWidth) return;
      const x = link.offsetLeft;
      const width = link.offsetWidth;
      const y = link.offsetTop;
      const height = link.offsetHeight;
      gsap.to(bar, {
        x, y, width, height, opacity: 1,
        duration: animate && !media.matches && bar.dataset.ready ? 0.42 : 0,
        ease: 'power3.out', overwrite: 'auto',
      });
      bar.dataset.ready = 'true';
    };
    move(true);
    const observer = new ResizeObserver(() => move(false));
    observer.observe(root);
    observer.observe(link);
    return () => { observer.disconnect(); gsap.killTweensOf(bar); };
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
