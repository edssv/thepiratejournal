import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import type { HomeSignedOutQuery } from '@/gql/__generated__';

export const BestOfWeek: React.FC<{ data: HomeSignedOutQuery['getBestOfWeekArticles'] }> = ({
  data
}) => {
  const articlesList = () =>
    data?.map((article) => <AiryArticlePreview key={article.id} article={article} />);

  return (
    <section className='homeSection'>
      <div className='contentContainer'>
        <div className='sectionHeader'>
          <h2>Лучшее за неделю</h2>
          <p>Самые оцененные статьи этой недели.</p>
        </div>
        <div className='bestOfWeekList'>{articlesList()}</div>
      </div>
    </section>
  );
};
