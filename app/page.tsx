import { HeroSection } from "@/components/ui/hero-section-1"
import { ScrollReveal } from "@/components/scroll-reveal"
import { ValueProps } from "@/components/value-props"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
/* import { Projects } from "@/components/projects" */
import { Founders } from "@/components/founders"
import { Testimonials } from "@/components/testimonials"
import { Cta } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ScrollReveal>
        <ValueProps />
      </ScrollReveal>
      <ScrollReveal delay={80}>
        <Services />
      </ScrollReveal>
      <ScrollReveal delay={120}>
        <Process />
      </ScrollReveal>
      {/* <Projects /> */}
      <ScrollReveal delay={160}>
        <Founders />
      </ScrollReveal>
      <ScrollReveal delay={200}>
        <Testimonials />
      </ScrollReveal>
      <ScrollReveal delay={240}>
        <Cta />
      </ScrollReveal>
      <Footer />
    </main>
  )
}
