import { useEffect, useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { useNextArticlesQuery, useNextBlogsQuery } from '@/gql/__generated__';
import { ArticlePageMode } from '@/lib/enums';
import { getPublicUrl } from '@/lib/publicUrlBuilder';
import { ArticlePreview } from './ArticlePreview/ArticlePreview';

import styles from './UpNext.module.scss';

export const UpNext: React.FC<{ mode: ArticlePageMode }> = ({ mode }) => {
  const { query } = useRouter();

  const UpNextRef = useRef<HTMLDivElement>(null);
  const [isMount, setIsMount] = useState(false);

  const articlesList =
    mode === ArticlePageMode.ARTICLE
      ? useNextArticlesQuery({ variables: { id: Number(query.id) } }).data?.getNextArticles
      : useNextBlogsQuery({ variables: { id: Number(query.id) } }).data?.getNextBlogs;

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
  }, [handleScroll]);

  return (
    <div ref={UpNextRef} className={styles.root}>
      <h2>Читать дальше</h2>
      <div className={styles.container}>
        {articlesList?.map(
          (article, i) =>
            isMount && (
              <motion.div
                key={article.id}
                initial={{ y: 30, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.15 * (i + 1) }}
                className={styles.motionDiv}
              >
                <ArticlePreview
                  href={
                    mode === ArticlePageMode.ARTICLE ? getPublicUrl.article(article.id) : getPublicUrl.blog(article.id)
                  }
                  title={article.title}
                  cover={article.cover}
                  category={article.category}
                />
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};
