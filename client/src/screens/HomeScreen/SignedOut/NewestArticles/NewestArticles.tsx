import { useQuery } from '@tanstack/react-query';

import { ArticleService } from '@/services';
import { Article } from '@/interfaces/article.interface';
import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import AiryArticleSkeleton from '@/components/AiryArticlePreview/Skeleton/AiryArticleSkeleton';

export const NewestArticles: React.FC = () => {
    const { data, isLoading, isSuccess } = useQuery({ queryKey: ['articles'], queryFn: ArticleService.getAll });

    const articles = () => {
        if (isLoading) return <AiryArticleSkeleton counts={12} />;

        if (isSuccess) {
            return data
                ?.map((article: Article) => <AiryArticlePreview key={article.id} article={article} />)
                .slice(0, 9);
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
