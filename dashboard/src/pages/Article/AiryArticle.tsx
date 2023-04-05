import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

import { articlePageModeSelector, selectArticle, useDeleteArticleMutation } from '../../redux';
import { useDocTitle } from '../../hooks';
import { Button, ButtonDelete } from '../../components';
import { AuthorInfo, toHtml, BackTopButton } from '.';

import styles from './AiryArticle.module.scss';

export const AiryArticle: React.FC = () => {
    useDocTitle('Статья');
    const article = useSelector(selectArticle);
    const mode = useSelector(articlePageModeSelector);
    const navigate = useNavigate();
    const articleContentRef = useRef<HTMLDivElement>(null);
    const [deleteArticle] = useDeleteArticleMutation();

    const createdOn = moment(article.createdAt).format('L');

    return (
        <article className={styles.root}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.contentContainer}>
                        <div className={styles.actionButtons}>
                            <Button
                                onClick={() =>
                                    navigate(`/${mode === 'blog' ? 'blog' : 'articles'}/${article._id}/edit`)
                                }
                                variant="filled"
                            >
                                Редактировать
                            </Button>
                            <ButtonDelete
                                onPrimaryAction={() => {
                                    deleteArticle({ id: article._id, type: mode === 'blog' ? 'blog' : 'articles' });
                                    navigate('/');
                                }}
                                variant="filledTonal"
                            >
                                Удалить
                            </ButtonDelete>
                        </div>
                        <div className={styles.articleDate}>{createdOn}</div>
                        <header className={styles.top}>
                            <div className={styles.topContent}>
                                <h1 className={styles.articleHeadline}>{article?.title}</h1>
                                <div className={styles.subHeader}>
                                    <p>{article.description}</p>
                                </div>
                            </div>
                        </header>
                        <AuthorInfo />
                        <div className={styles.hero}>
                            <figure>
                                <div className={styles.coverContainer}>
                                    <img
                                        src={article?.cover}
                                        className={styles.articleCover}
                                        alt="Обложка"
                                        loading="lazy"
                                    />
                                </div>
                            </figure>
                        </div>
                        <div className={styles.contentWrapper}>
                            <div ref={articleContentRef} className={styles.articleContent}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: toHtml(article?.blocks),
                                    }}
                                    className={styles.contentBlocks}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <BackTopButton />
        </article>
    );
};
