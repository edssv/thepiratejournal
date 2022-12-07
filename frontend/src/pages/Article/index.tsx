import React from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDeleteArticleMutation, useGetArticleQuery } from '../../redux';
import { convertDateLong } from '../../helpers';
import { toHtml } from './toHtml';
import { useAuth, useDocTitle } from '../../hooks';
import { useMediaPredicate } from 'react-media-hook';
import {
    Avatar,
    Overlay,
    ArticleStats,
    ButtonLike,
    ButtonDelete,
    ButtonFollow,
    ButtonBookmark,
} from '../../components';
import { Button, ButtonGroup, Divider, Tooltip, TooltipTrigger, Well } from '@adobe/react-spectrum';

// icons
import BookmarkSingle from '@spectrum-icons/workflow/BookmarkSingle';
import Edit from '@spectrum-icons/workflow/Edit';
import Reply from '@spectrum-icons/workflow/Reply';

import styles from './Article.module.scss';
import Delete from '@spectrum-icons/workflow/Delete';
import { ScrollControls } from './ScrollControls';
import { StaticControls } from './StaticControls';
import NotFoundPage from '../NotFound';

const Article: React.FC = () => {
    useDocTitle('Статья');
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    // media
    const isTablet = useMediaPredicate('(max-width: 990.98px)');

    const { data, isLoading, isError } = useGetArticleQuery(id);
    const [deleteArticle] = useDeleteArticleMutation();

    if (isLoading) return <Overlay />;
    if (isError) return <NotFoundPage />;

    const fromPage = location?.state?.from?.pathname;

    const title = data?.title;
    const authorname = data?.author.username ? data?.author.username : 'deleted';
    const authorId = data?.author._id;
    const isOwner = user?.id === authorId;

    const date = convertDateLong(data?.timestamp);

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
                                        {title ? title : 'Без названия'}
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
                                    username={authorname}
                                    hasSubscription={data?.viewer.hasSubscription}></ButtonFollow>
                            )}
                        </div>

                        <div className={styles.content__wrapper}>
                            <div className={styles.content}>
                                <img src={data?.cover} alt="Обложка" loading="lazy" />
                                <h2>{data?.title}</h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: toHtml(data?.blocks),
                                    }}
                                    className={styles.content__blocks}></div>
                            </div>
                            {isTablet && (
                                <>
                                    <ScrollControls
                                        articleId={id}
                                        isLiked={data?.viewer.isLike}
                                        isOwner={isOwner}
                                    />
                                    <StaticControls
                                        articleId={id}
                                        isLiked={data?.viewer.isLike}
                                        isOwner={isOwner}
                                    />
                                </>
                            )}
                        </div>
                        <div className={styles.bottomInfo}>
                            <Well
                                role="region"
                                aria-labelledby="wellLabel"
                                UNSAFE_className={styles.well}>
                                <div className={styles.dateAndStats}>
                                    <span className={styles.date}>{date}</span>
                                    <ArticleStats
                                        viewsCount={data?.views.count}
                                        likesCount={data?.likes.count}
                                    />
                                </div>
                                <div className={styles.author}>
                                    <Link to={`/users/${authorname}`}>
                                        <Avatar imageSrc={data?.author.avatar} width={48} />
                                    </Link>
                                    <span className={styles.authorName}>{authorname}</span>
                                </div>
                            </Well>
                        </div>
                        {!isTablet && (
                            <div className={styles.shot_sidebar}>
                                <div className={styles.shot_controls_wrapper}>
                                    <div className={styles.shot_controls}>
                                        <Link to={`/users/${authorname}`}>
                                            <Avatar imageSrc={data?.author.avatar} width={45} />
                                        </Link>
                                        <ButtonGroup
                                            orientation="vertical"
                                            UNSAFE_className={styles.buttonGroup}>
                                            <TooltipTrigger delay={200} placement="left">
                                                <Button variant="secondary">
                                                    <Reply />
                                                </Button>
                                                <Tooltip>Поделиться</Tooltip>
                                            </TooltipTrigger>
                                            <ButtonBookmark
                                                hasBookmark={data?.viewer.hasBookmark}
                                                id={id}
                                                tooltipPosition="left"
                                            />
                                            <ButtonLike
                                                isLiked={data?.viewer.isLike}
                                                id={id}
                                                tooltipPosition="left"
                                            />

                                            {isOwner && (
                                                <>
                                                    <Divider size="S" margin="16px 0px" />
                                                    <TooltipTrigger delay={200} placement="left">
                                                        <Button
                                                            variant="secondary"
                                                            onPress={() =>
                                                                navigate(`/articles/${id}/edit`, {
                                                                    state: { from: location },
                                                                })
                                                            }>
                                                            <Edit />
                                                        </Button>
                                                        <Tooltip>Редактировать</Tooltip>
                                                    </TooltipTrigger>
                                                    <ButtonDelete
                                                        onPrimaryAction={() => {
                                                            deleteArticle(id);
                                                            navigate(fromPage ? fromPage : '/');
                                                        }}
                                                        variant="secondary">
                                                        <Delete />
                                                    </ButtonDelete>
                                                </>
                                            )}
                                        </ButtonGroup>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;
