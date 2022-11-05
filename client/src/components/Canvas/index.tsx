import React from 'react';

import logo from '../../assets/img/logo.png';

import styles from './Canvas.module.scss';

type CanvasProps = {
    children: any;
};

const Canvas: React.FC<CanvasProps> = ({ children }) => {
    return (
        <div className={styles.root}>
            <section className={styles.background}>
                <div className={styles.inner}>
                    <div className={styles.logoAndSpan}>
                        <img className={styles.logo} src={logo} alt="Logo" />
                        <p>Войдите или создайте учетную запись</p>
                    </div>
                    <div className={`${styles.item} ${styles.panel}`}>{children}</div>
                </div>
            </section>
        </div>
    );
};

export default Canvas;
