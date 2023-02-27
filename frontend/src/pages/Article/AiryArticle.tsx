import React, { useRef, useState } from 'react';
import { useMediaPredicate } from 'react-media-hook';
import { useSelector } from 'react-redux';
import moment from 'moment';
import 'moment/locale/ru';
import '@fontsource/roboto-mono';

import { selectArticle } from '../../redux';
import { getShowMinutesText } from '../../helpers';
import { useDocTitle } from '../../hooks';
import {
    ActionButtons,
    AuthorInfo,
    CommentsBlock,
    toHtml,
    ScrollControls,
    Sidebar,
    UpNext,
    BackTopButton,
    ShareButtons,
} from '.';

import styles from './AiryArticle.module.scss';

export const AiryArticle: React.FC = () => {
    const article = useSelector(selectArticle);
    useDocTitle(article.title);
    const articleContentRef = useRef<HTMLDivElement>(null);
    const [isOpenSidebar, setOpenSidebar] = useState(false);

    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    const createdOn = moment(article.createdAt).format('L');

    return (
        <article className={styles.root}>
            <div className={styles.container}>
                <div className={`${styles.content} ${isOpenSidebar ? 'open-sidebar' : ''}`}>
                    <div className={styles.contentContainer}>
                        <div className={styles.articleDate}>{createdOn}</div>
                        <header className={styles.top}>
                            <div className={styles.topContent}>
                                <h1 className={styles.articleHeadline}>{article?.title}</h1>
                                <div className={styles.subHeader}>
                                    <div className={styles.readingTime}>
                                        {article.readingTime
                                            ? `${getShowMinutesText(article.readingTime)} чтения`
                                            : 'время чтения не подсчитано'}
                                        {}{' '}
                                    </div>
                                    {!isTablet && <ShareButtons />}
                                </div>
                            </div>
                        </header>
                        <AuthorInfo />
                        {isTablet && <ShareButtons />}
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
                                <AuthorInfo />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ScrollControls setOpenSidebar={setOpenSidebar} />
            <div id="articleBottom" className={styles.bottom}>
                <ActionButtons />
                <UpNext />
            </div>

            <Sidebar isOpenSidebar={isOpenSidebar} setOpenSidebar={setOpenSidebar} title="Комментарии">
                <CommentsBlock />
            </Sidebar>
            <BackTopButton />
        </article>
    );
};
