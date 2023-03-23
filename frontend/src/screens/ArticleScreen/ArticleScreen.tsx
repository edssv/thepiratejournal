import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

import { setArticlePageMode, setIsOpenNavRail, useGetArticleQuery, useGetBlogQuery } from '@/store';
import { useAppDispatch } from '@/hooks';
import { AiryArticle } from './AiryArticle';
import NotFoundScreen from '../NotFoundScreen/NotFoundScreen';

interface ArticleProps {
    mode: 'default' | 'blog';
}

const Article: React.FC<ArticleProps> = ({ mode }) => {
    const { pathname, query } = useRouter();
    console.log(query);
    const dispatch = useAppDispatch();
    const { isLoading, isFetching, isError } = useGetArticleQuery(query.id?.toString() ?? '', {
        refetchOnMountOrArgChange: true,
        skip: mode === 'blog',
    });
    const {
        isLoading: isLoadingBlog,
        isFetching: isFetchingBlog,
        isError: isErrorBlog,
    } = useGetBlogQuery(query.id?.toString() ?? '', {
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
    if (isError || isErrorBlog) return <NotFoundScreen />;

    return (
        <motion.div initial={{ y: 20, opacity: 0.5 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
            <AiryArticle />
        </motion.div>
    );
};

export default Article;
