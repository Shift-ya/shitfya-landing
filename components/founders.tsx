

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
        followers: 23.500,
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
        followers: 1650,
        following: 120,
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

      {/* Carousel */}
      <div className="relative flex items-center justify-center px-12 lg:px-20 py-8">
        <CarouselButton onClick={handlePrev} direction="prev" />
        <CarouselButton onClick={handleNext} direction="next" />

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
          />
        </CarouselContainer>
      </div>
      <FounderInfoCard
        key={currentFounder.id}
        name={currentFounder.name}
        role={currentFounder.role}
      />

      <CarouselDots
        total={founders.length}
        current={currentIndex}
        onDotClick={handleDotClick}
      />

      
    </section>
  );
}
