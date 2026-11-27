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

const faqItems = [
  [
    "What does AZMACH.E build?",
    "We design and develop websites, web and mobile applications, business software, real-time platforms and custom digital experiences."
  ],
  [
    "Can you build a custom solution for my business?",
    "Yes. We start by understanding your workflows, goals and constraints, then define a solution around your actual requirements."
  ],
  [
    "Can you improve an existing website or application?",
    "Yes. We can assess an existing product, identify usability, performance or architectural issues, and plan targeted improvements."
  ],
  [
    "How does a project begin?",
    "Start with an email or phone call. We discuss the problem, intended users, scope and priorities before agreeing on the next steps."
  ],
  [
    "How much does a project cost?",
    "Pricing depends on scope, complexity, integrations and delivery requirements. Contact us to discuss your project and request an estimate."
  ],
  [
    "How long does development take?",
    "Timelines depend on the requirements and complexity. We discuss milestones and expected delivery dates during project planning."
  ],
  [
    "Do you offer support after launch?",
    "Ongoing maintenance, updates and technical support can be discussed as part of the project agreement."
  ],
  [
    "Can we work together remotely?",
    "Yes. Project discussions, reviews and collaboration can be arranged remotely, with communication and milestones agreed at the beginning."
  ]
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
      <style>{"\n.az-faq-list { grid-column:1/-1; border-top:1px solid var(--line); margin-top:clamp(1rem,3vw,2rem); }\n.az-faq-row { border-bottom:1px solid var(--line); }\n.az-faq-button { display:grid; grid-template-columns:2.5rem minmax(0,1fr) 2.5rem; gap:clamp(.7rem,2vw,2rem); align-items:center; width:100%; text-align:left; background:transparent; color:var(--foreground); border:0; cursor:pointer; padding:clamp(1rem,2vw,1.65rem) 0; font:inherit; }\n.az-faq-button:hover,.az-faq-button[aria-expanded=\"true\"] { color:var(--accent); }\n.az-faq-number { font-size:.72rem; color:var(--muted); letter-spacing:.1em; }\n.az-faq-title { font-family:var(--font-space),sans-serif; font-size:clamp(1.2rem,2.3vw,1.85rem); font-weight:600; letter-spacing:-.035em; line-height:1.25; }\n.az-faq-icon { display:grid; place-items:center; width:2.5rem; height:2.5rem; border:1px solid var(--line); border-radius:50%; position:relative; }\n.az-faq-icon::before,.az-faq-icon::after { content:''; width:12px; height:1px; background:currentColor; position:absolute; }\n.az-faq-icon::after { transform:rotate(90deg); }\n.az-faq-button[aria-expanded=\"true\"] .az-faq-icon { background:var(--accent); color:white; border-color:var(--accent); }\n.az-faq-button[aria-expanded=\"true\"] .az-faq-icon::after { transform:rotate(0deg); }\n.az-faq-answer { display:grid; grid-template-rows:0fr; opacity:0; visibility:hidden; filter:blur(5px); }\n.az-faq-answer[data-open=\"true\"] { grid-template-rows:1fr; opacity:1; visibility:visible; filter:none; }\n.az-faq-answer > div { overflow:hidden; min-height:0; }\n#faqs .az-faq-answer p { margin:0 0 1.5rem; padding-left:calc(2.5rem + clamp(.7rem,2vw,2rem)); max-width:54rem; font-size:1rem; }\n.az-contact-links { grid-column:1/-1; display:grid; grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr)); gap:clamp(1.5rem,4vw,4rem); margin-top:clamp(1rem,3vw,2rem); }\n.az-contact-link { display:grid; gap:.85rem; border-block:1px solid var(--line); padding:clamp(1.5rem,3vw,2.5rem) 0; min-width:0; color:var(--foreground); text-decoration:none; }\n.az-contact-label { font-size:.72rem; text-transform:uppercase; letter-spacing:.13em; color:var(--accent); font-weight:600; }\n.az-contact-value { display:flex; align-items:center; justify-content:space-between; gap:1rem; font-family:var(--font-space),sans-serif; font-size:clamp(1.35rem,2.4vw,2.2rem); letter-spacing:-.045em; font-weight:600; overflow-wrap:anywhere; }\n.az-contact-link:hover .az-contact-value { color:var(--accent); }\n.az-contact-arrow { flex:none; font-size:1.5rem; }\n.az-contact-note { font-size:.9rem; color:var(--muted); line-height:1.6; }\n@media(prefers-reduced-motion:no-preference) {\n.az-faq-button,.az-contact-value { transition:color .3s ease; }\n.az-faq-icon,.az-faq-icon::after,.az-contact-arrow { transition:transform .45s cubic-bezier(.22,1,.36,1),background-color .3s,color .3s; }\n.az-faq-answer { transition:grid-template-rows .5s cubic-bezier(.22,1,.36,1),opacity .4s,filter .5s,visibility .5s; }\n.az-contact-link:hover .az-contact-arrow { transform:translate(4px,-4px); }\n}\n"}</style>
      <style>{"\n.principle-manifesto { background: transparent; color: var(--foreground); padding: clamp(4rem,9vw,8rem) var(--gutter); border-block: 1px solid var(--line); overflow: hidden; }\n.principle-intro { display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; align-items: start; margin-bottom: clamp(2rem,5vw,4rem); }\n.principle-intro h2 { font-family: var(--font-space),sans-serif; font-size: clamp(2rem,5vw,4.5rem); font-weight: 600; letter-spacing: -.065em; line-height: 1.05; }\n.principle-intro p { color: var(--muted); margin-top: 1rem; line-height: 1.6; }\n.principle-line { position: relative; display: grid; grid-template-columns: 3rem minmax(0,1fr) minmax(0,.65fr) 56px; align-items: center; gap: clamp(.75rem,3vw,3rem); padding: clamp(1rem,2vw,1.75rem) 0; border-top: 1px solid var(--line); }\n.principle-line:last-child { border-bottom: 1px solid var(--line); }\n.principle-line h3 { font-family: var(--font-space),sans-serif; font-size: clamp(2rem,4.5vw,4.5rem); font-weight: 600; letter-spacing: -.075em; line-height: .95; }\n.principle-line p { color: var(--muted); font-size: clamp(.9rem,1.4vw,1.15rem); line-height: 1.65; max-width: 24rem; }\n.principle-number { color: var(--accent); font-size: .72rem; letter-spacing: .13em; }\n.principle-icon { width: 100%; color: var(--foreground); }\n.principle-line::before { content: ''; position: absolute; inset: 0 auto auto 0; height: 1px; width: 100%; background: var(--accent); transform-origin: left; transform: scaleX(0); }\n@media(prefers-reduced-motion:no-preference) {\n  .principle-line::before { transition: transform .9s cubic-bezier(.22,1,.36,1); }\n  .principle-line[data-reveal-state=\"visible\"]::before { transform: scaleX(.065); }\n  .principle-line h3,.principle-icon { transition: transform .55s cubic-bezier(.22,1,.36,1),color .35s; }\n  .principle-line:hover h3 { transform: translateX(12px); color: var(--accent); }\n  .principle-line:hover .principle-icon { transform: rotate(-12deg) scale(1.1); color: var(--accent); }\n  .principle-line .principle-trace { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.3s cubic-bezier(.22,1,.36,1); }\n  .principle-line[data-reveal-state=\"visible\"] .principle-trace { stroke-dashoffset: 0; }\n}\n@media(max-width:700px) { .principle-intro { grid-template-columns: 1fr; gap: 1rem; } .principle-line { grid-template-columns: 1.8rem minmax(0,1fr) 48px; gap: .65rem; } .principle-line p { grid-column: 2 / 3; grid-row: 2; } .principle-icon { grid-column: 3; grid-row: 1 / 3; } }\n@media(prefers-reduced-motion:reduce) { .principle-line::before { transform: scaleX(.065); } }\n"}</style>
      <style>{"\n.about-story { grid-column: 1 / -1; display: grid; grid-template-columns: repeat(auto-fit,minmax(min(100%,340px),1fr)); gap: clamp(2rem,5vw,6rem); align-items: center; margin-top: 1rem; }\n.about-visual { position: relative; overflow: hidden; background: #e8e5df; aspect-ratio: 5 / 3; color: #171717; display: grid; align-items: end; padding: clamp(1rem,3vw,2.5rem); isolation: isolate; }\n.about-visual svg { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; }\n.about-statement { font-family: var(--font-space),sans-serif; font-size: clamp(2rem,4vw,4.2rem); font-weight: 600; line-height: .98; letter-spacing: -.07em; }\n.about-values { grid-column: 1 / -1; margin-top: clamp(1rem,3vw,3rem); border-top: 1px solid var(--line); }\n.about-value { display: grid; grid-template-columns: minmax(85px,.65fr) minmax(0,1.1fr) minmax(0,1.4fr); gap: clamp(1rem,3vw,3rem); align-items: center; padding: clamp(1.5rem,3vw,2.75rem) 0; border-bottom: 1px solid var(--line); }\n.about-value h3 { font-family: var(--font-space),sans-serif; font-size: clamp(1.4rem,2.7vw,2.6rem); font-weight: 600; letter-spacing: -.055em; line-height: 1.12; }\n#about .about-value p { margin: 0; font-size: 1rem; line-height: 1.65; }\n.about-kicker { color: var(--accent); font-size: .69rem; font-weight: 600; letter-spacing: .13em; text-transform: uppercase; }\n@media(max-width:700px) { .about-value { grid-template-columns: 1fr; gap: .7rem; } }\n@media(prefers-reduced-motion:no-preference) {\n  .about-visual .about-trace { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 1.7s cubic-bezier(.22,1,.36,1); }\n  .about-visual[data-reveal-state=\"visible\"] .about-trace { stroke-dashoffset: 0; }\n  .about-visual .about-orbit { transform-box: fill-box; transform-origin: center; transition: transform 1.5s cubic-bezier(.22,1,.36,1), opacity 1.2s; transform: rotate(-18deg) scale(.8); opacity: 0; }\n  .about-visual[data-reveal-state=\"visible\"] .about-orbit { transform: none; opacity: 1; }\n  .about-value { transition: background-color .35s ease; }\n  .about-value:hover { background-color: #eae7e2; }\n\n  .about-value:hover h3 { color: var(--accent); }\n}\n"}</style>
      <style>{"\n.az-brand-visual { background: #eeebe5; display: grid; grid-template-columns: minmax(0,1fr) minmax(0,1fr); align-items: center; gap: clamp(.5rem,2vw,1.5rem); }\n.az-brand-mark { position: relative; grid-column: 2; grid-row: 1; width: min(100%, 290px); aspect-ratio: 51 / 48; justify-self: center; overflow: hidden; }\n.az-brand-mark svg { position: absolute; inset: 0 auto auto 0; width: calc(100% * 345 / 51); max-width: none; height: auto; z-index: auto; overflow: visible; }\n.az-brand-mark svg > :not(:first-child) { display: none; }\n.az-brand-caption { position: relative; grid-column: 1; grid-row: 1; align-self: end; }\n.az-brand-caption .about-statement { font-size: clamp(1.55rem,3.1vw,3.1rem); letter-spacing: -.055em; }\n@media (max-width: 480px) {\n  .az-brand-visual { grid-template-columns: 1fr; aspect-ratio: auto; min-height: 300px; }\n  .az-brand-mark { grid-column: 1; grid-row: 1; width: min(55%, 180px); }\n  .az-brand-caption { grid-column: 1; grid-row: 2; }\n}\n@media (prefers-reduced-motion: no-preference) {\n  .az-brand-mark [data-leg], .az-brand-mark [data-sheet] { transition: translate .95s cubic-bezier(.22,1,.36,1), opacity .75s; }\n  .az-brand-visual[data-reveal-state=\"hidden\"] [data-leg=\"left\"] { translate: -28px 35px; opacity: 0 !important; }\n  .az-brand-visual[data-reveal-state=\"hidden\"] [data-leg=\"right\"] { translate: 28px -35px; opacity: 0 !important; }\n  .az-brand-visual[data-reveal-state=\"hidden\"] [data-sheet] { translate: 0 34px; opacity: 0 !important; }\n  .az-brand-visual[data-reveal-state=\"visible\"] [data-leg], .az-brand-visual[data-reveal-state=\"visible\"] [data-sheet] { translate: 0 0; }\n  .az-brand-visual[data-reveal-state=\"visible\"] [data-sheet] { transition-delay: .18s; }\n  .az-brand-visual[data-reveal-state=\"visible\"] [data-sheet]:nth-child(3) { transition-delay: .42s; }\n  .az-brand-visual[data-reveal-state=\"visible\"] [data-sheet]:nth-child(4) { transition-delay: .36s; }\n  .az-brand-visual[data-reveal-state=\"visible\"] [data-sheet]:nth-child(5) { transition-delay: .30s; }\n  .az-brand-visual[data-reveal-state=\"visible\"] [data-sheet]:nth-child(6) { transition-delay: .24s; }\n  .az-brand-caption { transition: transform .85s cubic-bezier(.22,1,.36,1), opacity .75s, filter .75s; }\n  .az-brand-visual[data-reveal-state=\"hidden\"] .az-brand-caption { transform: translateY(12px); opacity: 0; filter: blur(7px); }\n  .az-brand-visual[data-reveal-state=\"visible\"] .az-brand-caption { transition-delay: .2s; }\n}\n"}</style>
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
          <div>
            <h2 id="about-title">Built with purpose.</h2>
            <p style={{ maxWidth: '48rem', fontSize: 'clamp(1.2rem, 2vw, 1.65rem)', lineHeight: 1.55, color: 'var(--foreground)' }}>Ethiopian roots. Global ambition. We believe technology should do more than work — it should create meaningful progress.</p>
          </div>
          <div className="about-story">
            <div className="about-visual az-brand-visual" data-reveal="">
              <div className="az-brand-mark" aria-hidden="true">
                <AnimatedLogo />
              </div>
              <div className="az-brand-caption">
                <span className="about-kicker">Our perspective / 01</span>
                <div className="about-statement" style={{ marginTop: '.85rem' }}>Build today.<br />Lead tomorrow.</div>
              </div>
            </div>
            <div>
              <p style={{ maxWidth: '48rem', marginTop: 0 }}>AZMACH.E is an independent software engineering initiative focused on building thoughtful digital experiences and dependable systems. We bring design, engineering and practical problem-solving together to turn complex ideas into clear, useful products.</p>
              <p style={{ maxWidth: '48rem' }}>From real-time platforms and business applications to cinematic websites, our approach begins with understanding the problem. We care about what happens behind the interface as much as what people see: architecture, security, performance and the ability to grow over time.</p>
            </div>
          </div>
          <div className="about-values">
            {[
              { label: '01 / Mission', title: 'Build what matters.', description: 'Create useful, reliable software that solves real problems and gives people and businesses the tools to move forward.' },
              { label: '02 / Vision', title: 'Think beyond borders.', description: 'Contribute to a future where Ethiopian engineering and creativity stand confidently on the global stage.' },
              { label: '03 / Approach', title: 'Make every detail count.', description: 'Combine disciplined architecture, intentional design and continuous improvement, from the first idea to the final experience.' },
            ].map((item) => (
              <div key={item.label} className="about-value">
                <span className="about-kicker" data-reveal="">{item.label}</span>
                <h3 data-reveal="" style={{ transitionDelay: 'var(--reveal-delay, 0ms)' }}>{item.title}</h3>
                <p data-reveal="">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="principles" className="principle-manifesto" aria-labelledby="principles-title">
          <div className="principle-intro">
            <span className={styles.sectionIndex} data-reveal="">02 / Principles</span>
            <div>
              <h2 id="principles-title">How we move forward.</h2>
              <p>Four principles. One direction. The way we think, create and deliver.</p>
            </div>
          </div>
          <div>
            {principles.map((item, index) => (
              <article key={item.number} className="principle-line" data-card={index}>
                <span className="principle-number">{item.number} /</span>
                <h3>{item.title}.</h3>
                <p>{item.description}</p>
                <svg className="principle-icon" aria-hidden="true" viewBox="0 0 72 72" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path className="principle-trace" pathLength="1" d={[
                    'M36 8 63 23 36 38 9 23 36 8 M9 36 36 51 63 36 M9 49 36 64 63 49',
                    'M36 7V65 M7 36H65 M15 15 57 57 M57 15 15 57 M36 20 52 36 36 52 20 36Z',
                    'M10 60 60 10 M30 10H60V40 M10 35V60H35',
                    'M12 58 25 45 36 50 60 14 M40 14H60V34 M12 66H60'
                  ][index]} />
                </svg>
              </article>
            ))}
          </div>
        </section>
        <section id="faqs" className={styles.about} aria-labelledby="faq-title">
          <p className={styles.sectionIndex}>FAQs</p>
          <div><h2 id="faq-title">Common questions.</h2><p>Everything you need to know before starting a conversation with us.</p></div>
          <div className="az-faq-list">
            {faqItems.map(([question, answer], index) => {
              const active = openFaq === index;
              return (
                <article className="az-faq-row" key={question} data-card={index % 4}>
                  <button type="button" className="az-faq-button" id={'faq-question-' + index} aria-expanded={active} aria-controls={'faq-answer-' + index} onClick={() => setOpenFaq(active ? null : index)}>
                    <span className="az-faq-number">{String(index + 1).padStart(2, '0')} /</span>
                    <span className="az-faq-title">{question}</span>
                    <span aria-hidden="true" className="az-faq-icon" />
                  </button>
                  <div className="az-faq-answer" id={'faq-answer-' + index} aria-labelledby={'faq-question-' + index} aria-hidden={!active} data-open={active}>
                    <div><p>{answer}</p></div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section id="contact" className={styles.about} aria-labelledby="contact-title">
          <p className={styles.sectionIndex}>Contact / Demo</p>
          <div><h2 id="contact-title">Let’s build something.</h2><p>Have a project in mind, a question, or an idea worth exploring? Get in touch to discuss your next step or request a demo.</p></div>
          <div className="az-contact-links">
            <article data-card={0}>
              <a className="az-contact-link" href="mailto:codemk1218@gmail.com">
                <span className="az-contact-label">01 / Email us</span>
                <span className="az-contact-value">codemk1218@gmail.com <span className="az-contact-arrow" aria-hidden="true">↗</span></span>
                <span className="az-contact-note">Tell us about your project or send an inquiry.</span>
              </a>
            </article>
            <article data-card={1}>
              <a className="az-contact-link" href="tel:+251933894492">
                <span className="az-contact-label">02 / Call us</span>
                <span className="az-contact-value">+251 933 894 492 <span className="az-contact-arrow" aria-hidden="true">↗</span></span>
                <span className="az-contact-note">Start a conversation directly by phone.</span>
              </a>
            </article>
          </div>
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
