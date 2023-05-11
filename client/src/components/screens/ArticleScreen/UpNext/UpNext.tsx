import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useCallback, useRef, useState } from 'react';

import { useNextArticlesQuery } from '@/gql/__generated__';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import { ArticlePreview } from './ArticlePreview/ArticlePreview';
import styles from './UpNext.module.scss';

export const UpNext: React.FC = () => {
  const { query } = useRouter();

  const UpNextRef = useRef<HTMLDivElement>(null);
  const [isMount, setIsMount] = useState(false);

  const { data: articlesData } = useNextArticlesQuery({
    variables: { id: Number(query.id) }
  });

  const handleScroll = useCallback(() => {
    const screenHeight = window.screen.height;
    const upNextTop = UpNextRef?.current?.getBoundingClientRect().top ?? 0;

    if (!isMount && screenHeight - upNextTop >= 0) {
      setIsMount(true);
    }
  }, [isMount]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  if (!articlesData?.getNextArticles.length) return null;

  return (
    <div ref={UpNextRef} className={styles.root}>
      <h2>Читать дальше</h2>
      <div className={styles.container}>
        {articlesData?.getNextArticles?.map(
          (article, i) =>
            isMount && (
              <motion.div
                key={article.id}
                animate={{ y: 0, scale: 1 }}
                className={styles.motionDiv}
                initial={{ y: 30, scale: 0.95 }}
                transition={{ duration: 0.3, delay: 0.15 * (i + 1) }}
              >
                <ArticlePreview cover={article.cover} href={getPublicUrl.article(article.id)} title={article.title} />
              </motion.div>
            )
        )}
      </div>
    </div>
  );
};
