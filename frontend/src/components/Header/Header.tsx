import { useEffect, useCallback, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';

import { useAuth } from '../../hooks';
import { HeaderStrip } from './components/HeaderStrip';
import { HamburgerMenu } from './components/HamburgerMenu';

import styles from './Header.module.scss';

export const Header = () => {
    const location = useLocation();
    const { user, isLoading } = useAuth();
    const isHomeLocation = location.pathname.split('/')[1] === '';
    const isTablet = useMediaPredicate('(max-width: 990.98px)');
    const [open, setOpen] = useState<boolean>(false);
    const [isPrimary, setIsPrimary] = useState(!isLoading && !user && isHomeLocation);

    useEffect(() => {
        if (!isLoading && !user) {
            setIsPrimary(isHomeLocation);
        }
    }, [user, isLoading, isHomeLocation]);

    useEffect(() => {
        if (!user && isHomeLocation) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [user, isHomeLocation]);

    const handleScroll = useCallback(() => {
        const homeHeader = document.getElementById('homeHeader');
        if (homeHeader) {
            const homeHeaderHeight = homeHeader.scrollHeight;
            const homeHeaderOffsetTop = homeHeader.offsetTop;
            console.log(homeHeaderOffsetTop);

            if (homeHeaderOffsetTop + homeHeaderHeight - window.scrollY < 150) {
                setIsPrimary(false);
            } else setIsPrimary(true);
        }
    }, []);

    return (
        <header
            id="header"
            className={`${styles.root} ${isHomeLocation ? styles.fixed : ''} ${isPrimary ? styles.isPrimary : ''}`}
        >
            <div className={styles.fixedContainer}>
                <HamburgerMenu open={open} setOpen={setOpen} />{' '}
                {isTablet && (
                    <div
                        onClick={() => setOpen(false)}
                        className={`${styles.overlay} ${open ? styles.visible : ''} overlay`}
                    />
                )}{' '}
                <HeaderStrip open={open} setOpen={setOpen} />
            </div>
        </header>
    );
};
