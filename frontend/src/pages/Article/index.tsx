import React from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toHtml } from './toHtml';
import { useDeleteArticleMutation, useGetArticleQuery } from '../../redux';

import styles from './Article.module.scss';
import { convertDateLong } from '../../helpers/convertDate';
import { Avatar } from '../../components/Avatar';
import {
    ActionButton,
    AlertDialog,
    Button,
    ButtonGroup,
    Content,
    Dialog,
    DialogTrigger,
    Divider,
    Heading,
    ProgressCircle,
    Text,
} from '@adobe/react-spectrum';
import Edit from '@spectrum-icons/workflow/Edit';
import DeleteOutline from '@spectrum-icons/workflow/Delete';
import Alert from '@spectrum-icons/workflow/Alert';
import CircleFilled from '@spectrum-icons/workflow/CircleFilled';
import Heart from '@spectrum-icons/workflow/Heart';

import NotFoundPage from '../NotFoundPage';
import { useAuth } from '../../hooks/useAuth';
import { useDocTitle } from '../../hooks/useDocTitle';
import { useMediaPredicate } from 'react-media-hook';
import Bookmark from '@spectrum-icons/workflow/Bookmark';
import BookmarkSingle from '@spectrum-icons/workflow/BookmarkSingle';

const Article: React.FC = () => {
    const [doctitle, setDocTitle] = useDocTitle('Статья');
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const auth = useAuth();
    // media
    const isMobile = useMediaPredicate('(max-width: 767.98px)');
    const fromTablet = useMediaPredicate('(min-width: 768px)');

    const { data, isLoading, isError, isSuccess, isFetching } = useGetArticleQuery(id);
    const [deleteArticle] = useDeleteArticleMutation();

    if (isFetching) return <></>;
    if (isLoading) return <></>;
    if (isError) return <NotFoundPage />;

    const fromPage = location?.state?.from?.pathname;

    const userId = auth.user?.id;

    const article = data.article;
    const avatar = data.user?.avatar;
    const author = data.user?.username ? data.user?.username : 'deleted';
    const authorId = article.author._id;
    const cover = article.cover;

    const date = convertDateLong(article.timestamp);

    return (
        <div className={styles.root}>
            <div className={styles.shot_container}>
                <div className={styles.shot_content}>
                    <div className={styles.shot_content_container}>
                        <div className={styles.top}>
                            <div className={styles.top__content}>
                                <Link to={`/users/${author}`}>
                                    <Avatar imageSrc={avatar} width={48} />
                                </Link>
                                <div className={styles.content__text}>
                                    <h4 className={styles.article_title}>{article?.title}</h4>
                                    <div className={styles.text__bottom}>
                                        <Link to={`/users/${author}`}>
                                            <div className={styles.author_name}>{author}</div>
                                        </Link>
                                        <CircleFilled height={3} width={3} margin="0 8px" />
                                        <div className={styles.date}>{date}</div>
                                    </div>
                                </div>
                            </div>
                            {userId === authorId ? (
                                <ButtonGroup>
                                    <Button
                                        isQuiet
                                        variant="primary"
                                        onPress={() =>
                                            navigate(`/articles/${id}/edit`, {
                                                state: { from: location },
                                            })
                                        }>
                                        <Edit />
                                    </Button>
                                    <DialogTrigger>
                                        <Button
                                            isQuiet
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
                                <ButtonGroup>
                                    <Button variant="primary">
                                        <BookmarkSingle />
                                    </Button>
                                    <Button variant="cta">
                                        <Heart />
                                    </Button>
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
