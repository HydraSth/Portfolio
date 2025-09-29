import React, { useState, useEffect } from 'react';
import { Parallax } from 'react-scroll-parallax';

function Estadisticas() {
  const [counters, setCounters] = useState({
    proyectos: 0,
    clientes: 0,
    experiencia: 0,
    tecnologias: 0
  });

  const estadisticas = [
    { 
      etiqueta: 'Proyectos Completados', 
      valor: 15, 
      icon: '🚀',
      color: 'from-green-500 to-emerald-500'
    },
    { 
      etiqueta: 'Clientes Satisfechos', 
      valor: 8, 
      icon: '😊',
      color: 'from-gray-500 to-gray-600'
    },
    { 
      etiqueta: 'Años de Experiencia', 
      valor: 3, 
      icon: '⭐',
      color: 'from-green-600 to-emerald-600'
    },
    { 
      etiqueta: 'Tecnologías Dominadas', 
      valor: 12, 
      icon: '🛠️',
      color: 'from-gray-600 to-gray-700'
    },
  ];

  useEffect(() => {
    const animateCounters = () => {
      estadisticas.forEach((stat, index) => {
        let start = 0;
        const end = stat.valor;
        const duration = 2000;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          
          setCounters(prev => ({
            ...prev,
            [Object.keys(prev)[index]]: Math.floor(start)
          }));
        }, 16);
      });
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800"></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Parallax translateY={[-20, 20]}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Mis Logros
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Números que reflejan mi experiencia y dedicación en el desarrollo web
            </p>
          </div>
        </Parallax>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {estadisticas.map((estadistica, index) => (
            <Parallax key={index} translateY={[0, 30]} speed={5} easing="easeInQuad">
              <div className="glass-strong rounded-lg p-6 md:p-8 text-center group hover:scale-105 transition-all duration-500">
                <div className={`w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r ${estadistica.color} rounded-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl md:text-3xl">{estadistica.icon}</span>
                </div>
                
                <div className="mb-2">
                  <span className="text-3xl md:text-4xl font-bold text-white">
                    {counters[Object.keys(counters)[index]]}+
                  </span>
                </div>
                
                <p className="text-sm md:text-base text-white/80 font-medium">
                  {estadistica.etiqueta}
                </p>
              </div>
            </Parallax>
          ))}
        </div>

        {/* Additional info */}
        <Parallax translateY={[-15, 15]}>
          <div className="text-center mt-16">
            <div className="glass rounded-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Por qué elegirme?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Desarrollo Rápido</h4>
                  <p className="text-sm">Entrega eficiente sin comprometer la calidad</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Calidad Garantizada</h4>
                  <p className="text-sm">Código limpio y bien documentado</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold mb-2">Soporte Continuo</h4>
                  <p className="text-sm">Acompañamiento durante todo el proyecto</p>
                </div>
              </div>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}

export default Estadisticas;

