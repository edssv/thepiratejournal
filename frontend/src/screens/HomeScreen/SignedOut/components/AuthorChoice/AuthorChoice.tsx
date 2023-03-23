import { Article, useGetAuthorChoiceQuery } from '@/store';
import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import AiryArticleSkeleton from '@/components/AiryArticlePreview/AiryArticleSkeleton';

interface AuthorChoiceProps {
    articles: Article[];
}

export const AuthorChoice: React.FC<AuthorChoiceProps> = ({ articles }) => {
    const { data, isLoading } = useGetAuthorChoiceQuery('');

    const articlesList = () => {
        // if (isLoading) {
        //     return <AiryArticleSkeleton counts={3} />;
        // }
        return data?.map((article) => <AiryArticlePreview key={article._id} article={article} size="M" />);
    };

    return (
        <section className="homeSection">
            <div className="contentContainer">
                <div className="sectionHeader">
                    <h2>Выбор авторов</h2>
                    <p></p>
                </div>
                <div className="authorChoiceList">{articlesList()}</div>
            </div>
        </section>
    );
};
