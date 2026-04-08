import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SectionLabel from '../shared/SectionLabel/SectionLabel';
import styles from './About.module.css';

const EASE = 'power3.out';

const credentials = [
  'Brand Chef', 'F&B Consultant', 'Restaurant Strategist',
  'Ahmedabad Based', '15+ Years Experience', 'Menu Architect'
];

const pillars = [
  {
    title: 'Elegance in Execution',
    desc: 'Every detail crafted with precision and purpose',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: 'Precision & Passion',
    desc: 'Data-driven strategies fueled by culinary love',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 12L12 22L22 12L12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: 'Innovation with Integrity',
    desc: 'Fresh ideas grounded in proven industry principles',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9 18H15M10 22H14M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    title: 'Client-Centered Excellence',
    desc: 'Your success is the only metric that matters',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21V19C17 16.79 15.21 15 13 15H5C2.79 15 1 16.79 1 19V21" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 21V19C23 17.13 21.81 15.53 20.12 14.97" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.12 2.97C17.81 3.53 19 5.13 19 7C19 8.87 17.81 10.47 16.12 11.03" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

const About = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const pillarsGridRef = useRef(null);

  useGSAP(() => {
    gsap.from(leftRef.current, {
      x: -60, opacity: 0, duration: 0.9, ease: EASE,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
    });

    gsap.from(rightRef.current, {
      x: 60, opacity: 0, duration: 0.9, ease: EASE, delay: 0.15,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
    });

    const pillarEls = pillarsGridRef.current.querySelectorAll(`.${styles.pillar}`);
    gsap.from(pillarEls, {
      y: 30, opacity: 0, duration: 0.6, stagger: 0.12,
      scrollTrigger: { trigger: pillarsGridRef.current, start: 'top 80%' }
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.about} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Left Column — Dark Quote Card */}
          <div className={styles.left} ref={leftRef}>
            <div className={styles.quoteCard}>
              <div className={styles.quoteTop}>
                <span className={styles.quoteMark}>"</span>
                <p className={styles.quoteText}>
                  There is no sincerer love than the love of food.
                </p>
                <span className={styles.quoteAuthor}>— George Bernard Shaw</span>
              </div>

              <div className={styles.quoteBottom}>
                <span className={styles.expertiseLabel}>EXPERTISE</span>
                <div className={styles.tags}>
                  {credentials.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Bio + Pillars */}
          <div className={styles.right} ref={rightRef}>
            <SectionLabel>ABOUT THE CHEF</SectionLabel>
            <h2 className={styles.title}>Chef Arpit Macwan</h2>
            <div className={styles.accentLine}></div>

            <div className={styles.bio}>
              <p>
                Chef Arpit Macwan is a distinguished culinary consultant and Brand Chef
                based in Ahmedabad, Gujarat. As the founder of Chef's Choice Consultancy,
                he specializes in transforming kitchens and elevating dining experiences
                through innovative menu development and operational excellence.
              </p>
              <p>
                With a career rooted in both culinary artistry and strategic consultancy,
                Chef Arpit has collaborated with restaurants, hotels, and food brands to
                craft memorable gastronomic journeys. His expertise encompasses everything
                from conceptualizing restaurant themes to training kitchen staff — ensuring
                each establishment achieves both flavor and functionality.
              </p>
            </div>

            <div className={styles.pillarsGrid} ref={pillarsGridRef}>
              {pillars.map((pillar, i) => (
                <div key={i} className={styles.pillar}>
                  <div className={styles.pillarIcon}>{pillar.icon}</div>
                  <h4 className={styles.pillarTitle}>{pillar.title}</h4>
                  <p className={styles.pillarDesc}>{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
