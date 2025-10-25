import React from 'react';

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"],
    icon: "</>"
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "RESTful APIs"],
    icon: "⚙️"
  },
  {
    title: "Base de Datos",
    skills: ["SQL Server", "MySQL", "MongoDB", "PostgreSQL"],
    icon: "🗄️"
  },
  {
    title: "DevOps & Cloud",
    skills: ["GitHub Actions", "Vercel"],
    icon: "☁️"
  },
];

const SkillPill = ({ children }) => (
  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-light bg-card text-foreground/90 border border-border/50 hover:border-accent/50 transition-colors duration-200">
    {children}
  </span>
);

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-snap-section py-24 bg-gradient-to-b from-background to-background/95 w-full">
      <div className="container mx-auto px-4 sm:px-6 w-full">
        <div className="text-center w-full max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Habilidades <span className="text-accent">Técnicas</span>
          </h2>
          <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
            Tecnologías y herramientas que utilizo para crear soluciones completas y escalables
          </p>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              {skillCategories.map((category, index) => (
                <div 
                  key={index}
                  className="w-full max-w-xs group relative p-6 rounded-xl bg-card/50 border border-border/50 hover:border-accent/30 transition-all duration-300"
                >
                  <div className="absolute -top-3 -left-3 w-8 h-8 flex items-center justify-center bg-accent text-background rounded-md text-lg drop-shadow-lg">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-medium text-foreground mb-5 text-center">
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillPill key={skillIndex}>{skill}</SkillPill>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          
            <div className="mt-16 text-center w-full">
              <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card/50 border border-border/50 hover:border-accent/30 transition-colors duration-300">
                <span className="text-sm font-light text-muted-foreground">
                  Y muchas más herramientas que voy aprendiendo día a día
                </span>
                <span className="text-accent">→</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;

