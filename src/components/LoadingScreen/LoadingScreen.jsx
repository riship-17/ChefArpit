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
      duration: 1,
      ease: 'power2.inOut'
    });

    // Exit animation
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      delay: 0.4,
      onComplete: () => {
        setVisible(false);
        if (onComplete) onComplete();
      }
    });

    return () => tl.kill();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.content}>
        <span className={styles.label}>CHEF'S CHOICE CONSULTANCY</span>
        <h1 className={styles.title}>Chef Arpit Macwan</h1>
        <div className={styles.line} ref={lineRef}></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
