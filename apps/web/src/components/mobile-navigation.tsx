'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './mobile-navigation.module.css';

const links = [
  ['#top', 'Home'],
  ['#services', 'Services'],
  ['#work', 'Our Works'],
  ['#about', 'About Us'],
  ['#contact', 'Contact'],
  ['#faqs', 'FAQs'],
] as const;

export default function MobileNavigation() {
  const dialog = useRef<HTMLDialogElement>(null);
  const closing = useRef(false);
  const timer = useRef<number | undefined>(undefined);
  const previousOverflow = useRef<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  function unlock() {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }

  function open() {
    const node = dialog.current;
    if (!node || node.open) return;
    node.showModal();
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    setExpanded(true);
  }

  function close(href?: string) {
    const node = dialog.current;
    if (!node?.open || closing.current) return;
    closing.current = true;
    const finish = () => {
      node.close();
      delete node.dataset.closing;
      closing.current = false;
      unlock();
      setExpanded(false);
      if (href) {
        const target = document.getElementById(href.slice(1));
        if (target) {
          history.pushState(null, '', href);
          target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        }
      }
    };
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) finish();
    else {
      node.dataset.closing = '';
      timer.current = window.setTimeout(finish, 320);
    }
  }

  useEffect(() => {
    const media = matchMedia('(min-width: 1251px)');
    const onResize = () => {
      if (!media.matches || !dialog.current?.open) return;
      window.clearTimeout(timer.current);
      dialog.current.close();
      delete dialog.current.dataset.closing;
      closing.current = false;
      unlock();
      setExpanded(false);
    };
    media.addEventListener('change', onResize);
    return () => {
      media.removeEventListener('change', onResize);
      window.clearTimeout(timer.current);
      unlock();
    };
  }, []);

  return (
    <div className={styles.mobile}>
      <button type="button" className={styles.trigger} aria-label="Open navigation menu" aria-haspopup="dialog" aria-expanded={expanded} aria-controls="mobile-navigation" onClick={open}>
        Menu <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
      </button>
      <dialog id="mobile-navigation" ref={dialog} className={styles.drawer} aria-labelledby="mobile-navigation-title" data-lenis-prevent="" onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) close(); }}>
        <div className={styles.panel}>
          <div className={styles.top}>
            <span id="mobile-navigation-title" className={styles.title}>Navigation</span>
            <button autoFocus type="button" className={styles.close} aria-label="Close menu" onClick={() => close()}><svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg></button>
          </div>
          <nav aria-label="Mobile navigation" className={styles.links}>
            {links.map(([href, label], index) => (
              <a key={href} href={href} onClick={event => { if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; event.preventDefault(); close(href); }} style={{ animationDelay: `${90 + index * 45}ms` }}><span className={styles.number}>{String(index + 1).padStart(2, '0')}</span><span>{label}</span><span className={styles.arrow} aria-hidden="true">↗</span></a>
            ))}
          </nav>
          <a className={styles.demo} href="#contact" onClick={event => { event.preventDefault(); close('#contact'); }}>Request a Demo <span aria-hidden="true">↗</span></a>
        </div>
      </dialog>
    </div>
  );
}
