import React from 'react';
import styles from './Footer.module.css';

const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="5"/>
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Awards', href: '#awards' },
  { name: 'Contact', href: '#contact' },
];

const serviceLinks = [
  'Menu Development', 'Kitchen Setup', 'Staff Training',
  'Concept Development', 'Quality Control', 'Food Styling',
  'Private Dining'
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.main}>

          {/* Column 1: Brand */}
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoName}>Chef's Choice Consultancy</span>
              <span className={styles.logoSub}>by Chef Arpit Macwan</span>
            </div>
            <p className={styles.tagline}>
              Crafting Excellence, One Kitchen at a Time.
            </p>
            <div className={styles.goldLine}></div>
          </div>

          {/* Column 2: Links */}
          <div className={styles.linksGroup}>
            <div className={styles.column}>
              <h4 className={styles.colLabel}>NAVIGATE</h4>
              <ul className={styles.list}>
                {quickLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href}>{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.column}>
              <h4 className={styles.colLabel}>OUR SERVICES</h4>
              <ul className={styles.list}>
                {serviceLinks.map(s => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Contact */}
          <div className={styles.contactCol}>
            <h4 className={styles.colLabel}>CONTACT US</h4>
            <ul className={styles.list}>
              <li>Ahmedabad, Gujarat — 380059</li>
              <li>+91-720-1020-208</li>
              <li>arpitrmacwan@gmail.com</li>
              <li>Mon–Fri: 11AM–8PM</li>
            </ul>

            <div className={styles.socialRow}>
              <a href="#" className={styles.socialIcon} aria-label="Instagram">
                <InstagramIcon />
              </a>
            </div>
          </div>

        </div>

        {/* Divider + Bottom Bar */}
        <div className={styles.divider}></div>
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {currentYear} © All rights reserved by Chef's Choice Consultancy
          </p>
          <p className={styles.credit}>
            Designed with passion for culinary excellence
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
