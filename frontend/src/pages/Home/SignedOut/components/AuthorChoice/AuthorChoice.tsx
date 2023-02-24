import { AiryArticlePreview, AiryArticleSkeleton } from '../../../../../components';
import { useGetAuthorChoiceQuery } from '../../../../../redux';

export const AuthorChoice = () => {
    const { data, isLoading } = useGetAuthorChoiceQuery('');

    const articles = () => {
        if (isLoading) {
            return <AiryArticleSkeleton counts={3} />;
        }
        return data?.map((article) => <AiryArticlePreview key={article._id} article={article} size="M" />);
    };

    return (
        <section className="homeSection">
            <div className="contentContainer">
                <div className="sectionHeader">
                    <h2>Выбор авторов</h2>
                    <p></p>
                </div>
                <div className="authorChoiceList">{articles()}</div>
            </div>
        </section>
    );
};
