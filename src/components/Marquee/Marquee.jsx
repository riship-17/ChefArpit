import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Marquee.module.css';

const tags = [
  'MENU ENGINEERING', 'KITCHEN OPTIMIZATION', 'LUXURY DINING', 'FOOD STYLING',
  'SOP CREATION', 'PRIVATE EVENTS', 'RESTAURANT BRANDING', 'CULINARY TRAINING',
  'CONCEPT DEVELOPMENT', 'BRAND STRATEGY', 'RECIPE STANDARDIZATION', 'STAFF DEVELOPMENT'
];

const Marquee = () => {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const tweenRef = useRef(null);

  useGSAP(() => {
    tweenRef.current = gsap.to(innerRef.current, {
      x: '-50%',
      duration: 25,
      ease: 'none',
      repeat: -1
    });

    const container = containerRef.current;
    const handleEnter = () => tweenRef.current?.pause();
    const handleLeave = () => tweenRef.current?.resume();

    container.addEventListener('mouseenter', handleEnter);
    container.addEventListener('mouseleave', handleLeave);

    return () => {
      container.removeEventListener('mouseenter', handleEnter);
      container.removeEventListener('mouseleave', handleLeave);
    };
  }, { scope: containerRef });

  const renderTags = () =>
    tags.map((tag, i) => (
      <span key={i} className={styles.item}>
        <span className={styles.text}>{tag}</span>
        <span className={styles.separator}>·</span>
      </span>
    ));

  return (
    <div className={styles.marquee} ref={containerRef}>
      <div className={styles.inner} ref={innerRef}>
        {renderTags()}
        {renderTags()}
      </div>
    </div>
  );
};

export default Marquee;
