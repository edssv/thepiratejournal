import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useGetArticleQuery } from '../../redux';
import { AiryArticle } from './AiryArticle';
import { Overlay } from '../../components';
import NotFoundPage from '../NotFound';

const Article: React.FC = () => {
    const { id } = useParams();
    const { isLoading, isFetching, isError } = useGetArticleQuery(id ?? '', {
        refetchOnMountOrArgChange: true,
    });

    if (isLoading || isFetching) return null;
    if (isError) return <NotFoundPage />;

    return (
        <motion.div initial={{ y: 20, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
            <AiryArticle />
        </motion.div>
    );
};

export default Article;
