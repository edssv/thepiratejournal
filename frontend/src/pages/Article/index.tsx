import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toHtml } from './toHtml';
import {
    useDeleteArticleMutation,
    useGetArticleQuery,
    useLikeMutation,
    useRemoveLikeMutation,
} from '../../redux';

import styles from './Article.module.scss';
import { convertDateLong } from '../../helpers/convertDate';
import { Avatar, Overlay, ArticleStats, ButtonLike } from '../../components';
import {
    ActionButton,
    AlertDialog,
    Button,
    ButtonGroup,
    DialogTrigger,
    Tooltip,
    TooltipTrigger,
    Well,
} from '@adobe/react-spectrum';
import Edit from '@spectrum-icons/workflow/Edit';
import DeleteOutline from '@spectrum-icons/workflow/Delete';
import CircleFilled from '@spectrum-icons/workflow/CircleFilled';
import Heart from '@spectrum-icons/workflow/Heart';
import NotFoundPage from '../NotFoundPage';
import { useAuth, useDocTitle } from '../../hooks';
import { useMediaPredicate } from 'react-media-hook';
import BookmarkSingle from '@spectrum-icons/workflow/BookmarkSingle';
import Reply from '@spectrum-icons/workflow/Reply';

const Article: React.FC = () => {
    const [doctitle, setDocTitle] = useDocTitle('Статья');
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    // media
    const isTablet = useMediaPredicate('(max-width: 990.98px)');
    const fromTablet = useMediaPredicate('(min-width: 768px)');

    const { data, isLoading, isError } = useGetArticleQuery(id);
    const [deleteArticle] = useDeleteArticleMutation();

    const [tippy, setTippy] = useState<boolean>(false);

    if (isLoading) return <Overlay />;
    if (isError) return <NotFoundPage />;

    const fromPage = location?.state?.from?.pathname;

    const userId = user?.id;
    const article = data?.article;
    const author = article?.author;
    const title = article?.title;
    const blocks = article?.blocks;
    const avatar = author?.avatar;
    const authorname = author?.username ? author.username : 'deleted';
    const authorId = author?._id;
    const cover = article?.cover;
    const views = article?.views.count;
    const likes = article?.likes.count;

    const date = convertDateLong(article?.timestamp);

    return (
        <div className={styles.root}>
            <div className={styles.shot_container}>
                <div className={styles.shot_content}>
                    <div className={styles.shot_content_container}>
                        <div className={styles.top}>
                            <div className={styles.top__content}>
                                <Link to={`/users/${authorname}`}>
                                    <Avatar imageSrc={avatar} width={42} />
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
                            {userId === authorId ? (
                                <ButtonGroup>
                                    <TooltipTrigger delay={200}>
                                        <Button
                                            variant="primary"
                                            onPress={() =>
                                                navigate(`/articles/${id}/edit`, {
                                                    state: { from: location },
                                                })
                                            }>
                                            <Edit />
                                        </Button>
                                        <Tooltip>Редактировать</Tooltip>
                                    </TooltipTrigger>
                                    <DialogTrigger>
                                        <Button
                                            style="fill"
                                            marginStart={12}
                                            type="button"
                                            variant="primary">
                                            <DeleteOutline />
                                        </Button>
                                        {(close) => (
                                            <AlertDialog
                                                variant="destructive"
                                                title="Удаление статьи"
                                                primaryActionLabel="Удалить"
                                                onPrimaryAction={() => {
                                                    deleteArticle(id);
                                                    close();
                                                    navigate(fromPage ? fromPage : '/');
                                                }}
                                                cancelLabel="Отмена"
                                                onCancel={close}>
                                                Вы действительно хотите удалить статью?
                                            </AlertDialog>
                                        )}
                                    </DialogTrigger>
                                </ButtonGroup>
                            ) : (
                                isTablet && (
                                    <ButtonGroup UNSAFE_className={styles.controls}>
                                        <TooltipTrigger delay={200}>
                                            <ActionButton isQuiet>
                                                <BookmarkSingle size="XS" />
                                            </ActionButton>
                                            <Tooltip>Сохранить в закладки</Tooltip>
                                        </TooltipTrigger>
                                    </ButtonGroup>
                                )
                            )}
                        </div>

                        <div className={styles.content__wrapper}>
                            <div className={styles.content}>
                                <img src={cover} alt="" />
                                <h2>{article?.title}</h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: toHtml(blocks),
                                    }}
                                    className={styles.content__blocks}></div>
                            </div>
                            {isTablet && (
                                <div className={styles.button}>
                                    <ButtonLike isLiked={data?.isLiked} id={id} />
                                </div>
                            )}
                        </div>
                        <div className={styles.bottomInfo}>
                            <Well
                                role="region"
                                aria-labelledby="wellLabel"
                                UNSAFE_className={styles.well}>
                                <div className={styles.dateAndStats}>
                                    <span className={styles.date}>{date}</span>
                                    <ArticleStats viewsCount={views} likesCount={likes} />
                                </div>
                                <div className={styles.author}>
                                    <Link to={`/users/${authorname}`}>
                                        <Avatar imageSrc={avatar} width={48} />
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
                                            <Avatar imageSrc={avatar} width={40} />
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
                                            <TooltipTrigger delay={200} placement="left">
                                                <Button variant="secondary">
                                                    <BookmarkSingle size="XS" />
                                                </Button>
                                                <Tooltip>Сохранить в закладки</Tooltip>
                                            </TooltipTrigger>
                                            <ButtonLike isLiked={data?.isLiked} id={id} />
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
