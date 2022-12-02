import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import styles from './ArticleSkeleton.module.scss';

interface ArticleSkeletonProps {
    counts: number;
}

export const ArticleSkeleton: React.FC<ArticleSkeletonProps> = ({ counts }) => {
    return (
        <>
            {counts &&
                Array(counts)
                    .fill(0)
                    .map((_, i) => (
                        <div className={styles.root} key={i}>
                            <SkeletonTheme
                                baseColor="var(--spectrum-global-color-gray-200)"
                                enableAnimation={false}>
                                <Skeleton borderRadius={8} height={172} />
                                <Skeleton width="90%" height={20} style={{ marginTop: '10px' }} />
                                <Skeleton width="30%" height={20} style={{ marginTop: '10px' }} />
                            </SkeletonTheme>
                        </div>
                    ))}
        </>
    );
};
