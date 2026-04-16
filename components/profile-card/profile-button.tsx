import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { SocialDropdown, type SocialLink } from '@/components/ui/social-dropdown';
import { itemVariants } from './profile-card.variants';

export function ProfileButton({
  socials = [],
  onSelectSocial,
  onOpenChange,
}: {
  socials?: SocialLink[];
  onSelectSocial?: (social: SocialLink) => void;
  onOpenChange?: (isOpen: boolean) => void;
}) {
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
