import { useSelector } from 'react-redux';
import Link from 'next/link';

import Avatar from '@/components/Avatar/Avatar';
import { getShowSubscribersText } from '@/helpers';
import { articleDataSelector } from '@/store';

import styles from './AuthorInfo.module.scss';

export const AuthorInfo = () => {
    const article = useSelector(articleDataSelector);

    const authorname = article?.author?.username || 'deleted';

    return (
        <div className={styles.root}>
            <Link href={`/@${authorname}`}>
                <Avatar imageSrc={article?.author?.image} width={44} />
            </Link>
            <Link href={`/@${authorname}`}>
                <div className={styles.authorName}>{authorname}</div>
            </Link>
            <span className={styles.subscribersCount}>
                {getShowSubscribersText(article?.author?.subscribersCount ?? 0)}
            </span>
        </div>
    );
};
