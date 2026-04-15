import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselButtonProps {
  onClick: () => void;
  direction: 'prev' | 'next';
  disabled?: boolean;
  className?: string;
}

export function CarouselButton({
  onClick,
  direction,
  disabled = false,
  className,
}: CarouselButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.1 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(
        'absolute top-1/2 -translate-y-1/2 z-20 p-3 rounded-full transition-all duration-300',
        'bg-foreground/10 hover:bg-foreground/20 border border-border/50 hover:border-border',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-foreground/10',
        direction === 'prev' ? '-left-16' : '-right-16',
        className
      )}
      aria-label={direction === 'prev' ? 'Anterior' : 'Siguiente'}
    >
      {direction === 'prev' ? (
        <ChevronLeft className="w-5 h-5" />
      ) : (
        <ChevronRight className="w-5 h-5" />
      )}
    </motion.button>
  );
}
