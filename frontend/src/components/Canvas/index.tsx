import React from 'react';
import { useMediaPredicate } from 'react-media-hook';

import logo from '../../assets/img/logotype.png';
import background from '../../assets/img/thepirate_background.jpg';

import styles from './Canvas.module.scss';

type CanvasProps = {
    children: any;
};

export const Canvas: React.FC<CanvasProps> = ({ children }) => {
    const fromMobile = useMediaPredicate('(min-width: 510px)');
    const fromDesktop = useMediaPredicate('(min-width: 1280px)');

    return (
        <div className={styles.root}>
            <section className={styles.background}>
                <div className={styles.inner}>
                    {fromDesktop && (
                        <div className={styles.logoAndSpan}>
                            <div className={styles.logo__wrapper}>
                                <img className={styles.logo} src={logo} alt="Logo" />
                                <h2 className={styles.logo__text}>
                                    The Pirate <br /> Journal
                                </h2>
                            </div>
                            <p>Войдите или создайте учетную запись</p>
                        </div>
                    )}
                    <div className={`${styles.item} ${styles.panel}`}>{children}</div>
                </div>
            </section>
        </div>
    );
};
