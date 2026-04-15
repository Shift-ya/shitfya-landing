import { ReactNode } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface CarouselContainerProps {
  itemId: string;
  direction: number;
  children: ReactNode;
  variants: Variants;
  transition: any;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  containerClassName?: string;
  height?: string;
}

export function CarouselContainer({
  itemId,
  direction,
  children,
  variants,
  transition,
  onMouseEnter,
  onMouseLeave,
  containerClassName = 'relative h-96 w-full flex items-center justify-center overflow-visible',
  height,
}: CarouselContainerProps) {
  return (
    <div className={height ? containerClassName.replace('h-96', height) : containerClassName}>
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={itemId}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="absolute inset-0 flex items-center justify-center overflow-visible"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
