import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  
  const menuRef = useRef(null);
  const menuLinksRef = useRef([]);
  const tlRef = useRef(null);

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
      
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
    // Initial desktop animations
    gsap.from(`.${styles.topStripText}`, {
      y: -20, opacity: 0, duration: 0.5, ease: 'power2.out', delay: 1.2
    });
    gsap.from(`.${styles.navLink}`, {
      y: -20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out', delay: 1.6
    });
    gsap.from(`.${styles.logo}`, {
      x: -30, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 1.4
    });

    // Mobile Menu Timeline
    gsap.set(menuRef.current, { visibility: 'hidden' });
    tlRef.current = gsap.timeline({ paused: true })
      .to(menuRef.current, {
        visibility: 'visible',
        duration: 0
      })
      .fromTo(menuRef.current,
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.45, ease: 'power3.out' }
      )
      .fromTo(menuLinksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      );
  }, { scope: navRef });

  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = 'hidden';
    tlRef.current.play();
  };

  const closeMenu = () => {
    tlRef.current.reverse().then(() => {
      setMenuOpen(false);
      document.body.style.overflow = '';
      gsap.set(menuRef.current, { visibility: 'hidden' });
    });
  };

  const toggleMenu = () => {
    menuOpen ? closeMenu() : openMenu();
  };

  const scrollToSection = (id) => {
    if (menuOpen) closeMenu();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navLinks = [
    { id: '1', name: 'Home', href: '#home' },
    { id: '2', name: 'About', href: '#about' },
    { id: '3', name: 'Services', href: '#services' },
    { id: '4', name: 'Case Studies', href: '#case-studies' },
    { id: '5', name: 'Gallery', href: '#gallery' },
    { id: '6', name: 'Contact', href: '#contact' },
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
            <img src="https://ik.imagekit.io/zvgp583fb/WhatsApp%20Image%202026-04-10%20at%208.20.09%20AM.jpeg" alt="Chef Choice Consultancy" className={styles.logoImg} />
            <div className={styles.logoText}>
              <span className={styles.logoName}>CHEF CHOICE CONSULTANCY</span>
              <span className={styles.logoSub}>by Chef Arpit Macwan</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className={styles.links}>
            {navLinks.map((link) => (
              <button 
                type="button"
                key={link.name} 
                onClick={() => scrollToSection(link.href.substring(1))}
                className={`${styles.navLink} ${activeSection === link.href.substring(1) ? styles.navLinkActive : ''}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button 
            type="button"
            className={`${styles.hamburger} ${menuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
          >
            <span className={styles.line1}></span>
            <span className={styles.line2}></span>
            <span className={styles.line3}></span>
          </button>

          {/* Mobile Menu Overlay */}
          <nav 
            ref={menuRef}
            id="mobile-nav-menu"
            className={styles.mobileMenu}
            aria-hidden={!menuOpen}
            aria-label="Mobile navigation"
            role="navigation"
          >
            <div className={styles.mobileLinks}>
              {navLinks.map((link, i) => (
                <button 
                  type="button"
                  key={link.id} 
                  ref={el => menuLinksRef.current[i] = el}
                  className={styles.mobileNavLink}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={() => scrollToSection(link.href.substring(1))}
                >
                  {link.name}
                </button>
              ))}
            </div>
            
            <div style={{ marginTop: '40px', textAlign: 'center', fontFamily: 'Roboto Condensed, sans-serif', color: 'rgba(255,248,240,0.5)', fontSize: '14px', lineHeight: '1.8' }}>
              <div>+91-720-1020-208</div>
              <div>arpitrmacwan@gmail.com</div>
            </div>

            <div className={styles.mobileSocials}>
              <a 
                href="https://instagram.com/chefarpitmacwan" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Chef Arpit Macwan on Instagram" 
                className={styles.socialLink}
                tabIndex={menuOpen ? 0 : -1}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C08552" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="#C08552"/>
                </svg>
                <span>Instagram</span>
              </a>

              <a 
                href="https://linkedin.com/in/chefarpitmacwan" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Chef Arpit Macwan on LinkedIn" 
                className={styles.socialLink}
                tabIndex={menuOpen ? 0 : -1}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C08552" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="3"/>
                  <line x1="8" y1="11" x2="8" y2="16"/>
                  <line x1="8" y1="8" x2="8" y2="8.5"/>
                  <path d="M12 16v-5M12 11c1-1 4-1 4 2v3"/>
                </svg>
                <span>LinkedIn</span>
              </a>
            </div>

          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
