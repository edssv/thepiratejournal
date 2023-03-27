import { useQuery } from '@tanstack/react-query';

import { ArticleService } from '@/store';
import { Article } from '@/interfaces/article.interface';
import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import AiryArticleSkeleton from '@/components/AiryArticlePreview/AiryArticleSkeleton';

interface AuthorChoiceProps {
    articles: Article[];
}

export const AuthorChoice: React.FC<AuthorChoiceProps> = ({}) => {
    const { data: articles } = useQuery({ queryKey: ['articles'], queryFn: ArticleService.getAll });

    const articlesList = () => {
        return articles
            ?.slice(0, 3)
            .map((article) => <AiryArticlePreview key={article.id} article={article} size="M" />);
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
