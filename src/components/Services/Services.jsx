import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SectionLabel from '../shared/SectionLabel/SectionLabel';
import styles from './Services.module.css';

const EASE = 'power3.out';

/* ——— SVG Icon Components ——— */
const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <line x1="7" y1="8" x2="17" y2="8"/>
    <line x1="7" y1="12" x2="17" y2="12"/>
    <line x1="7" y1="16" x2="13" y2="16"/>
  </svg>
);

const KitchenIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="10" width="18" height="11" rx="2"/>
    <path d="M12 6C12 4 10.5 2 8 2"/>
    <path d="M12 6C12 4 13.5 2 16 2"/>
    <line x1="3" y1="15" x2="21" y2="15"/>
  </svg>
);

const TrainingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21V19C17 16.79 15.21 15 13 15H5C2.79 15 1 16.79 1 19V21"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M23 21V19C23 17.13 21.81 15.53 20.12 14.97"/>
    <path d="M16 3.13C17.69 3.69 18.88 5.29 18.88 7.16C18.88 7.52 18.84 7.87 18.76 8.2"/>
    <path d="M16 0V4M14 2H18"/>
  </svg>
);

const ConceptIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18H15M10 22H14M12 2C8.13 2 5 5.13 5 9C5 11.38 6.19 13.47 8 14.74V17C8 17.55 8.45 18 9 18H15C15.55 18 16 17.55 16 17V14.74C17.81 13.47 19 11.38 19 9C19 5.13 15.87 2 12 2Z"/>
  </svg>
);

const QualityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"/>
    <path d="M9 12L11 14L15 10"/>
  </svg>
);

const StylingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9"/>
    <ellipse cx="12" cy="10" rx="4" ry="2"/>
    <path d="M8 14C9 16 15 16 16 14"/>
  </svg>
);

const iconMap = {
  menu: <MenuIcon />,
  kitchen: <KitchenIcon />,
  training: <TrainingIcon />,
  concept: <ConceptIcon />,
  quality: <QualityIcon />,
  styling: <StylingIcon />,
};

/* ——— Services Data ——— */
const services = [
  {
    numeral: 'I',
    title: 'Menu Development & Curation',
    description: 'Crafting menus that balance creativity, cost efficiency, and guest delight. From signature dishes to seasonal updates — every item tells a story.',
    points: [
      'Menu engineering and costing',
      'Signature dish development',
      'Seasonal & themed menu creation',
      'Dietary inclusive menu planning'
    ],
    icon: 'menu'
  },
  {
    numeral: 'II',
    title: 'Kitchen Setup & Optimization',
    description: 'Designing commercial kitchens that work as hard as your team. From layout planning to equipment selection — built for performance.',
    points: [
      'Commercial kitchen planning & layout',
      'Equipment selection and vendor guidance',
      'Workflow optimization for speed & hygiene',
      'Staff structuring and role distribution'
    ],
    icon: 'kitchen'
  },
  {
    numeral: 'III',
    title: 'Culinary Staff Training',
    description: 'Your kitchen is only as strong as your team. We develop skills, instill discipline, and elevate performance at every station.',
    points: [
      'Skill development for chefs & kitchen staff',
      'Plating technique & presentation training',
      'Hygiene standards & kitchen discipline',
      'Specialty workshops (molecular gastronomy, French cuisine)'
    ],
    icon: 'training'
  },
  {
    numeral: 'IV',
    title: 'Restaurant Concept Development',
    description: 'From a blank page to a fully realized dining destination. We help you build brands that guests remember and return to.',
    points: [
      'Concept ideation and brand identity',
      'Culinary storytelling & theme-based dining',
      'Branding alignment, decor guidance & food philosophy',
      'Competitor positioning and market differentiation'
    ],
    icon: 'concept'
  },
  {
    numeral: 'V',
    title: 'Quality Control & SOP Creation',
    description: 'Consistency is the hallmark of great restaurants. We create systems that maintain excellence — every shift, every plate, every time.',
    points: [
      'SOPs for food production & service',
      'Recipe standardization and portion control',
      'Mystery audits and food quality assessments',
      'Compliance and hygiene checklist systems'
    ],
    icon: 'quality'
  },
  {
    numeral: 'VI',
    title: 'Food Styling & Plating Consultation',
    description: "In today's visual-first world, food must look as extraordinary as it tastes. We train your team to plate with intention and beauty.",
    points: [
      'High-end food presentation for luxury dining & social media',
      'Training chefs in visual appeal and Instagram-ready plating',
      'Collaboration with photographers and content creators',
      'Brand-consistent presentation guidelines'
    ],
    icon: 'styling'
  }
];

const premiumPoints = [
  'Curated fine-dining at private venues',
  'Luxury catering and chef\'s table services',
  'Seasonal or themed pop-up restaurant execution',
  'Corporate and high-profile event culinary direction'
];

const Services = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const premiumRef = useRef(null);

  useGSAP(() => {
    const cards = gridRef.current.querySelectorAll(`.${styles.card}`);
    gsap.from(cards, {
      y: 50, opacity: 0, duration: 0.7, stagger: 0.1, ease: EASE,
      scrollTrigger: { trigger: gridRef.current, start: 'top 75%' }
    });

    gsap.from(premiumRef.current, {
      y: 40, opacity: 0, duration: 0.8, ease: EASE,
      scrollTrigger: { trigger: premiumRef.current, start: 'top 80%' }
    });
  }, { scope: sectionRef });

  const handleCardEnter = (e) => {
    gsap.to(e.currentTarget, {
      y: -8,
      boxShadow: '0 16px 40px rgba(75,46,43,0.1)',
      borderTopWidth: '3px',
      borderTopColor: 'var(--gold)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleCardLeave = (e) => {
    gsap.to(e.currentTarget, {
      y: 0,
      boxShadow: 'none',
      borderTopWidth: '1px',
      borderTopColor: 'rgba(192,133,82,0.2)',
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <section className={styles.services} ref={sectionRef}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header}>
          <SectionLabel>WHAT WE OFFER</SectionLabel>
          <h2 className={styles.title}>Services Built for F&B Excellence</h2>
          <p className={styles.subtitle}>
            From concept to kitchen, from menu to mastery — every service
            is designed to deliver measurable results and unforgettable dining experiences.
          </p>
        </div>

        {/* Card Grid */}
        <div className={styles.grid} ref={gridRef}>
          {services.map((service, index) => (
            <div
              key={index}
              className={styles.card}
              onMouseEnter={handleCardEnter}
              onMouseLeave={handleCardLeave}
            >
              <span className={styles.numeral}>{service.numeral}</span>
              <div className={styles.icon}>{iconMap[service.icon]}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.description}</p>
              <ul className={styles.pointsList}>
                {service.points.map((point, i) => (
                  <li key={i} className={styles.point}>
                    <span className={styles.pointDash}>—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Premium Card */}
        <div className={styles.premiumCard} ref={premiumRef}>
          <div className={styles.premiumLeft}>
            <span className={styles.premiumNumeral}>VII</span>
            <SectionLabel light>PREMIUM SERVICE</SectionLabel>
            <h3 className={styles.premiumTitle}>
              Exclusive Experiences, Curated for the Extraordinary
            </h3>
            <p className={styles.premiumDesc}>
              From intimate chef's table dinners to large-scale luxury
              pop-ups — we design and execute dining experiences that leave lasting impressions.
            </p>
          </div>

          <div className={styles.premiumRight}>
            <ul className={styles.premiumPoints}>
              {premiumPoints.map((point, i) => (
                <li key={i} className={styles.premiumPoint}>
                  <span className={styles.arrow}>→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className={styles.premiumCta}>
              Enquire About Private Events →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
