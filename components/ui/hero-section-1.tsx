'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { Waves } from '@/components/ui/wave-background';
import { MeetingSchedulerDialog } from '@/components/meeting-scheduler-dialog';
import { HeroHeader } from './hero-header';

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
                  Software personalizado para crecer
                </h1>
                <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground">
                  Diseñamos y desarrollamos productos digitales escalables adaptados a
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
                  <MeetingSchedulerDialog
                    triggerClassName="w-40 rounded-xl px-5 text-base"
                    triggerLabel="Agendar reunion"
                  />
                </div>
                <div key={2} className="bg-foreground/10 rounded-[14px] border p-0.5">
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="transparent"
                    className="w-32 rounded-xl px-5 text-base"
                  >
                    <a href="#services">
                      <span className="text-nowrap">Ver servicios</span>
                    </a>
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
