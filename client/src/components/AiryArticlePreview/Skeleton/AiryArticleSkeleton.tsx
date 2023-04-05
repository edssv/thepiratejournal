import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface ArticleSkeletonProps {
    counts: number;
}

const AiryArticleSkeleton: React.FC<ArticleSkeletonProps> = ({ counts }) => {
    return (
        <>
            {counts &&
                Array(counts)
                    .fill(0)
                    .map((_, i) => (
                        <div key={i}>
                            <SkeletonTheme baseColor="var(--md-sys-color-surface-variant)" enableAnimation={false}>
                                <Skeleton borderRadius={24} height={312} />
                            </SkeletonTheme>
                        </div>
                    ))}
        </>
    );
};

export default AiryArticleSkeleton;
