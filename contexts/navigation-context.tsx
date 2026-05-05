'use client'

import { createContext, useContext, useTransition, ReactNode } from 'react'
import { usePathname } from 'next/navigation'

interface NavigationContextType {
  isNavigating: boolean
  currentPath: string | null
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [isPending] = useTransition()

  return (
    <NavigationContext.Provider
      value={{
        isNavigating: isPending,
        currentPath: pathname,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error('useNavigation must be used within NavigationProvider')
  }
  return context
}
