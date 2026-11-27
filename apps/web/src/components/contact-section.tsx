'use client';

import { useState, type FormEvent } from 'react';
import SectionBanner from './section-banner';
import styles from './contact-section.module.css';

const enquiryEmail = 'info@azmache.com';

export default function ContactSection() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState('');

  async function sendEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    setSending(true);
    setStatus('');
    try {
      const response = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const result = await response.json();
      if (!response.ok) {
        setStatus(result.error);
        return;
      }
      form.reset();
      setStatus('Your enquiry was sent. Thank you.');
    } catch {
      setStatus('We couldn’t send your enquiry. Please try again or email info@azmache.com directly.');
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <SectionBanner section="contact" />
      <div className={styles.intro}>
        <h2 id="contact-title">Let’s talk.</h2>
        <p>Share your goals, timeline, and what success looks like. Start with a quote or request a consultation.</p>
        <div className={styles.details}>
          <h3>General enquiries</h3>
          <a href={`mailto:${enquiryEmail}`}>{enquiryEmail} <span aria-hidden="true">↗</span></a>
          <a href="tel:+251991953660">+251 99 195 3660</a>
        </div>
        <div className={styles.details}>
          <h3>Already working with us?</h3>
          <a href="mailto:support@azmache.com">support@azmache.com</a>
        </div>
      </div>
      <form className={styles.form} onSubmit={sendEnquiry} aria-labelledby="enquiry-title">
        <h3 id="enquiry-title">Send your enquiry.</h3>
        <label>Name <span aria-hidden="true">*</span><input name="name" autoComplete="name" required maxLength={100} placeholder="Name" /></label>
        <label>Email <span aria-hidden="true">*</span><input name="email" type="email" autoComplete="email" required maxLength={150} placeholder="Email" /></label>
        <label>Company<input name="company" autoComplete="organization" maxLength={120} /></label>
        <label>Phone number <span aria-hidden="true">*</span><input name="phone" type="tel" autoComplete="tel" required maxLength={40} /></label>
        <label className={styles.full}>Service
          <select name="service">
            <option>Website</option>
            <option>Mobile application</option>
            <option>Business software solutions</option>
            <option>Digital experience</option>
            <option>Other</option>
          </select>
        </label>
        <label className={styles.full}>Tell us about your project <span aria-hidden="true">*</span>
          <textarea name="message" required minLength={20} maxLength={1200} rows={5} placeholder="Please share at least 20 characters." />
        </label>
        <button type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send enquiry'} <span aria-hidden="true">↗</span></button>
        <p className={styles.full} role="status">{status}</p>
      </form>
    </section>
  );
}
