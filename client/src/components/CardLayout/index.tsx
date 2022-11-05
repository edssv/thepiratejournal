import React from 'react';

import styles from './CardLayout.module.scss';

type CardLayoutProps = {
    children: any;
    headline: string;
    toaster?: boolean;
};

const CardLayout: React.FC<CardLayoutProps> = ({ children, headline, toaster }) => {
    return (
        <div className={styles.cardLayout__container}>
            <div
                style={
                    toaster
                        ? { borderTopLeftRadius: 0, borderTopRightRadius: 0 }
                        : { borderRadius: 8 }
                }
                className={styles.root}>
                <header className={styles.header}>
                    <h2>{headline}</h2>
                </header>
                <section className={styles.content}>{children}</section>
            </div>
        </div>
    );
};

export default CardLayout;
