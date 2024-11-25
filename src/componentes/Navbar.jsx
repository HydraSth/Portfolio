import React from 'react';

function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600">Juan Cruz</span>
            </div>
          </div>
          <div className="flex items-center">
            <a href="#habilidades" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Habilidades</a>
            <a href="#proyectos" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Proyectos</a>
            <a href="#contacto" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">Contacto</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

