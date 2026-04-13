const services = [
  {
    title: "Aplicaciones Web",
    description:
      "Aplicaciones web de alto rendimiento y responsivas construidas con marcos modernos. Desde MVPs hasta plataformas de nivel empresarial.",
    tag: "Frontend · Full-stack",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Desarrollo SaaS",
    description:
      "Productos SaaS de extremo a extremo con autenticación, facturación, análisis y multi-tenencia desde el primer día.",
    tag: "Producto · Escala",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M4 12h16M4 6h16M4 18h16" />
        <circle cx="4" cy="6" r="1.5" fill="currentColor" />
        <circle cx="4" cy="12" r="1.5" fill="currentColor" />
        <circle cx="4" cy="18" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Diseño UX/UI",
    description:
      "Diseño que convierte. Creamos interfaces intuitivas basadas en investigación de usuarios y probadas con usuarios reales.",
    tag: "Diseño · Investigación",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: "APIs y Sistemas Backend",
    description:
      "APIs robustas, microservicios y pipelines de datos. Construidos para confiabilidad, seguridad y experiencia del desarrollador.",
    tag: "Backend · Infraestructura",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
      </svg>
    ),
  },
]

export function Services() {
  return (
    <section className="py-24 px-6" id="services" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl">
        <p className="brand-text-gradient mb-4 text-xs font-semibold uppercase tracking-widest">
          Lo que construimos
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="services-heading"
            className="max-w-sm text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Nuestros servicios
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            De la idea a la producción — manejamos todo. Elige lo que necesitas, o déjanos aconsejar.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {services.map((service, i) => (
            <article
              key={service.title}
              className="group relative flex flex-col gap-6 overflow-hidden rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
              style={{
                animationDelay: `${i * 80}ms`,
              }}
            >
              {/* Hover glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-xl"
                style={{
                  background:
                    "radial-gradient(circle at 0% 0%, oklch(0.68 0.22 264 / 0.06), transparent 60%)",
                }}
                aria-hidden="true"
              />

              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted text-primary transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/10">
                  {service.icon}
                </div>
                <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  {service.tag}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              </div>

              <div className="mt-auto flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1">
                Más información
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
