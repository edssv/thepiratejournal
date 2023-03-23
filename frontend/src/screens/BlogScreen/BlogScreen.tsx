import { useGetBlogsQuery } from '@/services/blog';
import { ArticlePreview } from './ArticlePreview/ArticlePreview';

import styles from './Blog.module.scss';

const Blog = () => {
    const { data, isLoading } = useGetBlogsQuery('');

    if (!data || isLoading) return null;

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <ArticlePreview data={data[0]} featured />
                <div className={styles.articlesContainer}>
                    {data?.map((article, index) =>
                        index > 0 ? <ArticlePreview key={article._id} data={article} /> : null
                    )}
                </div>
            </div>
        </div>
    );
};

export default Blog;
