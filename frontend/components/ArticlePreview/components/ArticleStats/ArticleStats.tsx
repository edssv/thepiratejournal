import React from 'react';

import styles from './ArticleStats.module.scss';

interface ArticleStatsProps {
    likesCount: number;
    viewsCount: number;
}

export const ArticleStats: React.FC<ArticleStatsProps> = ({ likesCount, viewsCount }) => {
    return (
        <div className={styles.root}>
            <div className={styles.iconAndCount}>
                <span className="material-symbols-outlined">favorite</span>
                <span>{likesCount}</span>
            </div>
            <div className={styles.iconAndCount}>
                <span className="material-symbols-outlined">visibility</span>
                <span>{viewsCount}</span>
            </div>
        </div>
    );
};
