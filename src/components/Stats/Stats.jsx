import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Stats.module.css';

const stats = [
  { value: 15,  suffix: '+', label: 'Years of F&B Expertise' },
  { value: 50,  suffix: '+', label: 'Brands Successfully Elevated' },
  { value: 200, suffix: '+', label: 'Dishes Developed & Standardized' },
  { value: 8,   suffix: '+', label: 'Cuisine Specializations' }
];

const Stats = () => {
  const sectionRef = useRef(null);
  const numberRefs = useRef([]);

  useGSAP(() => {
    stats.forEach(({ value, suffix }, i) => {
      const el = numberRefs.current[i];
      if (!el) return;

      gsap.fromTo(
        { val: 0 },
        { val: 0 },
        {
          val: value,
          duration: 2,
          ease: 'power2.out',
          onStart: () => { el.style.willChange = 'opacity, transform'; }, // Cleanup prep
          onComplete: () => { el.style.willChange = 'auto'; }, // Memory cleanup
          onUpdate() {
            el.textContent = Math.round(this.targets()[0].val) + suffix;
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            once: true,
            invalidateOnRefresh: true
          }
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.statsStrip} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>BY THE NUMBERS</span>
          <h2 className={styles.title}>A LEGACY BUILT ON <span>RESULTS</span></h2>
        </div>

        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <div key={i} className={styles.statItem}>
              <span
                className={styles.number}
                ref={el => numberRefs.current[i] = el}
              >
                0{stat.suffix}
              </span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
