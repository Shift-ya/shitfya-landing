

const founders = [
  {
    name: "Nombre Fundador",
    role: "CEO & Co-fundador",
    image: "/founders/founder-1.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  },
  {
    name: "Nombre Fundadora",
    role: "CTO & Co-fundadora",
    image: "/founders/founder-2.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
  },
  {
    name: "Dante Lugo",
    role: "Frontend Developer & Co-fundador",
    image: "/founders/founder-3.jpg",
    bio: "Dante Lugo es Frontend Developer y cofundador de shift.ya, donde lidera la construcción de interfaces modernas y productos digitales de alto impacto. Su enfoque combina velocidad, precisión técnica y una fuerte visión de producto para transformar ideas en soluciones reales.",
  },
]

export function Founders() {
  return (
    <section id="about" aria-labelledby="founders-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-16 text-center">
        <p className="brand-text-gradient mb-4 text-xs font-semibold uppercase tracking-widest">
          El equipo
        </p>
        <h2
          id="founders-heading"
          className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          Los fundadores
        </h2>
        <p className="mx-auto mt-4 max-w-md text-pretty text-sm leading-relaxed text-muted-foreground">
          Un equipo construido para hacer las cosas bien. Tres personas, un mismo norte.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {founders.map((founder) => (
          <article
            key={founder.image}
            className="group flex flex-col items-center text-center"
          >
            {/* Image */}
            <div className="relative mb-6 h-56 w-56 overflow-hidden rounded-2xl border border-border bg-muted transition-all duration-300 group-hover:border-primary/40 group-hover:shadow-[0_0_32px_oklch(0.68_0.22_264/0.18)]">
              <img
                src={founder.image}
                alt={`Foto de ${founder.name}`}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              {/* Subtle gradient overlay at bottom */}
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.08 0 0 / 0.6), transparent)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Name */}
            <h3 className="text-lg font-semibold text-foreground">{founder.name}</h3>

            {/* Role */}
            <p className="brand-text-gradient mt-1 text-xs font-medium uppercase tracking-widest">
              {founder.role}
            </p>

            {/* Bio */}
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {founder.bio}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
