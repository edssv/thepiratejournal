import { useEffect, useState } from 'react';
import styles from './BackTopButton.module.scss';

export const BackTopButton = () => {
    const [prevScrollPosition, setPrevSrollPosition] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const handleBackTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleVisibleButton = () => {
        const scrollPosition = window.scrollY;

        console.log(isVisible, scrollPosition, scrollPosition);
        if (scrollPosition > 400 && prevScrollPosition > scrollPosition) {
            setIsVisible(true);
        } else if (scrollPosition < 400 || prevScrollPosition < scrollPosition) {
            setIsVisible(false);
        }

        setPrevSrollPosition(scrollPosition);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleVisibleButton);

        return () => window.removeEventListener('scroll', handleVisibleButton);
    }, [isVisible, handleVisibleButton]);

    return (
        <button
            onClick={handleBackTop}
            className={`${styles.root} ${isVisible && styles.show} elevated`}
            aria-label="Scroll back to top"
            type="button"
        >
            <span className="material-symbols-outlined">expand_less</span>
        </button>
    );
};
