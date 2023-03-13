import { AiryArticlePreview, AiryArticleSkeleton } from '../../../../../components';
import { Article, useGetArticlesQuery } from '../../../../../redux';
import { HomeSection } from '../../SignedIn';

export const ArticlesBlock: React.FC = () => {
    const { data, isLoading, isSuccess, isError } = useGetArticlesQuery({
        section: HomeSection.ForYou,
        queryParams: `limit=15&page=0`,
    });

    const articlesList = () => {
        if (isLoading) return <AiryArticleSkeleton counts={12} />;
        if (isError) return <h3>Здесь появятся статьи для тебя</h3>;
        if (isSuccess) {
            return data?.map((article: Article, id: number) => <AiryArticlePreview key={id} article={article} />);
        }
    };

    return <div className="AiryArticlesList">{articlesList()}</div>;
};