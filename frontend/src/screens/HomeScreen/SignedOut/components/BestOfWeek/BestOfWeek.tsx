import { useGetBestOfWeakQuery } from '@/store';
import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import AiryArticleSkeleton from '@/components/AiryArticlePreview/AiryArticleSkeleton';

export const BestOfWeek = () => {
    const { data, isLoading } = useGetBestOfWeakQuery('');

    const articles = () => {
        if (isLoading) {
            return <AiryArticleSkeleton counts={6} />;
        }
        return data?.map((article) => <AiryArticlePreview key={article._id} article={article} />);
    };

    return (
        <section className="homeSection">
            <div className="contentContainer">
                <div className="sectionHeader">
                    <h2>Лучшее за неделю</h2>
                    <p>Самые оцененные статьи этой недели.</p>
                </div>
                <div className="bestOfWeekList">{articles()}</div>
            </div>
        </section>
    );
};
