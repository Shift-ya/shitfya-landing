import { HeroSection } from "@/components/ui/hero-section-1"
import { ScrollReveal } from "@/components/scroll-reveal"
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
        <Services />
      </ScrollReveal>
      {/* <Projects /> */}
      <ScrollReveal delay={80}>
        <Founders />
      </ScrollReveal>
      {/* <ScrollReveal delay={120}>
        <Testimonials />
      </ScrollReveal> */}
      <ScrollReveal delay={120}>
        <Cta />
      </ScrollReveal>
      <Footer />
    </main>
  )
}
