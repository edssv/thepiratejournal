import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMediaPredicate } from 'react-media-hook';
import { useDeleteArticleMutation, useGetArticleQuery } from '../../redux';
import { convertDateLong, declinationSubstance } from '../../helpers';
import {
    ButtonBookmark,
    ButtonDelete,
    ButtonLike,
    ButtonShare,
    toHtml,
    ScrollControls,
    StaticControls,
    CommentsBlock,
} from './';
import { useArticle, useAuth, useDocTitle } from '../../hooks';

import { Avatar, Button, Overlay, ButtonFollow } from '../../components';
import NotFoundPage from '../NotFound';

import styles from './Article.module.scss';

const Article: React.FC = () => {
    useDocTitle('Статья');
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // media
    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    const { data, isLoading, isError } = useGetArticleQuery(id, {
        refetchOnMountOrArgChange: true,
    });
    const [deleteArticle] = useDeleteArticleMutation();

    const { article } = useArticle();

    if (isLoading) return <Overlay />;
    if (isError) return <NotFoundPage />;

    const fromPage = location?.state?.from?.pathname;

    const authorname = data?.author.username ?? 'deleted';
    const authorId = data?.author._id;
    const isOwner = user?.id === authorId;

    const date = convertDateLong(data?.created_on);

    return (
        <div className={styles.root}>
            <div className={styles.shot_container}>
                <div className={styles.shot_content}>
                    <div className={styles.shot_content_container}>
                        <div className={styles.top}>
                            <div className={styles.top__content}>
                                <Link to={`/users/${authorname}`}>
                                    <Avatar imageSrc={data?.author.avatar} width={40} />
                                </Link>
                                <div className={styles.text}>
                                    <h4 className={styles.article_title}>
                                        {data?.title ?? 'Без названия'}
                                    </h4>
                                    <div className={styles.authorNameAndDate}>
                                        <Link to={`/users/${authorname}`}>
                                            <div className={styles.authorName}>{authorname}</div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {!isOwner && (
                                <ButtonFollow
                                    configuration={isTablet ? 'icon' : 'iconWithText'}
                                    username={authorname}
                                    hasSubscription={data?.viewer.hasSubscription}></ButtonFollow>
                            )}
                        </div>

                        <div className={styles.content__wrapper}>
                            <div className={styles.content}>
                                <img src={data?.cover} alt="Обложка" loading="lazy" />
                                <h2 className={styles.articleHeadline}>{data?.title}</h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: toHtml(data?.blocks),
                                    }}
                                    className={styles.content__blocks}></div>
                            </div>
                        </div>
                        {!isTablet && (
                            <div className={styles.shot_sidebar}>
                                <div className={styles.shot_controls_wrapper}>
                                    <div className={styles.shot_controls}>
                                        <Link to={`/users/${authorname}`}>
                                            <Avatar imageSrc={data?.author.avatar} width={45} />
                                        </Link>
                                        <div className={styles.buttonGroup}>
                                            <ButtonShare variant="filledTonal" />
                                            <ButtonBookmark variant="filledTonal" />
                                            <ButtonLike variant="filledTonal" />

                                            {isOwner && (
                                                <>
                                                    <Button
                                                        icon
                                                        variant="filledTonal"
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
                                                        icon
                                                        variant="outlined">
                                                        <span className="material-symbols-outlined">
                                                            delete
                                                        </span>
                                                    </ButtonDelete>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.shotOther}>
                    <div className={styles.shotOtherContainer}>
                        <div className={styles.bottom}>
                            <div className={styles.well}>
                                <div className={styles.top}>
                                    <div className={styles.author}>
                                        <Link to={`/users/${authorname}`}>
                                            <Avatar imageSrc={data?.author.avatar} width={42} />
                                        </Link>
                                        <div className={styles.authorInfo}>
                                            <span className={styles.authorName}>{authorname}</span>
                                            <span className={styles.subscribersCount}>
                                                {declinationSubstance(
                                                    article.author.subscribers_count,
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
                                            <span className={styles.date}>{date}</span>
                                        </div>
                                    )}
                                </div>

                                {isTablet && (
                                    <div className={styles.dateAndStats}>
                                        <span>
                                            {declinationSubstance(article?.views.count, 'views')}
                                        </span>
                                        <span className={styles.date}>{date}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {isTablet && (
                            <>
                                <ScrollControls
                                    hasBookmark={data?.viewer.hasBookmark}
                                    isOwner={isOwner}
                                />
                            </>
                        )}

                        <CommentsBlock />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;
