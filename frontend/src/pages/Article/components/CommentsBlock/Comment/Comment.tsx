import moment from 'moment';
import { Comment as CommentInterface } from '../../../../../redux';
import { Avatar } from '../../../../../components';
import { ButtonLike } from './ButtonLike';

import styles from './Comment.module.scss';
import { Link } from 'react-router-dom';

interface CommentProps {
    comment: CommentInterface;
    index: number;
}

export const Comment: React.FC<CommentProps> = ({ comment, index }) => {
    return (
        <div className={styles.root}>
            <div className={styles.commentContainer}>
                <Link to={`/@${comment.author.username}`}>
                    <Avatar imageSrc={comment.author.avatar} width={40} />
                </Link>
                <div className={styles.main}>
                    <div className={styles.commentTextContainer}>
                        <div className={styles.commentUserDateWrap}>
                            <Link to={`/@${comment.author.username}`}>
                                <span className={styles.username}>{comment.author.username}</span>
                            </Link>
                            <span className={styles.commentDate}>{moment(comment.comment.created_on).fromNow()}</span>
                        </div>
                        <div className={styles.commentText}>{comment.comment.text}</div>
                        {/* <button className={styles.overflowTextButton}></button> */}
                    </div>
                    <div className={styles.actionButtons}>
                        <div className={styles.likeBlock}>
                            <ButtonLike
                                commentId={comment.comment._id}
                                isLike={comment.viewer?.isLike}
                                index={index}
                                variant="text"
                                color="var(--md-sys-color-on-surface)"
                            />
                            {comment.comment.likes.count && (
                                <span className={styles.buttonText}>{comment.comment.likes.count}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
