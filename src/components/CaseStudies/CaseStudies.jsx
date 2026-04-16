import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './CaseStudies.module.css';
import NeuButton from '../shared/NeuButton/NeuButton';

const EASE = 'power3.out';

const caseStudies = [
  {
    id: "01",
    tag: "ROOFTOP CAFÉ",
    client: "BLACK BAGHEERA",
    location: "Sola, Ahmedabad",
    headline: "Aligning a wild vibe with kitchen precision.",
    subline: "When the atmosphere is this loud, the food and service can't afford to be quiet.",
    accentColor: "#1a3c34", // Moody Jungle Green
    accentLight: "rgba(26, 60, 52, 0.05)",
    story: {
      before: "A stunning rooftop venue with a strong brand identity but a menu that lacked focus. Kitchen operations were struggling to keep up with the vibe's promise during peak hours.",
      shift: "The food now carries the same weight as the view. Operational standards have turned a high-pressure kitchen into a streamlined representative of the brand's wild spirit."
    },
    signals: [
      {
        icon: "leaf",
        headline: "Kitchen Chaos → Clarity",
        text: "The backend system now moves as smoothly as the guest experience itself."
      },
      {
        icon: "check",
        headline: "Menu Focus Refined",
        text: "Streamlined the culinary journey into a profitable, brand-aligned experience."
      },
      {
        icon: "star",
        headline: "Operational Confidence",
        text: "Staff empowerment through standards that ensure every plate meets the vision."
      }
    ]
  },
  {
    id: "02",
    tag: "LUXURY CAFÉ",
    client: "CAFEZZA BE CAFFEINATED",
    location: "Kudasan, Gandhinagar",
    headline: "Making every detail match the fusion promise.",
    subline: "Moving a top-tier café from 'very good' to an undeniable premium destination.",
    accentColor: "#C5A059", // Warm Gold
    accentLight: "rgba(197, 160, 89, 0.08)",
    story: {
      before: "Already a favorite for fusion food, but the service choreography and brand storytelling were missing the final polish required for true luxury status.",
      shift: "Every touchpoint now reflects the premium promise. The staff doesn't just serve; they curate an experience that guests recognize as elite."
    },
    signals: [
      {
        icon: "star",
        headline: "Service Choreography",
        text: "Trained hospitality that matches the premium nature of the interior and menu."
      },
      {
        icon: "check",
        headline: "Refined Storytelling",
        text: "Tightened the menu narrative to reflect fusion expertise and luxury positioning."
      },
      {
        icon: "leaf",
        headline: "Consistent Excellence",
        text: "From first coffee to late-night fusion, the quality stays locked across every order."
      }
    ]
  },
  {
    id: "03",
    tag: "CONTEMPORARY FINE DINE",
    client: "THE MASALA SECRETS",
    location: "Kudasan, Gandhinagar",
    headline: "Engineering consistency for a five-star vision.",
    subline: "Building the operational engine to deliver luxury at scale, every single night.",
    accentColor: "#4a1010", // Deep Burgundy
    accentLight: "rgba(74, 16, 16, 0.05)",
    story: {
      before: "A vision of luxury that lacked the underlying operational architecture to deliver five-star consistency during high-pressure dinner services.",
      shift: "The systems now match the vision. Excellence is no longer an accident; it's a documented, repeatable, and trained standard across the brigade."
    },
    signals: [
      {
        icon: "check",
        headline: "Five-Star Systems",
        text: "Engineered the operational foundation needed to deliver high-end consistency."
      },
      {
        icon: "star",
        headline: "Kitchen Flow Mastery",
        text: "Optimized the brigade workflow to ensure plating precision during rush hours."
      },
      {
        icon: "arrow",
        headline: "Service Protocols",
        text: "Documented every step of the guest journey for a flawless fine-dining feel."
      }
    ]
  }
];

const Icon = ({ name, color }) => {
  const icons = {
    leaf: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1 9.8a7 7 0 0 1-9 8.2z"></path>
        <path d="M11 20v-5.5"></path>
      </svg>
    ),
    star: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    ),
    check: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    ),
    arrow: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="17" x2="17" y2="7"></line>
        <polyline points="7 7 17 7 17 17"></polyline>
      </svg>
    )
  };
  return icons[name] || null;
};

const CaseStudies = () => {
  const sectionRef = useRef(null);
  const headerLeftRef = useRef(null);
  const headerRightRef = useRef(null);
  const cardRefs = useRef([]);
  const ctaBlockRef = useRef(null);

  useGSAP(() => {
    // Section header — left/right split reveal:
    gsap.from(headerLeftRef.current, {
      x: -25, opacity: 0, duration: 0.5, ease: EASE,
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", once: true }
    });
    gsap.from(headerRightRef.current, {
      x: 25, opacity: 0, duration: 0.5, ease: EASE,
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", once: true }
    });

    // Each card — staggered reveal:
    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      gsap.from(card, {
        y: 30, opacity: 0, duration: 0.6, ease: EASE,
        scrollTrigger: { trigger: card, start: "top 85%", once: true }
      });

      // Left panel elements sequential:
      const leftElements = card.querySelectorAll(`.${styles.badge}, .${styles.caseId}, .${styles.clientName}, .${styles.headline}, .${styles.subline}, .${styles.locationTag}`);
      gsap.from(leftElements, {
        x: -15, opacity: 0, stagger: 0.08, duration: 0.5, ease: EASE,
        scrollTrigger: { trigger: card, start: "top 80%", once: true }
      });

      // Signal blocks sequence:
      const signals = card.querySelectorAll(`.${styles.signalBlock}`);
      gsap.from(signals, {
        y: 20, opacity: 0, stagger: 0.1, duration: 0.5, ease: EASE,
        delay: 0.3,
        scrollTrigger: { trigger: card, start: "top 75%", once: true }
      });

      // Story columns:
      const stories = card.querySelectorAll(`.${styles.storyCol}`);
      gsap.from(stories, {
        y: 15, opacity: 0, stagger: 0.15, duration: 0.5, ease: EASE,
        delay: 0.5,
        scrollTrigger: { trigger: card, start: "top 70%", once: true }
      });
    });

    // CTA block reveal:
    gsap.from(ctaBlockRef.current, {
      y: 20, opacity: 0, duration: 0.6, ease: EASE,
      scrollTrigger: { trigger: ctaBlockRef.current, start: "top bottom", once: true }
    });

  }, { scope: sectionRef });

  return (
    <section className={styles.section} ref={sectionRef} id="case-studies">
      <div className={styles.container}>

        {/* Section Header */}
        <div className={styles.headerLine}>
          <div className={styles.headerLeft} ref={headerLeftRef}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowLine}></span>
              PROVEN RESULTS
            </div>
            <h2 id="case-studies-heading" className={styles.title}><span>RESTAURANT</span> STORIES<br />THAT SCALE.</h2>
          </div>
          <div className={styles.headerRight} ref={headerRightRef}>
            <p className={styles.desc}>
              Real challenges. Tailored strategies. Measurable outcomes.
              We don't quote numbers because every problem is unique —
              we build the systems that make those numbers inevitable.
            </p>
            <p className={styles.note}>Featured Partners: Black Bagheera, Cafezza, The Masala Secrets.</p>
          </div>
        </div>

        <div className={styles.mainDivider}></div>

        {/* Case Studies Grid */}
        <div className={styles.casesGrid}>
          {caseStudies.map((caseStudy, index) => (
            <div
              key={caseStudy.id}
              className={styles.cardOuter}
              ref={el => cardRefs.current[index] = el}
              style={{ '--brand-accent': caseStudy.accentColor, '--brand-light': caseStudy.accentLight }}
            >

              {/* Left Panel */}
              <div className={styles.leftPanel}>
                <div className={styles.bgNumeral}>{caseStudy.id}</div>

                <div className={styles.leftContent}>
                  <div className={styles.badge}>
                    <span className={styles.badgeDot}></span>
                    {caseStudy.tag}
                  </div>

                  <div className={styles.clientGroup}>
                    <div className={styles.caseId}>CASE STUDY — {caseStudy.id}</div>
                    <h3 className={styles.clientName}>{caseStudy.client}</h3>
                    <div className={styles.locationTag}>{caseStudy.location}</div>
                  </div>

                  <div className={styles.leftDivider}></div>

                  <div className={styles.headingGroup}>
                    <h4 className={styles.headline}>{caseStudy.headline}</h4>
                    <p className={styles.subline}>{caseStudy.subline}</p>
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className={styles.rightPanel}>

                {/* Signal Strip */}
                <div className={styles.signalStrip}>
                  {caseStudy.signals.map((signal, idx) => (
                    <div key={idx} className={styles.signalBlock}>
                      <div className={styles.signalIcon}>
                        <Icon name={signal.icon} color={caseStudy.accentColor} />
                      </div>
                      <div className={styles.signalMeta}>
                        <h5 className={styles.signalHeadline}>{signal.headline}</h5>
                        <p className={styles.signalText}>{signal.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.panelDivider}></div>

                {/* Story Panel */}
                <div className={styles.storyPanel}>
                  <div className={styles.storyCol}>
                    <div className={styles.colLabel}>
                      <span className={styles.colLine}></span>
                      THE BEFORE
                    </div>
                    <p className={styles.storyText}>{caseStudy.story.before}</p>
                  </div>
                  <div className={styles.storyCol}>
                    <div className={styles.colLabel}>
                      <span className={styles.colLine}></span>
                      THE SHIFT
                    </div>
                    <p className={styles.storyText}>{caseStudy.story.shift}</p>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.ctaContainer} ref={ctaBlockRef}>
          <div className={styles.ctaBgText}>YOUR STORY</div>
          <div className={styles.ctaLeft}>
            <span className={styles.ctaEyebrow}>START YOUR TRANSFORMATION</span>
            <h3 className={styles.ctaHeading}>YOUR RESTAURANT COULD BE THE NEXT STORY HERE.</h3>
            <p className={styles.ctaSub}>Every engagement starts with a conversation — not a contract.</p>
          </div>
          <div className={styles.ctaRight}>
            <NeuButton 
              text="LET'S TALK ABOUT YOUR PLACE →" 
              className={styles.ctaNeuBtn}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default CaseStudies;
