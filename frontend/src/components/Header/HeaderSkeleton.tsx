import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const HeaderSkeleton = () => {
    return (
        <div style={{ display: 'flex' }}>
            <SkeletonTheme
                baseColor="var(--spectrum-global-color-gray-200)"
                enableAnimation={false}>
                <Skeleton
                    circle
                    width={32}
                    height={32}
                    count={4}
                    inline
                    style={{ marginLeft: '8px', marginRight: '8px' }}
                />
            </SkeletonTheme>
        </div>
    );
};
