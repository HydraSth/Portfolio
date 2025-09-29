import React from 'react';

const projects = [
  {
    title: "E-commerce Platform",
    description: "Plataforma completa de comercio electrónico con Next.js, Stripe y base de datos PostgreSQL",
    image: "https://i.ibb.co/hMJyrNj/Captura-de-pantalla-2024-11-25-030320.png",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    github: "#",
    demo: "https://www.margaria.ar/",
  },
  {
    title: "Task Management App",
    description: "Aplicación de gestión de tareas con colaboración en tiempo real usando Socket.io",
    image: "https://i.ibb.co/SyP22cv/image.png",
    tech: ["React", "Node.js", "Socket.io", "MongoDB"],
    github: "#",
    demo: "#",
  },
  {
    title: "AI Chat Assistant",
    description: "Asistente de chat inteligente integrado con OpenAI API y interfaz conversacional",
    image: "https://i.ibb.co/rfBNpBc/Captura-de-pantalla-2024-11-25-030617.png",
    tech: ["Next.js", "OpenAI API", "Tailwind CSS", "Vercel"],
    github: "#",
    demo: "#",
  },
]

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-snap-section py-20 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Proyectos Destacados</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Una selección de mis trabajos más recientes que demuestran mis habilidades en desarrollo full stack
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="group hover:shadow-lg transition-all duration-300 border border-border rounded-lg overflow-hidden">
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* <div className="flex gap-3">
                  <a 
                    href={project.github} 
                    className="flex-1 px-4 py-2 border border-border rounded-md text-center text-sm font-medium hover:bg-muted transition-colors"
                  >
                    Código
                  </a>
                  <a 
                    href={project.demo} 
                    className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-md text-center text-sm font-medium transition-colors"
                  >
                    Demo
                  </a>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection;

