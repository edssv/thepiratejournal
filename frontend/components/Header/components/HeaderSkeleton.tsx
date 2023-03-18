import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const HeaderSkeleton = () => {
    return (
        <div style={{ display: 'flex' }}>
            <SkeletonTheme
                baseColor="var(--md-sys-color-secondary-container)"
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
