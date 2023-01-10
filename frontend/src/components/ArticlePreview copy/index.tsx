import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { convertDateShort } from '../../helpers/convertDate';
import { Article } from '../../redux/services/article';
import { ArticleStats } from '../ArticleStats';
import { Avatar } from '../Avatar';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
    article: Article;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
    const location = useLocation();

    const title = article.title;
    const viewsCount = article.views.count;
    const likesCount = article.likes.count;

    const date = convertDateShort(article.created_on);
    console.log(article);

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
                        style={{ backgroundImage: `url(${article.cover})` }}></div>

                    {/* <div className={styles.bookmark__wrapper}>
                    <ButtonBookmark />
                </div> */}
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.text}>
                        <div className={styles.avatarAndHeadline}>
                            {/* <Avatar imageSrc={article.author.avatar} /> */}
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
