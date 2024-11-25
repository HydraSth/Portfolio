import React from 'react';
import { Parallax } from 'react-scroll-parallax';

function Estadisticas() {
  const estadisticas = [
    { etiqueta: 'Proyectos Completados', valor: '10+' },
    { etiqueta: 'Clientes Satisfechos', valor: '5+' },
    { etiqueta: 'Años de Experiencia', valor: '2' },
    { etiqueta: 'Tecnologías Dominadas', valor: '10+' },
  ];

  return (
    <section className="py-20 bg-indigo-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Parallax translateY={[-20, 20]}>
          <h2 className="text-3xl font-extrabold text-white mb-12 text-center">Mis Logros</h2>
        </Parallax>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {estadisticas.map((estadistica, index) => (
            <Parallax key={index} translateY={[0, 30]} speed={5} easing="easeInQuad">
              <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center">
                <p className="text-4xl font-bold text-white mb-2">{estadistica.valor}</p>
                <p className="text-sm text-indigo-200">{estadistica.etiqueta}</p>
              </div>
            </Parallax>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Estadisticas;

