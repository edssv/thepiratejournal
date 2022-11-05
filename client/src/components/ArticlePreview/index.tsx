import React from 'react';
import { IoEye, IoHeart } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { convertDateShort } from '../../pages/Article/convertDate';
import { Article, Block } from '../../redux';
import { ButtonBookmark } from '../Buttons/ButtonBookmark';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
    article: Article;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
    const title = article.blocks.find((block: Block) => block.type === 'header')?.data.text;
    const id = article._id;
    const author = article.author.userName;
    const cover = article.cover;
    const timestamp = article.timestamp;
    const viewsCount = article.views.count;
    const likesCount = article.likes.count;

    const date = convertDateShort(timestamp);

    return (
        <div className={styles.root}>
            <div className={styles.top}>
                <Link to={`/articles/${id}`}>
                    <div
                        className={styles.top__img}
                        style={{ backgroundImage: `url(${cover})` }}></div>
                </Link>
                <div className={styles.bookmark__wrapper}>
                    <ButtonBookmark />
                </div>
            </div>
            <div className={styles.bottom}>
                <Link to={`/articles/${id}`}>
                    <div className={styles.headline}>{title ? title : 'Без названия'}</div>
                </Link>
                <Link to={`/users/${author}`}>
                    <div className={`${styles.author} tp-text`}>{author}</div>
                </Link>
                <div className={`${styles.date_and_counts} tp-text`}>
                    <span className={styles.date}>{date}</span>
                    <svg
                        width="1"
                        height="10"
                        viewBox="0 0 1 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <rect width="1" height="10" fill="currentColor" fillOpacity="0.6" />
                    </svg>
                    <div className="icon-center">
                        <IoHeart />
                        <span>{likesCount}</span>
                    </div>
                    <div className="icon-center">
                        <IoEye />
                        <span>{viewsCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
