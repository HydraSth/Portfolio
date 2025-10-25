import React, { useEffect, useRef } from 'react';
import Header from './componentes/Navbar';
import HeroSection from './componentes/Hero';
import SkillsSection from './componentes/Habilidades';
import ProjectsSection from './componentes/Proyectos';
import ExperienceSection from './componentes/Experiencia';
import ContactSection from './componentes/Contacto';
import Footer from './componentes/PieDePagina';

function App() {
  const mainRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      isScrollingRef.current = true;

      // Wait for scroll to stop (500ms of inactivity)
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        adjustScrollPosition();
      }, 200);
    };

    const adjustScrollPosition = () => {
      if (!mainRef.current) return;

      const sections = mainRef.current.querySelectorAll('section');
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const viewportCenter = scrollTop + viewportHeight / 2;

      let closestSection = null;
      let closestDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = scrollTop + rect.top;
        const sectionCenter = sectionTop + rect.height / 2;
        const distance = Math.abs(viewportCenter - sectionCenter);

        // Only consider sections that are reasonably close (within 35% of viewport)
        if (distance < viewportHeight * 0.35 && distance < closestDistance) {
          closestDistance = distance;
          closestSection = section;
        }
      });

      // If we found a close section, gently scroll to align it
      if (closestSection) {
        const rect = closestSection.getBoundingClientRect();
        const sectionTop = scrollTop + rect.top;
        const targetScroll = sectionTop;
        const currentScroll = scrollTop;
        const diff = Math.abs(targetScroll - currentScroll);

        // Only adjust if the difference is small (subtle adjustment with wider range)
        if (diff > 10 && diff < viewportHeight * 0.2) {
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth'
          });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main ref={mainRef}>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;

