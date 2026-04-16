'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const menuItems = [
  { name: 'Servicios', href: '#services' },
  { name: 'Acerca de', href: '#about' },
  { name: 'Precios', href: '#price' },
];

export const HeroHeader = () => {
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
                <Button asChild variant="transparent" size="sm" className={cn(isScrolled && 'lg:hidden', 'max-md:hidden max-lg:hidden')}>
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

                <Button
                  size="sm"
                  onClick={() => {
                    const turnoproUrl = process.env.NEXT_PUBLIC_TURNOPRO_URL || 'https://app.shiftya.online';
                    const loginUrl = `${turnoproUrl}/?page=login&from=landing`;
                    window.location.href = loginUrl;
                  }}
                  className="inline-flex"
                >
                  <span>Iniciar sesión</span>
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
