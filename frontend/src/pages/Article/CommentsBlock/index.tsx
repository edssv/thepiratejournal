import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';
import { MoonLoader } from 'react-spinners';
import { useArticle, useAuth } from '../../../hooks';
import { Avatar, Button } from '../../../components';
import { resizeTextareaHeight, declinationSubstance } from '../../../helpers';
import { useAddCommentMutation, useRemoveCommentMutation } from '../../../redux';
import { MoreButtonDialog } from './MoreButtonDialog';

import styles from './CommentsBlock.module.scss';

export const CommentsBlock = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useAuth();
    const { article } = useArticle();

    const [textareaValue, setTextareaValue] = useState<string>();
    const [isActiveInput, setIsActiveInput] = useState<boolean>(false);

    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return function () {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    const [addComment, { isLoading }] = useAddCommentMutation();
    const [removeComment, { isLoading: isLoadingRemove }] = useRemoveCommentMutation();

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
            100
        ) {
            return;
        }
    };

    const commentsItems = article.comments.map((item, index) => (
        <li key={index} className={styles.commentsListItem}>
            <div className={styles.commentContainer}>
                <Avatar imageSrc={item.author.avatar} width={40} />
                <div className={styles.commentTextContainer}>
                    <div className={styles.commentUserDateWrap}>
                        <span className={styles.username}>{item.author.username}</span>
                        <span className={styles.commentDate}>
                            {moment(item.comment.created_on).fromNow()}
                        </span>
                    </div>
                    <div className={styles.commentText}>{item.comment.text}</div>
                    <button className={styles.overflowTextButton}></button>
                </div>
            </div>
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
        <div className={styles.root}>
            <div className={styles.top}>
                <span className="material-symbols-outlined">chat</span>{' '}
                {declinationSubstance(article.comments.length, 'comments')}
            </div>
            <div className={styles.postContainer}>
                {isLoading ? (
                    <div className="circle-center">
                        <MoonLoader size="24px" speedMultiplier={0.9} />
                    </div>
                ) : !isActiveInput ? (
                    <div className={styles.commentPostContainer}>
                        <div className={styles.userInfo}>
                            {user && <Avatar width={40} imageSrc={user?.avatar} />}
                        </div>
                        <div className={styles.commentPost}>
                            <div className={styles.commentContainer}>
                                <textarea
                                    onClick={() =>
                                        user
                                            ? setIsActiveInput(true)
                                            : navigate('/login', { state: { from: location } })
                                    }
                                    value={textareaValue}
                                    onChange={(e) => setTextareaValue(e.target.value)}
                                    placeholder="Введи текст комментария"
                                    style={{ height: '25px' }}></textarea>
                                <div className={styles.buttonGroup}></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={`${styles.commentPostContainer} ${styles.active}`}>
                        <div className={styles.userInfo}>
                            <Avatar width={40} imageSrc={user?.avatar} />
                            <span>{user?.username}</span>
                        </div>
                        <div className={styles.commentPost}>
                            <div className={styles.commentContainer}>
                                <textarea
                                    onClick={() => setIsActiveInput(true)}
                                    value={textareaValue}
                                    onChange={(e) => setTextareaValue(e.target.value)}
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
        </div>
    );
};
