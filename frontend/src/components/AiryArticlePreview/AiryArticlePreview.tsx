import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Article } from '../../redux';
import { ArticleStats } from '..';

import styles from './AiryArticlePreview.module.scss';

interface ArticlePreviewProps {
    article: Article;
    size?: 'S' | 'M';
}

export const AiryArticlePreview: React.FC<ArticlePreviewProps> = ({ article, size = 'S' }) => {
    const location = useLocation();

    return (
        <div className={`${styles.root} ${size === 'S' ? styles.sizeSmall : styles.sizeMedium}`}>
            <Link to={`/articles/${article._id}`} state={{ from: location }} className={styles.thumbnail}>
                {' '}
                <div className={styles.thumbContainer}>
                    <div className={styles.thumbImg} style={{ backgroundImage: `url(${article.cover})` }} />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.text}>
                        <div
                            className={styles.headline}
                            dangerouslySetInnerHTML={{ __html: article.title ?? 'Без названия' }}
                        />
                        <p className={styles.description}>{article.description}</p>
                        {/* <div className={styles.nameAndStats}>
                            <span className={`${styles.author} tp-text`}>{article.author.username}</span>
                            <ArticleStats likesCount={article.likesCount} viewsCount={article.viewsCount} />
                        </div> */}
                    </div>
                </div>
            </Link>
        </div>
    );
};
