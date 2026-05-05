import { motion } from 'framer-motion';
import { itemVariants, letterVariants } from './profile-card.variants';

export function ProfileHeader({ name }: { name: string }) {
  return (
    <motion.div variants={itemVariants} className="flex items-center gap-2">
      <motion.h2
        className="text-xl sm:text-2xl font-bold text-foreground leading-tight break-word"
        variants={{ visible: { transition: { staggerChildren: 0.02 } } }}
      >
        {name.split(' ').map((word, idx) => (
          <span key={idx} className="inline-block mr-1">
            {word.split('').map((letter, letterIdx) => (
              <motion.span
                key={letterIdx}
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
