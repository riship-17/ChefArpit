import React from 'react';
import styles from './SectionLabel.module.css';

const SectionLabel = ({ children, light = false }) => {
  return (
    <span className={styles.label} data-light={light}>
      {children}
    </span>
  );
};

export default SectionLabel;
