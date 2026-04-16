import { motion } from 'framer-motion';
import { imageVariants } from './profile-card.variants';

export function ProfileImage({
  image,
  name,
  isDropdownOpen,
}: {
  image: string;
  name: string;
  isDropdownOpen?: boolean;
}) {
  return (
    <>
      <motion.img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        variants={imageVariants}
        animate={{
          opacity: 1,
          filter: isDropdownOpen ? 'brightness(0.4)' : 'brightness(1)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-linear-to-t from-background/90 via-background/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background/85 via-background/40 to-transparent" />
    </>
  );
}
