'use client';

import Link from 'next/link';

import { Article } from '../../redux';

import styles from './AiryArticlePreview.module.scss';

interface ArticlePreviewProps {
    article: Article;
    size?: 'S' | 'M';
}

export const AiryArticlePreview: React.FC<ArticlePreviewProps> = ({ article, size = 'S' }) => {
    return (
        <div className={`${styles.root} ${size === 'S' ? styles.sizeSmall : styles.sizeMedium}`}>
            <Link href={`/articles/${article._id}`} className={styles.thumbnail}>
                {' '}
                <div className={styles.thumbContainer} style={{ backgroundImage: `url(${article.cover})` }} />
                <div className={styles.contentContainer}>
                    <div className={styles.text}>
                        <div
                            className={styles.headline}
                            dangerouslySetInnerHTML={{ __html: article.title ?? 'Без названия' }}
                        />
                        <p className={styles.description}>{article.description}</p>
                    </div>
                </div>
            </Link>
        </div>
    );
};
