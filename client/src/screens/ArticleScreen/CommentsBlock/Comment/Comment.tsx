import moment from 'moment';
import Link from 'next/link';

import Avatar from '@/components/Avatar/Avatar';
import { ButtonLike } from './ButtonLike';

import styles from './Comment.module.scss';
import { Comment as IComment } from '@/interfaces/comments.interface';

interface CommentProps {
    comment: IComment;
    index: number;
}

export const Comment: React.FC<CommentProps> = ({ comment, index }) => {
    return (
        <></>
        // <div className={styles.root}>
        //     <div className={styles.commentContainer}>
        //         <Link href={`/@${comment?.author?.username}`}>
        //             <Avatar imageSrc={comment?.author?.image} width={40} />
        //         </Link>
        //         <div className={styles.main}>
        //             <div className={styles.commentTextContainer}>
        //                 <div className={styles.commentUserDateWrap}>
        //                     <Link href={`/@${comment?.author?.username}`}>
        //                         <span className={styles.username}>{comment?.author?.username}</span>
        //                     </Link>
        //                     <span className={styles.commentDate}>{moment(comment?.createdAt).fromNow()}</span>
        //                 </div>
        //                 <div className={styles.commentText}>{comment.body}</div>
        //                 {/* <button className={styles.overflowTextButton}></button> */}
        //             </div>
        //             <div className={styles.actionButtons}>
        //                 <div className={styles.likeBlock}>
        //                     <ButtonLike
        //                         commentId={comment?._id}
        //                         isLike={comment.viewer?.isLike}
        //                         index={index}
        //                         color="secondary"
        //                     />
        //                     {comment.likesCount && <span className={styles.buttonText}>{comment.likesCount}</span>}
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};
