import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './ChefImage.module.css';

const ChefImage = ({ src, alt, aspectRatio = "3/4", label = "AM", className }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (isLoaded && imgRef.current) {
      gsap.to(imgRef.current, { opacity: 1, duration: 0.6 });
    }
  }, [isLoaded]);

  return (
    <div 
      className={`${styles.wrapper}${className ? ` ${className}` : ''}`} 
      style={{ aspectRatio }}
    >
      {src ? (
        <img 
          ref={imgRef}
          src={src} 
          alt={alt} 
          className={styles.image}
          style={{ opacity: 0 }}
          onLoad={() => setIsLoaded(true)}
        />
      ) : (
        <div className={styles.placeholder}>
          <div className={styles.content}>
            <span className={styles.monogram}>{label}</span>
            <span className={styles.comingSoon}>[ Photo Coming Soon ]</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefImage;
