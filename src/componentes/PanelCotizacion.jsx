import React, { useState, useEffect } from "react";
import { Parallax } from 'react-scroll-parallax';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PresupuestoPDF from './PresupuestoPDF';

// Iconos simulados con clases de Tailwind
const Code = () => <div className="w-5 h-5 flex items-center justify-center"><i className="fas fa-code"></i></div>;
const TrendingUp = () => <div className="w-5 h-5 flex items-center justify-center"><i className="fas fa-chart-line"></i></div>;
const Paintbrush = () => <div className="w-5 h-5 flex items-center justify-center"><i className="fas fa-paint-brush"></i></div>;
const CheckCircle = () => <div className="w-5 h-5 flex items-center justify-center text-indigo-600"><i className="fas fa-check-circle"></i></div>;
const ChevronDown = () => <div className="w-5 h-5 flex items-center justify-center"><i className="fas fa-chevron-down"></i></div>;
const Scale = () => <div className="w-5 h-5 flex items-center justify-center"><i className="fas fa-balance-scale"></i></div>;
const Clock = () => <div className="w-5 h-5 flex items-center justify-center"><i className="fas fa-clock"></i></div>;
const Globe = () => <div className="w-5 h-5 flex items-center justify-center"><i className="fas fa-globe"></i></div>;
const Users = () => <div className="w-5 h-5 flex items-center justify-center"><i className="fas fa-users"></i></div>;
const Server = () => <div className="w-5 h-5 flex items-center justify-center"><i className="fas fa-server"></i></div>;

// Función para formatear números en formato de pesos argentinos
const formatoPesoArgentino = (numero) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numero).replace('ARS', '$');
};

// Costo por hora (variable x)
const costoPorHora = 8000; // Costo por hora en pesos argentinos

const services = [
  {
    id: "programming",
    name: "Programación",
    icon: <Code />,
    horasBase: 10, // 10 horas de trabajo base
    get basePrice() { return this.horasBase * costoPorHora; },
    addons: [
      { id: "web", name: "Desarrollo Web", horas: 6, get price() { return this.horas * costoPorHora; } },
      { id: "mobile", name: "Desarrollo Móvil", horas: 8, get price() { return this.horas * costoPorHora; } },
      { id: "api", name: "Desarrollo de API", horas: 5, get price() { return this.horas * costoPorHora; } },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: <TrendingUp />,
    horasBase: 8, // 8 horas de trabajo base
    get basePrice() { return this.horasBase * costoPorHora; },
    addons: [
      { id: "seo", name: "SEO", horas: 4, get price() { return this.horas * costoPorHora; } },
      { id: "social", name: "Redes Sociales", horas: 3, get price() { return this.horas * costoPorHora; } },
      { id: "email", name: "Email Marketing", horas: 2, get price() { return this.horas * costoPorHora; } },
    ],
  },
  {
    id: "design",
    name: "Diseño Gráfico",
    icon: <Paintbrush />,
    horasBase: 7, // 7 horas de trabajo base
    get basePrice() { return this.horasBase * costoPorHora; },
    addons: [
      { id: "logo", name: "Diseño de Logo", horas: 2.5, get price() { return this.horas * costoPorHora; } },
      { id: "ui", name: "Diseño UI/UX", horas: 6, get price() { return this.horas * costoPorHora; } },
      { id: "print", name: "Diseño para Impresión", horas: 3, get price() { return this.horas * costoPorHora; } },
    ],
  },
];

// Categorías de tamaño del proyecto
const projectSizeCategories = [
  {
    id: "scope",
    name: "Por alcance/complejidad",
    icon: <Scale />,
    options: [
      { id: "prototype", name: "Prototipo/Prueba de Concepto", description: "MVP básico, sin escalabilidad", factor: 0.05 },
      { id: "modular", name: "Modular", description: "Funcionalidad acotada, ej: integración de API única", factor: 0.10 },
      { id: "multimodule", name: "Multi-módulo", description: "Varias features interconectadas, ej: e-commerce básico", factor: 0.15 },
      { id: "platform", name: "Plataforma", description: "Sistema complejo con backend/frontend, ej: SaaS", factor: 0.20 },
      { id: "ecosystem", name: "Ecosistema", description: "Múltiples sistemas integrados, ej: ERP + apps móviles", factor: 0.25 },
    ]
  },
  {
    id: "time",
    name: "Por tiempo/esfuerzo",
    icon: <Clock />,
    options: [
      { id: "sprint", name: "Sprint-sized", description: "1-2 semanas", factor: 0.05 },
      { id: "quarterly", name: "Trimestral", description: "3-6 meses", factor: 0.15 },
      { id: "annual", name: "Anual", description: "6-12+ meses, equipos dedicados", factor: 0.25 },
    ]
  },
  {
    id: "impact",
    name: "Por impacto",
    icon: <Globe />,
    options: [
      { id: "niche", name: "Nicho", description: "Usuarios limitados, ej: herramienta interna", factor: 0.05 },
      { id: "regional", name: "Regional", description: "Ej: app para un mercado local", factor: 0.10 },
      { id: "global", name: "Global", description: "Alto tráfico, multiidioma, ej: producto internacional", factor: 0.15 },
    ]
  },
  {
    id: "team",
    name: "Por equipo requerido",
    icon: <Users />,
    options: [
      { id: "individual", name: "Individual", description: "1 desarrollador", factor: 0.05 },
      { id: "small", name: "Equipo pequeño", description: "2-5 personas", factor: 0.10 },
      { id: "crossfunctional", name: "Cross-functional", description: "devs + QA + UX + PM, 5-10+", factor: 0.15 },
      { id: "enterprise", name: "Enterprise", description: "Múltiples equipos coordinados", factor: 0.20 },
    ]
  },
  {
    id: "scalability",
    name: "Por escalabilidad técnica",
    icon: <Server />,
    options: [
      { id: "lowscale", name: "Low-scale", description: "Servidor único, sin alta disponibilidad", factor: 0.05 },
      { id: "midscale", name: "Mid-scale", description: "Load balancing, bases de datos replicadas", factor: 0.10 },
      { id: "highscale", name: "High-scale", description: "Arquitectura distribuida, microservicios", factor: 0.15 },
    ]
  },
];

function PanelCotizacion() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalHoras, setTotalHoras] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [animateTotal, setAnimateTotal] = useState(false);
  const [showPdfButton, setShowPdfButton] = useState(false);
  const [selectedSizeOptions, setSelectedSizeOptions] = useState({});
  const [expandedCategories, setExpandedCategories] = useState({});
  const [includeIVA, setIncludeIVA] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const [expandedProjectTypes, setExpandedProjectTypes] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [discountReason, setDiscountReason] = useState('');
  const [expandedDiscount, setExpandedDiscount] = useState(false);
  
  // Nuevos estados para datos del cliente
  const [clientData, setClientData] = useState({
    nombre: '',
    empresa: '',
    email: '',
    telefono: '',
    direccion: '',
    cuit: '',
    condicionIVA: 'Responsable Inscripto'
  });
  const [expandedClientData, setExpandedClientData] = useState(false);

  // Calcular total cuando cambian las selecciones
  useEffect(() => {
    let newTotal = 0;
    let newTotalHoras = 0;

    if (selectedService) {
      newTotal += selectedService.basePrice;
      newTotalHoras += selectedService.horasBase;

      selectedAddons.forEach((addon) => {
        newTotal += addon.price;
        newTotalHoras += addon.horas;
      });
      
      // Aplicar factores de tamaño del proyecto
      let factorAcumulado = 0;
      Object.values(selectedSizeOptions).forEach(option => {
        if (option) {
          factorAcumulado += option.factor;
        }
      });
      
      // Aplicar factor del tipo de proyecto si está seleccionado
      if (selectedProjectType) {
        factorAcumulado += selectedProjectType.factor;
      }
      
      // Aplicar el factor acumulado al total
      if (factorAcumulado > 0) {
        newTotal = newTotal * (1 + factorAcumulado);
      }
      
      // Aplicar descuento si existe
      if (discount > 0) {
        newTotal = newTotal * (1 - discount / 100);
      }
      
      // Aplicar IVA si está seleccionado (21% en Argentina)
      if (includeIVA) {
        newTotal = newTotal * 1.21;
      }
    }

    setTotal(newTotal);
    setTotalHoras(newTotalHoras);
    // Activar animación del total cuando cambia
    setAnimateTotal(true);
    const timer = setTimeout(() => setAnimateTotal(false), 500);
    return () => clearTimeout(timer);
  }, [selectedService, selectedAddons, selectedSizeOptions, includeIVA, selectedProjectType, discount]);

  // Mostrar botón de PDF solo cuando hay un servicio seleccionado
  useEffect(() => {
    setShowPdfButton(selectedService !== null);
  }, [selectedService]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setSelectedAddons([]);
    setExpanded(true);
  };

  const handleAddonToggle = (addon) => {
    if (isAddonSelected(addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const isAddonSelected = (addonId) => {
    return selectedAddons.some((addon) => addon.id === addonId);
  };
  
  const toggleCategoryExpand = (categoryId) => {
    setExpandedCategories({
      ...expandedCategories,
      [categoryId]: !expandedCategories[categoryId]
    });
  };
  
  const handleSizeOptionSelect = (categoryId, option) => {
    // Si ya está seleccionada esta opción, la deseleccionamos
    if (selectedSizeOptions[categoryId]?.id === option.id) {
      const newOptions = {...selectedSizeOptions};
      delete newOptions[categoryId];
      setSelectedSizeOptions(newOptions);
    } else {
      // Si no, la seleccionamos
      setSelectedSizeOptions({
        ...selectedSizeOptions,
        [categoryId]: option
      });
    }
  };
  
  const isSizeOptionSelected = (categoryId, optionId) => {
    return selectedSizeOptions[categoryId]?.id === optionId;
  };

  const handleDiscountChange = (value) => {
    const numericValue = Math.max(0, Math.min(100, parseFloat(value) || 0));
    setDiscount(numericValue);
  };

  // Función para manejar cambios en los datos del cliente
  const handleClientDataChange = (field, value) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section id="cotizacion" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-800 mb-4">Cotización de Servicios</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Selecciona el servicio que necesitas, personaliza las opciones y obtén un presupuesto instantáneo.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl mx-auto">
          <div className="p-6">
            {/* Sección de datos del cliente */}
            <div className="mb-6">
              <div
                className="flex items-center justify-between cursor-pointer p-3 bg-blue-50 rounded-lg"
                onClick={() => setExpandedClientData(!expandedClientData)}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-full mr-3 bg-blue-100 text-blue-600">
                    <i className="fas fa-user"></i>
                  </div>
                  <span className="font-medium text-blue-700">Datos del Cliente</span>
                </div>
                <div className={`transform transition-transform duration-300 ${expandedClientData ? "rotate-180" : ""}`}>
                  <ChevronDown />
                </div>
              </div>
              
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  expandedClientData ? 'max-h-[600px] opacity-100 mt-4' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      value={clientData.nombre}
                      onChange={(e) => handleClientDataChange('nombre', e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      value={clientData.empresa}
                      onChange={(e) => handleClientDataChange('empresa', e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Mi Empresa S.A."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={clientData.email}
                      onChange={(e) => handleClientDataChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="juan@empresa.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={clientData.telefono}
                      onChange={(e) => handleClientDataChange('telefono', e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+54 11 1234-5678"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Dirección
                    </label>
                    <input
                      type="text"
                      value={clientData.direccion}
                      onChange={(e) => handleClientDataChange('direccion', e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Av. Corrientes 1234, CABA, Argentina"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      CUIT/CUIL
                    </label>
                    <input
                      type="text"
                      value={clientData.cuit}
                      onChange={(e) => handleClientDataChange('cuit', e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="20-12345678-9"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Condición ante IVA
                    </label>
                    <select
                      value={clientData.condicionIVA}
                      onChange={(e) => handleClientDataChange('condicionIVA', e.target.value)}
                      className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Responsable Inscripto">Responsable Inscripto</option>
                      <option value="Monotributista">Monotributista</option>
                      <option value="Exento">Exento</option>
                      <option value="Consumidor Final">Consumidor Final</option>
                      <option value="No Responsable">No Responsable</option>
                    </select>
                  </div>
                </div>
                
                {/* Indicador de campos requeridos */}
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-5 h-5 flex items-center justify-center text-yellow-600 mr-2">
                      <i className="fas fa-info-circle"></i>
                    </div>
                    <span className="text-yellow-800 text-sm">
                      Los campos marcados con * son obligatorios para generar el presupuesto
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`relative cursor-pointer p-4 rounded-lg border-2 transition-all duration-300 transform hover:scale-105 ${
                    selectedService?.id === service.id
                      ? "border-indigo-500 bg-indigo-50 shadow-md"
                      : "border-zinc-200 hover:border-zinc-300"
                  }`}
                  onClick={() => handleServiceSelect(service)}
                >
                  <div className="flex items-center">
                    <div
                      className={`p-2 rounded-full mr-3 transition-colors duration-300 ${
                        selectedService?.id === service.id ? "bg-indigo-100 text-indigo-600" : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-zinc-800">{service.name}</h3>
                      <p className="text-sm text-zinc-500">{formatoPesoArgentino(service.basePrice)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {selectedService && (
              <div className="mb-6">
                <div
                  className="flex items-center justify-between cursor-pointer p-3 bg-indigo-50 rounded-lg"
                  onClick={() => setExpanded(!expanded)}
                >
                  <span className="font-medium text-indigo-700">Personalizar opciones</span>
                  <div className={`transform transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}>
                    <ChevronDown />
                  </div>
                </div>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-2">
                    {selectedService?.addons.map((addon, index) => (
                      <div
                        key={addon.id}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-300 transform hover:translate-x-1 ${
                          isAddonSelected(addon.id)
                            ? "bg-indigo-50 border border-indigo-200"
                            : "bg-zinc-50 border border-zinc-100 hover:bg-zinc-100"
                        }`}
                        onClick={() => handleAddonToggle(addon)}
                        style={{ 
                          animationDelay: `${index * 100}ms`,
                          animationFillMode: 'both',
                          animation: expanded ? 'slideInRight 0.5s ease-out' : 'none'
                        }}
                      >
                        <div className="flex items-center">
                          <div className={`transition-all duration-300 ${isAddonSelected(addon.id) ? 'scale-110' : 'scale-100'}`}>
                            {isAddonSelected(addon.id) ? (
                              <CheckCircle />
                            ) : (
                              <div className="w-5 h-5 border-2 border-zinc-300 rounded-full mr-2"></div>
                            )}
                          </div>
                          <span className="text-zinc-700 ml-2">{addon.name}</span>
                        </div>
                        <span className="font-medium">{formatoPesoArgentino(addon.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Sección de tamaño del proyecto */}
            {selectedService && (
              <div className="mb-6 border-t border-zinc-200 pt-6">
                <h3 className="font-medium text-zinc-800 mb-4">Tamaño del Proyecto</h3>
                
                {projectSizeCategories.map((category) => (
                  <div key={category.id} className="mb-4">
                    <div
                      className="flex items-center justify-between cursor-pointer p-3 bg-zinc-50 rounded-lg"
                      onClick={() => toggleCategoryExpand(category.id)}
                    >
                      <div className="flex items-center">
                        <div className="p-2 rounded-full mr-3 bg-zinc-100 text-zinc-500">
                          {category.icon}
                        </div>
                        <span className="font-medium text-zinc-700">{category.name}</span>
                      </div>
                      <div className={`transform transition-transform duration-300 ${expandedCategories[category.id] ? "rotate-180" : ""}`}>
                        <ChevronDown />
                      </div>
                    </div>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        expandedCategories[category.id] ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-4">
                        {category.options.map((option) => (
                          <div
                            key={option.id}
                            className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                              isSizeOptionSelected(category.id, option.id)
                                ? "bg-indigo-50 border border-indigo-200"
                                : "bg-white border border-zinc-100 hover:bg-zinc-50"
                            }`}
                            onClick={() => handleSizeOptionSelect(category.id, option)}
                          >
                            <div className="flex items-center">
                              <div className={`transition-all duration-300 ${isSizeOptionSelected(category.id, option.id) ? 'scale-110' : 'scale-100'}`}>
                                {isSizeOptionSelected(category.id, option.id) ? (
                                  <CheckCircle />
                                ) : (
                                  <div className="w-5 h-5 border-2 border-zinc-300 rounded-full mr-2"></div>
                                )}
                              </div>
                              <div className="ml-2">
                                <span className="text-zinc-700 block text-sm">{option.name}</span>
                                <span className="text-zinc-500 text-xs">{option.description}</span>
                              </div>
                            </div>
                            <span className="text-xs text-indigo-600 font-medium">+{option.factor * 100}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Sección de descuento */}
            {selectedService && (
              <div className="mb-6 border-t border-zinc-200 pt-6">
                <div
                  className="flex items-center justify-between cursor-pointer p-3 bg-orange-50 rounded-lg"
                  onClick={() => setExpandedDiscount(!expandedDiscount)}
                >
                  <span className="font-medium text-orange-700">Descuento</span>
                  <div className={`transform transition-transform duration-300 ${expandedDiscount ? "rotate-180" : ""}`}>
                    <ChevronDown />
                  </div>
                </div>
                
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedDiscount ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Porcentaje de descuento (%)
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.1"
                          value={discount}
                          onChange={(e) => handleDiscountChange(e.target.value)}
                          className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                          placeholder="0"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-zinc-500 text-sm">%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Motivo del descuento
                      </label>
                      <textarea
                        value={discountReason}
                        onChange={(e) => setDiscountReason(e.target.value)}
                        className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                        rows="3"
                        placeholder="Ej: Cliente frecuente, promoción especial, volumen de trabajo..."
                      />
                    </div>
                    
                    {discount > 0 && (
                      <div className="bg-orange-100 border border-orange-200 rounded-lg p-3">
                        <div className="flex items-center">
                          <div className="w-5 h-5 flex items-center justify-center text-orange-600 mr-2">
                            <i className="fas fa-percentage"></i>
                          </div>
                          <span className="text-orange-800 font-medium">
                            Descuento aplicado: {discount}%
                          </span>
                        </div>
                        {discountReason && (
                          <p className="text-orange-700 text-sm mt-2">
                            <strong>Motivo:</strong> {discountReason}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Sección de configuración de IVA */}
            {selectedService && (
              <div className="mb-6 border-t border-zinc-200 pt-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full mr-3 bg-green-100 text-green-600">
                        <i className="fas fa-receipt"></i>
                      </div>
                      <div>
                        <span className="font-medium text-green-700">Incluir IVA (21%)</span>
                        <p className="text-sm text-green-600">
                          {includeIVA ? 'El presupuesto incluirá IVA' : 'El presupuesto no incluirá IVA'}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeIVA}
                        onChange={(e) => setIncludeIVA(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </div>
                  
                  {includeIVA && (
                    <div className="mt-3 p-3 bg-green-100 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-5 h-5 flex items-center justify-center text-green-600 mr-2">
                          <i className="fas fa-info-circle"></i>
                        </div>
                        <span className="text-green-800 text-sm">
                          Se aplicará IVA del 21% al total del presupuesto
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Resumen */}
            {selectedService && (
              <div className="bg-zinc-50 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-zinc-700">Servicio Base</span>
                  <span className="font-medium">
                    {selectedService ? formatoPesoArgentino(selectedService.basePrice) : formatoPesoArgentino(0)}
                  </span>
                </div>

                {selectedAddons.length > 0 && (
                  <>
                    {selectedAddons.map((addon, index) => (
                      <div 
                        key={addon.id} 
                        className="flex justify-between items-center mb-2 animate-fadeIn"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <span className="text-zinc-700">- {addon.name}</span>
                        <span className="font-medium">
                          {formatoPesoArgentino(addon.price)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-zinc-200 my-3"></div>
                  </>
                )}
                
                {/* Factores de tamaño seleccionados */}
                {Object.entries(selectedSizeOptions).length > 0 && (
                  <>
                    {Object.entries(selectedSizeOptions).map(([categoryId, option], index) => {
                      const category = projectSizeCategories.find(cat => cat.id === categoryId);
                      return (
                        <div 
                          key={categoryId} 
                          className="flex justify-between items-center mb-2 animate-fadeIn"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          <span className="text-zinc-700">
                            - {category?.name}: {option.name}
                          </span>
                          <span className="font-medium text-indigo-600">
                            +{option.factor * 100}%
                          </span>
                        </div>
                      );
                    })}
                    <div className="border-t border-zinc-200 my-3"></div>
                  </>
                )}

                {/* Subtotal antes de descuento e IVA */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-zinc-800">Subtotal</span>
                  <div className="text-right">
                    <span className="text-lg font-bold text-zinc-600">
                      {formatoPesoArgentino(
                        (() => {
                          let baseTotal = selectedService.basePrice;
                          selectedAddons.forEach(addon => baseTotal += addon.price);
                          
                          let factorAcumulado = 0;
                          Object.values(selectedSizeOptions).forEach(option => {
                            if (option) factorAcumulado += option.factor;
                          });
                          if (selectedProjectType) factorAcumulado += selectedProjectType.factor;
                          
                          if (factorAcumulado > 0) {
                            baseTotal = baseTotal * (1 + factorAcumulado);
                          }
                          
                          return baseTotal;
                        })()
                      )}
                    </span>
                  </div>
                </div>
                
                {/* Descuento si está aplicado */}
                {discount > 0 && (
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-orange-600">Descuento ({discount}%)</span>
                    <span className="font-medium text-orange-600">
                      -{formatoPesoArgentino(
                        (() => {
                          let baseTotal = selectedService.basePrice;
                          selectedAddons.forEach(addon => baseTotal += addon.price);
                          
                          let factorAcumulado = 0;
                          Object.values(selectedSizeOptions).forEach(option => {
                            if (option) factorAcumulado += option.factor;
                          });
                          if (selectedProjectType) factorAcumulado += selectedProjectType.factor;
                          
                          if (factorAcumulado > 0) {
                            baseTotal = baseTotal * (1 + factorAcumulado);
                          }
                          
                          return baseTotal * (discount / 100);
                        })()
                      )}
                    </span>
                  </div>
                )}
                
                {/* Subtotal después del descuento */}
                {discount > 0 && (
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-zinc-200">
                    <span className="font-bold text-zinc-800">Subtotal con descuento</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-indigo-600">
                        {formatoPesoArgentino(includeIVA ? total / 1.21 : total)}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* IVA si está incluido */}
                {includeIVA && (
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-zinc-700">IVA (21%)</span>
                    <span className="font-medium">
                      {formatoPesoArgentino(total - (total / 1.21))}
                    </span>
                  </div>
                )}
                
                {/* Total final */}
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-zinc-200">
                  <span className="font-bold text-zinc-800">Total {includeIVA ? 'con IVA' : ''}</span>
                  <div className={`text-right transition-all duration-300 ${
                    animateTotal ? 'transform scale-110' : ''
                  }`}>
                    <span className="text-xl font-bold text-indigo-600">{formatoPesoArgentino(total)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-zinc-50 border-t border-zinc-100">
            {showPdfButton ? (
              <div className="space-y-4">
                <PDFDownloadLink 
                  document={
                    <PresupuestoPDF 
                      selectedService={selectedService} 
                      selectedAddons={selectedAddons} 
                      total={total} 
                      totalHoras={totalHoras}
                      costoPorHora={costoPorHora}
                      selectedSizeOptions={selectedSizeOptions}
                      projectSizeCategories={projectSizeCategories}
                      includeIVA={includeIVA}
                      selectedProjectType={selectedProjectType}
                      discount={discount}
                      discountReason={discountReason}
                      clientData={clientData}
                    />
                  } 
                  fileName={`presupuesto_${selectedService?.name.toLowerCase().replace(/\s+/g, '_')}_${new Date().toISOString().slice(0, 10)}.pdf`}
                  className="w-full py-3 font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? 
                      'Generando PDF...' : 
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Descargar Presupuesto PDF
                      </>
                  }
                </PDFDownloadLink>
                <button
                  className="w-full py-3 font-medium rounded-lg transition-all duration-300 bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  onClick={() => {
                    // Aquí puedes añadir lógica para enviar el presupuesto por email
                    const email = clientData?.email || 'cliente@ejemplo.com';
                    alert(`Presupuesto enviado a ${email}`);
                  }}
                >
                  Enviar por Email
                </button>
              </div>
            ) : (
              <button
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] opacity-50 cursor-not-allowed"
                disabled={true}
              >
                Selecciona un servicio para generar presupuesto
              </button>
            )}
          </div>
        </div>
      </div>
      
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideInRight {
            from { 
              opacity: 0;
              transform: translateX(20px);
            }
            to { 
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out;
          }
        `}
      </style>
    </section>
  );
}

export default PanelCotizacion; 