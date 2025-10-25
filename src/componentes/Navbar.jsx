import React, { useState, useEffect } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Detectar sección activa basado en window scroll
      const sections = ['hero', 'skills', 'projects', 'experience', 'contact']
      const scrollPosition = window.scrollY + 120 // offset por header
      
      let currentSection = ''
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
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
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.offsetTop
      const offsetPosition = elementPosition - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
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
          <div className="text-lg font-semibold bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">{"<Dev />"}</div>

          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => scrollToSection("skills")}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 font-medium relative ${
                activeSection === 'skills' 
                  ? 'bg-accent/10 text-accent' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Habilidades
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 font-medium relative ${
                activeSection === 'projects' 
                  ? 'bg-accent/10 text-accent' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Proyectos
            </button>
            <button
              onClick={() => scrollToSection("experience")}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 font-medium relative ${
                activeSection === 'experience' 
                  ? 'bg-accent/10 text-accent' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Experiencia
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 font-medium relative ${
                activeSection === 'contact' 
                  ? 'bg-accent/10 text-accent' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              Contacto
            </button>
          </div>

          <button
            onClick={() => scrollToSection("contact")}
            className="bg-accent hover:bg-accent/90 text-background px-6 py-2 text-sm font-medium rounded-xl transition-all duration-300 hover:scale-105 shadow-md"
          >
            Hablemos
          </button>
        </nav>
      </div>
    </header>
  )
}

export default Header;

