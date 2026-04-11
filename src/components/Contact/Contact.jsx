import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Contact.module.css';

const EASE = 'power3.out';

/* ——— SVG Icons ——— */
const LocationIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.03 7.03 1 12 1C16.97 1 21 5.03 21 10Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92V19.92C22 20.48 21.56 20.93 21 20.97C20.64 21 20.28 21 19.92 21C10.4 21 3 13.6 3 4.08C3 3.72 3 3.36 3.03 3C3.07 2.44 3.52 2 4.08 2H7.08C7.56 2 7.97 2.34 8.05 2.81C8.14 3.37 8.3 3.92 8.53 4.44L7.08 5.89C8.43 8.5 10.5 10.57 13.11 11.92L14.56 10.47C15.08 10.7 15.63 10.86 16.19 10.95C16.66 11.03 17 11.44 17 11.92V16.92H22Z" />
  </svg>
);

const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M22 4L12 13L2 4" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6V12L16 14" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const serviceOptions = [
  '— Select a Service —',
  'Menu Development & Curation',
  'Kitchen Setup & Optimization',
  'Culinary Staff Training',
  'Restaurant Concept Development',
  'Quality Control & SOP Creation',
  'Food Styling & Plating Consultation',
  'Pop-Up Events & Private Dining',
  'General Consultation'
];

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const submitBtnRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', service: '', message: ''
  });
  const [errors, setErrors] = useState({});

  useGSAP(() => {
    const leftPane = sectionRef.current.querySelector(`.${styles.left}`);
    gsap.from(leftPane, {
      x: -50, opacity: 0, duration: 0.8, ease: EASE,
      onStart: () => { leftPane.style.willChange = 'opacity, transform'; },
      onComplete: () => { leftPane.style.willChange = 'auto'; },
      scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true, invalidateOnRefresh: true }
    });

    const fields = formRef.current.querySelectorAll(`.${styles.field}`);
    gsap.from(fields, {
      x: 40, opacity: 0, stagger: 0.08, duration: 0.6, ease: EASE,
      onStart: () => { fields.forEach(f => f.style.willChange = 'opacity, transform') },
      onComplete: () => { fields.forEach(f => f.style.willChange = 'auto') },
      scrollTrigger: { trigger: formRef.current, start: 'top 90%', once: true, invalidateOnRefresh: true }
    });
  }, { scope: sectionRef });

  const validateField = (name, value) => {
    let error = '';
    if (name === 'name' && !value.trim()) error = 'Name is required.';
    if (name === 'email') {
      if (!value.trim()) error = 'Email is required.';
      else if (!/^\S+@\S+\.\S+$/.test(value)) error = 'Please enter a valid email address.';
    }
    if (name === 'service' && !value) error = 'Please select a service.';
    if (name === 'message' && !value.trim()) error = 'Message cannot be empty.';
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleBlur = (e) => validateField(e.target.name, e.target.value);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isValid = ['name', 'email', 'service', 'message'].every(key => validateField(key, formData[key]));
    
    if (isValid) {
      gsap.to(submitBtnRef.current, { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1 });
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleBtnEnter = () => gsap.to(submitBtnRef.current, { scale: 1.02, duration: 0.2 });
  const handleBtnLeave = () => gsap.to(submitBtnRef.current, { scale: 1, duration: 0.2 });

  return (
    <section className={styles.contact} ref={sectionRef} id="contact">
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Left Column */}
          <div className={styles.left}>
            <span className={styles.sectionLabel}>GET IN TOUCH</span>
            <h2 id="contact-heading" className={styles.title}>
              LET'S BUILD SOMETHING <span>EXTRAORDINARY</span> TOGETHER
            </h2>
            <p className={styles.subtitle}>
              Whether you're launching a new restaurant, optimizing an existing one,
              or planning an exclusive dining experience — we're ready to help.
            </p>

            <div className={styles.details}>
              <div className={styles.detailRow}>
                <span className={styles.detailIcon}><LocationIcon /></span>
                <span className={styles.detailText}>Ahmedabad, Gujarat — 380059</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailIcon}><PhoneIcon /></span>
                <span className={styles.detailText}>+91-720-1020-208</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailIcon}><EmailIcon /></span>
                <span className={styles.detailText}>arpitrmacwan@gmail.com</span>
              </div>
              <div className={styles.detailRow}>
                <span className={styles.detailIcon}><ClockIcon /></span>
                <div className={styles.detailText}>
                  <span>Monday – Friday: 11:00 AM – 8:00 PM</span>
                  <span>Saturday: By Appointment Only</span>
                  <span>Sunday: Closed</span>
                </div>
              </div>
            </div>

            {/* Social */}
            <div className={styles.social}>
              <span className={styles.socialLabel}>Follow Chef Arpit</span>
              <a href="#" className={styles.instaBtn} aria-label="Instagram">
                <InstagramIcon />
                <span>Instagram</span>
              </a>
            </div>

            {/* Watermark */}
            <div className={styles.watermark} aria-hidden="true">
              <span>15+ Years</span>
              <span>of F&B Excellence</span>
            </div>
          </div>

          {/* Right Column — Form */}
          <div className={styles.right}>
            <form className={styles.form} ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Contact Form">
              <h3 className={styles.formHeading}>SEND US A MESSAGE</h3>

              <div className={styles.field}>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  autoComplete="name"
                />
                <label htmlFor="contact-name">Full Name <span aria-hidden="true">*</span></label>
                {errors.name && <span id="contact-name-error" className={styles.errorText} role="alert">{errors.name}</span>}
              </div>

              <div className={styles.field}>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  autoComplete="email"
                />
                <label htmlFor="contact-email">Email Address <span aria-hidden="true">*</span></label>
                {errors.email && <span id="contact-email-error" className={styles.errorText} role="alert">{errors.email}</span>}
              </div>

              <div className={styles.field}>
                <input
                  type="tel"
                  name="phone"
                  id="contact-phone"
                  placeholder=" "
                  value={formData.phone}
                  onChange={handleChange}
                  autoComplete="tel"
                />
                <label htmlFor="contact-phone">Phone Number</label>
              </div>

              <div className={styles.field}>
                <select
                  name="service"
                  id="contact-service"
                  value={formData.service}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-invalid={!!errors.service}
                  aria-describedby={errors.service ? 'contact-service-error' : undefined}
                >
                  {serviceOptions.map((opt, i) => (
                    <option key={i} value={i === 0 ? '' : opt} disabled={i === 0}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.service && <span id="contact-service-error" className={styles.errorText} role="alert">{errors.service}</span>}
              </div>

              <div className={styles.field}>
                <textarea
                  name="message"
                  id="contact-message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your Message..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                ></textarea>
                {errors.message && <span id="contact-message-error" className={styles.errorText} role="alert">{errors.message}</span>}
              </div>

              <button
                type="submit"
                className={styles.submitBtn}
                ref={submitBtnRef}
                onMouseEnter={handleBtnEnter}
                onMouseLeave={handleBtnLeave}
              >
                SEND MESSAGE →
              </button>

              <div aria-live="polite">
                 {submitted && (
                  <p className={styles.success}>
                    ✓ Message sent! We'll get back to you within 24 hours.
                  </p>
                )}
              </div>

              <p className={styles.privacy}>
                Your information is kept strictly confidential.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
