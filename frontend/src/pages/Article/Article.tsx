import React, { useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import { useDeleteArticleMutation, useGetArticleQuery } from '../../redux';
import { convertDateLong, declinationSubstance } from '../../helpers';
import { useArticle, useAuth, useDocTitle } from '../../hooks';
import { Avatar, Button, Overlay, ButtonFollow } from '../../components';
import {
    ButtonBookmark,
    ButtonDelete,
    ButtonLike,
    toHtml,
    ScrollControls,
    StaticControls,
    Sidebar,
    PrimarySuggestionsBlock,
    CommentsBlock,
    TableOfContents,
} from './';

import NotFoundPage from '../NotFound';

import styles from './Article.module.scss';

const Article: React.FC = () => {
    useDocTitle('Статья');
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const articleContentRef = useRef<HTMLDivElement>(null);
    const [isOpenSidebar, setOpenSidebar] = useState(false);

    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    const { data, isLoading, isError } = useGetArticleQuery(id ?? '', {
        refetchOnMountOrArgChange: true,
    });
    const [deleteArticle] = useDeleteArticleMutation();

    const { article } = useArticle();

    if (isLoading) return <Overlay />;
    if (isError) return <NotFoundPage />;

    const fromPage = location?.state?.from?.pathname;

    const authorname = data?.author?.username || 'deleted';
    const authorId = data?.author?._id || 'deleted';
    const avatarSrc = data?.author?.avatar;
    const isOwner = user?.id === authorId;
    const isAdmin = user?.role === 'Admin';

    const date = convertDateLong(data?.created_on);

    return (
        <div className={styles.root}>
            <div className={styles.shot_container}>
                <div className={styles.shot_content}>
                    <div className={styles.shot_content_container}>
                        <div className={styles.top}>
                            <div className={styles.top__content}>
                                <Link to={`/users/${authorname}`}>
                                    <Avatar imageSrc={avatarSrc} width={48} />
                                </Link>
                                <div className={styles.text}>
                                    <Link to={`/users/${authorname}`}>
                                        <div className={styles.authorName}>{authorname}</div>
                                    </Link>
                                    <span className={styles.readingTime}>
                                        {declinationSubstance(article.reading_time, 'minutes')}{' '}
                                        чтения
                                    </span>
                                </div>
                            </div>

                            <div className={styles.shot_controls}>
                                <div className={styles.buttonGroup}>
                                    {!isOwner && <ButtonBookmark />}
                                    {!isOwner && isTablet && (
                                        <ButtonFollow
                                            configuration="icon"
                                            username={authorname}
                                            hasSubscription={data?.viewer.hasSubscription}
                                        />
                                    )}
                                    {!isTablet && <ButtonLike />}
                                    {(isOwner || isAdmin) && (
                                        <>
                                            <Button
                                                icon
                                                onClick={() =>
                                                    navigate(`/articles/${id}/edit`, {
                                                        state: { from: location },
                                                    })
                                                }>
                                                <span className="material-symbols-outlined">
                                                    edit
                                                </span>
                                            </Button>

                                            <ButtonDelete
                                                onPrimaryAction={() => {
                                                    deleteArticle(id);
                                                    navigate(fromPage ? fromPage : '/');
                                                }}
                                                icon>
                                                <span className="material-symbols-outlined">
                                                    delete
                                                </span>
                                            </ButtonDelete>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.content__wrapper}>
                            <div ref={articleContentRef} className={styles.content}>
                                <img src={data?.cover} alt="Обложка" loading="lazy" />
                                <h1 className={styles.articleHeadline}>{data?.title}</h1>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: toHtml(data?.blocks),
                                    }}
                                    className={styles.content__blocks}></div>
                            </div>
                        </div>
                        <div id="articleBottom" className={styles.shotOther}>
                            <div className={styles.shotOtherContainer}>
                                <div className={styles.commentsAndSuggestions}>
                                    <div className={styles.articleInfoAndComments}>
                                        <div className={styles.bottom}>
                                            <div className={styles.well}>
                                                <div className={styles.top}>
                                                    <div className={styles.author}>
                                                        <Link to={`/users/${authorname}`}>
                                                            <Avatar
                                                                imageSrc={data?.author.avatar}
                                                                width={42}
                                                            />
                                                        </Link>
                                                        <div className={styles.authorInfo}>
                                                            <span className={styles.authorName}>
                                                                {authorname}
                                                            </span>
                                                            <span
                                                                className={styles.subscribersCount}>
                                                                {declinationSubstance(
                                                                    article.author
                                                                        .subscribers_count,
                                                                    'subscribers',
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {isTablet ? (
                                                        <StaticControls isOwner={isOwner} />
                                                    ) : (
                                                        <div className={styles.dateAndStats}>
                                                            <span>
                                                                {declinationSubstance(
                                                                    article?.views.count,
                                                                    'views',
                                                                )}
                                                            </span>
                                                            <span className={styles.date}>
                                                                {date}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>

                                                {isTablet && (
                                                    <div className={styles.dateAndStats}>
                                                        <span>
                                                            {declinationSubstance(
                                                                article?.views.count,
                                                                'views',
                                                            )}
                                                        </span>
                                                        <span className={styles.date}>{date}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    {isTablet && <PrimarySuggestionsBlock />}
                                </div>
                            </div>
                        </div>
                        <ScrollControls setOpenSidebar={setOpenSidebar} />
                    </div>
                    {!isTablet && (
                        <div className={styles.authorPanelContainer}>
                            <div className={styles.authorPanel}>
                                <div className={styles.authorInfo}>
                                    <Avatar imageSrc={data?.author.avatar} width={80} />
                                    <span className={styles.authorName}>
                                        {data?.author.username}
                                    </span>
                                    <span className={styles.subscribersCount}>
                                        {declinationSubstance(
                                            article.author.subscribers_count,
                                            'subscribers',
                                        )}
                                    </span>
                                    <div className={styles.actionButtons}>
                                        {!isOwner && (
                                            <ButtonFollow
                                                configuration="iconWithText"
                                                username={data?.author.username}
                                                hasSubscription={data?.viewer.hasSubscription}
                                            />
                                        )}
                                    </div>
                                </div>
                                {!isTablet && (
                                    <>
                                        <TableOfContents />
                                        <PrimarySuggestionsBlock />
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Sidebar
                isOpenSidebar={isOpenSidebar}
                setOpenSidebar={setOpenSidebar}
                title={`Комментарии (${article.comments.totalCount})`}>
                <CommentsBlock />
            </Sidebar>
        </div>
    );
};

export default Article;
