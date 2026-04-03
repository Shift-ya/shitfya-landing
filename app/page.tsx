import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ValueProps } from "@/components/value-props"
import { Services } from "@/components/services"
import { Process } from "@/components/process"
import { Projects } from "@/components/projects"
import { Founders } from "@/components/founders"
import { Testimonials } from "@/components/testimonials"
import { Cta } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ValueProps />
      <Services />
      <Process />
      <Projects />
      <Founders />
      <Testimonials />
      <Cta />
      <Footer />
    </main>
  )
}
