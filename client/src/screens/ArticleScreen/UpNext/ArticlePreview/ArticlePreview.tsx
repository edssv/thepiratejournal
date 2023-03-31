import Link from 'next/link';

import { Article } from '@/interfaces/article.interface';
import { getPublicUrl } from '@/lib/publicUrlBuilder';

import styles from './ArticlePreview.module.scss';
import clsx from 'clsx';
import { robotoMono } from '@/components/fonts/roboto-mono';

export const ArticlePreview: React.FC<{ article: Article }> = ({ article }) => {
    return (
        <div className={styles.root}>
            <Link href={getPublicUrl.article(article.id)}>
                <div className={styles.thumbContainer}>
                    <div className={styles.thumbImg} style={{ backgroundImage: `url(${article.cover})` }} />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.text}>
                        <div className={clsx(styles.articleCategory, robotoMono.className, robotoMono.style)}>
                            {article.category}
                        </div>
                        <div
                            className={styles.headline}
                            dangerouslySetInnerHTML={{
                                __html: article.title ? article.title : 'Без названия',
                            }}
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
};
