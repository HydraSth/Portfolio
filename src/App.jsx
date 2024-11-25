import React from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import Navbar from './componentes/Navbar';
import Hero from './componentes/Hero';
import Habilidades from './componentes/Habilidades';
import Proyectos from './componentes/Proyectos';
import Testimonios from './componentes/Testimonios';
import Estadisticas from './componentes/Estadisticas';
import Contacto from './componentes/Contacto';
import PieDePagina from './componentes/PieDePagina';

function App() {
  return (
    <ParallaxProvider>
      <div className="bg-gray-100 min-h-screen w-full">
        <Navbar />
        <main>
          <Hero />
          <Habilidades />
          <Proyectos />
          <Testimonios />
          <Estadisticas />
          <Contacto />
        </main>
        <PieDePagina />
      </div>
    </ParallaxProvider>
  );
}

export default App;

