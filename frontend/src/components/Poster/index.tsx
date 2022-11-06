import React from 'react';
import { Link } from 'react-router-dom';

import posterImg from '../../assets/img/metro-last-light-tonnel.jpg';

import styles from './Poster.module.scss';

export const Poster = () => {
    return (
        <div className={styles.root}>
            <div className={styles.posterWrapper}>
                <Link to="games/metro-exodus" className={styles.posterLink}>
                    <img src={posterImg} alt="" />
                </Link>
            </div>
            <div className={styles.captions}>
                <span className={styles.title}>Metro Exodus</span>
                <span className={styles.subtitle}>2019, shooter</span>
            </div>
        </div>
    );
};
