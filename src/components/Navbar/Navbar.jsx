import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      
      // Update active section
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && window.scrollY >= section.offsetTop - 100) {
          current = sections[i];
          break;
        }
      }
      if (current !== activeSection) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  useGSAP(() => {
    gsap.from(`.${styles.topStripText}`, {
      y: -20, opacity: 0, duration: 0.5, ease: 'power2.out', delay: 1.2
    });
    gsap.from(`.${styles.navLink}`, {
      y: -20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 1.6
    });
    gsap.from(`.${styles.logo}`, {
      x: -30, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 1.4
    });
  }, { scope: navRef });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      ref={navRef}
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
    >
      <div className={`${styles.topStrip} ${isScrolled ? styles.hidden : ''}`}>
        <div className={styles.topStripText}>
          arpitrmacwan@gmail.com  ·  +91-720-1020-208  ·  Mon–Fri: 11AM–8PM
        </div>
      </div>
      
      <div className={styles.navBody}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src="https://ik.imagekit.io/zvgp583fb/WhatsApp%20Image%202026-04-09%20at%208.51.08%20PM.jpeg" alt="Chef Choice Consultancy" className={styles.logoImg} />
            <div className={styles.logoText}>
              <span className={styles.logoName}>CHEF CHOICE CONSULTANCY</span>
              <span className={styles.logoSub}>by Chef Arpit Macwan</span>
            </div>
          </div>

        {/* Desktop Links */}
        <div className={styles.links}>
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`${styles.navLink} ${activeSection === link.href.substring(1) ? styles.navLinkActive : ''}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button 
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileLinks}>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className={styles.mobileNavLink}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </nav>
);
};

export default Navbar;
