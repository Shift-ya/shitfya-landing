const projects = [
  {
    title: "Finova",
    description:
      "Una plataforma de finanzas personales de próxima generación con información impulsada por IA, agregación de cuentas en tiempo real y diseño mobile-first.",
    tag: "Fintech",
    accent: "264",
  },
  {
    title: "Stackr",
    description:
      "SaaS de herramientas para desarrolladores para gestionar infraestructura en la nube a escala. De cero a $1M ARR en 14 meses.",
    tag: "SaaS",
    accent: "250",
  },
  {
    title: "Crux AI",
    description:
      "Un asistente de investigación impulsado por IA para equipos empresariales — resumen inteligente, seguimiento de citas y bases de conocimiento.",
    tag: "IA · Enterprise",
    accent: "270",
  },
]

export function Projects() {
  return (
    <section className="py-24 px-6" id="work" aria-labelledby="projects-heading">
      <div className="mx-auto max-w-6xl">
        <p className="brand-text-gradient mb-4 text-xs font-semibold uppercase tracking-widest">
          Trabajo destacado
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="projects-heading"
            className="max-w-sm text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Lo que hemos lanzado
          </h2>
          <a
            href="#contact"
            className="brand-text-gradient text-sm font-medium hover:underline underline-offset-4"
          >
            Ver todos los proyectos &rarr;
          </a>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_8px_32px_oklch(0.68_0.22_264_/_0.12)]"
            >
              {/* Image placeholder — subtle gradient top strip */}
              <div
                className="h-36 w-full flex-shrink-0 transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, oklch(0.18 0.04 ${project.accent}), oklch(0.12 0.02 ${project.accent}))`,
                }}
                aria-hidden="true"
              >
                {/* Abstract lines */}
                <div className="h-full w-full opacity-20 overflow-hidden" aria-hidden="true">
                  <svg width="100%" height="100%" viewBox="0 0 320 144" preserveAspectRatio="none">
                    <line x1="0" y1="72" x2="320" y2="72" stroke="white" strokeWidth="0.5" />
                    <line x1="0" y1="48" x2="320" y2="96" stroke="white" strokeWidth="0.5" />
                    <line x1="0" y1="96" x2="320" y2="48" stroke="white" strokeWidth="0.5" />
                    <circle cx="160" cy="72" r="24" stroke="white" strokeWidth="0.5" fill="none" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-3 p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground">{project.title}</h3>
                  <span className="rounded-full border border-border bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                    {project.tag}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <div className="mt-auto pt-2 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:gap-2">
                  Estudio de caso
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
