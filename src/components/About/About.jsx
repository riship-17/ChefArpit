import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './About.module.css';

const EASE = 'power3.out';

const credentials = [
  'Brand Chef', 'F&B Consultant', 'Restaurant Strategist',
  'Ahmedabad Based', '15+ Years Experience', 'Menu Architect'
];

const pillars = [
  {
    title: 'ELEGANCE IN EXECUTION',
    desc: 'Every detail crafted with precision and purpose'
  },
  {
    title: 'PRECISION & PASSION',
    desc: 'Data-driven strategies fueled by culinary love'
  },
  {
    title: 'INNOVATION WITH INTEGRITY',
    desc: 'Fresh ideas grounded in proven industry principles'
  },
  {
    title: 'CLIENT-CENTERED EXCELLENCE',
    desc: 'Your success is the only metric that matters'
  }
];

const About = () => {
  const sectionRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const pillarsGridRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 901px)",
      isMobile: "(max-width: 900px)"
    }, (context) => {
      let { isDesktop } = context.conditions;

      gsap.from(leftRef.current, {
        x: -60, opacity: 0, duration: 0.9, ease: EASE,
        onStart: () => { leftRef.current.style.willChange = 'opacity, transform'; },
        onComplete: () => { leftRef.current.style.willChange = 'auto'; },
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', invalidateOnRefresh: true }
      });

      gsap.from(rightRef.current, {
        x: 60, opacity: 0, duration: 0.9, ease: EASE, delay: 0.15,
        onStart: () => { rightRef.current.style.willChange = 'opacity, transform'; },
        onComplete: () => { rightRef.current.style.willChange = 'auto'; },
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', invalidateOnRefresh: true }
      });

      const pillarEls = pillarsGridRef.current.querySelectorAll(`.${styles.pillar}`);
      
      if (isDesktop) {
        gsap.from(pillarEls, {
          y: 30, opacity: 0, duration: 0.6, stagger: 0.12,
          onStart: () => { pillarEls.forEach(el => el.style.willChange = 'opacity, transform') },
          onComplete: () => { pillarEls.forEach(el => el.style.willChange = 'auto') },
          scrollTrigger: { trigger: pillarsGridRef.current, start: 'top 80%', invalidateOnRefresh: true }
        });
      } else {
        pillarEls.forEach((el) => {
          gsap.from(el, {
            y: 30, opacity: 0, duration: 0.6, ease: EASE,
            onStart: () => { el.style.willChange = 'opacity, transform' },
            onComplete: () => { el.style.willChange = 'auto' },
            scrollTrigger: { trigger: el, start: 'top 85%', invalidateOnRefresh: true }
          });
        });
      }
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
            <div className={styles.sectionLabelWrapper}>
              <div className={styles.sectionLabelLine}></div>
              <span className={styles.sectionLabel}>ABOUT THE CHEF</span>
            </div>
            <h2 id="about-heading" className={styles.title}>CHEF ARPIT MACWAN</h2>
            <div className={styles.accentLine}></div>

            <div className={styles.bio}>
              <p className={styles.bioPara}>
                Chef Arpit Macwan is a distinguished culinary consultant and Brand Chef
                based in Ahmedabad, Gujarat. As the founder of Chef Choice Consultancy,
                he specializes in transforming kitchens and elevating dining experiences
                through <span>innovative menu development</span> and <span>operational excellence</span>.
              </p>
              <p className={styles.bioPara}>
                With a career rooted in both culinary artistry and strategic consultancy,
                Chef Arpit has collaborated with restaurants, hotels, and food brands to
                craft <span>memorable gastronomic journeys</span>. His expertise encompasses everything
                from conceptualizing restaurant themes to training kitchen staff — ensuring
                each establishment achieves both flavor and functionality.
              </p>
              <p className={styles.bioClosing}>
                Our philosophy is simple: culinary success demands both an artist's touch and an operator's mind.
              </p>
            </div>

            <div className={styles.pillarsGrid} ref={pillarsGridRef}>
              {pillars.map((pillar, i) => (
                <div key={i} className={styles.pillar}>
                  <h4 className={styles.pillarTitle}>
                    <div className={styles.pillarSquare}></div>
                    {pillar.title}
                  </h4>
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
