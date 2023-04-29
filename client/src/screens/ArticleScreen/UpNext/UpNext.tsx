import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useRef, useState } from 'react';

import { useNextArticlesQuery, useNextBlogsQuery } from '@/gql/__generated__';
import { ArticlePageMode } from '@/lib/enums';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import { ArticlePreview } from './ArticlePreview/ArticlePreview';
import styles from './UpNext.module.scss';

export const UpNext: React.FC<{ mode: ArticlePageMode }> = ({ mode }) => {
  const { query } = useRouter();

  const UpNextRef = useRef<HTMLDivElement>(null);
  const [isMount, setIsMount] = useState(false);

  const { data: articlesData } = useNextArticlesQuery({
    variables: { id: Number(query.id) },
    skip: mode === ArticlePageMode.BLOG
  });
  const { data: blogData } = useNextBlogsQuery({
    variables: { id: Number(query.id) },
    skip: mode === ArticlePageMode.ARTICLE
  });

  const articlesList = mode === ArticlePageMode.ARTICLE ? articlesData?.getNextArticles : blogData?.getNextBlogs;

  const handleScroll = useCallback(() => {
    const screenHeight = window.screen.height;
    const upNextTop = UpNextRef?.current?.getBoundingClientRect().top ?? 0;

    if (!isMount && screenHeight - upNextTop >= 0) {
      setIsMount(true);
    }
  }, [isMount]);

  useEffect(() => {
    const wrapper = document.getElementById('wrapper');
    if (mode === 'article' && wrapper) {
      wrapper.addEventListener('scroll', handleScroll);
      return () => wrapper.removeEventListener('scroll', handleScroll);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, mode]);

  return (
    <div ref={UpNextRef} className={styles.root}>
      <h2>Читать дальше</h2>
      <div className={styles.container}>
        {articlesList?.map(
          (article, i) =>
            isMount && (
              <motion.div
                key={article.id}
                animate={{ y: 0, scale: 1 }}
                className={styles.motionDiv}
                initial={{ y: 30, scale: 0.95 }}
                transition={{ duration: 0.3, delay: 0.15 * (i + 1) }}
              >
                <ArticlePreview
                  category={article.category}
                  cover={article.cover}
                  title={article.title}
                  href={
                    mode === ArticlePageMode.ARTICLE ? getPublicUrl.article(article.id) : getPublicUrl.blog(article.id)
                  }
                />
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};
