import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { Avatar } from '../../../../components';
import { getShowSubscribersText } from '../../../../helpers';
import { articleDataSelector } from '../../../../redux';

import styles from './AuthorInfo.module.scss';

export const AuthorInfo = () => {
    const article = useSelector(articleDataSelector);

    const authorname = article?.author?.username || 'deleted';

    return (
        <div className={styles.root}>
            <Link to={`/@${authorname}`}>
                <Avatar imageSrc={article?.author?.avatar} width={44} />
            </Link>
            <Link to={`/@${authorname}`}>
                <div className={styles.authorName}>{authorname}</div>
            </Link>
            <span className={styles.subscribersCount}>
                {getShowSubscribersText(article?.author?.subscribersCount ?? 0)}
            </span>
        </div>
    );
};
