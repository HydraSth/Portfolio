import React from 'react';
import { Parallax } from 'react-scroll-parallax';

function Habilidades() {
  const habilidades = [
    'JavaScript', 'React', 'Node.js', 'Express', 
    'MongoDB', 'HTML/CSS', 'Git', 'RESTful APIs'
  ];

  return (
    <section id="habilidades" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Parallax translateY={[-20, 20]}>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Habilidades</h2>
        </Parallax>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {habilidades.map((habilidad, index) => (
            <Parallax key={index} translateY={[0, 50]} speed={5} easing="easeInQuad">
              <div className="bg-gray-100 rounded-lg p-6 text-center transform transition duration-500 hover:scale-105 hover:shadow-lg">
                <span className="text-lg font-medium text-gray-800">{habilidad}</span>
              </div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Habilidades;

