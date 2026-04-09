import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Testimonials.module.css';

const testimonials = [
  {
    quote: "Chef Arpit completely transformed our restaurant's identity. The menu he developed became our biggest differentiator — guests specifically come back for dishes he created. His understanding of both food and business is rare.",
    name: 'Rahul Mehta',
    title: 'Owner, The Spice Route',
    location: 'Ahmedabad'
  },
  {
    quote: "The kitchen setup and SOP work Chef Arpit did for our new outlet saved us months of trial and error. His systems are practical, hygienic, and staff-friendly. Our team now operates like a well-oiled machine.",
    name: 'Priya Desai',
    title: 'F&B Director, Heritage Grand Hotel',
    location: 'Surat'
  },
  {
    quote: "We hired Chef Arpit for our private dining pop-up and the experience was absolutely flawless. The food, presentation, and service choreography were at a Michelin level. Our guests were blown away.",
    name: 'Vikram Shah',
    title: 'Corporate Event Host',
    location: 'Ahmedabad'
  }
];

const Testimonials = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const isPaused = useRef(false);

  useGSAP(() => {
    gsap.from(sectionRef.current, {
      opacity: 0, y: 30, duration: 1,
      scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
    });
  }, { scope: sectionRef });

  const changeTestimonial = useCallback((newIndex) => {
    gsap.to(contentRef.current, {
      opacity: 0, y: 10, duration: 0.25,
      onComplete: () => {
        setActive(newIndex);
        gsap.to(contentRef.current, { opacity: 1, y: 0, duration: 0.35 });
      }
    });
  }, []);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused.current) {
        const next = (active + 1) % testimonials.length;
        changeTestimonial(next);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [active, changeTestimonial]);

  const goTo = (index) => {
    if (index === active) return;
    changeTestimonial(index);
  };

  return (
    <section
      className={styles.testimonials}
      ref={sectionRef}
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>CLIENT VOICES</span>
          <h2 className={styles.title}>WHAT OUR <span>CLIENTS</span> SAY</h2>
        </div>

        <div className={styles.carousel}>
          {/* Large decorative quote mark */}
          <span className={styles.decorQuote}>\u201C</span>

          <div className={styles.content} ref={contentRef}>
            <p className={styles.quote}>{testimonials[active].quote}</p>

            <div className={styles.goldLine}></div>

            <span className={styles.name}>{testimonials[active].name}</span>
            <span className={styles.role}>
              {testimonials[active].title}, {testimonials[active].location}
            </span>
          </div>

          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.active : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
