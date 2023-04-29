import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import { useArticlesListQuery } from '@/gql/__generated__';

import { Prompt } from './Prompt';

export const Component = () => {
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

  const articles = () => {
    if (!data?.getAllArticles.length) {
      return (
        <Prompt
          headline='Ты еще не подписан ни на одного автора.'
          text='Подписавшись на автора, ты увидишь все его проекты, которые автор делает доступными для подписчиков.'
        />
      );
    }
    return <div className='AiryArticlesList'>{articlesList()}</div>;
  };

  return articles();
};
