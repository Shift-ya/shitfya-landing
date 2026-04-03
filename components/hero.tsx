"use client"

import { useEffect, useRef } from "react"

export function Hero() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const el = glowRef.current
    if (!el) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      el.style.setProperty("--gx", `${x}%`)
      el.style.setProperty("--gy", `${y}%`)
    }
    el.addEventListener("mousemove", handleMouseMove)
    return () => el.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section
      ref={glowRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-20 text-center"
      style={{
        background:
          "radial-gradient(ellipse 60% 50% at var(--gx, 50%) var(--gy, 30%), oklch(0.68 0.22 264 / 0.12), transparent 70%)",
      }}
      aria-label="Hero section"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(0.97 0 0) 1px, transparent 1px), linear-gradient(to bottom, oklch(0.97 0 0) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      {/* Glow orb */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: "oklch(0.68 0.22 264)" }}
        aria-hidden="true"
      />

      {/* Badge */}
      <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
        Estudio de software premium
      </div>

      {/* Headline */}
      <h1 className="max-w-4xl text-balance text-5xl font-bold leading-tight tracking-tight text-foreground sm:text-6xl lg:text-7xl">
        Software personalizado,{" "}
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(135deg, oklch(0.72 0.18 264), oklch(0.60 0.22 280))",
          }}
        >
          hecho para ir rápido
        </span>
      </h1>

      {/* Subheadline */}
      <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        Diseñamos y desarrollamos productos digitales escalables personalizados para tu negocio. Sin plantillas — solo lo que realmente necesitas.
      </p>

      {/* CTAs */}
      <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
        <a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-100 shadow-lg"
          style={{ boxShadow: "0 0 24px oklch(0.68 0.22 264 / 0.35)" }}
        >
          Comenzar
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a
          href="#work"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-all duration-200 hover:border-primary/40 hover:bg-muted"
        >
          Ver nuestro trabajo
        </a>
      </div>

      {/* Social proof strip */}
      <div className="mt-20 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-muted-foreground">
        <span className="text-xs uppercase tracking-widest opacity-50">Confiado por</span>
        {["Finova", "Stackr", "Crux AI", "Launchpad"].map((name) => (
          <span key={name} className="text-sm font-medium opacity-40 hover:opacity-70 transition-opacity">
            {name}
          </span>
        ))}
      </div>
    </section>
  )
}
