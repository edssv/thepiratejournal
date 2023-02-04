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

    const title = article.title;
    const viewsCount = article.views.count;
    const likesCount = article.likes.count;

    return (
        <div className={styles.root}>
            <Link
                to={`/articles/${article._id}`}
                state={{ from: location }}
                className={styles.thumbnail}>
                {' '}
                <div className={styles.thumbContainer}>
                    <div
                        className={styles.thumbImg}
                        style={{ backgroundImage: `url(${article.cover})` }}
                    />
                    {/* <div className={styles.readingTime}>~{article.reading_time} min</div> */}
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.text}>
                        <div className={styles.avatarAndHeadline}>
                            <div
                                className={styles.headline}
                                dangerouslySetInnerHTML={{ __html: title ? title : 'Без названия' }}
                            />
                        </div>
                        <div className={styles.nameAndStats}>
                            <span className={`${styles.author} tp-text`}>
                                {article.author.username}
                            </span>
                            <ArticleStats viewsCount={viewsCount} likesCount={likesCount} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
