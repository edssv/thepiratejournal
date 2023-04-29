import type { BlogListQuery } from '@/gql/__generated__';

import { ArticlePreview } from './ArticlePreview/ArticlePreview';
import styles from './Blog.module.scss';

const BlogScreen: React.FC<{ data: BlogListQuery }> = ({ data }) => {
  const featuredBlog = data?.getAllBlog[0] ?? null;

  const blogList = () =>
    data?.getAllBlog
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
        <div className={styles.articlesContainer}>{blogList()}</div>
      </div>
    </div>
  );
};

export default BlogScreen;
