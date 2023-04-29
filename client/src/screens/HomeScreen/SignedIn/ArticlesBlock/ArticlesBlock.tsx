import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import { useArticlesListQuery } from '@/gql/__generated__';

export const ArticlesBlock: React.FC = () => {
  const { data, loading, error } = useArticlesListQuery();

  const articlesList = () => {
    if (loading) return null;
    if (error) return <h3>Здесь появятся статьи для тебя</h3>;
    if (data) {
      return data.getAllArticles?.map((article, id: number) => (
        <AiryArticlePreview key={id} article={article} />
      ));
    }

    return null;
  };

  return <div className='AiryArticlesList'>{articlesList()}</div>;
};
