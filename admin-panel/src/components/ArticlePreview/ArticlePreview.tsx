import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

import { Article } from '../../redux';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
    article: Article;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
    const location = useLocation();

    const createdOn = moment(article.createdAt).format('L');

    return (
        <div className={styles.root}>
            <div className={styles.top}>
                <Link to={`/articles/${article._id}`} state={{ from: location }}>
                    <div className={styles.top__img} style={{ backgroundImage: `url(${article.cover})` }}></div>
                </Link>
            </div>
            <div className={styles.bottom}>
                <div className={styles.info}>
                    <Link
                        to={`/articles/${article._id}`}
                        state={{ from: location }}
                        dangerouslySetInnerHTML={{ __html: article?.title ?? 'Без названия' }}
                        className={styles.headline}
                    />
                    <span className={`${styles.author} tp-text`}>{createdOn}</span>
                </div>
            </div>
        </div>
    );
};
