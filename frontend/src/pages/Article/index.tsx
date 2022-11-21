import React, { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toHtml } from './toHtml';
import {
    useDeleteArticleMutation,
    useGetArticleQuery,
    useLikeMutation,
    useRemoveLikeMutation,
} from '../../redux';

import styles from './Article.module.scss';
import { convertDateLong } from '../../helpers/convertDate';
import { Avatar, Overlay, TippyBox } from '../../components';
import {
    AlertDialog,
    Button,
    ButtonGroup,
    Content,
    Dialog,
    DialogTrigger,
    Divider,
    Heading,
    Text,
    Tooltip,
    TooltipTrigger,
} from '@adobe/react-spectrum';
import Edit from '@spectrum-icons/workflow/Edit';
import DeleteOutline from '@spectrum-icons/workflow/Delete';
import CircleFilled from '@spectrum-icons/workflow/CircleFilled';
import Heart from '@spectrum-icons/workflow/Heart';
import NotFoundPage from '../NotFoundPage';
import { useAuth, useDocTitle } from '../../hooks';
import { useMediaPredicate } from 'react-media-hook';
import BookmarkSingle from '@spectrum-icons/workflow/BookmarkSingle';

const Article: React.FC = () => {
    const [doctitle, setDocTitle] = useDocTitle('Статья');
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    // media
    const isMobile = useMediaPredicate('(max-width: 767.98px)');
    const fromTablet = useMediaPredicate('(min-width: 768px)');

    const { data, isLoading, isError } = useGetArticleQuery(id);
    const [deleteArticle] = useDeleteArticleMutation();
    const [like] = useLikeMutation();
    const [removeLike] = useRemoveLikeMutation();

    const [isLike, setLike] = useState<boolean>();
    const [tippy, setTippy] = useState<boolean>(false);

    useEffect(() => {
        setLike(data?.isLiked);
    }, [data?.isLiked]);

    if (isLoading) return <Overlay />;
    if (isError) return <NotFoundPage />;

    const handleSetLike = () => {
        like(id);
        setLike(true);
    };

    const handleRemoveLike = () => {
        removeLike(id);
        setLike(false);
    };

    const fromPage = location?.state?.from?.pathname;

    const userId = user?.id;
    const article = data.article;
    const author = article.author;
    const title = article.title;
    const avatar = author.avatar;
    const authorname = author.username ? author.username : 'deleted';
    const authorId = author._id;
    const cover = article.cover;

    const date = convertDateLong(article.timestamp);

    return (
        <div className={styles.root}>
            <div className={styles.shot_container}>
                <div className={styles.shot_content}>
                    <div className={styles.shot_content_container}>
                        <div className={styles.top}>
                            <div className={styles.top__content}>
                                <Link to={`/users/${authorname}`}>
                                    <Avatar imageSrc={avatar} width={48} />
                                </Link>
                                <div className={styles.content__text}>
                                    <h4 className={styles.article_title}>
                                        {title ? title : 'Без названия'}
                                    </h4>
                                    <div className={styles.text__bottom}>
                                        <Link to={`/users/${authorname}`}>
                                            <div className={styles.author_name}>{authorname}</div>
                                        </Link>
                                        <CircleFilled height={3} width={3} margin="0 8px" />
                                        <div className={styles.date}>{date}</div>
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
                                <ButtonGroup UNSAFE_className={styles.bookmarksAndLikes}>
                                    <TooltipTrigger delay={200}>
                                        <Button variant="secondary" style="fill">
                                            <BookmarkSingle />
                                        </Button>
                                        <Tooltip>Сохранить в закладки</Tooltip>
                                    </TooltipTrigger>

                                    {!user ? (
                                        <DialogTrigger type="popover">
                                            <Button
                                                variant={isLike ? 'negative' : !isLike && 'accent'}
                                                style="fill">
                                                <Heart />
                                            </Button>
                                            {(close) => (
                                                <Dialog>
                                                    <Heading>Добавляй в избранное</Heading>
                                                    <Content>
                                                        <p>
                                                            Чтобы добавлять статьи в понравившиеся,
                                                            войди в аккаунт.
                                                        </p>
                                                    </Content>
                                                    <ButtonGroup>
                                                        <Button
                                                            onPress={close}
                                                            variant="secondary"
                                                            staticColor="white">
                                                            Не сейчас
                                                        </Button>
                                                        <Button
                                                            onPress={() =>
                                                                navigate('/login', {
                                                                    state: { from: location },
                                                                })
                                                            }
                                                            variant="accent"
                                                            staticColor="white">
                                                            Войти
                                                        </Button>
                                                    </ButtonGroup>
                                                </Dialog>
                                            )}
                                        </DialogTrigger>
                                    ) : (
                                        <TooltipTrigger delay={200}>
                                            <Button
                                                onPress={isLike ? handleRemoveLike : handleSetLike}
                                                variant={isLike ? 'negative' : !isLike && 'accent'}
                                                style="fill">
                                                <Heart />
                                            </Button>
                                            <Tooltip>Добавить в понравившиеся</Tooltip>
                                        </TooltipTrigger>
                                    )}
                                </ButtonGroup>
                            )}
                        </div>

                        <div className={styles.content__wrapper}>
                            <div className={styles.content}>
                                <img src={article.cover} alt="" />
                                <h2>{article?.title}</h2>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: toHtml(data.article.blocks),
                                    }}
                                    className={styles.content__blocks}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Article;
