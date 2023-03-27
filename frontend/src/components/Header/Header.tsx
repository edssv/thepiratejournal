import { useRouter } from 'next/router';
import { useEffect, useCallback, useState, memo } from 'react';

import { useAuth } from '@/hooks';
import HeaderStrip from './components/HeaderStrip/HeaderStrip';

import styles from './Header.module.scss';

const Header = memo(() => {
    const { pathname } = useRouter();
    const { user } = useAuth();
    const isHomeLocation = pathname.split('/')[1] === '';
    const [isVisible, setIsVisible] = useState(true);
    const [prevScrollPosition, setPrevScrollPosition] = useState(0);
    const [isPrimary, setIsPrimary] = useState(!user && isHomeLocation);

    // скрытие хедера

    const changeIsVisible = () => {
        const currentScrollPosition = window.scrollY;

        if (currentScrollPosition > prevScrollPosition) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }

        setPrevScrollPosition(currentScrollPosition);
    };

    useEffect(() => {
        if (!isHomeLocation) {
            window.addEventListener('scroll', changeIsVisible);
        }

        return () => {
            window.removeEventListener('scroll', changeIsVisible);
        };
    }, [isHomeLocation, changeIsVisible]);

    // изменение позиции и цвета хедера на домашней странице

    useEffect(() => {
        if (!user) {
            setIsPrimary(isHomeLocation);
        }
    }, [user, isHomeLocation]);

    useEffect(() => {
        if (!user && isHomeLocation) {
            window.addEventListener('scroll', changeColorAndPosition);
        }

        return () => {
            window.removeEventListener('scroll', changeColorAndPosition);
        };
    }, [user, isHomeLocation]);

    const changeColorAndPosition = useCallback(() => {
        const homeHeader = document.getElementById('homeHeader');
        if (homeHeader) {
            const homeHeaderHeight = homeHeader.scrollHeight;
            const homeHeaderOffsetTop = homeHeader.offsetTop;

            if (homeHeaderOffsetTop + homeHeaderHeight - window.scrollY < 150) {
                setIsPrimary(false);
            } else setIsPrimary(true);
        }
    }, []);

    return (
        <header
            id="header"
            className={`${styles.root} ${isHomeLocation ? styles.fixed : ''} ${isPrimary ? styles.isPrimary : ''} ${
                isVisible ? styles.isVisible : ''
            }`}
        >
            <HeaderStrip />
        </header>
    );
});

export default Header;
