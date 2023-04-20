import { useGetArticlesQuery } from '@/services';
import AiryArticlePreview from '@/components/AiryArticlePreview/AiryArticlePreview';
import { HomeSignedOutQuery } from '@/gql/__generated__';

export const AuthorChoice: React.FC<{ data: HomeSignedOutQuery['getAuthorChoiceArticles'] }> = ({ data }) => {
  const articlesList = () => {
    return data?.slice(0, 3).map((article) => <AiryArticlePreview key={article.id} article={article} size="M" />);
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
