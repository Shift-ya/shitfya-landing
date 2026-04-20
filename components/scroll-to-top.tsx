'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Scroll al top
    window.scrollTo(0, 0)
    
    // Reset scroll-reveal elements
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal')
    scrollRevealElements.forEach((element) => {
      element.classList.remove('is-visible')
    })
    
    // Asegurar que body no está locked
    document.body.style.overflow = 'auto'
  }, [pathname])

  return null
}
