import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import NeuButton from '../shared/NeuButton/NeuButton';
import styles from './MenuSamples.module.css';

const EASE = 'power3.out';

const menuSamples = [
  {
    id: "01",
    bindingColor: "#4B2E2B",
    category: "FINE DINING",
    title: "Progressive Indian Tasting Menu",
    year: "2023",
    description: "A 10-course progressive Indian tasting menu built for a luxury fine dining concept in Ahmedabad. Features seasonal ingredients, molecular techniques, chef's notes, wine pairing suggestions, and complete allergen documentation.",
    specs: {
      courses: "10 Courses",
      format: "Tasting / Degustation",
      cuisine: "Progressive Indian",
      pages: "18 pages",
      fileSize: "2.4 MB",
      fileType: "PDF"
    },
    tags: ["Tasting Menu", "Wine Pairing", "Allergen Matrix", "Plating Notes"],
    available: true,
    filePath: "/samples/progressive-indian-tasting-menu.pdf"
  },
  {
    id: "02",
    bindingColor: "#C08552",
    category: "CASUAL DINING",
    title: "Optimized All-Day Dining Menu",
    year: "2022",
    description: "A fully restructured all-day dining menu for a mid-scale restaurant — reduced from 120 to 48 items. Includes full recipe costing, food cost percentage per dish, GP analysis, and portion standardization guide.",
    specs: {
      courses: "48 Dishes",
      format: "All-Day Dining",
      cuisine: "Multi-Cuisine",
      pages: "24 pages",
      fileSize: "3.1 MB",
      fileType: "PDF"
    },
    tags: ["Food Cost Analysis", "GP Calculations", "Portion Guide", "48 Dishes"],
    available: true,
    filePath: "/samples/all-day-dining-menu.pdf"
  },
  {
    id: "03",
    bindingColor: "#8C5A3C",
    category: "CLOUD KITCHEN",
    title: "Cloud Kitchen Multi-Brand Menu Suite",
    year: "2022",
    description: "Three separate delivery-optimized menus developed for a cloud kitchen — each with its own brand identity, demographic targeting, pricing strategy, and packaging recommendation. Includes delivery cost factoring for each menu.",
    specs: {
      courses: "3 Full Menus",
      format: "Delivery / Cloud Kitchen",
      cuisine: "Indian · Asian · Continental",
      pages: "32 pages",
      fileSize: "4.7 MB",
      fileType: "PDF"
    },
    tags: ["3 Brand Menus", "Delivery Optimized", "Pricing Strategy", "90+ Dishes"],
    available: true,
    filePath: "/samples/cloud-kitchen-suite.pdf"
  },
  {
    id: "04",
    bindingColor: "#4B2E2B",
    category: "PRIVATE DINING",
    title: "Luxury Pop-Up Event Menu",
    year: "2024",
    description: "A bespoke 6-course menu for a high-profile corporate private dining event. Includes full service choreography notes, individual plating guides per course, dietary alternatives, and event timeline integrated with kitchen pacing.",
    specs: {
      courses: "6 Courses",
      format: "Pop-Up / Private Dining",
      cuisine: "Contemporary European",
      pages: "14 pages",
      fileSize: "1.8 MB",
      fileType: "PDF"
    },
    tags: ["Service Notes", "Plating Guides", "Event Timeline", "Dietary Alternatives"],
    available: false,
    filePath: null
  }
];

const MenuSamples = () => {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const disclaimerRef = useRef(null);
  const cardRefs = useRef([]);
  const ctaStripRef = useRef(null);
  const modalCardRef = useRef(null);
  const successRef = useRef(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', business: '' });
  const [isMobileScreen, setIsMobileScreen] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  React.useEffect(() => {
    const handleResize = () => setIsMobileScreen(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const lockScroll = () => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
  };

  const unlockScroll = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  };

  useGSAP(() => {
    // Section header fade up:
    gsap.from([eyebrowRef.current, headingRef.current, subRef.current, disclaimerRef.current], {
      y: 20, opacity: 0, stagger: 0.06, duration: 0.4, ease: EASE,
      onStart: () => { [eyebrowRef.current, headingRef.current, subRef.current, disclaimerRef.current].forEach(el => { if(el) el.style.willChange = 'opacity, transform'; }) },
      onComplete: () => { [eyebrowRef.current, headingRef.current, subRef.current, disclaimerRef.current].forEach(el => { if(el) el.style.willChange = 'auto'; }) },
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", once: true, invalidateOnRefresh: true }
    });

    // Cards stagger up:
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, {
        y: 25, opacity: 0, duration: 0.4, ease: EASE,
        onStart: () => { card.style.willChange = 'opacity, transform'; },
        onComplete: () => { card.style.willChange = 'auto'; },
        scrollTrigger: {
          trigger: card, start: "top bottom",
          once: true,
          toggleActions: "play none none none",
          invalidateOnRefresh: true
        }
      });

      // Binding stripe config:
      const stripe = card.querySelector(`.${styles.bindingStripe}`);
      if (stripe) {
        gsap.from(stripe, {
          scaleX: 0, duration: 0.6, ease: "power3.out", transformOrigin: "left center",
          scrollTrigger: { trigger: card, start: "top bottom", once: true, invalidateOnRefresh: true }
        });
      }

      // Tags stagger in:
      const tags = card.querySelectorAll(`.${styles.tag}`);
      if (tags.length) {
        gsap.from(tags, {
          scale: 0.85, opacity: 0, stagger: 0.06, duration: 0.4, ease: "back.out(1.4)",
          onStart: () => { tags.forEach(t => t.style.willChange = 'opacity, transform') },
          onComplete: () => { tags.forEach(t => t.style.willChange = 'auto') },
          scrollTrigger: { trigger: card, start: "top bottom", once: true, invalidateOnRefresh: true }, delay: 0.3
        });
      }
    });

    // Bottom CTA strip:
    if (ctaStripRef.current) {
      gsap.from(ctaStripRef.current, {
        y: 15, opacity: 0, duration: 0.4, ease: EASE,
        onStart: () => { ctaStripRef.current.style.willChange = 'opacity, transform'; },
        onComplete: () => { ctaStripRef.current.style.willChange = 'auto'; },
        scrollTrigger: { trigger: ctaStripRef.current, start: "top bottom", once: true, invalidateOnRefresh: true }
      });
    }

  }, { scope: sectionRef });

  const handleDownloadClick = (sample) => {
    setActiveMenu(sample);
    setModalOpen(true);
    setSubmitted(false);
    lockScroll();
    
    // Defer animation slightly to allow DOM to render modal
    setTimeout(() => {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        gsap.fromTo(modalCardRef.current,
          { y: "100%", opacity: 1, scale: 1 },
          { y: "0%", duration: 0.4, ease: "power3.out" }
        );
      } else {
        gsap.fromTo(modalCardRef.current,
          { scale: 0.88, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.6)" }
        );
      }
    }, 10);
  };

  const closeModal = () => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
       gsap.to(modalCardRef.current, {
        y: "100%", duration: 0.3, ease: "power2.in",
        onComplete: () => {
          setModalOpen(false);
          setActiveMenu(null);
          unlockScroll();
        }
      });
    } else {
      gsap.to(modalCardRef.current, {
        scale: 0.92, opacity: 0, y: 20, duration: 0.3,
        onComplete: () => {
          setModalOpen(false);
          setActiveMenu(null);
          unlockScroll();
        }
      });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const triggerDownload = (path, title) => {
      const link = document.createElement('a');
      link.href = path;
      link.setAttribute('download', title + '.pdf');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (link.parentNode) document.body.removeChild(link);
      }, 100);
    };

    if (activeMenu?.filePath) {
      triggerDownload(activeMenu.filePath, activeMenu.title);
    }

    setTimeout(() => {
      gsap.fromTo(successRef.current, 
        { scale: 0.9, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.4)" }
      );
    }, 10);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.section} ref={sectionRef} id="menu-samples">
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.eyebrowRow} ref={eyebrowRef}>
            <span className={styles.line}></span>
            <span className={styles.label}>SAMPLE WORK</span>
            <span className={styles.line}></span>
          </div>
          <h2 id="menu-heading" className={styles.title} ref={headingRef}>
            EXPLORE OUR<br/><span>MENU</span> CREATIONS
          </h2>
          <p className={styles.subHeading} ref={subRef}>
            A curated portfolio of menus developed across dining formats, concepts, and cuisines. Each crafted with intention, costed with precision, and built to perform.
          </p>
          <p className={styles.disclaimer} ref={disclaimerRef}>
            Client names and proprietary pricing removed to protect confidentiality.
          </p>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {menuSamples.map((sample, i) => (
            <div 
              key={sample.id} 
              className={`${styles.cardOuter} ${sample.available ? styles.cardAvailable : styles.cardUnavailable}`}
              ref={el => cardRefs.current[i] = el}
            >
              <div 
                className={styles.bindingStripe} 
                style={{ backgroundColor: sample.bindingColor }}
              >
                <div className={styles.bindingDeco}></div>
              </div>

              <div className={styles.cardBody}>
                <div className={styles.row1}>
                  <div className={styles.categoryBadge} style={{ color: sample.bindingColor, borderColor: `${sample.bindingColor}33`, backgroundColor: `${sample.bindingColor}14` }}>
                    {sample.category}
                  </div>
                  <div className={styles.fileMeta}>
                    <span className={styles.tagYear}>{sample.year}</span>
                    <span className={styles.sep}>·</span>
                    <span className={styles.tagFileType}>{sample.specs.fileType}</span>
                  </div>
                </div>

                <div className={styles.row2}>
                  <div className={styles.docId}>DOC — {sample.id}</div>
                  <h3 className={styles.cardTitle}>{sample.title}</h3>
                </div>

                <div className={styles.row3}>
                  <p className={styles.descText}>{sample.description}</p>
                </div>

                <div className={styles.row4}>
                  {sample.tags.slice(0, isMobileScreen ? 3 : 4).map((tag, tIdx) => (
                    <span key={tIdx} className={styles.tag}>{tag}</span>
                  ))}
                </div>

                <div className={styles.cardDivider}></div>

                <div className={styles.row5}>
                  <div className={styles.specsGrid}>
                    <div className={styles.specItem}>
                      <span className={styles.specLabel}>COURSES</span>
                      <span className={styles.specValue}>{sample.specs.courses}</span>
                    </div>
                    <div className={styles.specItem}>
                      <span className={styles.specLabel}>FORMAT</span>
                      <span className={styles.specValue}>{sample.specs.format}</span>
                    </div>
                    <div className={`${styles.specItem} ${styles.specCuisine}`}>
                      <span className={styles.specLabel}>CUISINE</span>
                      <span className={styles.specValue}>{sample.specs.cuisine}</span>
                    </div>
                    <div className={`${styles.specItem} ${styles.specEmpty}`}></div>
                    <div className={styles.specItem}>
                      <span className={styles.specLabel}>PAGES</span>
                      <span className={styles.specValue}>{sample.specs.pages}</span>
                    </div>
                    <div className={styles.specItem}>
                      <span className={styles.specLabel}>FILE SIZE</span>
                      <span className={styles.specValue}>{sample.specs.fileSize}</span>
                    </div>
                  </div>

                  <div className={styles.actionRight}>
                    {sample.available ? (
                      <button type="button" className={styles.downloadBtn} onClick={() => handleDownloadClick(sample)}>
                        <div className={styles.downloadIcon}>
                          <svg viewBox="0 0 24 24">
                            <path d="M12 5V19M12 19L5 12M12 19L19 12" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className={styles.dlTextWrap}>
                          <span className={styles.dlTop}>DOWNLOAD SAMPLE</span>
                          <span className={styles.dlBottom}>{sample.specs.pages} · {sample.specs.fileSize}</span>
                        </div>
                      </button>
                    ) : (
                      <div className={styles.unavailableBtn}>
                        <div className={styles.unavIcon}>
                          <svg viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <div className={styles.dlTextWrap}>
                          <span className={styles.unavTop}>Coming Soon</span>
                          <span className={styles.unavBottom}>Sample being prepared</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* CTA Strip */}
        <div className={styles.stripContainer} ref={ctaStripRef}>
          <div className={styles.stripWrapper}>
            <div className={styles.stripBgNumber}>→</div>
            <div className={styles.stripLeft}>
              <span className={styles.stripLabel}>NEED SOMETHING CUSTOM?</span>
              <h3 className={styles.stripHeading}>
                Every menu we develop is built for your kitchen, your concept, and your margins.
              </h3>
            </div>
            <div className={styles.stripRight}>
              <NeuButton 
                text="REQUEST A CUSTOM MENU →" 
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Modal */}
      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} ref={modalCardRef}>
            <div className={styles.modalTopBand} style={{ backgroundColor: activeMenu?.bindingColor }}></div>
            <div className={styles.modalContent}>
              <button type="button" className={styles.closeBtn} onClick={closeModal}>×</button>
              
              {!submitted ? (
                <>
                  <div className={styles.pdfIconWrap}>
                    <svg viewBox="0 0 24 24">
                      <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span className={styles.pdfText}>PDF</span>
                  </div>
                  <h3 className={styles.modalHeading}>Get Your Free Sample</h3>
                  <div className={styles.modalMenuTitle}>{activeMenu?.title}</div>
                  <p className={styles.modalDesc}>
                    Enter your details below and we'll send the sample directly to your inbox.
                  </p>
                  
                  <div className={styles.goldDivider}></div>

                  <form className={styles.formFields} onSubmit={handleFormSubmit}>
                    <div className={styles.field}>
                      <input type="text" id="name" name="name" placeholder=" " required value={formData.name} onChange={handleChange} />
                      <label htmlFor="name">Your Name</label>
                    </div>
                    <div className={styles.field}>
                      <input type="email" id="email" name="email" placeholder=" " required value={formData.email} onChange={handleChange} />
                      <label htmlFor="email">Email Address</label>
                    </div>
                    <div className={styles.field}>
                      <input type="text" id="business" name="business" placeholder=" " required value={formData.business} onChange={handleChange} />
                      <label htmlFor="business">Restaurant / Business</label>
                    </div>
                    <NeuButton 
                      type="submit" 
                      fullWidth
                      text="SEND ME THE SAMPLE →"
                    />
                  </form>
                  <p className={styles.privacyNote}>No spam. Just one PDF, straight to your inbox.</p>
                </>
              ) : (
                <div className={styles.successContent} ref={successRef}>
                  <svg className={styles.successIcon} viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12L11 15L16 9" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <h3 className={styles.successHeading}>On Its Way!</h3>
                  <p className={styles.successDesc}>
                    Check your inbox for the {activeMenu?.title}. Usually arrives within 2 minutes.
                  </p>
                  <button type="button" className={styles.closeTextBtn} onClick={closeModal}>
                    Close this window
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default MenuSamples;
