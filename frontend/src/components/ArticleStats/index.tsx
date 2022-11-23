import React from 'react';
import { IoEye, IoHeart } from 'react-icons/io5';

import styles from './ArticleStats.module.scss';

interface ArticleStatsProps {
    viewsCount: number | undefined;
    likesCount: number | undefined;
}

export const ArticleStats: React.FC<ArticleStatsProps> = ({ viewsCount, likesCount }) => {
    return (
        <div className={styles.root}>
            <span className="icon-center">
                <IoHeart />
                <span>{likesCount}</span>
            </span>
            <span className="icon-center">
                <IoEye />
                <span>{viewsCount}</span>
            </span>
        </div>
    );
};
