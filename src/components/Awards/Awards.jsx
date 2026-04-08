import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SectionLabel from '../shared/SectionLabel/SectionLabel';
import styles from './Awards.module.css';

const EASE = 'power3.out';

const TrophyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5C3.67 9 3 9.67 3 10.5V12C3 12.83 3.67 13.5 4.5 13.5H6"/>
    <path d="M18 9H19.5C20.33 9 21 9.67 21 10.5V12C21 12.83 20.33 13.5 19.5 13.5H18"/>
    <path d="M6 6V15C6 18.31 8.69 21 12 21C15.31 21 18 18.31 18 15V6H6Z"/>
    <line x1="6" y1="6" x2="18" y2="6"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="10" y1="23" x2="14" y2="23"/>
  </svg>
);

const awards = [
  {
    year: '2023',
    award: 'Best F&B Consultant — Gujarat',
    body: 'Gujarat Hospitality Excellence Awards'
  },
  {
    year: '2022',
    award: 'Brand Chef of the Year',
    body: 'India Food & Beverage Forum'
  },
  {
    year: '2021',
    award: 'Top Culinary Innovator',
    body: 'Ahmedabad Restaurant Association'
  },
  {
    year: '2019',
    award: 'Excellence in Menu Development',
    body: 'National Hospitality Summit'
  },
  {
    year: '2018',
    award: 'Rising Star — F&B Consultancy',
    body: 'India Chef Awards'
  }
];

const Awards = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useGSAP(() => {
    const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
    gsap.from(cards, {
      scale: 0.88, opacity: 0, duration: 0.6, stagger: 0.1, ease: EASE,
      scrollTrigger: { trigger: gridRef.current, start: 'top 75%' }
    });
  }, { scope: sectionRef });

  return (
    <section className={styles.awards} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <SectionLabel light>RECOGNITION</SectionLabel>
          <h2 className={styles.title}>Awards & Achievements</h2>
          <p className={styles.subtitle}>
            A career defined by culinary excellence, industry recognition,
            and an unwavering commitment to raising the bar.
          </p>
        </div>

        <div className={styles.grid} ref={gridRef}>
          {awards.map((award, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.icon}><TrophyIcon /></div>
              <span className={styles.year}>{award.year}</span>
              <h4 className={styles.awardName}>{award.award}</h4>
              <p className={styles.body}>{award.body}</p>
              <div className={styles.cornerDecor}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
