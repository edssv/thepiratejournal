import { AiryArticlePreview, AiryArticleSkeleton } from '../../../../../components';
import { Article, useGetArticlesQuery } from '../../../../../redux';
import { HomeSectionPrompt } from '../../../SignedIn/components/HomeSectionPrompt';
import { HomeSection } from '../../SignedIn';

interface ArticlesBlockProps {
    activeSection: HomeSection;
}

export const ArticlesBlock: React.FC<ArticlesBlockProps> = ({ activeSection }) => {
    const {
        data,
        isLoading: isLoadingArticles,
        isSuccess,
        isError,
    } = useGetArticlesQuery({
        section: activeSection,
        queryParams: `limit=15&page=0`,
    });

    const articlesList = () => {
        if (isLoadingArticles) return <AiryArticleSkeleton counts={12} />;
        if (isError) return <h3>Здесь появятся статьи для тебя</h3>;
        if (isSuccess) {
            return data?.map((article: Article, id: number) => <AiryArticlePreview key={id} article={article} />);
        }
    };

    const articles = () => {
        if (activeSection === 'for_you') {
            return articlesList();
        }
        if (activeSection === 'following' && isSuccess && !data) {
            return (
                <HomeSectionPrompt
                    headline="Ты еще не подписан ни на одного автора."
                    text="Подписавшись на автора, ты увидишь все его проекты, которые автор делает доступными для подписчиков."
                />
            );
        } else return articlesList();
    };

    return <div className="AiryArticlesList">{articles()}</div>;
};
