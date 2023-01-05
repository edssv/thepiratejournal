import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectArticle, selectMutableArticle } from '../redux';

export const useArticle = () => {
    const article = useSelector(selectArticle);
    const mutableArticle = useSelector(selectMutableArticle);
    const isLike = article?.viewer?.isLike;
    const hasBookmark = article?.viewer?.hasBookmark;

    return useMemo(
        () => ({ article, mutableArticle, isLike, hasBookmark }),
        [article, mutableArticle, isLike, hasBookmark],
    );
};
