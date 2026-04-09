import React, { useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar/Navbar';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Services from './components/Services/Services';
import Stats from './components/Stats/Stats';
import Marquee from './components/Marquee/Marquee';
import Process from './components/Process/Process';
import Testimonials from './components/Testimonials/Testimonials';
import Awards from './components/Awards/Awards';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import CaseStudies from './components/CaseStudies/CaseStudies';
import MenuSamples from './components/MenuSamples/MenuSamples';
import './styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="app">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <Navbar />
          <main>
            <section id="home">
              <Hero />
            </section>
            <section id="about">
              <About />
            </section>
            <Marquee />
            <section id="services">
              <Services />
            </section>
            <CaseStudies />
            <MenuSamples />
            <Stats />
            <Process />
            <Testimonials />
            <section id="awards">
              <Awards />
            </section>
            <section id="contact">
              <Contact />
            </section>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;
