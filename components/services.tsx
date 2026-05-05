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
    title: "Faaast",
    description:
      "Rendimiento extremo optimizado para velocidad. Aplicaciones que responden al instante, escalables y eficientes.",
    icon: Zap,
  },
  {
    title: "Poderoso",
    description:
      "Funcionalidades completas y potentes. Desde la idea hasta producción, con todas las herramientas que necesitas.",
    icon: Cpu,
  },
  {
    title: "Seguridad",
    description:
      "Seguridad de nivel empresarial. Encriptación, autenticación y cumplimiento normativo integrados desde el inicio.",
    icon: Fingerprint,
  },
  {
    title: "Personalización",
    description:
      "Completamente personalizable. Adaptamos cada solución a tus necesidades específicas y flujos de negocio.",
    icon: Pencil,
  },
  {
    title: "Control",
    description:
      "Control total sobre tu infraestructura. Monitoreo, analytics y dashboards para tomar decisiones informadas.",
    icon: Settings2,
  },
  {
    title: "Diseñado para IA",
    description:
      "Preparado para IA y machine learning. Integraciones nativas, APIs modernas y arquitectura escalable.",
    icon: Sparkles,
  }
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
