import { useCallback, useEffect, useState } from 'react';

import styles from './BackTopButton.module.scss';

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
    <button
      aria-label='Scroll back to top'
      className={`${styles.root} ${isVisible && styles.show} elevated`}
      type='button'
      onClick={handleBackTop}
    >
      <div className={styles.stateOverlay} />
      <span className='material-symbols-outlined'>vertical_align_top</span>
    </button>
  );
};
