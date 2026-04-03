export function Cta() {
  return (
    <section className="py-32 px-6" id="contact" aria-labelledby="cta-heading">
      <div className="mx-auto max-w-3xl">
        <div
          className="relative overflow-hidden rounded-2xl border border-primary/20 p-12 text-center"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.68 0.22 264 / 0.12), transparent 60%), oklch(0.12 0.005 264)",
          }}
        >
          {/* Glow */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl opacity-25"
            style={{ background: "oklch(0.68 0.22 264)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center gap-6">
            <p className="brand-text-gradient text-xs font-semibold uppercase tracking-widest">
              Ponte en contacto
            </p>
            <h2
              id="cta-heading"
              className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Construyamos algo grandioso
            </h2>
            <p className="max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              Cuéntanos sobre tu proyecto. Responderemos dentro de 24 horas con una evaluación sincera y un camino a seguir.
            </p>
            <a
              href="mailto:hello@shft.ya"
              className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-100"
              style={{ boxShadow: "0 0 32px oklch(0.68 0.22 264 / 0.4)" }}
            >
              Inicia tu proyecto
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <p className="text-xs text-muted-foreground">
              Sin compromisos. Sin llamadas de ventas. Solo una conversación real.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
