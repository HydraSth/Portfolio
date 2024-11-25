import React from 'react';
import { Parallax } from 'react-scroll-parallax';

function Testimonios() {
  const testimonios = [
    {
      cita: "Entregó nuestro proyecto a tiempo y superó nuestras expectativas.",
      autor: "María González",
      cargo: "CEO, TechStart"
    },
    {
      cita: "Recomiendo altamente sus servicios.",
      autor: "Carlos Rodríguez",
      cargo: "CTO, InnovaSoft"
    },
  ];

  return (
    <section id="testimonios" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Parallax translateY={[-20, 20]}>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Lo que dicen mis clientes</h2>
        </Parallax>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonios.map((testimonio, index) => (
            <Parallax key={index} translateY={[0, 30]} speed={5} easing="easeInQuad">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <blockquote className="text-lg text-gray-600 mb-4">"{testimonio.cita}"</blockquote>
                <cite className="block not-italic">
                  <span className="font-semibold text-gray-900">{testimonio.autor}</span>
                  <span className="block text-sm text-gray-500">{testimonio.cargo}</span>
                </cite>
              </div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonios;

