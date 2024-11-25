import React from 'react';

function Proyectos() {
  const proyectos = [
    { 
      titulo: 'Plataforma E-commerce', 
      descripcion: 'Desarrollé una plataforma e-commerce utilizando el stack MERN (MongoDB, Express, React, Node.js). La aplicación permite a los usuarios explorar productos, agregar artículos al carrito y realizar presupuestos en línea de manera eficiente.', 
      imagen: 'https://i.ibb.co/hMJyrNj/Captura-de-pantalla-2024-11-25-030320.png',
      demoEnlace: 'https://www.margaria.ar/',
      codigoEnlace: null
    },
    { 
      titulo: 'App para celular', 
      descripcion: 'Diseñé y desarrollé Adoptame, una aplicación móvil creada con React Native, enfocada en promover la adopción responsable de animales y mejorar la gestión de los refugios.', 
      imagen: 'https://i.ibb.co/SyP22cv/image.png',
      demoEnlace: null,
      codigoEnlace: null
    },
    { 
      titulo: 'Landing Page', 
      descripcion: 'Diseñé y desarrollé una landing page para Aqua Purificadores, enfocada en destacar sus soluciones innovadoras para el tratamiento y purificación de agua. Esta página está diseñada para captar clientes potenciales y mostrar de manera clara y atractiva la variedad de productos y servicios ofrecidos.', 
      imagen: 'https://i.ibb.co/rfBNpBc/Captura-de-pantalla-2024-11-25-030617.png',
      demoEnlace: null,
      codigoEnlace: null
    },
  ];

  return (
    <section id="proyectos" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-12 text-center">Proyectos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {proyectos.map((proyecto, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={proyecto.imagen} alt={proyecto.titulo} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{proyecto.titulo}</h3>
                <p className="text-gray-600 mb-4">{proyecto.descripcion}</p>
                <div className="flex justify-between">
                  {proyecto.demoEnlace ? (	
                    <a href={proyecto.demoEnlace} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Demo</a>
                  ) : (
                    <span className="text-gray-400">Demo no disponible</span>
                  )}
                  {proyecto.codigoEnlace && (	
                    <a href={proyecto.codigoEnlace} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Código</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Proyectos;

