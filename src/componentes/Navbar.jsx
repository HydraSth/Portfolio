import React, { useState, useEffect } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const scroller = document.querySelector('.scroll-snap-container')
    if (!scroller) return

    const getOffsetTopRelativeTo = (el, ancestor) => {
      let top = 0
      let node = el
      while (node && node !== ancestor) {
        top += node.offsetTop || 0
        node = node.offsetParent
      }
      return top
    }

    const handleScroll = () => {
      setIsScrolled(scroller.scrollTop > 50)
      
      // Detectar sección activa en base al scroller interno
      const sections = ['projects', 'skills', 'experience', 'contact']
      const scrollPosition = scroller.scrollTop + 120 // offset por header
      
      let currentSection = ''
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = getOffsetTopRelativeTo(element, scroller)
          const offsetHeight = element.offsetHeight
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section
            break
          }
        }
      }
      setActiveSection(currentSection)
    }

    handleScroll()
    scroller.addEventListener('scroll', handleScroll)
    return () => scroller.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const scroller = document.querySelector('.scroll-snap-container')
    const element = document.getElementById(sectionId)
    if (scroller && element) {
      const getOffsetTopRelativeTo = (el, ancestor) => {
        let top = 0
        let node = el
        while (node && node !== ancestor) {
          top += node.offsetTop || 0
          node = node.offsetParent
        }
        return top
      }
      const headerOffset = 80
      const top = Math.max(0, getOffsetTopRelativeTo(element, scroller) - headerOffset)
      scroller.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-xl glass" : "bg-white/80 backdrop-blur-lg glass"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <div className="text-lg font-light gradient-green-text">{"<Dev />"}</div>

          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => scrollToSection("projects")}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 font-light relative ${
                activeSection === 'projects' 
                  ? 'bg-gray-100 text-gray-900 shadow-inner' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Proyectos
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 font-light relative ${
                activeSection === 'skills' 
                  ? 'bg-gray-100 text-gray-900 shadow-inner' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Habilidades
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 font-light relative ${
                activeSection === 'experience' 
                  ? 'bg-gray-100 text-gray-900 shadow-inner' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Experiencia
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 font-light relative ${
                activeSection === 'contact' 
                  ? 'bg-gray-100 text-gray-900 shadow-inner' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              Contacto
            </button>
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className="bg-gray-100 text-gray-900 hover:bg-green-600 hover:text-white px-6 py-2 text-sm font-light rounded-xl transition-all duration-300 hover:scale-105 shadow-inner"
          >
            Hablemos
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header;

