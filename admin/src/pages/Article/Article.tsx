import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { setArticlePageMode, useGetArticleQuery } from '../../redux';
import { useAppDispatch } from '../../hooks';
import { AiryArticle } from './AiryArticle';
import NotFoundPage from '../NotFound';

interface ArticleProps {
    mode: 'default' | 'blog';
}

const Article: React.FC<ArticleProps> = ({ mode }) => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { isLoading, isFetching, isError } = useGetArticleQuery(
        { id: id ?? '', type: mode === 'blog' ? 'blog' : 'articles' },
        {
            refetchOnMountOrArgChange: true,
        }
    );

    useEffect(() => {
        dispatch(setArticlePageMode(mode));
    }, [mode]);

    if (isLoading || isFetching) return null;
    if (isError) return <NotFoundPage />;

    return (
        <motion.div initial={{ y: 20, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
            <AiryArticle />
        </motion.div>
    );
};

export default Article;
