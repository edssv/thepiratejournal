import React from 'react';
import { Toaster } from '../Toaster';
import logo from '../../assets/img/logotype.png';

import styles from './CardLayout.module.scss';

type CardLayoutProps = {
    children: any;
    headline: string;
    toaster?: boolean;
};

const CardLayout: React.FC<CardLayoutProps> = ({ children, headline, toaster }) => {
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
                    <div className={`${styles.logo} icon-center`}>
                        <img src={logo} alt="The pirate" />
                        <span>The Pirate</span>
                    </div>
                    <h2>{headline}</h2>
                </header>
                <section className={styles.content}>{children}</section>
            </div>
        </>
    );
};

export default CardLayout;
