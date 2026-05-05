'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface SocialLink {
  platform: 'github' | 'linkedin' | 'instagram';
  url: string;
  username?: string;
  followers?: number;
  following?: number;
  public_repos?: number;
  created_at?: string;
}

interface SocialDropdownProps {
  socials: SocialLink[];
  onSelectSocial?: (social: SocialLink) => void;
  className?: string;
  onOpenChange?: (isOpen: boolean) => void;
}

const socialIcons = {
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
};

const socialColors = {
  github: 'bg-primary/90 hover:bg-primary',
  linkedin: 'bg-primary/90 hover:bg-primary',
  instagram: 'bg-primary/90 hover:bg-primary',
};

const socialLabels = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
};

const socialUsernames = {
  github: '@usuario',
  linkedin: '@usuario',
  instagram: '@usuario',
};

export function SocialDropdown({
  socials,
  onSelectSocial,
  className,
  onOpenChange,
}: SocialDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(Date.now());
    }, 15000);

    return () => window.clearInterval(intervalId);
  }, []);

  const handleSetOpen = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  const handleSelectSocial = (social: SocialLink) => {
    onSelectSocial?.(social);
    // Abre el link en una nueva pestaña
    if (social.url) {
      window.open(social.url, '_blank');
    }
  };

  const getGitHubYears = (createdAt?: string): number => {
    if (!createdAt) return 0;
    const creationDate = new Date(createdAt);
    const now = new Date();
    return Math.floor((now.getTime() - creationDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  };

  const getLiveFollowers = (baseFollowers: number): number => {
    // Simula un contador vivo suave para dar sensacion de actividad sin saltos bruscos.
    const elapsedMinutes = Math.max(0, Math.floor((now - 1735689600000) / (1000 * 60)));
    return baseFollowers + Math.floor(elapsedMinutes / 30);
  };

  return (
    <div className={cn('relative w-full z-50', className)}>
      {/* Button */}
      <motion.button
        onClick={() => handleSetOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          'w-full cursor-pointer py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-200',
          'border border-border/20 shadow-sm',
          'bg-foreground text-background hover:bg-foreground/90',
          'transform-gpu flex items-center justify-center gap-2 relative z-50'
        )}
      >
        Seguir
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="inline-block"
        >
          ↓
        </motion.span>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="mt-2 space-y-2 overflow-visible relative z-50"
          >
            {socials.map((social, idx) => {
              const IconComponent = socialIcons[social.platform];
              const bgColor = socialColors[social.platform];

              return (
                <motion.button
                  key={social.platform}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                    delay: idx * 0.08,
                  }}
                  onClick={() => handleSelectSocial(social)}
                  whileHover={{ 
                    scale: 1.05, 
                    x: 6,
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl',
                    'transition-all duration-200 text-white text-sm relative z-50',
                    bgColor
                  )}
                >
                  <IconComponent className="w-5 h-5 shrink-0" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold">
                      {socialLabels[social.platform]}
                    </p>
                    <p className="text-xs opacity-90">
                      {social.username || socialUsernames[social.platform]}
                      {social.username === '@san_sistema' && social.followers ? (
                        <span className="ml-2 rounded-full border border-white/30 px-2 py-0.5 text-[10px] font-medium text-white/95">
                          En vivo: {getLiveFollowers(social.followers).toLocaleString()}
                        </span>
                      ) : null}
                    </p>
                  </div>
                  <div className="text-right text-xs">
                    {social.platform === 'github' && social.created_at ? (
                      <p>{getGitHubYears(social.created_at)} años en GitHub</p>
                    ) : social.followers ? (
                      <p>{social.followers.toLocaleString()} seguidores</p>
                    ) : null}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
