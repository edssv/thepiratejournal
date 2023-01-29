import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MoonLoader } from 'react-spinners';
import { useArticle, useAuth } from '../../../hooks';
import { Avatar, Button } from '../../../components';
import { resizeTextareaHeight, declinationSubstance } from '../../../helpers';
import {
    useAddCommentMutation,
    useGetCommentsQuery,
    useRemoveCommentMutation,
} from '../../../redux';
import { MoreButtonDialog } from './MoreButtonDialog';
import { Comment } from './Comment';

import styles from './CommentsBlock.module.scss';

export const CommentsBlock = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const { article } = useArticle();
    const [textareaValue, setTextareaValue] = useState<string>();
    const [isActiveInput, setIsActiveInput] = useState<boolean>(false);
    const [fetching, setFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const { isLoading: isLoadingComments, isFetching: isFetchingComments } = useGetCommentsQuery({
        id: article._id,
        queryParams: `limit=20&page=${currentPage}`,
    });
    const [addComment, { isLoading }] = useAddCommentMutation();
    const [removeComment, { isLoading: isLoadingRemove }] = useRemoveCommentMutation();

    useEffect(() => {
        if (fetching) {
            setCurrentPage((prevState) => prevState + 1);
        }
    }, [fetching]);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [article.comments?.totalCount]);

    const handleRemoveComment = (item: any, index: number) => {
        removeComment({
            commentId: item.comment._id,
            id: article._id,
            index: index,
        });
    };

    const scrollHandler = (event: any) => {
        if (
            event.target.documentElement.scrollHeight -
                (event.target.documentElement.scrollTop + window.innerHeight) <
                100 &&
            (article.comments.list?.length ?? 0) < (article.comments?.totalCount ?? 1)
        ) {
            setFetching(true);
        }
    };

    const commentsItems = article?.comments?.list?.map((item, index) => (
        <li key={index} className={styles.commentsListItem}>
            <Comment comment={item} index={index} />
            {user?.id === item.author._id && (
                <MoreButtonDialog
                    item={item}
                    index={index}
                    removeComment={() => handleRemoveComment(item, index)}
                />
            )}
        </li>
    ));

    resizeTextareaHeight();

    return (
        <div className={styles.container}>
            <div className={styles.root}>
                <div className={styles.content}>
                    <div className={styles.scrollingContainer}>
                        <div className={styles.contents}>
                            {isLoadingComments ? (
                                <div className={styles.loaderContainer}>
                                    <MoonLoader
                                        size="24px"
                                        speedMultiplier={0.9}
                                        color="var(--md-sys-color-on-surface)"
                                    />
                                </div>
                            ) : (
                                <>
                                    <div className={styles.postContainer}>
                                        {isLoading ? (
                                            <div className="circle-center">
                                                <MoonLoader size="24px" speedMultiplier={0.9} />
                                            </div>
                                        ) : !isActiveInput ? (
                                            <div className={styles.commentPostContainer}>
                                                <div className={styles.userInfo}>
                                                    {user && (
                                                        <Avatar
                                                            width={40}
                                                            imageSrc={user?.avatar}
                                                        />
                                                    )}
                                                </div>
                                                <div className={styles.commentPost}>
                                                    <div className={styles.commentContainer}>
                                                        <textarea
                                                            onClick={() =>
                                                                user
                                                                    ? setIsActiveInput(true)
                                                                    : navigate('/login', {
                                                                          state: { from: location },
                                                                      })
                                                            }
                                                            value={textareaValue}
                                                            onChange={(e) =>
                                                                setTextareaValue(e.target.value)
                                                            }
                                                            placeholder="Введи текст комментария"
                                                            style={{ height: '25px' }}></textarea>
                                                        <div className={styles.buttonGroup}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className={`${styles.commentPostContainer} ${styles.active}`}>
                                                <div className={styles.userInfo}>
                                                    <Avatar width={40} imageSrc={user?.avatar} />
                                                    <span>{user?.username}</span>
                                                </div>
                                                <div className={styles.commentPost}>
                                                    <div className={styles.commentContainer}>
                                                        <textarea
                                                            onClick={() => setIsActiveInput(true)}
                                                            value={textareaValue}
                                                            onChange={(e) =>
                                                                setTextareaValue(e.target.value)
                                                            }
                                                            placeholder="Введи текст комментария"
                                                            style={{ height: '25px' }}></textarea>
                                                        <div className={styles.buttonGroup}>
                                                            <Button
                                                                onClick={() => {
                                                                    setIsActiveInput(false);
                                                                    setTextareaValue('');
                                                                    resizeTextareaHeight();
                                                                }}
                                                                variant="text">
                                                                Отмена
                                                            </Button>
                                                            <Button
                                                                disabled={!textareaValue}
                                                                onClick={() => {
                                                                    addComment({
                                                                        commentText: textareaValue,
                                                                        id: article._id,
                                                                    });
                                                                    setTextareaValue('');
                                                                    setIsActiveInput(false);
                                                                }}
                                                                variant="filledTonal">
                                                                Оставить комментарий
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className={styles.commentsListContainer}>
                                        <ul className={styles.commentsList}>{commentsItems}</ul>
                                    </div>
                                    {isFetchingComments && (
                                        <div className={styles.loaderContainer}>
                                            <MoonLoader
                                                size="24px"
                                                speedMultiplier={0.9}
                                                color="var(--md-sys-color-on-surface)"
                                            />
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
