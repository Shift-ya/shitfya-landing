const props = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Soluciones personalizadas",
    description:
      "Cada línea de código escrita específicamente para tu producto. Cero plantillas, cero compromisos.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Ciclos rápidos de entrega",
    description:
      "Sprints iterativos con entrega rápida. Entregamos software funcional, no solo diseños.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Arquitectura escalable",
    description:
      "Construido para crecer contigo. Nativo en la nube, modular y listo para lo que venga.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Colaboración cercana",
    description:
      "Siempre estás en el ciclo. Acceso directo a tu equipo — sin gestores de cuentas, sin fluff.",
  },
]

export function ValueProps() {
  return (
    <section className="relative py-24 px-6" id="services" aria-labelledby="value-heading">
      <div className="mx-auto max-w-6xl">
        {/* Section label */}
        <p className="brand-text-gradient mb-4 text-xs font-semibold uppercase tracking-widest">
          Por qué shft.ya
        </p>
        <h2
          id="value-heading"
          className="max-w-xl text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Todo lo que necesitas para entregar software excelente
        </h2>

        {/* Grid */}
        <div className="mt-16 grid gap-px rounded-xl overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {props.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col gap-4 bg-background p-8 transition-colors duration-300 hover:bg-card"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10 group-hover:shadow-[0_0_12px_oklch(0.68_0.22_264_/_0.2)]">
                {item.icon}
              </div>
              <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
