import Link from 'next/link';
import '@fontsource/roboto-mono';

import { Article } from '@/redux';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
    article: Article;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
    return (
        <div className={styles.root}>
            <Link href={`/articles/${article._id}`}>
                <div className={styles.thumbContainer}>
                    <div
                        className={styles.thumbImg}
                        style={{ backgroundImage: `url(${article.cover})` }}
                    />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.text}>
                        <div className={styles.articleCategory}>{article.category.name}</div>
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
