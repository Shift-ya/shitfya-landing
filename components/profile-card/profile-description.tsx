import { motion } from 'framer-motion';
import { itemVariants } from './profile-card.variants';

export function ProfileDescription({ description }: { description: string }) {
  return (
    <motion.p
      variants={itemVariants}
      className="text-muted-foreground text-sm leading-relaxed"
    >
      {description}
    </motion.p>
  );
}
