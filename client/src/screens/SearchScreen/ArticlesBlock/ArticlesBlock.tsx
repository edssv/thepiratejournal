import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useSearchQuery } from '@/services/article/article.service';
import { Article } from '@/interfaces/article.interface';
import ArticlePreview from '@/components/ArticlePreview/ArticlePreview';

import styles from './ArticlesBlock.module.scss';

const ArticlesBlock = () => {
  const { query } = useTypedSelector((state) => state.filter);

  const { data, isLoading, isFetching, isError, isSuccess } = useSearchQuery(query);

  const getArticlesList = () => {
    if (isLoading || isFetching) return <h2>Здесь появятся статьи для тебя</h2>;
    if (isError) return <h2>Произошла ошибка</h2>;
    if (isSuccess) {
      return data?.articles.map((article: Article, id: number) => <ArticlePreview key={id} article={article} />);
    }
  };
  return (
    <div className={styles.root}>
      <ul className="AiryArticlesList">{getArticlesList()}</ul>
    </div>
  );
};

export default ArticlesBlock;
