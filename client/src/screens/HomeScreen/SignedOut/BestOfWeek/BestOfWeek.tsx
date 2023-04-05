import { useGetArticlesQuery, useGetBestOfWeekQuery } from '@/services';
import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';

export const BestOfWeek = () => {
  const { data: articles } = useGetBestOfWeekQuery();

  const articlesList = () => {
    return articles?.map((article) => <AiryArticlePreview key={article.id} article={article} />);
  };

  return (
    <section className="homeSection">
      <div className="contentContainer">
        <div className="sectionHeader">
          <h2>Лучшее за неделю</h2>
          <p>Самые оцененные статьи этой недели.</p>
        </div>
        <div className="bestOfWeekList">{articlesList()}</div>
      </div>
    </section>
  );
};
