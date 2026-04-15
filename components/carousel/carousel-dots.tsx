import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CarouselDotsProps {
  total: number;
  current: number;
  onDotClick: (index: number) => void;
  className?: string;
}

export function CarouselDots({
  total,
  current,
  onDotClick,
  className,
}: CarouselDotsProps) {
  return (
    <div className={cn('flex items-center justify-center gap-2 mt-8', className)}>
      {Array.from({ length: total }).map((_, index) => (
        <motion.button
          key={index}
          onClick={() => onDotClick(index)}
          className={cn(
            'rounded-full transition-all duration-300',
            current === index
              ? 'bg-foreground w-3 h-3'
              : 'bg-foreground/20 w-2 h-2 hover:bg-foreground/40'
          )}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          aria-label={`Ir a elemento ${index + 1}`}
          aria-current={current === index}
        />
      ))}
    </div>
  );
}
