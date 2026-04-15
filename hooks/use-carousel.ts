import { useState, useEffect, useCallback } from 'react';

interface CarouselItem {
  id: string;
}

interface UseCarouselProps<T extends CarouselItem> {
  items: T[];
  autoPlayInterval?: number;
}

interface UseCarouselReturn<T extends CarouselItem> {
  currentIndex: number;
  direction: number;
  currentItem: T;
  followedUsers: Set<string>;
  isAutoPlay: boolean;
  setIsAutoPlay: (value: boolean) => void;
  handlePrev: () => void;
  handleNext: () => void;
  handleDotClick: (index: number) => void;
  handleFollow: (userId: string) => void;
}

export function useCarousel<T extends CarouselItem>({
  items,
  autoPlayInterval = 6000,
}: UseCarouselProps<T>): UseCarouselReturn<T> {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [followedUsers, setFollowedUsers] = useState<Set<string>>(new Set());
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const currentItem = items[currentIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  }, [items.length]);

  // Auto-play logic
  useEffect(() => {
    if (!isAutoPlay || items.length === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, isAutoPlay, autoPlayInterval, items.length, handleNext]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    setIsAutoPlay(false);
  }, [items.length]);

  const handleDotClick = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlay(false);
  }, [currentIndex]);

  const handleFollow = useCallback((userId: string) => {
    setFollowedUsers((prev) => {
      const newFollowed = new Set(prev);
      if (newFollowed.has(userId)) {
        newFollowed.delete(userId);
      } else {
        newFollowed.add(userId);
      }
      return newFollowed;
    });
  }, []);

  return {
    currentIndex,
    direction,
    currentItem,
    followedUsers,
    isAutoPlay,
    setIsAutoPlay,
    handlePrev,
    handleNext,
    handleDotClick,
    handleFollow,
  };
}
