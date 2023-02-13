import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Article } from '../../../../redux';
import { ArticleStats } from '../../../../components';

import styles from './AiryArticlePreview.module.scss';

interface ArticlePreviewProps {
    article: Article;
}

export const AiryArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
    const location = useLocation();

    return (
        <div className={styles.root}>
            <Link to={`/articles/${article._id}`} state={{ from: location }} className={styles.thumbnail}>
                {' '}
                <div className={styles.thumbContainer}>
                    <div className={styles.thumbImg} style={{ backgroundImage: `url(${article.cover})` }} />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.text}>
                        <div className={styles.avatarAndHeadline}>
                            <div
                                className={styles.headline}
                                dangerouslySetInnerHTML={{ __html: article.title ?? 'Без названия' }}
                            />
                        </div>
                        <div className={styles.nameAndStats}>
                            <span className={`${styles.author} tp-text`}>{article.author.username}</span>
                            <ArticleStats likesCount={article.likes.count} viewsCount={article.views.count} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
