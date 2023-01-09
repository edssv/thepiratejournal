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
            <Link to={`/articles/${id}`} state={{ from: location }} className={styles.thumbnail}>
                {' '}
                <div className={styles.thumbContainer}>
                    <div
                        className={styles.thumbImg}
                        style={{ backgroundImage: `url(${cover})` }}></div>

                    {/* <div className={styles.bookmark__wrapper}>
                    <ButtonBookmark />
                </div> */}
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.text}>
                        <div
                            className={styles.headline}
                            dangerouslySetInnerHTML={{ __html: title ? title : 'Без названия' }}
                        />
                        <div className={styles.nameAndStats}>
                            <span className={`${styles.author} tp-text`}>{author}</span>
                            <ArticleStats viewsCount={viewsCount} likesCount={likesCount} />
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};
