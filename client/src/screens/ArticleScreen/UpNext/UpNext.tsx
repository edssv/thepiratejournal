import { useEffect, useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { ArticleService } from '@/services';
import { Article } from '@/interfaces/article.interface';
import { ArticlePreview } from './ArticlePreview/ArticlePreview';

import styles from './UpNext.module.scss';

export const UpNext = () => {
    const UpNextRef = useRef<HTMLDivElement>(null);
    const [isMount, setIsMount] = useState(false);
    const { query } = useRouter();

    const { data } = useQuery(['upnext'], () => ArticleService.getNext(query.id as string));

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
                {data?.map(
                    (article: Article, i) =>
                        isMount && (
                            <motion.div
                                key={article.id}
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
