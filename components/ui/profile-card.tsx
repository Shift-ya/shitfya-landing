'use client';

import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { SocialDropdown, type SocialLink } from '@/components/ui/social-dropdown';
import { useGitHubUser } from '@/hooks/use-github-user';

interface ProfileCardProps {
  name?: string;
  description?: string;
  image?: string;
  isVerified?: boolean;
  enableAnimations?: boolean;
  className?: string;
  socials?: SocialLink[];
  onSelectSocial?: (social: SocialLink) => void;
  gitHubUsername?: string;
  width?: string;
  height?: string;
}

// ========================================
// 1. ANIMATION VARIANTS (Separate for clarity)
// ========================================
const getContainerVariants = (shouldAnimate: boolean) => ({
  rest: {
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  hover: shouldAnimate
    ? {
        scale: 1.02,
        y: -4,
        filter: 'blur(0px)',
        transition: {
          type: 'spring' as const,
          stiffness: 400,
          damping: 28,
          mass: 0.6,
        },
      }
    : {},
});

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 28,
      mass: 0.6,
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.95,
    filter: 'blur(2px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 400,
      damping: 25,
      mass: 0.5,
    },
  },
};

const letterVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 8,
      stiffness: 200,
      mass: 0.8,
    },
  },
};

// ========================================
// 2. SUB-COMPONENTS (Separate for readability)
// ========================================

interface ProfileImageProps {
  image: string;
  name: string;
  isDropdownOpen?: boolean;
}

function ProfileImage({ image, name, isDropdownOpen }: ProfileImageProps) {
  return (
    <>
      {/* Full Cover Image */}
      <motion.img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        variants={imageVariants}
        animate={{
          opacity: 1,
          filter: isDropdownOpen ? 'brightness(0.4)' : 'brightness(1)',
        }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-background/90 via-background/40 to-transparent " />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background/85 via-background/40 to-transparent" />
    </>
  );
}

interface ProfileHeaderProps {
  name: string;
}

function ProfileHeader({ name }: ProfileHeaderProps) {
  return (
    <motion.div variants={itemVariants} className="flex items-center gap-2">
      {/* Animated Name with Letter Stagger */}
      <motion.h2
        className="text-xl sm:text-2xl font-bold text-foreground leading-tight wrap-break-word overflow-wrap-break-word"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.02,
            },
          },
        }}
      >
        {name.split(' ').map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block mr-1">
            {word.split('').map((letter, letterIndex) => (
              <motion.span
                key={letterIndex}
                variants={letterVariants}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.h2>
    </motion.div>
  );
}

interface ProfileDescriptionProps {
  description: string;
}

function ProfileDescription({ description }: ProfileDescriptionProps) {
  return (
    <motion.p
      variants={itemVariants}
      className="text-muted-foreground text-sm leading-relaxed"
    >
      {description}
    </motion.p>
  );
}

interface ProfileButtonProps {
  socials?: SocialLink[];
  onSelectSocial?: (social: SocialLink) => void;
  onOpenChange?: (isOpen: boolean) => void;
}

function ProfileButton({ socials = [], onSelectSocial, onOpenChange }: ProfileButtonProps) {
  return (
    <motion.div variants={itemVariants}>
      {socials && socials.length > 0 ? (
        <SocialDropdown
          socials={socials}
          onSelectSocial={onSelectSocial}
          onOpenChange={onOpenChange}
        />
      ) : (
        <motion.button
          whileHover={{
            scale: 1.02,
            transition: { type: 'spring', stiffness: 400, damping: 25 },
          }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            'w-full cursor-pointer py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-200',
            'border border-border/20 shadow-sm',
            'bg-foreground text-background hover:bg-foreground/90',
            'transform-gpu'
          )}
        >
          Seguir
        </motion.button>
      )}
    </motion.div>
  );
}

// ========================================
// 3. MAIN COMPONENT
// ========================================

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

  // Enriquecer sociales con datos de GitHub
  const enrichedSocials = useMemo(() => {
    if (!gitHubUser) return socials;
    
    return socials.map(social => {
      if (social.platform === 'github' && gitHubUser.created_at) {
        return {
          ...social,
          created_at: gitHubUser.created_at,
        };
      }
      return social;
    });
  }, [socials, gitHubUser]);

  const handleSelectSocial = (social: SocialLink) => {
    onSelectSocial(social);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsDropdownOpen(isOpen);
  };

  return (
    <motion.div
      data-slot="profile-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial="rest"
      whileHover="hover"
      variants={getContainerVariants(shouldAnimate)}
      className={cn(
        'relative rounded-3xl border border-border/20 shadow-xl shadow-black/5 cursor-pointer group backdrop-blur-sm overflow-hidden z-10 transition-[z-index]',
        width,
        height,
        isDropdownOpen || hovered ? 'z-20' : 'z-10',
        'dark:shadow-black/20',
        className
      )}
    >
      {/* Image Layer Container */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <ProfileImage image={image} name={name} isDropdownOpen={isDropdownOpen} />
      </div>

      {/* Content Layer */}
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
          onSelectSocial={handleSelectSocial}
          onOpenChange={handleOpenChange}
        />
      </motion.div>
    </motion.div>
  );
}
