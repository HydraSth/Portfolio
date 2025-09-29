import React from 'react';

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind.css", "Vue.js"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express"],
  },
  {
    title: "Base de Datos",
    skills: ["Microsoft SQL Server","MySQL", "MongoDB", "Firebase"],
  },
  {
    title: "DevOps & Cloud",
    skills: ["Vercel", "GitHub"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-snap-section py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-foreground mb-4">Habilidades Técnicas</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty font-light">
            Tecnologías que utilizo para crear soluciones completas
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {skillCategories.map((category, index) => (
              <div key={index} className="space-y-6">
                <h3 className="text-xl font-medium gradient-green-text">{category.title}</h3>
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="px-4 py-3 bg-card text-card-foreground rounded-lg border border-border hover:border-accent/30 transition-all duration-300 text-center font-light hover:shadow-sm"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection;

