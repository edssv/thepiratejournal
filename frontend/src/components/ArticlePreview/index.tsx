import CircleFilled from '@spectrum-icons/workflow/CircleFilled';
import React from 'react';
import { IoEye, IoHeart } from 'react-icons/io5';

import { Link, useLocation } from 'react-router-dom';
import { convertDateShort } from '../../helpers/convertDate';
import { Article } from '../../redux';

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
    const timestamp = article.timestamp;
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
                <div className={styles.stats}>
                    <span className="icon-center">
                        <IoHeart />
                        <span>{likesCount}</span>
                    </span>
                    <span className="icon-center">
                        <IoEye />
                        <span>{viewsCount}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};
