import React from 'react';

import logo from '../../assets/img/logotype.png';
import background from '../../assets/img/thepirate_background.jpg';

import styles from './Canvas.module.scss';

type CanvasProps = {
    children: any;
};

export const Canvas: React.FC<CanvasProps> = ({ children }) => {
    return (
        <div className={styles.root} style={{ backgroundImage: `url(${background})` }}>
            <section className={styles.background}>
                <div className={styles.inner}>
                    <div className={styles.logoAndSpan}>
                        <div className={styles.logo__wrapper}>
                            <img className={styles.logo} src={logo} alt="Logo" />
                            <h2 className={styles.logo__text}>
                                The Pirate <br /> Journal
                            </h2>
                        </div>
                        <p>Войдите или создайте учетную запись</p>
                    </div>
                    <div className={`${styles.item} ${styles.panel}`}>{children}</div>
                </div>
            </section>
        </div>
    );
};
