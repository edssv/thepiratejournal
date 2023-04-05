import { useGetArticlesQuery } from '@/services';
import { Article } from '@/interfaces/article.interface';
import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import AiryArticleSkeleton from '@/components/AiryArticlePreview/Skeleton/AiryArticleSkeleton';
import HomeSection from '../../SignedIn/SignedIn';

export const ArticlesBlock: React.FC = () => {
    const { data, isLoading, isSuccess, isError } = useGetArticlesQuery();

    const articlesList = () => {
        if (isLoading) return <AiryArticleSkeleton counts={12} />;
        if (isError) return <h3>Здесь появятся статьи для тебя</h3>;
        if (isSuccess) {
            return data?.map((article: Article, id: number) => <AiryArticlePreview key={id} article={article} />);
        }
    };

    return <div className="AiryArticlesList">{articlesList()}</div>;
};
