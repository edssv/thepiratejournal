import { useEffect, useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { Article, selectArticle, useGetSuggestionsQuery } from '../../../../redux';
import { ArticlePreview } from './components/ArticlePreview';

import styles from './UpNext.module.scss';

export const UpNext = () => {
    const article = useSelector(selectArticle);

    const UpNextRef = useRef<HTMLDivElement>(null);
    const [isMount, setIsMount] = useState(false);

    const { data } = useGetSuggestionsQuery(
        {
            id: article._id,
            category: 'all',
            queryParams: `limit=3&page=0`,
        },
        { refetchOnMountOrArgChange: true }
    );

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

    return (
        <div ref={UpNextRef} className={styles.root}>
            <h2>Читать дальше</h2>
            <div className={styles.container}>
                {data?.articles.map(
                    (article: Article, i) =>
                        isMount && (
                            <motion.div
                                key={article._id}
                                initial={{ y: 30, scale: 0.95 }}
                                animate={{ y: 0, scale: 1 }}
                                transition={{ duration: 0.3, delay: 0.15 * (i + 1) }}
                                className={styles.motionDiv}
                            >
                                <ArticlePreview article={article} />
                            </motion.div>
                        )
                )}
            </div>
        </div>
    );
};
