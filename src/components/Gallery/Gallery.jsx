import React from "react";
import SectionLabel from "../shared/SectionLabel/SectionLabel";
import Masonry from "./Masonry";
import styles from "./Gallery.module.css";

const Gallery = () => {
  // Map cards data to Masonry format with heights for staggered effect
  const masonryItems = cards.map((card, index) => ({
    ...card,
    img: card.url,
    // Assign varying heights for masonry look
    height: [450, 600, 520, 480, 550, 420, 580, 490, 620][index % 9]
  }));

  return (
    <section id="gallery" aria-labelledby="gallery-heading" className={styles.gallerySection}>
      <div className={styles.container}>
        <header className={styles.header}>
          <SectionLabel light>VISUAL JOURNEY</SectionLabel>
          <h2 id="gallery-heading" className={styles.title}>CURATED CULINARY <span>GALLERY</span></h2>
          <p className={styles.subtitle}>
            A glimpse into the artistry and precision that defines our consulting projects. 
            From high-end fine dining concepts to optimized kitchen operations in action.
          </p>
        </header>

        <div className={styles.masonryWrapper}>
          <Masonry 
            items={masonryItems}
            animateFrom="bottom"
            stagger={0.08}
            duration={0.7}
            ease="power3.out"
          />
        </div>
      </div>
      
      <div className={styles.galleryFooter}>
        <span className={styles.indicatorText}>END OF GALLERY</span>
      </div>
    </section>
  );
};

const cards = [
 
  {
    url: "https://ik.imagekit.io/zvgp583fb/WhatsApp%20Image%202026-04-09%20at%203.34.54%20PM.jpeg?updatedAt=1775745277938",
    category: "PREP WORK",
    title: "Precision Craft",
    id: 3,
  },
  {
    url: "https://ik.imagekit.io/zvgp583fb/WhatsApp%20Image%202026-04-09%20at%203.34.38%20PM%20(7).jpeg",
    category: "GOURMET SELECTIONS",
    title: "Menu Excellence",
    id: 5,
  },
  {
    url: "https://ik.imagekit.io/zvgp583fb/WhatsApp%20Image%202026-04-09%20at%203.34.38%20PM%20(6).jpeg",
    category: "HONOURED MOMENTS",
    title: "Trusted by Leaders",
    id: 6,
  },
  {
    url: "https://ik.imagekit.io/zvgp583fb/WhatsApp%20Image%202026-04-09%20at%203.34.38%20PM.jpeg?updatedAt=1775745277938",
    category: "AWARD WINNER",
    title: "Master Chef",
    id: 7,
  },
  {
    url: "https://ik.imagekit.io/zvgp583fb/WhatsApp%20Image%202026-04-09%20at%203.36.43%20PM%20(4).jpeg",
    category: "LUXURY EVENTS",
    title: "Private Curation",
    id: 9,
  },
];

export default Gallery;
