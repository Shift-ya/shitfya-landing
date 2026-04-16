

'use client';

import { ProfileCard } from '@/components/ui/profile-card';
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
  isVerified?: boolean;
  socials?: SocialLink[];
  githubUsername?: string;
}

const founders: Founder[] = [
  {
    id: 'founder-1',
    name: 'Santiago Cofman',
    role: 'Backend & Co-fundador',
    bio: '',
    image: '/founders/founder-1.jpg',
    isVerified: true,
    githubUsername: 'Santicof',
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
    name: 'Maria Luz Piro',
    role: 'Fullstack & Co-fundadora',
    bio: '',
    image: '/founders/founder-2.jpg',
    isVerified: true,
    githubUsername: 'MariaLuz18',
    socials: [
      {
        platform: 'github',
        url: 'https://github.com/MariaLuz18',
        username: '@MariaLuz18',
      },
      {
        platform: 'linkedin',
        url: 'linkedin.com/in/maría-luz-piro-655466234',
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
    role: 'Frontend Developer & Co-fundador',
    bio: '',
    image: '/founders/founder-3.jpg',
    isVerified: true,
    githubUsername: 'dantel8',
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
        description="Un equipo construido para hacer las cosas bien. Tres personas, un mismo norte."
      />

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 py-12 auto-cols-fr">
        {founders.map((founder) => (
          <div key={founder.id} className="flex flex-col items-center text-center">
            <div className="w-full max-w-sm">
              <ProfileCard
                name={founder.name}
                description={founder.bio}
                image={founder.image}
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
            description={currentFounder.bio}
            image={currentFounder.image}
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

        <CarouselDots
          total={founders.length}
          current={currentIndex}
          onDotClick={handleDotClick}
        />
      </div>
    </section>
  );
}
