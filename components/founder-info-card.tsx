import { motion } from 'framer-motion';

interface FounderInfoCardProps {
  name: string;
  role: string;
  id?: string;
}

export function FounderInfoCard({ name, role, id }: FounderInfoCardProps) {
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="mt-12 text-center"
    >
      <h3 className="text-xl font-bold text-foreground">{name}</h3>
      <p className="brand-text-gradient mt-1 text-xs font-medium uppercase tracking-widest">
        {role}
      </p>
    </motion.div>
  );
}
