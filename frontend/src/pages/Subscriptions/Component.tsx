import { AiryArticlePreview, AiryArticleSkeleton } from '../../components';
import { Article, useGetArticlesQuery } from '../../redux';
import { HomeSection } from '../Home';
import { Prompt } from './components/Prompt';

export const Component = () => {
    const { data, isLoading, isSuccess, isError } = useGetArticlesQuery({
        section: HomeSection.Following,
        queryParams: `limit=15&page=0`,
    });

    const articlesList = () => {
        if (isLoading) return <AiryArticleSkeleton counts={12} />;
        if (isError) return <h3>Здесь появятся статьи для тебя</h3>;
        if (isSuccess) {
            return data?.map((article: Article, id: number) => <AiryArticlePreview key={id} article={article} />);
        }
    };

    const articles = () => {
        if (isSuccess && !data) {
            return (
                <Prompt
                    headline="Ты еще не подписан ни на одного автора."
                    text="Подписавшись на автора, ты увидишь все его проекты, которые автор делает доступными для подписчиков."
                />
            );
        } else return <div className="AiryArticlesList">{articlesList()}</div>;
    };

    return articles();
};
