import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Process.module.css';

const EASE = 'power3.out';

const steps = [
  {
    number: '01',
    title: 'Discovery & Vision Alignment',
    description: 'We begin with a deep-dive conversation — understanding your brand story, business goals, target audience, and current challenges. No two clients are alike, and our solutions reflect that.'
  },
  {
    number: '02',
    title: 'Audit & Analysis',
    description: 'A thorough assessment of your existing kitchen operations, menu performance, cost structures, and team capabilities. We identify gaps and opportunities with precision.'
  },
  {
    number: '03',
    title: 'Strategy Blueprint',
    description: 'We deliver a comprehensive, tailored action plan — covering menu changes, kitchen workflows, staff training priorities, and concept refinements. Your roadmap to excellence.'
  },
  {
    number: '04',
    title: 'Execution & Implementation',
    description: 'Hands-on involvement in bringing the strategy to life. From training your kitchen team to standardizing recipes and setting up SOPs — we\'re there on the ground with you.'
  },
  {
    number: '05',
    title: 'Review, Refine & Optimize',
    description: 'Post-implementation audits and quality reviews ensure everything is working as designed. We tweak, improve, and optimize until the results speak for themselves.'
  }
];

const Process = () => {
  const sectionRef = useRef(null);
  const progressLineRef = useRef(null);

  useGSAP(() => {
    let mm = gsap.matchMedia();

    mm.add({
      isDesktop: "(min-width: 901px)",
      isMobile: "(max-width: 900px)"
    }, (context) => {
      let { isDesktop, isMobile } = context.conditions;

      gsap.fromTo(
        progressLineRef.current,
        { scaleX: isDesktop ? 0 : 1, scaleY: isMobile ? 0 : 1 },
        {
          scaleX: 1,
          scaleY: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: isDesktop ? 'top 60%' : 'top 60%',
            end: isDesktop ? 'bottom 70%' : 'bottom 80%',
            scrub: 1,
            invalidateOnRefresh: true
          }
        }
      );

      // Steps stagger entry
      const stepEls = sectionRef.current.querySelectorAll(`.${styles.step}`);
      
      if (isDesktop) {
        gsap.from(stepEls, {
          y: 40, opacity: 0, stagger: 0.15, duration: 0.7, ease: EASE,
          onStart: () => { stepEls.forEach(el => el.style.willChange = 'opacity, transform') },
          onComplete: () => { stepEls.forEach(el => el.style.willChange = 'auto') },
          scrollTrigger: { trigger: sectionRef.current, start: 'top 65%', invalidateOnRefresh: true }
        });
      } else {
        stepEls.forEach((el) => {
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
    <section className={styles.process} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.sectionLabel}>HOW WE WORK</span>
          <h2 className={styles.title}>YOUR JOURNEY TO CULINARY <span>EXCELLENCE</span></h2>
          <p className={styles.subtitle}>
            A structured, proven approach that takes your F&B vision
            from idea to extraordinary reality.
          </p>
        </div>

        <div className={styles.timeline}>
          {/* Background line */}
          <div className={styles.baseLine}></div>
          {/* Animated progress line */}
          <div className={styles.progressLine} ref={progressLineRef}></div>

          <div className={styles.stepsRow}>
            {steps.map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.circle}>
                  <span className={styles.circleNumber}>{step.number}</span>
                </div>
                <div className={styles.stepContent}>
                  <span className={styles.stepLabel}>STEP {step.number}</span>
                  <h4 className={styles.stepTitle}>{step.title.toUpperCase()}</h4>
                  <p className={styles.stepDesc}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
