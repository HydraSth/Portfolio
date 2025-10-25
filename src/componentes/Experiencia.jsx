import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';

const experiences = [
  {
    title: "Analista y Desarrollador Full Stack - E-commerce & Automatización",
    company: "Margaria Neumáticos",
    location: "Santa Rosa, La Pampa, Argentina",
    period: "01/11/2023 - 01/03/2025",
    description:
      "Análisis, diseño y desarrollo de sistemas web para e-commerce y gestión de operaciones críticas. Integraciones con APIs externas y optimización de experiencia de usuario.",
    achievements: [
      "Analicé procesos internos y desarrollé un sistema de usuarios con control de accesos y presupuestos en PDF",
      "Diseñé y programé panel de control administrativo para pedidos y operaciones",
      "Integré WhatsApp Business API y Mercado Libre API (10,000+ productos)",
      "Implementé soluciones en Google Cloud para análisis y gestión de productos",
      "Administré bases de datos (MongoDB) y servidores Node.js/Express",
    ],
  },
  {
    title: "Full Stack Developer - Landing Page & E-commerce",
    company: "Aqua",
    location: "Remoto",
    period: "01/12/2024",
    description:
      "Diseño y desarrollo de landing page y plataforma e-commerce con integración de pagos y panel administrativo.",
    achievements: [
      "Construí e-commerce con carrito de compras y pasarela de pagos",
      "Desarrollé sistema de gestión de productos e inventario",
      "Implementé dashboard con métricas en tiempo real",
      "Integré Google Maps API y medios de pago locales",
      "Sincronización automática entre catálogo y stock",
    ],
  },
  {
    title: "Full Stack Developer - Mobile",
    company: "Adoptame",
    location: "Remoto",
    period: "01/12/2024",
    description:
      "Plataforma integral para adopción de mascotas con arquitectura multiplataforma web + mobile.",
    achievements: [
      "Implementé sistema de matching avanzado con filtros",
      "Desarrollé módulo educativo interactivo sobre adopción responsable",
      "Construí panel administrativo para refugios con estadísticas y reportes",
      "Integré herramientas de comunicación y seguimiento post-adopción",
      "Arquitectura React Native + Node.js/Express + MongoDB",
    ],
  },
];

export function ExperienceSection() {
  // Estado y refs para timeline horizontal
  const [progress, setProgress] = useState(0); // 0..1 del desplazamiento vertical relativo a la sección
  const [contentWidth, setContentWidth] = useState(0); // ancho total desplazable (incluyendo paddings virtuales)
  const [timelineWidth, setTimelineWidth] = useState(0); // ancho puro del eje temporal (sin paddings)
  const [scrollerWidth, setScrollerWidth] = useState(0); // ancho del viewport del contenedor con scroll
  const [activeIndex, setActiveIndex] = useState(0);
  const [transformX, setTransformX] = useState(0);
  const wrapperRef = useRef(null); // contenedor alto (scroll vertical)
  const stickyRef = useRef(null); // contenedor sticky (alto = 100vh)
  const contentRef = useRef(null); // ancho grande movible en X
  const scrollTimeoutRef = useRef(null); // timeout para snap
  const isScrollingRef = useRef(false); // flag de scroll activo

  // Utilidad: limitar valor entre 0 y 1
  const clamp01 = (v) => Math.max(0, Math.min(1, v));

  // Parseo de periodos con soporte de meses: "YYYY[-MM] - YYYY[-MM] | Presente"
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1..12

  const parsePeriod = (str = '') => {
    const s = String(str).trim();
    if (!s) {
      return { startYear: currentYear, startMonth: 1, endYear: currentYear, endMonth: currentMonth };
    }

    // 1) Formatos con rango YYYY[-MM] - (YYYY[-MM]|Presente)
    let m = s.match(/(\d{4})(?:[\/-](\d{1,2}))?\s*-\s*(Presente|\d{4})(?:[\/-](\d{1,2}))?/i);
    if (m) {
      const sy = parseInt(m[1], 10);
      const sm = m[2] ? Math.min(12, Math.max(1, parseInt(m[2], 10))) : 1;
      const endIsPresente = typeof m[3] === 'string' && m[3].toLowerCase() === 'presente';
      const ey = endIsPresente ? currentYear : parseInt(m[3], 10);
      const em = m[4] ? Math.min(12, Math.max(1, parseInt(m[4], 10))) : (endIsPresente ? currentMonth : 12);
      return { startYear: sy, startMonth: sm, endYear: ey, endMonth: em };
    }

    // 2) Formatos europeos DD/MM/YYYY - DD/MM/YYYY
    m = s.match(/(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})\s*-\s*(Presente|(\d{1,2})[\/-](\d{1,2})[\/-](\d{4}))/i);
    if (m) {
      const sy = parseInt(m[3], 10);
      const sm = Math.min(12, Math.max(1, parseInt(m[2], 10)));
      const endIsPresente = typeof m[4] === 'string' && m[4].toLowerCase() === 'presente';
      const ey = endIsPresente ? currentYear : parseInt(m[7], 10);
      const em = endIsPresente ? currentMonth : Math.min(12, Math.max(1, parseInt(m[6], 10)));
      return { startYear: sy, startMonth: sm, endYear: ey, endMonth: em };
    }

    // 3) Fecha única YYYY-MM o YYYY
    m = s.match(/^(\d{4})(?:[\/-](\d{1,2}))?$/);
    if (m) {
      const sy = parseInt(m[1], 10);
      const sm = m[2] ? Math.min(12, Math.max(1, parseInt(m[2], 10))) : 1;
      return { startYear: sy, startMonth: sm, endYear: sy, endMonth: sm };
    }

    // 4) Fecha única europea DD/MM/YYYY
    m = s.match(/^(\d{1,2})[\/-](\d{1,2})[\/-](\d{4})$/);
    if (m) {
      const sy = parseInt(m[3], 10);
      const sm = Math.min(12, Math.max(1, parseInt(m[2], 10)));
      return { startYear: sy, startMonth: sm, endYear: sy, endMonth: sm };
    }

    // 5) Fallback seguro
    return { startYear: currentYear, startMonth: 1, endYear: currentYear, endMonth: currentMonth };
  };

  const parsed = useMemo(() => {
    return experiences.map((e) => {
      const p = parsePeriod(e.period);
      const startIndex = p.startYear * 12 + (p.startMonth - 1); // índice mensual absoluto
      const endIndex = p.endYear * 12 + (p.endMonth - 1);
      return { ...e, ...p, startIndex, endIndex };
    });
  }, []);

  const minMonthIndex = useMemo(() => Math.min(...parsed.map(p => p.startIndex)), [parsed]);
  const maxMonthIndex = useMemo(() => Math.max(...parsed.map(p => p.endIndex)), [parsed]);
  const totalMonths = useMemo(() => Math.max(1, maxMonthIndex - minMonthIndex), [maxMonthIndex, minMonthIndex]);
  const minYear = useMemo(() => Math.floor(minMonthIndex / 12), [minMonthIndex]);
  const maxYear = useMemo(() => Math.floor(maxMonthIndex / 12), [maxMonthIndex]);

  // Medir anchos: scrollerWidth, timelineWidth y contentWidth (timeline + paddings laterales)
  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      setScrollerWidth(vw);
      const PX_PER_YEAR = 260;
      const PX_PER_MONTH = PX_PER_YEAR / 12;
      const baseWidth = Math.max(totalMonths * PX_PER_MONTH, vw); // eje mínimo igual al viewport
      setTimelineWidth(baseWidth);
      setContentWidth(baseWidth + vw); // paddings laterales: vw/2 a cada lado
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [totalMonths]);

  // Mapear scroll vertical del contenedor con snap a un índice discreto por hito y centrar la tarjeta
  useEffect(() => {
    if (!timelineWidth || !scrollerWidth) return;

    const onScroll = () => {
      if (!wrapperRef.current) return;
      
      const wrapper = wrapperRef.current;
      const viewportHeight = window.innerHeight;
      
      // Calcular el progreso basado en la posición del wrapper en el viewport
      // Usar getBoundingClientRect para obtener la posición real
      const rect = wrapper.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const wrapperTop = scrollTop + rect.top;
      const wrapperHeight = wrapper.offsetHeight;
      
      const start = wrapperTop;
      const end = start + wrapperHeight - viewportHeight;
      const p = clamp01((scrollTop - start) / Math.max(1, (end - start)));
      
      setProgress(p);

      // Calcular índice con interpolación suave (sin redondeo brusco)
      const steps = Math.max(1, parsed.length - 1);
      const rawIdx = p * steps;
      const clampedIdx = Math.max(0, Math.min(parsed.length - 1, Math.round(rawIdx)));
      setActiveIndex(clampedIdx);

      // Calcular el translateX con interpolación suave entre elementos
      if (contentRef.current && timelineWidth > 0) {
        // Usar distancia uniforme entre elementos en lugar de fechas
        // Invertir la dirección: empezar desde el final (derecha) hacia el inicio (izquierda)
        const uniformSpacing = timelineWidth / Math.max(1, parsed.length - 1);
        const invertedIdx = (parsed.length - 1) - rawIdx; // invertir el índice
        const targetPosition = invertedIdx * uniformSpacing; // posición interpolada suave
        const pointX = (scrollerWidth / 2) + targetPosition;
        const maxTranslate = Math.max(0, timelineWidth);
        const target = Math.max(0, Math.min(maxTranslate, pointX - scrollerWidth / 2));
        
        setTransformX(target);
      }

      // Limpiar timeout anterior
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      isScrollingRef.current = true;

      // Después de 300ms sin scroll, hacer snap a la tarjeta más cercana
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
        snapToNearestCard();
      }, 300);
    };

    const snapToNearestCard = () => {
      if (!wrapperRef.current) return;

      const wrapper = wrapperRef.current;
      const viewportHeight = window.innerHeight;
      const rect = wrapper.getBoundingClientRect();
      const scrollTop = window.scrollY;
      const wrapperTop = scrollTop + rect.top;
      const wrapperHeight = wrapper.offsetHeight;
      
      const start = wrapperTop;
      const end = start + wrapperHeight - viewportHeight;
      const currentProgress = clamp01((scrollTop - start) / Math.max(1, (end - start)));

      // Calcular el índice basado en si pasó el 50% hacia la siguiente tarjeta
      const steps = Math.max(1, parsed.length - 1);
      const rawIdx = currentProgress * steps;
      
      // Si pasó más del 50% hacia la siguiente tarjeta, ir a ella
      // Si está antes del 50%, quedarse en la actual
      const nearestIdx = Math.floor(rawIdx + 0.5); // Redondea al más cercano considerando el 50%
      const clampedNearestIdx = Math.max(0, Math.min(parsed.length - 1, nearestIdx));
      
      // Calcular la posición de scroll ideal para ese índice
      const targetProgress = clampedNearestIdx / steps;
      const targetScrollTop = start + (targetProgress * (end - start));
      
      // Hacer snap si no está exactamente en la posición de una tarjeta
      const diff = Math.abs(currentProgress - targetProgress);
      
      if (diff > 0.01) { // Solo si hay una diferencia mínima
        window.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Ejecutar inmediatamente y después de un pequeño delay para asegurar que todo esté renderizado
    onScroll();
    const timer = setTimeout(onScroll, 100);
    
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timer);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [timelineWidth, scrollerWidth, parsed]);

  return (
    <section id="experience" className="scroll-snap-section py-8 bg-muted/30">
      <div className="container mx-auto px-0">
        <div className="text-center mb-2 px-6">
          <h2 className="text-4xl font-bold text-foreground mb-2">Experiencia Profesional</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Mi trayectoria profesional desarrollando soluciones tecnológicas innovadoras
          </p>
        </div>

        {/* Wrapper alto para mapear scroll vertical por "pasos" (uno por hito) */}
        <div
          ref={wrapperRef}
          className="relative -mt-2 md:-mt-4"
          style={{
            height: `${100 + Math.max(0, parsed.length - 1) * 60}vh`,
            width: '100vw',
            marginLeft: 'calc(50% - 50vw)',
            marginRight: 'calc(50% - 50vw)'
          }}
        >
          {/* Contenedor sticky que ocupa toda la pantalla */}
          <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden" style={{ width: '100vw' }}>
            {/* Contenido horizontal que se desplaza */}
            <div
              ref={contentRef}
              className="h-full flex items-center relative will-change-transform"
              style={{
                width: `${timelineWidth + scrollerWidth}px`,
                transform: `translateX(-${transformX}px)`,
                transition: 'transform 600ms cubic-bezier(0.25, 0.1, 0.25, 1)'
              }}
            >
              {/* Contenedor interno del timeline (sin padding) */}
              <div
                className="absolute top-0 h-full"
                style={{ left: `${scrollerWidth / 2}px`, width: `${timelineWidth}px` }}
              >
                {/* Línea base */}
                <div className="absolute left-0 right-0 h-0.5 bg-border/40 z-0" style={{ top: '50%' }} />
                {/* Línea de progreso - crece de derecha a izquierda siguiendo el scroll invertido */}
                <div
                  className="absolute h-1 bg-gradient-to-l from-accent via-accent to-accent/80 z-0"
                  style={{
                    top: 'calc(50% - 2px)',
                    right: 0,
                    width: `${progress * 100}%`,
                    transition: 'width 150ms ease-out, box-shadow 150ms ease-out',
                    boxShadow: `0 0 ${20 + progress * 10}px rgba(16, 185, 129, ${0.4 + progress * 0.3})`
                  }}
                />

                {/* Marca verde: solo la del hito ACTIVO (fecha de inicio) */}
                {parsed[activeIndex] && (
                  (() => {
                    const item = parsed[activeIndex];
                    const ratio = (item.startIndex - minMonthIndex) / totalMonths;
                    return (
                      <div
                        className="absolute hidden md:block"
                        style={{ left: `${ratio * 100}%`, transform: 'translateX(-50%)' }}
                      >
                        <div
                          className="w-0.5 h-3 bg-primary rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                          style={{ position: 'absolute', top: 'calc(50% - 6px)' }}
                        />
                      </div>
                    );
                  })()
                )}

                {/* Eje de años (marcas pequeñas) */}
                {Array.from({ length: (maxYear - minYear) + 1 }).map((_, i) => {
                  const year = minYear + i;
                  const monthIndexOfYear = year * 12; // enero
                  const ratio = (monthIndexOfYear - minMonthIndex) / totalMonths;
                  return (
                    <div key={year} className="absolute z-0 pointer-events-none" style={{ left: `${ratio * 100}%`, top: 'calc(50% + 28px)', transform: 'translateX(-50%)' }}>
                      <div className="w-px h-3 bg-border/60 mx-auto mb-1" />
                      <span className="inline-block text-[11px] md:text-sm text-foreground/70 bg-card/70 px-1.5 py-0.5 rounded">
                        {year}
                      </span>
                    </div>
                  );
                })}

                {/* Hitos */}
                {parsed.map((exp, index) => {
                  // Usar espaciado uniforme en lugar de fechas reales
                  // Invertir posiciones: el último elemento (más reciente) va primero
                  const invertedIndex = (parsed.length - 1) - index;
                  const uniformRatio = parsed.length > 1 ? invertedIndex / (parsed.length - 1) : 0.5;
                  const isActive = index === activeIndex;
                  return (
                    <div key={index} className="absolute" style={{ left: `${uniformRatio * 100}%`, top: '50%', transform: 'translate(-50%, -50%)' }}>

                      {/* Card */}
                      <div className={`mt-6 w-[360px] md:w-[480px] lg:w-[560px] max-w-[90vw] border rounded-xl p-6 bg-card/95 backdrop-blur shadow-xl transition-all duration-[800ms] ease-out ${
                        isActive ? 'opacity-100 scale-100 border-accent/40 ring-1 ring-accent/20 z-10' : 'opacity-0 scale-95 border-border/40 pointer-events-none'
                      } ${isActive ? 'max-h-[70vh] overflow-auto' : ''}`}>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <h3 className="text-lg font-semibold text-card-foreground">{exp.title}</h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{exp.period}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{exp.company} • {exp.location}</p>
                        <p className="text-sm text-muted-foreground/90 mb-3">{exp.description}</p>

                        {isActive && Array.isArray(exp.achievements) && exp.achievements.length > 0 && (
                          <div className="mt-2">
                            <h4 className="text-sm font-semibold text-card-foreground mb-2">Logros principales</h4>
                            <ul className="space-y-2">
                              {exp.achievements.map((achievement, achIndex) => (
                                <li key={achIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                                  <span className="leading-relaxed">{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ExperienceSection;
