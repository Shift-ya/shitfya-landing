'use client'

import { Zap, Cpu, Fingerprint, Pencil, Settings2, Sparkles } from 'lucide-react'
import { FeatureCard } from './ui/grid-feature-cards'

type ServicesType = {
  title: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  description: string
}

const services: ServicesType[] = [
  {
    title: "Entrega agil",
    description:
      "Ciclos cortos de desarrollo, iteraciones continuas y releases predecibles para acelerar el time-to-market.",
    icon: Zap,
  },
  {
    title: "Arquitectura robusta",
    description:
      "Sistemas confiables y mantenibles, diseñados para soportar crecimiento de usuarios, datos y complejidad.",
    icon: Cpu,
  },
  {
    title: "Seguridad aplicada",
    description:
      "Autenticacion, cifrado y buenas practicas integradas desde la primera linea de codigo.",
    icon: Fingerprint,
  },
  {
    title: "Soluciones a medida",
    description:
      "Cada producto se diseña en funcion de tu modelo operativo, procesos internos y necesidades comerciales.",
    icon: Pencil,
  },
  {
    title: "Visibilidad y control",
    description:
      "Metricas, monitoreo y trazabilidad para tomar decisiones con datos y mejorar continuamente.",
    icon: Settings2,
  },
  {
    title: "Preparado para IA",
    description:
      "Arquitectura lista para integrar modelos, automatizaciones y flujos inteligentes cuando tu negocio lo requiera.",
    icon: Sparkles,
  }
]

export function Services() {
  return (
    <section className="py-24 px-6" id="services" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl">
        <p className="brand-text-gradient mb-4 text-xs font-semibold uppercase tracking-widest">
          Capacidades clave
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="services-heading"
            className="max-w-sm text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Nuestros servicios
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            Acompanamos todo el proceso: discovery, diseno, desarrollo, despliegue y evolucion continua.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <FeatureCard
              key={service.title}
              feature={service}
              style={{
                animationDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
