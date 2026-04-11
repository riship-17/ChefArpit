import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Masonry.module.css';

gsap.registerPlugin(ScrollTrigger);

const Masonry = ({ items }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const items = gsap.utils.toArray(`.${styles.masonryItem}`);
    
    items.forEach(el => {
      gsap.from(el, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        onStart: () => { el.style.willChange = 'transform, opacity'; },
        onComplete: () => { el.style.willChange = 'auto'; },
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
          invalidateOnRefresh: true,
          toggleActions: 'play none none none'
        }
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className={styles.masonryGrid}>
      {items.map((item) => (
        <div key={item.id} className={styles.masonryItem}>
          <img
            src={item.url}
            alt={item.title || "Chef's Choice Consultancy — culinary work"}
            loading="lazy"
            decoding="async"
            width={400}
            height={item.height || 300}
          />
          <div className={styles.overlay}>
             <span className={styles.category}>{item.category}</span>
             <h3 className={styles.title}>{item.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
