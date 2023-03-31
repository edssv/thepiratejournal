import { useQuery } from '@tanstack/react-query';

import { BlogService } from '@/services';
import { Blog } from '@/interfaces/blog.interface';
import { ArticlePreview } from './ArticlePreview/ArticlePreview';

import styles from './Blog.module.scss';

const Blog = () => {
    const { data: blogs } = useQuery({ queryKey: ['blog'], queryFn: BlogService.getAll });

    const blogList = () => {
        return blogs?.map((blog: Blog) => <ArticlePreview key={blog.id} data={blog} />).slice(1);
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <ArticlePreview data={blogs ? blogs[0] : null} featured />
                <div className={styles.articlesContainer}>{blogList()}</div>
            </div>
        </div>
    );
};

export default Blog;
