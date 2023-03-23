import { Article, useGetNewestQuery } from '@/store';
import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import AiryArticleSkeleton from '@/components/AiryArticlePreview/AiryArticleSkeleton';

export const NewestArticles: React.FC = () => {
    const { data, isLoading, isSuccess } = useGetNewestQuery('');

    const articles = () => {
        if (isLoading) return <AiryArticleSkeleton counts={12} />;

        if (isSuccess) {
            return data?.map((article: Article) => <AiryArticlePreview key={article._id} article={article} />);
        }
    };
    return (
        <section className="homeSection">
            <div className="contentContainer">
                <div className="sectionHeader">
                    <h2>Самое новое</h2>
                    <p>Только что опубликованные статьи.</p>
                </div>
                <div className="newestArticlesList">{articles()}</div>
            </div>
        </section>
    );
};
