import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import '@fontsource/roboto-mono';

import { Blog } from '../../../redux';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
    data: Blog;
    featured?: boolean;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ data, featured = false }) => {
    const TitleTag = featured ? 'h1' : 'h2';
    const createdAt = moment(data?.createdAt).format('DD.MM.YY');

    return (
        <div className={`${styles.root} ${featured ? styles.featured : ''}`}>
            <Link to={data?._id}>
                <div className={styles.article}>
                    <div className={styles.articleContent}>
                        <TitleTag className={styles.title}>{data?.title}</TitleTag>
                        <div className={styles.subcontent}>
                            <div className={styles.date}>{createdAt}</div>
                            <div className={styles.description}>
                                <p>{data?.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.articleImage}>
                        <img src={data?.cover} alt="Обложка" />
                    </div>
                </div>
            </Link>
        </div>
    );
};
