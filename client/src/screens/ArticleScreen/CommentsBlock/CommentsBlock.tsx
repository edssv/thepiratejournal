import { useCallback, useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';

import { useAuth } from '@/hooks';
import { resizeTextareaHeight } from '@/helpers';
import { articleDataSelector, commentsSelector } from '@/store';
import { MoreButtonDialog } from './MoreButtonDialog';
import { Comment } from './Comment';

import styles from './CommentsBlock.module.scss';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Avatar from '@/components/Avatar/Avatar';
import Button from '@/components/common/Button/Button';

export const CommentsBlock = () => {
    const { push } = useRouter();
    const { user } = useAuth();
    const article = useSelector(articleDataSelector);
    const comments = useSelector(commentsSelector);
    const [textareaValue, setTextareaValue] = useState<string>();
    const [isActiveInput, setIsActiveInput] = useState<boolean>(false);
    const [fetching, setFetching] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    // const { isLoading: isLoadingComments, isFetching: isFetchingComments } = useGetCommentsQuery({
    //     id: article._id,
    //     queryParams: `limit=20&page=${currentPage}`,
    // });
    // const [addComment, { isLoading }] = useAddCommentMutation();
    // const [removeComment] = useRemoveCommentMutation();

    useEffect(() => {
        if (fetching) {
            setCurrentPage((prevState) => prevState + 1);
        }
    }, [fetching]);

    const scrollHandler = useCallback(
        (event: any) => {
            if (
                event.target.documentElement.scrollHeight -
                    (event.target.documentElement.scrollTop + window.innerHeight) <
                    100 &&
                (comments?.commentsList?.length ?? 0) < (comments?.totalCount ?? 1)
            ) {
                setFetching(true);
            }
        },
        [article]
    );

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);

        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [comments?.totalCount, scrollHandler]);

    const handleRemoveComment = (item: any, index: number) => {
        // removeComment({
        //     commentId: item._id,
        //     id: article._id,
        //     index: index,
        // });
    };

    const commentsItems = comments?.commentsList?.map((item: any, index: number) => (
        <li key={index} className={styles.commentsListItem}>
            <Comment comment={item} index={index} />
            {user?.id === item.userId && (
                <MoreButtonDialog item={item} index={index} removeComment={() => handleRemoveComment(item, index)} />
            )}
        </li>
    ));

    resizeTextareaHeight();

    return (
        <div className={styles.container}>
            {/* <div className={styles.root}>
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
                                                    {user && <Avatar width={40} imageSrc={user?.image} />}
                                                </div>
                                                <div className={styles.commentPost}>
                                                    <div className={styles.commentContainer}>
                                                        <textarea
                                                            onClick={() =>
                                                                user ? setIsActiveInput(true) : push('/login')
                                                            }
                                                            value={textareaValue}
                                                            onChange={(e) => setTextareaValue(e.target.value)}
                                                            placeholder="Введи текст комментария"
                                                            style={{ height: '25px' }}
                                                        ></textarea>
                                                        <div className={styles.buttonGroup}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={`${styles.commentPostContainer} ${styles.active}`}>
                                                <div className={styles.userInfo}>
                                                    <Avatar width={40} imageSrc={user?.image} />
                                                    <span>{user?.username}</span>
                                                </div>
                                                <div className={styles.commentPost}>
                                                    <div className={styles.commentContainer}>
                                                        <textarea
                                                            onClick={() => setIsActiveInput(true)}
                                                            value={textareaValue}
                                                            onChange={(e) => setTextareaValue(e.target.value)}
                                                            placeholder="Введи текст комментария"
                                                            style={{ height: '25px' }}
                                                        ></textarea>
                                                        <div className={styles.buttonGroup}>
                                                            <Button
                                                                onClick={() => {
                                                                    setIsActiveInput(false);
                                                                    setTextareaValue('');
                                                                    resizeTextareaHeight();
                                                                }}
                                                                variant="text"
                                                            >
                                                                Отмена
                                                            </Button>
                                                            <Button
                                                                disabled={!textareaValue}
                                                                onClick={() => {
                                                                    addComment({
                                                                        body: textareaValue,
                                                                        id: article._id,
                                                                    });
                                                                    setTextareaValue('');
                                                                    setIsActiveInput(false);
                                                                }}
                                                                variant="filledTonal"
                                                            >
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
            </div> */}
        </div>
    );
};
