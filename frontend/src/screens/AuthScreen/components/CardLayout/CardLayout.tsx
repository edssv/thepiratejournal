import React, { PropsWithChildren } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useRouter } from 'next/router';

import { useNetworkStatus } from '@/hooks';
import Toaster from '@/components/Toaster/Toaster';

import logo from '@/assets/img/logotype.png';
import styles from './CardLayout.module.scss';

const CardLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { isOnline } = useNetworkStatus();
    const { pathname } = useRouter();
    const activeSection = pathname.split('/')[1];
    const isLaptop = useMediaPredicate('(max-width: 1279px)');
    const isMobile = useMediaPredicate('(max-width: 510px)');

    return (
        <>
            {!isOnline && <Toaster />}
            <div
                style={
                    !isOnline ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 } : { borderRadius: isMobile ? 0 : 8 }
                }
                className={styles.root}
            >
                <header className={styles.header}>
                    {isLaptop && (
                        <div className={`${styles.logo} icon-center`}>
                            <img src={logo.src} alt="The Pirate Journal" />
                            <span>The Pirate Journal</span>
                        </div>
                    )}
                    <h2>
                        {activeSection === 'login' ? 'Войти' : activeSection === 'signup' && 'Создать учетную запись'}
                    </h2>
                </header>
                <section className={styles.content}>{children}</section>
            </div>
        </>
    );
};

export default CardLayout;
