import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { articleDataSelector, viewerSelector } from '@/store';

export const useArticle = () => {
    const article = useSelector(articleDataSelector);
    const { isLike, hasBookmark } = useSelector(viewerSelector);

    return useMemo(() => ({ article, isLike, hasBookmark }), [article, isLike, hasBookmark]);
};
