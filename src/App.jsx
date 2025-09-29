import React from 'react';
import Header from './componentes/Navbar';
import HeroSection from './componentes/Hero';
import SkillsSection from './componentes/Habilidades';
import ProjectsSection from './componentes/Proyectos';
import ExperienceSection from './componentes/Experiencia';
import ContactSection from './componentes/Contacto';
import Footer from './componentes/PieDePagina';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="scroll-snap-container">
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

