import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { convertDateShort } from '../../helpers/convertDate';
import { Article } from '../../redux/services/article';
import { ArticleStats } from '../ArticleStats';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
    article: Article;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
    const location = useLocation();

    const title = article.title;
    const id = article._id;
    const author = article.author.username;
    const cover = article.cover;
    const timestamp = article.created_on;
    const viewsCount = article.views.count;
    const likesCount = article.likes.count;

    const date = convertDateShort(timestamp);

    return (
        <div className={styles.root}>
            <div className={styles.top}>
                <Link to={`/articles/${id}`} state={{ from: location }}>
                    <div
                        className={styles.top__img}
                        style={{ backgroundImage: `url(${cover})` }}></div>
                </Link>
                {/* <div className={styles.bookmark__wrapper}>
                    <ButtonBookmark />
                </div> */}
            </div>
            <div className={styles.bottom}>
                <div className={styles.info}>
                    <Link
                        to={`/articles/${id}`}
                        state={{ from: location }}
                        dangerouslySetInnerHTML={{ __html: title ? title : 'Без названия' }}
                        className={styles.headline}></Link>
                    <Link to={`/users/${author}`} className={`${styles.author} tp-text`}>
                        {author}
                    </Link>
                </div>
                <ArticleStats viewsCount={viewsCount} likesCount={likesCount} />
            </div>
        </div>
    );
};
