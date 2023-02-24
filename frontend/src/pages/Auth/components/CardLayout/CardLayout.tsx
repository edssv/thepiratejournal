import React, { PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';

import { Toaster } from '../../../../components';
import { useNetworkStatus } from '../../../../hooks';

import logo from '../../../../assets/img/logotype.png';
import styles from './CardLayout.module.scss';

export const CardLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { isOnline } = useNetworkStatus();
    const location = useLocation();
    const activeSection = location.pathname.split('/')[1];
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
                            <img src={logo} alt="The Pirate Journal" />
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
