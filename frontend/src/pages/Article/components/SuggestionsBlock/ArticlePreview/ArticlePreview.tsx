import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Article, useAddBookmarkMutation, useRemoveBookmarkMutation } from '../../../../../redux';
import { declinationSubstance } from '../../../../../helpers';
import { useAuth } from '../../../../../hooks';
import { Snackbar, Tippy } from '../../../../../components';

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
            <div className={styles.thumbContainer}>
                <Link to={`/articles/${article._id}`} state={{ from: location }} className={styles.thumbnail}>
                    <div className={styles.thumbImg} style={{ backgroundImage: `url(${article.cover})` }}></div>
                </Link>
                <div className={styles.bookmarkBtnContainer}>
                    {!user ? (
                        <Tippy
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                            tooltipPosition=""
                            title={'Добавляй в закладки'}
                            description={'Чтобы добавлять статьи в закладки, войди в аккаунт.'}
                        >
                            <button className={styles.bookmarkBtn}>
                                <span className="material-symbols-outlined">bookmark</span>
                            </button>
                        </Tippy>
                    ) : (
                        <>
                            <button onClick={handleSetBookmark} className={styles.bookmarkBtn}>
                                <span className="material-symbols-outlined">
                                    {hasBookmark ? 'bookmark_added' : 'bookmark'}
                                </span>
                            </button>
                            <Snackbar isOpen={isOpen} onClose={() => setIsOpen(false)}>
                                {hasBookmark ? 'Добавлено в закладки' : 'Удалено из закладок'}
                            </Snackbar>
                        </>
                    )}
                </div>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.text}>
                    <div
                        className={styles.headline}
                        dangerouslySetInnerHTML={{
                            __html: article.title ? article.title : 'Без названия',
                        }}
                    />
                    <span className={styles.author}>{article.author.username}</span>
                    <span className={styles.viewsCount}>{declinationSubstance(article.views.count, 'views')}</span>
                </div>
            </div>
        </div>
    );
};
