import { useQuery } from '@tanstack/react-query';

import { ArticleService } from '@/store';
import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import AiryArticleSkeleton from '@/components/AiryArticlePreview/AiryArticleSkeleton';

export const BestOfWeek = () => {
    const { data: articles } = useQuery({ queryKey: ['bestOfWeek'], queryFn: ArticleService.getBestOfWeek });

    const articlesList = () => {
        return articles?.map((article) => <AiryArticlePreview key={article.id} article={article} />);
    };

    return (
        <section className="homeSection">
            <div className="contentContainer">
                <div className="sectionHeader">
                    <h2>Лучшее за неделю</h2>
                    <p>Самые оцененные статьи этой недели.</p>
                </div>
                <div className="bestOfWeekList">{articlesList()}</div>
            </div>
        </section>
    );
};
