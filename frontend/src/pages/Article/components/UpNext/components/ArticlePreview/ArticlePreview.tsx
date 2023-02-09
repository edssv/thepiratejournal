import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '@fontsource/roboto-mono';
import { Article, useAddBookmarkMutation, useRemoveBookmarkMutation } from '../../../../../../redux';
import { declinationSubstance } from '../../../../../../helpers';
import { useAuth } from '../../../../../../hooks';
import { ActionDialog, Tippy } from '../../../../../../components';

import styles from './ArticlePreview.module.scss';

interface ArticlePreviewProps {
    article: Article;
}

export const ArticlePreview: React.FC<ArticlePreviewProps> = ({ article }) => {
    const location = useLocation();
    const { user } = useAuth();

    const [isOpen, setIsOpen] = useState(false);

    const [addBookmark] = useAddBookmarkMutation();
    const [removeBookmark] = useRemoveBookmarkMutation();

    const hasBookmark = article?.viewer?.hasBookmark;

    const handleSetBookmark = async () => {
        if (hasBookmark) {
            await removeBookmark(article._id);
        } else {
            await addBookmark(article._id);
        }

        setIsOpen(true);
        setTimeout(() => setIsOpen(false), 3000);
    };

    return (
        <div className={styles.root}>
            <Link to={`/articles/${article._id}`} state={{ from: location }}>
                <div className={styles.thumbContainer}>
                    <div className={styles.thumbImg} style={{ backgroundImage: `url(${article.cover})` }} />
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.text}>
                        <div className={styles.articleCategory}>{article.category.name}</div>
                        <div
                            className={styles.headline}
                            dangerouslySetInnerHTML={{
                                __html: article.title ? article.title : 'Без названия',
                            }}
                        />
                    </div>
                </div>
            </Link>
        </div>
    );
};
