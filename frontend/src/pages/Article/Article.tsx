import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { setArticlePageMode, setIsOpenNavRail, useGetArticleQuery, useGetBlogQuery } from '../../redux';
import { useAppDispatch } from '../../hooks';
import { AiryArticle } from './AiryArticle';
import NotFoundPage from '../NotFound';

interface ArticleProps {
    mode: 'default' | 'blog';
}

const Article: React.FC<ArticleProps> = ({ mode }) => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { isLoading, isFetching, isError } = useGetArticleQuery(id ?? '', {
        refetchOnMountOrArgChange: true,
        skip: mode === 'blog',
    });
    const {
        isLoading: isLoadingBlog,
        isFetching: isFetchingBlog,
        isError: isErrorBlog,
    } = useGetBlogQuery(id ?? '', {
        refetchOnMountOrArgChange: true,
        skip: mode === 'default',
    });

    useEffect(() => {
        dispatch(setArticlePageMode(mode));
    }, [mode]);

    useEffect(() => {
        dispatch(setIsOpenNavRail(false));

        return () => {
            dispatch(setIsOpenNavRail(true));
        };
    }, []);

    if (isLoading || isLoadingBlog || isFetching || isFetchingBlog) return null;
    if (isError || isErrorBlog) return <NotFoundPage />;

    return (
        <motion.div initial={{ y: 20, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
            <AiryArticle />
        </motion.div>
    );
};

export default Article;
