import { useState, useEffect, lazy, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Marquee from './components/Marquee/Marquee';
import Services from './components/Services/Services';
import Stats from './components/Stats/Stats';
import Process from './components/Process/Process';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './styles/globals.css';

const Gallery = lazy(() => import('./components/Gallery/Gallery'));
const CaseStudies = lazy(() => import('./components/CaseStudies/CaseStudies'));
const MenuSamples = lazy(() => import('./components/MenuSamples/MenuSamples'));

// ─── Register GSAP plugins ─────────────────────
gsap.registerPlugin(ScrollTrigger, useGSAP);

// ─── Reduced motion global setup ───────────────
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  gsap.defaults({ duration: 0, ease: 'none' });
  ScrollTrigger.config({ limitCallbacks: true });
}

// ─── GSAP global defaults ──────────────────────
gsap.defaults({
  ease: 'power3.out',
  duration: 0.8
});

// ─── Mobile viewport height fix (--vh) ─────────
function setVh() {
  document.documentElement.style.setProperty('--vh', window.innerHeight * 0.01 + 'px');
}
setVh();
window.addEventListener('resize', setVh);

function App() {
  const [loading, setLoading] = useState(true);

  // ─── Kill all ScrollTriggers on unmount ──────
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      ScrollTrigger.clearScrollMemory();
      window.scrollTo(0, 0);
    };
  }, []);

  // ─── Refresh ScrollTrigger on resize (deep) ───
  useEffect(() => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh(true); // deep refresh — recalculates all positions
      }, 150);
    };

    // Listen for refreshInit to catch mobile chrome changes
    ScrollTrigger.addEventListener("refreshInit", () => ScrollTrigger.update());

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.removeEventListener("refreshInit", () => ScrollTrigger.update());
      clearTimeout(resizeTimer);
    };
  }, []);

  // ─── Refresh after fonts and images load ──────
  useEffect(() => {
    document.fonts.ready.then(() => {
      ScrollTrigger.refresh(true);
    });
  }, []);

  const suspenseFallback = (
    <div style={{
      height: '400px',
      background: '#FFF8F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Roboto Condensed', sans-serif",
      fontSize: '13px',
      letterSpacing: '3px',
      color: 'rgba(192,133,82,0.5)',
      textTransform: 'uppercase'
    }}>
      Loading...
    </div>
  );

  return (
    <>
      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      <Navbar />

      <main id="main-content">
        <section id="home" aria-labelledby="home-heading">
          <Hero isLoading={loading} />
        </section>

        <section id="about" aria-labelledby="about-heading">
          <About />
        </section>

        <Marquee />

        <section id="services" aria-labelledby="services-heading">
          <Services />
        </section>

        <section id="case-studies" aria-labelledby="case-studies-heading">
          <Suspense fallback={suspenseFallback}>
            <CaseStudies />
          </Suspense>
        </section>

        <section id="menu-samples" aria-labelledby="menu-heading">
          <Suspense fallback={suspenseFallback}>
            <MenuSamples />
          </Suspense>
        </section>

        <Stats />

        <Process />

        <Testimonials />

        <Suspense fallback={suspenseFallback}>
            <Gallery />
        </Suspense>

        <section id="contact" aria-labelledby="contact-heading">
          <Contact />
        </section>
      </main>

      <Footer />
    </>
  );
}

export default App;
