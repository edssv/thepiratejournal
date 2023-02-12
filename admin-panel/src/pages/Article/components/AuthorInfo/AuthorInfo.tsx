import { useSelector } from 'react-redux';

import { selectArticle } from '../../../../redux';

import styles from './AuthorInfo.module.scss';

export const AuthorInfo = () => {
    const article = useSelector(selectArticle);

    const authorname = article?.author?.username || 'deleted';

    return (
        <div className={styles.root}>
            <div className={styles.authorName}>Автор: {authorname}</div>
        </div>
    );
};
