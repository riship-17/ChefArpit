import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ChefImage from '../shared/ChefImage/ChefImage';
import styles from './Hero.module.css';

const EASE = 'power3.out';

const statsData = [
  { target: 15, label: 'Years F&B Expertise', suffix: '+' },
  { target: 50, label: 'Brands Elevated', suffix: '+' },
  { target: 8, label: 'Cuisines Mastered', suffix: '+' },
  { target: 100, label: 'Client Commitment', suffix: '%' },
];

const Hero = () => {
  const containerRef = useRef(null);
  const heroTagRef = useRef(null);
  const heroH1Ref = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnsRef = useRef(null);
  const imageFrameRef = useRef(null);

  const statsRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const statNumRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 1.5 });
    const heroH1Lines = heroH1Ref.current.querySelectorAll('span');

    // Entrance animations
    tl.from(heroTagRef.current, { y: 30, opacity: 0, duration: 0.6, ease: EASE })
      .from(heroH1Lines, { y: 50, opacity: 0, duration: 0.7, stagger: 0.15, ease: EASE }, '-=0.3')
      .from(heroSubRef.current, { y: 30, opacity: 0, duration: 0.6, ease: EASE }, '-=0.4')
      .from(heroBtnsRef.current, { y: 20, opacity: 0, duration: 0.5, ease: EASE }, '-=0.3')
      .from(statsRefs.map(r => r.current), { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.2')
      .from(imageFrameRef.current, { x: 60, opacity: 0, duration: 0.9, ease: EASE }, '-=0.8');

    // Stats counter animation (runs after entrance timeline completes)
    tl.add(() => {
      statsData.forEach(({ target, suffix }, index) => {
        const numRef = statNumRefs[index];
        gsap.to({ val: 0 }, {
          val: target,
          duration: 1.5,
          ease: 'power1.out',
          onUpdate() {
            if (numRef.current) {
              numRef.current.textContent = Math.round(this.targets()[0].val) + suffix;
            }
          },
        });
      });
    }, '-=0.5');
  }, { scope: containerRef });

  return (
    <section className={styles.hero} ref={containerRef}>
      <div className={styles.container}>

        {/* Left Column */}
        <div className={styles.left}>
          <span className={styles.heroTag} ref={heroTagRef}>
            CULINARY CONSULTANT · AHMEDABAD, GUJARAT
          </span>

          <h1 className={styles.heroH1} ref={heroH1Ref}>
            <span>Where <em>Culinary Vision</em></span>
            <span>Meets Excellence</span>
          </h1>

          <p className={styles.heroSub} ref={heroSubRef}>
            Chef Arpit Macwan transforms restaurants, hotels, and food brands into
            extraordinary dining destinations — through strategy, creativity, and
            15+ years of mastery.
          </p>

          <div className={styles.ctaGroup} ref={heroBtnsRef}>
            <button className={styles.primaryBtn}>Explore Our Services</button>
            <button className={styles.secondaryBtn}>Book a Consultation</button>
          </div>

          <div className={styles.statsBar}>
            {statsData.map((stat, i) => (
              <div key={i} className={styles.statItem} ref={statsRefs[i]}>
                <span className={styles.statNum} ref={statNumRefs[i]}>
                  0{stat.suffix}
                </span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className={styles.right}>
          <div className={styles.decorText}>CHEF CHOICE CONSULTANCY</div>

          <div className={styles.imageFrameOuter} ref={imageFrameRef}>
            <div className={styles.imageFrameInner}>
              <ChefImage 
                src="https://res.cloudinary.com/dgry55pvk/image/upload/v1775677794/WhatsApp-Image-2025-06-04-at-11.36.27_ys7cik.jpg" 
                alt="Chef Arpit Macwan" 
                label="AM" 
                aspectRatio="4/5" 
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
