'use client';

import { useCallback, useEffect, useState } from 'react';

import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const BackTopButton = () => {
  const [prevScrollPosition, setPrevSrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const handleBackTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVisibleButton = useCallback(() => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 400 && prevScrollPosition > scrollPosition) {
      setIsVisible(true);
    } else if (scrollPosition < 400 || prevScrollPosition < scrollPosition) {
      setIsVisible(false);
    }

    setPrevSrollPosition(scrollPosition);
  }, [prevScrollPosition]);

  useEffect(() => {
    window.addEventListener('scroll', handleVisibleButton);

    return () => window.removeEventListener('scroll', handleVisibleButton);
  }, [isVisible, handleVisibleButton]);

  return (
    <Button
      aria-label='Scroll back to top'
      type='button'
      variant='secondary'
      className={cn(
        'invisible fixed bottom-2 right-2 z-20 flex h-16 w-16 items-center justify-center rounded-full opacity-0 transition-all lg:bottom-6 lg:right-6',
        { 'visible opacity-100': isVisible }
      )}
      onClick={handleBackTop}
    >
      <div className='absolute left-0 top-0 h-full w-full rounded-[32px]' />
      <Icons.pinTop />
    </Button>
  );
};
