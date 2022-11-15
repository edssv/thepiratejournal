import React, { useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toHtml } from './toHtml';
import { BtnLeftFixed } from '../../components/Buttons/BtnLeftFixed';
import { ButtonClose } from '../../components/Buttons/ButtonClose';
import { useDeleteArticleMutation, useGetArticleQuery } from '../../redux';

import styles from './Article.module.scss';
import { convertDateLong } from './convertDate';
import { Avatar } from '../../components/Avatar';
import {
    ActionButton,
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

import NotFoundPage from '../NotFoundPage';
import { useAuth } from '../../hooks/useAuth';
import { useDocTitle } from '../../hooks/useDocTitle';

const Article: React.FC = () => {
    const [doctitle, setDocTitle] = useDocTitle('Статья');
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();
    const auth = useAuth();

    const { data, isLoading, isError, isSuccess, isFetching } = useGetArticleQuery(id);
    const [deleteArticle] = useDeleteArticleMutation();

    if (isFetching) {
        return <></>;
    }
    if (isLoading) {
        return <></>;
    }

    if (isError) {
        return <NotFoundPage />;
    }

    const fromPage = location?.state?.from?.pathname;

    const userId = auth.user?.id;

    const article = data.article;
    const avatar = data.user?.avatar;
    const title = article.title;
    const author = data.user?.username ? data.user?.username : 'deleted';
    const authorId = article.author._id;
    const cover = article.cover;
    const timestamp = article.timestamp;
    const viewsCount = article.views.count;
    const likesCount = article.likes.count;

    const date = convertDateLong(timestamp);

    return (
        <div className={styles.root}>
            {fromPage && <BtnLeftFixed />}
            <div className="container-720">
                <div className={styles.top}>
                    <div className={styles.top__content}>
                        <Link to={`/users/${author}`}>
                            <Avatar imageSrc={avatar} width={42} />
                        </Link>
                        <div className={styles.content__text}>
                            <Link to={`/users/${author}`}>
                                <div className={styles.headline}>{author}</div>
                            </Link>
                            <div className={`${styles.date} tp-text`}>{date}</div>
                        </div>
                    </div>
                    {userId === authorId && (
                        <ButtonGroup>
                            <Button
                                isQuiet
                                variant="primary"
                                onPress={() =>
                                    navigate(`/articles/${id}/edit`, { state: { from: location } })
                                }>
                                <Edit />
                            </Button>
                            <DialogTrigger>
                                <Button isQuiet marginStart={12} type="button" variant="primary">
                                    <DeleteOutline />
                                </Button>
                                {(close) => (
                                    <Dialog>
                                        <Heading>
                                            <Alert
                                                size="S"
                                                aria-label="Negative Alert"
                                                color="negative"
                                            />{' '}
                                            <Text marginStart={6}>Удаление статьи</Text>
                                        </Heading>
                                        <Divider />
                                        <Content>Вы действительно хотите удалить статью?</Content>
                                        <ButtonGroup>
                                            <Button variant="secondary" onPress={close}>
                                                Отмена
                                            </Button>
                                            <Button
                                                variant="negative"
                                                onPress={() => {
                                                    deleteArticle(id);
                                                    close();
                                                    navigate(fromPage ? fromPage : '/');
                                                }}>
                                                Удалить
                                            </Button>
                                        </ButtonGroup>
                                    </Dialog>
                                )}
                            </DialogTrigger>
                        </ButtonGroup>
                    )}
                    {/* <ButtonLike /> */}
                </div>
                <ButtonClose location={fromPage} />
                <div className={styles.content}>
                    <h2>{title}</h2>
                    <div
                        dangerouslySetInnerHTML={{ __html: toHtml(data.article.blocks) }}
                        className={styles.content__blocks}></div>
                </div>
            </div>
        </div>
    );
};

export default Article;
