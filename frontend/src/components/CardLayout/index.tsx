import React from 'react';
import { Toaster } from '../Toaster';
import logo from '../../assets/img/logotype.png';

import styles from './CardLayout.module.scss';
import { useMediaPredicate } from 'react-media-hook';

type CardLayoutProps = {
    children: any;
    headline: string;
    toaster?: boolean;
};

export const CardLayout: React.FC<CardLayoutProps> = ({ children, headline, toaster }) => {
    const isLaptop = useMediaPredicate('(max-width: 1279px)');

    return (
        <>
            {toaster && <Toaster />}
            <div
                style={
                    toaster
                        ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
                        : window.innerWidth > 510
                        ? { borderRadius: 8 }
                        : { borderRadius: 0 }
                }
                className={styles.root}>
                <header className={styles.header}>
                    {isLaptop && (
                        <div className={`${styles.logo} icon-center`}>
                            <img src={logo} alt="The pirate" />
                            <span>The Pirate Journal</span>
                        </div>
                    )}
                    <h2>{headline}</h2>
                </header>
                <section className={styles.content}>{children}</section>
            </div>
        </>
    );
};
