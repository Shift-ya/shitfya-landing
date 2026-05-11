

'use client';

import { ProfileCard } from '@/components/profile-card';
import { useCarousel } from '@/hooks/use-carousel';
import type { SocialLink } from '@/components/ui/social-dropdown';
import {
  CarouselButton,
  CarouselDots,
  CarouselContainer,
  slideVariants,
  slideTransition,
} from '@/components/carousel';
import { FounderInfoCard } from '@/components/founder-info-card';
import { SectionHeader } from '@/components/section-header';

interface Founder {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image: string;
  imagePosition?: string;
  isVerified?: boolean;
  socials?: SocialLink[];
  githubUsername?: string;
  likesTitle?: string;
  likesText?: string;
  likesLinks?: Array<{ label: string; url: string }>;
}

const founders: Founder[] = [
  {
    id: 'founder-1',
    name: 'Santiago Cofman',
    role: 'Lic. en Sistemas · Backend · Co-fundador',
    bio: '',
    image: '/founders/founder-1.jpg',
    imagePosition: '50% 28%',
    isVerified: true,
    githubUsername: 'Santicof',
    likesTitle: 'Algo que le gusta a Santi',
    likesText:
  'Entre código, mates y videos, disfruto encontrarle el lado divertido a la informática y crear contenido que haga sentir identificada a la gente del mundo tech.',
    likesLinks: [
      {
        label: 'Ver playlist en YouTube',
        url: 'https://www.youtube.com/playlist?list=PLeqZo_bDgyNwJbmSu4GJcWSRiRzQYMAw_',
      },
      {
        label: 'Ver Instagram @san_sistema',
        url: 'https://instagram.com/san_sistema',
      },
    ],
    socials: [
      {
        platform: 'github',
        url: 'https://github.com/Santicof',
        username: '@Santicof',
      },
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/santiagocofman',
        username: '@santiagocofman',
        followers: 2100,
        following: 320,
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com/san_sistema',
        username: '@san_sistema',
        followers: 23500,
        following: 40,
      },
    ],
  },
  {
    id: 'founder-2',
    name: 'María Luz Piro',
    role: 'Analista de Sistemas · Fullstack · Co-fundadora',
    bio: '',
    image: '/founders/founder-2.jpg',
    isVerified: true,
    githubUsername: 'MariaLuz18',
    likesTitle: 'Algo que le gusta a Malu',
    likesText:
  'Me encanta arrancar el día con un buen café, escuchar playlists tranquilas y perderme ajustando pequeños detalles visuales hasta que todo quede como lo imaginé.',
  socials: [
      {
        platform: 'github',
        url: 'https://github.com/MariaLuz18',
        username: '@MariaLuz18',
      },
      {
        platform: 'linkedin',
        url: 'www.linkedin.com/in/marialuzpiro',
        username: '@marialuzpiro',
        followers: 477,
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com/piromalu',
        username: '@piromalu',
        followers: 301,
        following: 638,
      },
    ],
  },
  {
    id: 'founder-3',
    name: 'Dante Lugo',
    role: 'Analista de Sistemas · Frontend Developer · Co-fundador',
    bio: '',
    image: '/founders/founder-3.jpg',
    isVerified: true,
    githubUsername: 'dantel8',
    likesTitle: 'Algo que le gusta a Dante',
    likesText:
  'Disfruto las ideas creativas que aparecen de madrugada, los pequeños detalles que hacen diferente a un proyecto y la sensación de construir algo propio.',
  socials: [
      {
        platform: 'github',
        url: 'https://github.com/dantel8',
        username: '@dantel8',
      },
      {
        platform: 'linkedin',
        url: 'https://linkedin.com/in/dantelugo',
        username: '@dantelugo',
        followers: 154,
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com/dantekbz',
        username: '@dantekbz',
        followers: 145,
        following: 180,
      },
    ],
  },
];

export function Founders() {
  const {
    currentIndex,
    direction,
    currentItem: currentFounder,
    handlePrev,
    handleNext,
    handleDotClick,
    setIsAutoPlay,
    handleTouchStart,
    handleTouchEnd,
  } = useCarousel({ items: founders });

  return (
    <section
      id="about"
      aria-labelledby="founders-heading"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8"
    >
      <SectionHeader
        badge="El equipo"
        title="Los fundadores"
        description="Equipo fundador con formacion en sistemas y experiencia real en producto, desarrollo y comunicacion tecnologica."
      />

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 py-12 auto-cols-fr">
        {founders.map((founder) => (
          <div key={founder.id} className="flex flex-col items-center text-center">
            <div className="w-full max-w-sm">
              <ProfileCard
                name={founder.name}
                image={founder.image}
                imagePosition={founder.imagePosition}
                socials={founder.socials ?? []}
                gitHubUsername={founder.githubUsername}
                enableAnimations={true}
                width="w-full"
                height="h-96"
              />
            </div>
            <h3 className="text-xl font-bold text-foreground mt-6">{founder.name}</h3>
            <p className="brand-text-gradient mt-1 text-xs font-medium uppercase tracking-widest">
              {founder.role}
            </p>
            <FounderLikesCard founder={founder} />
          </div>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div 
        className="md:hidden relative flex items-center justify-center px-4 py-8 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <CarouselContainer
          itemId={currentFounder.id}
          direction={direction}
          variants={slideVariants}
          transition={slideTransition}
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          <ProfileCard
            name={currentFounder.name}
            image={currentFounder.image}
            imagePosition={currentFounder.imagePosition}
            socials={currentFounder.socials ?? []}
            gitHubUsername={currentFounder.githubUsername}
            enableAnimations={true}
            width="w-80"
            height="h-96"
          />
        </CarouselContainer>
      </div>
      <div className="block md:hidden">
        <FounderInfoCard
          id={currentFounder.id}
          name={currentFounder.name}
          role={currentFounder.role}
        />
        <FounderLikesCard founder={currentFounder} compact />

        <CarouselDots
          total={founders.length}
          current={currentIndex}
          onDotClick={handleDotClick}
        />
      </div>
    </section>
  );
}

function FounderLikesCard({ founder, compact = false }: { founder: Founder; compact?: boolean }) {
  if (!founder.likesTitle && !founder.likesText && (!founder.likesLinks || founder.likesLinks.length === 0)) {
    return null;
  }

  return (
    <div
      className={`mt-4 w-full rounded-2xl border border-primary/40 bg-linear-to-br from-card/95 via-card/80 to-background/80 p-4 text-left shadow-[0_12px_34px_rgba(46,215,255,0.12)] ring-1 ring-primary/25 backdrop-blur-sm ${
        compact ? 'max-w-sm mx-auto' : 'max-w-sm'
      }`}
    >
      {founder.likesTitle ? (
        <p className="brand-text-gradient text-[11px] font-semibold uppercase tracking-widest">
          {founder.likesTitle}
        </p>
      ) : null}

      {founder.likesText ? (
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">{founder.likesText}</p>
      ) : null}

      {founder.likesLinks && founder.likesLinks.length > 0 ? (
        <div className="mt-3 flex flex-col gap-2">
          {founder.likesLinks.map((item) => (
            <a
              key={item.url}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="brand-text-gradient text-sm font-semibold hover:opacity-90"
            >
              {item.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
