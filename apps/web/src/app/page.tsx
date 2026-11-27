'use client';

import { useEffect, useRef, useState } from 'react';
import ServicesSection from '../components/services-section';
import DesktopNavigation from '../components/desktop-navigation';
import AnimatedLogo from '../components/animated-logo';
import styles from './page.module.css';

const principles = [
  { number: '01', title: 'Build', description: 'Reliable systems. Thoughtful interfaces.' },
  { number: '02', title: 'Innovate', description: 'Better solutions to real problems.' },
  { number: '03', title: 'Lead', description: 'Clarity, ownership and direction.' },
  { number: '04', title: 'Elevate', description: 'Make every detail matter.' },
];

const projects = [
  {
    "number": "01",
    "title": "Kiron",
    "category": "Systems engineering",
    "description": "Legacy system analysis, desktop application development and software interoperability.",
    "href": "https://playbelman.com/",
    "linkLabel": "Visit website",
    "previewUrl": "https://playbelman.com/"
  },
  {
    "number": "02",
    "title": "Alpha Virtual",
    "category": "Platform engineering",
    "description": "Modular real-time platform with administration, cashier interfaces and service orchestration.",
    "href": "https://retail3.pleymanbet.com/",
    "linkLabel": "Visit website",
    "previewUrl": "https://retail3.pleymanbet.com/"
  },
  {
    "number": "03",
    "title": "STW Media",
    "category": "Creative digital experience",
    "description": "Cinematic media portfolio with interactive video showcases and motion-driven navigation.",
    "href": "https://stw-media.vercel.app/",
    "linkLabel": "Visit website",
    "previewUrl": "https://stw-media.vercel.app/"
  },
  {
    "number": "04",
    "title": "Hyaw.tech",
    "category": "Technology",
    "description": "Digital technology brand and web presence.",
    "href": "https://hyaw.tech",
    "linkLabel": "Visit website",
    "previewUrl": "https://hyaw.tech/"
  }
];

export default function HomePage() {
  const [preview, setPreview] = useState<(typeof projects)[number] | null>(null);
  const previewDialog = useRef<HTMLDialogElement>(null);
  const workStage = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState(projects[2]);
  const [stageVisible, setStageVisible] = useState(false);
  const [frameReady, setFrameReady] = useState(false);

  useEffect(() => {
    if (!stageVisible || preview) setFrameReady(false);
  }, [stageVisible, preview]);

  useEffect(() => {
    const stage = workStage.current;
    if (!stage) return;
    if (!('IntersectionObserver' in window)) {
      setStageVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      setStageVisible(entry.isIntersecting);
    }, { threshold: 0 });
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const dialog = previewDialog.current;
    if (!preview || !dialog) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [preview]);

  return (
    <div className={styles.shell} id="top">
      <style>{"\n@media (prefers-reduced-motion: no-preference) {\n  .work-choice { transition: color .35s ease, transform .45s cubic-bezier(.22,1,.36,1); }\n  .work-choice:hover { transform: translateX(4px); }\n  .work-choice:active { transform: translateX(4px) scale(.985); }\n  .work-arrow { transition: background .35s ease, color .35s ease, border-color .35s ease, transform .5s cubic-bezier(.22,1,.36,1); }\n  .work-choice[aria-pressed=\"true\"] .work-arrow { transform: rotate(-45deg); }\n  .work-details { transition: grid-template-rows .5s cubic-bezier(.22,1,.36,1), opacity .38s ease, filter .5s ease, transform .5s cubic-bezier(.22,1,.36,1), visibility .5s; }\n  .work-frame { animation: work-sharp .75s cubic-bezier(.22,1,.36,1) both; }\n  .work-address { animation: work-sharp .45s cubic-bezier(.22,1,.36,1) both; }\n  @keyframes work-sharp { from { opacity: 0; filter: blur(12px); transform: translateY(9px) scale(.985); } to { opacity: 1; filter: blur(0); transform: none; } }\n  .work-loading { animation: work-pulse 1.4s ease-in-out infinite alternate; }\n  @keyframes work-pulse { from { opacity: .45; } to { opacity: 1; } }\n}\n"}</style>
      <a className={styles.skip} href="#main">Skip to content</a>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="AZMACH.E home"><AnimatedLogo /></a>
        <DesktopNavigation />
        <div className={styles.actions}>
          <a className={styles.faqLink} href="#faqs">FAQs</a>
          <a className={styles.demoLink} href="#contact">Request a Demo <span aria-hidden="true">↗</span></a>
        </div>
        <details className={styles.mobileMenu}>
          <summary>Menu <span aria-hidden="true">☰</span></summary>
          <nav aria-label="Mobile navigation">
            <a href="#top">Home</a><a href="#services">Services</a><a href="#work">Our Works</a>
            <a href="#about">About Us</a><a href="#contact">Contact</a><a href="#faqs">FAQs</a>
            <a className={styles.demoLink} href="#contact">Request a Demo ↗</a>
          </nav>
        </details>
      </header>
      <main id="main">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.artwork} aria-hidden="true" />
          <div className={styles.heroMeta}>
            <span><i aria-hidden="true" /> Ethiopian roots. Global ambition.</span>
            <span>01 — Introduction</span>
          </div>
          <div className={styles.heroBody}>
            <div className={styles.eyebrow} data-reveal="">Independent software engineering</div>
            <h1 id="hero-title" className={styles.headline} data-reveal="">
              <span>Build Today.</span>
              <span>Lead Tomorrow.</span>
            </h1>
            <div className={styles.heroBottom} data-reveal="">
              <p>Engineering digital experiences with intention, precision and a perspective rooted in Ethiopia.</p>
              <a className={styles.cta} href="#about">Explore the vision <span aria-hidden="true">↘</span></a>
            </div>
          </div>
          <div className={styles.heroFoot}><span>DESIGN / ENGINEERING / IMPACT</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>
        <ServicesSection />
        <section id="work" className={styles.about} aria-labelledby="work-title">
          <p className={styles.sectionIndex}>Our Works</p>
          <div><h2 id="work-title">Selected work.</h2><p>A selection of systems, platforms and digital experiences across technology, media, commerce and everyday life.</p></div>
          <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 'clamp(1.5rem, 4vw, 4rem)', alignItems: 'start', marginTop: '1rem' }}>
            <div style={{ display: 'grid', borderTop: '1px solid var(--line)' }}>
              {projects.map((project, index) => {
                const active = selectedProject.number === project.number;
                return (
                  <article key={project.number} data-card={index} style={{ borderBottom: '1px solid var(--line)', padding: '1.25rem 0' }}>
                    <button type="button" aria-pressed={active} aria-controls={"work-details-" + project.number} aria-expanded={active} className="work-choice" onClick={() => { if (!active) { setFrameReady(false); setSelectedProject(project); } }} style={{ display: 'grid', gridTemplateColumns: '2rem minmax(0, 1fr) 2.75rem', alignItems: 'center', gap: '.75rem', width: '100%', minHeight: '64px', textAlign: 'left', cursor: 'pointer', border: 0, padding: 0, background: 'transparent', color: active ? 'var(--accent)' : 'var(--foreground)', fontFamily: 'inherit' }}>
                      <span style={{ fontSize: '.7rem', letterSpacing: '.08em', alignSelf: 'start', paddingTop: '.5rem' }}>{project.number}</span>
                      <span style={{ display: 'grid', gap: '.35rem' }}>
                        <span style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: 'clamp(1.65rem, 3vw, 2.8rem)', fontWeight: 600, letterSpacing: '-.055em', lineHeight: 1.1 }}>{project.title}</span>
                        <span style={{ fontSize: '.76rem', color: 'var(--muted)' }}>{project.category}</span>
                      </span>
                      <span aria-hidden="true" className="work-arrow" style={{ display: 'grid', placeItems: 'center', border: '1px solid ' + (active ? 'var(--accent)' : 'var(--line)'), borderRadius: '50%', width: '2.65rem', height: '2.65rem', fontSize: '1.2rem', background: active ? 'var(--accent)' : 'transparent', color: active ? '#fff' : 'inherit' }}>→</span>
                    </button>
                    <div id={"work-details-" + project.number} className="work-details" aria-hidden={!active} style={{ display: 'grid', gridTemplateRows: active ? '1fr' : '0fr', opacity: active ? 1 : 0, filter: active ? 'blur(0)' : 'blur(7px)', transform: active ? 'translateY(0)' : 'translateY(-6px)', visibility: active ? 'visible' : 'hidden' }}>
                      <div style={{ minHeight: 0, overflow: 'hidden' }}>
                        <div style={{ padding: '.8rem 0 0 2.75rem', display: 'grid', gap: '.9rem' }}>
                        <div style={{ color: 'var(--muted)', fontSize: '.9rem', lineHeight: 1.65 }}>{project.description}</div>
                        <a tabIndex={active ? 0 : -1} href={project.href} target="_blank" rel="noopener noreferrer" style={{ width: 'fit-content', fontSize: '.8rem', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '4px' }}>Visit website ↗</a>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
            <div ref={workStage} id="work-preview" data-no-reveal="" style={{ minWidth: 0, display: 'grid', gap: '.85rem' }}>
              <div style={{ border: '1px solid var(--line)', background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 18px 45px #17171712' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', padding: '.8rem 1rem', background: '#eae7e2', borderBottom: '1px solid var(--line)' }}>
                  <span aria-hidden="true" style={{ color: '#8c8984', letterSpacing: '.15em', fontSize: '.85rem' }}>●●●</span>
                  <span key={selectedProject.number} className="work-address" style={{ flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center', fontSize: '.72rem', color: '#57534e', background: '#faf9f7', borderRadius: '5px', padding: '.4rem .6rem' }}>{new URL(selectedProject.previewUrl).hostname}</span>
                  <button type="button" onClick={() => setPreview(selectedProject)} aria-label={'Expand ' + selectedProject.title + ' preview'} style={{ border: 0, background: 'transparent', color: '#171717', cursor: 'pointer', fontSize: '1.1rem', minWidth: '2rem', minHeight: '2rem' }}>↗</button>
                </div>
                <div style={{ position: 'relative', aspectRatio: '16 / 11', background: '#f4f2ee', overflow: 'hidden' }}>
                  {stageVisible && !preview && (
                    <>
                      {!frameReady && <div role="status" className="work-loading" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', color: 'var(--muted)', fontSize: '.8rem', letterSpacing: '.12em', textTransform: 'uppercase' }}>Loading {selectedProject.title}</div>}
                      <div key={selectedProject.number} className={frameReady ? 'work-frame' : undefined} style={{ position: 'absolute', inset: 0, visibility: frameReady ? 'visible' : 'hidden' }}>
                        <iframe title={selectedProject.title + ' inline website preview'} src={selectedProject.previewUrl} sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer" loading="lazy" onLoad={() => setFrameReady(true)} style={{ display: 'block', width: '100%', height: '100%', border: 0, background: '#fff' }} />
                      </div>
                    </>
                  )}
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '.8rem' }}>
                <span style={{ color: 'var(--muted)', fontSize: '.7rem', letterSpacing: '.12em', textTransform: 'uppercase' }}>Live website / {selectedProject.number}</span>
                <button type="button" onClick={() => setPreview(selectedProject)} style={{ border: 0, padding: '.6rem 0', background: 'transparent', color: 'var(--foreground)', fontFamily: 'inherit', fontWeight: 600, cursor: 'pointer', fontSize: '.8rem' }}>Expand preview ↗</button>
              </div>
              <span style={{ fontSize: '.75rem', color: 'var(--muted)' }}>If the preview is unavailable, visit the website directly.</span>
            </div>
          </div>
        </section>
        <section id="about" className={styles.about} aria-labelledby="about-title">
          <p className={styles.sectionIndex}>01 / About</p>
          <div><h2 id="about-title">Built with purpose.</h2><p>AZMACH.E is a personal space for software engineering, thoughtful design and the pursuit of meaningful progress.</p></div>
        </section>
        <section id="principles" className={styles.principles} aria-labelledby="principles-title">
          <h2 id="principles-title" className={styles.sectionIndex}>02 / Principles</h2>
          <div className={styles.cards}>
            {principles.map((item) => (
              <article key={item.number} className={styles.card}>
                <span>{item.number}</span><h3>{item.title}</h3><p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="faqs" className={styles.about} aria-labelledby="faq-title">
          <p className={styles.sectionIndex}>FAQs</p>
          <div><h2 id="faq-title">Common questions.</h2>
            <details className={styles.question}><summary>What does AZMACH.E build?</summary><p>Websites, applications and digital software experiences.</p></details>
          </div>
        </section>
        <section id="contact" className={styles.about} aria-labelledby="contact-title">
          <p className={styles.sectionIndex}>Contact / Demo</p>
          <div><h2 id="contact-title">Let’s build something.</h2><p>Contact and demo booking details will be available here soon.</p></div>
        </section>
      </main>
      <dialog ref={previewDialog} aria-label={preview ? preview.title + ' live preview' : 'Live website preview'} onCancel={(event) => { event.preventDefault(); setPreview(null); }} onClick={(event) => { if (event.target === event.currentTarget) setPreview(null); }} style={{ position: 'fixed', inset: 0, margin: 'auto', width: 'min(96vw, 1440px)', maxWidth: '96vw', maxHeight: '92dvh', padding: 0, border: '1px solid var(--line)', background: '#faf9f7', color: 'var(--foreground)', boxShadow: '0 0 0 100vmax #0009, 0 24px 80px #0005' }}>
        {preview?.previewUrl && (
          <div data-no-reveal="">
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '.75rem', padding: '1rem', borderBottom: '1px solid var(--line)' }}>
              <strong style={{ flex: '1 1 140px' }}>{preview.title} — Live preview</strong>
              <a href={preview.previewUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '.85rem', textDecoration: 'underline' }}>Open website ↗</a>
              <button type="button" autoFocus onClick={() => setPreview(null)} style={{ cursor: 'pointer', border: '1px solid var(--line)', background: 'transparent', color: 'inherit', padding: '.55rem .9rem' }}>Close ×</button>
            </div>
            <div style={{ padding: '.65rem 1rem', fontSize: '.8rem', color: 'var(--muted)' }}>If the website blocks embedded previews, use Open website above.</div>
            <iframe title={preview.title + ' website'} src={preview.previewUrl} sandbox="allow-scripts allow-same-origin" referrerPolicy="no-referrer" style={{ display: 'block', width: '100%', height: 'min(72dvh, 900px)', border: 0, background: '#fff' }} />
          </div>
        )}
      </dialog>
      <footer className={styles.footer}><span>AZMACH.E — Ethiopian roots. Global ambition.</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
