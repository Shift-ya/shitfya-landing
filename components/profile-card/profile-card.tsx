'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { useGitHubUser } from '@/hooks/use-github-user';
import type { SocialLink } from '@/components/ui/social-dropdown';
import {
  getContainerVariants,
  contentVariants,
} from './profile-card.variants';
import { ProfileImage } from './profile-image';
import { ProfileHeader } from './profile-header';
import { ProfileDescription } from './profile-description';
import { ProfileButton } from './profile-button';

export interface ProfileCardProps {
  name?: string;
  description?: string;
  image?: string;
  enableAnimations?: boolean;
  className?: string;
  socials?: SocialLink[];
  onSelectSocial?: (social: SocialLink) => void;
  gitHubUsername?: string;
  width?: string;
  height?: string;
}

export function ProfileCard({
  name = '',
  description = '',
  image = 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800&h=800&fit=crop&auto=format&q=80',
  enableAnimations = true,
  className,
  socials = [],
  onSelectSocial = () => {},
  gitHubUsername,
  width = 'w-80',
  height = 'h-96',
}: ProfileCardProps) {
  const [hovered, setHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { gitHubUser } = useGitHubUser(gitHubUsername);
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;

  const enrichedSocials = useMemo(() => {
    if (!gitHubUser) return socials;
    return socials.map((social) =>
      social.platform === 'github' && gitHubUser.created_at
        ? { ...social, created_at: gitHubUser.created_at }
        : social
    );
  }, [socials, gitHubUser]);

  return (
    <motion.div
      data-slot="profile-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial="rest"
      whileHover="hover"
      variants={getContainerVariants(shouldAnimate)}
      className={cn(
        'relative rounded-3xl border border-border/20 shadow-xl shadow-black/5',
        'cursor-pointer group backdrop-blur-sm overflow-hidden z-10 transition-[z-index]',
        width,
        height,
        isDropdownOpen || hovered ? 'z-20' : 'z-10',
        'dark:shadow-black/20',
        className
      )}
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <ProfileImage image={image} name={name} isDropdownOpen={isDropdownOpen} />
      </div>

      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 left-0 right-0 p-6 space-y-4 overflow-visible"
      >
        <ProfileHeader name={name} />
        <ProfileDescription description={description} />
        <ProfileButton
          socials={enrichedSocials}
          onSelectSocial={onSelectSocial}
          onOpenChange={(isOpen) => setIsDropdownOpen(isOpen)}
        />
      </motion.div>
    </motion.div>
  );
}
