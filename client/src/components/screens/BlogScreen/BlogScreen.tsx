import type { ArticleListQuery } from '@/gql/__generated__';

import { ArticlePreview } from './ArticlePreview/ArticlePreview';
import styles from './BlogScreen.module.scss';

const BlogScreen: React.FC<{ data: ArticleListQuery }> = ({ data }) => {
  const featuredBlog = data?.getAllArticle[0] ?? null;

  const articleList = () =>
    data?.getAllArticle
      .map((item) => (
        <ArticlePreview
          key={item.id}
          cover={item.cover}
          createdAt={item.createdAt}
          description={item.description}
          id={item.id}
          title={item.title}
        />
      ))
      .slice(1);

  if (!featuredBlog) return null;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <ArticlePreview
          featured
          cover={featuredBlog.cover}
          createdAt={featuredBlog.createdAt}
          description={featuredBlog.description}
          id={featuredBlog.id}
          title={featuredBlog.title}
        />
        <div className={styles.articlesContainer}>{articleList()}</div>
      </div>
    </div>
  );
};

export default BlogScreen;
