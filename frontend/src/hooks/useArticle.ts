import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectArticle } from '../redux';

export const useArticle = () => {
    const article = useSelector(selectArticle);
    const isLike = article?.viewer?.isLike;
    const hasBookmark = article?.viewer?.hasBookmark;

    return useMemo(() => ({ article, isLike, hasBookmark }), [article, isLike, hasBookmark]);
};
