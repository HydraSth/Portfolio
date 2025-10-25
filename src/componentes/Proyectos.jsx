import React from 'react';

const projects = [
  {
    title: "Aqua – Plataforma E-commerce",
    description:
      "Diseño y desarrollo de tienda online con carrito de compras, integración de pasarela de pagos, Google Maps API y dashboard administrativo con métricas en tiempo real.",
    image: "https://i.ibb.co/v4FcqP4n/Captura-de-pantalla-2025-10-09-200302.png",
    tech: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS", "Google Cloud"],
    github: "#",
    demo: "https://www.aquapurificadores.com/",
  },
  {
    title: "Margaria Neumáticos – E-commerce & Automatización",
    description:
      "Plataforma completa de comercio electrónico y gestión interna desarrollada con stack MERN. Incluye panel administrativo, control de usuarios, generación de presupuestos en PDF e integraciones con APIs externas.",
    image: "https://i.ibb.co/hMJyrNj/Captura-de-pantalla-2024-11-25-030320.png",
    tech: ["MongoDB", "Express", "React", "Node.js", "Google Cloud", "Mercado Libre API", "WhatsApp Business API"],
    github: "#",
    demo: "#",
  },
  {
    title: "Adoptame – Plataforma Web + Mobile",
    description:
      "App multiplataforma para adopción de mascotas con sistema de matching inteligente, panel de refugios, estadísticas, módulo educativo y seguimiento post-adopción.",
    image: "https://i.ibb.co/SyP22cv/image.png",
    tech: ["React Native", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    github: "#",
    demo: "#",
  },
];


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

                <div className="flex gap-3">
                  {
                    project.demo && project.demo !== "#" && (
                      <a 
                        href={project.demo} 
                        className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-background rounded-md text-center text-sm font-medium transition-colors"
                      >
                        Demo
                      </a>
                    )
                  }
                  {
                    project.github && project.github !== "#" && (
                      <a 
                        href={project.github} 
                        className="flex-1 px-4 py-2 bg-accent hover:bg-accent/90 text-background rounded-md text-center text-sm font-medium transition-colors"
                      >
                        Código
                      </a>
                    )
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection;

