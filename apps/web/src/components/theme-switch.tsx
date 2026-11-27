'use client';

import { useSyncExternalStore } from 'react';
import styles from './theme-switch.module.css';

type Theme = 'light' | 'dark';
const eventName = 'azmach-theme-change';
const getTheme = (): Theme => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
const getServerTheme = (): Theme => 'light';
function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  return () => window.removeEventListener(eventName, callback);
}

export default function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, getTheme, getServerTheme);
  function toggle() {
    const next = getTheme() === 'dark' ? 'light' : 'dark';
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try { localStorage.setItem('azmach-theme', next); } catch {}
      window.dispatchEvent(new Event(eventName));
    };
    const doc = document as Document & { startViewTransition?: (update: () => void) => unknown };
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && doc.startViewTransition) {
      doc.startViewTransition(apply);
    } else {
      if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.dataset.themeChanging = '';
        window.setTimeout(() => { delete document.documentElement.dataset.themeChanging; }, 450);
      }
      apply();
    }
  }

  return (
    <button className={styles.toggle} type="button" onClick={toggle}
      aria-label="Dark mode" aria-pressed={theme === 'dark'}
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
      <span className={styles.thumb} aria-hidden="true" />
      <svg className={styles.sun} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" />
      </svg>
      <svg className={styles.moon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.8 14.2A9 9 0 0 1 9.8 3.2a9 9 0 1 0 11 11Z" />
      </svg>
    </button>
  );
}
