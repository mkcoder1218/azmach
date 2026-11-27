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
    "href": "https://github.com/mkcoder1218/kiron2_mac",
    "linkLabel": "Restricted repository",
    "mark": "KI",
    "tone": "#18272c"
  },
  {
    "number": "02",
    "title": "Alpha Virtual",
    "category": "Platform engineering",
    "description": "Modular real-time platform with administration, cashier interfaces and service orchestration.",
    "href": "https://github.com/Hyaw-tech/ALPHA_VIRTUAL",
    "linkLabel": "Restricted repository",
    "mark": "A",
    "tone": "#22242e"
  },
  {
    "number": "03",
    "title": "STW Media",
    "category": "Creative digital experience",
    "description": "Cinematic media portfolio with interactive video showcases and motion-driven navigation.",
    "href": "https://github.com/mkcoder1218/STW-Media",
    "linkLabel": "View repository",
    "mark": "STW",
    "tone": "#382522"
  },
  {
    "number": "04",
    "title": "Hyaw.tech",
    "category": "Technology",
    "description": "Digital technology brand and web presence.",
    "href": "https://hyaw.tech",
    "linkLabel": "Visit website",
    "mark": "H",
    "tone": "#20332d"
  },
  {
    "number": "05",
    "title": "RedSea",
    "category": "Digital marketplace",
    "description": "A modern online shopping experience built with Next.js, React and TypeScript.",
    "href": null,
    "linkLabel": "",
    "mark": "RS",
    "tone": "#293c49"
  },
  {
    "number": "06",
    "title": "Glam Nest",
    "category": "Beauty & lifestyle",
    "description": "A digital experience for a beauty and hair salon, built with React and TypeScript.",
    "href": null,
    "linkLabel": "",
    "mark": "GN",
    "tone": "#543a48"
  },
  {
    "number": "07",
    "title": "Little Paris",
    "category": "Hospitality & dining",
    "description": "A restaurant website and digital menu experience, built with Next.js and React.",
    "href": null,
    "linkLabel": "",
    "mark": "LP",
    "tone": "#493d2e"
  },
  {
    "number": "08",
    "title": "Shine Health Care",
    "category": "Healthcare",
    "description": "A healthcare web experience built with React, TypeScript and client-side navigation.",
    "href": null,
    "linkLabel": "",
    "mark": "SH",
    "tone": "#29423f"
  }
];

export default function HomePage() {
  return (
    <div className={styles.shell} id="top">
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
          <div style={{ gridColumn: '1 / -1' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem', marginTop: '2rem' }}>
              {projects.map((project, index) => (
                <article key={project.number} data-card={index % 4} style={{ border: '1px solid var(--line)', overflow: 'hidden', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <div aria-hidden="true" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '16 / 10', background: project.tone, color: '#fff' }}>
                    <svg viewBox="0 0 320 200" width="100%" height="100%" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
                      <g fill="none" stroke="currentColor" opacity=".19">
                        {Array.from({ length: 9 }, (_, line) => (
                          <path key={line} d={`M ${line * 28 - 90} 200 L ${line * 28 + 130} 0`} />
                        ))}
                        <circle cx="240" cy="80" r="65" /><circle cx="240" cy="80" r="85" />
                        <path d="M0 160H320M0 40H320M40 0V200M280 0V200" />
                      </g>
                      <text x="24" y="28" fill="currentColor" fontSize="10" letterSpacing="3">AZMACH.E / {project.number}</text>
                      <text x="160" y="122" textAnchor="middle" fill="currentColor" fontSize="64" fontWeight="600" letterSpacing="-4">{project.mark}</text>
                      <text x="24" y="182" fill="currentColor" fontSize="9" letterSpacing="2">SELECTED WORK</text>
                    </svg>
                  </div>
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '.8rem' }}>
                    <span style={{ color: 'var(--accent)', fontSize: '.75rem', fontWeight: 600 }}>{project.number} / {project.category}</span>
                    <h3 style={{ fontFamily: 'var(--font-space), sans-serif', fontSize: '1.65rem', letterSpacing: '-.04em' }}>{project.title}</h3>
                    <div style={{ color: 'var(--muted)', fontSize: '.95rem', lineHeight: 1.65, flex: 1 }}>{project.description}</div>
                    {project.href && (
                      <a className={styles.cta} style={{ marginTop: '.6rem', minWidth: 0, alignSelf: 'stretch' }} href={project.href} target="_blank" rel="noopener noreferrer" aria-label={project.linkLabel + ': ' + project.title + ' (opens in a new tab)'}>
                        {project.linkLabel} <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
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
      <footer className={styles.footer}><span>AZMACH.E — Ethiopian roots. Global ambition.</span><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
