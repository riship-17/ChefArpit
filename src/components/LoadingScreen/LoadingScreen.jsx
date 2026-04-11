import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './LoadingScreen.module.css';

const LoadingScreen = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Line growth animation
    tl.to(lineRef.current, {
      width: '80px',
      duration: 0.8,
      delay: 0.5,
      ease: 'power2.inOut'
    });

    // Exit animation (starts at 1.4s)
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.1, // timeline is already at 0.5 + 0.8 = 1.3s, add 0.1s to reach 1.4s
      onComplete: () => {
        setVisible(false);
        if (onComplete) onComplete();
      }
    });

    return () => tl.kill();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className={styles.container} ref={containerRef} role="status" aria-live="polite" aria-busy="true">
      <div className={styles.content}>
        <span className={styles.label}>CHEF CHOICE CONSULTANCY</span>
        <h1 className={styles.title}>CHEF ARPIT MACWAN</h1>
        <div className={styles.subtitle}>Culinary Consultant · Ahmedabad</div>
        <div className={styles.line} ref={lineRef}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
