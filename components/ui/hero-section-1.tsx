'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { Waves } from '@/components/ui/wave-background';
import { cn } from '@/lib/utils';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
} as const;

export function HeroSection() {
  return (
    <>
      <HeroHeader />
      <div className="overflow-hidden">
        <section className="relative h-screen">
          <Waves
            className="absolute inset-0 -z-30"
            strokeColor="rgba(46, 215, 255, 0.44)"
            pointerColor="rgba(46, 215, 255, 0.95)"
            pointerSize={0.6}
            pointerOpacity={0.95}
            backgroundColor="transparent"
          />
          <Waves
            className="absolute inset-0 -z-20 opacity-70 mix-blend-screen"
            strokeColor="rgba(245, 44, 207, 0.24)"
            pointerColor="rgba(127, 77, 255, 0.9)"
            pointerSize={0.42}
            pointerOpacity={0.8}
            backgroundColor="transparent"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(90%_70%_at_50%_20%,rgba(91,109,255,0.28)_0%,rgba(127,77,255,0.12)_40%,transparent_62%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(8,9,18,0.14)_0%,rgba(8,9,18,0.48)_54%,rgba(8,9,18,0.78)_100%)]"
          />

          <div
            aria-hidden
            className="absolute inset-0 -z-10 hidden size-full lg:block [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--background)_240%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 size-full lg:hidden bg-[linear-gradient(180deg,transparent_80%,#000_100%)]"
          />

          <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-center px-6">
            <div className="w-full text-center sm:mx-auto lg:mr-auto lg:mt-0">
              <AnimatedGroup variants={transitionVariants}>
                <Link
                  href="#contact"
                  className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-black/5 transition-all duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                >
                  <span className="text-foreground text-sm">
                    Software a medida para equipos que necesitan velocidad
                  </span>
                  <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700 max-md:hidden" />
                  <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500 max-md:hidden">
                    <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                      <span className="flex size-6">
                        <ArrowRight className="m-auto size-3" />
                      </span>
                    </div>
                  </div>
                </Link>

                <h1 className="mt-8 mx-auto max-w-4xl text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] max-md:text-5xl">
                  Software personalizado para crecer sin friccion
                </h1>
                <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                  Disenamos y desarrollamos productos digitales escalables adaptados a
                  tu negocio, sin plantillas genericas.
                </p>
              </AnimatedGroup>

              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
                className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
              >
                <div key={1} className="bg-foreground/10 rounded-[14px] border p-0.5">
                  <Button 
                    asChild 
                    size="lg" 
                    variant="transparent" 
                    className="w-32 rounded-xl px-5 text-base">
                    <Link href="#contact">
                      <span className="text-nowrap">Comenzar</span>
                    </Link>
                  </Button>
                </div>
                <div key={2} className="bg-foreground/10 rounded-[14px] border p-0.5">
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="transparent"
                    className="w-32 rounded-xl px-5 text-base"
                  >
                    <Link href="#services">
                      <span className="text-nowrap">Ver servicios</span>
                    </Link>
                  </Button>
                </div>
              </AnimatedGroup>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

const menuItems = [
  { name: 'Servicios', href: '#services' },
  { name: 'Proceso', href: '#process' },
  { name: 'Acerca de', href: '#about' },
];

const HeroHeader = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleSectionNav = React.useCallback(
    (href: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href.startsWith('#')) return;
      event.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', href);
      }

      setMenuState(false);
    },
    [],
  );

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav data-state={menuState && 'active'} className="fixed z-20 w-full px-2 group">
        <div
          className={cn(
            'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
            isScrolled && 'bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5',
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link href="/" aria-label="Inicio" className="flex items-center space-x-2">
                <Logo />
              </Link>

              <button
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState ? 'Cerrar menu' : 'Abrir menu'}
                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
              >
                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
              </button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={handleSectionNav(item.href)}
                      className="text-muted-foreground hover:text-accent-foreground block duration-150"
                    >
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={handleSectionNav(item.href)}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                <Button asChild variant="transparent" size="sm" className={cn(isScrolled && 'lg:hidden', "max-md:hidden max-lg:hidden")}>
                  <a href="#contact" onClick={handleSectionNav('#contact')}>
                    <span>Contacto</span>
                  </a>
                </Button>
                
                <Button
                  asChild
                  size="sm"
                  className={cn('inline-flex', isScrolled ? 'lg:inline-flex' : 'lg:hidden')}
                >
                  <a href="#contact" onClick={handleSectionNav('#contact')}>
                    <span>Hablemos</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

const Logo = () => {
  return (
    <span className="text-xl font-bold tracking-tight">
      <span className="text-foreground">shift</span>
      <span className="brand-text-accent">.</span>
      <span className="brand-text-gradient">ya</span>
    </span>
  );
};
