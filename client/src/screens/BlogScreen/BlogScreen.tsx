import { BlogListQuery } from '@/gql/__generated__';
import { ArticlePreview } from './ArticlePreview/ArticlePreview';

import styles from './Blog.module.scss';

const BlogScreen: React.FC<{ data: BlogListQuery }> = ({ data }) => {
  const featuredBlog = data?.getAllBlog[0] ?? null;

  const blogList = () => {
    return data?.getAllBlog
      .map((item) => (
        <ArticlePreview
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          cover={item.cover}
          createdAt={item.createdAt}
        />
      ))
      .slice(1);
  };

  if (!featuredBlog) return null;

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <ArticlePreview
          id={featuredBlog.id}
          title={featuredBlog.title}
          description={featuredBlog.description}
          cover={featuredBlog.cover}
          createdAt={featuredBlog.createdAt}
          featured
        />
        <div className={styles.articlesContainer}>{blogList()}</div>
      </div>
    </div>
  );
};

export default BlogScreen;
