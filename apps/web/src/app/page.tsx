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
            <div className={styles.eyebrow}>Independent software engineering</div>
            <h1 id="hero-title" className={styles.headline}>
              <span>Build Today.</span>
              <span>Lead Tomorrow.</span>
            </h1>
            <div className={styles.heroBottom}>
              <p>Engineering digital experiences with intention, precision and a perspective rooted in Ethiopia.</p>
              <a className={styles.cta} href="#about">Explore the vision <span aria-hidden="true">↘</span></a>
            </div>
          </div>
          <div className={styles.heroFoot}><span>DESIGN / ENGINEERING / IMPACT</span><span>SCROLL TO EXPLORE ↓</span></div>
        </section>
        <ServicesSection />
        <section id="work" className={styles.about} aria-labelledby="work-title">
          <p className={styles.sectionIndex}>Our Works</p>
          <div><h2 id="work-title">Selected work.</h2><p>Project case studies will be published here.</p></div>
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
