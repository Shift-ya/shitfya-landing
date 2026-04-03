const testimonials = [
  {
    quote:
      "shft.ya entregó en 6 semanas lo que nuestra agencia anterior cotizó en 6 meses. La calidad fue mejor que cualquier cosa que hubiéramos enviado internamente.",
    author: "Layla Hassan",
    role: "CTO, Finova",
    initials: "LH",
  },
  {
    quote:
      "No solo ejecutan — se oponen cuando algo podría hacerse mejor. Exactamente lo que necesitábamos en un socio técnico.",
    author: "James Okafor",
    role: "Fundador, Stackr",
    initials: "JO",
  },
  {
    quote:
      "La colaboración fue perfecta. Demos semanales, cronogramas honestos y cero sorpresas en el lanzamiento. Raro.",
    author: "Priya Mehta",
    role: "Jefa de Producto, Crux AI",
    initials: "PM",
  },
]

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-card border-y border-border" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
          Historias de clientes
        </p>
        <h2
          id="testimonials-heading"
          className="max-w-sm text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Lo que dicen nuestros clientes
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.author}
              className="flex flex-col gap-6 rounded-xl border border-border bg-background p-8"
            >
              {/* Quote mark */}
              <span className="text-4xl font-serif leading-none text-primary/30" aria-hidden="true">
                &ldquo;
              </span>
              <blockquote className="text-sm leading-relaxed text-foreground">
                <p>{t.quote}</p>
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-3">
                {/* Avatar initials */}
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-primary-foreground"
                  style={{ background: "oklch(0.68 0.22 264)" }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
