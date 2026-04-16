import React, { forwardRef } from 'react';
import styles from './NeuButton.module.css';

const NeuButton = forwardRef(({ 
  children, 
  text, 
  onClick, 
  type = 'button', 
  className = '', 
  fullWidth = false,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={`${styles.neuButton} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      {...props}
    >
      {children || text}
    </button>
  );
});

export default NeuButton;
