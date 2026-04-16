export const getContainerVariants = (shouldAnimate: boolean) => ({
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

export const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05 },
};

export const contentVariants = {
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

export const itemVariants = {
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

export const letterVariants = {
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
