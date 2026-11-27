'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './services-section.module.css';

const services = [
  { title: 'Web development', description: 'Fast, expressive websites and web platforms built around your business.', tags: ['Corporate websites', 'Web platforms'], icon: 'web' },
  { title: 'Mobile applications', description: 'Intuitive mobile experiences that make complex tasks feel effortless.', tags: ['iOS & Android', 'Mobile UX'], icon: 'mobile' },
  { title: 'Software engineering', description: 'Reliable software, connected systems and architecture designed to grow.', tags: ['APIs & integrations', 'Business systems'], icon: 'system' },
  { title: 'Digital experiences', description: 'Thoughtful interfaces where visual identity meets purposeful interaction.', tags: ['UI / UX', 'Interaction design'], icon: 'design' },
] as const;

function ServiceArtwork({ kind }: { kind: typeof services[number]['icon'] }) {
  return (
    <svg viewBox="0 0 240 148" fill="none" aria-hidden="true" className={styles.art}>
      {kind === 'web' && <g stroke="currentColor" strokeWidth="1.5">
        <rect x="30" y="22" width="180" height="104" rx="5" />
        <path d="M30 43H210M45 33h4m7 0h4m7 0h4M46 58h90v53H46zM149 58h45v20h-45zM149 88h45v23h-45z" />
        <path className={styles.red} d="M46 98 77 72l26 15 33-29v53H46Z" />
      </g>}
      {kind === 'mobile' && <g stroke="currentColor" strokeWidth="1.5">
        <rect x="76" y="13" width="65" height="122" rx="9" /><path d="M97 22h23M86 37h45v39H86zM86 89h45M86 99h32M99 125h19" />
        <rect x="148" y="44" width="38" height="72" rx="5" /><path d="M155 56h24v22h-24zM155 88h24M155 96h16" />
        <path className={styles.red} d="M86 67l15-18 13 9 17-21v39H86z" />
      </g>}
      {kind === 'system' && <g stroke="currentColor" strokeWidth="1.5">
        <path d="m120 16 51 28-51 28-51-28zM69 44v27l51 28 51-28V44M69 71v27l51 28 51-28V71M120 72v54M69 98l-25 14m127-14 25 14" />
        <path className={styles.red} d="m120 16 51 28-51 28-51-28z" /><path d="m120 29 27 15-27 15-27-15z" />
      </g>}
      {kind === 'design' && <g stroke="currentColor" strokeWidth="1.5">
        <circle cx="120" cy="74" r="52" /><rect x="68" y="22" width="104" height="104" />
        <path d="M68 74h104M120 22v104M68 22l104 104M172 22 68 126" opacity=".45" />
        <path className={styles.red} d="M120 22a52 52 0 0 1 52 52h-52z" /><circle cx="120" cy="74" r="19" />
      </g>}
    </svg>
  );
}

export default function ServicesSection() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = section.current;
    if (!root || !('IntersectionObserver' in window)) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const nodes = Array.from(root.querySelectorAll<HTMLElement>('[data-card]'));
      const drawings = Array.from(root.querySelectorAll<SVGGeometryElement>('svg path, svg rect, svg circle'));
      const timelines = new Set<gsap.core.Timeline>();
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const delay = entry.target.hasAttribute('data-card') ? Number(entry.target.getAttribute('data-card')) * .075 : 0;
          const shapes = Array.from(entry.target.querySelectorAll<SVGGeometryElement>('svg path, svg rect, svg circle'));
          if (shapes.length) {
            const timeline = gsap.timeline({ delay: delay + .28 });
            timelines.add(timeline);
            shapes.forEach((shape, index) => {
              const length = Math.max(1, shape.getTotalLength());
              timeline.fromTo(shape, { strokeDasharray: length + ' ' + length, strokeDashoffset: length }, {
                strokeDashoffset: 0, duration: .72, ease: 'power2.inOut',
                clearProps: 'strokeDasharray,strokeDashoffset',
              }, index * .105);
              if (shape.classList.contains(styles.red)) {
                timeline.fromTo(shape, { fillOpacity: 0 }, {
                  fillOpacity: .19, duration: .35, ease: 'power2.out', clearProps: 'fillOpacity',
                }, index * .105 + .65);
              }
            });
          }
        }
      }, { threshold: .12 });
      nodes.forEach(node => observer.observe(node));
      return () => {
        observer.disconnect();
        timelines.forEach(timeline => timeline.kill());
        gsap.set(drawings, { clearProps: 'strokeDasharray,strokeDashoffset,fillOpacity' });
      };
    });
    return () => media.revert();
  }, []);

  return (
    <section id="services" ref={section} className={styles.section} aria-labelledby="services-title">
      <div className={styles.meta}><span><i /> 02 / What we do</span><span>DESIGN — DEVELOP — DELIVER</span></div>
      <div className={styles.intro} data-reveal="">
        <h2 id="services-title">Ideas into<br /><em>real impact.</em></h2>
        <p>From the first concept to the final line of code, we build digital products with clarity, craft and purpose.</p>
      </div>
      <div className={styles.cards}>
        {services.map((service, i) => (
          <article key={service.icon} className={styles.card} data-reveal="" data-card={i}>
            <div className={styles.cardTop}><span>0{i + 1} / SERVICE</span><a href="#contact" aria-label={`Discuss ${service.title}`} className={styles.arrow}>↗</a></div>
            <div className={styles.visual}><ServiceArtwork kind={service.icon} /></div>
            <div className={styles.copy}><h3>{service.title}</h3><p>{service.description}</p></div>
            <div className={styles.tags}>{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          </article>
        ))}
      </div>
      <div className={styles.end}><span>Built for people. Engineered for performance.</span><a href="#contact">Let’s build together <span aria-hidden="true">↗</span></a></div>
    </section>
  );
}
