import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import { HomeSignedOutQuery } from '@/gql/__generated__';

export const NewestArticles: React.FC<{ data: HomeSignedOutQuery['getNewestArticles'] }> = ({ data }) => {
  return (
    <section className="homeSection">
      <div className="contentContainer">
        <div className="sectionHeader">
          <h2>Самое новое</h2>
          <p>Только что опубликованные статьи.</p>
        </div>
        <div className="newestArticlesList">
          {data?.map((article) => (
            <AiryArticlePreview key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};
