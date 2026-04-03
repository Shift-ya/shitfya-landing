const steps = [
  {
    number: "01",
    title: "Descubrimiento",
    description:
      "Nos sumergimos en tus objetivos, restricciones y usuarios. Talleres, entrevistas y análisis competitivo para definir exactamente qué construir.",
  },
  {
    number: "02",
    title: "Diseño",
    description:
      "De wireframes a prototipos de alta fidelidad. Cada pantalla revisada contigo antes de escribir una sola línea de código.",
  },
  {
    number: "03",
    title: "Desarrollo",
    description:
      "Sprints iterativos con demos semanales. Ves progreso real — desplegado y probado — en cada etapa.",
  },
  {
    number: "04",
    title: "Lanzamiento",
    description:
      "Entrega fluida, QA exhaustivo y un despliegue estable. Nos mantenemos cerca post-lanzamiento para manejar cualquier sorpresa.",
  },
]

export function Process() {
  return (
    <section className="py-24 px-6 bg-card border-y border-border" id="process" aria-labelledby="process-heading">
      <div className="mx-auto max-w-6xl">
        <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">
          Cómo trabajamos
        </p>
        <h2
          id="process-heading"
          className="max-w-md text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Un proceso construido para la claridad
        </h2>

        {/* Timeline */}
        <div className="mt-16 grid gap-0 sm:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.number} className="relative flex flex-col gap-4 sm:pr-8">
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="absolute top-5 left-full hidden w-full sm:block"
                  aria-hidden="true"
                  style={{ zIndex: 0 }}
                >
                  <div className="h-px w-full border-t border-dashed border-border" />
                </div>
              )}

              {/* Step number circle */}
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-sm font-bold text-primary">
                {step.number}
              </div>

              <div className="flex flex-col gap-2 pb-10 sm:pb-0">
                <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>

              {/* Mobile connector */}
              {i < steps.length - 1 && (
                <div
                  className="sm:hidden absolute left-5 top-10 h-full w-px border-l border-dashed border-border"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
