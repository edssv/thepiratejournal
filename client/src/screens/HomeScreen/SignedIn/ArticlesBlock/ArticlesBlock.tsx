import { useArticlesListQuery } from '@/gql/__generated__';
import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';

export const ArticlesBlock: React.FC = () => {
  const { data, loading, error } = useArticlesListQuery();

  const articlesList = () => {
    if (loading) return null;
    if (error) return <h3>Здесь появятся статьи для тебя</h3>;
    if (data) {
      return data.getAllArticles?.map((article, id: number) => <AiryArticlePreview key={id} article={article} />);
    }
  };

  return <div className="AiryArticlesList">{articlesList()}</div>;
};
