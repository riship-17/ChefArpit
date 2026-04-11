import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './CaseStudies.module.css';

const EASE = 'power3.out';

const caseStudies = [
  {
    id: "01",
    tag: "MENU ENGINEERING",
    headline: "How We Increased Restaurant Revenue by 30%",
    subline: "A bloated menu, declining loyalty, and rising food costs — fixed in 8 weeks.",
    client: "Mid-Scale Casual Dining Restaurant",
    location: "Ahmedabad, Gujarat",
    duration: "8 Weeks",
    challenge: {
      label: "THE SITUATION",
      text: "The restaurant was operating with 120+ menu items with no clear identity. Kitchen staff were overwhelmed, food costs had crept to 38%, and repeat customer rates were declining quarter on quarter. The menu was the problem — and no one had named it yet."
    },
    approach: {
      label: "THE APPROACH",
      steps: [
        "Full menu audit — dish-level profitability mapped across every item",
        "Reduced menu from 120 to 48 focused, high-margin hero dishes",
        "Developed 6 signature dishes as brand anchors guests return for",
        "Retrained kitchen team on new recipes, plating, and portion standards",
        "Implemented station-level SOPs to lock in consistency every shift"
      ]
    },
    results: [
      { value: "30",  suffix: "%", label: "Revenue Increase", sublabel: "within 3 months of relaunch" },
      { value: "22",  suffix: "%", label: "Food Cost Reduction", sublabel: "from 38% down to 29.6%" },
      { value: "48",  suffix: "",  label: "Optimized Menu Items", sublabel: "from 120+ dishes" },
      { value: "8",   suffix: "wk", label: "Project Duration", sublabel: "from audit to full implementation" }
    ],
    accentColor: "#C08552"
  },
  {
    id: "02",
    tag: "KITCHEN BUILD",
    headline: "Zero to Operational: A Cloud Kitchen Launched in 6 Weeks",
    subline: "An empty space. No equipment. No team. No menu. Operational in 42 days.",
    client: "Cloud Kitchen Startup",
    location: "Surat, Gujarat",
    duration: "6 Weeks",
    challenge: {
      label: "THE SITUATION",
      text: "A first-time F&B entrepreneur had secured a location and funding but had no kitchen, no team, no menu, and no operational knowledge. They needed a full build — from concept to cook — under tight timeline and budget pressure."
    },
    approach: {
      label: "THE APPROACH",
      steps: [
        "Full kitchen layout design for 3 concurrent cuisine production lines",
        "Equipment sourcing with vendor negotiation — 18% under initial budget",
        "Hiring roadmap and kitchen brigade structuring for 12-person team",
        "Recipe development and standardization across 3 menus, 90+ dishes",
        "Complete SOP documentation — every station, every process, written and trained"
      ]
    },
    results: [
      { value: "42",  suffix: "d", label: "Days to Launch", sublabel: "from empty space to first order" },
      { value: "3",   suffix: "",  label: "Cuisine Lines", sublabel: "running concurrently from day one" },
      { value: "90",  suffix: "+", label: "Dishes Standardized", sublabel: "across all 3 brand menus" },
      { value: "18",  suffix: "%", label: "Under Budget", sublabel: "on equipment procurement" }
    ],
    accentColor: "#8C5A3C"
  },
  {
    id: "03",
    tag: "CONCEPT DEVELOPMENT",
    headline: "From Blank Page to Fully Booked — In 12 Weeks",
    subline: "Investors, a venue, and a vision. We turned it into a dining destination.",
    client: "Luxury Fine Dining Venture",
    location: "Ahmedabad, Gujarat",
    duration: "12 Weeks",
    challenge: {
      label: "THE SITUATION",
      text: "The investors had capital and a stunning venue but zero culinary direction. No concept, no brand identity, no chef team, no menu. Ahmedabad's fine dining space was increasingly competitive, and they needed to enter with something people had never seen before."
    },
    approach: {
      label: "THE APPROACH",
      steps: [
        "Concept development — Progressive Indian cuisine with regional storytelling as the brand pillar",
        "Chef recruitment and full brigade structure designed for the concept",
        "10-course tasting menu created with wine and mocktail pairing documentation",
        "Service choreography — FOH training aligned to the culinary narrative",
        "Soft launch strategy with food media outreach and influencer dining coordination"
      ]
    },
    results: [
      { value: "100", suffix: "%", label: "Booked on Opening Week", sublabel: "zero walk-ins — fully reserved" },
      { value: "4.8", suffix: "★", label: "Average Guest Rating", sublabel: "across first 60 covers" },
      { value: "10",  suffix: "",  label: "Course Tasting Menu", sublabel: "with full pairing documentation" },
      { value: "12",  suffix: "wk", label: "Concept to Opening", sublabel: "blank page to first service" }
    ],
    accentColor: "#4B2E2B"
  }
];

const CaseStudies = () => {
  const sectionRef = useRef(null);
  const headerLeftRef = useRef(null);
  const headerRightRef = useRef(null);
  const cardRefs = useRef([]);
  const ctaBlockRef = useRef(null);

  useGSAP(() => {
    // Section header — left/right split reveal:
    gsap.from(headerLeftRef.current, {
      x: -25, opacity: 0, duration: 0.4, ease: EASE,
      onStart: () => { headerLeftRef.current.style.willChange = 'opacity, transform'; },
      onComplete: () => { headerLeftRef.current.style.willChange = 'auto'; },
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", once: true, invalidateOnRefresh: true }
    });
    gsap.from(headerRightRef.current, {
      x: 25, opacity: 0, duration: 0.4, ease: EASE,
      onStart: () => { headerRightRef.current.style.willChange = 'opacity, transform'; },
      onComplete: () => { headerRightRef.current.style.willChange = 'auto'; },
      scrollTrigger: { trigger: sectionRef.current, start: "top bottom", once: true, invalidateOnRefresh: true }
    });

    // Each card — staggered reveal:
    cardRefs.current.forEach((card, i) => {
      gsap.from(card, {
        y: 25, opacity: 0, duration: 0.4, ease: EASE,
        onStart: () => { card.style.willChange = 'opacity, transform'; },
        onComplete: () => { card.style.willChange = 'auto'; },
        scrollTrigger: { trigger: card, start: "top bottom", once: true, toggleActions: "play none none none", invalidateOnRefresh: true }
      });

      // Left panel slides from left:
      const leftPanel = card.querySelector(`.${styles.leftPanel}`);
      gsap.from(leftPanel, {
        x: -25, opacity: 0, duration: 0.4, ease: EASE,
        onStart: () => { leftPanel.style.willChange = 'opacity, transform'; },
        onComplete: () => { leftPanel.style.willChange = 'auto'; },
        scrollTrigger: { trigger: card, start: "top bottom", once: true, invalidateOnRefresh: true }
      });

      // Right panel content fades up in sequence:
      const rightEls = card.querySelectorAll(`.${styles.challengeCol}, .${styles.approachCol}, .${styles.metricsRow}`);
      
      let mm = gsap.matchMedia();
      mm.add({
        isDesktop: "(min-width: 901px)",
        isMobile: "(max-width: 900px)"
      }, (context) => {
        let { isDesktop } = context.conditions;
        
        if (isDesktop) {
          gsap.from(rightEls, {
            y: 15, opacity: 0, stagger: 0.06, duration: 0.35, ease: EASE,
            delay: 0.2,
            onStart: () => { rightEls.forEach(el => el.style.willChange = 'opacity, transform'); },
            onComplete: () => { rightEls.forEach(el => el.style.willChange = 'auto'); },
            scrollTrigger: { trigger: card, start: "top bottom", once: true, invalidateOnRefresh: true }
          });
        } else {
          rightEls.forEach((el) => {
            gsap.from(el, {
              y: 15, opacity: 0, duration: 0.35, ease: EASE,
              onStart: () => { el.style.willChange = 'opacity, transform'; },
              onComplete: () => { el.style.willChange = 'auto'; },
              scrollTrigger: { trigger: el, start: "top bottom", once: true, invalidateOnRefresh: true }
            });
          });
        }
      });

      // Metric numbers count up:
      const metricEls = card.querySelectorAll(`.${styles.metricNumber}`);
      metricEls.forEach((el) => {
        const raw = el.dataset.value;
        const suffix = el.dataset.suffix;
        const num = parseFloat(raw);

        if (!isNaN(num)) {
          gsap.fromTo({ val: 0 }, { val: 0 }, {
            val: num,
            duration: 1.2,
            ease: 'power2.out',
            onStart: () => { el.style.willChange = 'opacity, transform'; }, // Prep for numbers if needed
            onComplete: () => { el.style.willChange = 'auto'; },
            onUpdate() {
              const v = this.targets()[0].val;
              el.textContent = (Number.isInteger(num) ? Math.round(v) : v.toFixed(1)) + suffix;
            },
            scrollTrigger: { trigger: el, start: "top bottom", once: true, invalidateOnRefresh: true }
          });
        }
      });
      
      // Approach step lines draw in on hover
      const steps = card.querySelectorAll(`.${styles.stepItem}`);
      card.addEventListener('mouseenter', () => {
        gsap.from(steps, {
          x: 10, opacity: 0.5, stagger: 0.05, duration: 0.3, overwrite: 'auto'
        });
      });
    });

    // CTA block reveal:
    gsap.from(ctaBlockRef.current, {
      y: 20, opacity: 0, duration: 0.4, ease: EASE,
      onStart: () => { ctaBlockRef.current.style.willChange = 'opacity, transform'; },
      onComplete: () => { ctaBlockRef.current.style.willChange = 'auto'; },
      scrollTrigger: { trigger: ctaBlockRef.current, start: "top bottom", once: true, invalidateOnRefresh: true }
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
            <h2 id="case-studies-heading" className={styles.title}><span>RESULTS</span> THAT<br/>SPEAK FOR THEMSELVES</h2>
          </div>
          <div className={styles.headerRight} ref={headerRightRef}>
            <p className={styles.desc}>
              Real challenges. Tailored strategies. Measurable outcomes.
              Every engagement is built to deliver lasting impact — 
              not just advice, but transformation.
            </p>
            <p className={styles.note}>* All client names anonymized for confidentiality.</p>
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
            >
              
              {/* Left Panel */}
              <div className={styles.leftPanel}>
                <div className={styles.bgNumeral}>{caseStudy.id}</div>
                
                <div className={styles.leftTop}>
                  <div className={styles.badge}>
                    <span className={styles.badgeDot}></span>
                    {caseStudy.tag}
                  </div>
                  <div className={styles.caseId}>CASE STUDY — {caseStudy.id}</div>
                  <h3 className={styles.headline}>{caseStudy.headline}</h3>
                  <p className={styles.subline}>{caseStudy.subline}</p>
                </div>

                <div className={styles.leftBottom}>
                  <div className={styles.leftDivider}></div>
                  <div className={styles.clientGrid}>
                    <div className={styles.clientRow}>
                      <div className={styles.clientLabel}>CLIENT</div>
                      <div className={styles.clientValue}>{caseStudy.client}</div>
                    </div>
                    <div className={styles.locDurRow}>
                      <div className={styles.clientLabel}>LOCATION  ·  DURATION</div>
                      <div className={styles.locDurValue}>{caseStudy.location}  ·  {caseStudy.duration}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Panel */}
              <div className={styles.rightPanel}>
                <div className={styles.topHalf}>
                  
                  <div className={styles.challengeCol}>
                    <div className={styles.colLabel}>
                      <span className={styles.colLine}></span>
                      {caseStudy.challenge.label}
                    </div>
                    <p className={styles.challengeText}>{caseStudy.challenge.text}</p>
                  </div>

                  <div className={styles.approachCol}>
                    <div className={styles.colLabel}>
                      <span className={styles.colLine}></span>
                      {caseStudy.approach.label}
                    </div>
                    <div className={styles.stepsList}>
                      {caseStudy.approach.steps.map((step, idx) => (
                        <div key={idx} className={styles.stepItem}>
                          <div className={styles.stepNum}>0{idx + 1}</div>
                          <div className={styles.stepText}>{step}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className={styles.rightDivider}></div>

                <div className={styles.metricsRow}>
                  {caseStudy.results.map((result, idx) => (
                    <div key={idx} className={styles.metricBlock}>
                      <div className={styles.metricNumber} data-value={result.value} data-suffix={result.suffix}>
                        0{result.suffix}
                      </div>
                      <div className={styles.metricLabel}>{result.label}</div>
                      <div className={styles.metricSub}>{result.sublabel}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.ctaContainer} ref={ctaBlockRef}>
          <div className={styles.ctaBgText}>YOUR STORY</div>
          <div className={styles.ctaLeft}>
            <span className={styles.ctaEyebrow}>READY TO WRITE YOUR CASE STUDY?</span>
            <h3 className={styles.ctaHeading}>EVERY GREAT RESULT STARTS WITH ONE CONVERSATION.</h3>
          </div>
          <div className={styles.ctaRight}>
            <button className={styles.ctaBtn}>START YOUR CONSULTATION →</button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CaseStudies;
