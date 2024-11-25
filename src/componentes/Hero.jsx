import React from 'react';
import { Parallax } from 'react-scroll-parallax';

function Hero() {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')"
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <div className="z-20 text-center px-4 sm:px-6 lg:px-8">
        <Parallax translateY={[-20, 20]}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">Desarrollador MERN Stack</h1>
        </Parallax>
        <Parallax translateY={[-15, 15]}>
          <p className="text-xl sm:text-2xl text-white mb-8">Construyendo aplicaciones web robustas y escalables</p>
        </Parallax>
        <Parallax translateY={[-10, 10]}>
          <a href="#contacto" className="bg-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-indigo-700 transition duration-300">
            Contáctame
          </a>
        </Parallax>
      </div>
    </div>
  );
}

export default Hero;

