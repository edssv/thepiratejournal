import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';

import { selectArticle, useDeleteArticleMutation } from '../../redux';
import { declinationSubstance } from '../../helpers';
import { useDocTitle } from '../../hooks';
import { Button, ButtonDelete } from '../../components';
import { AuthorInfo, toHtml, BackTopButton } from '.';

import styles from './AiryArticle.module.scss';

export const AiryArticle: React.FC = () => {
    useDocTitle('Статья');
    const article = useSelector(selectArticle);
    const navigate = useNavigate();
    const articleContentRef = useRef<HTMLDivElement>(null);
    const [deleteArticle] = useDeleteArticleMutation();

    const createdOn = moment(article.created_on).format('L');

    return (
        <article className={styles.root}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.contentContainer}>
                        <div className={styles.actionButtons}>
                            <Button onClick={() => navigate(`/articles/${article._id}/edit`)} variant="filled">
                                Редактировать
                            </Button>
                            <ButtonDelete
                                onPrimaryAction={() => {
                                    deleteArticle(article._id);
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
                                    <div className={styles.readingTime}>
                                        {article.reading_time
                                            ? `${declinationSubstance(article.reading_time, 'minutes')} чтения`
                                            : 'время чтения не подсчитано'}
                                        {}{' '}
                                    </div>
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
