import { useGetArticlesQuery } from '@/services';
import { Article } from '@/interfaces/article.interface';
import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import AiryArticleSkeleton from '@/components/AiryArticlePreview/Skeleton/AiryArticleSkeleton';
import { Prompt } from './Prompt';

export const Component = () => {
  const { data, isLoading, isSuccess, isError } = useGetArticlesQuery();

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
